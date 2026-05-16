import { NextResponse } from "next/server";
import { z } from "zod";
import { complete } from "@/lib/anthropic";
import { createClient } from "@/lib/supabase/server";

const Body = z.object({
  bullet: z.string().min(1),
  role: z.string().optional(),
  company: z.string().optional(),
});

export async function POST(req: Request) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { bullet, role, company } = Body.parse(await req.json());

  const text = await complete({
    system: [
      "You rewrite resume bullets. Rules:",
      "- Start with a strong past-tense verb (Led, Shipped, Reduced, Built, Negotiated…).",
      "- Be specific. Quantify outcomes when plausible (%, $, users, time saved).",
      "- One sentence. <= 28 words.",
      "- No fluff (\"team player\", \"results-driven\").",
      "- Return ONLY the rewritten bullet text. No quotes, no preface.",
    ].join("\n"),
    user: `Rewrite this bullet${role ? ` (role: ${role}${company ? ` at ${company}` : ""})` : ""}:\n${bullet}`,
    maxTokens: 200,
  });

  return NextResponse.json({ text: text.replace(/^[-•*]\s*/, "").replace(/^["“]|["”]$/g, "") });
}
