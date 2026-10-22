// Liefert die Dateien aus dist/ unter app:// aus.
// Gelesen wird ueber fs, nicht ueber file://: in der fertig gepackten App
// stecken die Dateien in app.asar, und dort kommt nur fs hinein.

const { readFile } = require("node:fs/promises");
const path = require("node:path");

const TYPEN = new Map([
  [".html", "text/html; charset=utf-8"],
  [".js", "text/javascript; charset=utf-8"],
  [".css", "text/css; charset=utf-8"],
  [".json", "application/json; charset=utf-8"],
  [".svg", "image/svg+xml"],
  [".png", "image/png"],
  [".jpg", "image/jpeg"],
  [".jpeg", "image/jpeg"],
  [".webp", "image/webp"],
  [".woff2", "font/woff2"],
  [".woff", "font/woff"],
  [".ico", "image/x-icon"],
  [".mp3", "audio/mpeg"],
  [".wav", "audio/wav"],
]);

function erstelleHandler(dist) {
  return async function handler(request) {
    const { pathname } = new URL(request.url);
    const datei = path.join(dist, decodeURIComponent(pathname));

    // Nichts ausserhalb von dist/ ausliefern.
    const innerhalb = datei === dist || datei.startsWith(dist + path.sep);
    if (!innerhalb) return new Response("Nicht gefunden", { status: 404 });

    try {
      const inhalt = await readFile(datei);
      const typ = TYPEN.get(path.extname(datei).toLowerCase()) ?? "application/octet-stream";
      return new Response(inhalt, { headers: { "Content-Type": typ } });
    } catch {
      return new Response("Nicht gefunden", { status: 404 });
    }
  };
}

module.exports = { erstelleHandler };
