import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import { NewsProvider } from "@/context/NewsContext";
import { MainLayoutWrapper } from "@/components/MainLayoutWrapper";

export const metadata: Metadata = {
  title: "सानो कुरा | Sano Kura - सत्य, तथ्य र निष्पक्ष नेपाली समाचार",
  description:
    "नेपालको अग्रणी डिजिटल समाचार पोर्टल: राजनीति, समाज, अर्थ, खेलकुद, विचार, मनोरञ्जन, विश्व र प्रविधिका ताजा र आधिकारिक समाचार।",
  keywords: [
    "सानो कुरा",
    "Sano Kura",
    "Nepali News",
    "Nepal News",
    "Online Khabar",
    "Samachar",
    "Nepali News Portal",
    "नेपाली समाचार",
  ],
  authors: [{ name: "Sano Kura Media Pvt. Ltd." }],
  openGraph: {
    title: "सानो कुरा | Sano Kura - नेपाली अनलाइन समाचार",
    description: "सत्य, तथ्य र निष्पक्ष समाचारको संवाहक",
    siteName: "सानो कुरा (Sano Kura)",
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
    <html lang="ne">
      <body className="min-h-screen flex flex-col bg-gray-50 text-gray-900 antialiased selection:bg-red-600 selection:text-white">
        <LanguageProvider>
          <NewsProvider>
            <MainLayoutWrapper>{children}</MainLayoutWrapper>
          </NewsProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
