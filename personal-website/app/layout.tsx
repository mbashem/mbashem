import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { publicAsset, resume, siteUrl } from "@/data/resume";
import "./globals.css";

const title = `${resume.profile.name} — ${resume.profile.headline.replace(/\b\w/g, (letter) => letter.toUpperCase())}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description: resume.site.description,
  alternates: { canonical: siteUrl },
  icons: { icon: publicAsset("assets/favicon.svg") },
  openGraph: {
    type: "website", title, description: resume.site.socialDescription, url: siteUrl,
  },
  twitter: { card: "summary", title, description: resume.site.socialDescription },
};

export const viewport: Viewport = { themeColor: "#f6f5ef" };

export default function RootLayout({ children }: { children: ReactNode }) {
  return <html lang="en"><body>{children}</body></html>;
}
