<<<<<<< HEAD
export const SITE_URL = (process.env.NEXT_PUBLIC_APP_URL ?? "https://www.jobdraftly.com").replace(/\/$/, "");
export const SITE_NAME = "JobDraftly";

export function absoluteUrl(path = "/") {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
=======
export const SITE_NAME = "JobDraftly";
export const SITE_URL = (process.env.NEXT_PUBLIC_APP_URL ?? "https://www.jobdraftly.com").replace(/\/$/, "");
export const SITE_DESCRIPTION =
  "Build ATS-friendly resumes, tailor them to job descriptions, improve bullets with AI, generate cover letters, and export polished PDF or Word files.";

export const PUBLIC_ROUTES = [
  {
    path: "/",
    changeFrequency: "weekly",
    priority: 1,
  },
  {
    path: "/templates",
    changeFrequency: "weekly",
    priority: 0.9,
  },
  {
    path: "/review",
    changeFrequency: "monthly",
    priority: 0.7,
  },
  {
    path: "/pricing",
    changeFrequency: "monthly",
    priority: 0.6,
  },
] as const;

export function absoluteUrl(path = "/") {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalizedPath}`;
>>>>>>> 7904d3ff5e8fda86e42ae520ce2e4b8126f11d76
}
