// Bruecke zwischen Seite und Fenster-Huelle. Die Seite meldet das gewaehlte
// Design (js/design-boot.js), damit main.js das passende App-Icon setzt.

const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("fokusApp", {
  setDesign: (design) => ipcRenderer.send("fokus-design", design),
});
