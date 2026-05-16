import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { AppHeader } from "@/components/AppHeader";
import { ResumeEditor } from "@/components/editor/ResumeEditor";
import type { Resume, ResumeData, TemplateId } from "@/lib/types";
import { emptyResume, normalizeSkills } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function ResumePage({ params }: { params: { id: string } }) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data } = await supabase
    .from("resumes")
    .select("*")
    .eq("id", params.id)
    .single();

  if (!data) notFound();

  const rawData = (data.data ?? {}) as Partial<ResumeData> & { skills?: unknown };
  const resume: Resume = {
    id: data.id,
    user_id: data.user_id,
    title: data.title,
    template: (data.template ?? "modern") as TemplateId,
    data: {
      ...emptyResume,
      ...(rawData as ResumeData),
      skills: normalizeSkills(rawData.skills),
    },
    created_at: data.created_at,
    updated_at: data.updated_at,
  };

  return (
    <>
      <AppHeader email={user.email} />
      <ResumeEditor initial={resume} />
    </>
  );
}
