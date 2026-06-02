import type { Metadata } from "next";
import "./globals.css";
import { SITE_NAME, SITE_URL, absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: {
    default: "JobDraftly - Free AI Resume Builder and ATS Resume Checker",
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Build an ATS-friendly resume with AI, tailor it to job descriptions, check resume keywords, and download polished PDF or Word files for free.",
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: "/",
  },
  keywords: [
    "AI resume builder",
    "free resume builder",
    "ATS resume checker",
    "resume templates",
    "cover letter generator",
    "job description resume tailoring",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "JobDraftly - Free AI Resume Builder and ATS Resume Checker",
    description: "Build, tailor, check, and download an ATS-friendly resume with AI.",
    url: absoluteUrl("/"),
    siteName: SITE_NAME,
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/logo.png",
        width: 1366,
        height: 768,
        alt: "JobDraftly logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "JobDraftly - Free AI Resume Builder and ATS Resume Checker",
    description: "Build, tailor, check, and download an ATS-friendly resume with AI.",
    images: ["/logo.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
