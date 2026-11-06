// Rendert die App-Icons aus img/icons/icon-source.svg (Original) und
// img/icons/icon-coral-source.svg (Coral); die App zeigt das zum Design passende.
// Electron bringt die Render-Engine schon mit, darum ist keine weitere
// Bildbibliothek noetig. Aufruf: npm run icons

const { app, BrowserWindow } = require("electron");
const os = require("node:os");
const path = require("node:path");
const { readFileSync, writeFileSync, mkdirSync, mkdtempSync, rmSync } = require("node:fs");

const root = path.join(__dirname, "..");
const ICONS = path.join(root, "img", "icons");
const XCASSETS = path.join(root, "ios", "App", "App", "Assets.xcassets");
const ORIGINAL = path.join(ICONS, "icon-source.svg");
const CORAL = path.join(ICONS, "icon-coral-source.svg");

// iOS erwartet pro Icon-Satz genau eine Datei mit 1024 px im Xcode-Projekt.
// Die Original-PNGs fuer Web und Windows gibt es schon, die Coral-PNGs entstehen hier.
const ZIELE = [
  { quelle: ORIGINAL, pfad: path.join(XCASSETS, "AppIcon.appiconset", "AppIcon-512@2x.png"), groesse: 1024 },
  { quelle: CORAL, pfad: path.join(XCASSETS, "AppIconCoral.appiconset", "AppIconCoral-1024.png"), groesse: 1024 },
  { quelle: CORAL, pfad: path.join(ICONS, "icon-coral-512.png"), groesse: 512 },
  { quelle: CORAL, pfad: path.join(ICONS, "icon-coral-192.png"), groesse: 192 },
  { quelle: CORAL, pfad: path.join(ICONS, "apple-touch-icon-coral.png"), groesse: 180 },
];

// Sonst rendert Windows mit der Anzeige-Skalierung (z.B. 150 %) und die Groesse stimmt nicht.
app.commandLine.appendSwitch("force-device-scale-factor", "1");

const arbeitsordner = mkdtempSync(path.join(os.tmpdir(), "fokus-icons-"));

let seitenNr = 0;

// Zwischen zwei Icons ist kurz kein Fenster offen; ohne diesen Handler beendet sich Electron dann.
app.on("window-all-closed", () => {});

async function rendern(svg, groesse) {
  const seite = path.join(arbeitsordner, `icon-${++seitenNr}.html`);
  writeFileSync(
    seite,
    `<!DOCTYPE html><meta charset="utf-8">
<style>html,body{margin:0;padding:0;background:#1b2119;overflow:hidden}
svg{display:block;width:${groesse}px;height:${groesse}px}</style>
${svg}`,
    "utf8"
  );

  const win = new BrowserWindow({
    show: false,
    width: groesse,
    height: groesse,
    useContentSize: true,
    backgroundColor: "#1b2119",
    // Offscreen: Fenster groesser als der Bildschirm werden sonst gekuerzt.
    webPreferences: { offscreen: true },
  });
  await win.loadFile(seite);
  // Der Engine kurz Zeit zum Zeichnen lassen, sonst kommt ein leeres Bild.
  await new Promise((r) => setTimeout(r, 500));
  const bild = await win.webContents.capturePage();
  win.destroy();
  return bild;
}

app.whenReady().then(async () => {
  try {
    for (const { quelle, pfad, groesse } of ZIELE) {
      const svg = readFileSync(quelle, "utf8");
      const bild = await rendern(svg, groesse);
      const { width, height } = bild.getSize();
      if (width !== groesse || height !== groesse) {
        throw new Error(`${groesse} px angefordert, ${width}x${height} erhalten`);
      }
      mkdirSync(path.dirname(pfad), { recursive: true });
      writeFileSync(pfad, bild.toPNG());
      console.log(`${groesse}x${groesse} geschrieben: ${path.relative(root, pfad)}`);
    }
    app.exit(0);
  } catch (e) {
    console.error("Icons konnten nicht gerendert werden:", e.message);
    app.exit(1);
  } finally {
    rmSync(arbeitsordner, { recursive: true, force: true });
  }
});
