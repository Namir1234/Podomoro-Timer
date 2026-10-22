// Bereitet die Web-Dateien fuer die App-Builds auf: kopiert sie nach dist/
// und nimmt dabei heraus, was nur im Browser Sinn macht (Service Worker).
// Quelle bleibt das Projekt selbst, dist/ wird jedes Mal neu erzeugt.

import { cp, mkdir, rm, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");

const COPY = ["pages", "js", "style", "img", "manifest.json"];

// Die Registrierung im Browser laedt sw.js nach; in der App uebernimmt
// das Caching die App-Huelle selbst.
const SW_BLOCK = /\n\s*if \("serviceWorker" in navigator\) \{[\s\S]*?\n\s*\}\n/;

// Die App laedt alles aus dem eigenen Paket. 'unsafe-inline' bleibt noetig,
// weil die Seiten Skripte und Stile direkt im HTML haben.
const CSP =
  "default-src 'self'; " +
  "script-src 'self' 'unsafe-inline'; " +
  "style-src 'self' 'unsafe-inline'; " +
  "img-src 'self' data:; " +
  "font-src 'self'; " +
  "media-src 'self' data:; " +
  "connect-src 'self'";

const STARTSEITE = "pages/pomodoro.html";

await rm(dist, { recursive: true, force: true });
await mkdir(dist, { recursive: true });

for (const entry of COPY) {
  await cp(join(root, entry), join(dist, entry), { recursive: true });
}

for (const page of ["pages/index.html", "pages/pomodoro.html"]) {
  const file = join(dist, page);
  const html = await readFile(file, "utf8");
  const ohneSW = html.replace(SW_BLOCK, "\n");
  const mitCSP = ohneSW.replace(
    "<meta charset=\"UTF-8\">",
    `<meta charset="UTF-8">\n<meta http-equiv="Content-Security-Policy" content="${CSP}">`
  );
  if (mitCSP === ohneSW) throw new Error(`charset-Meta nicht gefunden in ${page}`);
  await writeFile(file, mitCSP, "utf8");
}

// Capacitor und die Electron-Huelle starten beide auf der Wurzel.
await writeFile(
  join(dist, "index.html"),
  `<!DOCTYPE html>
<html lang="de">
<head>
<meta charset="UTF-8">
<meta http-equiv="Content-Security-Policy" content="${CSP}">
<meta http-equiv="refresh" content="0; url=${STARTSEITE}">
<title>Fokus – Pomodoro Timer</title>
</head>
<body></body>
</html>
`,
  "utf8"
);

console.log("dist/ erzeugt");
