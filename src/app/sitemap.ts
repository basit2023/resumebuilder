import type { MetadataRoute } from "next";
import { absoluteUrl, PUBLIC_ROUTES } from "@/lib/seo";
import { LANDING_PAGES } from "@/lib/landingPages";
import { TEMPLATE_PRESETS } from "@/lib/templatePresets";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticRoutes = PUBLIC_ROUTES.map((route) => ({
    url: absoluteUrl(route.path),
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const landingRoutes = LANDING_PAGES.filter((page) => page.slug !== "expert-resume-review").map((page) => ({
    url: absoluteUrl(`/${page.slug}`),
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const templateRoutes = TEMPLATE_PRESETS.map((preset) => ({
    url: absoluteUrl(`/templates/${preset.slug}`),
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...landingRoutes, ...templateRoutes];
}
