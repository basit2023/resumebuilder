"use client";

import type { CSSProperties } from "react";
import type { CustomBlock, ResumeData } from "@/lib/types";
import { contactLine } from "@/lib/customLayout";
import { IconRender } from "./IconRender";
import type { IconName } from "@/lib/icons";
import { parseInlineLinks } from "@/lib/parseLinks";

/**
 * Renders text that may contain `[label](url)` or bare URLs as a flow of
 * text + clickable <a> links. Used for any block whose content is plain text.
 */
function RichText({ text, color }: { text?: string; color?: string }) {
  const segs = parseInlineLinks(text ?? "");
  if (segs.length === 0) return <>{text}</>;
  return (
    <>
      {segs.map((s, i) =>
        s.kind === "link" ? (
          <a
            key={i}
            href={s.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: color ?? "#2854ef",
              textDecoration: "underline",
              textUnderlineOffset: 2,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {s.text}
          </a>
        ) : (
          <span key={i}>{s.text}</span>
        )
      )}
    </>
  );
}

export function BlockShell({ block, children }: { block: CustomBlock; children: React.ReactNode }) {
  const style: CSSProperties = {
    width: "100%",
    height: "100%",
    backgroundColor: block.backgroundColor,
    border: block.borderWidth ? `${block.borderWidth}px solid ${block.borderColor ?? "#e5e7eb"}` : undefined,
    borderRadius: block.borderRadius,
    paddingLeft: block.paddingX,
    paddingRight: block.paddingX,
    paddingTop: block.paddingY,
    paddingBottom: block.paddingY,
    opacity: block.opacity ?? 1,
    overflow: "hidden",
    boxSizing: "border-box",
  };
  return <div style={style}>{children}</div>;
}

export function BlockContent({ block, data }: { block: CustomBlock; data: ResumeData }) {
  const text: CSSProperties = {
    fontSize: block.fontSize ?? 11,
    fontWeight: block.fontWeight === "bold" ? 700 : 400,
    textAlign: block.align ?? "left",
    color: block.color ?? "#111827",
    width: "100%",
    height: "100%",
    lineHeight: 1.45,
    whiteSpace: "pre-wrap",
    wordBreak: "break-word",
  };

  const inner = (() => {
    switch (block.type) {
      case "name":
        return <div style={text}><RichText text={data.contact.fullName || "Your Name"} color={block.color} /></div>;
      case "title":
        return <div style={text}><RichText text={data.contact.title || "Your title"} color={block.color} /></div>;
      case "contactLine":
        return <div style={text}><RichText text={contactLine(data.contact) || "email · phone · location"} color={block.color} /></div>;
      case "heading":
        return <div style={text}><RichText text={block.text || "SECTION"} color={block.color} /></div>;
      case "text":
        return <div style={text}><RichText text={block.text || "Click to edit this paragraph."} color={block.color} /></div>;
      case "summary":
        return <div style={text}><RichText text={data.summary || "Your professional summary…"} color={block.color} /></div>;
      case "divider":
        return (
          <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center" }}>
            <div style={{ width: "100%", borderTop: `1px solid ${block.color ?? "#9ca3af"}` }} />
          </div>
        );
      case "photo": {
        const radius =
          block.photoShape === "square" ? 0 : block.photoShape === "rounded" ? 16 : 9999;
        const ox = block.imageObjectX ?? 50;
        const oy = block.imageObjectY ?? 50;
        return data.contact.photoDataUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={data.contact.photoDataUrl}
            alt="photo"
            style={{
              width: "100%",
              height: "100%",
              objectFit: block.imageObjectFit ?? "cover",
              objectPosition: `${ox}% ${oy}%`,
              borderRadius: radius,
            }}
          />
        ) : (
          <div
            style={{
              width: "100%",
              height: "100%",
              borderRadius: radius,
              background: "#e5e7eb",
              display: "grid",
              placeItems: "center",
              color: "#9ca3af",
              fontSize: 24,
            }}
          >
            👤
          </div>
        );
      }
      case "image": {
        const ox = block.imageObjectX ?? 50;
        const oy = block.imageObjectY ?? 50;
        return block.imageDataUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={block.imageDataUrl}
            alt=""
            style={{
              width: "100%",
              height: "100%",
              objectFit: block.imageObjectFit ?? "cover",
              objectPosition: `${ox}% ${oy}%`,
            }}
          />
        ) : (
          <div
            style={{
              width: "100%",
              height: "100%",
              border: "2px dashed #d1d5db",
              borderRadius: 6,
              display: "grid",
              placeItems: "center",
              color: "#9ca3af",
              fontSize: 11,
            }}
          >
            Upload image →
          </div>
        );
      }
      case "icon": {
        const name = (block.iconName ?? "star") as IconName;
        return (
          <div style={{ width: "100%", height: "100%", color: block.color ?? "#2854ef" }}>
            <IconRender name={name} strokeWidth={block.borderWidth ? block.borderWidth + 1 : 2} />
          </div>
        );
      }
      case "shape": {
        const kind = block.shapeKind ?? "rect";
        if (kind === "line") {
          return (
            <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center" }}>
              <div
                style={{
                  width: "100%",
                  borderTop: `${block.shapeStrokeWidth ?? 2}px solid ${block.backgroundColor ?? block.color ?? "#9ca3af"}`,
                }}
              />
            </div>
          );
        }
        return (
          <div
            style={{
              width: "100%",
              height: "100%",
              borderRadius: kind === "circle" ? "50%" : block.borderRadius ?? 0,
              background: block.backgroundColor ?? "#eef4ff",
            }}
          />
        );
      }
      case "experience":
        return (
          <div style={text}>
            {data.experience.length === 0 && <em style={{ color: "#9ca3af" }}>Add roles in the form.</em>}
            {data.experience.map((e) => (
              <div key={e.id} style={{ marginBottom: 6 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 600 }}>
                  <span>{e.role || "Role"} · {e.company || "Company"}</span>
                  <span style={{ color: "#6b7280" }}>{[e.startDate, e.endDate].filter(Boolean).join(" – ")}</span>
                </div>
                {e.bullets.filter(Boolean).map((b, i) => (
                  <div key={i} style={{ display: "flex", gap: 4 }}><span>•</span><span style={{ flex: 1 }}><RichText text={b} color={block.color} /></span></div>
                ))}
              </div>
            ))}
          </div>
        );
      case "education":
        return (
          <div style={text}>
            {data.education.map((ed) => (
              <div key={ed.id} style={{ marginBottom: 4 }}>
                <div style={{ fontWeight: 600 }}>{ed.school}</div>
                <div>{ed.degree}{ed.field ? `, ${ed.field}` : ""}</div>
                <div style={{ color: "#6b7280" }}>{[ed.startDate, ed.endDate].filter(Boolean).join(" – ")}</div>
              </div>
            ))}
          </div>
        );
      case "skills":
        return (
          <div style={text}>
            {data.skills.length === 0 ? (
              <em style={{ color: "#9ca3af" }}>Add skills…</em>
            ) : (
              data.skills.map((sk, i) => (
                <div key={i} style={{ marginBottom: 3 }}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span>{sk.name}</span>
                    {sk.level && <span style={{ color: "#6b7280", fontSize: (block.fontSize ?? 11) - 1 }}>{"●".repeat(sk.level) + "○".repeat(5 - sk.level)}</span>}
                  </div>
                </div>
              ))
            )}
          </div>
        );
      case "projects":
        return (
          <div style={text}>
            {data.projects.map((p) => (
              <div key={p.id} style={{ marginBottom: 4 }}>
                <span style={{ fontWeight: 600 }}>{p.name}</span>
                {p.link && (
                  <>
                    {" · "}
                    <a
                      href={p.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: block.color ?? "#2854ef", textDecoration: "underline" }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      {p.link}
                    </a>
                  </>
                )}
                {p.description && <div><RichText text={p.description} color={block.color} /></div>}
              </div>
            ))}
          </div>
        );
    }
  })();

  return <BlockShell block={block}>{inner}</BlockShell>;
}
