import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";

export const dynamic = "force-dynamic";

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        {/* ── HERO ────────────────────────────────── */}
        <section className="relative overflow-hidden hero-mesh">
          {/* Decorative blobs */}
          <div className="pointer-events-none absolute -left-40 top-10 h-96 w-96 rounded-full bg-brand-300/20 blur-3xl" />
          <div className="pointer-events-none absolute -right-40 top-20 h-96 w-96 rounded-full bg-purple-300/20 blur-3xl" />
          <div className="pointer-events-none absolute bottom-0 left-1/2 h-64 w-[600px] -translate-x-1/2 rounded-full bg-brand-200/20 blur-3xl" />

          <div className="mx-auto max-w-6xl px-6 py-24 text-center">
            {/* Badge */}
            <div className="inline-flex animate-fade-in items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-4 py-1.5 text-xs font-semibold text-brand-700">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-500 animate-pulse" />
              Powered by Claude — interview-ready in minutes
            </div>

            {/* Heading */}
            <h1 className="mt-7 font-display text-5xl font-bold leading-[1.1] tracking-tight md:text-7xl animate-slide-up">
              Land your dream job<br />
              with an{" "}
              <span className="text-gradient">AI-crafted</span> resume.
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600 animate-slide-up [animation-delay:80ms]">
              Build a beautiful, ATS-friendly resume with AI. Tailor it to any job in seconds.
              Score your match. Generate a cover letter. Get expert human review when you need it.
            </p>

            {/* CTAs */}
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3 animate-slide-up [animation-delay:160ms]">
              <Link href="/signup" className="btn-primary-lg">
                Build my resume — free
                <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
              <Link href="#templates" className="btn-secondary px-6 py-3 text-base rounded-2xl">
                See templates
              </Link>
            </div>

            <p className="mt-4 text-xs text-gray-400 animate-fade-in [animation-delay:300ms]">
              No credit card required · Free forever plan · Download PDF instantly
            </p>

            {/* Stats strip */}
            <div className="mt-16 grid grid-cols-2 gap-6 md:grid-cols-4 animate-fade-in [animation-delay:400ms]">
              {STATS.map((s) => (
                <div key={s.label} className="rounded-2xl border border-gray-200/80 bg-white/70 p-5 backdrop-blur-sm shadow-sm">
                  <p className="text-3xl font-bold text-gradient">{s.value}</p>
                  <p className="mt-1 text-xs font-medium uppercase tracking-wider text-gray-500">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── HOW IT WORKS ──────────────────────── */}
        <section className="py-24 bg-white">
          <div className="mx-auto max-w-5xl px-6">
            <p className="text-center text-xs font-semibold uppercase tracking-widest text-brand-600 mb-3">Simple process</p>
            <h2 className="text-center font-display text-4xl font-bold text-gray-900">
              From blank page to hired — in 3 steps
            </h2>
            <div className="mt-14 grid gap-8 md:grid-cols-3">
              {HOW_STEPS.map((step, i) => (
                <div key={step.title} className="relative text-center">
                  {i < HOW_STEPS.length - 1 && (
                    <div className="absolute left-[calc(50%+3rem)] top-8 hidden h-px w-[calc(100%-3rem)] border-t-2 border-dashed border-gray-200 md:block" />
                  )}
                  <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 text-2xl shadow-glow-lg">
                    {step.icon}
                  </div>
                  <div className="mx-auto mt-2 flex h-6 w-6 items-center justify-center rounded-full bg-brand-600 text-[11px] font-bold text-white">
                    {i + 1}
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-gray-900">{step.title}</h3>
                  <p className="mt-2 text-sm text-gray-500 leading-relaxed">{step.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FEATURES ──────────────────────────── */}
        <section id="features" className="py-24 bg-slate-50">
          <div className="mx-auto max-w-6xl px-6">
            <p className="text-center text-xs font-semibold uppercase tracking-widest text-brand-600 mb-3">All-in-one toolkit</p>
            <h2 className="text-center font-display text-4xl font-bold text-gray-900">
              Everything you need to get hired
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-gray-500">
              AI resume builder, ATS scorer, cover-letter writer, and on-demand human review — all in one beautiful tool.
            </p>
            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {FEATURES.map((f) => (
                <div key={f.title} className="feature-card group">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-50 to-brand-100 text-2xl shadow-sm transition-transform group-hover:scale-110">
                    {f.icon}
                  </div>
                  <h3 className="mt-4 text-[15px] font-semibold text-gray-900">{f.title}</h3>
                  <p className="mt-2 text-sm text-gray-500 leading-relaxed">{f.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── TEMPLATES ─────────────────────────── */}
        <section id="templates" className="py-24 bg-white">
          <div className="mx-auto max-w-6xl px-6">
            <p className="text-center text-xs font-semibold uppercase tracking-widest text-brand-600 mb-3">Templates</p>
            <h2 className="text-center font-display text-4xl font-bold text-gray-900">
              Pick a template. Or design your own.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-center text-gray-500">
              Four ATS-friendly templates ship out of the box. Or jump into our drag-and-drop canvas and lay out every block yourself.
            </p>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {TEMPLATES.map((t) => (
                <Link href="/signup" key={t.name} className="template-card group">
                  {/* Preview area */}
                  <div className={`flex h-52 flex-col gap-2 p-4 ${t.bg}`}>
                    <div className={`h-3 w-2/3 rounded-full ${t.barColor} opacity-80`} />
                    <div className={`h-2 w-1/2 rounded-full ${t.barColor} opacity-50`} />
                    <div className="mt-2 space-y-1.5">
                      <div className={`h-1.5 w-full rounded-full ${t.barColor} opacity-30`} />
                      <div className={`h-1.5 w-4/5 rounded-full ${t.barColor} opacity-30`} />
                      <div className={`h-1.5 w-3/4 rounded-full ${t.barColor} opacity-30`} />
                    </div>
                    <div className="mt-auto flex items-center justify-between">
                      <span className={`text-xs font-semibold uppercase tracking-widest ${t.labelColor} opacity-70`}>{t.tag}</span>
                      <span className={`rounded-lg px-2 py-0.5 text-xs font-bold ${t.badgeBg} ${t.labelColor} opacity-0 transition group-hover:opacity-100`}>
                        Use this →
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900">{t.name}</h3>
                    <p className="mt-1 text-xs text-gray-500">{t.body}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── TESTIMONIALS ──────────────────────── */}
        <section className="py-24 bg-slate-50">
          <div className="mx-auto max-w-6xl px-6">
            <p className="text-center text-xs font-semibold uppercase tracking-widest text-brand-600 mb-3">Social proof</p>
            <h2 className="text-center font-display text-4xl font-bold text-gray-900">Loved by job seekers</h2>
            <p className="mx-auto mt-4 max-w-xl text-center text-gray-500">
              Thousands of people have landed interviews at top companies using ResumeForge.
            </p>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {TESTIMONIALS.map((t) => (
                <figure key={t.name} className="card-hover flex flex-col">
                  <div className="flex items-center gap-0.5 text-amber-400" aria-hidden>
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="h-4 w-4 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                    ))}
                  </div>
                  <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-gray-700">
                    "{t.quote}"
                  </blockquote>
                  <figcaption className="mt-5 flex items-center gap-3 border-t border-gray-100 pt-4">
                    <div className={`grid h-10 w-10 place-items-center rounded-full text-sm font-bold text-white ${t.bg}`}>
                      {t.initials}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-gray-900">{t.name}</div>
                      <div className="text-xs text-gray-500">{t.role}</div>
                    </div>
                    <span className="ml-auto rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700 ring-1 ring-emerald-100">
                      Hired ✓
                    </span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ───────────────────────────────── */}
        <section className="py-24 bg-white">
          <div className="mx-auto max-w-3xl px-6">
            <p className="text-center text-xs font-semibold uppercase tracking-widest text-brand-600 mb-3">FAQ</p>
            <h2 className="text-center font-display text-4xl font-bold text-gray-900">Common questions</h2>
            <dl className="mt-10 space-y-3">
              {FAQ.map((f) => (
                <details key={f.q} className="accordion">
                  <summary>
                    {f.q}
                    <svg className="h-5 w-5 text-gray-400 transition-transform duration-300 [[open]_&]:rotate-45" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                  </summary>
                  <div className="accordion-body">{f.a}</div>
                </details>
              ))}
            </dl>
          </div>
        </section>

        {/* ── CTA BANNER ────────────────────────── */}
        <section className="py-24 px-6">
          <div className="mx-auto max-w-4xl rounded-3xl bg-gradient-to-br from-brand-600 via-brand-700 to-purple-700 p-12 text-center text-white shadow-2xl">
            <h2 className="font-display text-4xl font-bold">
              Your next interview starts here.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-brand-100">
              Build it yourself with AI, or hand it to a senior recruiter for a 48-hour professional rewrite.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link href="/signup" className="rounded-2xl bg-white px-8 py-3.5 text-sm font-bold text-brand-700 shadow-lg transition hover:shadow-xl hover:-translate-y-0.5">
                Start free — no card needed
              </Link>
              <Link href="/pricing" className="rounded-2xl border border-white/30 px-8 py-3.5 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/10">
                See pricing
              </Link>
            </div>
            <p className="mt-5 text-xs text-brand-200">
              Join 10,000+ job seekers who already landed interviews
            </p>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-gray-100 bg-white py-12 px-6">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col items-center gap-4 md:flex-row md:justify-between">
            <div className="flex items-center gap-2">
              <span className="grid h-7 w-7 place-items-center rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 text-xs font-bold text-white">R</span>
              <span className="font-display text-sm font-bold text-gray-900">ResumeForge</span>
            </div>
            <nav className="flex flex-wrap justify-center gap-6 text-sm text-gray-500">
              <Link href="/#features" className="hover:text-gray-900 transition-colors">Features</Link>
              <Link href="/#templates" className="hover:text-gray-900 transition-colors">Templates</Link>
              <Link href="/pricing" className="hover:text-gray-900 transition-colors">Pricing</Link>
              <Link href="/review" className="hover:text-gray-900 transition-colors">Expert Review</Link>
              <Link href="/login" className="hover:text-gray-900 transition-colors">Sign in</Link>
            </nav>
            <p className="text-xs text-gray-400">© {new Date().getFullYear()} ResumeForge. Built with Claude.</p>
          </div>
        </div>
      </footer>
    </>
  );
}

/* ── DATA ────────────────────────────────── */
const STATS = [
  { value: "10k+", label: "Resumes built" },
  { value: "92%",  label: "Interview rate" },
  { value: "<60s", label: "Avg. tailor time" },
  { value: "4.9★", label: "User rating" },
];

const HOW_STEPS = [
  { icon: "✍️", title: "Fill in your details", body: "Enter your experience, education, and skills. Our smart form guides you section by section." },
  { icon: "✦",  title: "Let AI polish it", body: "Click to generate a summary, improve bullets, and tailor every section to a job description." },
  { icon: "📄", title: "Download & apply", body: "Export a pixel-perfect, ATS-safe PDF in seconds. One click, ready to send." },
];

const FEATURES = [
  { icon: "✦",  title: "AI writing that sounds human", body: "Generate quantified bullets and summaries with Claude. You stay in control of voice and tone." },
  { icon: "🎯", title: "Tailor to any job in 1 click", body: "Paste a job description. We rewrite your resume to match the role's keywords and seniority." },
  { icon: "📊", title: "ATS match score", body: "Get a 0-100 score, strengths, gaps, and missing keywords — before you hit Apply." },
  { icon: "✉️", title: "Cover letter generator", body: "Pick a tone, paste the JD, and get a cover letter that won't read like ChatGPT homework." },
  { icon: "🎨", title: "Drag-and-drop canvas", body: "Prefer pixel control? Lay out every section yourself with our Canva-style editor." },
  { icon: "🏆", title: "Certifications & Awards", body: "Showcase certs, languages, volunteer work, and achievements — all in your custom sections." },
  { icon: "🔒", title: "Privacy-first & secure", body: "Row-level security on Supabase. Your data is yours — export or delete any time." },
  { icon: "👤", title: "Expert human review", body: "Add on a senior recruiter review. 48-hour turnaround with tracked changes and notes." },
  { icon: "📱", title: "Beautiful on any device", body: "Edit on mobile, preview on desktop. Everything syncs instantly with autosave." },
];

const TEMPLATES = [
  {
    name: "Modern",
    tag: "Bold · Accent",
    body: "Clean grid with skill chips and a colored accent. The most popular pick.",
    bg: "bg-gradient-to-br from-brand-100 to-brand-50",
    barColor: "bg-brand-600",
    labelColor: "text-brand-700",
    badgeBg: "bg-brand-100",
  },
  {
    name: "Classic",
    tag: "Serif · Centered",
    body: "Traditional layout with serif typography. Great for conservative industries.",
    bg: "bg-gradient-to-br from-gray-200 to-gray-50",
    barColor: "bg-gray-600",
    labelColor: "text-gray-700",
    badgeBg: "bg-gray-100",
  },
  {
    name: "Compact",
    tag: "Dense · Two-col",
    body: "Fits more on one page. Ideal for senior roles with deep experience.",
    bg: "bg-gradient-to-br from-emerald-100 to-emerald-50",
    barColor: "bg-emerald-700",
    labelColor: "text-emerald-800",
    badgeBg: "bg-emerald-100",
  },
  {
    name: "Custom",
    tag: "Drag & drop",
    body: "Free-form canvas. Place every block exactly where you want it.",
    bg: "bg-gradient-to-br from-purple-100 to-pink-50",
    barColor: "bg-purple-600",
    labelColor: "text-purple-800",
    badgeBg: "bg-purple-100",
  },
];

const TESTIMONIALS = [
  {
    name: "Aisha R.",
    role: "Software Engineer · hired at Stripe",
    initials: "AR",
    bg: "bg-brand-600",
    quote: "I tailored my resume to three roles in one evening. Got an interview within 48 hours. The ATS score is brutally honest — which is exactly what you want.",
  },
  {
    name: "Marco L.",
    role: "Product Manager · hired at Figma",
    initials: "ML",
    bg: "bg-emerald-600",
    quote: "The cover letter generator alone saved me a weekend. It actually understands what's on the resume and weaves it in naturally.",
  },
  {
    name: "Priya N.",
    role: "Designer · hired at Notion",
    initials: "PN",
    bg: "bg-purple-600",
    quote: "I'm a designer so the drag-and-drop canvas sold me. I could land every section to the millimeter. PDF export was pixel-perfect.",
  },
];

const FAQ = [
  { q: "Is my resume ATS-friendly?", a: "Yes. All four templates export to a single-column-readable PDF with selectable text — what every major ATS parses. The ATS score panel also flags keyword gaps before you apply." },
  { q: "Does the AI actually understand my experience?", a: "We send your resume + the job description to Claude (Anthropic's flagship model) and ask it to rewrite truthfully — never to fabricate. You can always edit before exporting." },
  { q: "What's included in the free plan?", a: "1 resume, 10 AI generations per month, all templates, full PDF download, and ATS scoring. Upgrade to Pro ($9/mo) for unlimited resumes and AI calls." },
  { q: "Can I cancel any time?", a: "Yes. Subscriptions are month-to-month via Stripe. Cancel from your dashboard and you keep access until the current period ends." },
  { q: "Who reviews my resume in the expert plan?", a: "Senior recruiters with 5+ years of hiring experience in your industry. Turnaround is 48 hours. You get inline notes and fully rewritten sections." },
  { q: "What sections can I add to my resume?", a: "Contact, Summary, Experience, Education, Skills, Projects, Certifications, Languages, Awards & Achievements — plus fully custom sections you can name yourself." },
];
