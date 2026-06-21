import type { CustomBlock, CustomBlockType, CustomLayout, ResumeData } from "./types";
import { uid } from "./utils";

export type TemplatePreset = {
  id: string;
  slug: string;
  name: string;
  description: string;
  seoTitle: string;
  seoDescription: string;
  shortDescription: string;
  longDescription: string;
  bestFor: string[];
  features: string[];
  faq: { question: string; answer: string }[];
  category: string;
  country: string;
  countryCode: string;
  format: string;
  accent: string;
  build: () => CustomLayout;
};

function b(type: CustomBlockType, p: Partial<CustomBlock>): CustomBlock {
  return {
    id: uid(),
    type,
    x: 48,
    y: 48,
    width: 300,
    height: 60,
    fontSize: 11,
    fontWeight: "normal",
    align: "left",
    color: "#111827",
    ...p,
  };
}

function classicPro(): CustomLayout {
  const a = "#2854ef";
  return {
    blocks: [
      b("name", { x: 48, y: 44, width: 720, height: 46, fontSize: 30, fontWeight: "bold" }),
      b("title", { x: 48, y: 92, width: 720, height: 22, fontSize: 14, color: a }),
      b("contactLine", { x: 48, y: 118, width: 720, height: 20, fontSize: 10.5, color: "#4b5563" }),
      b("shape", { x: 48, y: 150, width: 720, height: 2, shapeKind: "line", backgroundColor: a }),
      b("heading", { x: 48, y: 168, width: 720, height: 20, fontSize: 12, fontWeight: "bold", color: a, text: "SUMMARY" }),
      b("summary", { x: 48, y: 192, width: 720, height: 60, fontSize: 11 }),
      b("heading", { x: 48, y: 268, width: 720, height: 20, fontSize: 12, fontWeight: "bold", color: a, text: "EXPERIENCE" }),
      b("experience", { x: 48, y: 292, width: 720, height: 356, fontSize: 11 }),
      b("heading", { x: 48, y: 668, width: 340, height: 20, fontSize: 12, fontWeight: "bold", color: a, text: "EDUCATION" }),
      b("education", { x: 48, y: 692, width: 340, height: 150, fontSize: 11 }),
      b("heading", { x: 428, y: 668, width: 340, height: 20, fontSize: 12, fontWeight: "bold", color: a, text: "SKILLS" }),
      b("skills", { x: 428, y: 692, width: 340, height: 150, fontSize: 11 }),
    ],
  };
}

function tealSidebar(): CustomLayout {
  const side = "#0f766e";
  return {
    blocks: [
      b("shape", { x: 0, y: 0, width: 280, height: 1056, shapeKind: "rect", backgroundColor: side }),
      b("photo", { x: 70, y: 56, width: 140, height: 140, photoShape: "circle" }),
      b("name", { x: 24, y: 214, width: 232, height: 48, fontSize: 22, fontWeight: "bold", color: "#ffffff", align: "center" }),
      b("title", { x: 24, y: 262, width: 232, height: 36, fontSize: 12, color: "#99f6e4", align: "center" }),
      b("heading", { x: 32, y: 326, width: 216, height: 18, fontSize: 11, fontWeight: "bold", color: "#ffffff", text: "CONTACT" }),
      b("contactLine", { x: 32, y: 348, width: 216, height: 118, fontSize: 9.5, color: "#ccfbf1" }),
      b("heading", { x: 32, y: 486, width: 216, height: 18, fontSize: 11, fontWeight: "bold", color: "#ffffff", text: "SKILLS" }),
      b("skills", { x: 32, y: 508, width: 216, height: 240, fontSize: 10, color: "#ccfbf1" }),
      b("heading", { x: 320, y: 60, width: 448, height: 20, fontSize: 13, fontWeight: "bold", color: side, text: "PROFILE" }),
      b("summary", { x: 320, y: 86, width: 448, height: 80, fontSize: 11 }),
      b("heading", { x: 320, y: 188, width: 448, height: 20, fontSize: 13, fontWeight: "bold", color: side, text: "EXPERIENCE" }),
      b("experience", { x: 320, y: 214, width: 448, height: 480, fontSize: 11 }),
      b("heading", { x: 320, y: 710, width: 448, height: 20, fontSize: 13, fontWeight: "bold", color: side, text: "EDUCATION" }),
      b("education", { x: 320, y: 736, width: 448, height: 280, fontSize: 11 }),
    ],
  };
}

