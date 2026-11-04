# Projektdokumentation – Fokus Pomodoro-Timer

Stand: 4. November 2026 · Repository: https://github.com/Namir1234/Podomoro-Timer · Branch `main`

Diese Dokumentation fasst das ganze Projekt zusammen: was die App kann, wie sie
aufgebaut ist und wie sie sich vom ersten Commit bis heute entwickelt hat.
Die Chronik weiter unten ist aus der Git-Historie erstellt (66 Commits,
6. Oktober bis 4. November 2026) und wird bei jedem Commit und Push nachgeführt.

---

## 1. Überblick

**Fokus** ist ein Pomodoro-Timer mit Statistik, To-dos, Notizen, Projekten und
Zitaten. Derselbe Web-Code läuft auf drei Arten:

| Plattform | Technik | Start |
| --- | --- | --- |
| Web / PWA | HTML, CSS, JavaScript, Service Worker | `pages/index.html` öffnen |
| Windows | Electron (eigenes `app://`-Protokoll) | `npm start`, Installer mit `npm run dist:win` |
| iOS | Capacitor + Xcode | `npm run ios:sync`, dann `npm run ios:open` (Mac nötig) |

Daten liegen lokal im `localStorage` (Keys `pomo_*`). Optional meldet man sich
an und gleicht sie über **Supabase** zwischen Geräten ab.

### Funktionen (aktueller Stand)

- Pomodoro-Timer mit Fokus-, Kurz- und Langpause, Vorlagen, Plus/Minus-Steppern,
  tippbaren Zeiten, optionalem Sekunden-Modus und Ton-Schalter
- Oberfläche färbt sich gegen Ende der Phase rot
- Übersicht „Heute“: Fortschritt mit Tagesziel, Statistik, Zitat-Karte
- Nur-Timer-Ansicht (Timer gross, alles andere ausgeblendet)
- Seite „Uhren“: beliebig viele eigene Timer und Stoppuhren (mit Runden),
  laufen auch nach dem Neuladen weiter
- Felder auf allen Seiten (Timer, Uhren, To-do, Notizen, Projekte, Statistik, Zitate)
  frei verschieben und in der Grösse ändern, Inhalt skaliert mit
- To-dos (mit optionaler Deadline), Notizen mit Ordnern und Editor mit Bildern,
  Projekte mit eigenen To-dos und Notizen
- Zitate: grosser Pool, zufällige Auswahl, eigene Zitate mit Autor
- Seitenmenü klappt beim Darüberfahren auf, Menüpunkte ein-/ausblenden und sortieren
- Mobile Ansicht mit Hamburger-Menü
- Sprache: Deutsch, Englisch, Französisch, Italienisch, Ungarisch
- Design wählbar: **Original** (Olivgrün) oder **Coral**
- Login und Cloud-Sync über Supabase – inklusive Feldgrössen und Design
  (nur die Menü-Einstellung bleibt pro Gerät)

### Projektstruktur

| Ordner / Datei | Inhalt |
| --- | --- |
| `pages/` | `index.html` (Startseite), `pomodoro.html` (App) |
| `js/` | `pomodoro.js` (App-Logik), `i18n.js` (Übersetzungen), `cloud.js` + `cloud-config.js` (Supabase), `design-boot.js` (Design-Wahl), `vendor/supabase.js` |
| `style/` | `tokens.css`, `base.css`, `pomodoro.css`, `pomodoro-original.css`, `start.css`, `start-coral.css`, `lang-menu.css`, Schriften |
| `img/` | Icons, Bilder, App-Icons |
| `sw.js`, `manifest.json` | PWA (offlinefähig, installierbar) |
| `electron/` | Windows-Hülle (`main.js`, `serve-dist.js`) |
| `ios/` | Xcode-Projekt (von Capacitor erzeugt) |
| `supabase/schema.sql` | Tabelle `user_data` mit Row-Level-Security |
| `tools/` | Build-Script, Icon-Renderer, Smoke-Test |
| `dist/` | Build-Ausgabe, nicht von Hand bearbeiten |
| `release/` | fertige Windows-Dateien |

