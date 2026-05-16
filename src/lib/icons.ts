// SVG path-data for icons. Each icon is a single Path element on a 24x24 viewBox
// so it renders identically in the DOM and in @react-pdf/renderer's <Svg><Path/></Svg>.
// We use stroke-based outline icons for a clean Lucide-style look.

export type IconDef = {
  label: string;
  category: "contact" | "social" | "skill" | "object";
  /** SVG path 'd' attribute(s). Multiple paths supported as an array. */
  d: string | string[];
  /** Whether to fill (true) or stroke (false). Default: stroke. */
  fill?: boolean;
};

export const ICONS: Record<string, IconDef> = {
  // Contact
  mail: { label: "Email", category: "contact", d: ["M3 6h18v12H3z", "m3 6 9 7 9-7"] },
  phone: { label: "Phone", category: "contact", d: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.72 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0 1 22 16.92Z" },
  pin: { label: "Location", category: "contact", d: ["M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z", "M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"] },
  globe: { label: "Website", category: "contact", d: ["M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z", "M2 12h20", "M12 2a15 15 0 0 1 0 20", "M12 2a15 15 0 0 0 0 20"] },
  link: { label: "Link", category: "contact", d: ["M10 13a5 5 0 0 0 7.07 0l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.72", "M14 11a5 5 0 0 0-7.07 0l-3 3a5 5 0 0 0 7.07 7.07l1.72-1.72"] },
  calendar: { label: "Calendar", category: "contact", d: ["M3 4h18v18H3z", "M16 2v4", "M8 2v4", "M3 10h18"] },

  // Social
  github: { label: "GitHub", category: "social", d: "M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55v-2.16c-3.2.7-3.88-1.36-3.88-1.36-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.04 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.78 0c2.2-1.49 3.17-1.18 3.17-1.18.62 1.58.23 2.75.11 3.04.74.81 1.18 1.84 1.18 3.1 0 4.43-2.69 5.4-5.25 5.68.41.36.78 1.06.78 2.13v3.15c0 .3.21.66.8.55C20.21 21.39 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5z", fill: true },
  linkedin: { label: "LinkedIn", category: "social", d: "M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.95v5.66H9.36V9h3.41v1.56h.04c.48-.9 1.65-1.85 3.39-1.85 3.62 0 4.29 2.39 4.29 5.49v6.25zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.78C.8 0 0 .77 0 1.73v20.54C0 23.23.8 24 1.78 24h20.44C23.2 24 24 23.23 24 22.27V1.73C24 .77 23.2 0 22.22 0z", fill: true },
  twitter: { label: "Twitter / X", category: "social", d: "M18.244 2H21.5l-7.5 8.572L22.5 22h-6.844l-5.36-6.99L4 22H.74l8.02-9.166L0 2h7.02l4.84 6.39L18.244 2zm-1.2 18.063h1.84L6.04 3.84H4.09l12.954 16.223z", fill: true },
  dribbble: { label: "Dribbble", category: "social", d: ["M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z", "M8 1.7c3.7 5.7 5.7 11.6 6.6 17.7", "M22.4 10c-9.4 0-15.5-2-19-7.7", "M2 16.7c5.6-1.9 12.6-1.6 19 .8"] },

  // Skill / decoration
  star: { label: "Star", category: "skill", d: "M12 2 14.39 8.26 21 9.27l-4.5 4.39 1.06 6.34L12 17.27 6.44 20l1.06-6.34L3 9.27l6.61-1.01L12 2z" },
  check: { label: "Check", category: "skill", d: "M20 6 9 17l-5-5" },
  bolt: { label: "Bolt", category: "skill", d: "M13 2 3 14h9l-1 8 10-12h-9l1-8z" },
  award: { label: "Award", category: "skill", d: ["M12 15a6 6 0 1 0 0-12 6 6 0 0 0 0 12z", "m8.21 13.89-1.6 7.61L12 18.27l5.39 3.23-1.6-7.62"] },
  heart: { label: "Heart", category: "skill", d: "M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" },

  // Object
  briefcase: { label: "Briefcase", category: "object", d: ["M20 7H4v14h16V7z", "M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"] },
  graduation: { label: "Graduation", category: "object", d: ["M22 10v6", "M2 10l10-5 10 5-10 5L2 10z", "M6 12v5c3 3 9 3 12 0v-5"] },
  user: { label: "User", category: "object", d: ["M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2", "M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"] },
  code: { label: "Code", category: "object", d: ["m16 18 6-6-6-6", "m8 6-6 6 6 6"] },
  layers: { label: "Layers", category: "object", d: ["m12 2 10 5-10 5-10-5 10-5z", "M2 17l10 5 10-5", "M2 12l10 5 10-5"] },
};

export type IconName = keyof typeof ICONS;
