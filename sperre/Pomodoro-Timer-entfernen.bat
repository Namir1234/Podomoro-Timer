@echo off
title Pomodoro-Timer entfernen
rem Beendet die Fokus-Sperre und entfernt sie aus dem Windows-Autostart.
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0fokus-sperre.ps1" -Uninstall
