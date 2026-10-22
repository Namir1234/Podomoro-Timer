// Startet die Huelle einmal ohne sichtbares Fenster und prueft, dass die
// Timer-Seite wirklich rendert. Ein weisses Fenster oder eine fehlende
// Datei faellt sonst erst nach dem Ausliefern auf.
// Aufruf: npm test

const { app, BrowserWindow, ipcMain, protocol } = require("electron");
const { erstelleHandler } = require("../electron/serve-dist");
const os = require("node:os");
const path = require("node:path");
const { mkdtempSync } = require("node:fs");

// Eigenes Profil, damit der Test nicht auf gespeichertem Zustand aus einem
// echten App-Start aufsetzt und immer gleich laeuft.
app.setPath("userData", mkdtempSync(path.join(os.tmpdir(), "fokus-test-")));

const DIST = path.join(__dirname, "..", "dist");
const BEFUND_KANAL = "fokus-test-befund";
const ABBRUCH_MS = 20000;

protocol.registerSchemesAsPrivileged([
  { scheme: "app", privileges: { standard: true, secure: true, supportFetchAPI: true } },
]);

const fehler = [];

function auswerten(befund) {
  if (!/^\d\d:\d\d$/.test(befund.zeit ?? "")) {
    fehler.push(`Zeitanzeige fehlt oder unerwartet: ${JSON.stringify(befund.zeit)}`);
  }
  if (befund.menue === 0) fehler.push("Seitenmenue ist leer");
  if (!befund.interGeladen) fehler.push("Inter-Schrift wurde nicht geladen");
  if (!befund.localStorageOk) fehler.push("localStorage nicht verfuegbar");
  for (const src of befund.bilderKaputt) fehler.push(`Bild fehlt: ${src}`);
}

function abschliessen(befund) {
  if (fehler.length) {
    console.error("Test fehlgeschlagen:");
    for (const f of fehler) console.error("  -", f);
    app.exit(1);
    return;
  }
  console.log(
    `Test ok: Zeitanzeige ${befund.zeit}, ${befund.menue} Menuepunkte, ` +
      "Schrift und Bilder geladen, Speicher nutzbar."
  );
  app.exit(0);
}

app.whenReady().then(async () => {
  protocol.handle("app", erstelleHandler(DIST));

  const win = new BrowserWindow({
    show: false,
    width: 1180,
    height: 820,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      preload: path.join(__dirname, "smoke-preload.js"),
    },
  });

  win.webContents.on("console-message", (event) => {
    const stufe = event?.level ?? "";
    if (stufe !== "error" && stufe !== "warning") return;
    fehler.push(String(event?.message ?? "unbekannte Konsolenmeldung"));
  });
  win.webContents.on("did-fail-load", (_e, _code, beschreibung, url) => {
    fehler.push(`Laden fehlgeschlagen: ${beschreibung} ${url}`);
  });

  const abbruch = setTimeout(() => {
    console.error("Test fehlgeschlagen: Seite hat sich nicht gemeldet.");
    app.exit(1);
  }, ABBRUCH_MS);

  ipcMain.once(BEFUND_KANAL, (_e, nachricht) => {
    clearTimeout(abbruch);
    if (nachricht.fehler) {
      fehler.push(`Pruefung in der Seite scheiterte: ${nachricht.fehler}`);
      abschliessen({});
      return;
    }
    auswerten(nachricht.befund);
    abschliessen(nachricht.befund);
  });

  await win.loadURL("app://fokus/pages/pomodoro.html");
});
