"""Copy the game sound effects used by the activity (picked in E:/dev/sky-activity-tools/sons/ecouter.html)
into assets/sky/sounds/se/, as mono 22 kHz WAV (a quarter of the size, still playable everywhere)."""
import audioop, json, wave
from pathlib import Path
SOURCE = Path('E:/dev/sky-activity-tools/sons')
OUTPUT = Path(__file__).resolve().parents[1] / 'assets/sky/sounds/se'
SOUNDS = {
    'don-shot': 'SC/ed6se487.wav', 'don-explosion': 'FC/ed6se585.wav', 'don-slam': 'FC/ed6se602.wav',
    'schera-whip': 'FC/ed6se502.wav', 'carna-shot': 'SC/ed6se689.wav', 'josette-shot': 'FC/ed6se855.wav',  # use -> extracted file
    'miss': 'FC/ed6se132.wav', 'fight': 'FC/ed6se155.wav', 'jump': 'FC/ed6se163.wav', 'olivier': 'FC/ed6se190.wav',
    'block': 'FC/ed6se214.wav', 'antoine': 'FC/ed6se402.wav', 'axis-ambience': 'FC/ed6se451.wav', 'joshua': 'FC/ed6se504.wav',
    'hit1': 'FC/ed6se552.wav', 'hit2': 'FC/ed6se553.wav', 'hit3': 'FC/ed6se554.wav', 'hit4': 'FC/ed6se555.wav', 'dash': 'FC/ed6se571.wav',
}
OUTPUT.mkdir(parents=True, exist_ok=True)
for name, source in SOUNDS.items():
    with wave.open(str(SOURCE / source)) as w:
        channels, width, rate, frames = w.getnchannels(), w.getsampwidth(), w.getframerate(), w.readframes(w.getnframes())
    if channels == 2: frames = audioop.tomono(frames, width, .5, .5)
    frames, _ = audioop.ratecv(frames, width, 1, rate, 22050, None)
    with wave.open(str(OUTPUT / f'{name}.wav'), 'wb') as w:
        w.setnchannels(1); w.setsampwidth(width); w.setframerate(22050); w.writeframes(frames)
(OUTPUT / 'source.json').write_text(json.dumps({'game files': SOUNDS, 'archives': 'ED6_DT08 (FC), ED6_DT28 (SC, 3rd)'}, indent=1) + '\n', encoding='utf8')
print(len(SOUNDS), 'sounds')
