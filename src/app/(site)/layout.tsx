import type { Metadata } from "next";
import type { ReactNode } from "react";
import localFont from "next/font/local";
import { absoluteUrl, siteConfig } from "@/config/site";
import "../globals.css";
const montserrat=localFont({src:"../../../public/fonts/montserrat-variable.ttf",variable:"--font-montserrat",display:"swap",weight:"100 900"});

export const metadata: Metadata = {
  metadataBase: siteConfig.url ? new URL(siteConfig.url) : undefined,
  title: { default: siteConfig.name, template: `%s — ${siteConfig.name}` },
  description: siteConfig.description,
  robots: {index:false,follow:false},
  alternates: { canonical: siteConfig.url ? absoluteUrl("/") : undefined },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url || undefined,
    siteName: siteConfig.name,
  },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return <html lang={siteConfig.defaultLocale} className={montserrat.variable}><body>{children}</body></html>;
}
