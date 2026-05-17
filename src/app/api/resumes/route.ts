import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { emptyResume } from "@/lib/types";
import { sampleResumeDataForPreset, TEMPLATE_PRESETS } from "@/lib/templatePresets";

export async function POST(req: Request) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  // Optional: start from a shared template preset.
  let presetId: string | undefined;
  try {
    const body = await req.json();
    presetId = typeof body?.presetId === "string" ? body.presetId : undefined;
  } catch {
    /* no body — blank resume */
  }

  const preset = presetId ? TEMPLATE_PRESETS.find((p) => p.id === presetId) : undefined;

  const data = preset ? sampleResumeDataForPreset(preset) : emptyResume;

  const { data: row, error } = await supabase
    .from("resumes")
    .insert({
      user_id: user.id,
      title: preset ? `${preset.name} sample (${preset.countryCode})` : "Untitled resume",
      template: preset ? "custom" : "modern",
      data,
    })
    .select("id")
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ id: row.id });
}
