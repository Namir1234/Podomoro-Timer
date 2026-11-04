# Regeln für dieses Projekt

## Dokumentation immer nachführen
`DOKUMENTATION.md` hält jeden Commit, Push und jede Änderung fest. Bei jedem Commit:

1. In der Chronik (Abschnitt 3) eine Zeile pro Commit eintragen: Uhrzeit, Hash, Nachricht,
   Branch, Umfang (Dateien / +hinzugefügt / −entfernt) – Werte aus `git show --shortstat`.
   Darunter kurz, was geändert wurde und warum. Pushes vermerken („Gepusht nach `origin/main`“).
2. Der Doku-Commit selbst steht als „(dieser Commit)“ drin; beim nächsten Nachführen
   den echten Hash nachtragen.
3. Bei Bedarf mitziehen: Funktionsliste (Abschnitt 1), Stand-Datum, Commit-Anzahl
   (oben und in „4. Zahlen“), offene Punkte.
4. Die Doku-Änderung im selben Commit oder direkt danach committen und mitpushen.

## Sonstiges
- Commit-Nachrichten auf Deutsch, kurz, ohne Umlaute (ae/oe/ue).
- Nach Änderungen an Web-Dateien `CACHE_NAME` in `sw.js` hochzählen.
- Test: `npm test` (Build + Electron-Smoke-Test).
