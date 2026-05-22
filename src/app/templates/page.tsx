import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { absoluteUrl } from "@/lib/seo";
import { TemplatesBrowser } from "./TemplatesBrowser";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Resume Templates",
  description:
    "Browse ATS-friendly resume templates for modern, classic, compact, and custom resume formats.",
  alternates: {
    canonical: absoluteUrl("/templates"),
  },
};

export default function TemplatesPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-6 py-14">
        <div className="text-center">
          <h1 className="font-display text-4xl font-bold tracking-tight text-gray-900">
            Resume templates
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-gray-500">
            Search by country, format, or role. Each template includes editable
            dummy data and opens directly in your dashboard editor after login.
          </p>
        </div>
        <div className="mt-10">
          <TemplatesBrowser />
        </div>
      </main>
    </>
  );
}
