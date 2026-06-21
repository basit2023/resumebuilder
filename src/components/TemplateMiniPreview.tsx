import type { CSSProperties } from "react";
import type { CustomBlock, CustomLayout } from "@/lib/types";
import { PAGE_PX } from "@/lib/types";

const PREVIEW_W = 320;
const SCALE = PREVIEW_W / PAGE_PX.width;

function barStyle(block: CustomBlock): CSSProperties {
  if (block.type === "shape" || (block.backgroundColor && block.type !== "text")) {
    return {
      background: block.backgroundColor ?? block.color ?? "#e5e7eb",
      borderRadius: block.shapeKind === "circle" ? "50%" : (block.borderRadius ?? 0) * SCALE,
      opacity: block.opacity ?? 1,
    };
  }
  if (block.type === "photo" || block.type === "image" || block.type === "icon") {
    return {
      background: "#cbd5e1",
      borderRadius: block.photoShape === "circle" ? "50%" : block.photoShape === "rounded" ? 4 : 2,
    };
  }
  if (block.type === "name" || (block.fontWeight === "bold" && (block.fontSize ?? 11) >= 18)) {
    return { background: block.color && block.color !== "#111827" ? block.color : "#1f2937", borderRadius: 2 };
  }
  if (block.type === "heading") {
    return { background: block.color ?? "#2854ef", borderRadius: 2, opacity: 0.9 };
  }
  return { background: "#e5e7eb", borderRadius: 2 };
}

export function TemplateMiniPreview({ layout, accent }: { layout: CustomLayout; accent: string }) {
  return (
    <div
      className="relative mx-auto overflow-hidden rounded-lg border border-gray-200 bg-white shadow-card"
      style={{ width: PREVIEW_W, height: PAGE_PX.height * SCALE }}
    >
      <div className="absolute inset-x-0 top-0 h-1" style={{ background: accent }} />
      {layout.blocks.map((block) => (
        <div
          key={block.id}
          style={{
            position: "absolute",
            left: block.x * SCALE,
            top: block.y * SCALE,
            width: block.width * SCALE,
            height: block.height * SCALE,
            ...barStyle(block),
          }}
        />
      ))}
    </div>
  );
}
