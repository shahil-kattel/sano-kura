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
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export const Header: React.FC = () => {
  const { language, toggleLanguage } = useLanguage();
  const router = useRouter();
  const pathname = usePathname();

  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
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
    { href: "/#reporting", index: "01", label: { en: "Reporting", np: "रिपोर्टिङ" } },
    { href: "/#articles", index: "02", label: { en: "Essays & Op-Ed", np: "विचार / स्तम्भ" } },
    { href: "/#reels", index: "03", label: { en: "Field Shorts", np: "भिडियो रिल्स" } },
    { href: "/#photo-stories", index: "04", label: { en: "Photo Essays", np: "फोटो कथा" } },
    { href: "/#services", index: "05", label: { en: "Atelier Services", np: "स्टुडियो सेवाहरू" } },
    { href: "/#about", index: "06", label: { en: "Manifesto", np: "हाम्रोबारे" } },
  ];

  return (
    <div className="w-full bg-[#FAFAFA] border-b border-neutral-200">
      {/* 1. TOP EDITORIAL META STRIP */}
      <div className="w-full border-b border-neutral-200 text-neutral-500 text-[11px] font-mono py-2 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3 tracking-wider">
            <span className="flex items-center gap-1.5 text-neutral-900 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              <span>KATHMANDU</span>
            </span>
            <span className="text-neutral-300">/</span>
            <span className="hidden sm:inline-block">27.7172° N, 85.3240° E</span>
            <span className="hidden md:inline-block text-neutral-300">/</span>
            <span className="hidden md:inline-block">
              {language === "np" ? "मंसिर २०८१ • संस्करण ०४" : "ISSUE NO. 04 • FALL 2026"}
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <Link
              href="/admin"
              className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white border border-neutral-200 text-neutral-800 hover:text-accent font-semibold transition"
            >
              <Shield className="w-3 h-3 text-accent" />
              <span>Admin CMS</span>
            </Link>

            <span className="text-neutral-300">|</span>

            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="inline-flex items-center gap-1.5 text-neutral-800 hover:text-accent font-semibold tracking-wider transition cursor-pointer"
              title="Toggle English / Nepali"
            >
              <Globe className="w-3.5 h-3.5 text-neutral-500" />
              <span>{language === "np" ? "ENG" : "नेपाली"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. GRAND EDITORIAL MASTHEAD */}
      <header className="w-full bg-white py-8 sm:py-12 px-4 sm:px-8 border-b border-neutral-200">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center md:items-end justify-between gap-6">
          {/* Main Title Brand */}
          <div className="text-center md:text-left space-y-2">
            <Link href="/" className="group inline-block">
              <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4">
                <h1 className="font-editorial text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-normal tracking-tight text-neutral-950 group-hover:text-accent transition duration-300">
                  {language === "np" ? "सानोकुरा" : "SANOKURAA"}
                </h1>
                <span className="font-editorial text-2xl sm:text-3xl text-neutral-400 font-light italic">
                  {language === "np" ? "Sanokuraa Journal" : "सानोकुरा"}
                </span>
              </div>
            </Link>
            <p className="font-mono text-[11px] sm:text-xs text-neutral-500 tracking-[0.2em] uppercase">
              Independent Chronicle • Ground Dispatches • Visual Storytelling Atelier
            </p>
          </div>

          {/* Right Sub-Deck & Search */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
            <p className="hidden lg:block text-xs text-neutral-500 max-w-xs text-right leading-relaxed font-sans border-r border-neutral-200 pr-5">
              An independent archive exploring ground realities, cultural memory, and critical essays across Nepal.
            </p>

            <form onSubmit={handleSearchSubmit} className="relative w-full sm:w-64">
              <input
                type="text"
                placeholder={language === "np" ? "खोज्नुहोस्..." : "Search archive..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#FAFAFA] border border-neutral-200 rounded-full pl-3.5 pr-8 py-2 text-xs text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-900 font-sans transition"
              />
              <button
                type="submit"
                aria-label="Search"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-900 transition cursor-pointer"
              >
                <Search className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>
      </header>

      {/* 3. STICKY EDITORIAL NAVIGATION BAR */}
      <nav
        className={`sticky top-0 z-40 w-full transition-all duration-200 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-xs border-b border-neutral-200 py-2.5"
            : "bg-[#FAFAFA] border-b border-neutral-200 py-3"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between">
          {/* Section Anchors */}
          <div className="flex items-center gap-6 sm:gap-8 overflow-x-auto no-scrollbar">
            {isScrolled && (
              <Link
                href="/"
                className="font-editorial text-lg font-bold text-neutral-900 hover:text-accent transition shrink-0 pr-4 border-r border-neutral-200"
              >
                {language === "np" ? "सानोकुरा" : "Sanokuraa"}
              </Link>
            )}

            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group inline-flex items-center gap-1.5 font-mono text-xs tracking-wider uppercase text-neutral-600 hover:text-neutral-950 whitespace-nowrap transition py-0.5"
              >
                <span className="text-[10px] text-neutral-400 group-hover:text-accent transition">
                  {link.index}
                </span>
                <span className="font-medium group-hover:underline decoration-accent underline-offset-4">
                  {link.label[language]}
                </span>
              </Link>
            ))}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 text-neutral-700 hover:text-neutral-950 transition"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-neutral-200 bg-white px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between text-xs font-mono uppercase tracking-wider py-2 text-neutral-700 hover:text-accent border-b border-neutral-100 last:border-0"
              >
                <span>{link.label[language]}</span>
                <span className="text-neutral-400">{link.index}</span>
              </Link>
            ))}
          </div>
        )}
      </nav>
    </div>
  );
};
