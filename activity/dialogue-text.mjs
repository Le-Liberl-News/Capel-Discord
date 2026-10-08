const segmenter = new Intl.Segmenter("fr", { granularity: "grapheme" });
export const graphemes = (text) =>
  [...segmenter.segment(text)].map((part) => part.segment);
export function paginateDialogue(text, measure, width, linesPerPage = 3) {
  const lines = [];
  for (const paragraph of String(text).replace(/\r/g, "").split("\n")) {
    let line = "";
    for (const letter of graphemes(paragraph)) {
      if (line && measure(line + letter) > width) {
        const space = line.lastIndexOf(" ");
        if (space > 0) {
          lines.push(line.slice(0, space));
          line = line.slice(space + 1);
        } else {
          lines.push(line);
          line = "";
        }
      }
      line += letter;
    }
    lines.push(line.trimEnd());
  }
  const pages = [];
  for (let i = 0; i < lines.length; i += linesPerPage)
    pages.push(lines.slice(i, i + linesPerPage).join("\n"));
  return pages;
}
export function typewriterState(characters, elapsed, rate = 32) {
  const count = Math.min(
    characters.length,
    Math.max(0, Math.floor((elapsed * rate) / 1000)),
  );
  return {
    text: characters.slice(0, count).join(""),
    complete: count === characters.length,
    expired:
      elapsed >=
      (characters.length * 1000) / rate +
        Math.max(3000, characters.length * 30),
  };
}
export class DialogueQueue {
  constructor() {
    this.seen = new Set();
    this.queues = new Map();
  }
  receive(messages) {
    for (const message of messages) {
      if (
        !message.id ||
        !message.author ||
        !message.text?.trim() ||
        this.seen.has(message.id)
      )
        continue;
      this.seen.add(message.id);
      if (this.seen.size > 1000)
        this.seen.delete(this.seen.values().next().value);
      const queue = this.queues.get(message.author) ?? [];
      if (queue.length >= 5) queue.shift();
      queue.push(message);
      this.queues.set(message.author, queue);
    }
  }
  next(author) {
    return this.queues.get(author)?.shift();
  }
  remove(author) {
    this.queues.delete(author);
  }
}
