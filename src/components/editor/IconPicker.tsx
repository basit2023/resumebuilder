"use client";

import { useState } from "react";
import { ICONS, type IconName } from "@/lib/icons";
import { IconRender } from "./IconRender";

const CATEGORIES = ["contact", "social", "skill", "object"] as const;

export function IconPicker({
  value,
  onChange,
}: {
  value?: string;
  onChange: (name: IconName) => void;
}) {
  const [cat, setCat] = useState<(typeof CATEGORIES)[number]>("contact");
  const [query, setQuery] = useState("");

  const allEntries = Object.entries(ICONS) as [IconName, (typeof ICONS)[IconName]][];
  const entries = query.trim()
    ? allEntries.filter(([key, def]) =>
        key.toLowerCase().includes(query.toLowerCase()) ||
        def.label.toLowerCase().includes(query.toLowerCase())
      )
    : allEntries.filter(([, def]) => def.category === cat);

  return (
    <div className="space-y-2">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search icons…"
        className="w-full rounded-md border border-gray-200 bg-white px-2 py-1 text-xs placeholder:text-gray-400 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-500/15"
      />

      {!query.trim() && (
        <div className="flex gap-1">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`flex-1 rounded-md border px-1.5 py-1 text-[10px] font-medium capitalize transition ${
                cat === c
                  ? "border-brand-500 bg-brand-50 text-brand-700"
                  : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      )}

      <div className="grid grid-cols-4 gap-1.5 rounded-lg border border-gray-200 bg-gray-50 p-2">
        {entries.length === 0 && (
          <div className="col-span-4 py-4 text-center text-[11px] text-gray-400">No icons match "{query}"</div>
        )}
        {entries.map(([key, def]) => (
          <button
            key={key}
            onClick={() => onChange(key)}
            title={def.label}
            className={`group grid place-items-center gap-1 rounded-md border-2 p-2 transition ${
              value === key
                ? "border-brand-500 bg-brand-50 text-brand-700 shadow-sm"
                : "border-transparent bg-white text-gray-600 hover:border-brand-200 hover:bg-brand-50/50 hover:text-brand-600"
            }`}
            style={{ minHeight: 56 }}
          >
            <div style={{ width: 24, height: 24 }}>
              <IconRender name={key} />
            </div>
            <span className="truncate text-[9px] font-medium">{def.label}</span>
          </button>
        ))}
      </div>

      {value && (
        <div className="flex items-center gap-2 rounded-md border border-brand-100 bg-brand-50/50 px-2 py-1.5 text-[11px]">
          <div className="text-brand-700" style={{ width: 16, height: 16 }}>
            <IconRender name={value as IconName} />
          </div>
          <span className="text-gray-700">
            Selected: <strong className="text-brand-700">{ICONS[value as IconName]?.label}</strong>
          </span>
        </div>
      )}
    </div>
  );
}
