import {
  Newsreader,
  Lora,
  Inter,
  Mukta,
  Noto_Serif_Devanagari,
} from "next/font/google";

// Editorial serif — English headlines and body display. Newsreader has a high-contrast
// editorial feel; Lora is the fallback serif if Newsreader is unavailable.
export const newsreader = Newsreader({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-newsreader",
  display: "swap",
});

export const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-lora",
  display: "swap",
});

// Geometric sans-serif — UI, navigation, metadata, English body copy.
export const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-inter",
  display: "swap",
});

// Nepali / Devanagari text — Mukta as the primary face, Noto Serif Devanagari as a
// high-contrast editorial fallback so Nepali script keeps its weight alongside English.
export const mukta = Mukta({
  subsets: ["latin", "devanagari"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-mukta",
  display: "swap",
});

export const notoSerifDevanagari = Noto_Serif_Devanagari({
  subsets: ["devanagari"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-noto-serif-devanagari",
  display: "swap",
});