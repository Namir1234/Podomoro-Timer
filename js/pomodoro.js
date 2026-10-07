/* ============================================================
   DATEN & HILFSFUNKTIONEN
   Alles wird im localStorage des Browsers gespeichert.
   ============================================================ */
const QUOTES = [
  { t: "Es ist nicht genug zu wissen, man muss auch anwenden.", a: "Johann Wolfgang von Goethe" },
  { t: "Die einzige Art, grossartige Arbeit zu leisten, ist zu lieben, was man tut.", a: "Steve Jobs" },
  { t: "Es scheint immer unmöglich, bis es geschafft ist.", a: "Nelson Mandela" },
  { t: "Erfolg ist die Summe kleiner Anstrengungen, die Tag für Tag wiederholt werden.", a: "Robert Collier" },
  { t: "Ob du denkst, du kannst es, oder du kannst es nicht – du hast recht.", a: "Henry Ford" },
  { t: "Fall siebenmal hin, steh achtmal auf.", a: "Japanisches Sprichwort" },
  { t: "Ich fürchte nicht den, der 10'000 verschiedene Kicks geübt hat, sondern den, der einen Kick 10'000 Mal geübt hat.", a: "Bruce Lee (zugeschrieben)" },
  { t: "Das Geheimnis des Vorankommens ist, anzufangen.", a: "Mark Twain (zugeschrieben)" },
  { t: "Du musst nicht gross sein, um anzufangen, aber du musst anfangen, um gross zu werden.", a: "Zig Ziglar" },
  { t: "Phantasie ist wichtiger als Wissen.", a: "Albert Einstein" },
  { t: "Wir sind, was wir wiederholt tun. Vortrefflichkeit ist daher keine Handlung, sondern eine Gewohnheit.", a: "Will Durant" },
  { t: "Ich habe in meinem Leben immer wieder versagt. Und deshalb habe ich Erfolg.", a: "Michael Jordan" },
  { t: "Wer kämpft, kann verlieren. Wer nicht kämpft, hat schon verloren.", a: "Bertolt Brecht" },
  { t: "Der beste Zeitpunkt, einen Baum zu pflanzen, war vor 20 Jahren. Der zweitbeste ist jetzt.", a: "Chinesisches Sprichwort" },
  { t: "Der Weg von tausend Meilen beginnt mit dem ersten Schritt.", a: "Laozi" },
  { t: "Bildung ist die mächtigste Waffe, die du verwenden kannst, um die Welt zu verändern.", a: "Nelson Mandela" },
  { t: "Was ich nicht weiss, macht mich neugierig.", a: "Marie Curie (sinngemäss)" },
  { t: "Disziplin ist die Brücke zwischen Zielen und Erfolg.", a: "Jim Rohn" }
];

