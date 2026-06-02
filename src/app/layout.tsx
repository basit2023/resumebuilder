import type { Metadata } from "next";
import { absoluteUrl, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/seo";
import "./globals.css";
import { SITE_NAME, SITE_URL, absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
<<<<<<< HEAD
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
=======
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  title: {
    default: "JobDraftly - AI Resume Builder for ATS-Friendly Applications",
    template: `%s | ${SITE_NAME}`,
>>>>>>> 7904d3ff5e8fda86e42ae520ce2e4b8126f11d76
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "AI resume builder",
    "ATS resume builder",
    "resume templates",
    "cover letter generator",
    "resume checker",
    "job description tailoring",
  ],
  alternates: {
    canonical: absoluteUrl("/"),
  },
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
  },
  manifest: "/manifest.webmanifest",
  openGraph: {
<<<<<<< HEAD
    title: "JobDraftly - Free AI Resume Builder and ATS Resume Checker",
    description: "Build, tailor, check, and download an ATS-friendly resume with AI.",
=======
    title: "JobDraftly - AI Resume Builder for ATS-Friendly Applications",
    description: SITE_DESCRIPTION,
>>>>>>> 7904d3ff5e8fda86e42ae520ce2e4b8126f11d76
    url: absoluteUrl("/"),
    siteName: SITE_NAME,
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "JobDraftly AI resume builder preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
<<<<<<< HEAD
    title: "JobDraftly - Free AI Resume Builder and ATS Resume Checker",
    description: "Build, tailor, check, and download an ATS-friendly resume with AI.",
    images: ["/logo.png"],
=======
    title: "JobDraftly - AI Resume Builder for ATS-Friendly Applications",
    description: SITE_DESCRIPTION,
    images: ["/opengraph-image"],
  },
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
>>>>>>> 7904d3ff5e8fda86e42ae520ce2e4b8126f11d76
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
