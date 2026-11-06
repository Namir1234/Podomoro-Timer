// Fenster-Huelle fuer Windows. Die Seiten werden ueber ein eigenes
// app://-Protokoll ausgeliefert statt ueber file://, damit localStorage
// an einen festen Origin gebunden ist und die Daten erhalten bleiben.

const { app, BrowserWindow, Menu, Notification, Tray, ipcMain, nativeImage, protocol, shell } = require("electron");
const { erstelleHandler } = require("./serve-dist");
const path = require("node:path");

const DIST = path.join(__dirname, "..", "dist");
const STARTSEITE = "app://fokus/pages/pomodoro.html";
const ICON = path.join(__dirname, "..", "img", "icons", "icon-512.png");

// Laeuft ein Timer, beendet das Schliessen des Fensters die App nicht: Sie
// laeuft unsichtbar im Infobereich der Taskleiste weiter, damit Popup und
// Mitteilung bei Ablauf trotzdem kommen. Die Seite meldet, ob etwas laeuft.
let timerLaeuft = false;
let beenden = false;
let tray = null;
let hinweisGezeigt = false;

ipcMain.on("fokus-busy", (_e, laeuft) => { timerLaeuft = !!laeuft; });
app.on("before-quit", () => { beenden = true; });

function zeigeFenster(win) {
  if (win.isMinimized()) win.restore();
  win.show();
  win.focus();
}

function inDenInfobereich(win) {
  if (!tray) {
    tray = new Tray(nativeImage.createFromPath(ICON).resize({ width: 16, height: 16 }));
    tray.setToolTip("Fokus – Timer laeuft");
    tray.setContextMenu(Menu.buildFromTemplate([
      { label: "Fokus oeffnen", click: () => zeigeFenster(win) },
      { type: "separator" },
      { label: "Beenden", click: () => app.quit() },
    ]));
    tray.on("click", () => zeigeFenster(win));
  }
  win.hide();
  if (!hinweisGezeigt && Notification.isSupported()) {
    hinweisGezeigt = true;
    new Notification({
      title: "Fokus laeuft weiter",
      body: "Der Timer laeuft im Hintergrund. Bei Ablauf meldet sich Fokus. Beenden ueber das Symbol im Infobereich.",
      icon: ICON,
    }).show();
  }
}

protocol.registerSchemesAsPrivileged([
  { scheme: "app", privileges: { standard: true, secure: true, supportFetchAPI: true } },
]);

function createWindow() {
  const win = new BrowserWindow({
    width: 1180,
    height: 820,
    minWidth: 380,
    minHeight: 520,
    backgroundColor: "#1b2119",
    title: "Fokus",
    icon: ICON,
    autoHideMenuBar: true,
    // Timer sollen auch minimiert genau ablaufen (sonst drosselt Chromium die Intervalle)
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      backgroundThrottling: false,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  // Nach einem Ablauf: sobald man das Fenster anklickt, wieder normal verhalten
  win.on("focus", () => {
    win.setAlwaysOnTop(false);
    win.flashFrame(false);
  });

  win.on("close", (event) => {
    if (beenden || !timerLaeuft) return;
    event.preventDefault();
    inDenInfobereich(win);
  });

  win.loadURL(STARTSEITE);

  // Externe Links im richtigen Browser oeffnen, nicht im App-Fenster.
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith("http:") || url.startsWith("https:")) shell.openExternal(url);
    return { action: "deny" };
  });

  return win;
}

// Zeit ist um: Fenster aus der Taskleiste holen und vor alle anderen legen,
// damit man das Popup sieht. Windows verweigert focus() aus dem Hintergrund
// oft, darum zusaetzlich "immer oben" und ein blinkendes Taskleisten-Symbol,
// bis man das Fenster anklickt.
ipcMain.on("fokus-time-up", (event) => {
  const win = BrowserWindow.fromWebContents(event.sender);
  if (!win || win.isDestroyed()) return;
  if (win.isMinimized()) win.restore();
  win.show();
  win.setAlwaysOnTop(true);
  win.focus();
  if (win.isFocused()) win.setAlwaysOnTop(false);
  else win.flashFrame(true);
});

function buildMenu() {
  return Menu.buildFromTemplate([
    {
      label: "Fokus",
      submenu: [
        { role: "reload", label: "Neu laden" },
        { role: "toggleDevTools", label: "Entwicklerwerkzeuge" },
        { type: "separator" },
        { role: "togglefullscreen", label: "Vollbild" },
        { role: "zoomIn", label: "Groesser" },
        { role: "zoomOut", label: "Kleiner" },
        { role: "resetZoom", label: "Normale Groesse" },
        { type: "separator" },
        { role: "quit", label: "Beenden" },
      ],
    },
    {
      label: "Bearbeiten",
      submenu: [
        { role: "undo", label: "Rueckgaengig" },
        { role: "redo", label: "Wiederholen" },
        { type: "separator" },
        { role: "cut", label: "Ausschneiden" },
        { role: "copy", label: "Kopieren" },
        { role: "paste", label: "Einfuegen" },
        { role: "selectAll", label: "Alles auswaehlen" },
      ],
    },
  ]);
}

// Nur ein Fenster: ein zweiter Start holt das bestehende nach vorne.
if (!app.requestSingleInstanceLock()) {
  app.quit();
} else {
  let hauptfenster = null;

  app.on("second-instance", () => {
    if (hauptfenster) zeigeFenster(hauptfenster);
  });

  // Ohne eigene App-ID zeigt Windows die Mitteilungen ("Zeit ist um!") nicht oder als "Electron" an.
  if (process.platform === "win32") app.setAppUserModelId("com.namiralgorani.fokus");

  app.whenReady().then(() => {
    protocol.handle("app", erstelleHandler(DIST));
    Menu.setApplicationMenu(buildMenu());
    hauptfenster = createWindow();

    app.on("activate", () => {
      if (BrowserWindow.getAllWindows().length === 0) hauptfenster = createWindow();
    });
  });

  app.on("window-all-closed", () => {
    if (process.platform !== "darwin") app.quit();
  });
}