// Zitate asiatischer Mönche in der Originalsprache
const MONK_QUOTES = [
  { t: "門松は冥土の旅の一里塚　めでたくもありめでたくもなし", a: "一休宗純 (Ikkyū Sōjun)", lang: "ja", l: "Japanisch" },
  { t: "世の中は食うて糞して寝て起きて　さてその後は死ぬるばかりぞ", a: "一休宗純 (Ikkyū Sōjun, zugeschrieben)", lang: "ja", l: "Japanisch" },
  { t: "祖死、父死、子死、孫死。", a: "仙厓義梵 (Sengai Gibon, zugeschrieben)", lang: "ja", l: "Japanisch" },
  { t: "死にとうない。", a: "仙厓義梵 (Sengai Gibon, letzte Worte, zugeschrieben)", lang: "ja", l: "Japanisch" },
  { t: "災難に逢う時節には災難に逢うがよく候。死ぬ時節には死ぬがよく候。是はこれ災難をのがるる妙法にて候。", a: "良寛 (Ryōkan)", lang: "ja", l: "Japanisch" },
  { t: "散る桜　残る桜も　散る桜", a: "良寛 (Ryōkan, zugeschrieben)", lang: "ja", l: "Japanisch" },
  { t: "逢佛殺佛，逢祖殺祖。", a: "臨濟義玄 (Linji Yixuan)", lang: "zh-Hant", l: "Chinesisch" },
  { t: "「如何是佛？」「乾屎橛。」", a: "雲門文偃 (Yunmen Wenyan)", lang: "zh-Hant", l: "Chinesisch" },
  { t: "我當時若見，一棒打殺與狗子喫卻，貴圖天下太平。", a: "雲門文偃 (Yunmen Wenyan)", lang: "zh-Hant", l: "Chinesisch" },
  { t: "「如何是佛？」「麻三斤。」", a: "洞山守初 (Dongshan Shouchu)", lang: "zh-Hant", l: "Chinesisch" },
  { t: "「狗子還有佛性也無？」「無。」", a: "趙州從諗 (Zhaozhou Congshen)", lang: "zh-Hant", l: "Chinesisch" },
  { t: "「喫粥了也未？」「喫粥了也。」「洗鉢盂去。」", a: "趙州從諗 (Zhaozhou Congshen)", lang: "zh-Hant", l: "Chinesisch" },
  { t: "道得也三十棒，道不得也三十棒。", a: "德山宣鑒 (Deshan Xuanjian)", lang: "zh-Hant", l: "Chinesisch" },
  { t: "大眾道得即救，道不得即斬卻也。", a: "南泉普願 (Nanquan Puyuan)", lang: "zh-Hant", l: "Chinesisch" },
  { t: "既無舍利，更取兩尊燒。", a: "丹霞天然 (Danxia Tianran)", lang: "zh-Hant", l: "Chinesisch" },
  { t: "내 말에 속지 마라.", a: "성철 (Seongcheol)", lang: "ko", l: "Koreanisch" },
  { t: "일생 동안 남녀의 무리를 속여서 하늘을 넘치는 죄업은 수미산을 지나친다.", a: "성철 (Seongcheol, Abschiedsvers)", lang: "ko", l: "Koreanisch" }
];

// Zitate berühmter Revolutionäre (deutsch, mit Original wo bekannt)
const REVO_QUOTES = [
  { t: "Seien wir realistisch – verlangen wir das Unmögliche.", a: "Che Guevara (zugeschrieben)", o: "Seamos realistas, exijamos lo imposible." },
  { t: "Freiheit ist immer die Freiheit der Andersdenkenden.", a: "Rosa Luxemburg" },
  { t: "Nach dem Erklimmen eines hohen Berges entdeckt man nur, dass es noch viele weitere Berge zu erklimmen gibt.", a: "Nelson Mandela", o: "After climbing a great hill, one only finds that there are many more hills to climb." },
  { t: "Die Geschichte wird mich freisprechen.", a: "Fidel Castro", o: "La historia me absolverá." },
  { t: "Das Vaterland oder den Tod – wir werden siegen.", a: "Thomas Sankara", o: "La patrie ou la mort, nous vaincrons." },
  { t: "Nichts ist kostbarer als Unabhängigkeit und Freiheit.", a: "Hồ Chí Minh", o: "Không có gì quý hơn độc lập, tự do." },
  { t: "Lieber im Stehen sterben als auf den Knien leben.", a: "Emiliano Zapata (zugeschrieben)", o: "Prefiero morir de pie que vivir de rodillas." },
  { t: "Die Philosophen haben die Welt nur verschieden interpretiert; es kommt aber darauf an, sie zu verändern.", a: "Karl Marx" },
  { t: "Die Zukunft gehört denen, die sich heute darauf vorbereiten.", a: "Malcolm X", o: "The future belongs to those who prepare for it today." },
  { t: "Die Kunst zu siegen lernt man in den Niederlagen.", a: "Simón Bolívar", o: "El arte de vencer se aprende en las derrotas." },
  { t: "Sei selbst die Veränderung, die du dir für die Welt wünschst.", a: "Mahatma Gandhi (zugeschrieben)", o: "Be the change that you wish to see in the world." },
  { t: "Mit meinem Sturz hat man nur den Stamm des Freiheitsbaumes gefällt – er treibt aus den Wurzeln neu aus, denn sie sind tief und zahlreich.", a: "Toussaint Louverture" }
];

