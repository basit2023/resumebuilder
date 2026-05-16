"use client";
import { useState } from "react";
import type {
  ResumeData, Certification, Language, Award, CustomSection, CustomSectionItem,
} from "@/lib/types";
import { uid } from "@/lib/utils";

/* ─── CERTIFICATIONS ───────────────────── */
export function CertificationsEditor({
  value, onChange,
}: {
  value: Certification[];
  onChange: (v: Certification[]) => void;
}) {
  function add() {
    onChange([...value, { id: uid(), name: "", issuer: "", date: "", credentialId: "", url: "" }]);
  }
  function update(idx: number, patch: Partial<Certification>) {
    onChange(value.map((c, i) => (i === idx ? { ...c, ...patch } : c)));
  }
  function remove(idx: number) { onChange(value.filter((_, i) => i !== idx)); }

  return (
    <div className="space-y-3">
      {value.map((cert, idx) => (
        <div key={cert.id} className="rounded-xl border border-gray-200 bg-gray-50/60 p-4 space-y-3">
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="label">Certification name</label>
              <input className="input" value={cert.name} placeholder="AWS Solutions Architect"
                onChange={(e) => update(idx, { name: e.target.value })} />
            </div>
            <div>
              <label className="label">Issuing organization</label>
              <input className="input" value={cert.issuer} placeholder="Amazon Web Services"
                onChange={(e) => update(idx, { issuer: e.target.value })} />
            </div>
            <div>
              <label className="label">Date</label>
              <input className="input" value={cert.date ?? ""} placeholder="Mar 2024"
                onChange={(e) => update(idx, { date: e.target.value })} />
            </div>
            <div>
              <label className="label">Credential ID (optional)</label>
              <input className="input" value={cert.credentialId ?? ""} placeholder="ABC-123"
                onChange={(e) => update(idx, { credentialId: e.target.value })} />
            </div>
            <div className="sm:col-span-2">
              <label className="label">Credential URL (optional)</label>
              <input className="input" value={cert.url ?? ""} placeholder="https://…"
                onChange={(e) => update(idx, { url: e.target.value })} />
            </div>
          </div>
          <button className="btn-danger text-xs" onClick={() => remove(idx)}>Remove</button>
        </div>
      ))}
      <button className="btn-secondary" onClick={add}>+ Add certification</button>
    </div>
  );
}

/* ─── LANGUAGES ─────────────────────────── */
const PROFICIENCY_LEVELS: Language["proficiency"][] = [
  "Native", "Fluent", "Advanced", "Intermediate", "Basic",
];

