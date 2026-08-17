import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import CookieBanner from "@/components/CookieBanner";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Hamari Virasat — Preserve Your Family's Rituals Forever",
  description:
    "Before memory fades. Document the Godbharai songs, the Mundan steps, the Mama's role — capture the Samagri, the songs, the photographs, and the precise roles of every relative in a beautifully formatted heirloom record.",
  keywords: [
    "Indian family rituals",
    "ritual preservation",
    "heritage documentation",
    "family traditions India",
    "Godbharai",
    "Mundan",
    "Vivah Mandap",
    "Pheras",
    "Sanatan rituals",
    "family heirloom",
  ],
  openGraph: {
    title: "Hamari Virasat — Preserve Your Family's Rituals Forever",
    description:
      "The rituals your family carries deserve to be written down. Hamari Virasat captures the Samagri, the songs, the roles of every relative — before memory fades.",
    type: "website",
    locale: "en_IN",
  },
};

const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-VIRASAT2025";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <body className="bg-[#FAF6F0] text-[#2A1208] antialiased" style={{ fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif' }}>
        {gaId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}', {
                  page_path: window.location.pathname,
                });
              `}
            </Script>
          </>
        )}
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}
