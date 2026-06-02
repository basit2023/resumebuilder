import Link from "next/link";
import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { AppHeader } from "@/components/AppHeader";
import { NewResumeButton } from "./NewResumeButton";
import { OnboardingTour } from "@/components/OnboardingTour";

const DASHBOARD_TOUR = [
  {
    title: "Welcome to JobDraftly",
    body: "Let's take 30 seconds to show you around. You can skip anytime — this only shows once.",
  },
  {
    selector: '[data-tour="new-resume"]',
    title: "Create a resume",
    body: "Click here to start a blank resume. It opens straight into the editor with autosave.",
  },
  {
    selector: '[data-tour="templates"]',
    title: "Or start from a template",
    body: "Browse ready-made layouts by country & format. Your details flow in automatically.",
  },
  {
    selector: '[data-tour="stats"]',
    title: "Track your work",
    body: "See how many resumes you have and when you last edited them.",
  },
  {
    selector: '[data-tour="resumes"]',
    title: "Your resumes live here",
    body: "Click any card to reopen the editor — tailor it to a job, score it, or download as PDF/Word.",
  },
  {
    title: "You're all set 🎉",
    body: "Everything is free during early access. Create your first resume and land that interview!",
  },
];

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Dashboard",
  robots: {
    index: false,
    follow: false,
  },
};

const TEMPLATE_STYLES: Record<string, { bg: string; badge: string; dot: string }> = {
  modern:  { bg: "bg-gradient-to-br from-brand-50 to-brand-100",   badge: "badge-brand",  dot: "bg-brand-500" },
  classic: { bg: "bg-gradient-to-br from-gray-50 to-gray-100",     badge: "badge bg-gray-100 text-gray-700", dot: "bg-gray-500" },
  compact: { bg: "bg-gradient-to-br from-emerald-50 to-emerald-100", badge: "badge-green", dot: "bg-emerald-500" },
  custom:  { bg: "bg-gradient-to-br from-purple-50 to-pink-50",    badge: "badge-purple", dot: "bg-purple-500" },
};

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 2)   return "Just now";
  if (mins < 60)  return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24)   return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 7)   return `${days}d ago`;
  return new Date(dateStr).toLocaleDateString();
}

export default async function DashboardPage() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: resumes } = await supabase
    .from("resumes")
    .select("id, title, template, updated_at, created_at")
    .order("updated_at", { ascending: false });

  const total      = resumes?.length ?? 0;
  const lastEdited = resumes?.[0] ? timeAgo(resumes[0].updated_at) : "—";

  return (
    <>
      <AppHeader email={user.email} />
      <main className="mx-auto max-w-6xl px-6 py-10">
        {/* Page header */}
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-display text-3xl font-bold text-gray-900">My Resumes</h1>
            <p className="mt-1 text-sm text-gray-500">Create, tailor, and download your resumes.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link href="/templates" className="btn-secondary" data-tour="templates">
              Browse templates
            </Link>
            <span data-tour="new-resume">
              <NewResumeButton />
            </span>
          </div>
        </div>

        {/* Stats row */}
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3" data-tour="stats">
          <StatCard value={String(total)} label="Total resumes" icon="📄" />
          <StatCard value={lastEdited} label="Last edited" icon="⏱" />
          <StatCard value="AI Ready" label="Claude-powered" icon="✦" className="hidden sm:flex" />
        </div>

        {/* Resume grid */}
        {resumes && resumes.length > 0 ? (
          <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" data-tour="resumes">
            {resumes.map((r) => {
              const style = TEMPLATE_STYLES[r.template] ?? TEMPLATE_STYLES.modern;
              return (
                <li key={r.id}>
                  <Link
                    href={`/dashboard/resumes/${r.id}`}
                    className="card-hover group flex flex-col overflow-hidden p-0"
                  >
                    {/* Template preview strip */}
                    <div className={`flex h-28 items-center justify-center ${style.bg} px-5`}>
                      <div className="w-full space-y-2">
                        <div className="flex items-center gap-2">
                          <div className={`h-2 w-2 rounded-full ${style.dot}`} />
                          <div className={`h-2 w-1/2 rounded-full ${style.dot} opacity-60`} />
                        </div>
                        <div className={`h-1.5 w-full rounded-full ${style.dot} opacity-20`} />
                        <div className={`h-1.5 w-4/5 rounded-full ${style.dot} opacity-20`} />
                        <div className={`h-1.5 w-3/4 rounded-full ${style.dot} opacity-20`} />
                      </div>
                    </div>

                    {/* Card body */}
                    <div className="flex flex-1 flex-col p-5">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <h3 className="truncate font-semibold text-gray-900 group-hover:text-brand-600 transition-colors">
                            {r.title || "Untitled resume"}
                          </h3>
                          <p className="mt-0.5 text-xs text-gray-400">Updated {timeAgo(r.updated_at)}</p>
                        </div>
                        <span className={`shrink-0 ${style.badge} capitalize`}>{r.template}</span>
                      </div>
                      <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4">
                        <span className="text-xs text-gray-400">
                          Created {new Date(r.created_at).toLocaleDateString()}
                        </span>
                        <span className="flex items-center gap-1 text-xs font-semibold text-brand-600 opacity-0 transition-opacity group-hover:opacity-100">
                          Open editor
                          <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        ) : (
          /* Empty state */
          <div data-tour="resumes" className="mt-10 flex flex-col items-center rounded-3xl border-2 border-dashed border-gray-200 bg-white p-16 text-center">
            <div className="grid h-16 w-16 place-items-center rounded-2xl bg-brand-50 text-3xl">📄</div>
            <h3 className="mt-5 text-xl font-bold text-gray-900">No resumes yet</h3>
            <p className="mt-2 max-w-sm text-sm text-gray-500">
              Start with a modern template that already includes polished sample content, then edit it in your dashboard.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              <Link href="/templates" className="btn-secondary">
                Browse templates
              </Link>
              <NewResumeButton />
            </div>
            <p className="mt-3 text-xs text-gray-400">Free · No credit card needed</p>
          </div>
        )}
      </main>

      <OnboardingTour tourKey="dashboard-v1" steps={DASHBOARD_TOUR} />
    </>
  );
}

function StatCard({
  value, label, icon, className = "",
}: {
  value: string; label: string; icon: string; className?: string;
}) {
  return (
    <div className={`card flex items-center gap-4 ${className}`}>
      <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-50 text-xl">{icon}</div>
      <div>
        <p className="text-xl font-bold text-gray-900">{value}</p>
        <p className="text-xs text-gray-500">{label}</p>
      </div>
    </div>
  );
}
