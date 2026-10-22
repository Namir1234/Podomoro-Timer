// Rendert die App-Icons aus img/icons/icon-source.svg.
// Electron bringt die Render-Engine schon mit, darum ist keine weitere
// Bildbibliothek noetig. Aufruf: npm run icons

const { app, BrowserWindow } = require("electron");
const os = require("node:os");
const path = require("node:path");
const { readFileSync, writeFileSync, mkdirSync, mkdtempSync, rmSync } = require("node:fs");

const root = path.join(__dirname, "..");
const QUELLE = path.join(root, "img", "icons", "icon-source.svg");

// iOS erwartet genau diese eine Datei mit 1024 px im Xcode-Projekt.
const ZIELE = [
  {
    pfad: path.join(root, "ios", "App", "App", "Assets.xcassets", "AppIcon.appiconset", "AppIcon-512@2x.png"),
    groesse: 1024,
  },
];

const arbeitsordner = mkdtempSync(path.join(os.tmpdir(), "fokus-icons-"));

async function rendern(svg, groesse) {
  const seite = path.join(arbeitsordner, `icon-${groesse}.html`);
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
    const svg = readFileSync(QUELLE, "utf8");
    for (const { pfad, groesse } of ZIELE) {
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