const DEFAULTS = { focus: 25, focusSec: 0, short: 5, shortSec: 0, long: 15, longSec: 0, rounds: 4, sound: 1 };
const load = (key, fallback) => { try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; } };
const save = (key, value) => { try { localStorage.setItem(key, JSON.stringify(value)); } catch {} };

let settings = { ...DEFAULTS, ...load("pomo_settings", {}) };
let sessions = load("pomo_sessions", []);       // [{date:"2026-10-06", ts:..., min:25, subject:"..."}]
let favs = load("pomo_favs", []);               // Liste von Zitat-Indizes

const $ = id => document.getElementById(id);
const dayKey = d => { const x = new Date(d); return x.getFullYear() + "-" + String(x.getMonth()+1).padStart(2,"0") + "-" + String(x.getDate()).padStart(2,"0"); };
const round1 = n => Math.round(n * 10) / 10;
// Dauer einer Phase ("focus", "short", "long") in Sekunden
const phaseSec = m => settings[m] * 60 + settings[m + "Sec"];
const fmtDur = m => [settings[m] && settings[m] + " Min.", settings[m + "Sec"] && settings[m + "Sec"] + " Sek."].filter(Boolean).join(" ");

/* ============================================================
   NAVIGATION
   ============================================================ */
document.querySelectorAll("nav button").forEach(btn => {
  btn.onclick = () => {
    document.querySelectorAll("nav button").forEach(b => b.classList.remove("active"));
    document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
    btn.classList.add("active");
    $(btn.dataset.page).classList.add("active");
    if (btn.dataset.page === "stats") renderStats();
  };
});

/* ============================================================
   TIMER
   ============================================================ */
const MODE_TEXT = { focus: "Zeit zum Fokussieren", short: "Kurze Pause", long: "Lange Pause" };
const CIRC = 2 * Math.PI * 114;     // Umfang des Kreises
$("ringFg").style.strokeDasharray = CIRC;

let mode = "focus";
let totalSec = phaseSec("focus");
let remaining = totalSec;
let running = false;
let endTime = 0;
let tick = null;
let ringFrame = null;
let focusDone = 0;                  // Fokus-Sessions im aktuellen Zyklus (0 bis settings.rounds)

function fmt(s) {
  const m = Math.floor(s / 60), r = s % 60;
  return String(m).padStart(2, "0") + ":" + String(r).padStart(2, "0");
}

// Ring wird mit der genauen Restzeit (inkl. Millisekunden) gezeichnet → läuft gleichmässig statt im Sekundentakt
function drawRing() {
  const left = running ? Math.max(0, (endTime - Date.now()) / 1000) : remaining;
  $("ringFg").style.strokeDashoffset = CIRC * (1 - left / totalSec);
}

function animateRing() {
  if (!running) return;
  drawRing();
  ringFrame = requestAnimationFrame(animateRing);
}

function draw() {
  $("digits").textContent = fmt(remaining);
  $("modeLabel").textContent = MODE_TEXT[mode];
  drawRing();
  document.body.classList.toggle("pause", mode !== "focus");
  document.title = (running ? fmt(remaining) + " · " : "") + "Fokus – Pomodoro";
  document.querySelectorAll(".modes button").forEach(b => b.classList.toggle("active", b.dataset.mode === mode));
  $("startBtn").textContent = running ? "Pause" : (remaining < totalSec ? "Weiter" : "Start");
  $("dots").innerHTML = Array.from({ length: settings.rounds }, (_, i) => `<div class="dot ${i < focusDone ? "done" : ""}"></div>`).join("");
  $("cycleHint").textContent = `Ablauf: ${settings.rounds}× ${fmtDur("focus")} Fokus, dazwischen ${fmtDur("short")} Pause, danach ${fmtDur("long")} lange Pause.`;
}

