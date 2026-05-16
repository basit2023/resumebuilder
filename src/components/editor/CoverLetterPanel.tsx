"use client";
import { useState } from "react";
import type { ResumeData } from "@/lib/types";

type Tone = "confident" | "warm" | "concise" | "enthusiastic";

export function CoverLetterPanel({ data, jd }: { data: ResumeData; jd: string }) {
  const [company, setCompany] = useState("");
  const [tone, setTone]       = useState<Tone>("confident");
  const [text, setText]       = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied]   = useState(false);
  const [error, setError]     = useState<string | null>(null);

  async function generate() {
    if (jd.trim().length < 20) {
      setError("Paste a job description above first (at least 20 characters).");
      return;
    }
    setLoading(true);
    setError(null);
    setText("");
    try {
      const res = await fetch("/api/ai/cover-letter", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ resume: data, jobDescription: jd, companyName: company, tone }),
      });
      if (!res.ok) throw new Error(await res.text());
      const r = await res.json();
      setText(r.text);
    } catch {
      setError("Cover letter generation failed. Check ANTHROPIC_API_KEY.");
    } finally {
      setLoading(false);
    }
  }

  async function copy() {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  function download() {
    const blob = new Blob([text], { type: "text/plain" });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement("a");
    a.href     = url;
    a.download = `cover-letter-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }

  const wordCount = text ? text.trim().split(/\s+/).length : 0;

  return (
    <div className="mt-4 space-y-4">
      {/* Controls */}
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label className="label">Company (optional)</label>
          <input
            className="input"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="Acme Inc."
          />
        </div>
        <div>
          <label className="label">Tone</label>
          <select className="input" value={tone} onChange={(e) => setTone(e.target.value as Tone)}>
            <option value="confident">Confident</option>
            <option value="warm">Warm</option>
            <option value="concise">Concise</option>
            <option value="enthusiastic">Enthusiastic</option>
          </select>
        </div>
      </div>

      <button onClick={generate} disabled={loading} className="btn-primary w-full sm:w-auto">
        {loading ? (
          <span className="flex items-center gap-2">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
            Writing…
          </span>
        ) : "✦ Generate cover letter"}
      </button>

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
      )}

      {text && (
        <div className="space-y-3 animate-scale-in">
          <textarea
            className="input"
            rows={12}
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-400">{wordCount} words</span>
            <div className="flex gap-2">
              <button onClick={copy} className="btn-secondary text-xs">
                {copied ? "✓ Copied!" : "Copy"}
              </button>
              <button onClick={download} className="btn-secondary text-xs">
                Download .txt
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
