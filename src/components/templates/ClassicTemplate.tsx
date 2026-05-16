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
          <Link key={i} src={s.url} style={{ color: "#1f43c2", textDecoration: "underline" }}>{s.text}</Link>
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
  page: { padding: 48, fontSize: 10.5, color: "#111827", fontFamily: "Times-Roman" },
  header: { textAlign: "center" },
  name: { fontSize: 22, fontFamily: "Times-Bold" },
  contactRow: { fontSize: 10, marginTop: 4, color: "#374151" },
  sectionTitle: { fontSize: 12, fontFamily: "Times-Bold", textTransform: "uppercase", letterSpacing: 1, marginTop: 12, marginBottom: 4, borderBottomWidth: 1, borderBottomColor: "#111827", paddingBottom: 2 },
  expHeader: { flexDirection: "row", justifyContent: "space-between", marginTop: 6 },
  role: { fontFamily: "Times-Bold" },
  italic: { fontFamily: "Times-Italic", color: "#374151" },
  bullet: { flexDirection: "row", marginTop: 2 },
  bulletDot: { width: 10 },
  bulletText: { flex: 1, lineHeight: 1.4 },
});

export function ClassicTemplate({ data }: { data: ResumeData }) {
  const c = data.contact;
  const contactLine = [c.email, c.phone, c.location, c.linkedin, c.github, c.website].filter(Boolean).join("  ·  ");
  return (
    <Page size="LETTER" style={s.page}>
      <View style={s.header}>
        <Text style={s.name}>{c.fullName || "Your Name"}</Text>
        {c.title ? <Text style={s.italic}>{c.title}</Text> : null}
        <Text style={s.contactRow}>{contactLine}</Text>
      </View>

      {data.summary ? (
        <>
          <Text style={s.sectionTitle}>Summary</Text>
          <Rich text={data.summary} />
        </>
      ) : null}

      {data.experience.length > 0 && (
        <>
          <Text style={s.sectionTitle}>Experience</Text>
          {data.experience.map((exp) => (
            <View key={exp.id} wrap={false}>
              <View style={s.expHeader}>
                <Text>
                  <Text style={s.role}>{exp.company}</Text>
                  {exp.location ? <Text style={s.italic}>{`  —  ${exp.location}`}</Text> : null}
                </Text>
                <Text style={s.italic}>{[exp.startDate, exp.endDate].filter(Boolean).join(" – ")}</Text>
              </View>
              <Text style={s.italic}>{exp.role}</Text>
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
        </>
      )}

      {data.education.length > 0 && (
        <>
          <Text style={s.sectionTitle}>Education</Text>
          {data.education.map((ed) => (
            <View key={ed.id} style={s.expHeader}>
              <Text>
                <Text style={s.role}>{ed.school}</Text>
                {` — ${ed.degree}${ed.field ? `, ${ed.field}` : ""}`}
              </Text>
              <Text style={s.italic}>{[ed.startDate, ed.endDate].filter(Boolean).join(" – ")}</Text>
            </View>
          ))}
        </>
      )}

      {data.projects.length > 0 && (
        <>
          <Text style={s.sectionTitle}>Projects</Text>
          {data.projects.map((p) => (
            <View key={p.id} style={{ marginTop: 4 }}>
              <Text>
                <Text style={s.role}>{p.name}</Text>
                {p.link ? <Link src={ensureHttp(p.link)}>{`  —  ${p.link}`}</Link> : null}
              </Text>
              {p.description ? <Rich text={p.description} /> : null}
            </View>
          ))}
        </>
      )}

      {data.skills.length > 0 && (
        <>
          <Text style={s.sectionTitle}>Skills</Text>
          <Text>{data.skills.map((sk) => sk.level ? `${sk.name} (${sk.level}/5)` : sk.name).join(" · ")}</Text>
        </>
      )}
    </Page>
  );
}
