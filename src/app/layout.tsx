import type { Metadata } from "next";
import { absoluteUrl, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/seo";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  title: {
    default: "JobDraftly - AI Resume Builder for ATS-Friendly Applications",
    template: `%s | ${SITE_NAME}`,
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
    title: "JobDraftly - AI Resume Builder for ATS-Friendly Applications",
    description: SITE_DESCRIPTION,
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