Details zum Einrichten (Supabase, Windows, iOS) stehen im [README](README.md).

---

## 2. Arbeitsweise mit Git

- **Hauptbranch:** `main`, gepusht nach `origin` (GitHub).
- **Commit-Nachrichten:** auf Deutsch, kurz und beschreibend („Was wurde
  geändert“), meist ohne Umlaute (`ae`, `oe`, `ue`).
- **Autoren:** Alle Commits stammen von Namir Al Gorani, mit drei
  verschiedenen Git-Namen je nach Gerät/Konfiguration:
  `Namir1234` (6.–8. Okt.), `Namir Al Gorani` (ab 8. Okt.), `Namir` (3. Nov.).
- **Feature-Branches:** Grössere Änderungen wurden auf eigenen Branches
  gemacht und danach in `main` übernommen:

| Branch | Zweck | Stand |
| --- | --- | --- |
| `app-windows-ios` | Electron- und Capacitor-App | in `main` enthalten |
| `feature/login` | Login und Cloud-Sync | in `main` enthalten |
| `hallmark-test` | erster Design-Test (Theme Hedgerow) | in `main` enthalten |
| `hallmark-coral` | Coral-Design, wählbares Design | per Merge-Commit `1a3a846` in `main` |
| `agy-test`, `agy--test`, `worktree-agent-…` | Test-/Hilfsbranches | keine eigenen Commits ausserhalb von `main` |

Alle Nebenbranches haben keine Commits, die nicht schon in `main` sind – sie
könnten gelöscht werden.

---

## 3. Chronik

Format pro Commit: **Uhrzeit · Hash · Nachricht** – danach kurz, was das bedeutet
und wie gross die Änderung war (Dateien / +hinzugefügt / −entfernt).

### Phase 1 – Start und Sperr-Experimente (6. Oktober 2026)

Erster Stand der Web-App mit Startseite und Download. Danach viele schnelle
Versuche mit einer „Gerätesperre“ während der Pause, die später wieder
entfernt wurde.

| Zeit | Hash | Commit | Umfang |
| --- | --- | --- | --- |
| 14:49 | `ae891ae` | Fokus Pomodoro-Timer: Web-App, Startseite und Download | 24 Dateien, +867 |
| 15:31 | `1868295` | Sekunden pro Phase, Gerätesperre mit Autostart und Bild vor der Sperre | 5, +67 / −2 |
| 15:33 | `b2ffff3` | Overlay-Text nur Sperre versprechen, wenn wirklich verbunden | 2, +4 / −1 |
| 15:38 | `b10064b` | Bild nur noch 5 Sek. ohne Text, Status-Anzeige entfernt | 4, +4 / −20 |
| 15:48 | `ee96aad` | Sperre über gehostete Seite: CORS/PNA-Freigabe und zweiter Sende-Weg | 4, +19 / −5 |
| 15:54 | `69a2b07` | Startseiten-Zitate übersetzt, .bat startet lautlos, Sperr- und Bildoption entfernt | 6, +11 / −48 |
| 15:56 | `6cc031b` | Download-Pakete neu gebaut (lautlose Start-Datei) | 2 (binär) |
| 16:06 | `444271c` | Bild nur noch 3 Sekunden sichtbar | 1, +2 / −2 |
| 16:20 | `3b33980` | Vollbild-Sperre in der Seite: Bild 3 Sek., dann Pausen-Countdown | 3, +29 / −10 |
| 16:31 | `e1fad0b` | Neue Seite: Zitate berühmter Revolutionäre | 6, +58 |
| 16:33 | `8128870` | Sperrbild auf neues Bild geändert | 3, +1 / −1 |

### Phase 2 – Neue Seiten, Farbschema und Timer-Bedienung (7. Oktober 2026)

