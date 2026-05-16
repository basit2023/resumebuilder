// Parses markdown-style inline links: `[label](url)` and bare URLs.
// Used by both the HTML canvas preview and the @react-pdf renderer so a "click
// here" link in any text field is rendered as a real, clickable hyperlink in
// the exported PDF — the same way Word handles hyperlinks.

export type Segment =
  | { kind: "text"; text: string }
  | { kind: "link"; text: string; url: string };

// Matches [label](url) where url is http(s)://, mailto:, or tel:
const MD_LINK = /\[([^\]]+)\]\((https?:\/\/[^\s)]+|mailto:[^\s)]+|tel:[^\s)]+)\)/g;

// Matches bare URLs not already inside a markdown link.
const BARE_URL = /(?:^|\s)((?:https?:\/\/)[^\s<>]+)/g;

export function parseInlineLinks(input: string | undefined | null): Segment[] {
  if (!input) return [];

  // First pass: extract markdown-style links.
  const segments: Segment[] = [];
  let last = 0;
  MD_LINK.lastIndex = 0;
  let m: RegExpExecArray | null;
  while ((m = MD_LINK.exec(input)) !== null) {
    if (m.index > last) {
      segments.push(...autolinkBare(input.slice(last, m.index)));
    }
    segments.push({ kind: "link", text: m[1], url: m[2] });
    last = m.index + m[0].length;
  }
  if (last < input.length) segments.push(...autolinkBare(input.slice(last)));

  return segments;
}

// Turn bare http(s) URLs into link segments.
function autolinkBare(input: string): Segment[] {
  if (!input) return [];
  const out: Segment[] = [];
  let last = 0;
  BARE_URL.lastIndex = 0;
  let m: RegExpExecArray | null;
  while ((m = BARE_URL.exec(input)) !== null) {
    const url = m[1];
    const start = m.index + (m[0].length - url.length);
    if (start > last) out.push({ kind: "text", text: input.slice(last, start) });
    out.push({ kind: "link", text: url, url });
    last = start + url.length;
  }
  if (last < input.length) out.push({ kind: "text", text: input.slice(last) });
  return out;
}

/** True if the string contains a markdown link or bare URL. */
export function hasInlineLink(input: string | undefined | null): boolean {
  if (!input) return false;
  return MD_LINK.test(input) || BARE_URL.test(input);
}

/** Insert a markdown link into a string at the given cursor / selection. */
export function insertLink(
  source: string,
  selectionStart: number,
  selectionEnd: number,
  label: string,
  url: string
): { value: string; cursor: number } {
  const before = source.slice(0, selectionStart);
  const after = source.slice(selectionEnd);
  const md = `[${label}](${url})`;
  return { value: `${before}${md}${after}`, cursor: before.length + md.length };
}
