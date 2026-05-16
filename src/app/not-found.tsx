import Link from "next/link";

export const dynamic = "force-dynamic";

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center px-6 text-center">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-brand-600">404</p>
        <h1 className="mt-2 text-3xl font-bold">Page not found</h1>
        <p className="mt-2 text-sm text-gray-600">The page you’re looking for doesn’t exist.</p>
        <Link href="/" className="btn-primary mt-6 inline-block">Go home</Link>
      </div>
    </main>
  );
}
