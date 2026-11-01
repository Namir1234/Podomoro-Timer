# Fokus – Pomodoro Timer

Pomodoro-Timer mit Statistik, To-dos, Notizen und Projekten.
Die Daten liegen auf dem Geraet (`localStorage`). Wer will, meldet sich an
und gleicht sie ueber Supabase zwischen Geraeten ab (siehe "Login und Cloud-Sync").

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

## Login und Cloud-Sync

Login und Speicherung pro Konto laufen ueber [Supabase](https://supabase.com)
(Gratis-Tarif reicht). Solange `js/cloud-config.js` leer ist, ist die
Funktion aus und der Knopf "Anmelden" erscheint gar nicht.

Einrichten:

1. Auf supabase.com ein Konto und ein neues Projekt anlegen (Free Plan).
2. Im Dashboard unter "SQL Editor" den Inhalt von `supabase/schema.sql`
   ausfuehren. Das legt die Tabelle `user_data` mit Row-Level-Security an,
   damit jede Person nur ihre eigenen Daten sieht.
3. Unter "Authentication" → "Sign In / Providers" ist "Email" schon aktiv.
   Empfehlung: dort "Confirm email" ausschalten. Der Gratis-Tarif verschickt
   nur wenige Mails pro Stunde, und ohne Bestaetigung ist man nach dem
   Registrieren direkt angemeldet.
4. Unter "Project Settings" → "API" die "Project URL" und den
   "anon public"-Key kopieren und in `js/cloud-config.js` eintragen.
   Der anon-Key darf oeffentlich sein, die Daten schuetzt die Row-Level-Security.
5. `CACHE_NAME` in `sw.js` hochzaehlen und fuer die Apps `npm run build`
   ausfuehren. Das Build-Script erlaubt die Supabase-URL in der
   Content-Security-Policy.

So funktioniert der Abgleich: Jeder `pomo_*`-Key ist eine Zeile in
`user_data`. Aenderungen werden nach etwa einer Sekunde hochgeladen; offline
merkt sich die App die offenen Keys (`pomo__dirty`) und holt das spaeter nach.
Beim Start und beim Login holt sie den Stand aus der Cloud und laedt die
Seite neu, falls sich etwas geaendert hat. Die Statistik (`pomo_sessions`)
wird beim Login zusammengefuehrt, sonst gilt der zuletzt gespeicherte Stand.
Nach dem Abmelden bleiben die Daten auf dem Geraet, werden aber nicht mehr
abgeglichen.

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
