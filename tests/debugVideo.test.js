const test = require('node:test');
const assert = require('node:assert/strict');
const {
    prepareDebugVideo, MAX_OUTPUT_BYTES, mp4DurationSeconds, videoBitrateCap
} = require('../utils/debugVideo');
const fs = require('node:fs/promises');
const os = require('node:os');
const path = require('node:path');
const run = require('node:util').promisify(require('node:child_process').execFile);

test('rejects non-MP4 and oversized input before invoking FFmpeg', async () => {
    await assert.rejects(prepareDebugVideo(Buffer.from('not an mp4')), /invalide/);
    await assert.rejects(prepareDebugVideo(null), /invalide/);
    const oversized = Buffer.alloc(20_000_001);
    oversized.write('ftyp', 4);
    await assert.rejects(prepareDebugVideo(oversized), /volumineuse/);
    assert.ok(MAX_OUTPUT_BYTES < 10_000_000);
});

test('bitrate cap follows the clip duration', () => {
    // Un clip court peut etre bien plus genereux qu'un clip de 90 s.
    assert.ok(videoBitrateCap(5) > videoBitrateCap(60));
    assert.ok(videoBitrateCap(60) > videoBitrateCap(90));
    // Le budget de sortie reste garanti sur la duree maximale.
    assert.ok(videoBitrateCap(90) * 90 < MAX_OUTPUT_BYTES * 8);
    // Duree inconnue : on retombe sur l'hypothese la plus prudente.
    assert.equal(videoBitrateCap(0), videoBitrateCap(90));
});

test('MP4 conversion decodes successfully and puts moov before mdat', async () => {
    const ffmpeg = require('ffmpeg-static');
    const directory = await fs.mkdtemp(path.join(os.tmpdir(), 'capel-video-test-'));
    try {
        const source = path.join(directory, 'sample.mp4');
        await run(ffmpeg, ['-nostdin', '-hide_banner', '-loglevel', 'error',
            '-f', 'lavfi', '-i', 'testsrc2=size=1280x720:rate=15', '-t', '1',
            '-c:v', 'libx264', '-y', source], { windowsHide: true });
        const raw = await fs.readFile(source);
        assert.ok(Math.abs(mp4DurationSeconds(raw) - 1) < 0.2);
        const output = await prepareDebugVideo(raw);
        assert.ok(output.length < MAX_OUTPUT_BYTES);
        assert.ok(output.indexOf('moov') > 0);
        assert.ok(output.indexOf('moov') < output.indexOf('mdat'));
        const converted = path.join(directory, 'converted.mp4');
        await fs.writeFile(converted, output);
        await run(ffmpeg, ['-nostdin', '-v', 'error', '-xerror', '-i', converted,
            '-f', 'null', '-'], { windowsHide: true });
        const corrupt = Buffer.alloc(32);
        corrupt.write('ftyp', 4);
        await assert.rejects(prepareDebugVideo(corrupt));
        // A failed decode must not poison the serialized conversion queue.
        assert.ok((await prepareDebugVideo(await fs.readFile(source))).length > 0);
    } finally {
        await fs.rm(directory, { recursive: true, force: true });
    }
});
