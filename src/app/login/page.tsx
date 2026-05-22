import { Suspense } from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { BrandLogo } from "@/components/BrandLogo";
import { LoginForm } from "./LoginForm";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Sign In",
  robots: {
    index: false,
    follow: false,
  },
};

export default function LoginPage() {
  return (
    <main className="flex min-h-screen">
      {/* Left side: Content & Branding */}
      <div className="relative hidden w-1/2 flex-col justify-between bg-brand-600 p-12 text-white lg:flex">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-600 to-purple-700 opacity-90" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
        
        <div className="relative z-10">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <BrandLogo inverse markClassName="h-11 w-11 from-white to-white text-brand-700" textClassName="text-2xl" />
          </Link>
        </div>

        <div className="relative z-10">
          <blockquote className="space-y-4">
            <p className="text-3xl font-medium leading-tight">
              "JobDraftly helped me land my dream role at Notion. The AI-crafted bullets were exactly what recruiters were looking for."
            </p>
            <footer className="text-lg font-semibold">— Priya N., Designer</footer>
          </blockquote>
        </div>

        <div className="relative z-10 text-sm opacity-80">
          (c) {new Date().getFullYear()} JobDraftly. Built for ambitious professionals.
        </div>
      </div>

      {/* Right side: Login Form */}
      <div className="flex w-full flex-col justify-center px-6 py-12 lg:w-1/2 lg:px-24 xl:px-32 bg-white">
        <div className="mx-auto w-full max-w-sm">
          <div className="mb-8 lg:hidden">
            <Link href="/" className="flex items-center gap-2 font-semibold text-brand-600">
              <BrandLogo markClassName="h-10 w-10" />
            </Link>
          </div>

          <div className="space-y-2">
            <h1 className="font-display text-3xl font-bold tracking-tight text-gray-900">Welcome back</h1>
            <p className="text-gray-500">Enter your details to access your resumes.</p>
          </div>

          <div className="mt-8">
            <Suspense fallback={
              <div className="space-y-4 animate-pulse">
                <div className="h-10 bg-gray-100 rounded-xl" />
                <div className="h-10 bg-gray-100 rounded-xl" />
                <div className="h-12 bg-brand-100 rounded-xl" />
              </div>
            }>
              <LoginForm />
            </Suspense>
          </div>
        </div>
      </div>
    </main>
  );
}