function boldHeader(): CustomLayout {
  const a = "#7c3aed";
  return {
    blocks: [
      b("shape", { x: 0, y: 0, width: 816, height: 168, shapeKind: "rect", backgroundColor: a }),
      b("name", { x: 48, y: 44, width: 560, height: 44, fontSize: 30, fontWeight: "bold", color: "#ffffff" }),
      b("title", { x: 48, y: 92, width: 560, height: 22, fontSize: 14, color: "#ddd6fe" }),
      b("contactLine", { x: 48, y: 122, width: 720, height: 20, fontSize: 10, color: "#ede9fe" }),
      b("heading", { x: 48, y: 200, width: 720, height: 20, fontSize: 12, fontWeight: "bold", color: a, text: "SUMMARY" }),
      b("summary", { x: 48, y: 224, width: 720, height: 64, fontSize: 11 }),
      b("heading", { x: 48, y: 304, width: 720, height: 20, fontSize: 12, fontWeight: "bold", color: a, text: "EXPERIENCE" }),
      b("experience", { x: 48, y: 328, width: 720, height: 380, fontSize: 11 }),
      b("heading", { x: 48, y: 724, width: 340, height: 20, fontSize: 12, fontWeight: "bold", color: a, text: "EDUCATION" }),
      b("education", { x: 48, y: 748, width: 340, height: 260, fontSize: 11 }),
      b("heading", { x: 428, y: 724, width: 340, height: 20, fontSize: 12, fontWeight: "bold", color: a, text: "SKILLS" }),
      b("skills", { x: 428, y: 748, width: 340, height: 260, fontSize: 11 }),
    ],
  };
}

function minimal(): CustomLayout {
  return {
    blocks: [
      b("name", { x: 48, y: 80, width: 720, height: 50, fontSize: 34, fontWeight: "bold", align: "center" }),
      b("title", { x: 48, y: 134, width: 720, height: 24, fontSize: 14, color: "#6b7280", align: "center" }),
      b("contactLine", { x: 48, y: 164, width: 720, height: 20, fontSize: 10.5, color: "#6b7280", align: "center" }),
      b("shape", { x: 308, y: 200, width: 200, height: 2, shapeKind: "line", backgroundColor: "#d1d5db" }),
      b("summary", { x: 108, y: 224, width: 600, height: 70, fontSize: 11, align: "center" }),
      b("heading", { x: 108, y: 320, width: 600, height: 20, fontSize: 12, fontWeight: "bold", text: "EXPERIENCE", align: "center" }),
      b("experience", { x: 108, y: 348, width: 600, height: 380, fontSize: 11 }),
      b("heading", { x: 108, y: 744, width: 280, height: 20, fontSize: 12, fontWeight: "bold", text: "EDUCATION" }),
      b("education", { x: 108, y: 770, width: 280, height: 240, fontSize: 11 }),
      b("heading", { x: 428, y: 744, width: 280, height: 20, fontSize: 12, fontWeight: "bold", text: "SKILLS" }),
      b("skills", { x: 428, y: 770, width: 280, height: 240, fontSize: 11 }),
    ],
  };
}

function accentSplit(): CustomLayout {
  const a = "#b45309";
  return {
    blocks: [
      b("name", { x: 48, y: 50, width: 500, height: 42, fontSize: 28, fontWeight: "bold" }),
      b("title", { x: 48, y: 94, width: 500, height: 22, fontSize: 13, color: a }),
      b("photo", { x: 660, y: 44, width: 108, height: 108, photoShape: "rounded" }),
      b("shape", { x: 48, y: 132, width: 720, height: 3, shapeKind: "line", backgroundColor: a }),
      b("contactLine", { x: 48, y: 146, width: 720, height: 20, fontSize: 10, color: "#6b7280" }),
      b("heading", { x: 48, y: 188, width: 460, height: 20, fontSize: 12, fontWeight: "bold", color: a, text: "SUMMARY" }),
      b("summary", { x: 48, y: 212, width: 460, height: 90, fontSize: 11 }),
      b("heading", { x: 48, y: 320, width: 460, height: 20, fontSize: 12, fontWeight: "bold", color: a, text: "EXPERIENCE" }),
      b("experience", { x: 48, y: 344, width: 460, height: 660, fontSize: 11 }),
      b("shape", { x: 540, y: 188, width: 228, height: 816, shapeKind: "rect", backgroundColor: "#fef3c7", borderRadius: 10 }),
      b("heading", { x: 560, y: 206, width: 188, height: 20, fontSize: 11, fontWeight: "bold", color: a, text: "SKILLS" }),
      b("skills", { x: 560, y: 230, width: 188, height: 320, fontSize: 10 }),
      b("heading", { x: 560, y: 566, width: 188, height: 20, fontSize: 11, fontWeight: "bold", color: a, text: "EDUCATION" }),
      b("education", { x: 560, y: 590, width: 188, height: 400, fontSize: 10 }),
    ],
  };
}

