import { HomePage } from "@/components/home-page";
import { siteContent } from "@/content/site";
import { resolveContent } from "@/content/resolve";
import { siteConfig } from "@/config/site";

export default async function Page() {
  return <HomePage content={await resolveContent(siteContent, siteConfig.defaultLocale)} />;
}
