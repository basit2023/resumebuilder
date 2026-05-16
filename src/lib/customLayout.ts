import type { CustomBlock, CustomBlockType, CustomLayout, ContactInfo } from "./types";
import { uid } from "./utils";

export function defaultLayout(): CustomLayout {
  // Sensible starter: name + contact at top, summary, experience, two-column footer.
  return {
    blocks: [
      mk("name", { x: 48, y: 40, width: 720, height: 50, fontSize: 32, fontWeight: "bold" }),
      mk("title", { x: 48, y: 92, width: 720, height: 22, fontSize: 14, color: "#2854ef" }),
      mk("contactLine", { x: 48, y: 120, width: 720, height: 22, fontSize: 11, color: "#4b5563" }),
      mk("heading", { x: 48, y: 168, width: 720, height: 22, fontSize: 12, fontWeight: "bold", color: "#2854ef", text: "SUMMARY" }),
      mk("summary", { x: 48, y: 196, width: 720, height: 64, fontSize: 11 }),
      mk("heading", { x: 48, y: 272, width: 720, height: 22, fontSize: 12, fontWeight: "bold", color: "#2854ef", text: "EXPERIENCE" }),
      mk("experience", { x: 48, y: 300, width: 720, height: 360, fontSize: 11 }),
      mk("heading", { x: 48, y: 680, width: 340, height: 22, fontSize: 12, fontWeight: "bold", color: "#2854ef", text: "EDUCATION" }),
      mk("education", { x: 48, y: 708, width: 340, height: 140, fontSize: 11 }),
      mk("heading", { x: 428, y: 680, width: 340, height: 22, fontSize: 12, fontWeight: "bold", color: "#2854ef", text: "SKILLS" }),
      mk("skills", { x: 428, y: 708, width: 340, height: 140, fontSize: 11 }),
    ],
  };
}

function mk(type: CustomBlockType, partial: Partial<CustomBlock>): CustomBlock {
  return {
    id: uid(),
    type,
    x: 48,
    y: 48,
    width: 300,
    height: 60,
    fontSize: 11,
    fontWeight: "normal",
    align: "left",
    color: "#111827",
    ...partial,
  };
}

export function newBlock(type: CustomBlockType): CustomBlock {
  const base: Partial<CustomBlock> = { x: 60, y: 60, width: 400, height: 80 };
  switch (type) {
    case "name":        return mk(type, { ...base, fontSize: 32, fontWeight: "bold", height: 50 });
    case "title":       return mk(type, { ...base, fontSize: 14, color: "#2854ef", height: 22 });
    case "contactLine": return mk(type, { ...base, fontSize: 11, color: "#4b5563", height: 22, width: 720 });
    case "heading":     return mk(type, { ...base, fontSize: 12, fontWeight: "bold", color: "#2854ef", height: 22, text: "SECTION" });
    case "summary":     return mk(type, { ...base, fontSize: 11, height: 60 });
    case "experience":  return mk(type, { ...base, fontSize: 11, height: 220, width: 720 });
    case "education":   return mk(type, { ...base, fontSize: 11, height: 120 });
    case "skills":      return mk(type, { ...base, fontSize: 11, height: 80 });
    case "projects":    return mk(type, { ...base, fontSize: 11, height: 120 });
    case "divider":     return mk(type, { ...base, height: 2, width: 720, color: "#9ca3af" });
    case "photo":       return mk(type, { ...base, width: 96, height: 96 });
    case "text":        return mk(type, { ...base, height: 60, fontSize: 11, text: "Click to edit this paragraph." });
    case "image":       return mk(type, { ...base, width: 200, height: 140, imageObjectFit: "cover", imageObjectX: 50, imageObjectY: 50 });
    case "icon":        return mk(type, { ...base, width: 32, height: 32, iconName: "star", color: "#2854ef" });
    case "shape":       return mk(type, { ...base, width: 200, height: 100, shapeKind: "rect", backgroundColor: "#eef4ff", borderRadius: 8 });
  }
}

export function contactLine(c: ContactInfo) {
  return [c.email, c.phone, c.location, c.linkedin, c.github, c.website].filter(Boolean).join("  ·  ");
}

export const BLOCK_LABELS: Record<CustomBlockType, string> = {
  name: "Name",
  title: "Job title",
  contactLine: "Contact line",
  summary: "Summary",
  experience: "Experience",
  education: "Education",
  skills: "Skills",
  projects: "Projects",
  heading: "Section heading",
  divider: "Divider line",
  photo: "Photo",
  text: "Text / paragraph",
  image: "Image",
  icon: "Icon",
  shape: "Shape",
};

/** Block types grouped by section for the toolbar. */
export const BLOCK_GROUPS: { label: string; types: CustomBlockType[] }[] = [
  { label: "Resume", types: ["name", "title", "contactLine", "summary", "experience", "education", "skills", "projects"] },
  { label: "Elements", types: ["heading", "text", "divider", "photo", "image", "icon", "shape"] },
];
