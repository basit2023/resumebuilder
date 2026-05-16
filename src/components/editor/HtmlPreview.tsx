"use client";
import type { ResumeData, TemplateId } from "@/lib/types";

export function HtmlPreview({ data, template }: { data: ResumeData; template: TemplateId }) {
  // We'll create a simple, high-fidelity HTML preview that mimics the PDF layouts
  const { contact, summary, experience, education, skills, projects, certifications, languages, awards, customSections } = data;

  return (
    <div className="h-full w-full overflow-auto bg-gray-200 p-4 pb-20 scrollbar-hide">
      <div 
        className="mx-auto bg-white shadow-2xl transition-all duration-300"
        style={{ 
          width: "210mm", 
          minHeight: "297mm", 
          padding: "15mm",
          fontSize: "11pt",
          lineHeight: "1.5",
          color: "#333",
          fontFamily: "'Inter', sans-serif"
        }}
      >
        {/* Header */}
        <header className="mb-6 border-b-2 pb-4" style={{ borderColor: data.themeColor || "#2563eb" }}>
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">{contact.fullName || "Your Name"}</h1>
          <p className="text-lg font-medium" style={{ color: data.themeColor || "#2563eb" }}>{contact.title || "Professional Title"}</p>
          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-600">
            {contact.email && <span>{contact.email}</span>}
            {contact.phone && <span>{contact.phone}</span>}
            {contact.location && <span>{contact.location}</span>}
            {contact.website && <span className="underline">{contact.website}</span>}
            {contact.linkedin && <span>LinkedIn</span>}
          </div>
        </header>

        {/* Summary */}
        {summary && (
          <section className="mb-6">
            <h2 className="mb-2 text-sm font-bold uppercase tracking-wider text-gray-500">Professional Summary</h2>
            <p className="text-sm leading-relaxed">{summary}</p>
          </section>
        )}

        {/* Experience */}
        <section className="mb-6">
          <h2 className="mb-2 text-sm font-bold uppercase tracking-wider text-gray-500">Experience</h2>
          <div className="space-y-4">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between font-bold text-gray-800">
                  <span>{exp.role}</span>
                  <span className="text-sm font-normal text-gray-500">{exp.startDate} — {exp.current ? "Present" : exp.endDate}</span>
                </div>
                <div className="text-sm font-semibold text-gray-600">{exp.company} {exp.location && `· ${exp.location}`}</div>
                <ul className="mt-2 list-disc pl-4 text-sm space-y-1">
                  {exp.bullets.map((b, i) => b && <li key={i}>{b}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Education */}
        <section className="mb-6">
          <h2 className="mb-2 text-sm font-bold uppercase tracking-wider text-gray-500">Education</h2>
          <div className="space-y-3">
            {education.map((ed) => (
              <div key={ed.id}>
                <div className="flex justify-between font-bold text-gray-800">
                  <span>{ed.school}</span>
                  <span className="text-sm font-normal text-gray-500">{ed.startDate} — {ed.endDate}</span>
                </div>
                <div className="text-sm">{ed.degree} in {ed.field} {ed.gpa && `· GPA: ${ed.gpa}`}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Skills */}
        <section className="mb-6">
          <h2 className="mb-2 text-sm font-bold uppercase tracking-wider text-gray-500">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((s, i) => (
              <span key={i} className="rounded border border-gray-200 bg-gray-50 px-2 py-1 text-xs font-medium text-gray-700">
                {s.name}{s.level ? ` · ${"●".repeat(s.level)}${"○".repeat(5 - s.level)}` : ""}
              </span>
            ))}
          </div>
        </section>

        {/* Extra Sections... */}
        {(certifications?.length ?? 0) > 0 && (
          <section className="mb-6">
            <h2 className="mb-2 text-sm font-bold uppercase tracking-wider text-gray-500">Certifications</h2>
            <ul className="list-disc pl-4 text-sm space-y-1">
              {certifications.map((c) => (
                <li key={c.id}>
                  <span className="font-semibold">{c.name}</span> — {c.issuer} ({c.date})
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
}
