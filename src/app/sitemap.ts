export const dynamic = "force-static";
import type { MetadataRoute } from "next";
import { absoluteUrl, siteConfig } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  if (!siteConfig.url) return [];
  return [{ url: absoluteUrl("/"), lastModified: new Date(), changeFrequency: "monthly", priority: 1 }];
}
