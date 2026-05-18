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
    body: "Fill the form, everything autosaves, and it previews live. Here's a 60-second tour of each control — watch the highlight.",
  },
  {
    selector: '[data-tour="resume-name"]',
    placement: "bottom" as const,
    title: "Name your resume",
    body: "Click here to rename it (e.g. \"Google – Frontend\"). Keep a separate resume per job you target.",
  },
  {
    selector: '[data-tour="section-nav"]',
    placement: "right" as const,
    title: "Jump between sections",
    body: "Use this side menu to move through Contact, Summary, Experience, Skills, Projects and more. Fill them in the form — the ✦ buttons let Claude write or improve any field.",
  },
  {
    selector: '[data-tour="template-switcher"]',
    placement: "bottom" as const,
    title: "Switch template",
    body: "Modern, Classic and Compact are ready-made. \"Custom\" opens a Canva-style drag-and-drop canvas where you place every block yourself.",
  },
  {
    selector: '[data-tour="color-picker"]',
    placement: "bottom" as const,
    title: "Theme color",
    body: "Recolor accents (headings, lines, links) instantly. Pick a swatch or enter any hex.",
  },
  {
    selector: '#section-ai-tools',
    placement: "top" as const,
    title: "AI tools",
    body: "Paste a job description here to tailor your resume to it, get an ATS match score, and generate a matching cover letter — all powered by Claude.",
  },
  {
    selector: '[data-tour="smart-polish"]',
    placement: "bottom" as const,
    title: "One-click AI polish",
    body: "Let Claude rewrite and tighten your whole resume in one go. Great as a finishing pass.",
  },
  {
    selector: '[data-tour="download"]',
    placement: "bottom" as const,
    title: "Download when ready",
    body: "Export a clean, ATS-safe PDF (or Word). That's it — go land that interview! 🎯",
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
