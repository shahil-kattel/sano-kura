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
        primary: {
          50: '#fef2f2',
          100: '#fee2e2',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
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
        nepali: ["'Mukta'", "'Noto Sans Devanagari'", "system-ui", "sans-serif"],
        english: ["'Inter'", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
