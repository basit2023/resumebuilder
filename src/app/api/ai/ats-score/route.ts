import { NextResponse } from "next/server";
import { z } from "zod";
import { complete } from "@/lib/anthropic";
import { createClient } from "@/lib/supabase/server";

const Body = z.object({
  resume: z.any(),
  jobDescription: z.string().min(20),
});

const Result = z.object({
  score: z.number().min(0).max(100),
  strengths: z.array(z.string()).max(8),
  gaps: z.array(z.string()).max(8),
  missingKeywords: z.array(z.string()).max(15),
});

export async function POST(req: Request) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { resume, jobDescription } = Body.parse(await req.json());

  const raw = await complete({
    system: [
      "You are a senior tech recruiter and ATS expert. Given a candidate's resume JSON and a job description, score the match.",
      "Output ONLY a JSON object with this exact shape:",
      `{ "score": <0-100 integer>, "strengths": [<up to 6 short bullets>], "gaps": [<up to 6 short bullets>], "missingKeywords": [<up to 12 keywords from the JD missing in the resume>] }`,
      "Scoring rubric:",
      "- 80–100: strong alignment, ready to apply",
      "- 60–79: viable, needs targeted tweaks",
      "- 40–59: significant rework needed",
      "- 0–39: poor fit",
      "No commentary outside the JSON. No code fences.",
    ].join("\n"),
    user: `Job description:\n${jobDescription}\n\nResume JSON:\n${JSON.stringify(resume)}`,
    maxTokens: 1500,
  });

  const cleaned = raw.replace(/^```(?:json)?/i, "").replace(/```$/i, "").trim();
  let parsed;
  try {
    parsed = Result.parse(JSON.parse(cleaned));
  } catch {
    return NextResponse.json({ error: "AI returned an invalid response. Try again." }, { status: 502 });
  }

  return NextResponse.json(parsed);
}
