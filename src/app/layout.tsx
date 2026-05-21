import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "JobDraftly - AI-powered resumes that get interviews",
  description:
    "Build, tailor, and download a beautiful ATS-friendly resume with AI. Powered by Claude. Free to start.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? "https://www.jobdraftly.com"),
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "JobDraftly - AI-powered resumes that get interviews",
    description: "Build, tailor, and download a beautiful ATS-friendly resume with AI.",
    url: "https://www.jobdraftly.com",
    siteName: "JobDraftly",
    type: "website",
    images: [
      {
        url: "/logo.png",
        width: 1366,
        height: 768,
        alt: "JobDraftly logo",
      },
    ],
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
