"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import {
  Search,
  Globe,
  Menu,
  X,
  Shield,
  ArrowUpRight,
  Clock,
  Sparkles,
  Bookmark,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export const Header: React.FC = () => {
  const { language, setLanguage, toggleLanguage, t } = useLanguage();
  const router = useRouter();
  const pathname = usePathname();

  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { href: "/", label: { en: "Home", np: "गृहपृष्ठ" } },
    { href: "/#reporting", label: { en: "Reporting", np: "रिपोर्टिङ" } },
    { href: "/#articles", label: { en: "Articles & Op-Ed", np: "विचार / स्तम्भ" } },
    { href: "/#reels", label: { en: "Reels", np: "रिल्स" } },
    { href: "/#photo-stories", label: { en: "Photo Stories", np: "फोटो कथा" } },
    { href: "/#services", label: { en: "Services", np: "सेवाहरू" } },
    { href: "/#about", label: { en: "About", np: "हाम्रोबारे" } },
  ];

  return (
    <>
      {/* 1. TOP UTILITY STRIP (Minimalist Hairline) */}
      <div className="w-full bg-sanok border-b border-hairline text-slate text-[11px] font-mono py-1.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-ink font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              <span>Kathmandu, Nepal</span>
            </span>
            <span className="hidden sm:inline-block text-hairline">|</span>
            <span className="hidden sm:inline-block">
              {language === "np" ? "२०८१ मंसिर २ गते, मंगलबार" : "Tuesday, November 17, 2026"}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/admin"
              className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white border border-hairline text-ink hover:text-accent font-bold transition shadow-xs"
            >
              <Shield className="w-3 h-3 text-accent" />
              <span>Admin CMS</span>
            </Link>

            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="inline-flex items-center gap-1 hover:text-ink transition cursor-pointer font-bold"
              title="Toggle English / Nepali"
            >
              <Globe className="w-3 h-3 text-slate" />
              <span>{language === "np" ? "English" : "नेपाली"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. EDITORIAL MASTHEAD */}
      <header className="w-full bg-white border-b border-hairline py-6 sm:py-8 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <Link href="/" className="group inline-block">
              <h1 className="font-editorial text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-ink group-hover:text-accent transition duration-200">
                {language === "np" ? "सानोकुरा" : "SANOKURAA"}
              </h1>
            </Link>
            <p className="font-mono text-[11px] sm:text-xs text-slate uppercase tracking-widest mt-1">
              Editorial & Creative Studio • Digital Journal • Kathmandu
            </p>
          </div>

          {/* Quick Header Search on Desktop */}
          <div className="hidden md:flex items-center gap-3">
            <form onSubmit={handleSearchSubmit} className="relative w-64">
              <input
                type="text"
                placeholder={language === "np" ? "खोज्नुहोस्..." : "Search reporting & essays..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-sanok border border-hairline rounded-full pl-3.5 pr-8 py-1.5 text-xs text-ink placeholder:text-slate focus:outline-none focus:border-ink font-sans transition"
              />
              <button
                type="submit"
                aria-label="Search"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-slate hover:text-ink transition cursor-pointer"
              >
                <Search className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>
      </header>

      {/* 3. STICKY CATEGORY / SECTION NAVIGATION BAR */}
      <nav
        className={`sticky top-0 z-40 w-full transition-all duration-200 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-xs border-b border-hairline py-2"
            : "bg-white border-b border-hairline py-2.5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* Scrolled Compact Brand */}
          <div className="flex items-center gap-6 overflow-x-auto no-scrollbar">
            {isScrolled && (
              <Link
                href="/"
                className="font-editorial font-bold text-lg text-ink hover:text-accent transition shrink-0 pr-3 border-r border-hairline"
              >
                {language === "np" ? "सानोकुरा" : "Sanokuraa"}
              </Link>
            )}

            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-mono text-xs font-medium text-slate hover:text-ink hover:border-b-2 hover:border-accent pb-0.5 whitespace-nowrap transition"
              >
                {link.label[language]}
              </Link>
            ))}
          </div>

          {/* Mobile hamburger & search trigger */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-1.5 text-slate hover:text-ink rounded-md transition"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 text-ink hover:text-accent rounded-md transition"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Input Drawer */}
        {searchOpen && (
          <div className="md:hidden px-4 py-3 border-t border-hairline bg-sanok animate-in fade-in">
            <form onSubmit={handleSearchSubmit}>
              <input
                type="text"
                placeholder={language === "np" ? "खोज्नुहोस्..." : "Search reporting & essays..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-hairline rounded-lg px-3 py-2 text-xs text-ink focus:outline-none focus:border-ink font-sans"
              />
            </form>
          </div>
        )}
      </nav>

      {/* 4. MOBILE DRAWER */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-[110px] bottom-0 z-50 bg-white p-6 border-b border-hairline shadow-2xl space-y-4 overflow-y-auto animate-in slide-in-from-top-4">
          <div className="flex flex-col space-y-3 font-mono text-sm border-b border-hairline pb-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 text-ink font-semibold hover:text-accent transition"
              >
                {link.label[language]}
              </Link>
            ))}
          </div>

          <div className="pt-2 flex items-center justify-between">
            <button
              onClick={() => {
                toggleLanguage();
                setMobileMenuOpen(false);
              }}
              className="px-4 py-2 rounded-lg bg-sanok border border-hairline text-xs font-mono font-bold text-ink"
            >
              Switch to {language === "np" ? "English" : "नेपाली"}
            </button>

            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-2 rounded-lg bg-ink text-white text-xs font-mono font-bold"
            >
              Admin CMS
            </Link>
          </div>
        </div>
      )}
    </>
  );
};