Sperre komplett raus, dafür To-dos, Notizen und Projekte. Danach mehrere
Runden am Farbschema und an der Zeiteinstellung.

| Zeit | Hash | Commit | Umfang |
| --- | --- | --- | --- |
| 12:09 | `a3994a4` | Sperr-Funktion komplett entfernt, neue To-do-Seite als 2. Menüpunkt | 11, +68 / −143 |
| 12:14 | `10ee2c1` | Neue Notizen-Seite: Ordner + Word-ähnlicher Editor mit Bildern | 4, +139 |
| 13:04 | `aa0d799` | Notizen: aktive Formatierung wird an den Knöpfen hervorgehoben | 2, +21 / −1 |
| 13:07 | `361731c` | Neue Projekte-Seite: pro Projekt eigene To-dos und Notizen | 4, +159 |
| 13:13 | `a024924` | Drei Zitat-Menüs zu einem zusammengefasst (Auswahl per Tabs) | 5, +59 / −40 |
| 13:40 | `10916ce` | Seitenmenü klappt beim Darüberfahren auf und wieder ein | 2, +29 / −18 |
| 13:47 | `705da92` | Neues Farbschema: Healing-Herbs-Grün (hell/Salbei) | 2, +44 / −37 |
| 13:49 | `17fb15d` | Farbschema auf dunkles Regenwaldgrün umgestellt | 2, +21 / −22 |
| 13:51 | `654b19b` | Stärkerer Kontrast: dunklerer Hintergrund, hellere Karten | 2, +14 / −13 |
| 13:55 | `83939b1` | Timer-Ring wird gegen Ende röter | 1, +9 / −1 |
| 13:59 | `b53ee41` | Ganze Akzentfarbe färbt sich gegen Ende rot | 1, +9 / −5 |
| 14:02 | `e67aa66` | Gesamte Oberfläche färbt sich gegen Ende rot | 1, +21 / −9 |
| 14:21 | `41f9ac4` | Zeiteinstellung vereinfacht: Vorlagen, Plus/Minus-Stepper, Ton-Schalter | 3, +82 / −37 |
| 14:28 | `18365db` | Zeiten tippbar und optionaler Sekunden-Modus | 3, +54 / −19 |
| 14:36 | `9616bfa` | Design verfeinert: Inter-Schrift, Modus-Umschalter, Fokus-Zustände | 4, +47 / −21 |
| 14:39 | `57d6164` | Weniger futuristisch: wärmeres Olivgrün, weichere Typografie | 3, +32 / −32 |
| 14:43 | `bdf2b14` | Timer-Seite als Übersicht: Heute-Fortschritt mit Tagesziel und Zitat-Karte | 3, +77 / −1 |

### Phase 3 – Zitate, Menü und Felder-Layout (8.–9. Oktober 2026)

Zitate erweitert, Menü anpassbar, Startseite aufgeräumt. Grösster Brocken:
Felder auf der Timer-Seite frei verschieben und skalieren.

