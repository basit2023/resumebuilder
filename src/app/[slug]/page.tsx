import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/SiteHeader";
import { SeoLandingPage } from "@/components/SeoLandingPage";
import { absoluteUrl } from "@/lib/seo";
import { getLandingPage, LANDING_PAGES } from "@/lib/landingPages";

export function generateStaticParams() {
  return LANDING_PAGES.map((page) => ({ slug: page.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const page = getLandingPage(params.slug);
  if (!page) return {};
  const url = absoluteUrl(`/${page.slug}`);
  return {
    title: page.title,
    description: page.description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: page.title,
      description: page.description,
      url,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
    },
  };
}

export default function LandingPageRoute({ params }: { params: { slug: string } }) {
  const page = getLandingPage(params.slug);
  if (!page) notFound();

  return (
    <>
      <SiteHeader />
      <SeoLandingPage page={page} />
    </>
  );
}
