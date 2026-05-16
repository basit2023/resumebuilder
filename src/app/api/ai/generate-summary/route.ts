import { NextResponse } from "next/server";
import { z } from "zod";
import { complete } from "@/lib/anthropic";
import { createClient } from "@/lib/supabase/server";

const Body = z.object({
  resume: z.object({
    contact: z.object({
      title: z.string().optional(),
      fullName: z.string().optional(),
    }).passthrough(),
    experience: z.array(z.any()).default([]),
    skills: z.array(z.string()).default([]),
  }).passthrough(),
});

export async function POST(req: Request) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  let parsed;
  try {
    parsed = Body.parse(await req.json());
  } catch (e) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const r = parsed.resume;
  const context = JSON.stringify({
    title: r.contact.title,
    skills: r.skills,
    experience: r.experience,
  });

  const text = await complete({
    system:
      "You write professional resume summaries. Output 2-3 tight sentences in first person voice (no 'I'), specific, quantified where possible, no clichés like 'results-driven' or 'team player'. No leading label. Just the prose.",
    user: `Write a strong professional summary for this candidate. Source data:\n${context}`,
    maxTokens: 300,
  });

  return NextResponse.json({ text });
}
