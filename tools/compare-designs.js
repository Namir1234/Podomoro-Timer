// Vergleicht die Groesse der Felder in beiden Designs (Original und Coral).
// Laedt jede Seite einmal pro Design und meldet Felder, deren Breite oder Hoehe abweicht.
// Optional mit "--shots <ordner>": speichert pro Design und Seite einen Screenshot.
// Aufruf: npm run build && npx electron tools/compare-designs.js [--shots <ordner>] [--breite 390] [--tief] [--umgekehrt]
// --tief misst alle Elemente statt nur der Felder, --umgekehrt laedt Coral zuerst.

const { app, BrowserWindow, protocol } = require("electron");
const { erstelleHandler } = require("../electron/serve-dist");
const os = require("node:os");
const path = require("node:path");
const { mkdtempSync, mkdirSync, writeFileSync } = require("node:fs");

app.setPath("userData", mkdtempSync(path.join(os.tmpdir(), "fokus-vergleich-")));

const DIST = path.join(__dirname, "..", "dist");
const SEITE = "app://fokus/pages/pomodoro.html";
const SEITEN = ["timer", "todo", "stats", "zitate"];
const SELEKTOREN = process.argv.includes("--tief") ? "main *" : ".card, .modes, .ring-wrap, .controls, .presets button, .step-row, .stat, .toggle, .btn, .subject-row";
const iShots = process.argv.indexOf("--shots");
const SHOTS = iShots > 0 ? process.argv[iShots + 1] : null;
const iBreite = process.argv.indexOf("--breite");
const BREITE = iBreite > 0 ? Number(process.argv[iBreite + 1]) : 1280;   // z.B. --breite 390 fuer die Handy-Ansicht

protocol.registerSchemesAsPrivileged([
  { scheme: "app", privileges: { standard: true, secure: true, supportFetchAPI: true } },
]);

const warte = ms => new Promise(r => setTimeout(r, ms));

const MESSEN = `(() => {
  const r = [];
  document.querySelectorAll(${JSON.stringify(SELEKTOREN)}).forEach((el, i) => {
    if (!el.offsetParent) return;
    const b = el.getBoundingClientRect();
    const name = el.id || el.className || el.tagName;
    r.push({ key: i + " " + (el.closest(".card")?.id || "") + " " + name, w: Math.round(b.width), h: Math.round(b.height), x: Math.round(b.x), y: Math.round(b.y) });
  });
  return r;
})()`;

app.whenReady().then(async () => {
  protocol.handle("app", erstelleHandler(DIST));
  if (SHOTS) mkdirSync(SHOTS, { recursive: true });
  // Fester Zufall: beide Designs zeigen dieselben Zitate, sonst brechen die Felder verschieden um
  const zufall = path.join(app.getPath("userData"), "zufall.js");
  writeFileSync(zufall, "let z = 7; Math.random = () => (z = (z * 9301 + 49297) % 233280) / 233280;");
  const win = new BrowserWindow({ show: false, width: BREITE, height: 900, paintWhenInitiallyHidden: true,
    webPreferences: { backgroundThrottling: false, offscreen: true, contextIsolation: false, sandbox: false, preload: zufall } });
  await win.loadURL(SEITE);
  await win.webContents.executeJavaScript(`localStorage.setItem("pomo_lang", JSON.stringify("de"))`);
  // Aufwaermen: beim allerersten Laden passt die Statistik-Seite ihre Felder noch nicht an
  await win.loadURL(SEITE);
  await warte(800);
  await win.webContents.executeJavaScript(`document.querySelector('nav button[data-page="stats"]')?.click()`);
  await warte(500);

  const ergebnis = {};
  for (const design of (process.argv.includes("--umgekehrt") ? ["coral", "original"] : ["original", "coral"])) {
    await win.webContents.executeJavaScript(`localStorage.setItem("pomo_design", JSON.stringify("${design}"))`);
    await win.loadURL(SEITE);
    await warte(1200);
    for (const s of SEITEN) {
      await win.webContents.executeJavaScript(`document.querySelector('nav button[data-page="${s}"]')?.click()`);
      await warte(500);
      ergebnis[design + "/" + s] = await win.webContents.executeJavaScript(MESSEN);
      if (SHOTS) writeFileSync(path.join(SHOTS, `${s}-${design}.png`), (await win.webContents.capturePage()).toPNG());
    }
  }

  let fehler = 0;
  for (const s of SEITEN) {
    const a = ergebnis["original/" + s], b = ergebnis["coral/" + s];
    const mb = new Map(b.map(e => [e.key, e]));
    for (const e of a) {
      const f = mb.get(e.key);
      if (!f) { console.log(`${s}: ${e.key} fehlt in Coral`); fehler++; continue; }
      if (Math.abs(e.w - f.w) > 1 || Math.abs(e.h - f.h) > 1 || Math.abs(e.y - f.y) > 1) {
        console.log(`${s}: ${e.key}  original ${e.w}x${e.h}@${e.y}  coral ${f.w}x${f.h}@${f.y}`);
        fehler++;
      }
    }
  }
  console.log(fehler ? `${fehler} Abweichungen` : "Alle Felder gleich gross");
  app.exit(0);
}).catch(e => { console.error(e); app.exit(1); });
