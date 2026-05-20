"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const next = params?.get("next") || "/dashboard";

  const notice = params?.get("notice");
  const confirmed = params?.get("confirmed");
  const noticeText =
    notice === "confirm"
      ? "Please confirm your email first. Check your inbox for the confirmation link, then sign in."
      : notice === "account"
        ? "Your account is no longer active. Please sign up again or contact support."
        : null;
  const successText = confirmed === "1" ? "Email confirmed — you can sign in now ✅" : null;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      setError(error.message);
      return;
    }
    router.push(next);
    router.refresh();
  }

  return (
    <div className="animate-fade-in">
      {successText && (
        <div className="mb-5 rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
          {successText}
        </div>
      )}
      {noticeText && (
        <div className="mb-5 rounded-xl border border-amber-100 bg-amber-50 px-4 py-3 text-sm text-amber-700">
          {noticeText}
        </div>
      )}
      <form onSubmit={onSubmit} className="space-y-5">
        <div>
          <label className="label">Email address</label>
          <input 
            className="input" 
            type="email" 
            placeholder="you@example.com"
            required 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
          />
        </div>
        <div>
          <div className="flex items-center justify-between">
            <label className="label">Password</label>
            <Link href="/forgot-password" title="Coming soon" className="text-xs font-medium text-brand-600 hover:text-brand-700">
              Forgot password?
            </Link>
          </div>
          <input 
            className="input" 
            type="password" 
            placeholder="••••••••"
            required 
            minLength={6} 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
        </div>
        
        {error && (
          <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600 animate-shake">
            {error}
          </div>
        )}

        <button disabled={loading} className="btn-primary w-full py-3 text-base shadow-lg">
          {loading ? (
            <span className="flex items-center gap-2">
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/20 border-t-white" />
              Signing in...
            </span>
          ) : (
            "Sign in to ResumeForge"
          )}
        </button>
      </form>
      
      <p className="mt-8 text-center text-sm text-gray-500">
        Don&apos;t have an account?{" "}
        <Link href={`/signup?next=${encodeURIComponent(next)}`} className="font-semibold text-brand-600 hover:text-brand-700 transition-colors">
          Create an account for free
        </Link>
      </p>
    </div>
  );
}