export function LanguagesEditor({
  value, onChange,
}: {
  value: Language[];
  onChange: (v: Language[]) => void;
}) {
  function add() {
    onChange([...value, { id: uid(), language: "", proficiency: "Fluent" }]);
  }
  function update(idx: number, patch: Partial<Language>) {
    onChange(value.map((l, i) => (i === idx ? { ...l, ...patch } : l)));
  }
  function remove(idx: number) { onChange(value.filter((_, i) => i !== idx)); }

  const PROF_COLOR: Record<Language["proficiency"], string> = {
    Native:       "bg-brand-100 text-brand-700",
    Fluent:       "bg-emerald-100 text-emerald-700",
    Advanced:     "bg-teal-100 text-teal-700",
    Intermediate: "bg-amber-100 text-amber-700",
    Basic:        "bg-gray-100 text-gray-600",
  };

  return (
    <div className="space-y-3">
      {value.length > 0 && (
        <div className="flex flex-wrap gap-2 pb-2">
          {value.map((lang, idx) => (
            <div
              key={lang.id}
              className={`flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium ${PROF_COLOR[lang.proficiency]}`}
            >
              <span>{lang.language || "—"}</span>
              <span className="text-xs opacity-70">· {lang.proficiency}</span>
              <button
                className="ml-1 opacity-50 hover:opacity-100 transition"
                onClick={() => remove(idx)}
                title="Remove"
              >×</button>
            </div>
          ))}
        </div>
      )}
      <div className="rounded-xl border border-gray-200 bg-gray-50/60 p-4">
        <div className="grid gap-3 sm:grid-cols-2">
          {value.map((lang, idx) => (
            <div key={lang.id} className="flex gap-2">
              <input
                className="input flex-1"
                value={lang.language}
                placeholder="e.g. Spanish"
                onChange={(e) => update(idx, { language: e.target.value })}
              />
              <select
                className="input w-36 shrink-0"
                value={lang.proficiency}
                onChange={(e) => update(idx, { proficiency: e.target.value as Language["proficiency"] })}
              >
                {PROFICIENCY_LEVELS.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>
          ))}
        </div>
      </div>
      <button className="btn-secondary" onClick={add}>+ Add language</button>
    </div>
  );
}

/* ─── AWARDS ────────────────────────────── */
export function AwardsEditor({
  value, onChange,
}: {
  value: Award[];
  onChange: (v: Award[]) => void;
}) {
  function add() {
    onChange([...value, { id: uid(), title: "", issuer: "", date: "", description: "" }]);
  }
  function update(idx: number, patch: Partial<Award>) {
    onChange(value.map((a, i) => (i === idx ? { ...a, ...patch } : a)));
  }
  function remove(idx: number) { onChange(value.filter((_, i) => i !== idx)); }

  return (
    <div className="space-y-3">
      {value.map((award, idx) => (
        <div key={award.id} className="rounded-xl border border-gray-200 bg-gray-50/60 p-4 space-y-3">
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="label">Award / achievement</label>
              <input className="input" value={award.title} placeholder="Employee of the Year"
                onChange={(e) => update(idx, { title: e.target.value })} />
            </div>
            <div>
              <label className="label">Issuer (optional)</label>
              <input className="input" value={award.issuer ?? ""} placeholder="Acme Corp"
                onChange={(e) => update(idx, { issuer: e.target.value })} />
            </div>
            <div>
              <label className="label">Date (optional)</label>
              <input className="input" value={award.date ?? ""} placeholder="2023"
                onChange={(e) => update(idx, { date: e.target.value })} />
            </div>
          </div>
          <div>
            <label className="label">Description (optional)</label>
            <textarea className="input" rows={2} value={award.description ?? ""}
              placeholder="Brief context about this achievement…"
              onChange={(e) => update(idx, { description: e.target.value })} />
          </div>
          <button className="btn-danger text-xs" onClick={() => remove(idx)}>Remove</button>
        </div>
      ))}
      <button className="btn-secondary" onClick={add}>+ Add award</button>
    </div>
  );
}

/* ─── CUSTOM SECTIONS ───────────────────── */
export function CustomSectionsEditor({
  value, onChange,
}: {
  value: CustomSection[];
  onChange: (v: CustomSection[]) => void;
}) {
  function addSection() {
    onChange([...value, { id: uid(), heading: "Custom Section", items: [] }]);
  }
  function updateSection(idx: number, patch: Partial<CustomSection>) {
    onChange(value.map((s, i) => (i === idx ? { ...s, ...patch } : s)));
  }
  function removeSection(idx: number) { onChange(value.filter((_, i) => i !== idx)); }

  function addItem(sidx: number) {
    const section = value[sidx];
    updateSection(sidx, {
      items: [...section.items, { id: uid(), title: "", subtitle: "", date: "", description: "" }],
    });
  }
  function updateItem(sidx: number, iidx: number, patch: Partial<CustomSectionItem>) {
    const section = value[sidx];
    updateSection(sidx, {
      items: section.items.map((it, i) => (i === iidx ? { ...it, ...patch } : it)),
    });
  }
  function removeItem(sidx: number, iidx: number) {
    const section = value[sidx];
    updateSection(sidx, { items: section.items.filter((_, i) => i !== iidx) });
  }

  return (
    <div className="space-y-5">
      {value.map((section, sidx) => (
        <div key={section.id} className="rounded-xl border border-gray-200 p-4 space-y-3">
          <div className="flex items-center gap-3">
            <input
              className="input flex-1 font-semibold"
              value={section.heading}
              placeholder="Section heading"
              onChange={(e) => updateSection(sidx, { heading: e.target.value })}
            />
            <button className="btn-danger text-xs shrink-0" onClick={() => removeSection(sidx)}>
              Remove section
            </button>
          </div>

          {section.items.map((item, iidx) => (
            <div key={item.id} className="rounded-lg border border-gray-100 bg-gray-50 p-3 space-y-2">
              <div className="grid gap-2 sm:grid-cols-3">
                <div>
                  <label className="label">Title</label>
                  <input className="input" value={item.title}
                    onChange={(e) => updateItem(sidx, iidx, { title: e.target.value })} />
                </div>
                <div>
                  <label className="label">Subtitle</label>
                  <input className="input" value={item.subtitle ?? ""}
                    onChange={(e) => updateItem(sidx, iidx, { subtitle: e.target.value })} />
                </div>
                <div>
                  <label className="label">Date</label>
                  <input className="input" value={item.date ?? ""}
                    onChange={(e) => updateItem(sidx, iidx, { date: e.target.value })} />
                </div>
              </div>
              <div>
                <label className="label">Description</label>
                <textarea className="input" rows={2} value={item.description ?? ""}
                  onChange={(e) => updateItem(sidx, iidx, { description: e.target.value })} />
              </div>
              <button className="text-xs text-red-500 hover:text-red-700" onClick={() => removeItem(sidx, iidx)}>
                Remove item
              </button>
            </div>
          ))}

          <button className="btn-secondary text-xs" onClick={() => addItem(sidx)}>+ Add item</button>
        </div>
      ))}
      <button className="btn-secondary" onClick={addSection}>+ Add custom section</button>
    </div>
  );
}
