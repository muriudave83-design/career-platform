import type { Metadata } from "next";
import "./globals.css";

import Providers from "./providers";

export const metadata: Metadata = {
  title:
    "JoinNexiva | Verified Internships & Graduate Opportunities in Kenya",

  description:
    "JoinNexiva helps students and graduates discover verified internships, industrial attachments, graduate trainee programs, and career opportunities across Kenya.",

  keywords: [
    "internships in Kenya",
    "Kenya internships",
    "graduate trainee programs Kenya",
    "student jobs Kenya",
    "attachment opportunities Kenya",
    "software engineering internships Kenya",
    "career opportunities Kenya",
    "verified internships",
    "JoinNexiva",
  ],

  openGraph: {
    title: "JoinNexiva",
    description:
      "Find verified internships and graduate opportunities across Kenya.",
    url: "https://www.joinnexiva.com",
    siteName: "JoinNexiva",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}