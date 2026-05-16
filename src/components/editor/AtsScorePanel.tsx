"use client";
import { useState } from "react";
import type { ResumeData } from "@/lib/types";

type Result = {
  score: number;
  strengths: string[];
  gaps: string[];
  missingKeywords: string[];
};

export function AtsScorePanel({ data, jd }: { data: ResumeData; jd: string }) {
  const [result, setResult] = useState<Result | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function run() {
    if (!jd.trim() || jd.length < 20) {
      setError("Paste a job description above first (at least 20 characters).");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/ai/ats-score", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ resume: data, jobDescription: jd }),
      });
      if (!res.ok) throw new Error(await res.text());
      setResult(await res.json());
    } catch {
      setError("Scoring failed. Check that ANTHROPIC_API_KEY is set.");
    } finally {
      setLoading(false);
    }
  }

  const { color, verdict, bg } = getVerdict(result?.score ?? 0);

  return (
    <div className="mt-4 space-y-4">
      <button onClick={run} disabled={loading} className="btn-secondary w-full sm:w-auto">
        {loading ? (
          <span className="flex items-center gap-2">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-brand-600" />
            Analyzing...
          </span>
        ) : "✦ Score my ATS match"}
      </button>

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {result && (
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm animate-scale-in">
          {/* Score header */}
          <div className={`flex items-center gap-5 rounded-xl p-4 ${bg}`}>
            <ScoreRing score={result.score} color={color} />
            <div>
              <p className="text-lg font-bold" style={{ color }}>{verdict}</p>
              <p className="text-xs text-gray-500 mt-0.5">Based on the job description you pasted</p>
            </div>
          </div>

          {/* Strengths & Gaps */}
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl bg-emerald-50 p-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-700 mb-2">✓ Strengths</h4>
              <ul className="space-y-1.5 text-sm text-emerald-900">
                {result.strengths.map((it, i) => (
                  <li key={i} className="flex gap-2"><span className="mt-0.5 shrink-0 text-emerald-500">•</span>{it}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl bg-amber-50 p-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-700 mb-2">⚠ Gaps</h4>
              <ul className="space-y-1.5 text-sm text-amber-900">
                {result.gaps.map((it, i) => (
                  <li key={i} className="flex gap-2"><span className="mt-0.5 shrink-0 text-amber-500">•</span>{it}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Missing keywords */}
          {result.missingKeywords.length > 0 && (
            <div className="mt-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Missing keywords</h4>
              <div className="flex flex-wrap gap-2">
                {result.missingKeywords.map((k) => (
                  <span key={k} className="rounded-lg bg-red-50 px-2.5 py-1 text-xs font-medium text-red-700 ring-1 ring-red-100">
                    {k}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function getVerdict(score: number) {
  if (score >= 80) return { color: "#15803d", verdict: `Strong fit — ${score}/100`, bg: "bg-emerald-50" };
  if (score >= 60) return { color: "#b45309", verdict: `Viable with tweaks — ${score}/100`, bg: "bg-amber-50" };
  if (score >= 40) return { color: "#b91c1c", verdict: `Needs rework — ${score}/100`, bg: "bg-red-50" };
  return { color: "#7f1d1d", verdict: `Poor fit — ${score}/100`, bg: "bg-red-50" };
}

function ScoreRing({ score, color }: { score: number; color: string }) {
  const pct = Math.max(0, Math.min(100, score));
  const circumference = 2 * Math.PI * 15.915;
  const dash = (pct / 100) * circumference;
  return (
    <div className="relative h-20 w-20 shrink-0">
      <svg viewBox="0 0 36 36" className="h-20 w-20 -rotate-90">
        <circle cx="18" cy="18" r="15.915" fill="none" stroke="#e5e7eb" strokeWidth="3" />
        <circle
          cx="18" cy="18" r="15.915" fill="none" stroke={color} strokeWidth="3"
          strokeDasharray={`${dash} ${circumference - dash}`}
          strokeLinecap="round"
          style={{ transition: "stroke-dasharray 1s cubic-bezier(0.16,1,0.3,1)" }}
        />
      </svg>
      <span
        className="absolute inset-0 grid place-items-center text-lg font-bold"
        style={{ color }}
      >
        {pct}
      </span>
    </div>
  );
}
