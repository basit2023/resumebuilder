import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { AppHeader } from "@/components/AppHeader";
import { SiteHeader } from "@/components/SiteHeader";
import { RequestReviewForm } from "./RequestReviewForm";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Expert Resume Review",
  description:
    "Request expert resume feedback for stronger bullets, clearer sections, ATS readiness, and role-specific application advice.",
  alternates: {
    canonical: "/review",
  },
};

export default async function ReviewPage() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return (
      <>
        <SiteHeader />
        <main className="mx-auto max-w-2xl px-6 py-16 text-center">
          <h1 className="text-3xl font-bold">Expert resume review — $49</h1>
          <p className="mt-3 text-gray-600">
            A senior recruiter rewrites bullets, flags weak sections, and returns inline notes within 48 hours.
          </p>
          <a href="/signup?next=/review" className="btn-primary mt-6 inline-block px-6 py-3">Sign up to request a review</a>
        </main>
      </>
    );
  }

  const { data: resumes } = await supabase
    .from("resumes")
    .select("id, title")
    .order("updated_at", { ascending: false });

  const { data: requests } = await supabase
    .from("review_requests")
    .select("id, status, notes, expert_feedback, created_at, resume_id")
    .order("created_at", { ascending: false });

  return (
    <>
      <AppHeader email={user.email} />
      <main className="mx-auto max-w-3xl px-6 py-10">
        <h1 className="text-2xl font-bold">Expert review</h1>
        <p className="text-sm text-gray-600">
          Request a 48-hour review from a senior recruiter. Beta: human delivery is queued — first
          5 reviews are free while we onboard reviewers.
        </p>

        <div className="mt-8 card">
          <h2 className="text-lg font-semibold">Request a review</h2>
          <RequestReviewForm resumes={resumes ?? []} />
        </div>

        <div className="mt-8">
          <h2 className="text-lg font-semibold">Your requests</h2>
          <ul className="mt-3 space-y-3">
            {(requests ?? []).map((r) => (
              <li key={r.id} className="card">
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
      </main>
    </>
  );
}
