import Link from "next/link";
import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Free AI Resume Builder and ATS Resume Checker",
  description:
    "Create an ATS-friendly resume for free with AI writing, job description tailoring, keyword suggestions, cover letters, and PDF or Word export.",
  alternates: {
    canonical: "/",
  },
};

export default function HomePage() {
  const softwareAppJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "JobDraftly",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url: absoluteUrl("/"),
    description:
      "A free AI resume builder with ATS resume checking, resume templates, job description tailoring, cover letters, and PDF or Word export.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  return (
    <>
      <SiteHeader />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppJsonLd) }}
      />
      <main className="bg-white">
        <section className="border-b border-gray-200 bg-[linear-gradient(180deg,#f8fbff_0%,#ffffff_78%)]">
          <div className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-6xl items-center gap-12 px-6 py-16 lg:grid-cols-[1fr_0.95fr] lg:py-20">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white px-4 py-1.5 text-xs font-semibold text-brand-700 shadow-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                Resume builder, ATS checker, cover letters, and job tailoring
              </div>

              <h1 className="mt-6 font-display text-5xl font-bold leading-[1.05] tracking-tight text-gray-950 md:text-7xl">
                Build a resume that is ready for real hiring systems.
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-600">
                JobDraftly combines clean ATS-safe templates, AI writing help, job description matching,
                cover-letter generation, Word/PDF exports, and expert review in one focused workspace.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link href="/signup" className="btn-primary-lg">
                  Start free
                  <span aria-hidden>{">"}</span>
                </Link>
                <Link href="#workflow" className="btn-secondary px-6 py-3 text-base">
                  See workflow
                </Link>
              </div>

              <div className="mt-8 grid max-w-2xl gap-3 sm:grid-cols-3">
                {TRUST_POINTS.map((item) => (
                  <div key={item} className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-700 shadow-sm">
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="rounded-[2rem] border border-gray-200 bg-white p-4 shadow-pop">
                <div className="rounded-3xl border border-gray-100 bg-slate-50 p-4">
                  <div className="flex items-center justify-between border-b border-gray-200 pb-3">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-brand-600">Live resume score</p>
                      <p className="mt-1 text-lg font-bold text-gray-950">Product Manager - Fintech</p>
                    </div>
                    <div className="grid h-16 w-16 place-items-center rounded-full border-4 border-emerald-500 bg-white text-lg font-bold text-emerald-700">
                      91
                    </div>
                  </div>

                  <div className="mt-4 grid gap-3">
                    {PREVIEW_ROWS.map((row) => (
                      <div key={row.label} className="rounded-2xl border border-gray-200 bg-white p-4">
                        <div className="flex items-center justify-between gap-3">
                          <p className="text-sm font-bold text-gray-900">{row.label}</p>
                          <span className={row.badgeClass}>{row.badge}</span>
                        </div>
                        <div className="mt-3 space-y-2">
                          <div className="h-2 rounded-full bg-gray-200" style={{ width: row.widthA }} />
                          <div className="h-2 rounded-full bg-gray-200" style={{ width: row.widthB }} />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 rounded-2xl bg-gray-950 p-4 text-white">
                    <p className="text-sm font-bold">Job match insight</p>
                    <p className="mt-1 text-sm leading-6 text-gray-300">
                      Add "pricing strategy", "SQL", and "stakeholder management" to improve this resume for the pasted job description.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="workflow" className="py-20">
          <div className="mx-auto max-w-6xl px-6">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-widest text-brand-600">Resume builder workflow</p>
              <h2 className="mt-3 font-display text-4xl font-bold text-gray-950">
                AI resume writing, ATS checking, and job-specific tailoring in one flow.
              </h2>
              <p className="mt-4 text-gray-600">
                Build a resume from an ATS-safe template, improve each section with AI, compare it with a job description,
                generate a matching cover letter, and export a clean PDF or Word file when you are ready to apply.
              </p>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {FEATURES.map((feature) => (
                <div key={feature.title} className="feature-card">
                  <div className="mb-4 inline-flex rounded-lg bg-brand-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-brand-700">
                    {feature.tag}
                  </div>
                  <h3 className="text-lg font-bold text-gray-950">{feature.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-gray-600">{feature.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="templates" className="border-y border-gray-200 bg-slate-50 py-20">
          <div className="mx-auto max-w-6xl px-6">
            <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-brand-600">Templates</p>
                <h2 className="mt-3 font-display text-4xl font-bold text-gray-950">
                  ATS-safe formats with room for personality.
                </h2>
              </div>
              <Link href="/signup" className="btn-secondary">
                Try a template
              </Link>
            </div>

            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {TEMPLATES.map((template) => (
                <Link href="/signup" key={template.name} className="template-card group bg-white">
                  <div className="aspect-[3/4] bg-white p-5">
                    <div className={`h-4 w-2/3 rounded ${template.accent}`} />
                    <div className="mt-2 h-2 w-1/2 rounded bg-gray-200" />
                    <div className="mt-6 space-y-2">
                      <div className="h-2 rounded bg-gray-200" />
                      <div className="h-2 w-5/6 rounded bg-gray-200" />
                      <div className="h-2 w-4/6 rounded bg-gray-200" />
                    </div>
                    <div className="mt-8 grid grid-cols-[1fr_0.55fr] gap-3">
                      <div className="space-y-2">
                        <div className={`h-3 w-3/4 rounded ${template.accent}`} />
                        <div className="h-2 rounded bg-gray-200" />
                        <div className="h-2 w-5/6 rounded bg-gray-200" />
                        <div className="h-2 w-4/6 rounded bg-gray-200" />
                      </div>
                      <div className="space-y-2">
                        <div className="h-2 rounded bg-gray-300" />
                        <div className="h-2 rounded bg-gray-200" />
                        <div className="h-2 rounded bg-gray-200" />
                      </div>
                    </div>
                  </div>
                  <div className="border-t border-gray-100 p-4">
                    <h3 className="font-bold text-gray-950">{template.name}</h3>
                    <p className="mt-1 text-xs leading-5 text-gray-500">{template.body}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid gap-10 lg:grid-cols-[0.8fr_1fr] lg:items-center">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-brand-600">Why JobDraftly</p>
                <h2 className="mt-3 font-display text-4xl font-bold text-gray-950">
                  Built for applying, not just designing.
                </h2>
                <p className="mt-4 leading-7 text-gray-600">
                  Design-forward tools are great for visual resumes. Serious job applications need parsable structure,
                  role-specific keywords, quantified bullets, fast exports, and a repeatable way to tailor each version.
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {OUTCOMES.map((outcome) => (
                  <div key={outcome.title} className="rounded-2xl border border-gray-200 bg-white p-5 shadow-card">
                    <p className="text-2xl font-bold text-brand-600">{outcome.metric}</p>
                    <h3 className="mt-2 font-bold text-gray-950">{outcome.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-gray-600">{outcome.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 pb-20">
          <div className="mx-auto max-w-5xl rounded-[2rem] bg-gray-950 px-6 py-12 text-center text-white shadow-pop md:px-12">
            <h2 className="font-display text-4xl font-bold">Create your strongest resume version today.</h2>
            <p className="mx-auto mt-4 max-w-2xl text-gray-300">
              Start free, paste a job description, improve the match score, generate a cover letter, and export a clean PDF or Word file.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link href="/signup" className="rounded-xl bg-white px-6 py-3 text-sm font-bold text-gray-950 transition hover:bg-gray-100">
                Build my resume
              </Link>
              <Link href="/templates" className="rounded-xl border border-white/20 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/10">
                Browse templates
              </Link>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t border-gray-200 bg-white px-6 py-10">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 text-sm text-gray-500 md:flex-row md:items-center md:justify-between">
          <Link href="/" className="font-display font-bold text-gray-950">JobDraftly</Link>
          <nav className="flex flex-wrap gap-5">
            <Link href="/#workflow" className="hover:text-gray-950">Features</Link>
            <Link href="/#templates" className="hover:text-gray-950">Templates</Link>
            <Link href="/review" className="hover:text-gray-950">Expert Review</Link>
          </nav>
          <p>(c) {new Date().getFullYear()} JobDraftly.</p>
        </div>
      </footer>
    </>
  );
}

const TRUST_POINTS = [
  "ATS-friendly exports",
  "Job-specific tailoring",
  "PDF and Word download",
];

const PREVIEW_ROWS = [
  { label: "Summary", badge: "AI polished", badgeClass: "badge-brand", widthA: "92%", widthB: "76%" },
  { label: "Experience", badge: "Quantified", badgeClass: "badge-green", widthA: "86%", widthB: "68%" },
  { label: "Keywords", badge: "3 gaps", badgeClass: "badge-amber", widthA: "72%", widthB: "58%" },
];

const FEATURES = [
  {
    tag: "AI writer",
    title: "Human-sounding summaries and bullets",
    body: "Generate summaries, improve bullets, and polish the full resume while keeping the user in control.",
  },
  {
    tag: "ATS score",
    title: "Match scoring before every application",
    body: "Paste a job description and see strengths, gaps, and missing keywords before sending the resume.",
  },
  {
    tag: "Tailoring",
    title: "One resume can become many targeted versions",
    body: "Rewrite the resume toward the role, seniority, and language of each job description.",
  },
  {
    tag: "Cover letters",
    title: "Generate letters from the same context",
    body: "Create a cover letter that matches the resume and role instead of starting from a blank page.",
  },
  {
    tag: "Templates",
    title: "Modern, classic, compact, and custom layouts",
    body: "Use structured templates for ATS safety or switch to the custom canvas for visual control.",
  },
  {
    tag: "Review",
    title: "Expert help when stakes are high",
    body: "Offer a paid recruiter review path for candidates who want human feedback and rewrite support.",
  },
];

const TEMPLATES = [
  { name: "Modern", body: "Clean accent layout for most business and tech roles.", accent: "bg-brand-600" },
  { name: "Classic", body: "Traditional structure for conservative industries.", accent: "bg-gray-800" },
  { name: "Compact", body: "Dense format for experienced candidates who need space.", accent: "bg-emerald-700" },
  { name: "Custom", body: "Canvas-based editor for full control over blocks and visuals.", accent: "bg-purple-700" },
];

const OUTCOMES = [
  {
    metric: "0-100",
    title: "ATS match score",
    body: "A clear score makes resume improvement feel concrete instead of vague.",
  },
  {
    metric: "1 JD",
    title: "Shared job context",
    body: "The same pasted job description powers tailoring, scoring, keywords, and cover letters.",
  },
  {
    metric: "2 files",
    title: "PDF and Word export",
    body: "Users can send a polished PDF or an editable Word file depending on the employer.",
  },
  {
    metric: "4 modes",
    title: "Template flexibility",
    body: "Modern, classic, compact, and custom modes cover practical candidate needs.",
  },
];
