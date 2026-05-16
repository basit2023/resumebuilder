"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export function SignupForm() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setInfo(null);
    setLoading(true);
    const supabase = createClient();
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName } },
    });
    setLoading(false);
    if (error) return setError(error.message);
    if (data.session) {
      router.push("/dashboard");
      router.refresh();
    } else {
      setInfo("Check your email to confirm your account, then sign in.");
    }
  }

  return (
    <div className="animate-fade-in">
      <form onSubmit={onSubmit} className="space-y-5">
        <div>
          <label className="label">Full name</label>
          <input 
            className="input" 
            placeholder="Jane Doe"
            required 
            value={fullName} 
            onChange={(e) => setFullName(e.target.value)} 
          />
        </div>
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
          <label className="label">Password</label>
          <input 
            className="input" 
            type="password" 
            placeholder="At least 6 characters"
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
        
        {info && (
          <div className="rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm text-emerald-700 animate-fade-in">
            {info}
          </div>
        )}

        <button disabled={loading} className="btn-primary w-full py-3 text-base shadow-lg">
          {loading ? (
            <span className="flex items-center gap-2">
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/20 border-t-white" />
              Creating account...
            </span>
          ) : (
            "Create my free account"
          )}
        </button>
      </form>
      
      <p className="mt-8 text-center text-sm text-gray-500">
        Already have an account?{" "}
        <Link href="/login" className="font-semibold text-brand-600 hover:text-brand-700 transition-colors">
          Sign in here
        </Link>
      </p>
    </div>
  );
}
