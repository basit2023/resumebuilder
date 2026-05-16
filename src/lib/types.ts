export type PhotoShape = "circle" | "rounded" | "square";

export type ContactInfo = {
  fullName: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  website?: string;
  linkedin?: string;
  github?: string;
  twitter?: string;
  photoDataUrl?: string;
  photoShape?: PhotoShape;
};

export type Experience = {
  id: string;
  company: string;
  role: string;
  location?: string;
  startDate: string;
  endDate: string;
  current: boolean;
  bullets: string[];
};

export type Education = {
  id: string;
  school: string;
  degree: string;
  field?: string;
  startDate?: string;
  endDate?: string;
  gpa?: string;
};

export type Project = {
  id: string;
  name: string;
  link?: string;
  tech?: string;
  description: string;
};

export type Skill = { name: string; level?: 1 | 2 | 3 | 4 | 5 };

export type Certification = {
  id: string;
  name: string;
  issuer: string;
  date?: string;
  credentialId?: string;
  url?: string;
};

export type Language = {
  id: string;
  language: string;
  proficiency: "Native" | "Fluent" | "Advanced" | "Intermediate" | "Basic";
};

export type Award = {
  id: string;
  title: string;
  issuer?: string;
  date?: string;
  description?: string;
};

export type CustomSectionItem = {
  id: string;
  title: string;
  subtitle?: string;
  date?: string;
  description?: string;
};

export type CustomSection = {
  id: string;
  heading: string;
  items: CustomSectionItem[];
};

export function normalizeSkills(input: unknown): Skill[] {
  if (!Array.isArray(input)) return [];
  return input
    .map((s) => {
      if (typeof s === "string") return { name: s };
      if (s && typeof s === "object" && typeof (s as Skill).name === "string") return s as Skill;
      return null;
    })
    .filter(Boolean) as Skill[];
}

export type ResumeData = {
  contact: ContactInfo;
  summary: string;
  experience: Experience[];
  education: Education[];
  skills: Skill[];
  projects: Project[];
  certifications: Certification[];
  languages: Language[];
  awards: Award[];
  customSections: CustomSection[];
  themeColor?: string;
  customLayout?: CustomLayout;
};

export const THEME_COLORS = [
  { name: "Brand blue", value: "#2854ef" },
  { name: "Slate",      value: "#1f2937" },
  { name: "Forest",     value: "#15803d" },
  { name: "Crimson",    value: "#b91c1c" },
  { name: "Plum",       value: "#7c3aed" },
  { name: "Amber",      value: "#b45309" },
  { name: "Teal",       value: "#0d9488" },
  { name: "Pink",       value: "#db2777" },
];

export type TemplateId = "modern" | "classic" | "compact" | "custom";

export type CustomBlockType =
  | "name" | "title" | "contactLine" | "summary"
  | "experience" | "education" | "skills" | "projects"
  | "heading" | "divider" | "photo" | "text" | "image" | "icon" | "shape";

export type ShapeKind = "rect" | "circle" | "line";

export type CustomBlock = {
  id: string;
  type: CustomBlockType;
  x: number; y: number;
  width: number; height: number;
  fontSize?: number;
  fontWeight?: "normal" | "bold";
  align?: "left" | "center" | "right";
  color?: string;
  text?: string;
  backgroundColor?: string;
  borderRadius?: number;
  borderWidth?: number;
  borderColor?: string;
  paddingX?: number;
  paddingY?: number;
  opacity?: number;
  rotation?: number;
  photoShape?: PhotoShape;
  imageDataUrl?: string;
  imageObjectFit?: "cover" | "contain";
  imageObjectX?: number;
  imageObjectY?: number;
  iconName?: string;
  shapeKind?: ShapeKind;
  shapeStrokeWidth?: number;
};

export type CustomLayout = { blocks: CustomBlock[] };

export const PAGE_PX = { width: 816, height: 1056 };
export const PX_TO_PT = 0.75;

export type Resume = {
  id: string;
  user_id: string;
  title: string;
  template: TemplateId;
  data: ResumeData;
  updated_at: string;
  created_at: string;
};

export const emptyResume: ResumeData = {
  contact: {
    fullName: "", title: "", email: "", phone: "",
    location: "", website: "", linkedin: "", github: "", twitter: "",
  },
  summary: "",
  experience: [],
  education: [],
  skills: [],
  projects: [],
  certifications: [],
  languages: [],
  awards: [],
  customSections: [],
};
