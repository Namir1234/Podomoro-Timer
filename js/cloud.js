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
  // Listen, die über ts zusammengeführt statt überschrieben werden (Lern-Sessions und Pausen)
  const MERGED = new Set(["pomo_sessions", "pomo_breaks"]);
  // Das Menü passt je nach Bildschirm, darum bleibt es pro Gerät. Feldanordnung und Design
  // werden mit dem Konto abgeglichen.
  const DEVICE_ONLY = new Set(["pomo_menu"]);
  // Steuerung des Timers soll sofort auf den anderen Geräten ankommen
  const FAST = new Set(["pomo_timer"]);

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
  const handlers = new Map();   // key -> Funktion, die einen neuen Stand gleich anzeigt (aus pomodoro.js)
  let channel = null;           // Realtime-Kanal für Änderungen anderer Geräte
  const sent = new Map();       // key -> eigene hochgeladene Stände, deren Echo noch aussteht

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
  // Gibt es einen Eintrag doppelt, gewinnt der mit mehr Überzeit (wird erst nachträglich gesetzt).
  function mergeSessions(a, b) {
    const all = new Map();
    for (const s of [...(Array.isArray(a) ? a : []), ...(Array.isArray(b) ? b : [])]) {
      const k = s?.ts ?? JSON.stringify(s), prev = all.get(k);
      if (!prev || (s?.over || 0) >= (prev?.over || 0)) all.set(k, s);
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
    if (started) timer = setTimeout(flush, FAST.has(key) ? 150 : 1000);
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
      // Sessions und Pausen anderer Geräte nicht überschreiben, sondern dazunehmen.
      // Eine leere Liste kommt nur vom Zurücksetzen der Statistik und gilt so.
      for (const ses of rows.filter(r => MERGED.has(r.key))) {
        if (!Array.isArray(ses.value) || !ses.value.length) continue;
        const { data, error } = await client.from(TABLE).select("value").eq("user_id", user.id).eq("key", ses.key).maybeSingle();
        if (error) throw error;
        ses.value = mergeSessions(ses.value, data?.value);
        writeLocal(ses.key, ses.value);
      }
      // Vor dem Upsert merken: Das Realtime-Echo kann vor der Antwort eintreffen.
      for (const r of rows) sent.set(r.key, [...(sent.get(r.key) || []), canon(r.value)].slice(-10));
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
      if (MERGED.has(r.key)) {
        const merged = mergeSessions(readLocal(r.key), r.value);
        writeLocal(r.key, merged);
        if (canon(merged) !== canon(r.value)) toPush.push(r.key);
      } else {
        writeLocal(r.key, r.value);
      }
    }
    setDirty([]);
    if (toPush.length) { markDirty(toPush); await flush(); }
    reloadPage(false);
  }

  // Stand eines anderen Geräts übernehmen. Keys mit Handler werden gleich angezeigt,
  // für alle anderen gibt es false zurück (die App liest sie nur beim Laden → neu laden).
  function applyRemote(key, remote) {
    // Noch nicht hochgeladene eigene Änderung ist neuer und gewinnt.
    if (!syncs(key) || pending.has(key) || dirty().includes(key)) return true;
    const local = readLocal(key);
    const value = MERGED.has(key) && local?.length ? mergeSessions(local, remote) : remote;
    if (canon(value) === canon(local)) return true;   // nichts Neues, z. B. das Echo der eigenen Änderung
    writeLocal(key, value);
    const fn = handlers.get(key);
    if (!fn) return false;
    try { fn(value); } catch (e) { console.error(e); }
    return true;
  }

  // Alle Stände holen und übernehmen (beim Start und wenn die App wieder sichtbar wird).
  async function pullChanges() {
    let rows;
    try { rows = await pullAll(); } catch { return; }
    let reload = false;
    for (const r of rows) if (!applyRemote(r.key, r.value)) reload = true;
    if (reload) reloadPage(true);
  }

  // Live: Supabase Realtime meldet jede Änderung an den eigenen Zeilen sofort.
  // Dafür muss user_data in der Publikation supabase_realtime sein (supabase/schema.sql).
  function subscribe() {
    if (channel || !user) return;
    channel = client.channel("user_data:" + user.id)
      .on("postgres_changes", { event: "*", schema: "public", table: TABLE, filter: "user_id=eq." + user.id }, p => {
        const r = p.new;
        if (!r?.key) return;
        // Echo eines eigenen Uploads: Ist man schon weiter (Start und gleich Pause), nicht zurückspringen.
        const mine = sent.get(r.key) || [], i = mine.indexOf(canon(r.value));
        if (i >= 0) { mine.splice(0, i + 1); return; }
        if (!applyRemote(r.key, r.value)) reloadPage(true);
      })
      .subscribe();
  }

  function unsubscribe() {
    if (channel) client.removeChannel(channel).catch(() => {});
    channel = null;
  }

  // Bei jedem Start: offene Änderungen hochladen, dann neuere Stände von
  // anderen Geräten holen und ab dann live mithören.
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
    subscribe();
    await pullChanges();
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

  // Bestätigungsmail nochmals schicken, falls die erste nicht ankam.
  async function resendConfirmation(email) {
    const { error } = await client.auth.resend({ type: "signup", email });
    if (error) throw error;
  }

  // Lokale Daten bleiben auf dem Gerät, sie werden nur nicht mehr abgeglichen.
  async function signOut() {
    await flush();
    try { await client.auth.signOut({ scope: "local" }); } catch {}
    unsubscribe();
    user = null;
    pending.clear();
    setDirty([]);
  }

  function errorText(e) {
    // Fehlercode → Übersetzungs-Schlüssel (Texte in i18n.js)
    const keys = {
      invalid_credentials: "acc.err.credentials",
      email_not_confirmed: "acc.err.notConfirmed",
      user_already_exists: "acc.err.exists",
      email_exists: "acc.err.exists",
      weak_password: "acc.err.weak",
      email_address_invalid: "acc.err.invalidEmail",
      validation_failed: "acc.err.validation",
      over_email_send_rate_limit: "acc.err.emailRate",
      over_request_rate_limit: "acc.err.rate",
      signup_disabled: "acc.err.signupOff",
      "42P01": "acc.err.table",
      PGRST205: "acc.err.table"
    };
    if (keys[e?.code]) return t(keys[e.code]);
    if (e?.name === "AuthRetryableFetchError" || e instanceof TypeError || e?.status === 0) {
      return t("acc.err.offline");
    }
    return e?.message ? t("acc.err.otherMsg", { msg: e.message }) : t("acc.err.other");
  }

  /* ---------- Oberfläche ---------- */
  const el = id => document.getElementById(id);

  function renderAccount() {
    const email = user?.email || "";
    el("accountBtnText").textContent = email || t("acc.signIn");
    el("accountBtn").title = email ? t("acc.btnTitleIn", { email }) : t("acc.btnTitle");
    el("accountBtn").setAttribute("aria-label", email ? t("acc.btnAriaIn", { email }) : t("acc.signIn"));
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

  // Der Knopf zum Nochmals-Senden erscheint nur, wenn eine Bestätigung wirklich aussteht.
  const showResend = on => { el("accountResend").hidden = !on; };

  async function run(action) {
    setMsg("");
    showResend(false);
    setBusy(true);
    try { await action(); }
    catch (e) {
      setMsg(errorText(e));
      if (e?.code === "email_not_confirmed") showResend(true);
    }
    finally { setBusy(false); renderAccount(); }
  }

  function initUi() {
    const modal = el("accountModal");
    if (!modal) return;
    const open = () => { setMsg(""); showResend(false); renderAccount(); modal.hidden = false; (user ? el("accountClose") : el("accountEmail")).focus(); };
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
        setMsg(t("acc.signingIn"), true);
        await signIn(...creds());
      });
    };
    el("accountSignUp").onclick = () => {
      if (!el("accountForm").reportValidity()) return;
      run(async () => {
        setMsg(t("acc.creating"), true);
        if (await signUp(...creds())) { setMsg(t("acc.almost"), true); showResend(true); }
      });
    };
    el("accountResend").onclick = () => {
      // Nur die Adresse muss stimmen, das Passwort braucht es dafür nicht.
      if (!el("accountEmail").reportValidity()) return;
      run(async () => {
        setMsg(t("acc.resending"), true);
        await resendConfirmation(creds()[0]);
        setMsg(t("acc.resent"), true);
        showResend(true);
      });
    };
    el("accountSignOut").onclick = () => run(async () => {
      await signOut();
      setMsg(t("acc.signedOut"), true);
    });
    document.addEventListener("langchange", renderAccount);
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
    window.addEventListener("online", () => { flush(); if (user) pullChanges(); });
    // Falls Realtime nicht verbunden war (Handy im Hintergrund, Funkloch): beim Zurückkommen abgleichen.
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "visible" && started && user) flush().then(pullChanges);
    });
    // Falls die Seite zugeht, bevor der Upload durch ist: Keys für den nächsten Start merken.
    const flushNow = () => { if (user || hasStoredLogin()) markDirty([...pending.keys()]); flush(); };
    window.addEventListener("pagehide", flushNow);
    document.addEventListener("visibilitychange", () => { if (document.visibilityState === "hidden") flushNow(); });
  }

  const onRemote = (key, fn) => handlers.set(key, fn);

  return { enabled, push, flush, onRemote, signIn, signUp, signOut, resendConfirmation, pullAll, get user() { return user; } };
})();
