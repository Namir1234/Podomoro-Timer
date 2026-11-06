// Schmale Bruecke von der Seite zur Fenster-Huelle: Ist die Zeit um,
// darf die Seite das Fenster nach vorne holen, und sie meldet, ob ein
// Timer laeuft (dann bleibt die App beim Schliessen im Infobereich, siehe main.js).

const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("fokusApp", {
  timeUp: () => ipcRenderer.send("fokus-time-up"),
  setBusy: (laeuft) => ipcRenderer.send("fokus-busy", !!laeuft),
});
