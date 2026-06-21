import Link from "next/link";
import { absoluteUrl, SITE_NAME } from "@/lib/seo";
import type { LandingPage } from "@/lib/landingPages";

export function SeoLandingPage({ page, canonicalPath }: { page: LandingPage; canonicalPath?: string }) {
  const path = canonicalPath ?? `/${page.slug}`;
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: page.faq.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  const appJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: SITE_NAME,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url: absoluteUrl(path),
    description: page.description,
    featureList: page.benefits,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(appJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <main className="bg-white">
        <section className="border-b border-gray-200 bg-[linear-gradient(180deg,#f8fbff_0%,#ffffff_82%)]">
          <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 lg:grid-cols-[1fr_0.8fr] lg:py-20">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-brand-600">{page.eyebrow}</p>
              <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-gray-950 md:text-6xl">
                {page.h1}
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-gray-600">{page.intro}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href={`/signup?next=${encodeURIComponent(path)}`} className="btn-primary-lg">
                  {page.cta}
                </Link>
                <Link href="/templates" className="btn-secondary px-6 py-3 text-base">
                  Browse templates
                </Link>
              </div>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-card">
              <h2 className="font-display text-2xl font-bold text-gray-950">What you can improve</h2>
              <ul className="mt-5 grid gap-3">
                {page.benefits.map((benefit) => (
                  <li key={benefit} className="flex gap-3 rounded-xl bg-slate-50 p-4 text-sm leading-6 text-gray-700">
                    <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-brand-600" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="py-18">
          <div className="mx-auto max-w-6xl px-6 py-16">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-widest text-brand-600">How it works</p>
              <h2 className="mt-3 font-display text-3xl font-bold text-gray-950">
                A practical workflow for job applications.
              </h2>
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {page.howItWorks.map((step, index) => (
                <div key={step.title} className="feature-card">
                  <span className="grid h-9 w-9 place-items-center rounded-lg bg-brand-600 text-sm font-bold text-white">
                    {index + 1}
                  </span>
                  <h3 className="mt-4 font-bold text-gray-950">{step.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-gray-600">{step.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-gray-200 bg-slate-50 py-16">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-brand-600">Related tools</p>
                <h2 className="mt-3 font-display text-3xl font-bold text-gray-950">
                  Keep exploring JobDraftly.
                </h2>
                <p className="mt-4 leading-7 text-gray-600">
                  These public pages help you compare resume workflows, templates, keyword matching, and review options.
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {page.related.map((link) => (
                  <Link key={link.href} href={link.href} className="rounded-xl border border-gray-200 bg-white p-5 font-semibold text-gray-900 shadow-sm transition hover:border-brand-300 hover:text-brand-700">
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="mx-auto max-w-4xl px-6">
            <div className="text-center">
              <p className="text-xs font-semibold uppercase tracking-widest text-brand-600">FAQ</p>
              <h2 className="mt-3 font-display text-3xl font-bold text-gray-950">Common questions</h2>
            </div>
            <div className="mt-8 grid gap-4">
              {page.faq.map((faq) => (
                <details key={faq.question} className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                  <summary className="cursor-pointer font-bold text-gray-950">{faq.question}</summary>
                  <p className="mt-3 text-sm leading-6 text-gray-600">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
