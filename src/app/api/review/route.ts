import { NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";

const Body = z.object({
  resumeId: z.string().uuid(),
  notes: z.string().max(2000).optional(),
});

export async function POST(req: Request) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { resumeId, notes } = Body.parse(await req.json());

  const { error } = await supabase.from("review_requests").insert({
    user_id: user.id,
    resume_id: resumeId,
    notes: notes ?? null,
    status: "pending",
  });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  // TODO (production): trigger email/Slack to the reviewer queue here.
  return NextResponse.json({ ok: true });
}
