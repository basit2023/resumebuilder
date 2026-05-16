# ResumeForge

AI-powered resume builder + on-demand expert review. Next.js 14, Supabase, Anthropic Claude, Stripe.

## What's in the box

- **Landing page** (`/`), **pricing** (`/pricing`), **expert review** (`/review`)
- **Auth** with Supabase (email + password)
- **Resume editor** with autosave, contact/summary/experience/education/skills/projects sections
- **3 PDF templates** rendered with `@react-pdf/renderer` — Modern, Classic, Compact — with a live in-browser preview
- **Claude-powered AI**:
  - Generate professional summary
  - Improve a single bullet
  - Tailor a whole resume to a job description (returns merged JSON)
- **PDF download** endpoint
- **Stripe** Pro subscription (Checkout + webhook) — wired but inert until you add keys
- **Expert review** request flow stored in Supabase, with status tracking

## Quick start (local)

### 1. Install

```bash
npm install
```

### 2. Configure environment

Copy and fill in:

```bash
cp .env.example .env.local
```

You need at minimum:

- `ANTHROPIC_API_KEY` — from [console.anthropic.com](https://console.anthropic.com) (you already have this)
- `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` — from [supabase.com](https://supabase.com) after creating a free project
- `SUPABASE_SERVICE_ROLE_KEY` — same Supabase project, "Service role" (server-only)

### 3. Set up the database

In Supabase Studio → SQL editor, paste and run [`supabase/schema.sql`](supabase/schema.sql). It creates:

- `profiles` (1-1 with `auth.users`)
- `resumes` (your resume documents, jsonb data)
- `review_requests` (expert review queue)
- Row-Level Security policies so users only see their own rows
- A trigger that auto-creates a profile on signup

### 4. Run

```bash
npm run dev
```

Open http://localhost:3000.

## Project structure

```
src/
├── app/
│   ├── page.tsx                       Landing
│   ├── pricing/                       Public pricing
│   ├── login/  signup/  logout/       Auth
│   ├── dashboard/                     Authed dashboard + editor
│   │   └── resumes/[id]/page.tsx      Editor page
│   ├── review/                        Expert review request page
│   └── api/
│       ├── resumes/                   CRUD + PDF export
│       ├── ai/                        generate-summary, improve-bullet, tailor-jd
│       ├── review/                    Submit review request
│       └── stripe/                    checkout, webhook
├── components/
│   ├── editor/                        ResumeEditor, LivePreview, AIButton
│   ├── templates/                     ModernTemplate, ClassicTemplate, CompactTemplate
│   ├── SiteHeader.tsx
│   └── AppHeader.tsx
├── lib/
│   ├── anthropic.ts                   Claude SDK wrapper (model: claude-opus-4-7)
│   ├── supabase/                      client / server / middleware
│   ├── types.ts                       ResumeData shape
│   └── utils.ts
└── middleware.ts                      Protects /dashboard and /review
```

## Turning on Stripe (paid plans)

1. In [Stripe Dashboard](https://dashboard.stripe.com), create a **recurring price** ($9/mo).
2. Add to `.env.local`:
   - `STRIPE_SECRET_KEY=sk_test_…`
   - `NEXT_PUBLIC_STRIPE_PRICE_PRO=price_…`
3. For local webhook testing: `stripe listen --forward-to localhost:3000/api/stripe/webhook` — paste the printed signing secret into `STRIPE_WEBHOOK_SECRET`.
4. Create a "Subscribe" button that POSTs to `/api/stripe/checkout`, then `window.location = response.url`.

The webhook handler flips `profiles.plan` between `free` and `pro`. Gate features by reading that column.

## Deploying to Vercel

1. Push the repo to GitHub.
2. In Vercel → New Project → import. Framework = Next.js.
3. Add the same env vars from `.env.local`. Set `NEXT_PUBLIC_APP_URL` to your Vercel URL.
4. Deploy. The PDF route is Node runtime (configured in `route.tsx`), which Vercel supports out of the box.

In Supabase → Auth → URL Configuration: add your Vercel URL to **Site URL** and **Redirect URLs**.

## Roadmap (next 30 days)

| Priority | Feature | Why |
|---|---|---|
| P0 | Plan gating (free = 1 resume / 10 AI calls/mo; pro = unlimited) | Monetization |
| P0 | Cover-letter generator from a resume + JD | Highest-asked add-on |
| P0 | Email transactional flow (welcome, review delivered) — Resend | Retention |
| P1 | Admin panel for reviewers (queue, deliver feedback) | Operate review side |
| P1 | ATS keyword score against a JD (Claude scores 0–100 + gap list) | Conversion |
| P1 | Import LinkedIn PDF → parse into ResumeData (Claude) | Onboarding speed |
| P2 | Public share link (`/r/<slug>`) for the live HTML preview | Virality |
| P2 | More templates (5 → 8) | Pro plan stickiness |
| P2 | React Native shell that reuses `src/lib/types.ts` + API | Mobile reach |

## Marketing levers (cheap → expensive)

1. **SEO landing pages** — one page per role (`/resume/software-engineer`, `/resume/product-manager`, ~30 roles). Build with the same Tailwind components; the JD-tailoring demo is the hook.
2. **Reddit** — r/resumes, r/cscareerquestions. Show before/after, never spam.
3. **TikTok/Reels** — 15s screen recordings of the "paste JD → tailored resume" flow. Highest organic ceiling.
4. **University career centers** — cold email 50 career-services managers with a free-for-students code. This is the "corporate partnership" lever from the brief.
5. **Affiliate** — pay $5 per Pro signup, ship through Rewardful or hand-rolled.

## Cost model (rough)

- Claude Opus 4.7: a tailor-JD call is ~3k input + 2k output tokens ≈ a few cents. A heavy Pro user might cost $0.30/mo in inference.
- Supabase free tier: 500MB / 2GB egress — fine until ~5k users.
- Vercel hobby: free; switch to Pro at ~100GB-hr.
- Stripe: 2.9% + 30¢/transaction. At $9 Pro, you keep ~$8.45.

Break-even at roughly **40 paying users**. The expert-review tier ($49) is the high-margin lever — pay a reviewer $20/review, keep $29.

## License

Private. You're building this as a product, not OSS.
