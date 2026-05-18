import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({ name, value, ...options });
          response = NextResponse.next({ request });
          response.cookies.set({ name, value, ...options });
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({ name, value: "", ...options });
          response = NextResponse.next({ request });
          response.cookies.set({ name, value: "", ...options });
        },
      },
    }
  );

  // getUser() validates the JWT against Supabase Auth on every request,
  // so a user deleted from auth.users is rejected here automatically.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;
  const isProtected =
    pathname.startsWith("/dashboard") || pathname.startsWith("/review");
  const isAuthPage = pathname.startsWith("/login") || pathname.startsWith("/signup");

  // Build a redirect that also wipes the Supabase session cookies
  // (so a blocked user is truly signed out, not just bounced).
  function signedOutRedirect(to: string, params: Record<string, string>) {
    const url = request.nextUrl.clone();
    url.pathname = to;
    url.search = "";
    for (const [k, v] of Object.entries(params)) url.searchParams.set(k, v);
    const res = NextResponse.redirect(url);
    for (const c of request.cookies.getAll()) {
      if (c.name.startsWith("sb-")) res.cookies.delete(c.name);
    }
    return res;
  }

  if (isProtected) {
    if (!user) {
      const url = request.nextUrl.clone();
      url.pathname = "/login";
      url.searchParams.set("next", pathname);
      return NextResponse.redirect(url);
    }

    // 1. Email must be confirmed before any app access.
    if (!user.email_confirmed_at && !user.confirmed_at) {
      return signedOutRedirect("/login", { notice: "confirm" });
    }

    // 2. The profile row must still exist. Deleting it from the DB
    //    (or the auth user) revokes access immediately.
    const { data: profile } = await supabase
      .from("profiles")
      .select("id")
      .eq("id", user.id)
      .maybeSingle();
    if (!profile) {
      return signedOutRedirect("/login", { notice: "account" });
    }
  }

  if (isAuthPage && user && (user.email_confirmed_at || user.confirmed_at)) {
    const url = request.nextUrl.clone();
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  return response;
}
