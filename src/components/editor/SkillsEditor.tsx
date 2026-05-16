"use client";

import { useState } from "react";
import type { Skill } from "@/lib/types";

const LEVEL_LABEL: Record<number, string> = {
  1: "Beginner",
  2: "Novice",
  3: "Intermediate",
  4: "Advanced",
  5: "Expert",
};

type Props = {
  value: Skill[];
  onChange: (next: Skill[]) => void;
};

export function SkillsEditor({ value, onChange }: Props) {
  const [bulk, setBulk] = useState("");
  const [draft, setDraft] = useState("");

  function addOne() {
    const name = draft.trim();
    if (!name) return;
    onChange([...value, { name, level: 3 }]);
    setDraft("");
  }

  function addBulk() {
    const fresh = bulk
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean)
      .map((name) => ({ name, level: undefined as undefined }));
    if (!fresh.length) return;
    onChange([...value, ...fresh]);
    setBulk("");
  }

  function patch(i: number, p: Partial<Skill>) {
    onChange(value.map((s, idx) => (idx === i ? { ...s, ...p } : s)));
  }
  function remove(i: number) {
    onChange(value.filter((_, idx) => idx !== i));
  }
  function move(i: number, dir: -1 | 1) {
    const j = i + dir;
    if (j < 0 || j >= value.length) return;
    const next = [...value];
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
  }

  return (
    <div className="space-y-3">
      {/* Quick-add (single, with level) */}
      <div className="flex gap-2">
        <input
          className="input"
          placeholder="e.g. TypeScript"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addOne();
            }
          }}
        />
        <button onClick={addOne} className="btn-primary text-xs">+ Add</button>
      </div>

      {/* Bulk add (comma separated, no level) */}
      <details className="rounded-lg border border-gray-200 bg-gray-50/50 p-2">
        <summary className="cursor-pointer text-xs font-medium text-gray-700">Bulk add (comma separated)</summary>
        <div className="mt-2 flex gap-2">
          <input
            className="input"
            placeholder="React, Node.js, AWS"
            value={bulk}
            onChange={(e) => setBulk(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addBulk();
              }
            }}
          />
          <button onClick={addBulk} className="btn-secondary text-xs">Add all</button>
        </div>
      </details>

      {/* List with reorder/level/remove */}
      {value.length > 0 && (
        <ul className="space-y-1.5">
          {value.map((sk, i) => (
            <li
              key={i}
              className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-2 py-1.5"
            >
              <div className="flex flex-col">
                <button
                  onClick={() => move(i, -1)}
                  disabled={i === 0}
                  className="px-1 text-[10px] text-gray-400 hover:text-gray-700 disabled:opacity-30"
                  title="Move up"
                >▲</button>
                <button
                  onClick={() => move(i, 1)}
                  disabled={i === value.length - 1}
                  className="px-1 text-[10px] text-gray-400 hover:text-gray-700 disabled:opacity-30"
                  title="Move down"
                >▼</button>
              </div>

              <input
                className="flex-1 border-0 bg-transparent px-1 py-0.5 text-sm focus:outline-none"
                value={sk.name}
                onChange={(e) => patch(i, { name: e.target.value })}
              />

              <LevelDots level={sk.level} onChange={(lv) => patch(i, { level: lv })} />

              <button
                onClick={() => remove(i)}
                className="rounded p-1 text-xs text-gray-400 hover:bg-red-50 hover:text-red-700"
                title="Remove"
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      )}

      <p className="text-[11px] text-gray-500">
        Tip: Click the dots to set proficiency (1 = beginner · 5 = expert). Leave empty for no level.
      </p>
    </div>
  );
}

function LevelDots({
  level,
  onChange,
}: {
  level?: 1 | 2 | 3 | 4 | 5;
  onChange: (lv: Skill["level"]) => void;
}) {
  return (
    <div className="flex items-center gap-1" title={level ? LEVEL_LABEL[level] : "No level"}>
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          onClick={() => onChange(level === n ? undefined : (n as Skill["level"]))}
          className={`h-2.5 w-2.5 rounded-full border transition ${
            level && n <= level
              ? "border-brand-600 bg-brand-600"
              : "border-gray-300 bg-white hover:border-brand-400"
          }`}
        />
      ))}
    </div>
  );
}