| Datum | Zeit | Hash | Commit | Umfang |
| --- | --- | --- | --- | --- |
| 08.10. | 10:57 | `1d91c13` | Eigene Zitate mit Autor hinzufügen und löschen | 3, +55 / −12 |
| 08.10. | 11:29 | `57b611b` | Zitate: Pool erweitert, zufällige Auswahl mit Neue-Auswahl-Knopf | 3, +71 / −6 |
| 08.10. | 11:32 | `de8b66c` | Menü anpassbar: Menüpunkte ein-/ausblenden und Reihenfolge ändern | 3, +97 / −1 |
| 08.10. | 11:34 | `2f82980` | Menü-anpassen-Knopf mit eigenem Stift-Icon | 3, +4 / −2 |
| 08.10. | 14:47 | `246c56c` | Startseite aufgeräumt: kurze Erklärung, Zitat dezent am Rand | 2, +115 / −80 |
| 08.10. | 14:51 | `45e3510` | Startseite: Cache-Fix für CSS und feste Bildgrössen | 1, +6 / −6 |
| 08.10. | 14:54 | `27aa10b` | Nächstes-Zitat als kleiner Button statt Link | 2, +7 / −4 |
| 08.10. | 14:59 | `0a109cb` | Felder verschieben und in der Grösse ändern, To-dos mit optionaler Deadline | 4, +187 / −23 |
| 08.10. | 16:56 | `e52d0e7` | Timer-Seite: Layout-Bearbeitung für Felder (Position, Breite, Höhe) | 4, +672 / −106 |
| 08.10. | 19:38 | `ac6150c` | Felder-Layout: anstossende Felder automatisch verkleinern | 2, +302 / −33 |
| 08.10. | 23:32 | `eebe101` | Felder anpassen gefixt | 3, +850 / −8 |
| 09.10. | 08:33 | `0121df4` | Felder einfacher anpassen | 3, +190 / −84 |
| 09.10. | 08:50 | `dd1e7c6` | Timer-Menü nur ein Fenster gross | 3, +96 / −27 |

### Phase 4 – PWA und Mobile (9. und 21. Oktober 2026)

Die Webseite wird installierbar und offlinefähig, die Handy-Ansicht wird
brauchbar.

| Datum | Zeit | Hash | Commit | Umfang |
| --- | --- | --- | --- | --- |
| 09.10. | 12:47 | `c83cbe7` | PWA-Grundlagen: Manifest, Service Worker und App-Icons | 8, +139 |
| 09.10. | 13:04 | `97fee1f` | Mobile Ansicht: Hamburger-Menü statt Umbruch, normale Feldgrösse | 3, +97 / −10 |
| 21.10. | 08:50 | `a94d3a9` | Zitat von Fidel Castro entfernt | 1, −1 |
| 21.10. | 08:52 | `53679f5` | Service-Worker Cache-Version erhöht, damit Updates ankommen | 1, +1 / −1 |
| 21.10. | 09:03 | `aadd7e7` | Nur-Timer-Ansicht: Timer gross, alles andere ausgeblendet | 5, +172 / −8 |
| 21.10. | 09:13 | `acfb471` | Kopfzeile auf dem Handy: Knöpfe nur als Symbol | 3, +19 / −2 |

### Phase 5 – Native Apps (22. Oktober 2026)

| Datum | Zeit | Hash | Commit | Umfang |
| --- | --- | --- | --- | --- |
| 22.10. | 11:59 | `26003a3` | Pomodoro-Timer als App für Windows und iOS | 33, +5713 / −7 |

Electron-Hülle mit eigenem `app://`-Protokoll (fester Origin, damit der
`localStorage` Updates überlebt), Capacitor-Projekt für iOS, Build-Script nach
`dist/` mit Content-Security-Policy, Smoke-Test und Icon-Renderer. Die
grosse Zeilenzahl kommt vor allem von `package-lock.json` und dem Xcode-Projekt.
(Branch `app-windows-ios`)

### Phase 6 – Login und Cloud-Sync (1.–2. November 2026)

| Datum | Zeit | Hash | Commit | Umfang |
| --- | --- | --- | --- | --- |
| 01.11. | 14:44 | `3a23dca` | Login und Cloud-Sync über Supabase | 11, +441 / −6 |
| 02.11. | 11:15 | `ec48feb` | Statistik bei jedem Abgleich zusammenführen, Layout und Menü pro Gerät, Supabase-Projekt eingetragen | 3, +22 / −7 |

Jeder `pomo_*`-Key wird eine Zeile in der Tabelle `user_data`; Layout und Menü
bleiben pro Gerät. Offline gemerkte Änderungen (`pomo__dirty`) werden später
nachgeholt, die Statistik wird zusammengeführt statt überschrieben.
(Branch `feature/login`)

