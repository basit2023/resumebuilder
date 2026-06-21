export type LandingPage = {
  slug: string;
  title: string;
  description: string;
  eyebrow: string;
  h1: string;
  intro: string;
  benefits: string[];
  howItWorks: { title: string; body: string }[];
  faq: { question: string; answer: string }[];
  related: { href: string; label: string }[];
  cta: string;
};

const sharedFaq = [
  {
    question: "Can I use JobDraftly for free?",
    answer:
      "Yes. JobDraftly has a free early-access flow so you can create resumes, try AI tools, browse templates, and export your work.",
  },
  {
    question: "Does JobDraftly guarantee interviews?",
    answer:
      "No resume tool can guarantee interviews. JobDraftly helps you create a cleaner, more targeted resume so you can apply with stronger materials.",
  },
  {
    question: "Can I export my resume?",
    answer:
      "Yes. You can export a polished PDF resume and an editable Word file from the dashboard.",
  },
];

export const LANDING_PAGES: LandingPage[] = [
  {
    slug: "ai-resume-builder",
    title: "AI Resume Builder | Create an ATS-Friendly Resume Online",
    description:
      "Build a professional, ATS-friendly resume with JobDraftly's AI resume builder. Create, edit, and export your resume in minutes.",
    eyebrow: "AI resume builder",
    h1: "Create an ATS-friendly resume with AI guidance.",
    intro:
      "JobDraftly helps you turn a blank page into a structured resume with clear sections, stronger bullet points, role-specific wording, and clean PDF or Word export.",
    benefits: [
      "Generate summaries and bullet points that sound professional and specific.",
      "Use structured templates designed for recruiter scans and ATS parsing.",
      "Tailor each resume to the job description before you apply.",
      "Keep control over every section while AI speeds up the writing work.",
    ],
    howItWorks: [
      { title: "Choose a resume template", body: "Start from a clean modern, classic, compact, or country-specific layout." },
      { title: "Add your experience", body: "Enter your background, projects, education, skills, and certifications." },
      { title: "Improve with AI", body: "Polish summaries, rewrite bullets, and align your wording with the target role." },
      { title: "Export and apply", body: "Download a PDF or Word resume that is ready for job applications." },
    ],
    faq: [
      { question: "What is an AI resume builder?", answer: "An AI resume builder helps draft and improve resume sections while you stay in control of the final content and formatting." },
      { question: "Is an AI resume ATS-friendly?", answer: "It can be when the resume uses readable formatting and clear sections. JobDraftly combines AI writing with ATS-friendly layouts." },
      ...sharedFaq,
    ],
    related: [
      { href: "/ats-resume-checker", label: "ATS resume checker" },
      { href: "/resume-keyword-scanner", label: "Resume keyword scanner" },
      { href: "/templates", label: "Resume templates" },
    ],
    cta: "Build my resume",
  },
  {
    slug: "ats-resume-checker",
    title: "ATS Resume Checker | Scan Your Resume for Job Match",
    description:
      "Check your resume against job descriptions and improve your ATS score with keyword suggestions, formatting tips, and AI-powered feedback.",
    eyebrow: "ATS resume checker",
    h1: "Check how closely your resume matches a job description.",
    intro:
      "Paste a job description and use JobDraftly to review keyword coverage, section clarity, and match signals before you send your application.",
    benefits: [
      "See a practical resume match score for each target role.",
      "Find missing skills, tools, responsibilities, and keywords.",
      "Improve weak sections with AI suggestions and clearer phrasing.",
      "Avoid vague edits by focusing on the exact job description.",
    ],
    howItWorks: [
      { title: "Create or upload resume content", body: "Build your resume inside JobDraftly using structured sections." },
      { title: "Paste the job description", body: "Use the role requirements as the comparison source." },
      { title: "Review gaps", body: "Check missing keywords, strengths, and possible formatting issues." },
      { title: "Tailor and export", body: "Update the resume, generate a matching cover letter, and export." },
    ],
    faq: [
      { question: "What is an ATS resume checker?", answer: "It compares your resume against a job description and helps identify keyword, formatting, and relevance gaps." },
      { question: "Does the ATS checker guarantee I will pass?", answer: "No. It helps you improve alignment, but each employer and ATS setup is different." },
      ...sharedFaq,
    ],
    related: [
      { href: "/resume-keyword-scanner", label: "Resume keyword scanner" },
      { href: "/ats-friendly-resume-template", label: "ATS-friendly template" },
      { href: "/ai-resume-builder", label: "AI resume builder" },
    ],
    cta: "Check my resume",
  },
  {
    slug: "resume-keyword-scanner",
    title: "Resume Keyword Scanner | Match Your Resume to Job Descriptions",
    description:
      "Find missing resume keywords, compare your resume with job posts, and improve your chances of passing applicant tracking systems.",
    eyebrow: "Resume keyword scanner",
    h1: "Find the resume keywords your target job expects.",
    intro:
      "JobDraftly helps you compare your resume against a job post so you can add relevant skills and responsibilities without stuffing your resume with awkward keywords.",
    benefits: [
      "Identify missing hard skills, tools, certifications, and role language.",
      "Rewrite sections naturally instead of forcing keywords into the page.",
      "Use the same job context for ATS scoring, tailoring, and cover letters.",
      "Create a more targeted resume for each application.",
    ],
    howItWorks: [
      { title: "Paste a job post", body: "Add the job description for the role you want." },
      { title: "Scan your resume", body: "Compare your existing resume content with the job requirements." },
      { title: "Review suggestions", body: "See useful missing keywords and where they may belong." },
      { title: "Update carefully", body: "Add only accurate experience, skills, and project language." },
    ],
    faq: [
      { question: "Should I add every missing keyword?", answer: "No. Add only accurate keywords that reflect your real experience, skills, or projects." },
      { question: "Can keywords help with ATS systems?", answer: "Relevant keywords can help your resume align with a job description, but formatting, clarity, and experience still matter." },
      ...sharedFaq,
    ],
    related: [
      { href: "/ats-resume-checker", label: "ATS resume checker" },
      { href: "/cover-letter-generator", label: "Cover letter generator" },
      { href: "/resume-builder-for-software-engineers", label: "Software engineer resume builder" },
    ],
    cta: "Scan keywords",
  },
  {
    slug: "cover-letter-generator",
    title: "AI Cover Letter Generator | Create Job-Specific Cover Letters",
    description:
      "Generate a tailored cover letter for any job using AI. Save time and create professional cover letters that match your resume.",
    eyebrow: "AI cover letter generator",
    h1: "Generate a cover letter tailored to the job.",
    intro:
      "Use your resume and the job description together to create a focused cover letter draft that is easier to personalize and send.",
    benefits: [
      "Create a first draft from your resume and target role.",
      "Keep the letter aligned with the same keywords as your resume.",
      "Avoid generic paragraphs by referencing role-specific strengths.",
      "Edit the final letter before sending it with your application.",
    ],
    howItWorks: [
      { title: "Build your resume", body: "Add the experience and skills you want the letter to reflect." },
      { title: "Paste the job description", body: "Give the AI role context for a more relevant draft." },
      { title: "Generate the letter", body: "Create a concise, professional starting point." },
      { title: "Personalize and send", body: "Adjust tone, details, and examples before applying." },
    ],
    faq: [
      { question: "Can AI write a good cover letter?", answer: "AI can create a useful draft, but you should review it and add personal details before sending." },
      { question: "Should my cover letter match my resume?", answer: "Yes. The strongest cover letters reinforce the same experience and keywords shown in your resume." },
      ...sharedFaq,
    ],
    related: [
      { href: "/ai-resume-builder", label: "AI resume builder" },
      { href: "/resume-keyword-scanner", label: "Resume keyword scanner" },
      { href: "/expert-resume-review", label: "Expert resume review" },
    ],
    cta: "Generate a cover letter",
  },
  {
    slug: "resume-builder-for-students",
    title: "Resume Builder for Students | Create Your First Resume",
    description:
      "Create a student resume with no experience. Use AI guidance, clean templates, and beginner-friendly resume sections.",
    eyebrow: "Student resume builder",
    h1: "Create your first resume, even with limited experience.",
    intro:
      "JobDraftly helps students turn coursework, projects, internships, activities, and skills into a clear resume for internships, part-time roles, and entry-level jobs.",
    benefits: [
      "Highlight education, projects, coursework, volunteering, and skills.",
      "Use beginner-friendly prompts instead of staring at a blank page.",
      "Choose clean templates that do not overcomplicate early-career resumes.",
      "Export a professional resume for applications and career fairs.",
    ],
    howItWorks: [
      { title: "Start with education", body: "Add school, degree, dates, coursework, and academic strengths." },
      { title: "Add projects and activities", body: "Show practical work from classes, clubs, volunteering, or internships." },
      { title: "Improve wording", body: "Use AI to make bullets clearer and more outcome-focused." },
      { title: "Download your resume", body: "Export a clean file for internships and entry-level roles." },
    ],
    faq: [
      { question: "Can I make a resume with no work experience?", answer: "Yes. Focus on education, projects, coursework, skills, activities, volunteering, and any practical achievements." },
      { question: "Is this suitable for internships?", answer: "Yes. Student resumes can be tailored for internships, part-time work, graduate programs, and early-career roles." },
      ...sharedFaq,
    ],
    related: [
      { href: "/resume-builder-for-freshers", label: "Fresher resume builder" },
      { href: "/ats-friendly-resume-template", label: "ATS-friendly template" },
      { href: "/templates", label: "Resume templates" },
    ],
    cta: "Create my student resume",
  },
  {
    slug: "resume-builder-for-freshers",
    title: "Resume Builder for Freshers | ATS-Friendly Fresher Resume",
    description:
      "Build a professional fresher resume with AI. Highlight education, projects, internships, and skills in an ATS-friendly format.",
    eyebrow: "Fresher resume builder",
    h1: "Build a fresher resume that presents your potential clearly.",
    intro:
      "JobDraftly helps freshers organize education, internships, technical skills, academic projects, certifications, and achievements into a professional resume.",
    benefits: [
      "Turn internships and academic projects into stronger resume bullets.",
      "Use ATS-friendly sections for skills, education, projects, and experience.",
      "Tailor your resume for each entry-level job description.",
      "Create a clean PDF or Word resume without design friction.",
    ],
    howItWorks: [
      { title: "Choose a fresher-friendly template", body: "Pick a layout that makes education and projects easy to find." },
      { title: "Add relevant experience", body: "Include internships, projects, certifications, and leadership activities." },
      { title: "Match the job", body: "Scan the job description for missing skills and keywords." },
      { title: "Export and apply", body: "Download your final resume and keep improving each version." },
    ],
    faq: [
      { question: "What should a fresher put on a resume?", answer: "Include education, projects, internships, skills, certifications, achievements, and any relevant practical experience." },
      { question: "Can freshers use ATS resume templates?", answer: "Yes. ATS-friendly templates help entry-level resumes stay readable and easy to parse." },
      ...sharedFaq,
    ],
    related: [
      { href: "/resume-builder-for-students", label: "Student resume builder" },
      { href: "/resume-keyword-scanner", label: "Resume keyword scanner" },
      { href: "/templates", label: "Resume templates" },
    ],
    cta: "Build my fresher resume",
  },
  {
    slug: "resume-builder-for-software-engineers",
    title: "Software Engineer Resume Builder | ATS-Friendly Tech Resume",
    description:
      "Create a software engineer resume that highlights technical skills, projects, experience, and keywords for developer jobs.",
    eyebrow: "Software engineer resume builder",
    h1: "Build a software engineer resume for real developer roles.",
    intro:
      "JobDraftly helps engineers present technical skills, projects, systems work, measurable impact, and job-specific keywords in a clean ATS-friendly format.",
    benefits: [
      "Organize languages, frameworks, tools, projects, and experience clearly.",
      "Improve bullets with measurable engineering impact and scope.",
      "Scan job descriptions for missing technical keywords.",
      "Export a resume that works for recruiter screens and online applications.",
    ],
    howItWorks: [
      { title: "Add technical profile", body: "List your stack, role focus, experience level, and strongest projects." },
      { title: "Write impact bullets", body: "Use AI to clarify architecture, performance, collaboration, and delivery outcomes." },
      { title: "Compare with job posts", body: "Find missing keywords for languages, frameworks, systems, and responsibilities." },
      { title: "Export for applications", body: "Download a polished resume for developer roles and referrals." },
    ],
    faq: [
      { question: "What should a software engineer resume include?", answer: "Include technical skills, work experience, projects, education, links, measurable impact, and keywords that match the role." },
      { question: "Should I include projects?", answer: "Yes, especially if they show relevant technologies, problem solving, scale, or product impact." },
      ...sharedFaq,
    ],
    related: [
      { href: "/resume-keyword-scanner", label: "Resume keyword scanner" },
      { href: "/ats-resume-checker", label: "ATS resume checker" },
      { href: "/templates", label: "Tech resume templates" },
    ],
    cta: "Build my tech resume",
  },
  {
    slug: "ats-friendly-resume-template",
    title: "ATS-Friendly Resume Template | Free Professional Resume Format",
    description:
      "Use an ATS-friendly resume template designed for clean formatting, easy scanning, and professional job applications.",
    eyebrow: "ATS-friendly resume template",
    h1: "Start with a resume template built for readability.",
    intro:
      "JobDraftly templates use clear hierarchy, standard sections, and practical formatting so your resume is easier for recruiters and applicant tracking systems to read.",
    benefits: [
      "Avoid overly complex layouts that can make parsing harder.",
      "Use standard resume sections employers already expect.",
      "Choose country-specific formats for US, UK, Canada, India, and more.",
      "Edit the template and export as PDF or Word.",
    ],
    howItWorks: [
      { title: "Browse templates", body: "Filter by country, format, and style." },
      { title: "Preview the layout", body: "Review the public template detail page before using it." },
      { title: "Customize in the dashboard", body: "Edit sections, content, colors, and layout blocks." },
      { title: "Export your resume", body: "Download a clean application-ready file." },
    ],
    faq: [
      { question: "What makes a resume template ATS-friendly?", answer: "Readable text, clear section labels, sensible hierarchy, and avoiding overly complex formatting all help." },
      { question: "Can I preview templates before signing up?", answer: "Yes. Public template pages let you review the format before choosing one." },
      ...sharedFaq,
    ],
    related: [
      { href: "/templates", label: "Browse all templates" },
      { href: "/uk-cv-template", label: "UK CV template" },
      { href: "/canada-resume-template", label: "Canada resume template" },
    ],
    cta: "Browse templates",
  },
  {
    slug: "uk-cv-template",
    title: "UK CV Template | Professional CV Builder for UK Jobs",
    description:
      "Create a professional UK CV with clean formatting, AI guidance, and sections tailored for UK job applications.",
    eyebrow: "UK CV template",
    h1: "Create a professional CV for UK job applications.",
    intro:
      "JobDraftly includes UK-focused CV templates that help you present experience, education, skills, and achievements in a clean professional format.",
    benefits: [
      "Use a UK CV structure with clear professional sections.",
      "Highlight commercial, technical, academic, or public-sector experience.",
      "Tailor the CV to UK job descriptions with keyword suggestions.",
      "Export a polished PDF or editable Word file.",
    ],
    howItWorks: [
      { title: "Pick a UK CV layout", body: "Choose a format from the template gallery." },
      { title: "Add your career details", body: "Fill in profile, experience, education, skills, and projects." },
      { title: "Tailor to the role", body: "Use the job description to improve relevance and keyword coverage." },
      { title: "Download your CV", body: "Export the final version for applications and recruiters." },
    ],
    faq: [
      { question: "Is this for UK CVs or US resumes?", answer: "This page focuses on UK CV formats, while JobDraftly also includes US, Canada, EU, India, and global templates." },
      { question: "Can I create more than one CV version?", answer: "Yes. You can create tailored versions for different roles or industries." },
      ...sharedFaq,
    ],
    related: [
      { href: "/templates/uk-ats-clean", label: "UK ATS Clean template" },
      { href: "/ats-resume-checker", label: "ATS resume checker" },
      { href: "/templates", label: "All resume templates" },
    ],
    cta: "Create my UK CV",
  },
  {
    slug: "canada-resume-template",
    title: "Canada Resume Template | Professional Canadian Resume Format",
    description:
      "Build a Canadian-style resume with an ATS-friendly format, clear sections, and AI-powered resume writing help.",
    eyebrow: "Canada resume template",
    h1: "Build a Canadian-style resume with clean formatting.",
    intro:
      "JobDraftly helps candidates applying in Canada create a concise, professional resume with sections that are easy to scan and tailor for each role.",
    benefits: [
      "Use Canada-focused resume templates with no-photo structure.",
      "Highlight achievements, skills, certifications, and relevant experience.",
      "Compare your resume with Canadian job descriptions.",
      "Export PDF or Word versions for online applications.",
    ],
    howItWorks: [
      { title: "Choose a Canadian resume template", body: "Start with an ATS-friendly format for Canadian applications." },
      { title: "Write your sections", body: "Add profile, work experience, education, skills, and projects." },
      { title: "Scan for match", body: "Check the resume against target job descriptions." },
      { title: "Apply with confidence", body: "Export and update versions as you apply." },
    ],
    faq: [
      { question: "Should a Canadian resume include a photo?", answer: "Most Canadian resumes avoid photos and personal details unrelated to the job." },
      { question: "Can I tailor a resume for Canadian jobs?", answer: "Yes. Paste a job description to compare keywords and improve role alignment." },
      ...sharedFaq,
    ],
    related: [
      { href: "/templates/ca-ats-clean", label: "Canada ATS Clean template" },
      { href: "/resume-keyword-scanner", label: "Resume keyword scanner" },
      { href: "/templates", label: "All templates" },
    ],
    cta: "Create my Canadian resume",
  },
  {
    slug: "expert-resume-review",
    title: "Expert Resume Review | Get Professional Resume Feedback",
    description:
      "Get expert resume feedback to improve clarity, keywords, formatting, and job relevance before applying.",
    eyebrow: "Expert resume review",
    h1: "Get human feedback before you send your resume.",
    intro:
      "JobDraftly's expert review path gives job seekers a focused way to improve resume clarity, role fit, ATS readiness, and recruiter readability.",
    benefits: [
      "Get feedback on summary, bullets, structure, keywords, and formatting.",
      "Identify sections that feel vague, crowded, or underdeveloped.",
      "Use expert notes alongside AI tools for a stronger final version.",
      "Improve your resume before applying to important roles.",
    ],
    howItWorks: [
      { title: "Create or choose a resume", body: "Build your resume in JobDraftly or select an existing version." },
      { title: "Share target role context", body: "Add notes about the roles, industries, or concerns you want reviewed." },
      { title: "Receive focused feedback", body: "Review notes about clarity, keywords, structure, and relevance." },
      { title: "Revise and export", body: "Update the resume and download the final file." },
    ],
    faq: [
      { question: "What does an expert resume review include?", answer: "It focuses on clarity, section structure, bullet strength, keywords, formatting, and how closely the resume fits your target roles." },
      { question: "Do I need an account to request a review?", answer: "You can read this page publicly, but submitting a review request requires signing in so the reviewer can access the selected resume." },
      ...sharedFaq,
    ],
    related: [
      { href: "/ai-resume-builder", label: "AI resume builder" },
      { href: "/ats-resume-checker", label: "ATS resume checker" },
      { href: "/pricing", label: "Pricing" },
    ],
    cta: "Request a review",
  },
];

export function getLandingPage(slug: string) {
  return LANDING_PAGES.find((page) => page.slug === slug);
}
