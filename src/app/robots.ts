import type { MetadataRoute } from "next";
<<<<<<< HEAD
import { SITE_URL, absoluteUrl } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/templates", "/pricing", "/review"],
        disallow: ["/dashboard", "/api", "/login", "/signup", "/auth", "/logout"],
      },
    ],
=======
import { absoluteUrl, SITE_URL } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/templates", "/review", "/pricing"],
      disallow: ["/api/", "/auth/", "/dashboard/", "/login", "/signup", "/logout"],
    },
>>>>>>> 7904d3ff5e8fda86e42ae520ce2e4b8126f11d76
    sitemap: absoluteUrl("/sitemap.xml"),
    host: SITE_URL,
  };
}
