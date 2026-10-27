export const dynamic = "force-static";
import type { MetadataRoute } from "next";
import { absoluteUrl, siteConfig } from "@/config/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", disallow: "/" },
    sitemap: siteConfig.url ? absoluteUrl("/sitemap.xml") : undefined,
  };
}