// Nach einer Fokus-Runde: kurze Pause, nach der letzten Runde des Zyklus die lange Pause
function afterFocus() {
  focusDone++;
  if (focusDone >= settings.rounds) { focusDone = 0; setMode("long"); }
  else setMode("short");
}

function setMode(m) {
  stop();
  mode = m;
  totalSec = phaseSec(m);
  remaining = totalSec;
  draw();
}

function stop() {
  running = false;
  clearInterval(tick);
  cancelAnimationFrame(ringFrame);
}

function start() {
  running = true;
  endTime = Date.now() + remaining * 1000;   // Endzeit merken → bleibt genau, auch wenn der Tab im Hintergrund ist
  tick = setInterval(() => {
    remaining = Math.max(0, Math.round((endTime - Date.now()) / 1000));
    draw();
    if (remaining <= 0) finish();
  }, 250);
  ringFrame = requestAnimationFrame(animateRing);
  draw();
}

function finish() {
  stop();
  beep();
  if (mode === "focus") {
    const now = new Date();
    sessions.push({ date: dayKey(now), ts: now.getTime(), min: round1(phaseSec("focus") / 60), subject: $("subject").value.trim() || "Ohne Fach" });
    save("pomo_subject", $("subject").value.trim());
    save("pomo_sessions", sessions);
    updateSubjectList();
    afterFocus();
  } else {
    setMode("focus");
  }
}

function beep() {
  if (!+settings.sound) return;
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    [0, 0.25, 0.5].forEach(delay => {
      const o = ctx.createOscillator(), g = ctx.createGain();
      o.connect(g); g.connect(ctx.destination);
      o.frequency.value = 880; g.gain.value = 0.15;
      o.start(ctx.currentTime + delay); o.stop(ctx.currentTime + delay + 0.18);
    });
  } catch {}
}

$("startBtn").onclick = () => running ? (stop(), draw()) : start();
$("resetBtn").onclick = () => setMode(mode);
$("skipBtn").onclick = () => {
  stop();
  if (mode === "focus") afterFocus();
  else setMode("focus");
};
document.querySelectorAll(".modes button").forEach(b => b.onclick = () => setMode(b.dataset.mode));

// Einstellungen: jede Phase hat Minuten und Sekunden
["focus", "short", "long"].forEach(key => {
  const id = "set" + key[0].toUpperCase() + key.slice(1);
  const elMin = $(id), elSec = $(id + "Sec");
  const show = () => { elMin.value = settings[key]; elSec.value = settings[key + "Sec"]; };
  show();
  elMin.onchange = elSec.onchange = () => {
    settings[key] = Math.min(Math.max(Math.round(+elMin.value) || 0, 0), 120);
    settings[key + "Sec"] = Math.min(Math.max(Math.round(+elSec.value) || 0, 0), 59);
    if (!settings[key] && !settings[key + "Sec"]) settings[key] = DEFAULTS[key];   // 0:00 ist nicht erlaubt
    show();
    save("pomo_settings", settings);
    if (!running && mode === key) setMode(mode);
    else draw();
  };
});
$("setRounds").value = settings.rounds;
$("setRounds").onchange = e => {
  settings.rounds = Math.min(Math.max(Math.round(+e.target.value) || DEFAULTS.rounds, 1), 12);
  e.target.value = settings.rounds;
  focusDone = Math.min(focusDone, settings.rounds - 1);
  save("pomo_settings", settings);
  draw();
};
$("setSound").value = settings.sound;
$("setSound").onchange = e => { settings.sound = +e.target.value; save("pomo_settings", settings); };

// Fach-Vorschläge
$("subject").value = load("pomo_subject", "");
function updateSubjectList() {
  const names = [...new Set(sessions.map(s => s.subject))].filter(n => n !== "Ohne Fach");
  $("subjectList").innerHTML = names.map(n => `<option value="${n.replace(/"/g, "&quot;")}">`).join("");
}
updateSubjectList();

