@echo off
cd /d "%~dp0\..\.."
node tools\cutscene-editor\launch.cjs
if errorlevel 1 pause
