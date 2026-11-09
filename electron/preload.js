// Bruecke zwischen Seite und Fenster-Huelle:
// - Die Seite meldet das gewaehlte Design (js/design-boot.js), damit main.js das passende App-Icon setzt.
// - Ist die Zeit um, darf die Seite das Fenster nach vorne holen.
// - Sie meldet, ob ein Timer laeuft (dann bleibt die App beim Schliessen im Infobereich, siehe main.js).

const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("fokusApp", {
  setDesign: (design) => ipcRenderer.send("fokus-design", design),
  timeUp: () => ipcRenderer.send("fokus-time-up"),
  setBusy: (laeuft) => ipcRenderer.send("fokus-busy", !!laeuft),
});