/* ============================================================
   STATISTIK
   ============================================================ */
const esc = s => s.replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

function renderStats() {
  const today = dayKey(new Date());
  const sumFor = key => sessions.filter(s => s.date === key).reduce((a, s) => a + s.min, 0);

  // Letzte 7 Tage
  const days = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date(); d.setDate(d.getDate() - i);
    days.push({ key: dayKey(d), label: d.toLocaleDateString("de-CH", { weekday: "short" }), min: sumFor(dayKey(d)) });
  }
  const max = Math.max(...days.map(d => d.min), 1);
  $("chart").innerHTML = days.map(d => `
    <div class="bar-col">
      <div class="bar-val">${round1(d.min) || ""}</div>
      <div class="bar" style="height:${(d.min / max) * 100}%"></div>
      <div class="bar-day">${d.label}</div>
    </div>`).join("");

  $("stToday").textContent = round1(sumFor(today));
  $("stWeek").textContent = round1(days.reduce((a, d) => a + d.min, 0));
  $("stTotal").textContent = sessions.length;

  // Streak: aufeinanderfolgende Tage mit mind. 1 Session (heute zählt, wenn schon gelernt)
  let streak = 0;
  const d = new Date();
  if (!sumFor(dayKey(d))) d.setDate(d.getDate() - 1);
  while (sumFor(dayKey(d)) > 0) { streak++; d.setDate(d.getDate() - 1); }
  $("stStreak").textContent = streak;

  // Nach Fach
  const bySubject = {};
  sessions.forEach(s => bySubject[s.subject] = (bySubject[s.subject] || 0) + s.min);
  const entries = Object.entries(bySubject).sort((a, b) => b[1] - a[1]);
  const top = entries.length ? entries[0][1] : 1;
  $("subjectStats").innerHTML = entries.length
    ? entries.map(([n, m]) => `<div class="subject-line"><span class="name">${esc(n)}</span><div class="track"><div class="fill" style="width:${m / top * 100}%"></div></div><span class="mins">${round1(m)} min</span></div>`).join("")
    : '<p style="color:var(--muted)">Noch keine Daten. Starte deine erste Session!</p>';

  // Verlauf
  $("history").innerHTML = sessions.slice(-8).reverse().map(s => {
    const t = new Date(s.ts);
    return `<li><span>${esc(s.subject)} · ${s.min} min</span><span>${t.toLocaleDateString("de-CH")} ${t.toLocaleTimeString("de-CH", { hour: "2-digit", minute: "2-digit" })}</span></li>`;
  }).join("") || '<li><span style="color:var(--muted)">Noch nichts da.</span></li>';
}

$("clearBtn").onclick = () => {
  if (confirm("Wirklich alle Statistik-Daten löschen?")) {
    sessions = []; save("pomo_sessions", sessions); updateSubjectList(); renderStats();
  }
};

/* ============================================================
   ZITATE
   ============================================================ */
let currentQuote = -1;
let filter = "all";

function showQuote() {
  let i;
  do { i = Math.floor(Math.random() * QUOTES.length); } while (i === currentQuote && QUOTES.length > 1);
  currentQuote = i;
  $("qText").textContent = "«" + QUOTES[i].t + "»";
  $("qAuthor").textContent = "– " + QUOTES[i].a;
}

function renderQuoteList() {
  const list = QUOTES.map((q, i) => ({ ...q, i })).filter(q => filter === "all" || favs.includes(q.i));
  $("quoteList").innerHTML = list.length ? list.map(q => `
    <div class="q">
      <button class="fav ${favs.includes(q.i) ? "on" : ""}" data-i="${q.i}" title="Favorit">${favs.includes(q.i) ? "★" : "☆"}</button>
      «${esc(q.t)}»<small>– ${esc(q.a)}</small>
    </div>`).join("") : '<p style="color:var(--muted)">Noch keine Favoriten. Tippe auf den Stern bei einem Zitat.</p>';
  document.querySelectorAll(".fav").forEach(b => b.onclick = () => {
    const i = +b.dataset.i;
    favs = favs.includes(i) ? favs.filter(f => f !== i) : [...favs, i];
    save("pomo_favs", favs);
    renderQuoteList();
  });
}

