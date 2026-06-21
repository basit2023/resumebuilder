import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/SiteHeader";
import { TemplateMiniPreview } from "@/components/TemplateMiniPreview";
import { absoluteUrl, SITE_NAME } from "@/lib/seo";
import { getTemplatePresetBySlug, TEMPLATE_PRESETS } from "@/lib/templatePresets";

export function generateStaticParams() {
  return TEMPLATE_PRESETS.map((preset) => ({ slug: preset.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const preset = getTemplatePresetBySlug(params.slug);
  if (!preset) return {};
  const url = absoluteUrl(`/templates/${preset.slug}`);
  return {
    title: preset.seoTitle,
    description: preset.seoDescription,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: preset.seoTitle,
      description: preset.seoDescription,
      url,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: preset.seoTitle,
      description: preset.seoDescription,
    },
  };
}

export default function TemplateDetailPage({ params }: { params: { slug: string } }) {
  const preset = getTemplatePresetBySlug(params.slug);
  if (!preset) notFound();

  const url = absoluteUrl(`/templates/${preset.slug}`);
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Resume Templates", item: absoluteUrl("/templates") },
      { "@type": "ListItem", position: 3, name: preset.name, item: url },
    ],
  };
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: preset.faq.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: preset.seoTitle,
    description: preset.seoDescription,
    url,
    isPartOf: {
      "@type": "WebSite",
      name: SITE_NAME,
      url: absoluteUrl("/"),
    },
  };

  return (
    <>
      <SiteHeader />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }} />
      <main className="bg-white">
        <section className="border-b border-gray-200 bg-[linear-gradient(180deg,#f8fbff_0%,#ffffff_82%)]">
          <div className="mx-auto grid max-w-6xl gap-10 px-6 py-12 lg:grid-cols-[0.9fr_1.1fr] lg:py-16">
            <div>
              <nav className="flex flex-wrap gap-2 text-sm text-gray-500">
                <Link href="/" className="hover:text-gray-950">Home</Link>
                <span>/</span>
                <Link href="/templates" className="hover:text-gray-950">Templates</Link>
                <span>/</span>
                <span className="text-gray-900">{preset.name}</span>
              </nav>
              <p className="mt-8 text-xs font-semibold uppercase tracking-widest text-brand-600">{preset.format}</p>
              <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-gray-950 md:text-5xl">
                {preset.name} resume template
              </h1>
              <p className="mt-5 text-lg leading-8 text-gray-600">{preset.longDescription}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href={`/signup?next=${encodeURIComponent("/templates")}`} className="btn-primary-lg">
                  Use this template
                </Link>
                <Link href="/templates" className="btn-secondary px-6 py-3 text-base">
                  Browse all templates
                </Link>
              </div>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-slate-50 p-5">
              <TemplateMiniPreview layout={preset.build()} accent={preset.accent} />
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-brand-600">Best for</p>
              <ul className="mt-4 grid gap-3">
                {preset.bestFor.map((item) => (
                  <li key={item} className="rounded-xl border border-gray-200 bg-white p-4 text-sm text-gray-700 shadow-sm">{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-brand-600">Why it works</p>
              <ul className="mt-4 grid gap-3">
                {preset.features.map((feature) => (
                  <li key={feature} className="rounded-xl border border-gray-200 bg-white p-4 text-sm text-gray-700 shadow-sm">{feature}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-brand-600">Recommended sections</p>
              <ul className="mt-4 grid gap-3">
                {["Professional summary", "Work experience", "Skills", "Education", "Projects or certifications"].map((section) => (
                  <li key={section} className="rounded-xl border border-gray-200 bg-white p-4 text-sm text-gray-700 shadow-sm">{section}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="border-y border-gray-200 bg-slate-50 py-16">
          <div className="mx-auto max-w-4xl px-6">
            <div className="text-center">
              <p className="text-xs font-semibold uppercase tracking-widest text-brand-600">FAQ</p>
              <h2 className="mt-3 font-display text-3xl font-bold text-gray-950">Questions about this template</h2>
            </div>
            <div className="mt-8 grid gap-4">
              {preset.faq.map((faq) => (
                <details key={faq.question} className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                  <summary className="cursor-pointer font-bold text-gray-950">{faq.question}</summary>
                  <p className="mt-3 text-sm leading-6 text-gray-600">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="font-display text-3xl font-bold text-gray-950">Related resume tools</h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { href: "/templates", label: "All templates" },
                { href: "/ai-resume-builder", label: "AI resume builder" },
                { href: "/ats-resume-checker", label: "ATS resume checker" },
                { href: "/resume-keyword-scanner", label: "Keyword scanner" },
              ].map((link) => (
                <Link key={link.href} href={link.href} className="rounded-xl border border-gray-200 bg-white p-5 font-semibold text-gray-900 shadow-sm transition hover:border-brand-300 hover:text-brand-700">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
