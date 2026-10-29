import type { Metadata } from "next";
import { SiteFooter, SiteHeader } from "@/components/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://lmperfumes.example"),
  title: {
    default: "L&M Perfumes — Little moments, lovely scents",
    template: "%s | L&M Perfumes",
  },
  description:
    "Feel-good, locally made perfumes for every version of you. Find your new everyday scent with L&M Perfumes.",
  openGraph: {
    title: "L&M Perfumes — Little moments, lovely scents",
    description: "Locally made scents for your kind of lovely.",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "L&M Perfumes" }],
    type: "website",
    siteName: "L&M Perfumes",
  },
  twitter: {
    card: "summary_large_image",
    title: "L&M Perfumes — Little moments, lovely scents",
    description: "Locally made scents for your kind of lovely.",
    images: ["/opengraph-image"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <div className="announcement">A little lovely, delivered to your door <span>✦</span> Made locally, worn everywhere</div>
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
        <a
          className="chat-float"
          href="https://m.me/"
          target="_blank"
          rel="noreferrer"
          aria-label="Chat with L&M Perfumes on Messenger"
        >
          <span aria-hidden="true">⌁</span>
          <span className="chat-label">Ask us anything</span>
        </a>
      </body>
    </html>
  );
}
