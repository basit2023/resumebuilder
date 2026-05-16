import { type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  // Skip middleware entirely if Supabase isn't configured yet (lets you boot
  // the app for the first time before pasting keys into .env.local).
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    return;
  }
  return await updateSession(request);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
};
