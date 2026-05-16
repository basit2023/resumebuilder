import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createServerClient } from "@supabase/ssr";

// Verifies Stripe webhook events and flips the user's `plan` column.
// Configure STRIPE_WEBHOOK_SECRET and point Stripe at /api/stripe/webhook.

export const runtime = "nodejs";

export async function POST(req: Request) {
  const secret = process.env.STRIPE_SECRET_KEY;
  const wh = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret || !wh) {
    return NextResponse.json({ error: "Stripe not configured" }, { status: 501 });
  }

  const stripe = new Stripe(secret, { apiVersion: "2024-11-20.acacia" as Stripe.LatestApiVersion });
  const sig = req.headers.get("stripe-signature") ?? "";
  const raw = await req.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(raw, sig, wh);
  } catch (err) {
    return NextResponse.json({ error: `Bad signature` }, { status: 400 });
  }

  // Use service role to bypass RLS for plan writes.
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { cookies: { get: () => undefined, set: () => {}, remove: () => {} } }
  );

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const userId = session.metadata?.user_id;
    if (userId) {
      await supabase.from("profiles").update({ plan: "pro", stripe_customer_id: String(session.customer) }).eq("id", userId);
    }
  }

  if (event.type === "customer.subscription.deleted") {
    const sub = event.data.object as Stripe.Subscription;
    await supabase.from("profiles").update({ plan: "free" }).eq("stripe_customer_id", String(sub.customer));
  }

  return NextResponse.json({ received: true });
}
