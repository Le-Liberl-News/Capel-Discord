const MARGIN = 16,
  GAP = 8,
  TAIL = 18;
const clamp = (x, min, max) => Math.max(min, Math.min(max, x));
function overlap(a, b) {
  return (
    Math.max(
      0,
      Math.min(a.left + a.width, b.left + b.width) - Math.max(a.left, b.left),
    ) *
    Math.max(
      0,
      Math.min(a.top + a.height, b.top + b.height) - Math.max(a.top, b.top),
    )
  );
}
export function placeDialogues(entries, viewport, obstacles = []) {
  const blocked = obstacles.map((rect) => ({ ...rect })),
    placed = new Map();
  for (const entry of [...entries].sort(
    (a, b) => a.y - b.y || String(a.id).localeCompare(String(b.id)),
  )) {
    const { x, y, width, height } = entry,
      preferred = x - width / 2;
    const xs = [
      preferred,
      x - width + 32,
      x - 32,
      ...blocked.flatMap((rect) => [
        rect.left - width - GAP,
        rect.left + rect.width + GAP,
      ]),
    ];
    const ys = [
      y - height - TAIL,
      y + TAIL,
      ...blocked.flatMap((rect) => [
        rect.top - height - GAP,
        rect.top + rect.height + GAP,
      ]),
    ];
    let best = null,
      score = Infinity;
    for (const px of xs)
      for (const top of ys) {
        const left = clamp(
          px,
          MARGIN,
          Math.max(MARGIN, viewport.width - width - MARGIN),
        );
        const side =
          top + height <= y - GAP ? "above" : top >= y + GAP ? "below" : null;
        if (!side || top < MARGIN || top + height > viewport.height - MARGIN)
          continue;
        // A pointer stays on the speaker rather than an unrelated screen corner.
        if (
          x >= MARGIN + 32 &&
          x <= viewport.width - MARGIN - 32 &&
          (x < left + 16 || x > left + width - 16)
        )
          continue;
        const rect = { left, top, width, height },
          area = blocked.reduce((sum, b) => sum + overlap(rect, b), 0);
        const gap = side === "above" ? y - top - height : top - y;
        const cost =
          area * 10000 +
          Math.abs(left - preferred) +
          Math.abs(gap - TAIL) * 2 +
          (side === "below" ? 200 : 0);
        if (cost < score) {
          score = cost;
          best = { ...rect, side, anchorX: x, anchorY: y };
        }
      }
    best ??= {
      left: clamp(
        preferred,
        MARGIN,
        Math.max(MARGIN, viewport.width - width - MARGIN),
      ),
      top: y - height - TAIL,
      width,
      height,
      side: "above",
      anchorX: x,
      anchorY: y,
    };
    placed.set(entry.id, best);
    blocked.push(best);
  }
  return placed;
}
