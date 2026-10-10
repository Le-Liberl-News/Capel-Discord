@echo off

cd /d "%~dp0\..\.."

python -c "import json,pathlib; p=pathlib.Path('E:/dev/sky-activity-tools/atelier-combat/catalogue.json'); raise SystemExit(0 if p.exists() and 'animations' in json.loads(p.read_text(encoding='utf-8')) else 1)"
if errorlevel 1 python tools\combat-browser\export.py
if errorlevel 1 exit /b 1

node tools\combat-browser\launch.cjs

pause

