import type { MetadataRoute } from "next";
<<<<<<< HEAD
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
=======
import { absoluteUrl, PUBLIC_ROUTES } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return PUBLIC_ROUTES.map((route) => ({
    url: absoluteUrl(route.path),
    lastModified,
    changeFrequency: route.changeFrequency,
>>>>>>> 7904d3ff5e8fda86e42ae520ce2e4b8126f11d76
    priority: route.priority,
  }));
}
