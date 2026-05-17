"use client";

import { useEffect, useMemo, useState } from "react";
import type { CustomBlock, CustomLayout } from "@/lib/types";
import { PAGE_PX } from "@/lib/types";
import { TEMPLATE_PRESETS, type TemplatePreset } from "@/lib/templatePresets";

const PREVIEW_W = 220;
const SCALE = PREVIEW_W / PAGE_PX.width;

/** Lightweight schematic of a layout — colored bars positioned like the real blocks. */
function MiniPreview({ layout }: { layout: CustomLayout }) {
  return (
    <div
      className="relative overflow-hidden rounded-md border border-gray-200 bg-white"
      style={{ width: PREVIEW_W, height: PAGE_PX.height * SCALE }}
    >
      {layout.blocks.map((bl) => (
        <div
          key={bl.id}
          style={{
            position: "absolute",
            left: bl.x * SCALE,
            top: bl.y * SCALE,
            width: bl.width * SCALE,
            height: bl.height * SCALE,
            ...barStyle(bl),
          }}
        />
      ))}
    </div>
  );
}

function barStyle(bl: CustomBlock): React.CSSProperties {
  if (bl.type === "shape" || (bl.backgroundColor && bl.type !== "text")) {
    return {
      background: bl.backgroundColor ?? bl.color ?? "#e5e7eb",
      borderRadius: bl.shapeKind === "circle" ? "50%" : (bl.borderRadius ?? 0) * SCALE,
      opacity: bl.opacity ?? 1,
    };
  }
  if (bl.type === "photo" || bl.type === "image" || bl.type === "icon") {
    return {
      background: "#cbd5e1",
      borderRadius: bl.photoShape === "circle" ? "50%" : bl.photoShape === "rounded" ? 4 : 2,
    };
  }
  if (bl.type === "name" || (bl.fontWeight === "bold" && (bl.fontSize ?? 11) >= 18)) {
    return { background: bl.color && bl.color !== "#111827" ? bl.color : "#1f2937", borderRadius: 2 };
  }
  if (bl.type === "heading") {
    return { background: bl.color ?? "#2854ef", borderRadius: 2, opacity: 0.9 };
  }
  // generic text — light gray bars
  return { background: "#e5e7eb", borderRadius: 2 };
}

export function TemplateGallery({
  open,
  onClose,
  onApply,
}: {
  open: boolean;
  onClose: () => void;
  onApply: (layout: CustomLayout, preset: TemplatePreset) => void;
}) {
  const [query, setQuery] = useState("");
  const [country, setCountry] = useState("All");
  const countries = useMemo(
    () => ["All", ...Array.from(new Set(TEMPLATE_PRESETS.map((preset) => preset.country))).sort()],
    []
  );
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return TEMPLATE_PRESETS.filter((preset) => {
      const matchesCountry = country === "All" || preset.country === country;
      const text = `${preset.name} ${preset.description} ${preset.category} ${preset.country} ${preset.countryCode} ${preset.format}`.toLowerCase();
      return matchesCountry && (!q || text.includes(q));
    });
  }, [country, query]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="flex max-h-[88vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Choose a template</h2>
            <p className="text-sm text-gray-500">
              Pick a ready-made layout. Your content flows in automatically — then edit & download.
            </p>
          </div>
          <button onClick={onClose} className="btn-icon" aria-label="Close">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </header>

        <div className="grid gap-3 border-b border-gray-100 px-6 py-4 sm:grid-cols-[1fr_220px]">
          <input
            className="input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search country, format, CV, ATS..."
          />
          <select className="input" value={country} onChange={(e) => setCountry(e.target.value)}>
            {countries.map((item) => (
              <option key={item} value={item}>{item}</option>
            ))}
          </select>
        </div>

        <div className="grid flex-1 grid-cols-1 gap-5 overflow-y-auto p-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((preset) => {
            const layout = preset.build();
            return (
              <div
                key={preset.id}
                className="group flex flex-col rounded-xl border border-gray-200 bg-gray-50/50 p-4 transition hover:border-brand-300 hover:shadow-md"
              >
                <div className="mx-auto">
                  <MiniPreview layout={layout} />
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <span
                    className="h-3 w-3 rounded-full"
                    style={{ background: preset.accent }}
                  />
                  <h3 className="font-semibold text-gray-900">{preset.name}</h3>
                  <span className="ml-auto rounded-full bg-white px-2 py-0.5 text-[10px] font-semibold text-gray-500">
                    {preset.countryCode}
                  </span>
                </div>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  <span className="rounded-full bg-brand-50 px-2 py-0.5 text-[10px] font-semibold text-brand-700">
                    {preset.format}
                  </span>
                  <span className="rounded-full bg-white px-2 py-0.5 text-[10px] font-semibold text-gray-500">
                    {preset.category}
                  </span>
                </div>
                <p className="mt-1 flex-1 text-xs text-gray-500">{preset.description}</p>
                <button
                  onClick={() => onApply(preset.build(), preset)}
                  className="btn-primary mt-3 w-full justify-center text-sm"
                >
                  Use this template
                </button>
              </div>
            );
          })}
          {filtered.length === 0 && (
            <div className="col-span-full rounded-xl border border-dashed border-gray-300 p-8 text-center text-sm text-gray-500">
              No templates match that search.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
