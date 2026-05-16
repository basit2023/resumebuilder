import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY || "" });

export async function POST(req: Request) {
  try {
    const { resume } = await req.json();

    const response = await anthropic.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 4000,
      system: "You are an expert career coach and resume writer. Your task is to polish and optimize a user's resume data to make it more professional, impactful, and clear. Focus on using action verbs, quantifying achievements, and ensuring consistent tone. Return the exact JSON structure provided, but with improved text fields (summary, experience bullets, project descriptions, awards, etc.). DO NOT change the structure or IDs.",
      messages: [
        {
          role: "user",
          content: `Optimize this resume data for maximum impact. Keep it professional and concise. Return ONLY the JSON object.
          
          Resume Data:
          ${JSON.stringify(resume)}`
        }
      ],
    });

    const content = response.content[0].type === 'text' ? response.content[0].text : '';
    const cleanJson = content.replace(/```json|```/g, "").trim();
    const optimizedData = JSON.parse(cleanJson);

    return NextResponse.json({ data: optimizedData });
  } catch (error: any) {
    console.error("Optimization error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
