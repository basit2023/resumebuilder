import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";

const routes = [
  { path: "/", priority: 1 },
  { path: "/templates", priority: 0.9 },
  { path: "/review", priority: 0.6 },
  { path: "/pricing", priority: 0.5 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return routes.map((route) => ({
    url: absoluteUrl(route.path),
    lastModified: now,
    changeFrequency: "weekly",
    priority: route.priority,
  }));
}
