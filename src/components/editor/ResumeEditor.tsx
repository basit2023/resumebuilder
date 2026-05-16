"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { CustomLayout, Resume, ResumeData, TemplateId } from "@/lib/types";
import { uid } from "@/lib/utils";
import { LivePreview } from "./LivePreview";
import { AIButton } from "./AIButton";
import { CustomTemplateEditor } from "./CustomTemplateEditor";
import { PhotoUpload } from "./PhotoUpload";
import { ThemeColorPicker } from "./ThemeColorPicker";
import { AtsScorePanel } from "./AtsScorePanel";
import { CoverLetterPanel } from "./CoverLetterPanel";
import { SkillsEditor } from "./SkillsEditor";
import { ToastContainer, toast } from "./Toast";
import {
  CertificationsEditor,
  LanguagesEditor,
  AwardsEditor,
  CustomSectionsEditor,
} from "./ExtraSections";

type SaveStatus = "idle" | "saving" | "saved" | "error";

const NAV_ITEMS = [
  { id: "contact",      label: "Contact",       icon: "👤" },
  { id: "summary",      label: "Summary",        icon: "✶" },
  { id: "experience",   label: "Experience",     icon: "💼" },
  { id: "education",    label: "Education",      icon: "🎓" },
  { id: "skills",       label: "Skills",         icon: "⚙" },
  { id: "projects",     label: "Projects",       icon: "◇" },
  { id: "certifications", label: "Certs",        icon: "🏅" },
  { id: "languages",    label: "Languages",      icon: "🌐" },
  { id: "awards",       label: "Awards",         icon: "🏆" },
  { id: "custom",       label: "Custom",         icon: "＋" },
  { id: "ai-tools",     label: "AI Tools",       icon: "✦" },
];

function calcCompletion(data: ResumeData): number {
  let score = 0;
  const c = data.contact;
  if (c.fullName)  score += 10;
  if (c.email)     score += 10;
  if (c.title)     score += 5;
  if (c.phone)     score += 5;
  if (c.location)  score += 5;
  if (c.linkedin)  score += 5;
  if (data.summary.trim().length > 30)  score += 15;
  if (data.experience.length > 0)       score += 20;
  if (data.education.length > 0)        score += 10;
  if (data.skills.length >= 3)          score += 10;
  if (data.projects.length > 0)         score += 5;
  return Math.min(100, score);
}

