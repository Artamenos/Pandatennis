import type { SiteContent } from "@/types/content";

export async function resolveContent(fallback: SiteContent, locale: string): Promise<SiteContent> {
  if (!locale) throw new Error("Content locale is required");
  return fallback;
}
