import type { Metadata } from "next";
import "./globals.css";
import {
  newsreader,
  lora,
  inter,
  mukta,
  notoSerifDevanagari,
} from "@/lib/fonts";
import { LanguageProvider } from "@/context/LanguageContext";
import { NewsProvider } from "@/context/NewsContext";
import { SanokuraaProvider } from "@/context/SanokuraaContext";
import { MainLayoutWrapper } from "@/components/MainLayoutWrapper";

export const metadata: Metadata = {
  title: "Sanokuraa (सानोकुरा) | Editorial & Creative Studio + Digital Journal",
  description:
    "Kathmandu-based independent editorial studio, investigative reporting bureau, and visual storytelling archive.",
  keywords: [
    "Sanokuraa",
    "सानोकुरा",
    "Nepali Journalism",
    "Investigative Reporting",
    "Editorial Design",
    "Creative Portfolio",
    "Kathmandu",
    "Nepal News",
  ],
  authors: [{ name: "Sanokuraa Collective" }],
  openGraph: {
    title: "Sanokuraa | Editorial & Creative Studio + Digital Journal",
    description: "Truthful reporting, high-altitude dispatches, and bespoke visual storytelling from Nepal.",
    siteName: "Sanokuraa",
    locale: "ne_NP",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ne"
      className={`${newsreader.variable} ${lora.variable} ${inter.variable} ${mukta.variable} ${notoSerifDevanagari.variable}`}
    >
      <body className="min-h-screen flex flex-col bg-sanok text-ink font-sans antialiased selection:bg-accent selection:text-white">
        <LanguageProvider>
          <NewsProvider>
            <SanokuraaProvider>
              <MainLayoutWrapper>{children}</MainLayoutWrapper>
            </SanokuraaProvider>
          </NewsProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
