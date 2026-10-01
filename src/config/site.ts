/**
 * Central business + site configuration.
 * Contact details, social-preview copy and the demo label all live here.
 */

function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");
  // Set automatically by Vercel at build time.
  const vercelProd = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercelProd) return `https://${vercelProd}`;
  const vercelUrl = process.env.VERCEL_URL;
  if (vercelUrl) return `https://${vercelUrl}`;
  return "http://localhost:3000";
}

const phoneDigits = "2679020646";
const whatsappMessage =
  "Hi Toske Contracting, I'm interested in discussing a home renovation project.";

export const site = {
  name: "Toske Contracting",
  shortName: "Toske",
  url: resolveSiteUrl(),

  /** Set to false to remove the "Website concept" label and demo notes. */
  showDemoLabel: true,
  demoLabel: "Website Concept for Toske Contracting",

  tagline: "High-End Residential Construction",
  serviceArea: "PA & NJ",
  areaServed: ["Pennsylvania", "New Jersey"],

  contact: {
    phoneDisplay: "(267) 902-0646",
    phoneHref: `tel:+1${phoneDigits}`,
    phoneE164: `+1${phoneDigits}`,
    email: "toskeinc@hotmail.com",
    emailHref: "mailto:toskeinc@hotmail.com?subject=Renovation%20inquiry",
    whatsappHref: `https://wa.me/1${phoneDigits}?text=${encodeURIComponent(whatsappMessage)}`,
    whatsappMessage,
  },

  /** Social / link-preview metadata (Open Graph + Twitter). */
  seo: {
    title: "Toske Contracting | High-End Home Renovations",
    description:
      "Explore kitchens, bathrooms, decks, additions and custom residential projects from Toske Contracting.",
    longDescription:
      "Toske Contracting is a licensed general contractor serving Pennsylvania and New Jersey, focused on high-end residential remodeling — kitchens, bathrooms, home additions, decks and custom work.",
    ogImage: "/og-toske.jpg",
    ogImageAlt:
      "Toske Contracting — High-End Residential Construction. Kitchens, Baths, Additions, Decks.",
    keywords: [
      "general contractor",
      "residential remodeling",
      "kitchen remodeling",
      "bathroom remodeling",
      "home additions",
      "deck construction",
      "Pennsylvania",
      "New Jersey",
    ],
  },

  nav: [
    { label: "Home", href: "#top" },
    { label: "Services", href: "#services" },
    { label: "Projects", href: "#projects" },
    { label: "About", href: "#about" },
    { label: "Process", href: "#process" },
    { label: "Contact", href: "#estimate" },
  ],
} as const;
