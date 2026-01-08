@echo off
echo === Building KanbanLite WebView2 Application ===
echo.

REM Run the PowerShell script
powershell -ExecutionPolicy Bypass -File "%~dp0build-webview2.ps1"

pause
