import { Page, Text, View, StyleSheet, Link } from "@react-pdf/renderer";
import type { ResumeData } from "@/lib/types";
import { parseInlineLinks } from "@/lib/parseLinks";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function Rich({ text, style }: { text?: string; style?: any }) {
  const segs = parseInlineLinks(text ?? "");
  if (segs.length === 0) return <Text style={style}>{text ?? ""}</Text>;
  return (
    <Text style={style}>
      {segs.map((s, i) =>
        s.kind === "link" ? (
          <Link key={i} src={s.url} style={{ color: "#2854ef", textDecoration: "underline" }}>{s.text}</Link>
        ) : (
          s.text
        )
      )}
    </Text>
  );
}

function ensureHttp(url: string) {
  if (!url) return url;
  return /^(https?:|mailto:|tel:)/i.test(url) ? url : `https://${url}`;
}

const s = StyleSheet.create({
  page: { padding: 28, fontSize: 9.5, color: "#111827", fontFamily: "Helvetica" },
  topRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end" },
  name: { fontSize: 18, fontWeight: 700 },
  title: { fontSize: 10, color: "#374151" },
  contact: { fontSize: 9, color: "#4b5563", textAlign: "right" },
  rule: { borderBottomWidth: 0.5, borderBottomColor: "#9ca3af", marginVertical: 6 },
  sectionTitle: { fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5, marginTop: 4 },
  expHeader: { flexDirection: "row", justifyContent: "space-between", marginTop: 3 },
  role: { fontWeight: 700 },
  bullet: { flexDirection: "row" },
  bulletDot: { width: 7 },
  bulletText: { flex: 1, lineHeight: 1.3 },
  twoCol: { flexDirection: "row", gap: 12, marginTop: 4 },
  col: { flex: 1 },
});

export function CompactTemplate({ data }: { data: ResumeData }) {
  const c = data.contact;
  return (
    <Page size="LETTER" style={s.page}>
      <View style={s.topRow}>
        <View>
          <Text style={s.name}>{c.fullName || "Your Name"}</Text>
          {c.title ? <Text style={s.title}>{c.title}</Text> : null}
        </View>
        <View style={s.contact}>
          {c.email ? <Link src={`mailto:${c.email}`} style={{ color: "#4b5563" }}>{c.email}</Link> : null}
          {c.phone ? <Link src={`tel:${c.phone.replace(/[^+\d]/g, "")}`} style={{ color: "#4b5563" }}>{c.phone}</Link> : null}
          {c.location ? <Text>{c.location}</Text> : null}
          {c.linkedin ? <Link src={ensureHttp(c.linkedin)}>{c.linkedin}</Link> : null}
        </View>
      </View>

      {data.summary ? (
        <>
          <View style={s.rule} />
          <Rich text={data.summary} />
        </>
      ) : null}

      <View style={s.rule} />
      <Text style={s.sectionTitle}>Experience</Text>
      {data.experience.map((exp) => (
        <View key={exp.id} wrap={false}>
          <View style={s.expHeader}>
            <Text>
              <Text style={s.role}>{exp.role}</Text> · {exp.company}
            </Text>
            <Text>{[exp.startDate, exp.endDate].filter(Boolean).join(" – ")}</Text>
          </View>
          {exp.bullets.filter(Boolean).map((b, i) => (
            <View key={i} style={s.bullet}>
              <Text style={s.bulletDot}>•</Text>
              <View style={{ flex: 1 }}>
                <Rich text={b} style={s.bulletText} />
              </View>
            </View>
          ))}
        </View>
      ))}

      <View style={s.twoCol}>
        <View style={s.col}>
          {data.education.length > 0 && (
            <>
              <Text style={s.sectionTitle}>Education</Text>
              {data.education.map((ed) => (
                <View key={ed.id} style={{ marginTop: 3 }}>
                  <Text style={s.role}>{ed.school}</Text>
                  <Text>{ed.degree}{ed.field ? `, ${ed.field}` : ""}</Text>
                  <Text>{[ed.startDate, ed.endDate].filter(Boolean).join(" – ")}</Text>
                </View>
              ))}
            </>
          )}
        </View>
        <View style={s.col}>
          {data.skills.length > 0 && (
            <>
              <Text style={s.sectionTitle}>Skills</Text>
              <Text>{data.skills.map((sk) => sk.level ? `${sk.name} (${sk.level})` : sk.name).join(", ")}</Text>
            </>
          )}
        </View>
      </View>

      {data.projects.length > 0 && (
        <>
          <Text style={s.sectionTitle}>Projects</Text>
          {data.projects.map((p) => (
            <View key={p.id} style={{ marginTop: 3 }}>
              <Text>
                <Text style={s.role}>{p.name}</Text>
                {p.link ? <Link src={ensureHttp(p.link)}>{`  ·  ${p.link}`}</Link> : null}
              </Text>
              {p.description ? <Rich text={p.description} /> : null}
            </View>
          ))}
        </>
      )}
    </Page>
  );
}
