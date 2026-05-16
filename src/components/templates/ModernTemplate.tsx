import { Page, Text, View, StyleSheet, Link, Image } from "@react-pdf/renderer";
import type { ResumeData } from "@/lib/types";
import { parseInlineLinks } from "@/lib/parseLinks";

/** Renders a paragraph that may contain `[label](url)` markdown links. */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function Rich({ text, style, accent }: { text?: string; style?: any; accent: string }) {
  const segs = parseInlineLinks(text ?? "");
  if (segs.length === 0) return <Text style={style}>{text ?? ""}</Text>;
  return (
    <Text style={style}>
      {segs.map((s, i) =>
        s.kind === "link" ? (
          <Link key={i} src={s.url} style={{ color: accent, textDecoration: "underline" }}>{s.text}</Link>
        ) : (
          s.text
        )
      )}
    </Text>
  );
}

const DEFAULT_ACCENT = "#2854ef";

const make = (accent: string) =>
  StyleSheet.create({
    page: { padding: 36, fontSize: 10, color: "#1f2937", fontFamily: "Helvetica" },
    header: { flexDirection: "row", alignItems: "center", gap: 16 },
    headerText: { flex: 1 },
    name: { fontSize: 22, fontWeight: 700, color: "#111827" },
    title: { fontSize: 11, color: accent, marginTop: 2 },
    contactRow: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginTop: 6, fontSize: 9, color: "#4b5563" },
    rule: { borderBottomWidth: 1, borderBottomColor: "#e5e7eb", marginVertical: 10 },
    sectionTitle: { fontSize: 11, fontWeight: 700, color: accent, textTransform: "uppercase", letterSpacing: 1, marginBottom: 6 },
    expHeader: { flexDirection: "row", justifyContent: "space-between", marginTop: 6 },
    role: { fontWeight: 700, color: "#111827" },
    company: { color: "#374151" },
    dates: { color: "#6b7280", fontSize: 9 },
    bullet: { flexDirection: "row", marginTop: 2 },
    bulletDot: { width: 8, color: accent },
    bulletText: { flex: 1, lineHeight: 1.4 },
    summary: { lineHeight: 1.4 },
    skill: { backgroundColor: hexWithAlpha(accent, 0.12), color: accent, paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4, marginRight: 4, marginBottom: 4, fontSize: 9 },
    skillRow: { flexDirection: "row", flexWrap: "wrap" },
  });

export function ModernTemplate({ data }: { data: ResumeData }) {
  const accent = data.themeColor || DEFAULT_ACCENT;
  const s = make(accent);
  const c = data.contact;
  return (
    <Page size="LETTER" style={s.page}>
      <View style={s.header}>
        {c.photoDataUrl ? (
          <Image
            src={c.photoDataUrl}
            style={{
              width: 64,
              height: 64,
              borderRadius:
                c.photoShape === "square" ? 0 : c.photoShape === "rounded" ? 12 : 32,
            }}
          />
        ) : null}
        <View style={s.headerText}>
          <Text style={s.name}>{c.fullName || "Your Name"}</Text>
          {c.title ? <Text style={s.title}>{c.title}</Text> : null}
          <View style={s.contactRow}>
            {c.email ? <Link src={`mailto:${c.email}`} style={{ color: "#4b5563" }}>{c.email}</Link> : null}
            {c.phone ? <Link src={`tel:${c.phone.replace(/[^+\d]/g, "")}`} style={{ color: "#4b5563" }}>· {c.phone}</Link> : null}
            {c.location ? <Text>· {c.location}</Text> : null}
            {c.website ? <Link src={ensureHttp(c.website)}>· {c.website}</Link> : null}
            {c.linkedin ? <Link src={ensureHttp(c.linkedin)}>· {c.linkedin}</Link> : null}
            {c.github ? <Link src={ensureHttp(c.github)}>· {c.github}</Link> : null}
          </View>
        </View>
      </View>

      {data.summary ? (
        <>
          <View style={s.rule} />
          <Text style={s.sectionTitle}>Summary</Text>
          <Rich text={data.summary} style={s.summary} accent={accent} />
        </>
      ) : null}

      {data.experience.length > 0 && (
        <>
          <View style={s.rule} />
          <Text style={s.sectionTitle}>Experience</Text>
          {data.experience.map((exp) => (
            <View key={exp.id} wrap={false}>
              <View style={s.expHeader}>
                <Text>
                  <Text style={s.role}>{exp.role || "Role"}</Text>
                  <Text style={s.company}>{exp.company ? `  ·  ${exp.company}` : ""}</Text>
                </Text>
                <Text style={s.dates}>
                  {[exp.startDate, exp.endDate].filter(Boolean).join(" – ")}
                </Text>
              </View>
              {exp.location ? <Text style={s.dates}>{exp.location}</Text> : null}
              {exp.bullets.filter(Boolean).map((b, i) => (
                <View key={i} style={s.bullet}>
                  <Text style={s.bulletDot}>•</Text>
                  <View style={{ flex: 1 }}>
                    <Rich text={b} style={s.bulletText} accent={accent} />
                  </View>
                </View>
              ))}
            </View>
          ))}
        </>
      )}

      {data.projects.length > 0 && (
        <>
          <View style={s.rule} />
          <Text style={s.sectionTitle}>Projects</Text>
          {data.projects.map((p) => (
            <View key={p.id} style={{ marginBottom: 4 }} wrap={false}>
              <Text>
                <Text style={s.role}>{p.name}</Text>
                {p.link ? <Link src={ensureHttp(p.link)}>  ·  {p.link}</Link> : null}
              </Text>
              {p.description ? <Rich text={p.description} style={s.bulletText} accent={accent} /> : null}
            </View>
          ))}
        </>
      )}

      {data.education.length > 0 && (
        <>
          <View style={s.rule} />
          <Text style={s.sectionTitle}>Education</Text>
          {data.education.map((ed) => (
            <View key={ed.id} style={s.expHeader} wrap={false}>
              <Text>
                <Text style={s.role}>{ed.degree}{ed.field ? `, ${ed.field}` : ""}</Text>
                <Text style={s.company}>  ·  {ed.school}</Text>
              </Text>
              <Text style={s.dates}>{[ed.startDate, ed.endDate].filter(Boolean).join(" – ")}</Text>
            </View>
          ))}
        </>
      )}

      {data.skills.length > 0 && (
        <>
          <View style={s.rule} />
          <Text style={s.sectionTitle}>Skills</Text>
          <View style={s.skillRow}>
            {data.skills.map((sk, i) => (
              <Text key={i} style={s.skill}>{sk.name}{sk.level ? ` · ${"●".repeat(sk.level)}` : ""}</Text>
            ))}
          </View>
        </>
      )}
    </Page>
  );
}

/** Ensure user-typed contact URLs (linkedin.com/in/foo) get a protocol so PDF Link works. */
function ensureHttp(url: string) {
  if (!url) return url;
  return /^(https?:|mailto:|tel:)/i.test(url) ? url : `https://${url}`;
}

// Mix accent with white at the given alpha so background ≈ tinted version of accent.
function hexWithAlpha(hex: string, alpha: number) {
  const h = hex.replace("#", "");
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  // Blend with white
  const blend = (c: number) => Math.round(c * alpha + 255 * (1 - alpha));
  const toHex = (n: number) => n.toString(16).padStart(2, "0");
  return `#${toHex(blend(r))}${toHex(blend(g))}${toHex(blend(b))}`;
}
