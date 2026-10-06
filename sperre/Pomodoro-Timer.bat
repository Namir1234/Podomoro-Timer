@echo off
title Pomodoro-Timer
rem Startet die Fokus-Sperre unsichtbar und traegt sie in den Windows-Autostart ein.
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0fokus-sperre.ps1" -Install
