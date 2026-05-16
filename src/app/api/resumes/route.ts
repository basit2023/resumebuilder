import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { emptyResume } from "@/lib/types";

export async function POST() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { data, error } = await supabase
    .from("resumes")
    .insert({
      user_id: user.id,
      title: "Untitled resume",
      template: "modern",
      data: emptyResume,
    })
    .select("id")
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ id: data.id });
}
