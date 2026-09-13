const fs = require('node:fs/promises');
const os = require('node:os');
const path = require('node:path');
const { execFile } = require('node:child_process');
const { promisify } = require('node:util');

const run = promisify(execFile);
const MAX_INPUT_BYTES = 20_000_000;
const MAX_OUTPUT_BYTES = 9 * 1024 * 1024;
let pending = 0;
let queue = Promise.resolve();

async function convert(data) {
    const directory = await fs.mkdtemp(path.join(os.tmpdir(), 'capel-video-'));
    try {
        const input = path.join(directory, 'input.mp4');
        const output = path.join(directory, 'capture.mp4');
        await fs.writeFile(input, data);
        // Fixed paths/arguments, no shell. Limit decode duration and encoder resources.
        await run(require('ffmpeg-static'), [
            '-nostdin', '-hide_banner', '-loglevel', 'error', '-xerror',
            '-protocol_whitelist', 'file,pipe', '-threads', '2', '-i', input,
            '-map', '0:v:0', '-map', '0:a:0?', '-t', '90',
            '-vf', 'scale=w=min(960\\,iw):h=min(540\\,ih):force_original_aspect_ratio=decrease:force_divisible_by=2',
            '-r', '15', '-c:v', 'libx264', '-threads', '2', '-preset', 'veryfast',
            '-b:v', '650k', '-maxrate', '650k', '-bufsize', '1300k',
            '-pix_fmt', 'yuv420p', '-c:a', 'aac', '-b:a', '64k',
            '-map_metadata', '-1', '-movflags', '+faststart', '-y', output
        ], { timeout: 120_000, maxBuffer: 512 * 1024, windowsHide: true });
        const size = (await fs.stat(output)).size;
        if (size === 0 || size > MAX_OUTPUT_BYTES) {
            throw new Error('Vidéo compressée trop volumineuse ou vide.');
        }
        return await fs.readFile(output);
    } finally {
        // Only this operation's mkdtemp directory is removed.
        await fs.rm(directory, { recursive: true, force: true });
    }
}

function prepareDebugVideo(data) {
    if (!Buffer.isBuffer(data) || data.length < 12 || data.length > MAX_INPUT_BYTES ||
        data.subarray(4, 8).toString('ascii') !== 'ftyp') {
        return Promise.reject(new Error('Vidéo MP4 invalide ou trop volumineuse.'));
    }
    if (pending >= 4) return Promise.reject(new Error('Traitement vidéo occupé. Réessayez plus tard.'));
    pending++;
    const result = queue.then(() => convert(data));
    queue = result.catch(() => {});
    return result.finally(() => { pending--; });
}

module.exports = { prepareDebugVideo, MAX_OUTPUT_BYTES };
