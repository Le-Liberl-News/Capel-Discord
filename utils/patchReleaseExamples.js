// No rendering or animation: one bounded text example / one existing PNG at a time.
const escape = text => String(text ?? '').replace(/([\\`*_~|<>])/g, '\\$1');

function textExample(change) {
    const header = `**${escape(String(change.file).slice(0, 220))}**${change.key == null ? '' : ` — entrée ${escape(String(change.key).slice(0, 80))}`}\n`;
    let result = header;
    const parts = Array.isArray(change.segments) ? change.segments : [];
    for (const part of parts) {
        let text = String(part.text || '');
        if (part.changed && /^\s+$/.test(text)) text = text.replace(/ /g, '␠').replace(/\t/g, '⇥').replace(/\n/g, '↵\n');
        const room = 1750 - result.length;
        if (room < 20) { result += '…'; break; }
        const cut = text.length > Math.floor(room / 2);
        text = text.slice(0, Math.floor(room / 2));
        result += part.changed ? `**${escape(text)}**` : escape(text);
        if (cut) { result += '…'; break; }
    }
    const removed = Array.isArray(change.removed) ? change.removed.join(' … ') : '';
    if (removed && result.length < 1800) {
        const excerpt = removed.slice(0, Math.floor((1850 - result.length) / 2));
        result += `\nRetiré : **${escape(excerpt).replace(/ /g, '␠')}**${excerpt.length < removed.length ? '…' : ''}`;
    }
    return result;
}
module.exports = { textExample, escape };
