# Fokus-Sperre
# Wartet unsichtbar im Hintergrund auf ein Signal der Fokus-Timer-Seite und
# sperrt dann Windows (gleicher Sperrbildschirm wie bei Windows-Taste + L).
#
#   -Install    traegt die Sperre in den Windows-Autostart ein und startet sie
#   -Uninstall  beendet die Sperre und entfernt sie aus dem Autostart
param([switch]$Install, [switch]$Uninstall)

$port = 47600
$shortcutPath = Join-Path ([Environment]::GetFolderPath('Startup')) 'Pomodoro-Timer.lnk'

# Beendet eine bereits laufende Sperre (ausser diesem Prozess selbst)
function Stop-Sperre {
    Get-CimInstance Win32_Process -Filter "Name='powershell.exe'" |
        Where-Object { $_.ProcessId -ne $PID -and $_.CommandLine -like '*fokus-sperre.ps1*' } |
        ForEach-Object { Stop-Process -Id $_.ProcessId -Force -ErrorAction SilentlyContinue }
}

if ($Install) {
    Stop-Sperre
    $shortcut = (New-Object -ComObject WScript.Shell).CreateShortcut($shortcutPath)
    $shortcut.TargetPath = 'powershell.exe'
    $shortcut.Arguments = "-NoProfile -ExecutionPolicy Bypass -WindowStyle Hidden -File `"$PSCommandPath`""
    $shortcut.WindowStyle = 7
    $shortcut.Description = 'Fokus-Sperre fuer den Pomodoro-Timer'
    $shortcut.Save()
    Start-Process $shortcutPath
    exit
}

if ($Uninstall) {
    Stop-Sperre
    if (Test-Path $shortcutPath) { Remove-Item $shortcutPath -Force }
    Write-Host "Die Sperre ist beendet und aus dem Autostart entfernt."
    Start-Sleep -Seconds 4
    exit
}

$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$port/")
try { $listener.Start() } catch { exit 1 }   # laeuft schon in einem anderen Prozess

while ($listener.IsListening) {
    $context = $listener.GetContext()
    $request = $context.Request
    $response = $context.Response

    # CORS + Private Network Access: erlaubt auch der gehosteten HTTPS-Seite,
    # dieses Programm auf localhost anzusprechen.
    $response.Headers.Add("Access-Control-Allow-Origin", "*")
    $response.Headers.Add("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
    $response.Headers.Add("Access-Control-Allow-Headers", "*")
    $response.Headers.Add("Access-Control-Allow-Private-Network", "true")
    $response.Headers.Add("Access-Control-Max-Age", "86400")

    if ($request.HttpMethod -eq "OPTIONS") {
        # Vorab-Anfrage des Browsers: nur bestaetigen, nicht sperren.
        $response.StatusCode = 200
    }
    elseif ($request.Url.AbsolutePath -eq "/lock") {
        # Sperren per GET oder POST (zweiter Sende-Weg der Seite als Absicherung).
        rundll32.exe user32.dll,LockWorkStation
        $response.StatusCode = 200
    }
    else {
        $response.StatusCode = 204
    }

    $response.ContentLength64 = 0
    $response.Close()
}