### Phase 7 – Mehrsprachigkeit (3.–4. November 2026)

| Datum | Zeit | Hash | Commit | Umfang |
| --- | --- | --- | --- | --- |
| 03.11. | 20:46 | `7b44a5d` | Sprache umschaltbar: Deutsch/Englisch für Oberfläche und Zitate | 8, +1007 / −371 |
| 04.11. | 08:25 | `3c0851d` | Sprachmenü mit Deutsch, Englisch, Französisch, Italienisch und Ungarisch | 8, +895 / −106 |

Neue Datei `js/i18n.js` mit allen Texten, eigenes Sprachmenü (`style/lang-menu.css`).

### Phase 8 – Wählbares Design: Original oder Coral (4. November 2026)

Auf den Branches `hallmark-test` / `hallmark-coral` wurde ein neues Design
ausprobiert und dann als zweite Option neben dem bisherigen eingebaut.

| Zeit | Hash | Commit | Branch | Umfang |
| --- | --- | --- | --- | --- |
| 09:47 | `45c595c` | Ausgangsstand vor Hallmark-Test | hallmark | 4, +179 / −16 |
| 10:01 | `eddd47d` | Hallmark-Test: Timer-Seite im Theme Hedgerow | hallmark | 15, +463 / −376 |
| 10:23 | `3d54ec8` | Hallmark-Test: Timer-Seite in Coral, dunkle Variante | hallmark | 20, +115 / −112 |
| 10:29 | `4bd1dd9` | Design wählbar: Original oder Coral, Seitenleiste wieder animiert | hallmark-coral | 8, +1098 / −22 |
| 10:34 | `6425028` | Felder skalieren mit ihrer Grösse, Timer-Seite passt auf einen Bildschirm | main | 4, +179 / −16 |
| 10:35 | `1a3a846` | **Merge** hallmark-coral: Design wählbar (Original oder Coral) | main | Merge |
| 10:35 | `2944965` | Build und Smoke-Test für wählbare Designs | main | 3, +9 / −4 |
| 10:44 | `2c63c6e` | Startseite auch in Coral, Design auf beiden Seiten gleich | main | 7, +112 / −33 |

Ablauf als Graph:

```
* 2c63c6e Startseite auch in Coral
* 2944965 Build und Smoke-Test
*   1a3a846 Merge hallmark-coral
|\
| * 4bd1dd9 Design waehlbar: Original oder Coral
| * 3d54ec8 Coral, dunkle Variante
| * eddd47d Theme Hedgerow
| * 45c595c Ausgangsstand vor Hallmark-Test
* | 6425028 Felder skalieren mit ihrer Groesse
|/
* 3c0851d Sprachmenue mit 5 Sprachen
```

Neu dazugekommen: `js/design-boot.js` (setzt das gewählte Design vor dem ersten
Rendern), `style/tokens.css`, `style/pomodoro-original.css`,
`style/start-coral.css`, Schriften General Sans und Geist Mono.

### Phase 9 – Freie Felder überall, Sync von Layout und Design (4. November 2026)

| Zeit | Hash | Commit | Branch | Umfang |
| --- | --- | --- | --- | --- |
| 10:53 | `5db0d94` | Projektdokumentation mit Chronik aller Commits | main | 1, +262 / −0 |
| 10:59 | `f2f4ebc` | Felder auf allen Seiten frei anpassbar wie auf der Timer-Seite | main | 6, +45 / −19 |
| 10:59 | `3283f8c` | Feldgrössen und Design mit dem Konto abgleichen | main | 4, +20 / −6 |
| 11:02 | `1c7c354` | Dokumentation nachgefuehrt, Regel fuer laufende Nachfuehrung | main | 2, +49 / −5 |

