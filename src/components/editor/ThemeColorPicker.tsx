"use client";

import { THEME_COLORS } from "@/lib/types";

type Props = {
  value?: string;
  onChange: (color: string) => void;
};

export function ThemeColorPicker({ value, onChange }: Props) {
  const current = value ?? THEME_COLORS[0].value;
  return (
    <div className="flex flex-wrap items-center gap-2">
      {THEME_COLORS.map((c) => (
        <button
          key={c.value}
          title={c.name}
          onClick={() => onChange(c.value)}
          className={`h-7 w-7 rounded-full border-2 transition ${
            current.toLowerCase() === c.value.toLowerCase() ? "border-gray-900 ring-2 ring-gray-900/10" : "border-white shadow-sm"
          }`}
          style={{ backgroundColor: c.value }}
        />
      ))}
      <label className="ml-2 flex items-center gap-1 text-xs text-gray-500">
        Custom
        <input
          type="color"
          value={current}
          onChange={(e) => onChange(e.target.value)}
          className="h-7 w-7 cursor-pointer rounded-full border border-gray-200 bg-transparent p-0"
        />
      </label>
    </div>
  );
}
