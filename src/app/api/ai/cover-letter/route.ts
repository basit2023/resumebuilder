import { NextResponse } from "next/server";
import { z } from "zod";
import { complete } from "@/lib/anthropic";
import { createClient } from "@/lib/supabase/server";

const Body = z.object({
  resume: z.any(),
  jobDescription: z.string().min(20),
  companyName: z.string().optional(),
  tone: z.enum(["confident", "warm", "concise", "enthusiastic"]).default("confident"),
});

export async function POST(req: Request) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { resume, jobDescription, companyName, tone } = Body.parse(await req.json());

  const text = await complete({
    system: [
      "You write cover letters that hiring managers actually want to read.",
      "Rules:",
      "- 3-4 short paragraphs. No more than ~280 words total.",
      `- Tone: ${tone}. No clichés ("I am writing to express my interest…").`,
      "- Open with a specific hook tied to the company or role.",
      "- Middle: 2-3 concrete proof points from the resume that match the JD. Quantify.",
      "- Close with a forward-looking line — not a thank-you wall.",
      "- Plain prose. No headers. No bullet points. No salutation/sign-off (we render those).",
    ].join("\n"),
    user: `Company: ${companyName ?? "(unspecified)"}\n\nJob description:\n${jobDescription}\n\nCandidate resume JSON:\n${JSON.stringify(resume)}`,
    maxTokens: 800,
  });

  return NextResponse.json({ text });
}
