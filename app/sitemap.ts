import type { MetadataRoute } from "next";

import { getSitemapEntries } from "@/lib/resource-service";
import { siteConfig } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = ["", "/services", "/products", "/blogs", "/insights", "/case-studies", "/tech-stack", "/contact"];
  const dynamicEntries = await getSitemapEntries();

  return [
    ...staticRoutes.map((route) => ({
      url: `${siteConfig.url}${route}`,
      lastModified: new Date()
    })),
    ...dynamicEntries.map((entry) => ({
      url: `${siteConfig.url}/${entry.resource}/${entry.slug}`,
      lastModified: entry.updatedAt ? new Date(entry.updatedAt) : new Date()
    }))
  ];
}

