import { Page, Text, View, StyleSheet, Link, Image, Svg, Path } from "@react-pdf/renderer";
import type { CustomBlock, ResumeData } from "@/lib/types";
import { PX_TO_PT } from "@/lib/types";
import { contactLine, defaultLayout } from "@/lib/customLayout";
import { ICONS, type IconName } from "@/lib/icons";
import { parseInlineLinks } from "@/lib/parseLinks";

/** Renders text + inline `[label](url)` markdown links as PDF Text/Link spans. */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function PdfRich({ text, base }: { text?: string; base: any }) {
  const segs = parseInlineLinks(text ?? "");
  if (segs.length === 0) return <Text style={base}>{text ?? ""}</Text>;
  const linkColor = base?.color ?? "#2854ef";
  return (
    <Text style={base}>
      {segs.map((s, i) =>
        s.kind === "link" ? (
          <Link key={i} src={s.url} style={{ color: linkColor, textDecoration: "underline" }}>
            {s.text}
          </Link>
        ) : (
          s.text
        )
      )}
    </Text>
  );
}

const s = StyleSheet.create({
  page: { padding: 0, fontFamily: "Helvetica" },
});

export function CustomTemplate({ data }: { data: ResumeData }) {
  const layout = data.customLayout ?? defaultLayout();
  return (
    <Page size="LETTER" style={s.page}>
      {layout.blocks.map((b) => (
        <View
          key={b.id}
          style={{
            position: "absolute",
            left: b.x * PX_TO_PT,
            top: b.y * PX_TO_PT,
            width: b.width * PX_TO_PT,
            height: b.height * PX_TO_PT,
            backgroundColor: b.backgroundColor,
            borderRadius: b.borderRadius ? b.borderRadius * PX_TO_PT : undefined,
            borderWidth: b.borderWidth ? b.borderWidth * PX_TO_PT : undefined,
            borderColor: b.borderColor ?? "#e5e7eb",
            paddingHorizontal: b.paddingX ? b.paddingX * PX_TO_PT : 0,
            paddingVertical: b.paddingY ? b.paddingY * PX_TO_PT : 0,
            opacity: b.opacity ?? 1,
            overflow: "hidden",
          }}
        >
          <BlockPdf block={b} data={data} />
        </View>
      ))}
    </Page>
  );
}

