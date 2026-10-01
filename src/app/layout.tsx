import type { Metadata, Viewport } from "next";
import { Fraunces, Manrope } from "next/font/google";
import { site } from "@/config/site";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["opsz"],
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

/** Social-preview + SEO metadata. Copy lives in src/config/site.ts. */
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.seo.title,
  description: site.seo.description,
  applicationName: site.name,
  keywords: [...site.seo.keywords],
  authors: [{ name: site.name }],
  creator: site.name,
  alternates: { canonical: "/" },
  formatDetection: { telephone: true, email: true },
  openGraph: {
    type: "website",
    url: "/",
    siteName: site.name,
    locale: "en_US",
    title: site.seo.title,
    description: site.seo.description,
    images: [
      {
        url: site.seo.ogImage,
        width: 1200,
        height: 630,
        type: "image/jpeg",
        alt: site.seo.ogImageAlt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: site.seo.title,
    description: site.seo.description,
    images: [{ url: site.seo.ogImage, alt: site.seo.ogImageAlt }],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0f2a22",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "GeneralContractor",
  "@id": `${site.url}/#business`,
  name: site.name,
  description: site.seo.longDescription,
  url: site.url,
  telephone: site.contact.phoneE164,
  email: site.contact.email,
  image: `${site.url}${site.seo.ogImage}`,
  logo: `${site.url}/icon.png`,
  areaServed: site.areaServed.map((name) => ({ "@type": "State", name })),
  knowsAbout: ["Kitchen remodeling", "Bathroom remodeling", "Home additions", "Deck construction", "Custom carpentry"],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${manrope.variable}`} data-scroll-behavior="smooth">
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
