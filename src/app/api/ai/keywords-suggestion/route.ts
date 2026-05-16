import { NextResponse } from "next/server";
import { z } from "zod";
import { complete } from "@/lib/anthropic";
import { createClient } from "@/lib/supabase/server";

const Body = z.object({
  jobTitle: z.string().min(2),
  industry: z.string().optional(),
  experience: z.string().optional(),
});

const Result = z.object({
  technicalSkills: z.array(z.string()),
  softSkills: z.array(z.string()),
  certifications: z.array(z.string()),
  tools: z.array(z.string()),
  actionVerbs: z.array(z.string()),
  industryKeywords: z.array(z.string()),
});

export async function POST(req: Request) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { jobTitle, industry, experience } = Body.parse(await req.json());

  const raw = await complete({
    system: [
      "You are an HR expert and ATS specialist. Generate industry-specific keywords and suggestions for a job title.",
      "Output ONLY a JSON object with this exact shape:",
      `{ "technicalSkills": [<top 8 technical skills for this role>], "softSkills": [<top 6 soft skills>], "certifications": [<top 5 relevant certifications>], "tools": [<top 8 tools/software>], "actionVerbs": [<top 12 strong action verbs for job descriptions>], "industryKeywords": [<top 10 ATS-friendly keywords>] }`,
      "- Tailor suggestions to the specific job title and experience level",
      "- Focus on in-demand skills and ATS-friendly keywords",
      "- Include current industry best practices",
      "- Prioritize keywords that appear frequently in job postings",
      "No commentary outside the JSON. No code fences.",
    ].join("\n"),
    user: `Job Title: ${jobTitle}${industry ? `\nIndustry: ${industry}` : ""}${experience ? `\nExperience Level: ${experience}` : ""}`,
    maxTokens: 2000,
  });

  const cleaned = raw.replace(/^```(?:json)?/i, "").replace(/```$/i, "").trim();
  let parsed;
  try {
    parsed = Result.parse(JSON.parse(cleaned));
  } catch {
    console.error("Parse error:", cleaned);
    return NextResponse.json({ error: "AI returned an invalid response. Try again." }, { status: 502 });
  }

  return NextResponse.json(parsed);
}