- **`5db0d94`** – Diese Datei (`DOKUMENTATION.md`) angelegt.
- **`f2f4ebc`** – To-do, Notizen, Projekte, Statistik und die drei Zitate-Tabs
  liegen jetzt im selben freien Layout (`.free-canvas`) wie die Timer-Seite:
  Felder verschieben, an allen Rändern und Ecken skalieren, Hilfslinien, Auto-Höhe.
  Der Inhalt wächst mit dem Feld (Standardbreite = halbe Breite, ein einzelnes
  Feld = ganze Breite). Eine früher gespeicherte Raster-Anordnung wird übernommen.
  Wächst ein Feld (z. B. neue Aufgaben), rutschen die Felder darunter nach.
  Neuer Übersetzungs-Key `q.current` („Zitat“) in allen fünf Sprachen,
  `CACHE_NAME` auf `fokus-cache-v25`.
- **`3283f8c`** – `pomo_layout` und `pomo_design` sind in `js/cloud.js` nicht mehr
  „nur pro Gerät“ und werden über Supabase auf alle angemeldeten Geräte
  übertragen; nur `pomo_menu` bleibt lokal. Ein Designwechsel auf der Startseite
  (dort läuft `cloud.js` nicht) wird in `pomo__dirty` vorgemerkt und beim
  nächsten Öffnen der Timer-Seite hochgeladen. Gepusht nach `origin/main`.
- **`1c7c354`** – Chronik bis hierher nachgeführt und in `CLAUDE.md` die Regel
  festgehalten, dass jeder Commit und Push hier eingetragen wird.

### Phase 10 – Eigene Timer und Stoppuhren (4. November 2026)

| Zeit | Hash | Commit | Branch | Umfang |
| --- | --- | --- | --- | --- |
| 11:26 | `1827153` | Eigene Timer und Stoppuhren auf neuer Seite Uhren | main | 7, +273 / −5 |
| 11:28 | (dieser Commit) | Dokumentation nachgefuehrt: Uhren | main | Doku |

- **`1827153`** – Neue Seite **Uhren** (Menüpunkt mit Stoppuhr-Icon
  `img/stopwatch.svg`, im Menü ein-/ausblendbar). Dort lassen sich beliebig viele
  normale Timer (Stunden:Minuten:Sekunden, Fortschrittsbalken, Ton und
  „Abgelaufen“ am Ende) und Stoppuhren (Zehntelsekunden, Runden) hinzufügen,
  umbenennen, starten, pausieren, zurücksetzen und löschen. Gespeichert in
  `pomo_clocks` (wird mit dem Konto abgeglichen). Laufende Uhren merken sich
  nur den Startzeitpunkt und laufen deshalb auch nach dem Neuladen weiter.
  Übersetzungen in allen fünf Sprachen, Styles für Original und Coral,
  `CACHE_NAME` auf `fokus-cache-v26`.

---

## 4. Zahlen

| | |
| --- | --- |
| Zeitraum | 6. Oktober – 4. November 2026 |
| Commits | 66 (davon 1 Merge) |
| Aktive Tage | 10 (6., 7., 8., 9., 21., 22. Okt., 1., 2., 3., 4. Nov.) |
| Meiste Commits an einem Tag | 7. Oktober (17) |
| Grösster Commit | `26003a3` Windows- und iOS-App (+5713 Zeilen) |

## 5. Offene Punkte / Hinweise

- Nach Änderungen an Web-Dateien `CACHE_NAME` in `sw.js` hochzählen, sonst
  sehen Browser-Nutzer die alte Version.
- Für die Apps nach Änderungen `npm run build` (Windows) bzw. `npm run ios:sync` (iOS).
- Die Windows-`.exe` ist nicht signiert (SmartScreen-Warnung beim ersten Start).
- Die Nebenbranches (`agy-test`, `agy--test`, `app-windows-ios`, `feature/login`,
  `hallmark-test`, `worktree-agent-…`) sind vollständig in `main` und können
  aufgeräumt werden.
- Git-Autorname vereinheitlichen (`Namir1234` / `Namir` / `Namir Al Gorani`).
