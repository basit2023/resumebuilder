"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { BILLING_ENABLED } from "@/lib/config";

export function SiteHeader({ authed }: { authed?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled
          ? "border-b border-gray-200/80 bg-white/90 shadow-sm backdrop-blur-xl"
          : "border-b border-transparent bg-white/60 backdrop-blur-md"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 font-semibold text-gray-900">
          <span className="grid h-8 w-8 place-items-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 text-sm font-bold text-white shadow-md">
            R
          </span>
          <span className="font-display text-[15px] font-bold tracking-tight">ResumeForge</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 text-sm md:flex">
          <Link href="/#features" className="nav-link">Features</Link>
          <Link href="/templates" className="nav-link">Templates</Link>
          {BILLING_ENABLED && <Link href="/pricing" className="nav-link">Pricing</Link>}
          <Link href="/review" className="nav-link">Expert Review</Link>
          <div className="mx-3 h-5 w-px bg-gray-200" />
          {authed ? (
            <Link href="/dashboard" className="btn-primary">Dashboard</Link>
          ) : (
            <>
              <Link href="/login" className="nav-link">Sign in</Link>
              <Link href="/signup" className="btn-primary ml-1">Get started free</Link>
            </>
          )}
        </nav>

        {/* Mobile hamburger */}
        <button
          className="btn-icon md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            {menuOpen
              ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="border-t border-gray-100 bg-white px-6 py-4 shadow-lg md:hidden animate-slide-down">
          <nav className="flex flex-col gap-1">
            {[
              { href: "/#features", label: "Features" },
              { href: "/templates", label: "Templates" },
              ...(BILLING_ENABLED ? [{ href: "/pricing", label: "Pricing" }] : []),
              { href: "/review", label: "Expert Review" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-xl px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="my-2 border-t border-gray-100" />
            {authed ? (
              <Link href="/dashboard" className="btn-primary justify-center" onClick={() => setMenuOpen(false)}>Dashboard</Link>
            ) : (
              <>
                <Link href="/login" className="btn-secondary justify-center" onClick={() => setMenuOpen(false)}>Sign in</Link>
                <Link href="/signup" className="btn-primary justify-center mt-1" onClick={() => setMenuOpen(false)}>Get started free</Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
