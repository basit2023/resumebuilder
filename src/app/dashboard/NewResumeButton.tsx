"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function NewResumeButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function create() {
    setLoading(true);
    const res = await fetch("/api/resumes", { method: "POST" });
    setLoading(false);
    if (!res.ok) {
      alert("Could not create resume.");
      return;
    }
    const { id } = await res.json();
    router.push(`/dashboard/resumes/${id}`);
  }

  return (
    <button onClick={create} disabled={loading} className="btn-primary">
      {loading ? "Creating…" : "+ New resume"}
    </button>
  );
}