function atsOnePage(): CustomLayout {
  const a = "#1f2937";
  return {
    blocks: [
      b("name", { x: 54, y: 42, width: 708, height: 38, fontSize: 28, fontWeight: "bold", align: "center" }),
      b("contactLine", { x: 54, y: 86, width: 708, height: 18, fontSize: 9.5, color: "#4b5563", align: "center" }),
      b("shape", { x: 54, y: 120, width: 708, height: 1, shapeKind: "line", backgroundColor: "#9ca3af", opacity: 0.8 }),
      b("heading", { x: 54, y: 140, width: 708, height: 18, fontSize: 11, fontWeight: "bold", color: a, text: "PROFESSIONAL SUMMARY" }),
      b("summary", { x: 54, y: 164, width: 708, height: 62, fontSize: 10.5 }),
      b("heading", { x: 54, y: 244, width: 708, height: 18, fontSize: 11, fontWeight: "bold", color: a, text: "WORK EXPERIENCE" }),
      b("experience", { x: 54, y: 268, width: 708, height: 430, fontSize: 10.5 }),
      b("heading", { x: 54, y: 716, width: 708, height: 18, fontSize: 11, fontWeight: "bold", color: a, text: "PROJECTS" }),
      b("projects", { x: 54, y: 740, width: 708, height: 90, fontSize: 10.5 }),
      b("heading", { x: 54, y: 850, width: 320, height: 18, fontSize: 11, fontWeight: "bold", color: a, text: "EDUCATION" }),
      b("education", { x: 54, y: 874, width: 320, height: 110, fontSize: 10.5 }),
      b("heading", { x: 416, y: 850, width: 346, height: 18, fontSize: 11, fontWeight: "bold", color: a, text: "SKILLS" }),
      b("skills", { x: 416, y: 874, width: 346, height: 110, fontSize: 10.5 }),
    ],
  };
}

function executiveSlate(): CustomLayout {
  const a = "#334155";
  const gold = "#c0842d";
  return {
    blocks: [
      b("shape", { x: 0, y: 0, width: 816, height: 132, shapeKind: "rect", backgroundColor: a }),
      b("shape", { x: 0, y: 132, width: 816, height: 6, shapeKind: "rect", backgroundColor: gold }),
      b("name", { x: 52, y: 38, width: 520, height: 42, fontSize: 30, fontWeight: "bold", color: "#ffffff" }),
      b("title", { x: 52, y: 84, width: 520, height: 20, fontSize: 13, color: "#e2e8f0" }),
      b("contactLine", { x: 52, y: 110, width: 708, height: 18, fontSize: 9.5, color: "#f8fafc" }),
      b("heading", { x: 52, y: 178, width: 708, height: 20, fontSize: 12, fontWeight: "bold", color: gold, text: "EXECUTIVE PROFILE" }),
      b("summary", { x: 52, y: 204, width: 708, height: 70, fontSize: 11 }),
      b("heading", { x: 52, y: 300, width: 708, height: 20, fontSize: 12, fontWeight: "bold", color: gold, text: "LEADERSHIP EXPERIENCE" }),
      b("experience", { x: 52, y: 326, width: 708, height: 430, fontSize: 11 }),
      b("shape", { x: 52, y: 784, width: 708, height: 1, shapeKind: "line", backgroundColor: "#cbd5e1" }),
      b("heading", { x: 52, y: 812, width: 320, height: 20, fontSize: 12, fontWeight: "bold", color: gold, text: "EDUCATION" }),
      b("education", { x: 52, y: 838, width: 320, height: 140, fontSize: 11 }),
      b("heading", { x: 416, y: 812, width: 344, height: 20, fontSize: 12, fontWeight: "bold", color: gold, text: "CORE STRENGTHS" }),
      b("skills", { x: 416, y: 838, width: 344, height: 140, fontSize: 11 }),
    ],
  };
}

