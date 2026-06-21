"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import type { CustomBlock } from "@/lib/types";
import { PAGE_PX } from "@/lib/types";
import { TEMPLATE_PRESETS } from "@/lib/templatePresets";

const PREVIEW_W = 280;
const SCALE = PREVIEW_W / PAGE_PX.width;

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
  return { background: "#e5e7eb", borderRadius: 2 };
}

export function TemplatesBrowser() {
  const router = useRouter();
  const [loadingId, setLoadingId] = useState<string | null>(null);
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
      const haystack = [
        preset.name,
        preset.description,
        preset.category,
        preset.country,
        preset.countryCode,
        preset.format,
      ].join(" ").toLowerCase();
      return matchesCountry && (!q || haystack.includes(q));
    });
  }, [country, query]);

  async function use(presetId: string) {
    setLoadingId(presetId);
    const res = await fetch("/api/resumes", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ presetId }),
    });
    if (res.status === 401) {
      router.push(`/login?next=${encodeURIComponent("/templates")}`);
      return;
    }
    if (!res.ok) {
      setLoadingId(null);
      alert("Could not create resume. Please try again.");
      return;
    }
    const { id } = await res.json();
    router.push(`/dashboard/resumes/${id}`);
  }

  return (
    <div>
      <div className="mb-7 grid gap-3 rounded-2xl border border-gray-200 bg-white p-4 shadow-card sm:grid-cols-[1fr_220px]">
        <div>
          <label className="label">Search templates</label>
          <input
            className="input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search country, format, role, ATS, CV..."
          />
        </div>
        <div>
          <label className="label">Country format</label>
          <select className="input" value={country} onChange={(e) => setCountry(e.target.value)}>
            {countries.map((item) => (
              <option key={item} value={item}>{item}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="mb-4 flex flex-wrap items-center justify-between gap-2 text-sm text-gray-500">
        <span>{filtered.length} templates found</span>
        <span>US, UK, EU, Germany, UAE, Canada, Australia, Pakistan, India, and global formats</span>
      </div>

      <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
      {filtered.map((preset) => {
        const layout = preset.build();
        return (
          <div
            key={preset.id}
            className="group flex flex-col rounded-2xl border border-gray-200 bg-white p-5 shadow-card transition hover:-translate-y-1 hover:shadow-card-lg"
          >
            <div
              className="relative mx-auto overflow-hidden rounded-lg border border-gray-200 bg-white"
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
            <div className="mt-4 flex items-center gap-2">
              <span className="h-3 w-3 rounded-full" style={{ background: preset.accent }} />
              <h3 className="min-w-0 flex-1 font-semibold text-gray-900">{preset.name}</h3>
              <span className="ml-auto rounded-full bg-gray-100 px-2 py-0.5 text-[11px] font-semibold text-gray-600">
                {preset.countryCode}
              </span>
            </div>
            <div className="mt-2 flex flex-wrap gap-1.5">
              <span className="rounded-full bg-brand-50 px-2 py-0.5 text-[11px] font-semibold text-brand-700">
                {preset.format}
              </span>
              <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[11px] font-semibold text-gray-600">
                {preset.category}
              </span>
            </div>
            <p className="mt-1 flex-1 text-sm text-gray-500">{preset.description}</p>
            <p className="mt-3 rounded-lg bg-emerald-50 px-3 py-2 text-xs font-medium text-emerald-700">
              Includes editable sample content and a custom canvas layout.
            </p>
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              <Link href={`/templates/${preset.slug}`} className="btn-secondary justify-center">
                Preview template
              </Link>
              <button
                onClick={() => use(preset.id)}
                disabled={loadingId === preset.id}
                className="btn-primary justify-center"
              >
                {loadingId === preset.id ? "Opening..." : "Use this template"}
              </button>
            </div>
          </div>
        );
      })}
      </div>
      {filtered.length === 0 && (
        <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-10 text-center text-sm text-gray-500">
          No templates match that search yet.
        </div>
      )}
    </div>
  );
}
