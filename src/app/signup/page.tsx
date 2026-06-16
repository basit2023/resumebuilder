import Link from "next/link";
import type { Metadata } from "next";
import { BrandLogo } from "@/components/BrandLogo";
import { SignupForm } from "./SignupForm";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Create Your Free Account",
  robots: {
    index: false,
    follow: false,
  },
};

export default function SignupPage() {
  return (
    <main className="flex min-h-screen">
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
              "The tailoring feature is a game changer. I used to spend hours on each application, now it takes 60 seconds."
            </p>
            <footer className="text-lg font-semibold">- Aisha R., Software Engineer</footer>
          </blockquote>
        </div>

        <div className="relative z-10 text-sm opacity-80">
          (c) {new Date().getFullYear()} JobDraftly. Join 10,000+ job seekers.
        </div>
      </div>

      <div className="flex w-full flex-col justify-center bg-white px-6 py-12 lg:w-1/2 lg:px-24 xl:px-32">
        <div className="mx-auto w-full max-w-sm">
          <div className="mb-8 lg:hidden">
            <Link href="/" className="flex items-center gap-2 font-semibold text-brand-600">
              <BrandLogo markClassName="h-10 w-10" />
            </Link>
          </div>

          <div className="space-y-2">
            <h1 className="font-display text-3xl font-bold tracking-tight text-gray-900">Get started free</h1>
            <p className="text-gray-500">Create your account in seconds. No credit card required.</p>
          </div>

          <div className="mt-8">
            <SignupForm />
          </div>

          <p className="mt-8 text-center text-xs text-gray-400">
            By signing up, you agree to our{" "}
            <Link href="/terms" className="underline hover:text-gray-600">Terms of Service</Link> and{" "}
            <Link href="/privacy" className="underline hover:text-gray-600">Privacy Policy</Link>.
          </p>
        </div>
      </div>
    </main>
  );
}