function productModern(): CustomLayout {
  const a = "#0ea5e9";
  const ink = "#0f172a";
  return {
    blocks: [
      b("shape", { x: 36, y: 36, width: 744, height: 118, shapeKind: "rect", backgroundColor: "#e0f2fe", borderRadius: 16 }),
      b("name", { x: 64, y: 60, width: 500, height: 38, fontSize: 29, fontWeight: "bold", color: ink }),
      b("title", { x: 64, y: 104, width: 500, height: 22, fontSize: 13, color: a }),
      b("contactLine", { x: 64, y: 128, width: 680, height: 18, fontSize: 9.5, color: "#475569" }),
      b("heading", { x: 54, y: 190, width: 310, height: 20, fontSize: 12, fontWeight: "bold", color: a, text: "PROFILE" }),
      b("summary", { x: 54, y: 216, width: 310, height: 118, fontSize: 10.5 }),
      b("heading", { x: 54, y: 366, width: 310, height: 20, fontSize: 12, fontWeight: "bold", color: a, text: "SKILLS" }),
      b("skills", { x: 54, y: 392, width: 310, height: 190, fontSize: 10.5 }),
      b("heading", { x: 54, y: 620, width: 310, height: 20, fontSize: 12, fontWeight: "bold", color: a, text: "EDUCATION" }),
      b("education", { x: 54, y: 646, width: 310, height: 180, fontSize: 10.5 }),
      b("shape", { x: 396, y: 190, width: 2, height: 706, shapeKind: "rect", backgroundColor: "#bae6fd" }),
      b("heading", { x: 430, y: 190, width: 330, height: 20, fontSize: 12, fontWeight: "bold", color: a, text: "EXPERIENCE" }),
      b("experience", { x: 430, y: 216, width: 330, height: 470, fontSize: 10.5 }),
      b("heading", { x: 430, y: 718, width: 330, height: 20, fontSize: 12, fontWeight: "bold", color: a, text: "SELECTED PROJECTS" }),
      b("projects", { x: 430, y: 744, width: 330, height: 170, fontSize: 10.5 }),
    ],
  };
}

function creativePortfolio(): CustomLayout {
  const a = "#db2777";
  const dark = "#111827";
  return {
    blocks: [
      b("shape", { x: 0, y: 0, width: 816, height: 1056, shapeKind: "rect", backgroundColor: "#fff7ed" }),
      b("shape", { x: 54, y: 46, width: 708, height: 168, shapeKind: "rect", backgroundColor: dark, borderRadius: 18 }),
      b("photo", { x: 610, y: 74, width: 104, height: 104, photoShape: "circle" }),
      b("name", { x: 84, y: 82, width: 460, height: 42, fontSize: 31, fontWeight: "bold", color: "#ffffff" }),
      b("title", { x: 84, y: 130, width: 460, height: 22, fontSize: 13, color: "#f9a8d4" }),
      b("contactLine", { x: 84, y: 160, width: 480, height: 18, fontSize: 9.5, color: "#e5e7eb" }),
      b("heading", { x: 54, y: 254, width: 708, height: 20, fontSize: 12, fontWeight: "bold", color: a, text: "ABOUT" }),
      b("summary", { x: 54, y: 280, width: 708, height: 70, fontSize: 11 }),
      b("heading", { x: 54, y: 386, width: 450, height: 20, fontSize: 12, fontWeight: "bold", color: a, text: "EXPERIENCE" }),
      b("experience", { x: 54, y: 412, width: 450, height: 440, fontSize: 10.5 }),
      b("shape", { x: 536, y: 386, width: 226, height: 472, shapeKind: "rect", backgroundColor: "#ffffff", borderRadius: 14, borderWidth: 1, borderColor: "#fed7aa" }),
      b("heading", { x: 558, y: 412, width: 182, height: 20, fontSize: 11, fontWeight: "bold", color: a, text: "TOOLS" }),
      b("skills", { x: 558, y: 438, width: 182, height: 170, fontSize: 10 }),
      b("heading", { x: 558, y: 630, width: 182, height: 20, fontSize: 11, fontWeight: "bold", color: a, text: "EDUCATION" }),
      b("education", { x: 558, y: 656, width: 182, height: 170, fontSize: 10 }),
      b("heading", { x: 54, y: 884, width: 708, height: 20, fontSize: 12, fontWeight: "bold", color: a, text: "PROJECTS" }),
      b("projects", { x: 54, y: 910, width: 708, height: 100, fontSize: 10.5 }),
    ],
  };
}

