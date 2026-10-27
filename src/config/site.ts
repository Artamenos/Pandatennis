export const siteConfig = {
  name: "PandaTennis",
  description: "Теннис и падел с личным тренером. Детские и взрослые группы, индивидуальные занятия.",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "").replace(/\/$/, ""),
  defaultLocale: "ru",
  locales: ["ru"],
  features: {
    cms: false,
    i18n: false,
    forms: false,
  },
} as const;

export function absoluteUrl(path = "/") {
  if (!siteConfig.url) return path;
  return new URL(path, `${siteConfig.url}/`).toString();
}
