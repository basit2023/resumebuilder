import Link from "next/link";

export function AppHeader({ email }: { email?: string | null }) {
  const initials = email ? email.slice(0, 2).toUpperCase() : "?";

  return (
    <header className="sticky top-0 z-40 border-b border-gray-200/80 bg-white/90 backdrop-blur-xl shadow-sm">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link href="/dashboard" className="flex items-center gap-2 font-semibold text-gray-900">
          <span className="grid h-7 w-7 place-items-center rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 text-xs font-bold text-white shadow">
            R
          </span>
          <span className="font-display text-sm font-bold tracking-tight hidden sm:block">ResumeForge</span>
        </Link>

        {/* Nav */}
        <nav className="flex items-center gap-1 text-sm">
          <Link href="/dashboard" className="nav-link hidden sm:inline-flex">My Resumes</Link>
          <Link href="/review" className="nav-link hidden sm:inline-flex">Expert Review</Link>
          <Link href="/pricing" className="nav-link hidden sm:inline-flex">Pricing</Link>

          {/* Avatar + email chip */}
          <div className="ml-3 flex items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-3 py-1.5">
            <span className="grid h-6 w-6 place-items-center rounded-full bg-brand-600 text-[10px] font-bold text-white">
              {initials}
            </span>
            <span className="hidden text-xs font-medium text-gray-600 md:block max-w-[140px] truncate">
              {email}
            </span>
          </div>

          <form action="/logout" method="post" className="ml-1">
            <button className="btn-ghost text-sm" type="submit">Sign out</button>
          </form>
        </nav>
      </div>
    </header>
  );
}
