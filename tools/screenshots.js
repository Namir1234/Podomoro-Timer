// Macht Screenshots der App mit Beispieldaten fuer Startseite und README.
// Laeuft wie der Smoke-Test unsichtbar mit eigenem Profil (echte Daten bleiben unberuehrt).
// Aufruf: npm run screenshots   →   img/screens/*.png

const { app, BrowserWindow, protocol } = require("electron");
const { erstelleHandler } = require("../electron/serve-dist");
const os = require("node:os");
const path = require("node:path");
const { mkdtempSync, mkdirSync, writeFileSync } = require("node:fs");

app.setPath("userData", mkdtempSync(path.join(os.tmpdir(), "fokus-shots-")));

const DIST = path.join(__dirname, "..", "dist");
const ZIEL = path.join(__dirname, "..", "img", "screens");
const SEITE = "app://fokus/pages/pomodoro.html";

protocol.registerSchemesAsPrivileged([
  { scheme: "app", privileges: { standard: true, secure: true, supportFetchAPI: true } },
]);

// Beispieldaten: gut drei Monate Sessions mit ein paar Faechern, Pausen und To-dos
const BEISPIEL = `(() => {
  const dk = d => d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
  const faecher = ["Mathe", "Modul 122", "BMS Englisch", "Projektarbeit"];
  const ss = [], bs = [];
  let z = 7;
  const zufall = () => (z = (z * 9301 + 49297) % 233280) / 233280;
  for (let i = 100; i >= 0; i--) {
    const tag = new Date(); tag.setDate(tag.getDate() - i);
    if (i > 0 && zufall() < 0.18) continue;                 // ein paar freie Tage
    const n = i === 0 ? 3 : 1 + Math.floor(zufall() * 5);
    for (let k = 0; k < n; k++) {
      const d = new Date(tag); d.setHours(8 + k, 25, 0, 0);
      const over = zufall() < 0.25 ? Math.round(zufall() * 8) : 0;
      ss.push({ date: dk(d), ts: d.getTime(), min: 25, subject: faecher[Math.floor(zufall() * faecher.length)], over });
      bs.push({ date: dk(d), ts: d.getTime() + 3e5, min: k === 3 ? 15 : 5, kind: k === 3 ? "long" : "short", over: zufall() < 0.2 ? 2 : 0 });
    }
  }
  const morgen = new Date(); morgen.setDate(morgen.getDate() + 1);
  const woche = new Date(); woche.setDate(woche.getDate() + 6);
  localStorage.setItem("pomo_sessions", JSON.stringify(ss));
  localStorage.setItem("pomo_breaks", JSON.stringify(bs));
  localStorage.setItem("pomo_subject", JSON.stringify("Mathe"));
  localStorage.setItem("pomo_todos", JSON.stringify([
    { id: 1, text: "Mathe", done: false, due: dk(morgen) },
    { id: 2, text: "Modul 122", done: false, due: dk(woche) },
    { id: 3, text: "Vokabeln BMS Englisch", done: false, due: "" },
    { id: 4, text: "Projektarbeit", done: true, due: "" }
  ]));
  localStorage.setItem("pomo_chart_range", "weeks");
  localStorage.setItem("pomo_lang", "de");
})()`;

const warte = ms => new Promise(r => setTimeout(r, ms));

async function aufnahme(win, name, js) {
  if (js) await win.webContents.executeJavaScript(js);
  await warte(900);
  let bild = await win.webContents.capturePage();
  if (bild.getSize().width > 1600) bild = bild.resize({ width: 1600, quality: "best" });   // kleiner fuer die Webseite
  writeFileSync(path.join(ZIEL, name + ".png"), bild.toPNG());
  console.log("  img/screens/" + name + ".png");
}

const seite = p => `document.querySelector('nav button[data-page="${p}"]').click()`;

app.whenReady().then(async () => {
  protocol.handle("app", erstelleHandler(DIST));
  mkdirSync(ZIEL, { recursive: true });

  const fenster = (width, height) => new BrowserWindow({ show: false, width, height, paintWhenInitiallyHidden: true,
    webPreferences: { contextIsolation: true, nodeIntegration: false, backgroundThrottling: false, offscreen: true } });   // offscreen: sonst liefert das versteckte Fenster ein altes Bild
  const win = fenster(1280, 800);
  await win.loadURL(SEITE);
  await win.webContents.executeJavaScript(BEISPIEL);
  await win.loadURL(SEITE);
  await warte(1500);

  console.log("Screenshots:");
  await aufnahme(win, "timer", seite("timer"));
  await aufnahme(win, "stats", seite("stats"));
  await aufnahme(win, "todo", seite("todo"));

  // Handy-Ansicht: frisches Fenster, damit das Menue zu bleibt (gleiches Profil, also gleiche Daten)
  const handy = fenster(390, 844);
  handy.setContentSize(390, 844);
  await handy.loadURL(SEITE);
  await handy.webContents.insertCSS("* { scrollbar-width: none !important; } *::-webkit-scrollbar { display: none !important; }");   // Handys zeigen keinen Balken
  await warte(1500);
  await aufnahme(handy, "mobile");

  app.exit(0);
}).catch(e => { console.error(e); app.exit(1); });
