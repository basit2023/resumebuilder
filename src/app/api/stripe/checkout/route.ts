import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@/lib/supabase/server";
import { BILLING_ENABLED } from "@/lib/config";

// Stripe is wired but inert until you add STRIPE_SECRET_KEY +
// NEXT_PUBLIC_STRIPE_PRICE_PRO to .env.local. See README.

export async function POST() {
  // Early-access mode: billing disabled globally.
  if (!BILLING_ENABLED) {
    return NextResponse.json(
      { error: "Billing is disabled — all features are free during early access." },
      { status: 503 }
    );
  }

  const secret = process.env.STRIPE_SECRET_KEY;
  const price = process.env.NEXT_PUBLIC_STRIPE_PRICE_PRO;
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

  if (!secret || !price) {
    return NextResponse.json(
      { error: "Stripe is not configured. Set STRIPE_SECRET_KEY and NEXT_PUBLIC_STRIPE_PRICE_PRO." },
      { status: 501 }
    );
  }

  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const stripe = new Stripe(secret, { apiVersion: "2024-11-20.acacia" as Stripe.LatestApiVersion });
  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    customer_email: user.email ?? undefined,
    line_items: [{ price, quantity: 1 }],
    success_url: `${appUrl}/dashboard?upgraded=1`,
    cancel_url: `${appUrl}/pricing`,
    metadata: { user_id: user.id },
  });

  return NextResponse.json({ url: session.url });
}
