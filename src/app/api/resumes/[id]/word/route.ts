import { NextResponse } from "next/server";
import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType } from "docx";
import { createClient } from "@/lib/supabase/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = createClient();
    const { data: resume, error } = await supabase
      .from("resumes")
      .select("*")
      .eq("id", params.id)
      .single();

    if (error || !resume) return new NextResponse("Not found", { status: 404 });

    const data = resume.data ?? {};
    const {
      contact = {},
      summary = "",
      experience = [],
      education = [],
      skills = [],
      languages = [],
      awards = [],
    } = data;

    // Create Word Document
    const doc = new Document({
      sections: [
        {
          properties: {},
          children: [
            // Header
            new Paragraph({
              text: contact.fullName || "Your Name",
              heading: HeadingLevel.HEADING_1,
              alignment: AlignmentType.CENTER,
            }),
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [
                new TextRun({
                  text: `${contact.email} | ${contact.phone} | ${contact.location}`,
                  size: 20,
                }),
              ],
            }),
            new Paragraph({ text: "", spacing: { before: 200 } }),

            // Summary
            ...(summary ? [
              new Paragraph({ text: "SUMMARY", heading: HeadingLevel.HEADING_2 }),
              new Paragraph({ text: summary, spacing: { after: 200 } }),
            ] : []),

            // Experience
            new Paragraph({ text: "EXPERIENCE", heading: HeadingLevel.HEADING_2 }),
            ...experience.flatMap((exp: any) => [
              new Paragraph({
                children: [
                  new TextRun({ text: exp.role, bold: true }),
                  new TextRun({ text: `\t${exp.startDate} - ${exp.current ? "Present" : exp.endDate}`, italics: true }),
                ],
              }),
              new Paragraph({ text: exp.company, spacing: { after: 100 } }),
              ...exp.bullets.map((bullet: string) => 
                new Paragraph({ text: bullet, bullet: { level: 0 } })
              ),
              new Paragraph({ text: "", spacing: { after: 100 } }),
            ]),

            // Education
            new Paragraph({ text: "EDUCATION", heading: HeadingLevel.HEADING_2 }),
            ...education.flatMap((ed: any) => [
              new Paragraph({
                children: [
                  new TextRun({ text: ed.school, bold: true }),
                  new TextRun({ text: `\t${ed.startDate} - ${ed.endDate}`, italics: true }),
                ],
              }),
              new Paragraph({ text: `${ed.degree} in ${ed.field}`, spacing: { after: 200 } }),
            ]),

            // Skills
            new Paragraph({ text: "SKILLS", heading: HeadingLevel.HEADING_2 }),
            new Paragraph({
              text: skills.map((s: { name?: string; level?: number } | string) =>
                typeof s === "string" ? s : (s.level ? `${s.name} (${s.level}/5)` : (s.name ?? ""))
              ).join(", "),
              spacing: { after: 200 },
            }),

            // Languages
            ...(languages?.length ? [
              new Paragraph({ text: "LANGUAGES", heading: HeadingLevel.HEADING_2 }),
              new Paragraph({ text: languages.map((l: any) => `${l.language} (${l.proficiency})`).join(", "), spacing: { after: 200 } }),
            ] : []),

            // Awards
            ...(awards?.length ? [
              new Paragraph({ text: "AWARDS", heading: HeadingLevel.HEADING_2 }),
              ...awards.map((a: any) => new Paragraph({ text: `${a.title} - ${a.issuer} (${a.date})`, spacing: { after: 100 } })),
            ] : []),
          ],
        },
      ],
    });

    const buffer = await Packer.toBuffer(doc);
    const body = new Uint8Array(buffer);

    return new NextResponse(body, {
      headers: {
        "Content-Type": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "Content-Disposition": `attachment; filename="${resume.title || "resume"}.docx"`,
      },
    });
  } catch (error: any) {
    console.error("Word export error:", error);
    return new NextResponse(error.message, { status: 500 });
  }
}
