// ─────────────────────────────────────────────────────────────
//  Feature flags
// ─────────────────────────────────────────────────────────────
//
//  BILLING_ENABLED:
//    false → all features are free, no payment UI shown anywhere,
//            Stripe endpoints refuse to start checkout.
//            (Early-access / user-acquisition mode.)
//    true  → pricing plans + Stripe checkout are live again.
//
//  To turn paid plans back on later: set this to `true`,
//  make sure STRIPE_SECRET_KEY / NEXT_PUBLIC_STRIPE_PRICE_PRO
//  / STRIPE_WEBHOOK_SECRET are in .env.local, and redeploy.
//
export const BILLING_ENABLED = false;
