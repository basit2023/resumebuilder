"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function RequestReviewForm({ resumes }: { resumes: { id: string; title: string }[] }) {
  const router = useRouter();
  const [resumeId, setResumeId] = useState(resumes[0]?.id ?? "");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!resumeId) {
      alert("Create a resume first.");
      return;
    }
    setLoading(true);
    const res = await fetch("/api/review", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ resumeId, notes }),
    });
    setLoading(false);
    if (!res.ok) {
      alert("Could not submit request.");
      return;
    }
    setNotes("");
    router.refresh();
  }

  return (
    <form onSubmit={submit} className="mt-4 space-y-3">
      <div>
        <label className="label">Which resume?</label>
        <select className="input" value={resumeId} onChange={(e) => setResumeId(e.target.value)}>
          {resumes.map((r) => (
            <option key={r.id} value={r.id}>{r.title}</option>
          ))}
          {resumes.length === 0 && <option>No resumes yet</option>}
        </select>
      </div>
      <div>
        <label className="label">Notes for the reviewer (optional)</label>
        <textarea
          className="input"
          rows={4}
          placeholder="What roles are you targeting? Anything specific you want feedback on?"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </div>
      <button disabled={loading || resumes.length === 0} className="btn-primary">
        {loading ? "Submitting…" : "Submit request"}
      </button>
    </form>
  );
}
