/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        /* Spec design tokens */
        sanok: {
          DEFAULT: "#FAFAFA",
          paper: "#FFFFFF",
        },
        ink: {
          DEFAULT: "#111827",
          soft: "#374151",
        },
        slate: {
          DEFAULT: "#6B7280",
          soft: "#9CA3AF",
        },
        hairline: {
          DEFAULT: "#E5E7EB",
        },
        /* Single restrained editorial accent */
        accent: {
          DEFAULT: "#B91C1C",
          soft: "#FEE2E2",
          ink: "#7F1D1D",
          50: "#fef2f2",
          100: "#fee2e2",
          500: "#ef4444",
          600: "#dc2626",
          700: "#b91c1c",
          800: "#991b1b",
          900: "#7f1d1d",
        },
        news: {
          red: "#b91c1c",
          darkRed: "#991b1b",
          dark: "#111827",
          charcoal: "#1f2937",
          light: "#f9fafb",
          border: "#e5e7eb",
          accent: "#2563eb",
        },
      },
      fontFamily: {
        /* Editorial serif — English headlines & display */
        editorial: [
          "var(--font-newsreader)",
          "var(--font-lora)",
          "Times New Roman",
          "serif",
        ],
        /* Geometric sans — UI, navigation, metadata */
        sans: [
          "var(--font-inter)",
          "system-ui",
          "-apple-system",
          "sans-serif",
        ],
        /* Nepali / Devanagari — Mukta primary, Noto Serif fallback */
        nepali: [
          "var(--font-mukta)",
          "var(--font-noto-serif-devanagari)",
          "Noto Sans Devanagari",
          "sans-serif",
        ],
        /* Backwards-compatible aliases */
        "nepali-old": ["'Mukta'", "'Noto Sans Devanagari'", "system-ui", "sans-serif"],
        "english-old": ["'Inter'", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};