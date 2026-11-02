/* ============================================================
   LOGIN & CLOUD-SYNC (Supabase)
   Der localStorage bleibt der Arbeitsspeicher der App und dient
   offline als Cache. Ist jemand angemeldet, geht jede Änderung
   zusätzlich (gebündelt nach ~1 s) in die Tabelle user_data.
   Ohne Einträge in cloud-config.js ist alles hier ausgeschaltet.
   ============================================================ */
const cloud = (() => {
  const TABLE = "user_data";
  const DIRTY_KEY = "pomo__dirty";          // Keys, deren Upload noch aussteht (intern, wird nie synchronisiert)
  const AUTH_KEY = "fokus-auth";            // hier legt supabase-js die Anmeldung ab
  const RELOAD_KEY = "fokus_sync_reload";   // Schutz gegen Neulade-Schleifen
  const SESSIONS = "pomo_sessions";
  // Anordnung und Menü passen je nach Bildschirm, darum bleiben sie pro Gerät.
  const DEVICE_ONLY = new Set(["pomo_layout", "pomo_menu"]);

  const url = typeof SUPABASE_URL === "string" ? SUPABASE_URL.trim() : "";
  const anonKey = typeof SUPABASE_ANON_KEY === "string" ? SUPABASE_ANON_KEY.trim() : "";
  const enabled = !!(url && anonKey && window.supabase?.createClient);
  const client = enabled ? window.supabase.createClient(url, anonKey, { auth: { storageKey: AUTH_KEY } }) : null;

  let user = null;
  const pending = new Map();   // key -> Wert, noch nicht hochgeladen
  let timer = null;
  let chain = Promise.resolve();
  let startState = new Map();   // lokaler Stand beim Seitenstart (siehe syncOnLoad)
  let started = false;          // vor dem Start-Abgleich wird nur gesammelt, nicht hochgeladen

  /* ---------- Hilfsfunktionen ---------- */
  const syncs = key => key.startsWith("pomo_") && !key.startsWith("pomo__") && !DEVICE_ONLY.has(key);
  const readLocal = key => { try { return JSON.parse(localStorage.getItem(key)); } catch { return null; } };
  const writeLocal = (key, value) => { try { localStorage.setItem(key, JSON.stringify(value)); } catch {} };
  const localKeys = () => { try { return Object.keys(localStorage).filter(syncs); } catch { return []; } };
  const dirty = () => { const d = readLocal(DIRTY_KEY); return Array.isArray(d) ? d : []; };
  const setDirty = keys => { try { keys.length ? localStorage.setItem(DIRTY_KEY, JSON.stringify(keys)) : localStorage.removeItem(DIRTY_KEY); } catch {} };
  const markDirty = keys => setDirty([...new Set([...dirty(), ...keys])]);
  const hasStoredLogin = () => { try { return !!localStorage.getItem(AUTH_KEY); } catch { return false; } };

  // jsonb sortiert Objekt-Keys um, darum vergleichen wir mit sortierten Keys.
  const canon = v => JSON.stringify(v, (_k, x) =>
    x && typeof x === "object" && !Array.isArray(x)
      ? Object.keys(x).sort().reduce((o, k) => (o[k] = x[k], o), {})
      : x);

  // Lernstatistik geht nie verloren: Vereinigung beider Listen über ts.
  function mergeSessions(a, b) {
    const all = new Map();
    for (const s of [...(Array.isArray(a) ? a : []), ...(Array.isArray(b) ? b : [])]) {
      all.set(s?.ts ?? JSON.stringify(s), s);
    }
    return [...all.values()].sort((x, y) => (x?.ts ?? 0) - (y?.ts ?? 0));
  }

  async function currentUser() {
    if (user || !client) return user;
    try { const { data } = await client.auth.getSession(); user = data.session?.user ?? null; } catch {}
    return user;
  }

  /* ---------- Hochladen ---------- */
  function push(key, value) {
    if (!enabled || !syncs(key)) return;
    pending.set(key, value);
    clearTimeout(timer);
    if (started) timer = setTimeout(flush, 1000);
  }

  async function upload() {
    clearTimeout(timer); timer = null;
    if (!(await currentUser())) {
      // Offline mit abgelaufenem Token: merken und später nochmals versuchen.
      if (hasStoredLogin()) markDirty([...pending.keys()]);
      pending.clear();
      return;
    }
    const keys = [...new Set([...dirty(), ...pending.keys()])];
    if (!keys.length) return;
    const now = new Date().toISOString();
    const rows = keys.map(key => ({
      user_id: user.id, key, updated_at: now,
      value: (pending.has(key) ? pending.get(key) : readLocal(key)) ?? null
    }));
    pending.clear();
    markDirty(keys);
    try {
      // Sessions anderer Geräte nicht überschreiben, sondern dazunehmen.
      // Eine leere Liste kommt nur vom Zurücksetzen der Statistik und gilt so.
      const ses = rows.find(r => r.key === SESSIONS);
      if (ses && Array.isArray(ses.value) && ses.value.length) {
        const { data, error } = await client.from(TABLE).select("value").eq("user_id", user.id).eq("key", SESSIONS).maybeSingle();
        if (error) throw error;
        ses.value = mergeSessions(ses.value, data?.value);
        writeLocal(SESSIONS, ses.value);
      }
      const { error } = await client.from(TABLE).upsert(rows);
      if (error) throw error;
      setDirty(dirty().filter(k => !keys.includes(k) || pending.has(k)));
    } catch {}   // bleibt in pomo__dirty, nächster Versuch beim Laden oder wenn wieder online
  }

  // Hintereinander statt parallel, damit ein älterer Stand nie einen neueren überholt.
  const flush = () => (chain = chain.then(upload, upload));

  /* ---------- Herunterladen ---------- */
  async function pullAll() {
    const { data, error } = await client.from(TABLE).select("key, value").eq("user_id", user.id);
    if (error) throw error;
    return (data || []).filter(r => syncs(r.key));
  }

  function reloadPage(guard) {
    if (guard) {
      try {
        if (Date.now() - (+sessionStorage.getItem(RELOAD_KEY) || 0) < 15000) return;
        sessionStorage.setItem(RELOAD_KEY, String(Date.now()));
      } catch {}
    }
    location.reload();
  }

  // Direkt nach dem Login: Cloud-Stand übernehmen, Sessions zusammenführen,
  // und was nur lokal existiert (z. B. bei einem leeren Konto alles) hochladen.
  async function adoptAccount() {
    const rows = await pullAll();
    const inCloud = new Set(rows.map(r => r.key));
    const toPush = localKeys().filter(k => !inCloud.has(k));
    for (const r of rows) {
      if (r.key === SESSIONS) {
        const merged = mergeSessions(readLocal(SESSIONS), r.value);
        writeLocal(SESSIONS, merged);
        if (merged.length !== (Array.isArray(r.value) ? r.value.length : 0)) toPush.push(SESSIONS);
      } else {
        writeLocal(r.key, r.value);
      }
    }
    setDirty([]);
    if (toPush.length) { markDirty(toPush); await flush(); }
    reloadPage(false);
  }

  // Bei jedem Start: offene Änderungen hochladen, dann neuere Stände von
  // anderen Geräten holen. Die App liest ihre Daten nur beim Laden, darum
  // wird bei Änderungen neu geladen.
  async function syncOnLoad() {
    // Erst wenn pomodoro.js durchgelaufen ist, sind alle Start-Speicherungen gesammelt.
    if (document.readyState !== "complete") await new Promise(r => window.addEventListener("load", r, { once: true }));
    if (!(await currentUser())) return;
    // Was die App beim Start nur unverändert zurückschreibt, soll den neueren
    // Stand eines anderen Geräts nicht überschreiben.
    for (const [key, value] of pending) {
      if (canon(value) === canon(startState.get(key))) pending.delete(key);
    }
    await flush();
    let rows;
    try { rows = await pullAll(); } catch { return; }
    const open = new Set([...dirty(), ...pending.keys()]);
    let changed = false;
    for (const r of rows) {
      if (open.has(r.key)) continue;
      const local = readLocal(r.key);
      const value = r.key === SESSIONS && local?.length ? mergeSessions(local, r.value) : r.value;
      if (canon(value) === canon(local)) continue;
      writeLocal(r.key, value);
      changed = true;
    }
    if (changed) reloadPage(true);
  }

  /* ---------- Konto ---------- */
  async function signIn(email, password) {
    const { data, error } = await client.auth.signInWithPassword({ email, password });
    if (error) throw error;
    user = data.user;
    try { await adoptAccount(); }
    catch (e) { await signOut(); throw e; }   // ohne Abgleich lieber nicht angemeldet bleiben
  }

  // Gibt true zurück, wenn zuerst die E-Mail bestätigt werden muss.
  async function signUp(email, password) {
    const { data, error } = await client.auth.signUp({ email, password });
    if (error) throw error;
    // Bei aktiver E-Mail-Bestätigung meldet Supabase bestehende Adressen so zurück.
    if (data.user && Array.isArray(data.user.identities) && !data.user.identities.length) {
      throw { code: "user_already_exists" };
    }
    if (!data.session) return true;
    user = data.user;
    await adoptAccount();
    return false;
  }

  // Lokale Daten bleiben auf dem Gerät, sie werden nur nicht mehr abgeglichen.
  async function signOut() {
    await flush();
    try { await client.auth.signOut({ scope: "local" }); } catch {}
    user = null;
    pending.clear();
    setDirty([]);
  }

  function errorText(e) {
    const texts = {
      invalid_credentials: "E-Mail oder Passwort ist falsch.",
      email_not_confirmed: "Bitte bestätige zuerst deine E-Mail-Adresse über den Link in der Mail.",
      user_already_exists: "Zu dieser E-Mail-Adresse gibt es schon ein Konto. Melde dich an.",
      email_exists: "Zu dieser E-Mail-Adresse gibt es schon ein Konto. Melde dich an.",
      weak_password: "Das Passwort ist zu schwach (mindestens 6 Zeichen).",
      email_address_invalid: "Diese E-Mail-Adresse ist ungültig.",
      validation_failed: "Bitte E-Mail und Passwort prüfen.",
      over_email_send_rate_limit: "Zu viele E-Mails in kurzer Zeit. Bitte später nochmals versuchen.",
      over_request_rate_limit: "Zu viele Versuche. Bitte kurz warten.",
      signup_disabled: "Registrieren ist zurzeit ausgeschaltet.",
      "42P01": "Die Tabelle user_data fehlt. Bitte supabase/schema.sql ausführen.",
      PGRST205: "Die Tabelle user_data fehlt. Bitte supabase/schema.sql ausführen."
    };
    if (texts[e?.code]) return texts[e.code];
    if (e?.name === "AuthRetryableFetchError" || e instanceof TypeError || e?.status === 0) {
      return "Keine Verbindung zum Server. Bist du online?";
    }
    return "Das hat nicht geklappt" + (e?.message ? `: ${e.message}` : ".");
  }

  /* ---------- Oberfläche ---------- */
  const el = id => document.getElementById(id);

  function renderAccount() {
    const email = user?.email || "";
    el("accountBtnText").textContent = email || "Anmelden";
    el("accountBtn").title = email ? `Angemeldet als ${email}` : "Anmelden und Daten zwischen Geräten abgleichen";
    el("accountBtn").setAttribute("aria-label", email ? `Konto: ${email}` : "Anmelden");
    el("accountBtn").classList.toggle("signed-in", !!email);
    el("accountForm").hidden = !!email;
    el("accountInfo").hidden = !email;
    el("accountUser").textContent = email;
  }

  function setMsg(text, ok) {
    for (const id of ["accountMsg", "accountInfoMsg"]) {
      el(id).textContent = text;
      el(id).classList.toggle("ok", !!ok);
    }
  }

  function setBusy(busy) {
    for (const b of document.querySelectorAll("#accountModal button")) b.disabled = busy;
  }

  async function run(action) {
    setMsg("");
    setBusy(true);
    try { await action(); }
    catch (e) { setMsg(errorText(e)); }
    finally { setBusy(false); renderAccount(); }
  }

  function initUi() {
    const modal = el("accountModal");
    if (!modal) return;
    const open = () => { setMsg(""); renderAccount(); modal.hidden = false; (user ? el("accountClose") : el("accountEmail")).focus(); };
    const close = () => { modal.hidden = true; };
    const creds = () => [el("accountEmail").value.trim(), el("accountPassword").value];

    el("accountBtn").hidden = false;
    el("accountBtn").onclick = open;
    el("accountClose").onclick = close;
    el("accountCancel").onclick = close;
    modal.onclick = e => { if (e.target === modal) close(); };
    document.addEventListener("keydown", e => { if (e.key === "Escape" && !modal.hidden) close(); });

    el("accountForm").onsubmit = e => {
      e.preventDefault();
      run(async () => {
        setMsg("Anmelden …", true);
        await signIn(...creds());
      });
    };
    el("accountSignUp").onclick = () => {
      if (!el("accountForm").reportValidity()) return;
      run(async () => {
        setMsg("Konto wird erstellt …", true);
        if (await signUp(...creds())) setMsg("Fast geschafft: Bestätige deine E-Mail-Adresse über den Link in der Mail und melde dich dann hier an.", true);
      });
    };
    el("accountSignOut").onclick = () => run(async () => {
      await signOut();
      setMsg("Abgemeldet. Deine Daten bleiben auf diesem Gerät.", true);
    });
    renderAccount();
  }

  if (enabled) {
    startState = new Map(localKeys().map(k => [k, readLocal(k)]));
    initUi();
    client.auth.onAuthStateChange((_event, session) => {
      user = session?.user ?? null;
      renderAccount();
    });
    syncOnLoad().finally(() => { started = true; if (pending.size) flush(); });
    window.addEventListener("online", flush);
    // Falls die Seite zugeht, bevor der Upload durch ist: Keys für den nächsten Start merken.
    const flushNow = () => { if (user || hasStoredLogin()) markDirty([...pending.keys()]); flush(); };
    window.addEventListener("pagehide", flushNow);
    document.addEventListener("visibilitychange", () => { if (document.visibilityState === "hidden") flushNow(); });
  }

  return { enabled, push, flush, signIn, signUp, signOut, pullAll, get user() { return user; } };
})();
