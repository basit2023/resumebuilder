export const SITE_URL = (process.env.NEXT_PUBLIC_APP_URL ?? "https://www.jobdraftly.com").replace(/\/$/, "");
export const SITE_NAME = "JobDraftly";

export function absoluteUrl(path = "/") {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