function BlockPdf({ block, data }: { block: CustomBlock; data: ResumeData }) {
  const sizePt = (block.fontSize ?? 11) * PX_TO_PT;

  const base = {
    fontSize: sizePt,
    color: block.color ?? "#111827",
    fontFamily: block.fontWeight === "bold" ? "Helvetica-Bold" : "Helvetica",
    textAlign: (block.align ?? "left") as "left" | "center" | "right",
    lineHeight: 1.45,
  };

  switch (block.type) {
    case "name":        return <PdfRich text={data.contact.fullName || "Your Name"} base={base} />;
    case "title":       return <PdfRich text={data.contact.title} base={base} />;
    case "contactLine": return <PdfRich text={contactLine(data.contact)} base={base} />;
    case "heading":     return <PdfRich text={block.text || "SECTION"} base={base} />;
    case "text":        return <PdfRich text={block.text ?? ""} base={base} />;
    case "summary":     return <PdfRich text={data.summary} base={base} />;
    case "divider":
      return (
        <View style={{ width: "100%", height: "100%", justifyContent: "center" }}>
          <View style={{ borderTopWidth: 1, borderTopColor: block.color ?? "#9ca3af", width: "100%" }} />
        </View>
      );

    case "photo": {
      const r =
        block.photoShape === "square" ? 0 : block.photoShape === "rounded" ? 16 * PX_TO_PT : 9999;
      return data.contact.photoDataUrl ? (
        <Image src={data.contact.photoDataUrl} style={{ width: "100%", height: "100%", borderRadius: r, objectFit: block.imageObjectFit ?? "cover" }} />
      ) : (
        <View style={{ width: "100%", height: "100%", borderRadius: r, backgroundColor: "#e5e7eb" }} />
      );
    }

    case "image": {
      return block.imageDataUrl ? (
        <Image src={block.imageDataUrl} style={{ width: "100%", height: "100%", objectFit: block.imageObjectFit ?? "cover" }} />
      ) : (
        <View style={{ width: "100%", height: "100%", backgroundColor: "#f3f4f6" }} />
      );
    }

    case "icon": {
      const name = (block.iconName ?? "star") as IconName;
      const def = ICONS[name];
      if (!def) return null;
      const paths = Array.isArray(def.d) ? def.d : [def.d];
      const color = block.color ?? "#2854ef";
      return (
        <Svg viewBox="0 0 24 24" style={{ width: "100%", height: "100%" }}>
          {paths.map((d, i) => (
            <Path
              key={i}
              d={d}
              fill={def.fill ? color : "none"}
              stroke={def.fill ? "none" : color}
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ))}
        </Svg>
      );
    }

    case "shape": {
      const kind = block.shapeKind ?? "rect";
      if (kind === "line") {
        return (
          <View style={{ width: "100%", height: "100%", justifyContent: "center" }}>
            <View
              style={{
                width: "100%",
                borderTopWidth: (block.shapeStrokeWidth ?? 2) * PX_TO_PT,
                borderTopColor: block.backgroundColor ?? block.color ?? "#9ca3af",
              }}
            />
          </View>
        );
      }
      return (
        <View
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: block.backgroundColor ?? "#eef4ff",
            borderRadius: kind === "circle" ? 9999 : (block.borderRadius ?? 0) * PX_TO_PT,
          }}
        />
      );
    }

    case "experience":
      return (
        <View>
          {data.experience.map((e) => (
            <View key={e.id} style={{ marginBottom: 4 }}>
              <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <Text style={{ ...base, fontFamily: "Helvetica-Bold" }}>
                  {e.role || "Role"} · {e.company || "Company"}
                </Text>
                <Text style={{ ...base, color: "#6b7280" }}>
                  {[e.startDate, e.endDate].filter(Boolean).join(" – ")}
                </Text>
              </View>
              {e.bullets.filter(Boolean).map((b, i) => (
                <View key={i} style={{ flexDirection: "row" }}>
                  <Text style={{ ...base, width: 8 }}>•</Text>
                  <View style={{ flex: 1 }}>
                    <PdfRich text={b} base={base} />
                  </View>
                </View>
              ))}
            </View>
          ))}
        </View>
      );

    case "education":
      return (
        <View>
          {data.education.map((ed) => (
            <View key={ed.id} style={{ marginBottom: 3 }}>
              <Text style={{ ...base, fontFamily: "Helvetica-Bold" }}>{ed.school}</Text>
              <Text style={base}>{ed.degree}{ed.field ? `, ${ed.field}` : ""}</Text>
              <Text style={{ ...base, color: "#6b7280" }}>
                {[ed.startDate, ed.endDate].filter(Boolean).join(" – ")}
              </Text>
            </View>
          ))}
        </View>
      );

    case "skills":
      return (
        <View>
          {data.skills.map((sk, i) => (
            <View key={i} style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 1 }}>
              <Text style={base}>{sk.name}</Text>
              {sk.level ? (
                <Text style={{ ...base, color: "#6b7280" }}>{"●".repeat(sk.level)}{"○".repeat(5 - sk.level)}</Text>
              ) : null}
            </View>
          ))}
        </View>
      );

    case "projects":
      return (
        <View>
          {data.projects.map((p) => (
            <View key={p.id} style={{ marginBottom: 3 }}>
              <Text style={{ ...base, fontFamily: "Helvetica-Bold" }}>
                {p.name}
                {p.link ? <Link src={p.link}>{`  ·  ${p.link}`}</Link> : null}
              </Text>
              {p.description ? <PdfRich text={p.description} base={base} /> : null}
            </View>
          ))}
        </View>
      );
  }
}
