"use client";

import { useState } from "react";

type Props = {
  endpoint: string;
  payload: () => Record<string, unknown>;
  onResult: (text: string) => void;
  label: string;
  title?: string;
  tiny?: boolean;
};

export function AIButton({ endpoint, payload, onResult, label, title, tiny }: Props) {
  const [loading, setLoading] = useState(false);

  async function run() {
    setLoading(true);
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload()),
      });
      if (!res.ok) throw new Error(await res.text());
      const { text } = await res.json();
      onResult(text);
    } catch (e) {
      alert("AI request failed. Check that ANTHROPIC_API_KEY is set in .env.local.");
    } finally {
      setLoading(false);
    }
  }

  if (tiny) {
    return (
      <button
        onClick={run}
        disabled={loading}
        title={title}
        className="rounded border border-brand-200 bg-brand-50 px-2 text-xs text-brand-700 hover:bg-brand-100 disabled:opacity-50"
      >
        {loading ? "…" : label}
      </button>
    );
  }

  return (
    <button onClick={run} disabled={loading} className="btn-secondary text-xs">
      {loading ? "Generating…" : label}
    </button>
  );
}
