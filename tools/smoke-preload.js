// Laeuft im isolierten Kontext der Testseite und meldet, was auf der
// Seite tatsaechlich angekommen ist. Ein Preload statt executeJavaScript,
// weil die Content-Security-Policy der App eingespeistes Skript blockiert
// - genau das soll sie, und der Test soll die echte Seite pruefen.

const { ipcRenderer } = require("electron");

const BEFUND_KANAL = "fokus-test-befund";
const WARTEZEIT_MS = 2000;

function befundErheben() {
  const zeit = document.querySelector(".time");
  return {
    zeit: zeit ? zeit.textContent.trim().split("\n")[0].trim() : null,
    menue: document.querySelectorAll(".sidebar nav button").length,
    interGeladen: [...document.fonts].some((f) => f.family === "Inter" && f.status === "loaded"),
    bilderKaputt: [...document.images]
      .filter((i) => !i.complete || i.naturalWidth === 0)
      .map((i) => i.getAttribute("src")),
    localStorageOk: (() => {
      try {
        localStorage.setItem("__test", "1");
        localStorage.removeItem("__test");
        return true;
      } catch {
        return false;
      }
    })(),
  };
}

window.addEventListener("DOMContentLoaded", () => {
  // Der Seite Zeit lassen, ihren Zustand aufzubauen.
  setTimeout(() => {
    try {
      ipcRenderer.send(BEFUND_KANAL, { befund: befundErheben() });
    } catch (e) {
      ipcRenderer.send(BEFUND_KANAL, { fehler: e.message });
    }
  }, WARTEZEIT_MS);
});
