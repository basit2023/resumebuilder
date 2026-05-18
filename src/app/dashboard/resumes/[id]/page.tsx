import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { AppHeader } from "@/components/AppHeader";
import { ResumeEditor } from "@/components/editor/ResumeEditor";
import { OnboardingTour } from "@/components/OnboardingTour";
import type { Resume, ResumeData, TemplateId } from "@/lib/types";
import { emptyResume, normalizeSkills } from "@/lib/types";

export const dynamic = "force-dynamic";

const EDITOR_TOUR = [
  {
    title: "This is your resume editor ✏️",
    body: "Fill the form on the left — everything autosaves and previews live on the right. Quick tour of the key tools:",
  },
  {
    title: "1. Fill your sections",
    body: "Contact, summary, experience, skills, and more. Use the side nav to jump between sections. The ✦ buttons let Claude write or improve content for you.",
  },
  {
    title: "2. Pick a template & color",
    body: "Switch between Modern, Classic, Compact, or the drag-and-drop Custom canvas — and set a theme color — from the top toolbar.",
  },
  {
    title: "3. AI tools",
    body: "Paste a job description to tailor your resume, get an ATS match score, and generate a matching cover letter.",
  },
  {
    title: "4. Custom canvas (optional)",
    body: "Choose the Custom template for a Canva-style editor: drag blocks, add icons/images/shapes, double-click text to edit, and pick from ready-made layouts via ✨ Templates.",
  },
  {
    title: "5. Download when ready",
    body: "Export a clean, ATS-safe PDF or Word file from the toolbar. That's it — go land that interview! 🎯",
  },
];

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
      <OnboardingTour tourKey="editor-v1" steps={EDITOR_TOUR} startDelay={900} />
    </>
  );
}
