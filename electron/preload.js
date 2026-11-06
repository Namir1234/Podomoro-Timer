// Schmale Bruecke von der Seite zur Fenster-Huelle: Ist die Zeit um,
// darf die Seite das Fenster nach vorne holen (siehe main.js).

const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("fokusApp", {
  timeUp: () => ipcRenderer.send("fokus-time-up"),
});
