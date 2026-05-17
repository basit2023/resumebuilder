"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function UpgradeButton({ label, className }: { label: string; className?: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  async function go() {
    setLoading(true);
    setMsg(null);
    try {
      const res = await fetch("/api/stripe/checkout", { method: "POST" });
      if (res.status === 401) {
        router.push(`/login?next=${encodeURIComponent("/pricing")}`);
        return;
      }
      if (res.status === 501) {
        setMsg("Billing isn't configured yet. Add Stripe keys to .env.local.");
        return;
      }
      if (!res.ok) {
        setMsg("Could not start checkout. Please try again.");
        return;
      }
      const { url } = await res.json();
      if (url) window.location.href = url;
      else setMsg("No checkout URL returned.");
    } catch {
      setMsg("Network error starting checkout.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <button onClick={go} disabled={loading} className={className}>
        {loading ? "Redirecting to Stripe…" : label}
      </button>
      {msg && <p className="mt-2 text-center text-xs text-red-600">{msg}</p>}
    </div>
  );
}
