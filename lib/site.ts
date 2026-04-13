import type { Metadata } from "next";

export const siteConfig = {
  name: "Touchpointe",
  description:
    "Touchpointe designs high-performance digital experiences, product ecosystems, and growth-ready websites for modern brands.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  adminEmail: process.env.ADMIN_EMAIL || "admin@touchpointe.com",
  links: {
    linkedin: "https://www.linkedin.com",
    instagram: "https://www.instagram.com",
    x: "https://x.com"
  },
  nav: [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/services", label: "Services" },

    { href: "/case-studies", label: "Case Studies" },
    { href: "/insights", label: "Insights" },
    { href: "/career", label: "Career" }
  ]
};

export const defaultMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | Digital Systems That Convert`,
    template: `%s | ${siteConfig.name}`
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  alternates: {
    canonical: "/"
  },
  openGraph: {
    title: `${siteConfig.name} | Digital Systems That Convert`,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/brand/logo.jpeg",
        width: 768,
        height: 768,
        alt: `${siteConfig.name} logo`
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | Digital Systems That Convert`,
    description: siteConfig.description,
    images: ["/brand/logo.jpeg"]
  }
};

