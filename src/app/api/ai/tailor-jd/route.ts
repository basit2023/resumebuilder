import { NextResponse } from "next/server";
import { z } from "zod";
import { complete } from "@/lib/anthropic";
import { createClient } from "@/lib/supabase/server";

const Body = z.object({
  resume: z.any(),
  jobDescription: z.string().min(20),
});

export async function POST(req: Request) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { resume, jobDescription } = Body.parse(await req.json());

  const raw = await complete({
    system: [
      "You tailor resumes to job descriptions. You output ONLY a JSON object that matches the input resume's shape exactly.",
      "Rules:",
      "- Preserve the exact JSON shape (contact, summary, experience[], education[], skills[], projects[]).",
      "- Do NOT fabricate experience, employers, dates, or degrees. Never invent facts.",
      "- Rewrite the `summary` to align with the JD.",
      "- Rewrite existing bullets to emphasize JD-relevant work; keep them truthful.",
      "- Reorder/augment `skills` so JD-relevant skills come first; only add a skill if the resume already implies it.",
      "- Return the JSON object only — no markdown fences, no commentary.",
    ].join("\n"),
    user: `Job description:\n${jobDescription}\n\nResume JSON:\n${JSON.stringify(resume)}`,
    maxTokens: 3000,
  });

  const cleaned = raw.replace(/^```(?:json)?/i, "").replace(/```$/i, "").trim();
  let next;
  try {
    next = JSON.parse(cleaned);
  } catch {
    return NextResponse.json({ error: "AI returned invalid JSON. Try again." }, { status: 502 });
  }

  // Merge to be safe — only overwrite known fields.
  const merged = {
    ...resume,
    summary: typeof next.summary === "string" ? next.summary : resume.summary,
    experience: Array.isArray(next.experience) ? next.experience : resume.experience,
    skills: Array.isArray(next.skills) ? next.skills : resume.skills,
  };

  return NextResponse.json({ data: merged });
}
