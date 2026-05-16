"use client";

import Link from "next/link";

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main className="grid min-h-screen place-items-center px-6 text-center">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-red-600">Error</p>
        <h1 className="mt-2 text-3xl font-bold">Something went wrong</h1>
        <p className="mt-2 text-sm text-gray-600">An unexpected error occurred.</p>
        <div className="mt-6 flex justify-center gap-3">
          <button onClick={reset} className="btn-primary">Try again</button>
          <Link href="/" className="btn-secondary">Go home</Link>
        </div>
      </div>
    </main>
  );
}
