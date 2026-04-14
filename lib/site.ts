import type { Metadata } from "next";

export const siteConfig = {
  name: "Touchpointe",
  description:
    "Touchpointe helps local businesses increase revenue in 30 days using AI-driven systems and automation.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  adminEmail: process.env.ADMIN_EMAIL || "admin@touchpointe.com",
  links: {
    linkedin: "https://www.linkedin.com",
    instagram: "https://www.instagram.com",
    x: "https://x.com"
  },
  nav: [
    { href: "/", label: "Home" },
    { href: "/insights", label: "Insights" },
    { href: "/services", label: "Services" },
    { href: "/products", label: "Products" },
    { href: "/company", label: "Company" }
  ]
};

export const defaultMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | Digital Systems That Convert`,
    template: `%s | ${siteConfig.name}`
  },
  description: siteConfig.description,
  keywords: [
    "AI marketing agency Kerala",
    "Website development Thrissur",
    "Automation services India",
    "digital growth systems",
    "lead generation",
    "business automation"
  ],
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
  },
  icons: {
    icon: "/brand/logo.jpeg",
    shortcut: "/brand/logo.jpeg",
    apple: "/brand/logo.jpeg",
  }
};

