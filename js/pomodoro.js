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
  curProject().todos.push({ id: Date.now(), text, done: false });
  $("projTodoInput").value = "";
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
renderProjectList();
renderProject();
renderToday();
showTimerQuote();
