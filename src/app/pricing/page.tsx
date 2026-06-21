import Link from "next/link";
import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { UpgradeButton } from "./UpgradeButton";
import { BILLING_ENABLED } from "@/lib/config";
import { absoluteUrl, SITE_DESCRIPTION, SITE_NAME } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Free AI Resume Builder Pricing",
  description:
    "Start using JobDraftly for free during early access. Build resumes, tailor them to job descriptions, check ATS match, and export PDF or Word files.",
  alternates: {
    canonical: absoluteUrl("/pricing"),
  },
  openGraph: {
    title: "Free AI Resume Builder Pricing",
    description:
      "Start using JobDraftly for free during early access. Build resumes, tailor them to job descriptions, check ATS match, and export PDF or Word files.",
    url: absoluteUrl("/pricing"),
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free AI Resume Builder Pricing",
    description:
      "Start using JobDraftly for free during early access. Build resumes, tailor them to job descriptions, check ATS match, and export PDF or Word files.",
  },
};

export default function PricingPage() {
  const softwareAppJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: SITE_NAME,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url: absoluteUrl("/pricing"),
    description: SITE_DESCRIPTION,
    offers: {
      "@type": "Offer",
      price: BILLING_ENABLED ? "9" : "0",
      priceCurrency: "USD",
    },
  };

  // Early-access mode: no paid plans shown - everything is free.
  if (!BILLING_ENABLED) {
    return (
      <>
        <SiteHeader />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppJsonLd) }} />
        <main className="hero-mesh pb-24">
          <div className="mx-auto max-w-2xl px-6 py-24 text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-xs font-semibold text-emerald-700">
              Early access - everything free
            </span>
            <h1 className="mt-5 font-display text-5xl font-bold text-gray-900">
              It&apos;s all free right now.
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-gray-500">
              JobDraftly is in early access. Every feature - unlimited resumes, AI tailoring,
              cover letters, ATS scoring, all templates - is completely free while we grow.
              No card, no catch.
            </p>
            <Link
              href="/signup"
              className="mt-8 inline-block rounded-2xl bg-brand-600 px-8 py-3.5 text-sm font-bold text-white shadow transition hover:bg-brand-700"
            >
              Get started free
            </Link>
            <ul className="mx-auto mt-12 grid max-w-md gap-3 text-left text-sm text-gray-700">
              {[
                "Unlimited resumes & AI generations",
                "Job description tailoring + cover letters",
                "ATS match scoring",
                "All templates, including the custom canvas",
                "PDF & Word export",
              ].map((f) => (
                <li key={f} className="flex items-start gap-2.5">
                  <span className="mt-0.5 shrink-0 text-emerald-500">{"\u2713"}</span>
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <SiteHeader />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppJsonLd) }} />
      <main className="hero-mesh pb-24">
        {/* Header */}
        <div className="py-20 text-center px-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-4 py-1.5 text-xs font-semibold text-brand-700">
            Transparent pricing
          </span>
          <h1 className="mt-5 font-display text-5xl font-bold text-gray-900">
            Simple, honest pricing.
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-gray-500">
            Start free. Upgrade when you&apos;re ready to apply seriously. No hidden fees, cancel any time.
          </p>
        </div>

        {/* Plans */}
        <div className="mx-auto max-w-5xl px-6">
          <div className="grid gap-6 md:grid-cols-3">
            {PLANS.map((p) => (
              <div
                key={p.name}
                className={`relative flex flex-col rounded-3xl border p-7 transition-all ${
                  p.featured
                    ? "border-brand-400 bg-white shadow-pop"
                    : "border-gray-200 bg-white shadow-card hover:shadow-card-lg"
                }`}
              >
                {p.featured && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="rounded-full bg-gradient-to-r from-brand-600 to-purple-600 px-4 py-1 text-xs font-bold text-white shadow-md">
                      Most popular
                    </span>
                  </div>
                )}

                <div>
                  <h2 className="text-xl font-bold text-gray-900">{p.name}</h2>
                  <p className="mt-1 text-sm text-gray-500">{p.tagline}</p>
                </div>

                <div className="mt-5 flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-gray-900">{p.price}</span>
                  <span className="text-sm text-gray-400">{p.period}</span>
                </div>

                <ul className="mt-6 flex-1 space-y-3 text-sm">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-gray-700">
                      <span className="mt-0.5 shrink-0 text-brand-500">{"\u2713"}</span>
                      {f}
                    </li>
                  ))}
                </ul>

                {p.id === "pro" ? (
                  <div className="mt-8">
                    <UpgradeButton
                      label={p.cta.label}
                      className="block w-full rounded-2xl bg-brand-600 py-3 text-center text-sm font-bold text-white shadow transition hover:bg-brand-700 disabled:opacity-60"
                    />
                  </div>
                ) : (
                  <Link
                    href={p.cta.href}
                    className={`mt-8 block rounded-2xl py-3 text-center text-sm font-bold transition ${
                      p.featured
                        ? "bg-brand-600 text-white shadow hover:bg-brand-700"
                        : "border border-gray-300 text-gray-800 hover:bg-gray-50"
                    }`}
                  >
                    {p.cta.label}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Comparison note */}
          <p className="mt-10 text-center text-sm text-gray-400">
            All plans include ATS-safe PDF export - Powered by Claude - Cancel any time
          </p>

          {/* FAQ */}
          <div className="mt-16">
            <h2 className="text-center font-display text-3xl font-bold text-gray-900 mb-8">Pricing FAQ</h2>
            <dl className="space-y-3 max-w-2xl mx-auto">
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
        </div>
      </main>
    </>
  );
}

const PLANS = [
  {
    id: "free",
    name: "Free",
    tagline: "Perfect for getting started",
    price: "$0",
    period: "/forever",
    features: [
      "1 resume",
      "10 AI generations / month",
      "All 4 templates",
      "ATS scoring",
      "PDF download",
    ],
    cta: { label: "Get started free", href: "/signup" },
    featured: false,
  },
  {
    id: "pro",
    name: "Pro",
    tagline: "For serious job seekers",
    price: "$9",
    period: "/month",
    features: [
      "Unlimited resumes",
      "Unlimited AI generation",
      "Job description tailoring",
      "Cover letter generator",
      "Certifications, Languages & Awards sections",
      "Priority PDF export",
      "Custom sections",
    ],
    cta: { label: "Start 7-day free trial", href: "/signup?plan=pro" },
    featured: true,
  },
  {
    id: "review",
    name: "Expert Review",
    tagline: "Human expert feedback",
    price: "$49",
    period: "/review",
    features: [
      "Senior recruiter reviews your resume",
      "48-hour turnaround",
      "Inline notes + rewritten sections",
      "Industry-specific advice",
      "Works with any plan",
    ],
    cta: { label: "Request a review", href: "/review" },
    featured: false,
  },
];

const FAQ = [
  { q: "Can I cancel my Pro subscription any time?", a: "Yes. Cancel from your dashboard settings. You keep Pro access until the end of your billing period." },
  { q: "Does the free plan ever expire?", a: "No - the free tier is free forever. You keep your 1 resume and 10 monthly AI generations as long as you have an account." },
  { q: "What payment methods are accepted?", a: "All major credit and debit cards via Stripe. We never store your card details." },
  { q: "Is my data safe?", a: "Yes. All resume data is stored with row-level security on Supabase. We never sell or share your information." },
];