const COUNTRY_FORMATS = [
  { country: "United States", countryCode: "US", format: "US resume", note: "no-photo, ATS-friendly hiring expectations" },
  { country: "Canada", countryCode: "CA", format: "Canadian resume", note: "concise achievements and no-photo structure" },
  { country: "United Kingdom", countryCode: "UK", format: "UK CV", note: "professional CV structure with optional references wording" },
  { country: "European Union", countryCode: "EU", format: "EU CV", note: "structured skills, languages, and certifications" },
  { country: "Germany", countryCode: "DE", format: "Lebenslauf", note: "formal German CV conventions and profile-photo space" },
  { country: "United Arab Emirates", countryCode: "AE", format: "UAE CV", note: "Gulf-market CV expectations and executive profile space" },
  { country: "Australia", countryCode: "AU", format: "Australian resume", note: "impact-led summary and evidence-based bullets" },
  { country: "Pakistan", countryCode: "PK", format: "Pakistan CV", note: "education, projects, certifications, and contact details" },
  { country: "India", countryCode: "IN", format: "India resume", note: "skills-forward technical and professional presentation" },
  { country: "Global", countryCode: "GL", format: "Global resume", note: "flexible international job-search format" },
] as const;

const PROFESSIONAL_STYLES = [
  {
    key: "ats-clean",
    label: "ATS Clean",
    category: "ATS Friendly",
    accent: "#1f2937",
    build: atsOnePage,
    description: "Clean, keyword-friendly layout for applicant tracking systems and fast recruiter scans.",
  },
  {
    key: "classic-pro",
    label: "Classic Professional",
    category: "Professional",
    accent: "#2854ef",
    build: classicPro,
    description: "Timeless business layout with strong hierarchy for corporate and operations roles.",
  },
  {
    key: "executive",
    label: "Executive",
    category: "Executive",
    accent: "#334155",
    build: executiveSlate,
    description: "Premium leadership layout for managers, directors, consultants, and senior candidates.",
  },
  {
    key: "profile-sidebar",
    label: "Profile Sidebar",
    category: "Modern",
    accent: "#0f766e",
    build: tealSidebar,
    description: "Professional sidebar layout with dedicated space for contact details, skills, and profile photo.",
  },
] as const;

export const TEMPLATE_PRESETS: TemplatePreset[] = COUNTRY_FORMATS.flatMap((country) =>
  PROFESSIONAL_STYLES.map((style) => {
    const id = `${country.countryCode.toLowerCase()}-${style.key}`;
    const name = `${country.countryCode} ${style.label}`;
    const formatLabel = country.format;
    const categoryLabel = style.category.toLowerCase();
    return {
      id,
      slug: id,
      name,
      description: `${style.description} Built for ${country.note}.`,
      seoTitle: `${name} Template | ATS-Friendly ${formatLabel}`,
      seoDescription: `Preview the ${name} resume template for ${country.country}. Use an ATS-friendly ${categoryLabel} layout with clear sections, editable sample content, and a professional format.`,
      shortDescription: `${style.description} Optimized for ${country.country} applications.`,
      longDescription: `The ${name} template gives job seekers a structured ${formatLabel} layout that is easy to scan, simple to edit, and built around the sections recruiters expect. It balances professional formatting with practical ATS readability, so your experience, skills, projects, and education stay clear when you apply online.`,
      bestFor: [
        `Job seekers applying in ${country.country}`,
        `${style.category} roles that need a polished first impression`,
        "Applicants who want a readable, ATS-friendly resume structure",
      ],
      features: [
        `Designed around ${country.note}`,
        "Clean section hierarchy for fast recruiter scanning",
        "Editable sample content for summaries, experience, education, skills, and projects",
        "Works with JobDraftly AI writing, ATS scoring, keyword suggestions, and PDF or Word export",
      ],
      faq: [
        {
          question: `Is the ${name} template ATS-friendly?`,
          answer:
            "Yes. The layout uses clear sections and readable structure so applicant tracking systems can parse the core resume content more reliably.",
        },
        {
          question: `Who should use this ${formatLabel} template?`,
          answer: `It is a strong fit for candidates targeting ${country.country} roles who want a professional ${categoryLabel} resume format without starting from a blank page.`,
        },
        {
          question: "Can I edit this template after choosing it?",
          answer:
            "Yes. You can edit the text, sections, color accents, layout blocks, and resume content inside the JobDraftly dashboard.",
        },
        {
          question: "Can I download the finished resume?",
          answer:
            "Yes. JobDraftly supports clean PDF export and editable Word export, depending on what an employer or job board requests.",
        },
      ],
      category: style.category,
      country: country.country,
      countryCode: country.countryCode,
      format: country.format,
      accent: style.accent,
      build: style.build,
    };
  })
);

