export const SITE_NAME = "JobDraftly";
export const SITE_URL = (process.env.NEXT_PUBLIC_APP_URL ?? "https://www.jobdraftly.com").replace(/\/$/, "");
export const SITE_TAGLINE = "Free AI Resume Builder and ATS Resume Checker";
export const SITE_DESCRIPTION =
  "Create ATS-friendly resumes with AI, tailor each resume to a job description, check missing keywords, generate cover letters, and export polished PDF or Word files.";

export const TARGET_REGIONS = [
  "United States",
  "Canada",
  "United Kingdom",
  "Europe",
  "India",
] as const;

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
    path: "/expert-resume-review",
    changeFrequency: "monthly",
    priority: 0.8,
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
}
