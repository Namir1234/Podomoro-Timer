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
  { t: "Disziplin ist die Brücke zwischen Zielen und Erfolg.", a: "Jim Rohn" },
  { t: "Wer andere kennt, ist klug. Wer sich selbst kennt, ist weise.", a: "Laozi" },
  { t: "Nicht weil es schwer ist, wagen wir es nicht, sondern weil wir es nicht wagen, ist es schwer.", a: "Seneca" },
  { t: "Solange du lebst, lerne zu leben.", a: "Seneca" },
  { t: "Was im Weg steht, wird zum Weg.", a: "Marc Aurel (sinngemäss)" },
  { t: "Es sind nicht die Dinge, die uns beunruhigen, sondern unsere Urteile über die Dinge.", a: "Epiktet" },
  { t: "Der Anfang ist der wichtigste Teil der Arbeit.", a: "Platon" },
  { t: "Einfachheit ist die höchste Form der Raffinesse.", a: "Leonardo da Vinci (zugeschrieben)" },
  { t: "Genie ist ein Prozent Inspiration und neunundneunzig Prozent Transpiration.", a: "Thomas Edison" },
  { t: "Ich bin nicht gescheitert. Ich habe nur 10'000 Wege gefunden, die nicht funktionieren.", a: "Thomas Edison (zugeschrieben)" },
  { t: "Eine Investition in Wissen bringt noch immer die besten Zinsen.", a: "Benjamin Franklin" },
  { t: "Sei du selbst – alle anderen sind bereits vergeben.", a: "Oscar Wilde (zugeschrieben)" },
  { t: "Was mich nicht umbringt, macht mich stärker.", a: "Friedrich Nietzsche" },
  { t: "Wer ein Warum zum Leben hat, erträgt fast jedes Wie.", a: "Friedrich Nietzsche" },
  { t: "Die Zukunft soll man nicht voraussehen wollen, sondern möglich machen.", a: "Antoine de Saint-Exupéry" },
  { t: "Man sieht nur mit dem Herzen gut.", a: "Antoine de Saint-Exupéry" },
  { t: "Wenn ich weiter gesehen habe, dann weil ich auf den Schultern von Riesen stand.", a: "Isaac Newton" },
  { t: "Nichts im Leben muss man fürchten, man muss es nur verstehen.", a: "Marie Curie" },
  { t: "Der einzige Ort, wo Erfolg vor Arbeit kommt, ist das Wörterbuch.", a: "Vince Lombardi (zugeschrieben)" },
  { t: "Erfolg ist nicht endgültig, Misserfolg nicht fatal: Was zählt, ist der Mut weiterzumachen.", a: "Winston Churchill (zugeschrieben)" },
  { t: "Es ist besser, ein kleines Licht anzuzünden, als die Dunkelheit zu verfluchen.", a: "Konfuzius (zugeschrieben)" },
  { t: "Wer einen Berg versetzen will, beginnt damit, kleine Steine wegzutragen.", a: "Konfuzius (zugeschrieben)" },
  { t: "Es ist egal, wie langsam du gehst, solange du nicht stehen bleibst.", a: "Konfuzius (zugeschrieben)" },
  { t: "Ich weiss, dass ich nichts weiss.", a: "Sokrates (zugeschrieben)" },
  { t: "Lerne von gestern, lebe für heute, hoffe für morgen.", a: "Albert Einstein (zugeschrieben)" },
  { t: "Wer nie einen Fehler gemacht hat, hat nie etwas Neues ausprobiert.", a: "Albert Einstein (zugeschrieben)" },
  { t: "Der beste Weg, anzufangen, ist, aufzuhören zu reden und anzufangen zu tun.", a: "Walt Disney (zugeschrieben)" },
  { t: "Zwischen Reiz und Reaktion liegt ein Raum. In diesem Raum liegt unsere Freiheit.", a: "Viktor Frankl (zugeschrieben)" },
  { t: "Gestern war ich klug und wollte die Welt verändern. Heute bin ich weise und verändere mich selbst.", a: "Rumi (zugeschrieben)" },
  { t: "Was wir denken, das werden wir.", a: "Buddha (zugeschrieben)" },
  { t: "Erfolg ist kein Zufall. Er ist harte Arbeit, Ausdauer, Lernen und Hingabe.", a: "Pelé (zugeschrieben)" },
  { t: "Mut steht am Anfang des Handelns, Glück am Ende.", a: "Demokrit (zugeschrieben)" },
  { t: "Übung macht den Meister.", a: "Sprichwort" },
  { t: "Steter Tropfen höhlt den Stein.", a: "Ovid (sinngemäss)" },
  { t: "Wo ein Wille ist, ist auch ein Weg.", a: "Sprichwort" },
  { t: "Auch der längste Marsch beginnt mit dem ersten Schritt.", a: "Chinesisches Sprichwort" },
  { t: "Konzentration ist die Wurzel aller höheren Fähigkeiten des Menschen.", a: "Bruce Lee (zugeschrieben)" },
  { t: "Tu heute etwas, wofür dir dein zukünftiges Ich danken wird.", a: "Unbekannt" },
  { t: "Kleine Schritte sind besser als gar keine Schritte.", a: "Unbekannt" },
  { t: "Motivation bringt dich in Gang. Gewohnheit hält dich in Bewegung.", a: "Jim Ryun (zugeschrieben)" }
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

const DEFAULTS = { focus: 25, focusSec: 0, short: 5, shortSec: 0, long: 15, longSec: 0, rounds: 4, sound: 1, useSeconds: false, goal: 4 };
const load = (key, fallback) => { try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; } };
const save = (key, value) => { try { localStorage.setItem(key, JSON.stringify(value)); } catch {} };

let settings = { ...DEFAULTS, ...load("pomo_settings", {}) };
let sessions = load("pomo_sessions", []);       // [{date:"2026-10-06", ts:..., min:25, subject:"..."}]
let favs = load("pomo_favs", []).map(f => typeof f === "number" ? "b" + f : f);   // Favoriten als IDs
let customQuotes = load("pomo_custom_quotes", []);   // eigene Zitate [{ id, t, a }]

const $ = id => document.getElementById(id);
const dayKey = d => { const x = new Date(d); return x.getFullYear() + "-" + String(x.getMonth()+1).padStart(2,"0") + "-" + String(x.getDate()).padStart(2,"0"); };
const round1 = n => Math.round(n * 10) / 10;
// Dauer einer Phase ("focus", "short", "long") in Sekunden
const phaseSec = m => settings[m] * 60 + settings[m + "Sec"];
const fmtDur = m => [settings[m] && settings[m] + " Min.", settings[m + "Sec"] && settings[m + "Sec"] + " Sek."].filter(Boolean).join(" ");

/* ============================================================
   NAVIGATION
   ============================================================ */
function updatePageTimerState() {
  const isTimer = $("timer")?.classList.contains("active");
  document.body.classList.toggle("page-timer", !!isTimer);
}

document.querySelectorAll("nav button").forEach(btn => {
  btn.onclick = () => {
    document.querySelectorAll("nav button").forEach(b => b.classList.remove("active"));
    document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
    btn.classList.add("active");
    $(btn.dataset.page).classList.add("active");
    updatePageTimerState();
    if (btn.dataset.page === "stats") renderStats();
    if (btn.dataset.page === "timer") freeRenderAll();
  };
});
updatePageTimerState();

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

// Alle grünen Farbvariablen (Hintergrund, Karten, Linien, Akzent …) wandern gegen Ende ins Rote.
// Jeweils [Grünwert, Rotwert] als RGB. Erste Hälfte voll grün, danach langsam immer röter.
const WARM_VARS = {
  "--bg":        [[27, 33, 25],  [38, 24, 22]],
  "--card":      [[36, 43, 32],  [54, 34, 31]],
  "--inset":     [[31, 38, 28],  [46, 29, 27]],
  "--border":    [[59, 71, 51],  [96, 60, 54]],
  "--hover":     [[45, 53, 39],  [70, 44, 40]],
  "--secondary": [[53, 63, 45],  [84, 52, 47]],
  "--track":     [[59, 71, 51],  [96, 60, 54]],
  "--accent":    [[95, 125, 71], [184, 72, 54]]
};

function applyWarmth(frac) {
  const t = Math.max(0, Math.min(1, (0.5 - frac) / 0.5));   // 0 = grün (erste Hälfte) … 1 = rot (Ende)
  for (const v in WARM_VARS) {
    const [g, r] = WARM_VARS[v];
    const c = g.map((x, i) => Math.round(x + (r[i] - x) * t));
    document.body.style.setProperty(v, `rgb(${c[0]},${c[1]},${c[2]})`);
  }
}