export function getTemplatePresetBySlug(slug: string) {
  return TEMPLATE_PRESETS.find((preset) => preset.slug === slug);
}

type CountrySample = {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  linkedin: string;
  github: string;
  photo: boolean;
  summary: string;
  company: string;
  previousCompany: string;
  previousRole: string;
  previousLocation: string;
  bullets: string[];
  school: string;
  degree: string;
  field: string;
  skills: string[];
  projectName: string;
  projectTech: string;
  projectDescription: string;
  secondProjectName: string;
  secondProjectTech: string;
  secondProjectDescription: string;
  certification: string;
  certIssuer: string;
  languages: string[];
  award: string;
  awardDescription: string;
};

function countrySample(preset: TemplatePreset): CountrySample {
  const base: CountrySample = {
    name: "Ava Morgan",
    title: preset.id.includes("executive") ? "Director of Operations" : "Senior Product Manager",
    email: "ava.morgan@example.com",
    phone: "(415) 555-0198",
    location: "San Francisco, CA",
    website: "avamorgan.com",
    linkedin: "linkedin.com/in/avamorgan",
    github: preset.id.includes("product") || preset.id.includes("tech") ? "github.com/avamorgan" : "",
    photo: preset.id.includes("creative") || preset.id.includes("sidebar") || preset.countryCode === "DE" || preset.countryCode === "AE",
    summary:
      "Product and operations leader with 8+ years building customer-centered platforms, improving conversion, and guiding cross-functional teams from discovery through launch. Known for turning ambiguous goals into measurable roadmaps, clear stakeholder alignment, and shipped outcomes.",
    company: "Northstar Labs",
    previousCompany: "Brightlane Software",
    previousRole: "Product Lead",
    previousLocation: "Remote",
    bullets: [
      "Led a 12-person product, design, and analytics squad that increased trial-to-paid conversion by 28% in two quarters.",
      "Built roadmap prioritization model using customer value, effort, and revenue impact, reducing planning cycle time by 35%.",
      "Partnered with sales and support to launch onboarding experiments that lifted activation from 41% to 57%.",
    ],
    school: "University of California, Berkeley",
    degree: "B.S.",
    field: "Business Administration",
    skills: ["Product Strategy", "Roadmapping", "A/B Testing", "Customer Research", "SQL", "Analytics", "Stakeholder Management", "Agile Delivery"],
    projectName: "Self-Serve Onboarding",
    projectTech: "Product Analytics, Figma, SQL",
    projectDescription: "Designed a guided onboarding system that shortened time-to-value by 31% and reduced support tickets by 16%.",
    secondProjectName: "Revenue Insights Dashboard",
    secondProjectTech: "Looker, Segment, Postgres",
    secondProjectDescription: "Launched executive dashboard combining product usage, revenue, and retention indicators for weekly business reviews.",
    certification: "Certified Scrum Product Owner",
    certIssuer: "Scrum Alliance",
    languages: ["English", "Spanish"],
    award: "Product Launch of the Year",
    awardDescription: "Recognized for leading the highest-impact growth release of the year.",
  };

  const byCountry: Partial<Record<string, Partial<CountrySample>>> = {
    CA: {
      name: "Maya Thompson",
      phone: "+1 416 555 0148",
      location: "Toronto, ON",
      school: "University of Toronto",
      field: "Commerce",
      summary: "Customer-focused product manager with experience across SaaS, fintech, and public-sector digital services. Skilled at translating user research into prioritized roadmaps, measurable releases, and accessible product experiences.",
    },
    UK: {
      name: "Oliver Bennett",
      title: "Commercial Operations Manager",
      phone: "+44 20 7946 0123",
      location: "London, UK",
      website: "oliverbennett.co.uk",
      linkedin: "linkedin.com/in/oliverbennett",
      school: "University of Manchester",
      degree: "B.A.",
      field: "Management",
      summary: "Commercial operations manager with 9 years of experience improving sales processes, reporting, and cross-functional delivery. Comfortable preparing board-ready analysis, managing stakeholder expectations, and driving measurable operational improvements.",
      skills: ["Commercial Strategy", "CRM Operations", "Forecasting", "Process Improvement", "Stakeholder Management", "Excel", "Power BI", "Team Leadership"],
    },
    EU: {
      name: "Sofia Laurent",
      phone: "+33 1 42 68 53 00",
      location: "Paris, France",
      website: "sofialaurent.eu",
      linkedin: "linkedin.com/in/sofialaurent",
      school: "Sciences Po",
      degree: "M.Sc.",
      field: "Digital Transformation",
      summary: "Digital transformation specialist experienced in multilingual European teams, service design, and analytics-led product delivery. Combines user research, agile delivery, and stakeholder facilitation to improve public and private-sector digital services.",
      languages: ["French", "English", "German"],
      skills: ["Digital Transformation", "Service Design", "Agile Delivery", "Research", "Analytics", "Workshop Facilitation", "Jira", "Data Storytelling"],
    },
    DE: {
      name: "Lukas Schneider",
      title: "Project Manager",
      phone: "+49 30 5557 0182",
      location: "Berlin, Germany",
      website: "lukasschneider.de",
      linkedin: "linkedin.com/in/lukasschneider",
      photo: true,
      school: "Technical University of Munich",
      degree: "M.Sc.",
      field: "Industrial Engineering",
      summary: "Structured project manager with experience coordinating engineering, procurement, and software teams across complex delivery programs. Strong background in planning, risk management, documentation, and stakeholder communication.",
      skills: ["Project Planning", "Risk Management", "Budget Control", "SAP", "Process Mapping", "Vendor Management", "German", "English"],
      languages: ["German", "English"],
    },
    AE: {
      name: "Sara Al Mansoori",
      title: "Head of Business Development",
      phone: "+971 50 555 0198",
      location: "Dubai, UAE",
      website: "saraalmansoori.ae",
      linkedin: "linkedin.com/in/saraalmansoori",
      photo: true,
      school: "American University in Dubai",
      degree: "B.B.A.",
      field: "Marketing",
      summary: "Business development leader with GCC market experience across enterprise services, partnerships, and account expansion. Builds trusted client relationships, negotiates strategic deals, and leads teams to exceed revenue targets.",
      company: "GulfBridge Partners",
      previousCompany: "Emirates Digital Group",
      previousRole: "Senior Partnerships Manager",
      skills: ["Business Development", "Partnerships", "Enterprise Sales", "Negotiation", "Market Expansion", "CRM", "Team Leadership", "Arabic"],
      languages: ["Arabic", "English"],
    },
    AU: {
      name: "Noah Williams",
      phone: "+61 2 5550 0198",
      location: "Sydney, NSW",
      website: "noahwilliams.com.au",
      linkedin: "linkedin.com/in/noahwilliams",
      school: "University of Sydney",
      degree: "B.Com.",
      field: "Information Systems",
      summary: "Delivery-focused product manager with experience across Australian fintech, marketplaces, and customer operations. Strong record of improving onboarding, reducing service friction, and aligning product roadmaps with commercial outcomes.",
    },
    PK: {
      name: "Ayesha Khan",
      title: "Software Engineer",
      email: "ayesha.khan@example.com",
      phone: "+92 300 5550198",
      location: "Lahore, Pakistan",
      website: "ayeshakhan.dev",
      linkedin: "linkedin.com/in/ayeshakhan",
      github: "github.com/ayeshakhan",
      school: "Lahore University of Management Sciences",
      degree: "B.S.",
      field: "Computer Science",
      summary: "Software engineer with 5+ years of experience building React, Node.js, and PostgreSQL applications for SaaS and marketplace products. Strong in clean UI implementation, API integration, performance tuning, and collaborative delivery.",
      company: "TechNova Solutions",
      previousCompany: "Systems Limited",
      previousRole: "Frontend Engineer",
      previousLocation: "Lahore, Pakistan",
      skills: ["React", "Next.js", "TypeScript", "Node.js", "PostgreSQL", "REST APIs", "Tailwind CSS", "Testing"],
      projectName: "Vendor Portal",
      projectTech: "Next.js, Node.js, PostgreSQL",
      projectDescription: "Built supplier onboarding portal that reduced manual verification work by 42% and improved application visibility.",
      certification: "AWS Certified Cloud Practitioner",
      certIssuer: "Amazon Web Services",
      languages: ["Urdu", "English"],
    },
    IN: {
      name: "Arjun Mehta",
      title: "Full Stack Developer",
      email: "arjun.mehta@example.com",
      phone: "+91 98765 50198",
      location: "Bengaluru, India",
      website: "arjunmehta.dev",
      linkedin: "linkedin.com/in/arjunmehta",
      github: "github.com/arjunmehta",
      school: "Indian Institute of Technology Delhi",
      degree: "B.Tech.",
      field: "Computer Science",
      summary: "Full stack developer with experience shipping high-traffic web applications, internal tools, and analytics dashboards. Comfortable across React, Node.js, cloud deployment, API design, and performance optimisation.",
      company: "CloudPeak Technologies",
      previousCompany: "FreshWorks",
      previousRole: "Software Engineer",
      previousLocation: "Chennai, India",
      skills: ["React", "TypeScript", "Node.js", "Java", "AWS", "MongoDB", "System Design", "CI/CD"],
      projectName: "Customer Insights Platform",
      projectTech: "React, Node.js, AWS, MongoDB",
      projectDescription: "Developed analytics workspace used by account teams to identify churn risk and improve renewal planning.",
      certification: "AWS Solutions Architect Associate",
      certIssuer: "Amazon Web Services",
      languages: ["Hindi", "English"],
    },
  };

  return { ...base, ...(byCountry[preset.countryCode] ?? {}) };
}

