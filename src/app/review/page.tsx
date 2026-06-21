import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { SiteHeader } from "@/components/SiteHeader";
import { SeoLandingPage } from "@/components/SeoLandingPage";
import { RequestReviewForm } from "./RequestReviewForm";
import { absoluteUrl } from "@/lib/seo";
import { getLandingPage } from "@/lib/landingPages";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Expert Resume Review for ATS and Recruiter Feedback",
  description:
    "Request expert resume feedback for stronger bullets, clearer sections, ATS readiness, and role-specific application advice.",
  alternates: {
    canonical: absoluteUrl("/review"),
  },
  openGraph: {
    title: "Expert Resume Review for ATS and Recruiter Feedback",
    description:
      "Request expert resume feedback for stronger bullets, clearer sections, ATS readiness, and role-specific application advice.",
    url: absoluteUrl("/review"),
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Expert Resume Review for ATS and Recruiter Feedback",
    description:
      "Request expert resume feedback for stronger bullets, clearer sections, ATS readiness, and role-specific application advice.",
  },
};

export default async function ReviewPage() {
  const page = getLandingPage("expert-resume-review");
  if (!page) return null;

  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const { data: resumes } = user
    ? await supabase.from("resumes").select("id, title").order("updated_at", { ascending: false })
    : { data: null };
  const { data: requests } = user
    ? await supabase
        .from("review_requests")
        .select("id, status, notes, expert_feedback, created_at, resume_id")
        .order("created_at", { ascending: false })
    : { data: null };

  return (
    <>
      <SiteHeader authed={Boolean(user)} />
      <SeoLandingPage page={page} canonicalPath="/review" />
      <section className="border-t border-gray-200 bg-white py-16">
        <div className="mx-auto max-w-3xl px-6">
          <div className="rounded-2xl border border-gray-200 bg-slate-50 p-6 shadow-card">
            <h2 className="font-display text-2xl font-bold text-gray-950">Request an expert review</h2>
            <p className="mt-2 text-sm leading-6 text-gray-600">
              The marketing content above is public. Submitting a review request requires an account so the reviewer can access the resume you choose.
            </p>
            {user ? (
              <>
                <RequestReviewForm resumes={resumes ?? []} />
                <div className="mt-8">
                  <h3 className="font-semibold text-gray-950">Your requests</h3>
                  <ul className="mt-3 space-y-3">
                    {(requests ?? []).map((r) => (
                      <li key={r.id} className="rounded-xl border border-gray-200 bg-white p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm">Resume <code>{r.resume_id?.slice(0, 8)}</code></p>
                            <p className="text-xs text-gray-500">Requested {new Date(r.created_at).toLocaleDateString()}</p>
                          </div>
                          <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs capitalize">{r.status.replace("_", " ")}</span>
                        </div>
                        {r.notes && <p className="mt-2 text-sm text-gray-700"><strong>Your notes:</strong> {r.notes}</p>}
                        {r.expert_feedback && (
                          <div className="mt-3 rounded-md bg-green-50 p-3 text-sm">
                            <strong>Reviewer feedback:</strong>
                            <p className="mt-1 whitespace-pre-wrap">{r.expert_feedback}</p>
                          </div>
                        )}
                      </li>
                    ))}
                    {(!requests || requests.length === 0) && <li className="text-sm text-gray-500">No requests yet.</li>}
                  </ul>
                </div>
              </>
            ) : (
              <a href="/signup?next=/review" className="btn-primary mt-5 inline-flex">Sign up to request a review</a>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