// Ring wird mit der genauen Restzeit (inkl. Millisekunden) gezeichnet → läuft gleichmässig statt im Sekundentakt
function drawRing() {
  const left = running ? Math.max(0, (endTime - Date.now()) / 1000) : remaining;
  const frac = totalSec ? left / totalSec : 0;
  $("ringFg").style.strokeDashoffset = CIRC * (1 - frac);
  applyWarmth(frac);
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
    renderToday();
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

// Zeiteinstellung: Vorlagen, Plus/Minus, tippbare Felder und optionale Sekunden
const STEP_LIMITS = { focus: [1, 180], short: [1, 120], long: [1, 180], rounds: [1, 12] };

function clampVal(key, field, raw) {
  const n = Math.round(+raw) || 0;
  if (field === "sec") return Math.min(Math.max(n, 0), 59);
  const [min, max] = STEP_LIMITS[key];
  return Math.min(Math.max(n, min), max);
}

function showSteppers() {
  document.querySelectorAll(".step-row").forEach(row => {
    const key = row.dataset.key;
    row.querySelector('[data-field="min"]').value = key === "rounds" ? settings.rounds : settings[key];
    const secInput = row.querySelector('[data-field="sec"]');
    if (secInput) secInput.value = String(settings[key + "Sec"] || 0).padStart(2, "0");
  });
  const current = `${settings.focus},${settings.short},${settings.long}`;
  document.querySelectorAll(".presets button").forEach(b => b.classList.toggle("active", b.dataset.preset === current));
}

function commitKey(key) {
  save("pomo_settings", settings);
  if (key !== "rounds" && !running && mode === key) setMode(mode); else draw();
  showSteppers();
}

function setValue(key, field, raw) {
  if (key === "rounds") {
    settings.rounds = clampVal("rounds", "min", raw);
    focusDone = Math.min(focusDone, settings.rounds - 1);
  } else if (field === "sec") {
    settings[key + "Sec"] = clampVal(key, "sec", raw);
  } else {
    settings[key] = clampVal(key, "min", raw);
  }
  commitKey(key);
}

document.querySelectorAll(".step-row").forEach(row => {
  const key = row.dataset.key;
  row.querySelectorAll("button").forEach(b => b.onclick = () => {
    const cur = key === "rounds" ? settings.rounds : settings[key];
    setValue(key, "min", cur + (+b.dataset.d));
  });
  row.querySelectorAll(".step-val").forEach(inp => inp.onchange = () => setValue(key, inp.dataset.field, inp.value));
});

document.querySelectorAll(".presets button").forEach(b => b.onclick = () => {
  const [f, s, l] = b.dataset.preset.split(",").map(Number);
  Object.assign(settings, { focus: f, focusSec: 0, short: s, shortSec: 0, long: l, longSec: 0 });
  save("pomo_settings", settings);
  if (!running) setMode(mode); else draw();
  showSteppers();
});

// Sekunden anzeigen (Ein/Aus)
$("setSeconds").checked = !!settings.useSeconds;
$("steppers").classList.toggle("with-seconds", !!settings.useSeconds);
$("setSeconds").onchange = e => {
  settings.useSeconds = e.target.checked;
  if (!settings.useSeconds) Object.assign(settings, { focusSec: 0, shortSec: 0, longSec: 0 });
  $("steppers").classList.toggle("with-seconds", settings.useSeconds);
  save("pomo_settings", settings);
  if (!running) setMode(mode); else draw();
  showSteppers();
};

$("setSound").checked = !!+settings.sound;
$("setSound").onchange = e => { settings.sound = e.target.checked ? 1 : 0; save("pomo_settings", settings); };

showSteppers();

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
let currentQuote = "";
let filter = "all";

// Eingebaute + eigene Zitate, jedes mit stabiler ID
function allQuotes() {
  return [
    ...QUOTES.map((q, i) => ({ t: q.t, a: q.a, id: "b" + i, custom: false })),
    ...customQuotes.map(q => ({ t: q.t, a: q.a, id: q.id, custom: true }))
  ];
}

function showQuote() {
  const list = allQuotes();
  let i;
  do { i = Math.floor(Math.random() * list.length); } while (list[i].id === currentQuote && list.length > 1);
  currentQuote = list[i].id;
  $("qText").textContent = "«" + list[i].t + "»";
  $("qAuthor").textContent = "– " + list[i].a;
}

// Pro Seitenaufruf wird nur eine zufällige Auswahl gezeigt – bei jedem Öffnen eine andere
const QUOTE_BATCH = 10;
let quoteBatch = [];
function shuffleQuoteBatch() {
  const ids = allQuotes().map(q => q.id);
  for (let i = ids.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [ids[i], ids[j]] = [ids[j], ids[i]];
  }
  quoteBatch = ids.slice(0, QUOTE_BATCH);
}
shuffleQuoteBatch();

function renderQuoteList() {
  const all = allQuotes();
  const list = filter === "fav"
    ? all.filter(q => favs.includes(q.id))
    : quoteBatch.map(id => all.find(q => q.id === id)).filter(Boolean);
  $("quoteList").innerHTML = list.length ? list.map(q => `
    <div class="q">
      <button class="fav ${favs.includes(q.id) ? "on" : ""}" data-id="${q.id}" title="Favorit">${favs.includes(q.id) ? "★" : "☆"}</button>
      ${q.custom ? `<button class="qdel" data-id="${q.id}" title="Eigenes Zitat löschen" aria-label="Löschen">✕</button>` : ""}
      «${esc(q.t)}»<small>– ${esc(q.a)}</small>
    </div>`).join("") : '<p style="color:var(--muted)">Noch keine Favoriten. Tippe auf den Stern bei einem Zitat.</p>';
  $("quoteList").querySelectorAll(".fav").forEach(b => b.onclick = () => {
    const id = b.dataset.id;
    favs = favs.includes(id) ? favs.filter(f => f !== id) : [...favs, id];
    save("pomo_favs", favs);
    renderQuoteList();
  });
  $("quoteList").querySelectorAll(".qdel").forEach(b => b.onclick = () => {
    const id = b.dataset.id;
    customQuotes = customQuotes.filter(q => q.id !== id);
    favs = favs.filter(f => f !== id);
    save("pomo_custom_quotes", customQuotes);
    save("pomo_favs", favs);
    renderQuoteList();
  });
}

$("quoteAddForm").onsubmit = e => {
  e.preventDefault();
  const t = $("qNewText").value.trim();
  if (!t) return;
  const a = $("qNewAuthor").value.trim() || "Unbekannt";
  const id = "c" + Date.now();
  customQuotes.push({ id, t, a });
  save("pomo_custom_quotes", customQuotes);
  quoteBatch = [id, ...quoteBatch];   // neues Zitat sofort oben anzeigen
  $("qNewText").value = ""; $("qNewAuthor").value = "";
  renderQuoteList();
};

document.querySelectorAll(".chips button[data-filter]").forEach(b => b.onclick = () => {
  document.querySelectorAll(".chips button[data-filter]").forEach(x => x.classList.remove("active"));
  b.classList.add("active"); filter = b.dataset.filter; renderQuoteList();
});
$("nextQuote").onclick = showQuote;
$("shuffleQuotes").onclick = () => {
  shuffleQuoteBatch();
  filter = "all";
  document.querySelectorAll(".chips button[data-filter]").forEach(x => x.classList.toggle("active", x.dataset.filter === "all"));
  renderQuoteList();
};

// Umschalten zwischen den drei Zitat-Arten auf der einen Zitate-Seite
document.querySelectorAll(".qtabs button").forEach(b => b.onclick = () => {
  document.querySelectorAll(".qtabs button").forEach(x => x.classList.remove("active"));
  document.querySelectorAll(".qview").forEach(v => v.classList.remove("active"));
  b.classList.add("active");
  $("qview-" + b.dataset.qtab).classList.add("active");
});

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
let todos = load("pomo_todos", []);   // [{ id, text, done, due }]  (due: "2026-10-31" oder leer)
const saveTodos = () => save("pomo_todos", todos);

// Deadline als kleines Schild: Datum + wie lange noch
const validDate = v => /^\d{4}-\d{2}-\d{2}$/.test(v) ? v : "";
function dueBadge(t) {
  if (!validDate(t.due || "")) return "";
  const [y, m, d] = t.due.split("-").map(Number);
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const diff = Math.round((new Date(y, m - 1, d) - today) / 864e5);
  const rel = diff === 0 ? "heute" : diff === 1 ? "morgen" : diff > 1 ? `in ${diff} Tagen`
    : diff === -1 ? "seit gestern überfällig" : `seit ${-diff} Tagen überfällig`;
  const cls = t.done ? "" : diff < 0 ? "late" : diff <= 1 ? "soon" : "";
  return `<span class="due ${cls}" title="Fällig am">${String(d).padStart(2, "0")}.${String(m).padStart(2, "0")}.${y} · ${rel}</span>`;
}

function renderTodos() {
  $("todoList").innerHTML = todos.length
    ? todos.map(t => `
      <li class="${t.done ? "done" : ""}" data-id="${t.id}">
        <label><input type="checkbox" ${t.done ? "checked" : ""}><span>${esc(t.text)}</span></label>
        ${dueBadge(t)}
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
  todos.push({ id: Date.now(), text, done: false, due: validDate($("todoDate").value) });
  $("todoInput").value = ""; $("todoDate").value = "";
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

// Zeigt an den Knöpfen, welche Formatierung an der Cursor-Stelle gerade aktiv ist
function updateToolbar() {
  document.querySelectorAll(".editor-toolbar button[data-cmd]").forEach(b => {
    let active = false;
    try {
      if (b.dataset.cmd === "formatBlock") {
        active = (document.queryCommandValue("formatBlock") || "").toLowerCase() === (b.dataset.val || "").toLowerCase();
      } else {
        active = document.queryCommandState(b.dataset.cmd);
      }
    } catch {}
    b.classList.toggle("active", active);
  });
}

$("notesEditor").addEventListener("input", persistNotes);
["keyup", "mouseup", "focus"].forEach(ev => $("notesEditor").addEventListener(ev, updateToolbar));
$("notesEditor").addEventListener("blur", () => document.querySelectorAll(".editor-toolbar button[data-cmd]").forEach(b => b.classList.remove("active")));
document.addEventListener("selectionchange", () => { if (document.activeElement === $("notesEditor")) updateToolbar(); });
document.querySelectorAll(".editor-toolbar button[data-cmd]").forEach(b => {
  b.onmousedown = e => e.preventDefault();   // Auswahl im Editor nicht verlieren
  b.onclick = () => { $("notesEditor").focus(); document.execCommand(b.dataset.cmd, false, b.dataset.val || null); persistNotes(); updateToolbar(); };
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
   PROJEKTE (jedes Projekt hat eigene To-dos und Notizen)
   ============================================================ */
let projects = load("pomo_projects", null);
if (!Array.isArray(projects) || !projects.length) projects = [{ id: Date.now(), name: "Mein Projekt", todos: [], notesHtml: "" }];
let currentProj = load("pomo_current_project", projects[0].id);
if (!projects.some(p => p.id === currentProj)) currentProj = projects[0].id;

const curProject = () => projects.find(p => p.id === currentProj) || projects[0];
const stashProjEditor = () => { const p = curProject(); if (p) p.notesHtml = $("projEditor").innerHTML; };

function persistProjects() {
  stashProjEditor();
  try {
    localStorage.setItem("pomo_projects", JSON.stringify(projects));
    localStorage.setItem("pomo_current_project", JSON.stringify(currentProj));
  } catch {}
}

function renderProjectList() {
  $("projList").innerHTML = projects.map(p => `
    <li class="${p.id === currentProj ? "active" : ""}" data-id="${p.id}">
      <span class="folder-name">${esc(p.name)}</span>
      <button class="folder-del" title="Projekt löschen" aria-label="Löschen">✕</button>
    </li>`).join("");
  $("projList").querySelectorAll("li").forEach(li => {
    const id = +li.dataset.id;
    li.querySelector(".folder-name").onclick = () => switchProject(id);
    li.querySelector(".folder-del").onclick = e => { e.stopPropagation(); deleteProject(id); };
  });
}

function renderProject() {
  const p = curProject();
  $("projTitle").textContent = p.name;
  $("projTodoList").innerHTML = p.todos.length
    ? p.todos.map(t => `
      <li class="${t.done ? "done" : ""}" data-id="${t.id}">
        <label><input type="checkbox" ${t.done ? "checked" : ""}><span>${esc(t.text)}</span></label>
        ${dueBadge(t)}
        <button class="todo-del" title="Löschen" aria-label="Löschen">✕</button>
      </li>`).join("")
    : '<li class="empty">Noch keine Aufgaben.</li>';
  $("projTodoList").querySelectorAll("li[data-id]").forEach(li => {
    const id = +li.dataset.id;
    li.querySelector("input").onchange = e => { const t = p.todos.find(x => x.id === id); if (t) { t.done = e.target.checked; persistProjects(); renderProject(); } };
    li.querySelector(".todo-del").onclick = () => { p.todos = p.todos.filter(x => x.id !== id); persistProjects(); renderProject(); };
  });
  $("projEditor").innerHTML = p.notesHtml || "";
}

function switchProject(id) { stashProjEditor(); currentProj = id; persistProjects(); renderProjectList(); renderProject(); }

function deleteProject(id) {
  if (projects.length <= 1) { alert("Es muss mindestens ein Projekt bleiben."); return; }
  const p = projects.find(x => x.id === id);
  if (!confirm(`Projekt „${p ? p.name : ""}" mit To-dos und Notizen löschen?`)) return;
  projects = projects.filter(x => x.id !== id);
  if (currentProj === id) currentProj = projects[0].id;
  persistProjects(); renderProjectList(); renderProject();
}

$("addProject").onclick = () => {
  const name = prompt("Name des neuen Projekts:");
  if (!name || !name.trim()) return;
  stashProjEditor();
  const p = { id: Date.now(), name: name.trim(), todos: [], notesHtml: "" };
  projects.push(p); currentProj = p.id;
  persistProjects(); renderProjectList(); renderProject();
};

$("projTodoForm").onsubmit = e => {
  e.preventDefault();
  const text = $("projTodoInput").value.trim();
  if (!text) return;
  curProject().todos.push({ id: Date.now(), text, done: false, due: validDate($("projTodoDate").value) });
  $("projTodoInput").value = ""; $("projTodoDate").value = "";
  persistProjects(); renderProject();
};

function updateProjToolbar() {
  document.querySelectorAll('.proj-main .editor-toolbar button[data-pcmd]').forEach(b => {
    let active = false;
    try {
      active = b.dataset.pcmd === "formatBlock"
        ? (document.queryCommandValue("formatBlock") || "").toLowerCase() === (b.dataset.val || "").toLowerCase()
        : document.queryCommandState(b.dataset.pcmd);
    } catch {}
    b.classList.toggle("active", active);
  });
}
$("projEditor").addEventListener("input", persistProjects);
["keyup", "mouseup", "focus"].forEach(ev => $("projEditor").addEventListener(ev, updateProjToolbar));
$("projEditor").addEventListener("blur", () => document.querySelectorAll('.proj-main .editor-toolbar button[data-pcmd]').forEach(b => b.classList.remove("active")));
document.addEventListener("selectionchange", () => { if (document.activeElement === $("projEditor")) updateProjToolbar(); });
document.querySelectorAll('.proj-main .editor-toolbar button[data-pcmd]').forEach(b => {
  b.onmousedown = e => e.preventDefault();
  b.onclick = () => { $("projEditor").focus(); document.execCommand(b.dataset.pcmd, false, b.dataset.val || null); persistProjects(); updateProjToolbar(); };
});
$("projInsertImg").onmousedown = e => e.preventDefault();
$("projInsertImg").onclick = () => $("projImgInput").click();
$("projImgInput").onchange = e => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => { $("projEditor").focus(); document.execCommand("insertImage", false, reader.result); persistProjects(); };
  reader.readAsDataURL(file);
  e.target.value = "";
};

/* ============================================================
   TIMER-ÜBERSICHT: Heute-Werte, Tagesziel, Zitat
   ============================================================ */
function renderToday() {
  const sumFor = k => sessions.filter(s => s.date === k).reduce((a, s) => a + s.min, 0);
  const todayKey = dayKey(new Date());
  const todays = sessions.filter(s => s.date === todayKey);
  $("tMin").textContent = round1(sumFor(todayKey));
  $("tSessions").textContent = todays.length;
  let streak = 0; const d = new Date();
  if (!sumFor(dayKey(d))) d.setDate(d.getDate() - 1);
  while (sumFor(dayKey(d)) > 0) { streak++; d.setDate(d.getDate() - 1); }
  $("tStreak").textContent = streak;
  const goal = settings.goal || 4;
  $("goalVal").textContent = goal;
  $("goalCount").textContent = `${todays.length} / ${goal}`;
  $("goalFill").style.width = Math.min(100, todays.length / goal * 100) + "%";
}

$("goalMinus").onclick = () => { settings.goal = Math.max((settings.goal || 4) - 1, 1); save("pomo_settings", settings); renderToday(); };
$("goalPlus").onclick = () => { settings.goal = Math.min((settings.goal || 4) + 1, 12); save("pomo_settings", settings); renderToday(); };

function showTimerQuote() {
  const list = allQuotes();
  const q = list[Math.floor(Math.random() * list.length)];
  $("tQuote").textContent = "«" + q.t + "»";
  $("tQuoteAuthor").textContent = "– " + q.a;
}

/* ============================================================
   MENÜ ANPASSEN: sichtbare Menüpunkte und Reihenfolge
   ============================================================ */
const navEl = document.querySelector("nav");
const MENU_DEFAULT = [...navEl.querySelectorAll("button")].map(b => b.dataset.page);
let menuCfg = load("pomo_menu", null);

function normalizeMenu() {
  if (!Array.isArray(menuCfg)) menuCfg = MENU_DEFAULT.map(page => ({ page, visible: true }));
  menuCfg = menuCfg.filter(m => MENU_DEFAULT.includes(m.page));
  MENU_DEFAULT.forEach(page => { if (!menuCfg.some(m => m.page === page)) menuCfg.push({ page, visible: true }); });
  menuCfg.find(m => m.page === "timer").visible = true;   // Timer bleibt immer sichtbar
}

function applyMenu() {
  menuCfg.forEach(m => {
    const b = navEl.querySelector(`button[data-page="${m.page}"]`);
    navEl.appendChild(b);
    b.hidden = !m.visible;
  });
  const active = navEl.querySelector("button.active");
  if (active && active.hidden) navEl.querySelector('button[data-page="timer"]').click();
}

function saveMenu() { save("pomo_menu", menuCfg); applyMenu(); renderMenuEdit(); }

function renderMenuEdit() {
  $("menuEditList").innerHTML = menuCfg.map((m, i) => {
    const b = navEl.querySelector(`button[data-page="${m.page}"]`);
    const locked = m.page === "timer";
    return `
      <li>
        <label><input type="checkbox" data-i="${i}" ${m.visible ? "checked" : ""} ${locked ? "disabled" : ""}>
          <img class="icon" src="${b.querySelector("img").getAttribute("src")}" alt="">${esc(b.querySelector(".label").textContent)}</label>
        <span class="order">
          <button type="button" data-move="-1" data-i="${i}" ${i === 0 ? "disabled" : ""} aria-label="nach oben">↑</button>
          <button type="button" data-move="1" data-i="${i}" ${i === menuCfg.length - 1 ? "disabled" : ""} aria-label="nach unten">↓</button>
        </span>
      </li>`;
  }).join("");
  $("menuEditList").querySelectorAll("input").forEach(cb => cb.onchange = () => {
    menuCfg[+cb.dataset.i].visible = cb.checked; saveMenu();
  });
  $("menuEditList").querySelectorAll("[data-move]").forEach(btn => btn.onclick = () => {
    const i = +btn.dataset.i, j = i + +btn.dataset.move;
    [menuCfg[i], menuCfg[j]] = [menuCfg[j], menuCfg[i]]; saveMenu();
  });
}

const closeMenuModal = () => { $("menuModal").hidden = true; };
$("menuEditBtn").onclick = () => { renderMenuEdit(); $("menuModal").hidden = false; };
$("menuDone").onclick = closeMenuModal;
$("menuModal").onclick = e => { if (e.target === $("menuModal")) closeMenuModal(); };
document.addEventListener("keydown", e => { if (e.key === "Escape" && !$("menuModal").hidden) closeMenuModal(); });
$("menuReset").onclick = () => { menuCfg = null; normalizeMenu(); saveMenu(); };

normalizeMenu();
applyMenu();

/* ============================================================
   FELDER ANORDNEN: Position, Breite und Höhe der Felder anpassen
   Raster mit 12 Spalten.
   Pro Karte wird gespeichert:
     - order: Array der Karten-IDs im Container
     - size: { [kartenId]: { w: Spalten (3..12), h: Höhe in px (oder weggelassen für Auto) } }
   ============================================================ */
const GRID_COLS = 12;
const MIN_SPAN = 3;
let layout = load("pomo_layout", {});
const layoutBoxes = [...document.querySelectorAll(".page, .qview")].filter(box => box.querySelector(":scope > .card"));

function getBoxCards(box) {
  return [...box.children].filter(el => el.classList.contains("card"));
}

function getCardId(card, box, index) {
  return card.dataset.cardId || card.dataset.card || (box.id + "-" + index);
}

function getCardTitle(card) {
  if (card.dataset.cardTitle) return card.dataset.cardTitle;
  const h = card.querySelector("h2");
  if (h) {
    const text = h.textContent.trim();
    if (text) return text;
  }
  return "Feld";
}

function boxCfg(box) {
  const cfg = layout[box.id] || (layout[box.id] = {});
  cfg.size = cfg.size || {};
  return cfg;
}

const saveLayout = () => save("pomo_layout", layout);

function saveBoxOrder(box) {
  const cfg = boxCfg(box);
  cfg.order = getBoxCards(box).map(c => c.dataset.card);
  saveLayout();
}

function getCardSize(card) {
  const box = card.parentElement;
  if (!box) return {};
  const cfg = boxCfg(box);
  return { ...(cfg.size[card.dataset.card] || {}) };
}

function getCardSpan(card) {
  const s = getCardSize(card);
  return (s && s.w) ? s.w : 6;
}

function setCardSize(card, s) {
  const box = card.parentElement;
  if (!box) return;
  const cfg = boxCfg(box);
  const clean = {};
  if (s && s.w) clean.w = Math.min(GRID_COLS, Math.max(MIN_SPAN, s.w));
  if (s && s.h) clean.h = Math.max(140, Math.round(s.h / 10) * 10);
  cfg.size[card.dataset.card] = clean;
}

function applyCardSize(card, s) {
  if (s && s.w) {
    card.style.setProperty("--span", s.w);
  } else {
    card.style.removeProperty("--span");
  }
  if (s && s.h) {
    card.style.height = s.h + "px";
    card.classList.add("sized");
  } else {
    card.style.removeProperty("height");
    card.classList.remove("sized");
  }
}

// Ermittelt die Karten, die in derselben Zeile wie die gegebene Karte liegen
function getRowCards(card) {
  const box = card.parentElement;
  if (!box) return [card];
  const cards = getBoxCards(box);
  let currentRow = [];
  let currentUsed = 0;
  for (const c of cards) {
    const w = getCardSpan(c);
    if (currentRow.length > 0 && currentUsed + w > GRID_COLS) {
      if (currentRow.includes(card)) {
        return currentRow;
      }
      currentRow = [];
      currentUsed = 0;
    }
    currentRow.push(c);
    currentUsed += w;
  }
  return currentRow;
}

// Stellt sicher, dass Paare in einer Zeile nicht über 12 Spalten überlaufen und nach unten springen
function sanitizeBoxSizes(box) {
  const cards = getBoxCards(box);
  const cfg = boxCfg(box);
  let currentRow = [];
  let currentUsed = 0;

  for (let i = 0; i < cards.length; i++) {
    const card = cards[i];
    const s = cfg.size[card.dataset.card] || {};
    let w = s.w || 6;

    if (w >= GRID_COLS) {
      currentRow = [];
      currentUsed = 0;
      continue;
    }

    if (currentRow.length > 0 && currentUsed + w > GRID_COLS) {
      const prevCard = currentRow[currentRow.length - 1];
      const prevS = cfg.size[prevCard.dataset.card] || {};
      const prevW = prevS.w || 6;
      const available = GRID_COLS - (currentUsed - prevW);

      if (available === GRID_COLS && prevW < GRID_COLS) {
        const safePrevW = Math.min(GRID_COLS - MIN_SPAN, Math.max(MIN_SPAN, prevW));
        const safeCurW = Math.max(MIN_SPAN, GRID_COLS - safePrevW);

        prevS.w = safePrevW;
        cfg.size[prevCard.dataset.card] = prevS;

        s.w = safeCurW;
        cfg.size[card.dataset.card] = s;

        currentUsed = safePrevW + safeCurW;
        currentRow = [prevCard, card];
        continue;
      }

      currentRow = [card];
      currentUsed = w;
    } else {
      currentRow.push(card);
      currentUsed += w;
    }
  }
}

// Ändert die Spaltenbreite einer Karte und verkleinert anstossende Nachbar-Karten in derselben Zeile
function setCardSpanWithSiblings(card, desiredW) {
  const box = card.parentElement;
  if (!box) return;

  const rowCards = getRowCards(card);
  const targetIndex = rowCards.indexOf(card);
  const curW = getCardSpan(card);
  desiredW = Math.min(GRID_COLS, Math.max(MIN_SPAN, desiredW));

  if (desiredW === curW) return;

  // Wenn nur 1 Karte in der Reihe ist oder gewünschte Breite 12 (Vollbild) ist
  if (rowCards.length <= 1 || desiredW === GRID_COLS) {
    const s = getCardSize(card);
    s.w = desiredW;
    setCardSize(card, s);
    applyCardSize(card, s);
    saveLayout();
    updateBoxCardsUI(box);
    return;
  }

  const delta = desiredW - curW;
  const currentTotal = rowCards.reduce((sum, c) => sum + getCardSpan(c), 0);
  const newTotal = currentTotal + delta;

  if (newTotal <= GRID_COLS) {
    const s = getCardSize(card);
    s.w = desiredW;
    setCardSize(card, s);
    applyCardSize(card, s);
    saveLayout();
    updateBoxCardsUI(box);
    return;
  }

  // Überlauf: Die Vergrösserung stösst gegen andere Karten in derselben Reihe!
  // Nachbar-Karten verkleinern, damit keine Karte nach unten springt.
  let overflow = newTotal - GRID_COLS;
  const updates = new Map();

  // 1. Zuerst Karten rechts vom Ziel verkleinern
  for (let i = targetIndex + 1; i < rowCards.length; i++) {
    const c = rowCards[i];
    const w = getCardSpan(c);
    const canShrink = Math.max(0, w - MIN_SPAN);
    const shrink = Math.min(overflow, canShrink);
    if (shrink > 0) {
      updates.set(c, w - shrink);
      overflow -= shrink;
    }
  }

  // 2. Falls noch Überlauf vorhanden: Karten links vom Ziel verkleinern
  if (overflow > 0) {
    for (let i = targetIndex - 1; i >= 0; i--) {
      const c = rowCards[i];
      const w = getCardSpan(c);
      const canShrink = Math.max(0, w - MIN_SPAN);
      const shrink = Math.min(overflow, canShrink);
      if (shrink > 0) {
        updates.set(c, w - shrink);
        overflow -= shrink;
      }
    }
  }

  // 3. Falls noch Überlauf vorhanden (alle anderen am Minimum): Ziel deckeln
  const finalW = desiredW - overflow;
  if (finalW < MIN_SPAN) return;
  updates.set(card, finalW);

  updates.forEach((newW, c) => {
    const s = getCardSize(c);
    s.w = newW;
    setCardSize(c, s);
    applyCardSize(c, s);
  });
  saveLayout();
  updateBoxCardsUI(box);
}

function updateCardUI(card) {
  const s = getCardSize(card);
  const w = (s && s.w) ? s.w : 6;
  const hText = (s && s.h) ? (s.h + "px") : "Auto";
  const badge = card.querySelector(".card-dim-badge");
  if (badge) {
    badge.textContent = `${w}/12 Spalten · Höhe: ${hText}`;
  }

  card.querySelectorAll(".btn-ctrl-span-preset").forEach(btn => {
    btn.classList.toggle("active", parseInt(btn.dataset.span, 10) === w);
  });

  const btnAuto = card.querySelector(".btn-ctrl-height-auto");
  if (btnAuto) {
    btnAuto.classList.toggle("active", !s || !s.h);
  }

  const prev = card.previousElementSibling;
  const next = card.nextElementSibling;
  const btnPrev = card.querySelector(".btn-ctrl-move-prev");
  const btnNext = card.querySelector(".btn-ctrl-move-next");
  if (btnPrev) btnPrev.disabled = !prev || !prev.classList.contains("card");
  if (btnNext) btnNext.disabled = !next || !next.classList.contains("card");

  const btnMinus = card.querySelector(".btn-ctrl-span-minus");
  if (btnMinus) {
    btnMinus.disabled = w <= MIN_SPAN;
  }

  const btnPlus = card.querySelector(".btn-ctrl-span-plus");
  if (btnPlus) {
    if (w >= GRID_COLS) {
      btnPlus.disabled = true;
    } else {
      const rowCards = getRowCards(card);
      const rowTotal = rowCards.reduce((sum, c) => sum + getCardSpan(c), 0);
      const canGrow = (rowTotal < GRID_COLS) || rowCards.some(c => c !== card && getCardSpan(c) > MIN_SPAN);
      btnPlus.disabled = !canGrow;
    }
  }
}

function updateBoxCardsUI(box) {
  getBoxCards(box).forEach(card => updateCardUI(card));
}

// Initialisiere alle Karten
layoutBoxes.forEach(box => {
  const cards = getBoxCards(box);
  cards.forEach((card, i) => {
    const cardId = getCardId(card, box, i);
    const cardTitle = getCardTitle(card);
    card.dataset.card = cardId;
    card.dataset.pos = i;
    card.dataset.cardTitle = cardTitle;

    // Erstelle Edit-Toolbar
    if (!card.querySelector(".card-edit-bar")) {
      const bar = document.createElement("div");
      bar.className = "card-edit-bar";
      bar.innerHTML = `
        <div class="card-edit-header">
          <span class="card-drag-handle" title="Gedrückt halten & ziehen zum Verschieben">
            <span class="drag-icon">⋮⋮</span>
            <span class="card-edit-title">${cardTitle}</span>
          </span>
          <span class="card-dim-badge">6/12 Spalten · Höhe: Auto</span>
        </div>
        <div class="card-edit-controls">
          <div class="card-edit-group" title="Position im Layout verschieben">
            <span class="ctrl-label">Pos:</span>
            <button type="button" class="btn-ctrl btn-ctrl-move-prev" title="Nach links / oben verschieben" aria-label="Zurück">←</button>
            <button type="button" class="btn-ctrl btn-ctrl-move-next" title="Nach rechts / unten verschieben" aria-label="Vor">→</button>
          </div>
          <div class="card-edit-group" title="Breite in Spalten (Raster von 12)">
            <span class="ctrl-label">Breite:</span>
            <button type="button" class="btn-ctrl btn-ctrl-span-minus" title="Schmaler (−1 Spalte)">−</button>
            <button type="button" class="btn-ctrl btn-ctrl-span-preset" data-span="4" title="1/3 Breite">⅓</button>
            <button type="button" class="btn-ctrl btn-ctrl-span-preset" data-span="6" title="1/2 Breite (Standard)">½</button>
            <button type="button" class="btn-ctrl btn-ctrl-span-preset" data-span="8" title="2/3 Breite">⅔</button>
            <button type="button" class="btn-ctrl btn-ctrl-span-preset" data-span="12" title="Volle Breite (100%)">Voll</button>
            <button type="button" class="btn-ctrl btn-ctrl-span-plus" title="Breiter (+1 Spalte)">+</button>
          </div>
          <div class="card-edit-group" title="Höhe anpassen">
            <span class="ctrl-label">Höhe:</span>
            <button type="button" class="btn-ctrl btn-ctrl-height-minus" title="Höhe verringern (−40px)">−</button>
            <button type="button" class="btn-ctrl btn-ctrl-height-auto" title="Automatische Höhe (an Inhalt angepasst)">Auto</button>
            <button type="button" class="btn-ctrl btn-ctrl-height-plus" title="Höhe vergrössern (+40px)">+</button>
          </div>
        </div>
      `;
      card.insertBefore(bar, card.firstChild);
    }

    // Resize-Griff
    let grip = card.querySelector(".card-resize");
    if (!grip) {
      grip = document.createElement("span");
      grip.className = "card-resize";
      grip.title = "Ziehen: Grösse ändern · Doppelklick: Höhe auf Auto zurücksetzen";
      card.appendChild(grip);
    }
  });
});

function applyLayout() {
  layoutBoxes.forEach(box => {
    const cfg = layout[box.id] || {};
    const order = Array.isArray(cfg.order) ? cfg.order : [];
    const cards = getBoxCards(box);
    const rank = c => {
      const idx = order.indexOf(c.dataset.card);
      return idx < 0 ? 1000 + +c.dataset.pos : idx;
    };
    cards.sort((a, b) => rank(a) - rank(b)).forEach(card => {
      box.appendChild(card);
    });
    sanitizeBoxSizes(box);
    getBoxCards(box).forEach(card => {
      const s = (cfg.size || {})[card.dataset.card];
      applyCardSize(card, s);
    });
    updateBoxCardsUI(box);
  });
}

// Interaktionen über Toolbar-Buttons
document.addEventListener("click", e => {
  if (!document.body.classList.contains("layout-edit")) return;

  const prevBtn = e.target.closest(".btn-ctrl-move-prev");
  if (prevBtn) {
    const card = prevBtn.closest(".card");
    const box = card?.parentElement;
    const prev = card?.previousElementSibling;
    if (box && prev && prev.classList.contains("card")) {
      box.insertBefore(card, prev);
      saveBoxOrder(box);
      updateBoxCardsUI(box);
    }
    return;
  }

  const nextBtn = e.target.closest(".btn-ctrl-move-next");
  if (nextBtn) {
    const card = nextBtn.closest(".card");
    const box = card?.parentElement;
    const next = card?.nextElementSibling;
    if (box && next && next.classList.contains("card")) {
      box.insertBefore(next, card);
      saveBoxOrder(box);
      updateBoxCardsUI(box);
    }
    return;
  }

  const spanPreset = e.target.closest(".btn-ctrl-span-preset");
  if (spanPreset) {
    const card = spanPreset.closest(".card");
    if (!card) return;
    const w = parseInt(spanPreset.dataset.span, 10);
    setCardSpanWithSiblings(card, w);
    return;
  }

  const spanMinus = e.target.closest(".btn-ctrl-span-minus");
  if (spanMinus) {
    const card = spanMinus.closest(".card");
    if (!card) return;
    const curW = getCardSpan(card);
    setCardSpanWithSiblings(card, Math.max(MIN_SPAN, curW - 1));
    return;
  }

  const spanPlus = e.target.closest(".btn-ctrl-span-plus");
  if (spanPlus) {
    const card = spanPlus.closest(".card");
    if (!card) return;
    const curW = getCardSpan(card);
    setCardSpanWithSiblings(card, Math.min(GRID_COLS, curW + 1));
    return;
  }

  const heightAuto = e.target.closest(".btn-ctrl-height-auto");
  if (heightAuto) {
    const card = heightAuto.closest(".card");
    if (!card) return;
    const s = getCardSize(card);
    delete s.h;
    setCardSize(card, s);
    applyCardSize(card, s);
    saveLayout();
    updateCardUI(card);
    return;
  }

  const heightMinus = e.target.closest(".btn-ctrl-height-minus");
  if (heightMinus) {
    const card = heightMinus.closest(".card");
    if (!card) return;
    const s = getCardSize(card);
    const curH = s.h || card.offsetHeight;
    s.h = Math.max(140, Math.round((curH - 40) / 10) * 10);
    setCardSize(card, s);
    applyCardSize(card, s);
    saveLayout();
    updateCardUI(card);
    return;
  }

  const heightPlus = e.target.closest(".btn-ctrl-height-plus");
  if (heightPlus) {
    const card = heightPlus.closest(".card");
    if (!card) return;
    const s = getCardSize(card);
    const curH = s.h || card.offsetHeight;
    s.h = Math.max(140, Math.round((curH + 40) / 10) * 10);
    setCardSize(card, s);
    applyCardSize(card, s);
    saveLayout();
    updateCardUI(card);
    return;
  }
});

// Drag & Drop
let draggedCard = null;

document.addEventListener("dragstart", e => {
  if (!document.body.classList.contains("layout-edit")) return;
  const card = e.target.closest(".page .card, .qview .card");
  if (!card || card.closest(".free-canvas")) return;
  draggedCard = card;
  card.classList.add("is-dragging");
  e.dataTransfer.effectAllowed = "move";
  e.dataTransfer.setData("text/plain", card.dataset.card);
});

document.addEventListener("dragover", e => {
  if (!draggedCard) return;
  const target = e.target.closest(".page .card, .qview .card");
  if (!target || target === draggedCard || target.parentElement !== draggedCard.parentElement) return;
  e.preventDefault();
  e.dataTransfer.dropEffect = "move";

  const box = draggedCard.parentElement;
  const rect = target.getBoundingClientRect();
  const isAfter = (e.clientY > rect.top + rect.height / 2) || (e.clientX > rect.left + rect.width / 2);
  box.insertBefore(draggedCard, isAfter ? target.nextSibling : target);
});

document.addEventListener("dragend", () => {
  if (!draggedCard) return;
  const box = draggedCard.parentElement;
  draggedCard.classList.remove("is-dragging");
  draggedCard = null;
  if (box) {
    saveBoxOrder(box);
    updateBoxCardsUI(box);
  }
});

// Resize über Griff unten rechts per Pointer Events
document.addEventListener("pointerdown", e => {
  if (!document.body.classList.contains("layout-edit")) return;
  const grip = e.target.closest(".card-resize");
  if (!grip || grip.closest(".free-canvas")) return;

  e.preventDefault();
  e.stopPropagation();

  const card = grip.closest(".card");
  const box = card.parentElement;
  const rect = card.getBoundingClientRect();
  const startX = e.clientX, startY = e.clientY;
  const gap = parseFloat(getComputedStyle(box).columnGap) || 16;
  const colW = (box.clientWidth - gap * (GRID_COLS - 1)) / GRID_COLS;
  const s = getCardSize(card);
  let touchedH = !!s.h;
  let newH = s.h;

  const rowCards = getRowCards(card);
  const targetIndex = rowCards.indexOf(card);
  const initialSpans = new Map(rowCards.map(c => [c, getCardSpan(c)]));
  const initialTargetW = initialSpans.get(card);
  const initialTotal = rowCards.reduce((sum, c) => sum + initialSpans.get(c), 0);
  const initialSizes = new Map(rowCards.map(c => [c, getCardSize(c)]));
  let currentSpans = new Map(initialSpans);

  document.body.style.cursor = "nwse-resize";
  document.body.style.userSelect = "none";
  if (e.pointerId) {
    try { grip.setPointerCapture(e.pointerId); } catch {}
  }

  function onPointerMove(pe) {
    const dx = pe.clientX - startX;
    const dy = pe.clientY - startY;

    // Höhe (px) wenn vertikal gezogen
    if (Math.abs(dy) > 8) touchedH = true;
    if (touchedH) {
      newH = Math.max(140, Math.round((rect.height + dy) / 10) * 10);
    }

    // Breite (Spalten)
    const targetW = rect.width + dx;
    const rawCols = Math.round((targetW + gap) / (colW + gap));
    let desiredW = Math.min(GRID_COLS, Math.max(MIN_SPAN, rawCols));

    currentSpans = new Map(initialSpans);

    if (rowCards.length <= 1) {
      currentSpans.set(card, desiredW);
    } else {
      const delta = desiredW - initialTargetW;

      if (delta > 0) {
        const desiredTotal = initialTotal + delta;
        if (desiredTotal <= GRID_COLS) {
          currentSpans.set(card, desiredW);
        } else {
          let overflow = desiredTotal - GRID_COLS;
          // 1. Karten rechts vom Ziel verkleinern
          for (let i = targetIndex + 1; i < rowCards.length; i++) {
            const c = rowCards[i];
            const initW = initialSpans.get(c);
            const canShrink = Math.max(0, initW - MIN_SPAN);
            const shrink = Math.min(overflow, canShrink);
            currentSpans.set(c, initW - shrink);
            overflow -= shrink;
          }
          // 2. Falls noch Überlauf vorhanden: Karten links vom Ziel verkleinern
          if (overflow > 0) {
            for (let i = targetIndex - 1; i >= 0; i--) {
              const c = rowCards[i];
              const initW = initialSpans.get(c);
              const canShrink = Math.max(0, initW - MIN_SPAN);
              const shrink = Math.min(overflow, canShrink);
              currentSpans.set(c, initW - shrink);
              overflow -= shrink;
            }
          }
          // 3. Ziel deckeln, damit keine Karte verdrängt wird
          const finalW = desiredW - overflow;
          currentSpans.set(card, Math.max(MIN_SPAN, finalW));
        }
      } else if (delta < 0) {
        currentSpans.set(card, desiredW);
        if (initialTotal === GRID_COLS) {
          // Die Reihe war voll: Freigegebener Platz geht an die rechte Nachbarkarte (verschiebt die Trennlinie)
          if (targetIndex < rowCards.length - 1) {
            const rightCard = rowCards[targetIndex + 1];
            const initW = initialSpans.get(rightCard);
            let otherSum = 0;
            for (let i = 0; i < rowCards.length; i++) {
              if (i !== targetIndex && i !== targetIndex + 1) {
                otherSum += initialSpans.get(rowCards[i]);
              }
            }
            const maxRightW = GRID_COLS - desiredW - otherSum;
            const newRightW = Math.min(maxRightW, initW + (-delta));
            currentSpans.set(rightCard, newRightW);
          }
        }
      }
    }

    rowCards.forEach(c => {
      const spanForC = currentSpans.get(c);
      const isTarget = (c === card);
      const sizeForC = {
        ...initialSizes.get(c),
        w: spanForC,
        ...(isTarget && touchedH ? { h: newH } : {})
      };
      applyCardSize(c, sizeForC);
      const badge = c.querySelector(".card-dim-badge");
      if (badge) {
        const hText = (sizeForC && sizeForC.h) ? (sizeForC.h + "px") : "Auto";
        badge.textContent = `${spanForC}/12 Spalten · Höhe: ${hText}`;
      }
    });
  }

  function onPointerUp(pe) {
    if (pe && pe.pointerId) {
      try { grip.releasePointerCapture(pe.pointerId); } catch {}
    }
    document.body.style.removeProperty("cursor");
    document.body.style.removeProperty("user-select");
    document.removeEventListener("pointermove", onPointerMove);
    document.removeEventListener("pointerup", onPointerUp);
    document.removeEventListener("pointercancel", onPointerUp);

    rowCards.forEach(c => {
      const finalW = currentSpans.get(c) ?? getCardSpan(c);
      const isTarget = (c === card);
      const curSize = getCardSize(c);
      const newSize = {
        ...curSize,
        w: finalW,
        ...(isTarget && touchedH ? { h: newH } : {})
      };
      setCardSize(c, newSize);
      applyCardSize(c, newSize);
    });

    saveLayout();
    updateBoxCardsUI(box);
  }

  document.addEventListener("pointermove", onPointerMove);
  document.addEventListener("pointerup", onPointerUp);
  document.addEventListener("pointercancel", onPointerUp);
});

// Doppelklick auf Resize-Griff: Höhe zurücksetzen
document.addEventListener("dblclick", e => {
  if (!document.body.classList.contains("layout-edit")) return;
  const grip = e.target.closest(".card-resize");
  if (!grip || grip.closest(".free-canvas")) return;
  const card = grip.closest(".card");
  const s = getCardSize(card);
  delete s.h;
  setCardSize(card, s);
  applyCardSize(card, s);
  saveLayout();
  updateCardUI(card);
});

function setLayoutEdit(on) {
  document.body.classList.toggle("layout-edit", on);
  $("layoutBar").hidden = !on;
  $("layoutEditBtn")?.classList.toggle("active", on);

  const timerBtn = $("timerLayoutToggleBtn");
  if (timerBtn) {
    timerBtn.classList.toggle("active", on);
    const label = timerBtn.querySelector(".btn-topbar-text");
    if (label) label.textContent = on ? "✓ Fertig" : "Felder anpassen";
  }

  // Felder im freien Layout werden per Pointer-Events verschoben, nicht per HTML5-Drag
  document.querySelectorAll(".page .card, .qview .card").forEach(card => {
    card.draggable = on && !card.closest(".free-canvas");
  });

  if (on) {
    layoutBoxes.forEach(box => updateBoxCardsUI(box));
  }
  freeRenderAll();
}

if ($("layoutEditBtn")) $("layoutEditBtn").onclick = () => setLayoutEdit(!document.body.classList.contains("layout-edit"));
if ($("timerLayoutToggleBtn")) $("timerLayoutToggleBtn").onclick = () => setLayoutEdit(!document.body.classList.contains("layout-edit"));
if ($("layoutDone")) $("layoutDone").onclick = () => setLayoutEdit(false);
if ($("layoutReset")) $("layoutReset").onclick = () => {
  layout = {};
  saveLayout();
  layoutBoxes.forEach(box => {
    const cards = getBoxCards(box);
    cards.sort((a, b) => (+a.dataset.pos) - (+b.dataset.pos)).forEach(card => {
      box.appendChild(card);
      applyCardSize(card, {});
    });
    updateBoxCardsUI(box);
  });
  freeResetAll();
};
document.addEventListener("keydown", e => { if (e.key === "Escape") setLayoutEdit(false); });

applyLayout();

/* ============================================================
   FREIES LAYOUT (Timer-Seite): Felder ohne Spalten frei platzieren
   - Felder liegen absolut positioniert im Container (.free-canvas)
   - Verschieben: Feld im Bearbeitungsmodus irgendwo anfassen und ziehen
   - Grösse: Griff unten rechts stufenlos ziehen, Doppelklick = Höhe automatisch
   - Magnetische Hilfslinien an Rändern anderer Felder (Alt gedrückt halten = aus)
   Gespeichert pro Feld in layout[containerId].free[kartenId]:
     { x, w: Anteil der Containerbreite (0..1), y: px von oben, h: px oder weggelassen (Auto), z: Ebene }
   ============================================================ */
const FREE_GAP = 16;          // Abstand, auf den neben andere Felder eingerastet wird
const FREE_SNAP = 8;          // Fangbereich der Hilfslinien in px
const FREE_MIN_W = 220;       // minimale Feldbreite in px
const FREE_MIN_H = 120;       // minimale Feldhöhe in px
const FREE_EDIT_EXTRA = 0;    // kein künstlicher Überhang im Bearbeitungsmodus
const freeStackedMQ = window.matchMedia("(max-width: 680px)");
const freeBoxes = [...document.querySelectorAll(".free-canvas")];

function freeGetInitialPositions() {
  return {
    "timer-clock": { x: 0, y: 0, w: 0.38, z: 1 },
    "timer-settings": { x: 0.395, y: 0, w: 0.33, z: 2 },
    "timer-today": { x: 0.74, y: 0, w: 0.26, z: 3 },
    "timer-quote": { x: 0.74, y: 285, w: 0.26, z: 4 }
  };
}

// Altes 2-Zeilen-Überlauf-Layout automatisch auf 1-Seiten-Ansicht migrieren
if (layout.timerCanvas?.free) {
  const tc = layout.timerCanvas.free;
  if (tc["timer-today"]?.y >= 500 || !tc["timer-clock"]?.w || tc["timer-clock"]?.w >= 0.45) {
    Object.assign(tc, freeGetInitialPositions());
    saveLayout();
  }
}

function freeCards(box) {
  return [...box.children].filter(el => el.classList.contains("card"));
}

function freeCfg(box) {
  const cfg = layout[box.id] || (layout[box.id] = {});
  if (!cfg.free || typeof cfg.free !== "object") cfg.free = {};
  return cfg.free;
}

function freeValid(p) {
  return !!p && [p.x, p.y, p.w].every(n => typeof n === "number" && isFinite(n)) && p.w > 0;
}

function freeIsComplete(box) {
  const cfg = freeCfg(box);
  return freeCards(box).every(c => freeValid(cfg[c.dataset.card]));
}

function freeClearStyles(card) {
  ["left", "top", "width", "height", "z-index", "order", "--span"].forEach(prop => card.style.removeProperty(prop));
  card.classList.remove("sized");
}

// Erste Anordnung: Felder anordnen (Timer-Seite auf 1 Seite optimiert)
function freeMeasureDefaults(box) {
  if (box.id === "timerCanvas") {
    box.classList.add("free-ready");
    const cfg = freeCfg(box);
    Object.assign(cfg, freeGetInitialPositions());
    return;
  }
  const legacy = layout[box.closest(".page")?.id || ""] || {};
  const order = Array.isArray(legacy.order) ? legacy.order : [];
  const sizes = legacy.size || {};
  const cards = freeCards(box);

  box.classList.remove("free-ready");
  box.style.removeProperty("height");
  cards.forEach(c => {
    freeClearStyles(c);
    const idx = order.indexOf(c.dataset.card);
    c.style.order = idx < 0 ? 1000 + +c.dataset.pos : idx;
    const s = sizes[c.dataset.card] || {};
    if (s.w) c.style.setProperty("--span", Math.min(12, Math.max(3, s.w)));
    if (s.h) c.style.height = s.h + "px";
  });

  const W = box.clientWidth;
  const bRect = box.getBoundingClientRect();
  const cfg = freeCfg(box);
  const sorted = [...cards].sort((a, b) => (+a.style.order) - (+b.style.order));
  sorted.forEach((c, i) => {
    const r = c.getBoundingClientRect();
    const s = sizes[c.dataset.card] || {};
    cfg[c.dataset.card] = {
      x: (r.left - bRect.left) / W,
      y: Math.round(r.top - bRect.top),
      w: r.width / W,
      ...(s.h ? { h: s.h } : {}),
      z: i + 1
    };
  });
  cards.forEach(c => { c.style.removeProperty("order"); c.style.removeProperty("--span"); });
}

// Neue Felder ohne gespeicherte Position unten anhängen
function freePlaceMissing(box) {
  const cfg = freeCfg(box);
  let bottom = 0;
  let maxZ = 0;
  freeCards(box).forEach(c => {
    const p = cfg[c.dataset.card];
    if (freeValid(p)) {
      bottom = Math.max(bottom, p.y + (p.h || c.offsetHeight));
      maxZ = Math.max(maxZ, p.z || 0);
    }
  });
  freeCards(box).forEach(c => {
    if (freeValid(cfg[c.dataset.card])) return;
    cfg[c.dataset.card] = { x: 0, y: bottom ? bottom + FREE_GAP : 0, w: 0.5, z: ++maxZ };
    bottom += FREE_GAP + 300;
  });
}

function freeSanitize(p) {
  p.w = Math.min(1, Math.max(0.05, p.w));
  p.x = Math.min(1 - p.w, Math.max(0, p.x));
  p.y = Math.max(0, Math.round(p.y));
  if (p.h) p.h = Math.max(FREE_MIN_H, Math.round(p.h));
  return p;
}

function freeApplyCard(card, p) {
  card.style.left = (p.x * 100) + "%";
  card.style.width = (p.w * 100) + "%";
  card.style.top = p.y + "px";
  card.style.zIndex = p.z || 1;
  if (p.h) {
    card.style.height = p.h + "px";
    card.classList.add("sized");
  } else {
    card.style.removeProperty("height");
    card.classList.remove("sized");
  }
}

function freeUpdateBadge(card, p) {
  const badge = card.querySelector(".card-dim-badge");
  if (badge) badge.textContent = `${Math.round(card.offsetWidth)} × ${p && p.h ? Math.round(p.h) : "Auto"} px`;
  card.querySelector(".free-h-auto")?.classList.toggle("active", !(p && p.h));
}

// Containerhöhe an das unterste Feld anpassen (absolut positionierte Felder haben keine Flusshöhe)
function freeUpdateHeight(box) {
  if (!box.classList.contains("free-ready")) return;
  let bottom = 0;
  freeCards(box).forEach(c => { bottom = Math.max(bottom, c.offsetTop + c.offsetHeight); });
  const extra = document.body.classList.contains("layout-edit") ? FREE_EDIT_EXTRA : 0;
  box.style.height = (bottom + extra) + "px";
}

function freeNormalizeZ(box) {
  const cfg = freeCfg(box);
  freeCards(box)
    .map(c => cfg[c.dataset.card])
    .filter(Boolean)
    .sort((a, b) => (a.z || 0) - (b.z || 0))
    .forEach((p, i) => { p.z = i + 1; });
}

function freeRender(box) {
  if (!box.clientWidth) return;                 // Seite gerade nicht sichtbar
  const cfg = freeCfg(box);
  const cards = freeCards(box);
  if (!freeIsComplete(box)) {
    const hasAny = cards.some(c => freeValid(cfg[c.dataset.card]));
    if (!hasAny) {
      if (freeStackedMQ.matches) return;        // erst messen, wenn genug Platz für das Raster da ist
      if (document.fonts && document.fonts.status !== "loaded") return; // fonts.ready rendert später erneut
      freeMeasureDefaults(box);
    } else {
      freePlaceMissing(box);
    }
    saveLayout();
  }
  box.classList.add("free-ready");
  cards.forEach(c => {
    const p = freeSanitize(cfg[c.dataset.card]);
    freeApplyCard(c, p);
  });
  freeResolveOverlaps(box);
  freeUpdateHeight(box);
  cards.forEach(c => freeUpdateBadge(c, cfg[c.dataset.card]));
}

// Garantiert, dass sich keine Felder überlappen: Überlappende Felder werden nach unten geschoben.
// Nur Anzeige (z. B. wenn Inhalt wächst) – gespeichert wird beim nächsten Verschieben/Grösse ändern.
function freeResolveOverlaps(box) {
  const cfg = freeCfg(box);
  const W = box.clientWidth;
  const items = freeCards(box).map(c => {
    const p = cfg[c.dataset.card];
    return { c, l: p.x * W, r: (p.x + p.w) * W, t: p.y, h: c.offsetHeight };
  }).sort((a, b) => a.t - b.t || a.l - b.l);
  const placed = [];
  items.forEach(it => {
    let moved = true;
    while (moved) {
      moved = false;
      for (const o of placed) {
        if (it.l < o.r - 1 && o.l < it.r - 1 && it.t < o.t + o.h - 1 && o.t < it.t + it.h - 1) {
          it.t = o.t + o.h + FREE_GAP;
          moved = true;
        }
      }
    }
    placed.push(it);
    it.c.style.top = it.t + "px";
  });
}

function freeRenderAll() {
  freeBoxes.forEach(freeRender);
}

function freeResetAll() {
  freeBoxes.forEach(box => {
    delete layout[box.id];
    box.classList.remove("free-ready");
    box.style.removeProperty("height");
    freeCards(box).forEach(freeClearStyles);
    freeRender(box);
  });
}

// Bearbeitungsleiste, Resize-Griff und Hilfslinien für jedes freie Feld anlegen
freeBoxes.forEach(box => {
  freeCards(box).forEach((card, i) => {
    const title = getCardTitle(card);
    card.dataset.card = card.dataset.cardId || (box.id + "-" + i);
    card.dataset.pos = i;
    card.dataset.cardTitle = title;

    if (!card.querySelector(".card-edit-bar")) {
      const bar = document.createElement("div");
      bar.className = "card-edit-bar";
      bar.innerHTML = `
        <div class="card-edit-header">
          <span class="card-drag-handle" title="Feld anfassen &amp; frei ziehen">
            <span class="drag-icon">⋮⋮</span>
            <span class="card-edit-title"></span>
          </span>
          <span class="card-dim-badge"></span>
        </div>
        <div class="card-edit-controls">
          <div class="card-edit-group">
            <button type="button" class="btn-ctrl free-h-auto" title="Höhe automatisch an den Inhalt anpassen">Auto-Höhe</button>
          </div>
        </div>
      `;
      bar.querySelector(".card-edit-title").textContent = title;
      card.insertBefore(bar, card.firstChild);
    }

    const FREE_HANDLES = [
      { dir: "n", cls: "free-h-n", title: "Obere Kante ziehen" },
      { dir: "s", cls: "free-h-s", title: "Untere Kante ziehen" },
      { dir: "w", cls: "free-h-w", title: "Linke Kante ziehen" },
      { dir: "e", cls: "free-h-e", title: "Rechte Kante ziehen" },
      { dir: "nw", cls: "free-h-nw free-h-corner", title: "Ecke oben-links ziehen" },
      { dir: "ne", cls: "free-h-ne free-h-corner", title: "Ecke oben-rechts ziehen" },
      { dir: "sw", cls: "free-h-sw free-h-corner", title: "Ecke unten-links ziehen" },
      { dir: "se", cls: "free-h-se free-h-corner", title: "Ecke unten-rechts ziehen" }
    ];
    if (!card.querySelector(".free-handle")) {
      FREE_HANDLES.forEach(h => {
        const grip = document.createElement("span");
        grip.className = "free-handle " + h.cls;
        grip.dataset.dir = h.dir;
        grip.title = h.title + " · Doppelklick: Höhe automatisch";
        card.appendChild(grip);
      });
    }
  });

  ["v", "h"].forEach(dir => {
    const g = document.createElement("div");
    g.className = "free-guide " + dir;
    box.appendChild(g);
  });
});

// Sucht die nächstgelegene Hilfslinie. pairs: [{ edge: aktuelle Kante, targets: [mögliche Linien] }]
function freeBestSnap(pairs) {
  let best = null;
  pairs.forEach(({ edge, targets }) => {
    targets.forEach(t => {
      const d = t - edge;
      if (Math.abs(d) <= FREE_SNAP && (!best || Math.abs(d) < Math.abs(best.d))) best = { d, line: t };
    });
  });
  return best;
}

function freeShowGuides(box, sx, sy) {
  const gv = box.querySelector(".free-guide.v");
  const gh = box.querySelector(".free-guide.h");
  if (gv) { gv.classList.toggle("show", !!sx); if (sx) gv.style.left = sx.line + "px"; }
  if (gh) { gh.classList.toggle("show", !!sy); if (sy) gh.style.top = sy.line + "px"; }
}

// Überlappen sich zwei Rechtecke { l, t, w, h }? (1px Toleranz, aneinanderstossen ist erlaubt)
function freeOverlaps(a, b) {
  return a.l < b.l + b.w - 1 && b.l < a.l + a.w - 1 && a.t < b.t + b.h - 1 && b.t < a.t + a.h - 1;
}

// Sucht für ein verdrängtes Feld (b0) einen freien Platz, bevorzugt nahe dem frei gewordenen Platz (a0)
// oder seinem bisherigen Platz. Passt es nicht in voller Breite, wird es schmaler gemacht.
function freeFindSpot(b0, a0, occupied, W) {
  const minW = Math.min(FREE_MIN_W, b0.w);
  const xs = new Set([0, a0.l, b0.l, Math.max(0, W - b0.w)]);
  const ys = new Set([0, a0.t, b0.t]);
  occupied.forEach(o => { xs.add(o.l + o.w + FREE_GAP); ys.add(o.t + o.h + FREE_GAP); });
  let best = null;
  xs.forEach(x => {
    if (x < 0 || x > W - minW) return;
    ys.forEach(y => {
      if (y < 0) return;
      const h = b0.h;
      let w = Math.min(b0.w, W - x);
      for (const o of occupied) {
        if (y < o.t + o.h - 1 && o.t < y + h - 1) {                 // liegt im selben Höhenbereich
          if (o.l <= x + 1 && o.l + o.w > x + 1) { w = 0; break; }  // Platz ist belegt
          if (o.l > x) w = Math.min(w, o.l - FREE_GAP - x);          // rechts davon begrenzt die Breite
        }
      }
      if (w < minW) return;
      const dist = Math.min(Math.hypot(x - a0.l, y - a0.t), Math.hypot(x - b0.l, y - b0.t));
      const score = dist + (b0.w - w) * 1.5;                         // Verkleinern kostet etwas
      if (!best || score < best.score) best = { score, rect: { l: x, t: y, w, h } };
    });
  });
  if (best) return best.rect;
  // Notlösung: ganz unten anhängen
  const bottom = Math.max(0, ...occupied.map(o => o.t + o.h));
  return { l: Math.min(b0.l, Math.max(0, W - b0.w)), t: bottom + FREE_GAP, w: Math.min(b0.w, W), h: b0.h };
}

// Verschieben & Grösse ändern per Pointer Events (Maus, Stift, Touch)
document.addEventListener("pointerdown", e => {
  if (!document.body.classList.contains("layout-edit")) return;
  if (e.button !== 0 || freeStackedMQ.matches) return;
  const card = e.target.closest(".free-canvas.free-ready > .card");
  if (!card) return;
  if (e.target.closest("button, input, select, textarea, a")) return;

  e.preventDefault();
  const box = card.parentElement;
  let handleEl = e.target.closest(".free-handle, .card-resize");
  let resizeDir = handleEl ? (handleEl.dataset.dir || "se") : null;

  // Auch bei Klick nahe am Rand (innerhalb von 20px) als Resize erkennen
  if (!resizeDir && !e.target.closest(".card-edit-bar, button, input, select, textarea, a")) {
    const cr = card.getBoundingClientRect();
    const relX = e.clientX - cr.left;
    const relY = e.clientY - cr.top;
    const THRESH = 20;

    const nearTop = relY <= THRESH;
    const nearBottom = relY >= cr.height - THRESH;
    const nearLeft = relX <= THRESH;
    const nearRight = relX >= cr.width - THRESH;

    let dir = "";
    if (nearTop) dir += "n";
    else if (nearBottom) dir += "s";
    if (nearLeft) dir += "w";
    else if (nearRight) dir += "e";

    if (dir) resizeDir = dir;
  }

  const mode = resizeDir ? "resize" : "move";
  const cfg = freeCfg(box);
  const id = card.dataset.card;
  const p = { ...cfg[id] };
  const W = box.clientWidth;
  const rectOf = c => ({ l: c.offsetLeft, t: c.offsetTop, w: c.offsetWidth, h: c.offsetHeight });
  const a0 = rectOf(card);
  const startX = e.clientX + window.scrollX;
  const startY = e.clientY + window.scrollY;
  const hadH = !!p.h;

  // Alle anderen Felder mit ihrer Ausgangslage
  const others = freeCards(box).filter(c => c !== card).map(c => {
    const op = cfg[c.dataset.card] || {};
    return { c, r0: rectOf(c), origH: op.h || null };
  });
  const snapEdges = others.map(o => ({ l: o.r0.l, t: o.r0.t, r: o.r0.l + o.r0.w, b: o.r0.t + o.r0.h }));
  let preview = new Map(others.map(o => [o.c, { ...o.r0 }]));

  // Gezogenes Feld nach vorne holen, andere Felder weich mitgleiten lassen
  p.z = Math.max(0, ...freeCards(box).map(c => (cfg[c.dataset.card] || {}).z || 0)) + 1;
  card.classList.add("free-active");
  others.forEach(o => o.c.classList.add("free-anim"));
  document.body.classList.add(mode === "move" ? "free-dragging" : "free-resizing");
  if (mode === "resize") document.body.setAttribute("data-resize-dir", resizeDir);
  try { card.setPointerCapture(e.pointerId); } catch {}

  // Vorschau eines anderen Feldes anwenden (Höhe nur, wenn sie verändert wurde)
  function showPreview(o, r) {
    o.c.style.left = (r.l / W * 100) + "%";
    o.c.style.width = (r.w / W * 100) + "%";
    o.c.style.top = r.t + "px";
    const h = r.fixedH ? r.h : o.origH;
    if (h) {
      o.c.style.height = h + "px";
      o.c.classList.add("sized");
    } else {
      o.c.style.removeProperty("height");
      o.c.classList.remove("sized");
    }
    freeUpdateBadge(o.c, { h });
  }

  let lastX = e.clientX, lastY = e.clientY, alt = e.altKey, raf = 0, done = false;

  function tick() {
    raf = 0;
    if (done) return;

    // Auto-Scroll, wenn der Zeiger am oberen/unteren Fensterrand ist
    const edge = 48;
    let scrollDy = 0;
    if (lastY > window.innerHeight - edge) scrollDy = Math.ceil((lastY - (window.innerHeight - edge)) / 3);
    else if (lastY < edge) scrollDy = -Math.ceil((edge - lastY) / 3);
    const beforeScroll = window.scrollY;
    if (scrollDy) window.scrollBy(0, scrollDy);
    const scrolled = window.scrollY !== beforeScroll;

    const dx = lastX + window.scrollX - startX;
    const dy = lastY + window.scrollY - startY;
    let sx = null, sy = null;

    if (mode === "move") {
      // 1. Gezogenes Feld folgt frei dem Zeiger (mit Hilfslinien)
      let L = Math.min(Math.max(0, a0.l + dx), Math.max(0, W - a0.w));
      let T = Math.max(0, a0.t + dy);
      if (!alt) {
        sx = freeBestSnap([
          { edge: L, targets: [0, ...snapEdges.flatMap(o => [o.l, o.r, o.r + FREE_GAP])] },
          { edge: L + a0.w, targets: [W, ...snapEdges.flatMap(o => [o.r, o.l, o.l - FREE_GAP])] },
          { edge: L + a0.w / 2, targets: [W / 2, ...snapEdges.map(o => (o.l + o.r) / 2)] }
        ]);
        sy = freeBestSnap([
          { edge: T, targets: [0, ...snapEdges.flatMap(o => [o.t, o.b, o.b + FREE_GAP])] },
          { edge: T + a0.h, targets: snapEdges.flatMap(o => [o.b, o.t, o.t - FREE_GAP]) }
        ]);
        if (sx) L = Math.min(Math.max(0, L + sx.d), Math.max(0, W - a0.w));
        if (sy) T = Math.max(0, T + sy.d);
      }
      p.x = L / W;
      p.y = Math.round(T);
      card.style.left = (p.x * 100) + "%";
      card.style.top = p.y + "px";

      // 2. Überdeckte Felder springen auf einen freien Platz (und werden bei Bedarf schmaler)
      const aRect = { l: L, t: p.y, w: a0.w, h: a0.h };
      const occupied = [aRect];
      const hit = [];
      preview = new Map();
      others.forEach(o => {
        if (freeOverlaps(aRect, o.r0)) hit.push(o);
        else { preview.set(o.c, { ...o.r0 }); occupied.push(o.r0); }
      });
      hit.sort((m, n) => m.r0.t - n.r0.t || m.r0.l - n.r0.l);
      hit.forEach(o => {
        const spot = freeFindSpot(o.r0, a0, occupied, W);
        preview.set(o.c, spot);
        occupied.push(spot);
      });
    } else {
      // 1. Grösse in alle 8 Richtungen ändern
      preview = new Map(others.map(o => [o.c, { ...o.r0 }]));
      let L = a0.l;
      let Wd = a0.w;
      let T = a0.t;
      let Hd = a0.h;
      let touchH = hadH;

      // === HORIZONTALE ÄNDERUNG ===
      if (resizeDir.includes("e")) {
        // Rechte Kante ziehen
        const maxW = W - a0.l;
        let targetW = Math.max(FREE_MIN_W, Math.min(maxW, a0.w + dx));
        if (!alt) {
          sx = freeBestSnap([{ edge: a0.l + targetW, targets: [W, ...snapEdges.flatMap(o => [o.r, o.l, o.l - FREE_GAP])] }]);
          if (sx) targetW = Math.max(FREE_MIN_W, Math.min(maxW, targetW + sx.d));
        }

        const a0r = a0.l + a0.w;
        const rightEdge = a0.l + targetW;
        const right = others.filter(o =>
          o.r0.l >= a0r - 1 && o.r0.t < a0.t + a0.h - 1 && a0.t < o.r0.t + o.r0.h - 1);

        right.forEach(o => {
          const gap = Math.max(0, Math.min(FREE_GAP, o.r0.l - a0r));
          if (rightEdge + gap > o.r0.l) {
            const newL = rightEdge + gap;
            const availableW = o.r0.l + o.r0.w - newL;
            if (availableW >= FREE_MIN_W) {
              preview.set(o.c, { ...preview.get(o.c), l: newL, w: availableW });
            } else {
              if (newL + FREE_MIN_W <= W) {
                preview.set(o.c, { ...preview.get(o.c), l: newL, w: Math.min(FREE_MIN_W, o.r0.w) });
              } else {
                const occupied = [{ l: a0.l, t: a0.t, w: targetW, h: a0.h }];
                others.forEach(oth => { if (oth !== o) occupied.push(preview.get(oth.c)); });
                const spot = freeFindSpot(o.r0, a0, occupied, W);
                preview.set(o.c, spot);
              }
            }
          }
        });

        L = a0.l;
        Wd = targetW;
      } else if (resizeDir.includes("w")) {
        // Linke Kante ziehen (rechte Kante R_fixed bleibt fix)
        const R_fixed = a0.l + a0.w;
        let targetL = Math.max(0, Math.min(R_fixed - FREE_MIN_W, a0.l + dx));
        if (!alt) {
          sx = freeBestSnap([{ edge: targetL, targets: [0, ...snapEdges.flatMap(o => [o.l, o.r, o.r + FREE_GAP])] }]);
          if (sx) targetL = Math.max(0, Math.min(R_fixed - FREE_MIN_W, targetL + sx.d));
        }

        const left = others.filter(o =>
          o.r0.l + o.r0.w <= a0.l + 1 && o.r0.t < a0.t + a0.h - 1 && a0.t < o.r0.t + o.r0.h - 1);

        left.forEach(o => {
          const gap = Math.max(0, Math.min(FREE_GAP, a0.l - (o.r0.l + o.r0.w)));
          if (targetL - gap < o.r0.l + o.r0.w) {
            const newR = targetL - gap;
            const availableW = newR - o.r0.l;
            if (availableW >= FREE_MIN_W) {
              const prev = preview.get(o.c);
              preview.set(o.c, { ...prev, w: availableW });
            } else {
              if (newR - FREE_MIN_W >= 0) {
                const prev = preview.get(o.c);
                preview.set(o.c, { ...prev, l: newR - FREE_MIN_W, w: FREE_MIN_W });
              } else {
                const occupied = [{ l: targetL, t: a0.t, w: R_fixed - targetL, h: a0.h }];
                others.forEach(oth => { if (oth !== o) occupied.push(preview.get(oth.c)); });
                const spot = freeFindSpot(o.r0, a0, occupied, W);
                preview.set(o.c, spot);
              }
            }
          }
        });

        L = targetL;
        Wd = R_fixed - targetL;
      }

      // === VERTIKALE ÄNDERUNG ===
      if (resizeDir.includes("s")) {
        // Untere Kante ziehen
        touchH = hadH || Math.abs(dy) > 4;
        let targetH = Math.max(FREE_MIN_H, a0.h + dy);
        if (!alt && touchH) {
          sy = freeBestSnap([{ edge: a0.t + targetH, targets: snapEdges.flatMap(o => [o.b, o.t, o.t - FREE_GAP]) }]);
          if (sy) targetH = Math.max(FREE_MIN_H, targetH + sy.d);
        }

        if (touchH) {
          const a0b = a0.t + a0.h;
          const bottomEdge = a0.t + targetH;
          const below = others.filter(o => {
            const r = preview.get(o.c);
            return r.t >= a0b - 1 && r.l < L + Wd - 1 && L < r.l + r.w - 1;
          });

          below.forEach(o => {
            const r = preview.get(o.c);
            const gap = Math.max(0, Math.min(FREE_GAP, r.t - a0b));
            if (bottomEdge + gap > r.t) {
              const newT = bottomEdge + gap;
              const availableH = r.t + r.h - newT;
              if (availableH >= FREE_MIN_H) {
                preview.set(o.c, { ...r, t: newT, h: availableH, fixedH: true });
              } else {
                preview.set(o.c, { ...r, t: newT, h: Math.max(FREE_MIN_H, r.h), fixedH: true });
              }
            }
          });
        }

        T = a0.t;
        Hd = targetH;
      } else if (resizeDir.includes("n")) {
        // Obere Kante ziehen (untere Kante B_fixed bleibt fix)
        touchH = hadH || Math.abs(dy) > 4;
        const B_fixed = a0.t + a0.h;
        let targetT = Math.max(0, Math.min(B_fixed - FREE_MIN_H, a0.t + dy));
        if (!alt && touchH) {
          sy = freeBestSnap([{ edge: targetT, targets: [0, ...snapEdges.flatMap(o => [o.t, o.b, o.b + FREE_GAP])] }]);
          if (sy) targetT = Math.max(0, Math.min(B_fixed - FREE_MIN_H, targetT + sy.d));
        }

        if (touchH) {
          const above = others.filter(o => {
            const r = preview.get(o.c);
            return r.t + r.h <= a0.t + 1 && r.l < L + Wd - 1 && L < r.l + r.w - 1;
          });

          above.forEach(o => {
            const r = preview.get(o.c);
            const gap = Math.max(0, Math.min(FREE_GAP, a0.t - (r.t + r.h)));
            if (targetT - gap < r.t + r.h) {
              const newB = targetT - gap;
              const availableH = newB - r.t;
              if (availableH >= FREE_MIN_H) {
                preview.set(o.c, { ...r, h: availableH, fixedH: true });
              } else {
                const occupied = [{ l: L, t: targetT, w: Wd, h: B_fixed - targetT }];
                others.forEach(oth => { if (oth !== o) occupied.push(preview.get(oth.c)); });
                const spot = freeFindSpot(o.r0, a0, occupied, W);
                preview.set(o.c, spot);
              }
            }
          });
        }

        T = targetT;
        Hd = B_fixed - targetT;
      }

      p.x = L / W;
      p.w = Wd / W;
      card.style.left = (p.x * 100) + "%";
      card.style.width = (p.w * 100) + "%";

      p.y = Math.round(T);
      card.style.top = p.y + "px";

      if (touchH) {
        p.h = Math.round(Hd);
        card.style.height = p.h + "px";
        card.classList.add("sized");
      }
      freeUpdateBadge(card, p);
    }

    others.forEach(o => showPreview(o, preview.get(o.c)));
    freeShowGuides(box, sx, sy);
    freeUpdateHeight(box);
    if (scrolled) raf = requestAnimationFrame(tick);
  }

  function onMove(ev) {
    lastX = ev.clientX;
    lastY = ev.clientY;
    alt = ev.altKey;
    if (!raf) raf = requestAnimationFrame(tick);
  }

  function onUp(ev) {
    done = true;
    if (raf) cancelAnimationFrame(raf);
    try { card.releasePointerCapture(ev.pointerId); } catch {}
    document.removeEventListener("pointermove", onMove);
    document.removeEventListener("pointerup", onUp);
    document.removeEventListener("pointercancel", onUp);
    card.classList.remove("free-active");
    document.body.classList.remove("free-dragging", "free-resizing");
    document.body.removeAttribute("data-resize-dir");
    freeShowGuides(box, null, null);

    // Neue Lage aller Felder speichern
    cfg[id] = freeSanitize(p);
    others.forEach(o => {
      const r = preview.get(o.c) || o.r0;
      const op = { ...(cfg[o.c.dataset.card] || {}), x: r.l / W, y: Math.round(r.t), w: r.w / W };
      if (r.fixedH) op.h = Math.round(r.h);
      cfg[o.c.dataset.card] = freeSanitize(op);
    });
    freeNormalizeZ(box);
    saveLayout();
    others.forEach(o => o.c.classList.remove("free-anim"));
    freeRender(box);
  }

  document.addEventListener("pointermove", onMove);
  document.addEventListener("pointerup", onUp);
  document.addEventListener("pointercancel", onUp);
});

// Dynamischer Cursor beim Überfahren der Karten im Bearbeitungsmodus
document.addEventListener("pointermove", e => {
  if (!document.body.classList.contains("layout-edit")) return;
  if (document.body.classList.contains("free-dragging") || document.body.classList.contains("free-resizing")) return;
  const card = e.target.closest(".free-canvas.free-ready > .card");
  if (!card) return;
  if (e.target.closest(".free-handle, .card-resize")) return;
  if (e.target.closest(".card-edit-bar, button, input, select, textarea, a")) {
    card.style.removeProperty("cursor");
    return;
  }
  const cr = card.getBoundingClientRect();
  const relX = e.clientX - cr.left;
  const relY = e.clientY - cr.top;
  const THRESH = 20;

  const nearTop = relY <= THRESH;
  const nearBottom = relY >= cr.height - THRESH;
  const nearLeft = relX <= THRESH;
  const nearRight = relX >= cr.width - THRESH;

  let dir = "";
  if (nearTop) dir += "n";
  else if (nearBottom) dir += "s";
  if (nearLeft) dir += "w";
  else if (nearRight) dir += "e";

  const cursorMap = {
    n: "ns-resize", s: "ns-resize",
    w: "ew-resize", e: "ew-resize",
    nw: "nwse-resize", se: "nwse-resize",
    ne: "nesw-resize", sw: "nesw-resize"
  };
  if (dir && cursorMap[dir]) {
    card.style.cursor = cursorMap[dir];
  } else {
    card.style.cursor = "grab";
  }
});

// "Auto-Höhe"-Knopf und Doppelklick auf einen Griff: Höhe wieder automatisch
function freeResetHeight(card) {
  const box = card.parentElement;
  const p = freeCfg(box)[card.dataset.card];
  if (!p) return;
  delete p.h;
  saveLayout();
  freeRender(box);
}
document.addEventListener("click", e => {
  if (!document.body.classList.contains("layout-edit")) return;
  const btn = e.target.closest(".free-canvas .free-h-auto");
  if (btn) freeResetHeight(btn.closest(".card"));
});
document.addEventListener("dblclick", e => {
  if (!document.body.classList.contains("layout-edit")) return;
  const grip = e.target.closest(".free-canvas .free-handle, .free-canvas .card-resize");
  if (grip) freeResetHeight(grip.closest(".card"));
});

// Neu berechnen, wenn sich Breite (Fenster, Seitenwechsel) oder Feldinhalte ändern
const freeScheduled = new Set();
function freeSchedule(box, full) {
  if (full) box._freeFull = true;
  if (freeScheduled.has(box)) return;
  freeScheduled.add(box);
  requestAnimationFrame(() => {
    freeScheduled.delete(box);
    if (document.body.classList.contains("free-dragging") || document.body.classList.contains("free-resizing")) return;
    if (box._freeFull) { box._freeFull = false; freeRender(box); }
    else {
      freeUpdateHeight(box);
      const cfg = freeCfg(box);
      freeCards(box).forEach(c => freeUpdateBadge(c, cfg[c.dataset.card]));
    }
  });
}
if ("ResizeObserver" in window) {
  const freeRO = new ResizeObserver(entries => {
    entries.forEach(en => {
      const el = en.target;
      if (el.classList.contains("free-canvas")) {
        const w = el.clientWidth;
        if (w !== el._freeW) { el._freeW = w; freeSchedule(el, true); }
      } else if (el.parentElement) {
        freeSchedule(el.parentElement, false);
      }
    });
  });
  freeBoxes.forEach(box => {
    freeRO.observe(box);
    freeCards(box).forEach(c => freeRO.observe(c));
  });
} else {
  window.addEventListener("resize", freeRenderAll);
}
freeStackedMQ.addEventListener?.("change", freeRenderAll);

// Gespeicherte Anordnung sofort anwenden; erste Messung erst nach dem Laden der Schrift
freeBoxes.forEach(box => { if (freeIsComplete(box)) freeRender(box); });
(document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve()).then(freeRenderAll);


/* ============================================================
   START
   ============================================================ */draw();
showQuote();
renderQuoteList();
showMonkQuote();
renderMonkList();
showRevoQuote();
renderRevoList();
renderTodos();
renderFolders();
loadEditor();
renderProjectList();
renderProject();
renderToday();
showTimerQuote();