document.querySelectorAll(".chips button").forEach(b => b.onclick = () => {
  document.querySelectorAll(".chips button").forEach(x => x.classList.remove("active"));
  b.classList.add("active"); filter = b.dataset.filter; renderQuoteList();
});
$("nextQuote").onclick = showQuote;

/* ============================================================
   MÖNCHS-ZITATE (in der Originalsprache)
   ============================================================ */
let currentMonk = -1;

function showMonkQuote() {
  let i;
  do { i = Math.floor(Math.random() * MONK_QUOTES.length); } while (i === currentMonk && MONK_QUOTES.length > 1);
  currentMonk = i;
  $("mText").textContent = MONK_QUOTES[i].t;
  $("mText").lang = MONK_QUOTES[i].lang;
  $("mAuthor").textContent = "– " + MONK_QUOTES[i].a;
}

function renderMonkList() {
  $("monkList").innerHTML = MONK_QUOTES.map(q => `
    <div class="q">
      <span class="lang">${esc(q.l)}</span>
      <span lang="${q.lang}">${esc(q.t)}</span><small>– ${esc(q.a)}</small>
    </div>`).join("");
}

$("nextMonk").onclick = showMonkQuote;

/* ============================================================
   REVOLUTIONÄRE
   ============================================================ */
let currentRevo = -1;

function showRevoQuote() {
  let i;
  do { i = Math.floor(Math.random() * REVO_QUOTES.length); } while (i === currentRevo && REVO_QUOTES.length > 1);
  currentRevo = i;
  $("rText").textContent = "«" + REVO_QUOTES[i].t + "»";
  $("rAuthor").textContent = "– " + REVO_QUOTES[i].a;
}

function renderRevoList() {
  $("revoList").innerHTML = REVO_QUOTES.map(q => `
    <div class="q">
      «${esc(q.t)}»${q.o ? `<span class="orig">${esc(q.o)}</span>` : ""}<small>– ${esc(q.a)}</small>
    </div>`).join("");
}

$("nextRevo").onclick = showRevoQuote;

/* ============================================================
   TO-DO (im Browser gespeichert)
   ============================================================ */
let todos = load("pomo_todos", []);   // [{ id, text, done }]
const saveTodos = () => save("pomo_todos", todos);

function renderTodos() {
  $("todoList").innerHTML = todos.length
    ? todos.map(t => `
      <li class="${t.done ? "done" : ""}" data-id="${t.id}">
        <label><input type="checkbox" ${t.done ? "checked" : ""}><span>${esc(t.text)}</span></label>
        <button class="todo-del" title="Löschen" aria-label="Löschen">✕</button>
      </li>`).join("")
    : '<li class="empty">Noch keine Aufgaben. Trag oben deine erste ein.</li>';
  $("todoList").querySelectorAll("li[data-id]").forEach(li => {
    const id = +li.dataset.id;
    li.querySelector("input").onchange = e => {
      const t = todos.find(x => x.id === id);
      if (t) { t.done = e.target.checked; saveTodos(); renderTodos(); }
    };
    li.querySelector(".todo-del").onclick = () => {
      todos = todos.filter(x => x.id !== id); saveTodos(); renderTodos();
    };
  });
}

$("todoForm").onsubmit = e => {
  e.preventDefault();
  const text = $("todoInput").value.trim();
  if (!text) return;
  todos.push({ id: Date.now(), text, done: false });
  $("todoInput").value = "";
  saveTodos(); renderTodos();
};
$("clearDone").onclick = () => { todos = todos.filter(t => !t.done); saveTodos(); renderTodos(); };

