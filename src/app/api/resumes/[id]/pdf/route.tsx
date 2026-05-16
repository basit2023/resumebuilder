import { NextResponse } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";
import { createClient } from "@/lib/supabase/server";
import { ResumeDocument } from "@/components/templates/ResumeDocument";
import type { ResumeData, TemplateId } from "@/lib/types";
import { emptyResume } from "@/lib/types";

export const runtime = "nodejs";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { data, error } = await supabase
    .from("resumes")
    .select("title, template, data")
    .eq("id", params.id)
    .eq("user_id", user.id)
    .single();

  if (error || !data) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const url = new URL(req.url);
  const overrideTemplate = url.searchParams.get("template") as TemplateId | null;
  const template = (overrideTemplate ?? (data.template as TemplateId) ?? "modern") as TemplateId;
  const resumeData: ResumeData = { ...emptyResume, ...(data.data as ResumeData) };

  const buf = await renderToBuffer(<ResumeDocument data={resumeData} template={template} />);
  const safeName = (data.title || "resume").replace(/[^a-z0-9-_]+/gi, "_");
  const body = new Uint8Array(buf);

  return new NextResponse(body, {
    status: 200,
    headers: {
      "content-type": "application/pdf",
      "content-disposition": `attachment; filename="${safeName}.pdf"`,
      "cache-control": "no-store",
    },
  });
}
