/* Design (Original oder Coral): gilt für Start- und Timer-Seite gemeinsam, mit dem Konto abgeglichen
   ("pomo_design", cloud.js lädt es hoch, wenn jemand angemeldet ist).
   Wird im <head> nach den Stylesheets geladen, damit vor dem ersten Zeichnen das richtige aktiv ist.
   Stylesheets eines Designs tragen data-design="original" bzw. data-design="coral". */

const DESIGN_COLOR = { original: "#1b2119", coral: "#181411" };

function readDesign() {
  try { return JSON.parse(localStorage.getItem("pomo_design")) === "original" ? "original" : "coral"; }
  catch { return "coral"; }
}

// Stylesheets umschalten und "designchange" melden (für Inhalte, die vom Design abhängen)
function applyDesign(d) {
  document.documentElement.dataset.design = d;
  document.querySelectorAll("link[data-design]").forEach(l => { l.disabled = l.dataset.design !== d; });
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.content = DESIGN_COLOR[d];
  document.dispatchEvent(new CustomEvent("designchange", { detail: d }));
}

function saveDesign(d) {
  try { localStorage.setItem("pomo_design", JSON.stringify(d)); } catch {}
  if (typeof cloud !== "undefined") cloud.push("pomo_design", d);
  else markDesignForUpload();
  applyDesign(d);
}

// Startseite (ohne cloud.js): Änderung für den nächsten Abgleich auf der Timer-Seite vormerken,
// sonst würde dort der ältere Stand aus der Cloud das neue Design überschreiben.
function markDesignForUpload() {
  try {
    if (!localStorage.getItem("fokus-auth")) return;
    const d = JSON.parse(localStorage.getItem("pomo__dirty"));
    const keys = Array.isArray(d) ? d : [];
    if (!keys.includes("pomo_design")) localStorage.setItem("pomo__dirty", JSON.stringify([...keys, "pomo_design"]));
  } catch {}
}

// Beschriftung für den Umschalt-Knopf, z.B. "Design: Coral" (t() kommt aus i18n.js)
function designLabelText(d) {
  return t("design.label") + ": " + (d === "original" ? t("design.original") : "Coral");
}

applyDesign(readDesign());

// In einem anderen Tab umgeschaltet: hier nachziehen, damit beide Seiten übereinstimmen
window.addEventListener("storage", e => { if (e.key === "pomo_design") applyDesign(readDesign()); });