/* ============================================================
   NOTIZEN (Ordner + Word-ähnlicher Editor, im Browser gespeichert)
   ============================================================ */
let notebooks = load("pomo_notebooks", null);
if (!Array.isArray(notebooks) || !notebooks.length) notebooks = [{ id: Date.now(), name: "Allgemein", html: "" }];
let currentNb = load("pomo_current_nb", notebooks[0].id);
if (!notebooks.some(n => n.id === currentNb)) currentNb = notebooks[0].id;

const curNotebook = () => notebooks.find(n => n.id === currentNb) || notebooks[0];
const stashEditor = () => { const nb = curNotebook(); if (nb) nb.html = $("notesEditor").innerHTML; };

function persistNotes() {
  stashEditor();
  try {
    localStorage.setItem("pomo_notebooks", JSON.stringify(notebooks));
    localStorage.setItem("pomo_current_nb", JSON.stringify(currentNb));
    $("notesStatus").textContent = "Automatisch gespeichert.";
  } catch {
    $("notesStatus").textContent = "⚠ Konnte nicht speichern – die Bilder sind vermutlich zu gross.";
  }
}

function renderFolders() {
  $("folderList").innerHTML = notebooks.map(n => `
    <li class="${n.id === currentNb ? "active" : ""}" data-id="${n.id}">
      <span class="folder-name">${esc(n.name)}</span>
      <button class="folder-del" title="Ordner löschen" aria-label="Löschen">✕</button>
    </li>`).join("");
  $("folderList").querySelectorAll("li").forEach(li => {
    const id = +li.dataset.id;
    li.querySelector(".folder-name").onclick = () => switchNotebook(id);
    li.querySelector(".folder-del").onclick = e => { e.stopPropagation(); deleteNotebook(id); };
  });
}

function loadEditor() { $("notesEditor").innerHTML = curNotebook().html || ""; }

function switchNotebook(id) {
  stashEditor();
  currentNb = id;
  persistNotes();
  renderFolders();
  loadEditor();
}

function deleteNotebook(id) {
  if (notebooks.length <= 1) { alert("Es muss mindestens ein Ordner bleiben."); return; }
  const nb = notebooks.find(n => n.id === id);
  if (!confirm(`Ordner „${nb ? nb.name : ""}" mit allen Notizen löschen?`)) return;
  notebooks = notebooks.filter(n => n.id !== id);
  if (currentNb === id) currentNb = notebooks[0].id;
  persistNotes();
  renderFolders();
  loadEditor();
}

$("addFolder").onclick = () => {
  const name = prompt("Name des neuen Ordners (z. B. ein Fach):");
  if (!name || !name.trim()) return;
  stashEditor();
  const nb = { id: Date.now(), name: name.trim(), html: "" };
  notebooks.push(nb);
  currentNb = nb.id;
  persistNotes();
  renderFolders();
  loadEditor();
};

$("notesEditor").addEventListener("input", persistNotes);
document.querySelectorAll(".editor-toolbar button[data-cmd]").forEach(b => {
  b.onmousedown = e => e.preventDefault();   // Auswahl im Editor nicht verlieren
  b.onclick = () => { $("notesEditor").focus(); document.execCommand(b.dataset.cmd, false, b.dataset.val || null); persistNotes(); };
});
$("insertImg").onmousedown = e => e.preventDefault();
$("insertImg").onclick = () => $("notesImgInput").click();
$("notesImgInput").onchange = e => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => { $("notesEditor").focus(); document.execCommand("insertImage", false, reader.result); persistNotes(); };
  reader.readAsDataURL(file);
  e.target.value = "";
};

/* ============================================================
   START
   ============================================================ */
draw();
showQuote();
renderQuoteList();
showMonkQuote();
renderMonkList();
showRevoQuote();
renderRevoList();
renderTodos();
renderFolders();
loadEditor();
