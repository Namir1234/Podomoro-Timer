# Fokus – Pomodoro Timer

Pomodoro-Timer mit Statistik, To-dos, Notizen und Projekten.
Alle Daten bleiben auf dem Geraet (`localStorage`), es gibt keinen Server.

Derselbe Code laeuft als Webseite, als Windows-Programm und als iOS-App.

## Aufbau

| Ordner | Inhalt |
| --- | --- |
| `pages/`, `js/`, `style/`, `img/` | die eigentliche App – hier wird entwickelt |
| `tools/` | Build-Script, Icon-Renderer und der Smoke-Test |
| `electron/` | Fenster-Huelle fuer Windows |
| `ios/` | Xcode-Projekt (von Capacitor erzeugt) |
| `dist/` | aus den Quellen erzeugt, nicht von Hand bearbeiten |
| `release/` | fertige Windows-Dateien |

`npm run build` kopiert die Web-Dateien nach `dist/` und nimmt dabei die
Service-Worker-Registrierung heraus (die ist nur im Browser sinnvoll) und
setzt eine Content-Security-Policy. Beide App-Varianten laden aus `dist/`.

## Web

Die Dateien im Projektordner sind direkt die Webseite – `pages/index.html`
oeffnen oder den Ordner auf einen Webserver legen. `sw.js` macht sie
offlinefaehig; nach Aenderungen an den Assets die `CACHE_NAME`-Version in
`sw.js` hochzaehlen, sonst bekommen Nutzer die alte Fassung.

## Windows

```
npm start        # App starten
npm test         # prueft, dass die Oberflaeche wirklich rendert
npm run dist:win # Installer und portable .exe nach release/
```

`release/Fokus Setup 1.0.0.exe` installiert die App, `release/Fokus 1.0.0.exe`
laeuft ohne Installation.

Die Seiten werden ueber ein eigenes `app://`-Protokoll ausgeliefert, nicht
ueber `file://`. Das gibt der App einen festen Origin, damit der
`localStorage` ueber Updates hinweg erhalten bleibt.

Die `.exe` ist nicht signiert. Windows SmartScreen zeigt darum beim ersten
Start eine Warnung; ueber "Weitere Informationen" → "Trotzdem ausfuehren"
laesst sie sich starten.

## iOS

Das Xcode-Projekt liegt in `ios/`. Zum Bauen braucht es einen Mac mit Xcode
und CocoaPods – von Windows aus geht nur die Vorbereitung.

Auf dem Mac:

```
npm install
npm run ios:sync   # baut dist/ und kopiert es ins Xcode-Projekt
npm run ios:open   # oeffnet Xcode
```

In Xcode unter "Signing & Capabilities" das eigene Entwickler-Team
auswaehlen, dann auf das Geraet bauen. Ohne bezahlten Developer-Account
laeuft die App sieben Tage, danach muss sie neu aufgespielt werden.

Nach jeder Aenderung am Web-Code `npm run ios:sync` ausfuehren.

## App-Icon

`img/icons/icon-source.svg` ist die Quelle. `npm run icons` rendert daraus
das 1024er Icon fuer iOS. Die PNGs in `img/icons/` gehoeren zur Web-Version
und bleiben davon unberuehrt.