export function ResumeEditor({ initial }: { initial: Resume }) {
  const router = useRouter();
  const [title,    setTitle]    = useState(initial.title);
  const [template, setTemplate] = useState<TemplateId>(initial.template);
  const [data,     setData]     = useState<ResumeData>(() => ({
    ...initial.data,
    certifications:  initial.data.certifications  ?? [],
    languages:       initial.data.languages       ?? [],
    awards:          initial.data.awards          ?? [],
    customSections:  initial.data.customSections  ?? [],
  }));
  const [status,    setStatus]    = useState<SaveStatus>("idle");
  const [jd,        setJd]        = useState("");
  const [tailoring, setTailoring] = useState(false);
  const [activeSection, setActiveSection] = useState("contact");
  const [isCanvasFullscreen, setIsCanvasFullscreen] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Autosave
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      setStatus("saving");
      const res = await fetch(`/api/resumes/${initial.id}`, {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ title, template, data }),
      });
      setStatus(res.ok ? "saved" : "error");
      if (!res.ok) toast("Save failed — check your connection", "error");
    }, 1000);
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, [title, template, data, initial.id]);

  const setContact = (patch: Partial<ResumeData["contact"]>) =>
    setData((d) => ({ ...d, contact: { ...d.contact, ...patch } }));

  async function tailorToJob() {
    if (!jd.trim()) return;
    setTailoring(true);
    try {
      const res = await fetch("/api/ai/tailor-jd", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ resume: data, jobDescription: jd }),
      });
      if (!res.ok) throw new Error(await res.text());
      const next = await res.json();
      setData((d) => ({ ...d, ...next.data }));
      toast("Resume tailored successfully!", "success");
    } catch {
      toast("Tailoring failed. Check ANTHROPIC_API_KEY.", "error");
    } finally {
      setTailoring(false);
    }
  }

  async function deleteResume() {
    if (!confirm("Delete this resume? This cannot be undone.")) return;
    await fetch(`/api/resumes/${initial.id}`, { method: "DELETE" });
    toast("Resume deleted", "info");
    router.push("/dashboard");
  }

  const completion = useMemo(() => calcCompletion(data), [data]);
  const previewData = useMemo(() => data, [data]);

  function scrollTo(id: string) {
    setActiveSection(id);
    const el = document.getElementById(`section-${id}`);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div className="flex min-h-screen flex-col">
      <ToastContainer />

      {/* ── Top toolbar ── */}
      <div className="sticky top-14 z-30 border-b border-gray-200 bg-white/95 backdrop-blur px-4 py-3">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-3">
          {/* Resume name */}
          <input
            className="min-w-0 flex-1 rounded-xl border border-transparent bg-transparent px-2 py-1 text-lg font-bold text-gray-900 transition hover:border-gray-200 focus:border-brand-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Untitled resume"
            aria-label="Resume name"
          />

          {/* Save status */}
          <div className="flex items-center gap-2 text-xs">
            {status === "saving" && <span className="pill-saving">● Saving…</span>}
            {status === "saved"  && <span className="pill-saved">✓ Saved</span>}
            {status === "error"  && <span className="pill-error">! Error</span>}
            {status === "idle"   && <span className="text-gray-400">Autosave on</span>}
          </div>

          {/* Template switcher */}
          <div className="flex items-center gap-1 rounded-xl border border-gray-200 bg-gray-50 p-1">
            {(["modern","classic","compact","custom"] as TemplateId[]).map((t) => (
              <button
                key={t}
                onClick={() => setTemplate(t)}
                className={`rounded-lg px-2.5 py-1 text-xs font-medium capitalize transition ${
                  template === t
                    ? "bg-white text-brand-700 shadow-sm"
                    : "text-gray-500 hover:text-gray-800"
                }`}
              >{t}</button>
            ))}
          </div>

          {/* Color picker */}
          <ThemeColorPicker
            value={data.themeColor}
            onChange={(c) => setData((d) => ({ ...d, themeColor: c }))}
          />

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button 
              onClick={async () => {
                toast("Preparing your Word document...", "info");
                const res = await fetch(`/api/resumes/${initial.id}/word?template=${template}`);
                if (!res.ok) return toast("Word export failed", "error");
                const blob = await res.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = `${title || "resume"}.docx`;
                a.click();
                toast("Word document downloaded!", "success");
              }}
              className="btn-secondary hidden sm:flex"
            >
              📄 Download Word
            </button>
            <a
              href={`/api/resumes/${initial.id}/pdf?template=${template}`}
              className="btn-primary"
            >
              ↓ Download PDF
            </a>
          </div>
          <button onClick={deleteResume} className="btn-danger text-sm">Delete</button>
        </div>

        {/* Completion bar & Magic Polish */}
        <div className="mx-auto mt-2 max-w-7xl flex items-center justify-between gap-4">
          <div className="flex-1 flex items-center gap-3">
            <div className="progress-track flex-1">
              <div className="progress-fill" style={{ width: `${completion}%` }} />
            </div>
            <span className="shrink-0 text-xs font-semibold text-gray-500">
              {completion}% complete
            </span>
          </div>
          <button 
            onClick={async () => {
              toast("Claude is optimizing your entire resume...", "info");
              try {
                const res = await fetch("/api/ai/optimize-full", {
                  method: "POST",
                  headers: { "content-type": "application/json" },
                  body: JSON.stringify({ resume: data }),
                });
                if (!res.ok) throw new Error();
                const result = await res.json();
                setData(result.data);
                toast("Resume optimized with AI!", "success");
              } catch {
                toast("AI optimization failed", "error");
              }
            }}
            className="flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-600 to-brand-600 px-4 py-1.5 text-xs font-bold text-white shadow-lg transition-transform hover:scale-105 active:scale-95"
          >
            ✨ AI Smart Polish
          </button>
        </div>
      </div>

      {/* ── Main layout ── */}
      <div className={`mx-auto flex flex-1 gap-6 py-6 lg:flex-row ${
        isCanvasFullscreen && template === "custom"
          ? "w-full max-w-none px-4"
          : "w-full max-w-7xl px-4"
      }`}>

        {/* Section nav sidebar — hidden in fullscreen */}
        <aside className={`hidden w-36 shrink-0 lg:block ${isCanvasFullscreen && template === "custom" ? "lg:hidden" : ""}`}>
          <nav className="sticky top-40 flex flex-col gap-1">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`flex items-center gap-2 rounded-xl px-3 py-2 text-left text-xs font-medium transition ${
                  activeSection === item.id
                    ? "bg-brand-50 text-brand-700"
                    : "text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                }`}
              >
                <span>{item.icon}</span>
                {item.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Editor form — hidden in fullscreen canvas mode */}
        <div className={`min-w-0 flex-1 space-y-5 ${isCanvasFullscreen && template === "custom" ? "hidden" : ""}`}>

          {/* CONTACT */}
          <Section id="contact" title="Contact" icon="👤">
            <div className="mb-4">
              <PhotoUpload
                value={data.contact.photoDataUrl}
                shape={data.contact.photoShape}
                onChange={(url) => setContact({ photoDataUrl: url })}
                onShapeChange={(s) => setContact({ photoShape: s })}
              />
            </div>
            <Grid>
              <Field label="Full name"><input className="input" value={data.contact.fullName} onChange={(e) => setContact({ fullName: e.target.value })} /></Field>
              <Field label="Professional title"><input className="input" placeholder="Senior Frontend Engineer" value={data.contact.title} onChange={(e) => setContact({ title: e.target.value })} /></Field>
              <Field label="Email"><input className="input" type="email" value={data.contact.email} onChange={(e) => setContact({ email: e.target.value })} /></Field>
              <Field label="Phone"><input className="input" value={data.contact.phone} onChange={(e) => setContact({ phone: e.target.value })} /></Field>
              <Field label="Location"><input className="input" placeholder="New York, NY" value={data.contact.location} onChange={(e) => setContact({ location: e.target.value })} /></Field>
              <Field label="Website"><input className="input" value={data.contact.website ?? ""} onChange={(e) => setContact({ website: e.target.value })} /></Field>
              <Field label="LinkedIn"><input className="input" placeholder="linkedin.com/in/…" value={data.contact.linkedin ?? ""} onChange={(e) => setContact({ linkedin: e.target.value })} /></Field>
              <Field label="GitHub"><input className="input" placeholder="github.com/…" value={data.contact.github ?? ""} onChange={(e) => setContact({ github: e.target.value })} /></Field>
              <Field label="Twitter / X"><input className="input" placeholder="@handle" value={(data.contact as any).twitter ?? ""} onChange={(e) => setContact({ twitter: e.target.value } as any)} /></Field>
            </Grid>
          </Section>

          {/* SUMMARY */}
          <Section
            id="summary" title="Professional Summary" icon="✶"
            right={
              <AIButton
                endpoint="/api/ai/generate-summary"
                payload={() => ({ resume: data })}
                onResult={(text) => setData((d) => ({ ...d, summary: text }))}
                label="✦ Generate with AI"
              />
            }
          >
            <textarea
              rows={4} className="input"
              placeholder="A 2–3 sentence pitch. Click ✦ to have Claude draft one from your experience."
              value={data.summary}
              onChange={(e) => setData((d) => ({ ...d, summary: e.target.value }))}
            />
            <p className="mt-1 text-right text-xs text-gray-400">{data.summary.length} chars</p>
          </Section>

          {/* EXPERIENCE */}
          <Section
            id="experience" title="Experience" icon="💼"
            right={
              <button className="btn-secondary" onClick={() =>
                setData((d) => ({ ...d, experience: [...d.experience, { id: uid(), company: "", role: "", location: "", startDate: "", endDate: "", current: false, bullets: [""] }] }))
              }>+ Add role</button>
            }
          >
            <div className="space-y-4">
              {data.experience.map((exp, idx) => (
                <div key={exp.id} className="rounded-xl border border-gray-200 bg-gray-50/50 p-4">
                  <Grid>
                    <Field label="Company"><input className="input" value={exp.company} onChange={(e) => updateExp(setData, idx, { company: e.target.value })} /></Field>
                    <Field label="Role / Title"><input className="input" value={exp.role} onChange={(e) => updateExp(setData, idx, { role: e.target.value })} /></Field>
                    <Field label="Location"><input className="input" value={exp.location ?? ""} onChange={(e) => updateExp(setData, idx, { location: e.target.value })} /></Field>
                    <Field label="Dates">
                      <div className="flex gap-2">
                        <input className="input" placeholder="Jan 2022" value={exp.startDate} onChange={(e) => updateExp(setData, idx, { startDate: e.target.value })} />
                        <input className="input" placeholder="Present" value={exp.endDate} disabled={exp.current} onChange={(e) => updateExp(setData, idx, { endDate: e.target.value })} />
                      </div>
                      <label className="mt-1 flex items-center gap-2 text-xs text-gray-500 cursor-pointer">
                        <input type="checkbox" checked={exp.current} onChange={(e) => updateExp(setData, idx, { current: e.target.checked, endDate: e.target.checked ? "Present" : "" })} />
                        Currently working here
                      </label>
                    </Field>
                  </Grid>
                  <div className="mt-3">
                    <label className="label">Bullets</label>
                    <div className="space-y-2">
                      {exp.bullets.map((b, bi) => (
                        <div key={bi} className="flex gap-2">
                          <textarea rows={2} className="input" value={b}
                            onChange={(e) => updateBullet(setData, idx, bi, e.target.value)}
                            placeholder="Led a 4-person team that shipped X, increasing Y by Z%." />
                          <div className="flex flex-col gap-1">
                            <AIButton tiny endpoint="/api/ai/improve-bullet"
                              payload={() => ({ bullet: b, role: exp.role, company: exp.company })}
                              onResult={(text) => updateBullet(setData, idx, bi, text)}
                              label="✦" title="Improve with AI" />
                            <button className="btn-icon text-red-400 hover:text-red-600 hover:bg-red-50"
                              onClick={() => removeBullet(setData, idx, bi)} title="Remove bullet">✕</button>
                          </div>
                        </div>
                      ))}
                      <button className="text-xs text-brand-600 hover:underline" onClick={() => addBullet(setData, idx)}>+ Add bullet</button>
                    </div>
                  </div>
                  <button className="mt-3 text-xs text-red-500 hover:text-red-700 hover:underline"
                    onClick={() => setData((d) => ({ ...d, experience: d.experience.filter((_, i) => i !== idx) }))}>
                    Remove role
                  </button>
                </div>
              ))}
              {data.experience.length === 0 && (
                <p className="text-sm text-gray-400">No roles yet. Click <strong>+ Add role</strong> to begin.</p>
              )}
            </div>
          </Section>

          {/* EDUCATION */}
          <Section
            id="education" title="Education" icon="🎓"
            right={
              <button className="btn-secondary" onClick={() =>
                setData((d) => ({ ...d, education: [...d.education, { id: uid(), school: "", degree: "", field: "", startDate: "", endDate: "", gpa: "" }] }))
              }>+ Add school</button>
            }
          >
            <div className="space-y-4">
              {data.education.map((ed, idx) => (
                <div key={ed.id} className="rounded-xl border border-gray-200 bg-gray-50/50 p-4">
                  <Grid>
                    <Field label="School"><input className="input" value={ed.school} onChange={(e) => updateEdu(setData, idx, { school: e.target.value })} /></Field>
                    <Field label="Degree"><input className="input" placeholder="B.Sc." value={ed.degree} onChange={(e) => updateEdu(setData, idx, { degree: e.target.value })} /></Field>
                    <Field label="Field of study"><input className="input" value={ed.field ?? ""} onChange={(e) => updateEdu(setData, idx, { field: e.target.value })} /></Field>
                    <Field label="GPA (optional)"><input className="input" placeholder="3.8 / 4.0" value={ed.gpa ?? ""} onChange={(e) => updateEdu(setData, idx, { gpa: e.target.value })} /></Field>
                    <Field label="Years">
                      <div className="flex gap-2">
                        <input className="input" placeholder="2018" value={ed.startDate ?? ""} onChange={(e) => updateEdu(setData, idx, { startDate: e.target.value })} />
                        <input className="input" placeholder="2022" value={ed.endDate ?? ""} onChange={(e) => updateEdu(setData, idx, { endDate: e.target.value })} />
                      </div>
                    </Field>
                  </Grid>
                  <button className="mt-3 text-xs text-red-500 hover:underline"
                    onClick={() => setData((d) => ({ ...d, education: d.education.filter((_, i) => i !== idx) }))}>
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </Section>

          {/* SKILLS */}
          <Section id="skills" title="Skills" icon="⚙">
            <SkillsEditor
              value={data.skills}
              onChange={(next) => setData((d) => ({ ...d, skills: next }))}
            />
          </Section>

          {/* PROJECTS */}
          <Section
            id="projects" title="Projects" icon="◇"
            right={
              <button className="btn-secondary" onClick={() =>
                setData((d) => ({ ...d, projects: [...d.projects, { id: uid(), name: "", link: "", tech: "", description: "" }] }))
              }>+ Add project</button>
            }
          >
            <div className="space-y-4">
              {data.projects.map((p, idx) => (
                <div key={p.id} className="rounded-xl border border-gray-200 bg-gray-50/50 p-4">
                  <Grid>
                    <Field label="Project name"><input className="input" value={p.name} onChange={(e) => updateProj(setData, idx, { name: e.target.value })} /></Field>
                    <Field label="Link (optional)"><input className="input" value={p.link ?? ""} onChange={(e) => updateProj(setData, idx, { link: e.target.value })} /></Field>
                    <Field label="Tech stack" ><input className="input" placeholder="React, Node, PostgreSQL" value={(p as any).tech ?? ""} onChange={(e) => updateProj(setData, idx, { tech: e.target.value } as any)} /></Field>
                  </Grid>
                  <div className="mt-3">
                    <Field label="Description">
                      <textarea rows={2} className="input" value={p.description} onChange={(e) => updateProj(setData, idx, { description: e.target.value })} />
                    </Field>
                  </div>
                  <button className="mt-2 text-xs text-red-500 hover:underline"
                    onClick={() => setData((d) => ({ ...d, projects: d.projects.filter((_, i) => i !== idx) }))}>
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </Section>

          {/* CERTIFICATIONS */}
          <Section id="certifications" title="Certifications" icon="🏅">
            <CertificationsEditor
              value={data.certifications ?? []}
              onChange={(v) => setData((d) => ({ ...d, certifications: v }))}
            />
          </Section>

          {/* LANGUAGES */}
          <Section id="languages" title="Languages" icon="🌐">
            <LanguagesEditor
              value={data.languages ?? []}
              onChange={(v) => setData((d) => ({ ...d, languages: v }))}
            />
          </Section>

          {/* AWARDS */}
          <Section id="awards" title="Awards & Achievements" icon="🏆">
            <AwardsEditor
              value={data.awards ?? []}
              onChange={(v) => setData((d) => ({ ...d, awards: v }))}
            />
          </Section>

          {/* CUSTOM SECTIONS */}
          <Section id="custom" title="Custom Sections" icon="＋">
            <p className="mb-3 text-sm text-gray-500">Add any section — volunteering, publications, interests, and more.</p>
            <CustomSectionsEditor
              value={data.customSections ?? []}
              onChange={(v) => setData((d) => ({ ...d, customSections: v }))}
            />
          </Section>

          {/* AI TOOLS */}
          <Section id="ai-tools" title="AI Tools" icon="✦">
            <p className="mb-3 text-sm text-gray-500">
              Paste a job description once, then use it for tailoring, ATS scoring, and a cover letter.
            </p>
            <textarea rows={5} className="input"
              placeholder="Paste the full job description here…"
              value={jd} onChange={(e) => setJd(e.target.value)} />
            <div className="mt-3 flex flex-wrap gap-2">
              <button className="btn-primary" disabled={tailoring || !jd.trim()} onClick={tailorToJob}>
                {tailoring ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                    Tailoring…
                  </span>
                ) : "✦ Tailor my resume"}
              </button>
            </div>

            <div className="mt-6 border-t border-gray-100 pt-5">
              <h3 className="text-sm font-semibold text-gray-900">ATS match score</h3>
              <AtsScorePanel data={data} jd={jd} />
            </div>

            <div className="mt-6 border-t border-gray-100 pt-5">
              <h3 className="text-sm font-semibold text-gray-900">Cover letter generator</h3>
              <CoverLetterPanel data={data} jd={jd} />
            </div>
          </Section>
        </div>

        {/* Live preview / Canvas editor */}
        <div className={`hidden lg:block shrink-0 ${
          isCanvasFullscreen && template === "custom"
            ? "lg:flex-1"             // take all remaining width when maximized
            : "lg:w-[420px]"          // narrow side panel otherwise
        }`}>
          <div className={`sticky top-40 overflow-hidden rounded-2xl border border-gray-200 shadow-card-lg ${
            isCanvasFullscreen && template === "custom"
              ? "h-[calc(100vh-9rem)]"
              : "h-[calc(100vh-12rem)]"
          }`}>
            {template === "custom" ? (
              <CustomTemplateEditor
                data={previewData}
                onChange={(layout: CustomLayout) => setData((d) => ({ ...d, customLayout: layout }))}
                onContactChange={(patch) => setData((d) => ({ ...d, contact: { ...d.contact, ...patch } }))}
                onSummaryChange={(text) => setData((d) => ({ ...d, summary: text }))}
                isFullscreen={isCanvasFullscreen}
                onFullscreenToggle={() => setIsCanvasFullscreen((v) => !v)}
              />
            ) : (
              <LivePreview data={previewData} template={template} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Sub-components ── */
function Section({
  id, title, icon, right, children,
}: {
  id: string; title: string; icon?: React.ReactNode;
  right?: React.ReactNode; children: React.ReactNode;
}) {
  return (
    <section id={`section-${id}`} className="card scroll-mt-40">
      <header className="section-header">
        <h2 className="section-title">
          {icon && <span className="section-icon">{icon}</span>}
          {title}
        </h2>
        {right}
      </header>
      {children}
    </section>
  );
}

function Grid({ children }: { children: React.ReactNode }) {
  return <div className="grid gap-3 sm:grid-cols-2">{children}</div>;
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="label">{label}</label>
      {children}
    </div>
  );
}

/* ── Helpers ── */
function updateExp(set: React.Dispatch<React.SetStateAction<ResumeData>>, idx: number, patch: any) {
  set((d) => ({ ...d, experience: d.experience.map((e, i) => (i === idx ? { ...e, ...patch } : e)) }));
}
function updateBullet(set: React.Dispatch<React.SetStateAction<ResumeData>>, idx: number, bi: number, text: string) {
  set((d) => ({ ...d, experience: d.experience.map((e, i) => i === idx ? { ...e, bullets: e.bullets.map((b, j) => j === bi ? text : b) } : e) }));
}
function addBullet(set: React.Dispatch<React.SetStateAction<ResumeData>>, idx: number) {
  set((d) => ({ ...d, experience: d.experience.map((e, i) => i === idx ? { ...e, bullets: [...e.bullets, ""] } : e) }));
}
function removeBullet(set: React.Dispatch<React.SetStateAction<ResumeData>>, idx: number, bi: number) {
  set((d) => ({ ...d, experience: d.experience.map((e, i) => i === idx ? { ...e, bullets: e.bullets.filter((_, j) => j !== bi) } : e) }));
}
function updateEdu(set: React.Dispatch<React.SetStateAction<ResumeData>>, idx: number, patch: any) {
  set((d) => ({ ...d, education: d.education.map((e, i) => (i === idx ? { ...e, ...patch } : e)) }));
}
function updateProj(set: React.Dispatch<React.SetStateAction<ResumeData>>, idx: number, patch: any) {
  set((d) => ({ ...d, projects: d.projects.map((e, i) => (i === idx ? { ...e, ...patch } : e)) }));
}