export function sampleResumeDataForPreset(preset: TemplatePreset): ResumeData {
  const sample = countrySample(preset);
  return {
    contact: {
      fullName: sample.name,
      title: sample.title,
      email: sample.email,
      phone: sample.phone,
      location: sample.location,
      website: sample.website,
      linkedin: sample.linkedin,
      github: sample.github,
      twitter: "",
      photoShape: sample.photo ? "circle" : "rounded",
    },
    summary: sample.summary,
    experience: [
      {
        id: uid(),
        company: sample.company,
        role: sample.title,
        location: sample.location,
        startDate: "2022",
        endDate: "Present",
        current: true,
        bullets: sample.bullets,
      },
      {
        id: uid(),
        company: sample.previousCompany,
        role: sample.previousRole,
        location: sample.previousLocation,
        startDate: "2019",
        endDate: "2022",
        current: false,
        bullets: [
          "Owned B2B dashboard redesign used by 60,000 monthly users and improved task completion by 22%.",
          "Introduced voice-of-customer rituals across product, success, and engineering, cutting repeat issues by 18%.",
          "Coached 4 associate PMs on discovery, metric design, launch plans, and executive communication.",
        ],
      },
    ],
    education: [
      {
        id: uid(),
        school: sample.school,
        degree: sample.degree,
        field: sample.field,
        startDate: "2013",
        endDate: "2017",
        gpa: "3.8",
      },
    ],
    skills: [
      ...sample.skills.map((name, index) => ({ name, level: (index < 2 ? 5 : index < 6 ? 4 : 3) as 1 | 2 | 3 | 4 | 5 })),
    ],
    projects: [
      {
        id: uid(),
        name: sample.projectName,
        link: "https://example.com/case-study",
        tech: sample.projectTech,
        description: sample.projectDescription,
      },
      {
        id: uid(),
        name: sample.secondProjectName,
        link: "",
        tech: sample.secondProjectTech,
        description: sample.secondProjectDescription,
      },
    ],
    certifications: [
      { id: uid(), name: sample.certification, issuer: sample.certIssuer, date: "2023" },
      { id: uid(), name: "Product Analytics Micro-Certification", issuer: "Amplitude", date: "2022" },
    ],
    languages: [
      ...sample.languages.map((language, index) => ({
        id: uid(),
        language,
        proficiency: (index === 0 ? "Native" : "Advanced") as "Native" | "Advanced",
      })),
    ],
    awards: [
      { id: uid(), title: sample.award, issuer: sample.company, date: "2024", description: sample.awardDescription },
    ],
    customSections: [],
    themeColor: preset.accent,
    customLayout: preset.build(),
  };
}
