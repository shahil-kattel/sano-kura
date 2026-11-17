"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import {
  Search,
  Globe,
  Sun,
  TrendingUp,
  Bookmark,
  Menu,
  X,
  Clock,
  Sparkles,
  Newspaper,
  ChevronDown,
  Shield,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useNews } from "@/context/NewsContext";
import { BreakingTicker } from "./BreakingTicker";

export const Header: React.FC = () => {
  const { language, setLanguage, toggleLanguage, t, toNepaliNum } = useLanguage();
  const { categories, markets, settings } = useNews();
  const router = useRouter();
  const pathname = usePathname();

  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [bookmarkCount, setBookmarkCount] = useState(0);

  // Time & Date state
  const [currentDateStr, setCurrentDateStr] = useState({
    nepali: "२०८१ मंसिर २ गते, मंगलबार",
    english: "Tuesday, Nov 17, 2026",
    timeStr: "21:30",
  });

  useEffect(() => {
    // Check saved bookmarks
    const updateBookmarks = () => {
      try {
        const saved = JSON.parse(localStorage.getItem("sano_kura_bookmarks") || "[]");
        setBookmarkCount(Array.isArray(saved) ? saved.length : 0);
      } catch {
        setBookmarkCount(0);
      }
    };
    updateBookmarks();
    window.addEventListener("storage", updateBookmarks);
    return () => window.removeEventListener("storage", updateBookmarks);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setMobileMenuOpen(false);
    }
  };

  const trendingTags = [
    { np: "जलविद्युत", en: "Hydropower" },
    { np: "नेपाल क्रिकेट", en: "Nepal Cricket" },
    { np: "नेप्से उछाल", en: "NEPSE Rally" },
    { np: "सगरमाथा", en: "Everest Climate" },
    { np: "नेपाली एआई", en: "Nepali AI" },
    { np: "सुशासन विधेयक", en: "Good Governance" },
  ];

  return (
    <header className="w-full bg-white border-b border-gray-200 sticky top-0 z-50 shadow-xs">
      {/* 1. TOP UTILITY BAR */}
      <div className="bg-gray-900 text-gray-200 text-xs border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-1.5 flex flex-wrap items-center justify-between gap-3">
          {/* Left: Date, Time & Weather */}
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-1.5 text-gray-300 font-medium">
              <Clock className="w-3.5 h-3.5 text-red-400" />
              <span>
                {language === "np" ? currentDateStr.nepali : currentDateStr.english}
              </span>
            </div>

            <div className="hidden md:flex items-center gap-1.5 text-gray-400">
              <Sun className="w-3.5 h-3.5 text-yellow-400" />
              <span>
                {language === "np" ? "काठमाडौँ: २१°C" : "Kathmandu: 21°C"}
              </span>
            </div>

            <div className="hidden lg:flex items-center gap-2 text-gray-400 border-l border-gray-700 pl-3">
              <TrendingUp className="w-3.5 h-3.5 text-green-400" />
              <span>
                {language === "np"
                  ? `नेप्से: ${markets.nepse.index} (${markets.nepse.change})`
                  : `NEPSE: ${markets.nepse.index} (${markets.nepse.change})`}
              </span>
            </div>
          </div>

          {/* Right: Quick Links, Language Switcher & Bookmarks */}
          <div className="flex items-center gap-3">
            <Link
              href="/epaper"
              className="hidden sm:flex items-center gap-1 hover:text-red-400 transition"
            >
              <Newspaper className="w-3.5 h-3.5 text-red-400" />
              <span>{t("epaper")}</span>
            </Link>

            <Link
              href="/admin"
              className="flex items-center gap-1 hover:text-red-400 transition bg-red-950/80 hover:bg-red-900 border border-red-800/80 px-2.5 py-0.5 rounded text-red-200 font-semibold"
              title="Admin CMS Portal"
            >
              <Shield className="w-3.5 h-3.5 text-yellow-400" />
              <span>{language === "np" ? "एडमिन" : "Admin"}</span>
            </Link>

            <Link
              href="/bookmarks"
              className="flex items-center gap-1 hover:text-red-400 transition bg-gray-800 px-2 py-0.5 rounded text-gray-300"
              title={t("bookmarks")}
            >
              <Bookmark className="w-3.5 h-3.5 text-yellow-400" />
              <span className="hidden sm:inline">{t("bookmarks")}</span>
              {bookmarkCount > 0 && (
                <span className="bg-red-600 text-white text-[10px] px-1.5 py-0.2 rounded-full font-bold ml-0.5">
                  {toNepaliNum(bookmarkCount)}
                </span>
              )}
            </Link>

            {/* Language Switch Button with Clear Indicators */}
            <div className="flex items-center bg-gray-800 p-0.5 rounded-md border border-gray-700">
              <button
                onClick={() => setLanguage("np")}
                className={`px-2 py-0.5 text-xs font-semibold rounded transition flex items-center gap-1 ${
                  language === "np"
                    ? "bg-red-600 text-white shadow-xs"
                    : "text-gray-300 hover:text-white"
                }`}
                title="नेपाली भाषा"
              >
                नेपाली
              </button>
              <button
                onClick={() => setLanguage("en")}
                className={`px-2 py-0.5 text-xs font-semibold rounded transition flex items-center gap-1 ${
                  language === "en"
                    ? "bg-red-600 text-white shadow-xs"
                    : "text-gray-300 hover:text-white"
                }`}
                title="English Language"
              >
                English
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. MAIN LOGO & SEARCH BAR */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo Branding */}
          <Link href="/" className="flex items-center gap-3 group">
            {settings?.logoUrl ? (
              <img
                src={settings.logoUrl}
                alt={language === "np" ? settings.siteNameNp : settings.siteNameEn}
                className="w-11 h-11 sm:w-13 sm:h-13 object-cover rounded-xl shadow-md border border-red-500/30"
              />
            ) : (
              <div className="w-11 h-11 sm:w-13 sm:h-13 bg-red-600 text-white rounded-xl flex items-center justify-center font-black text-2xl sm:text-3xl shadow-md group-hover:bg-red-700 transition">
                सा
              </div>
            )}
            <div className="flex flex-col">
              <span className="text-2xl sm:text-3xl font-black tracking-tight text-gray-900 group-hover:text-red-600 transition">
                {language === "np" ? settings?.siteNameNp || "सानो कुरा" : settings?.siteNameEn || "SANO KURA"}
              </span>
              <span className="text-[11px] sm:text-xs text-gray-500 font-medium">
                {language === "np"
                  ? settings?.taglineNp || "सत्य, तथ्य र निष्पक्ष समाचार"
                  : settings?.taglineEn || "Truth, Facts & Unbiased News"}
              </span>
            </div>
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-6">
            <form onSubmit={handleSearchSubmit} className="relative w-full">
              <input
                type="text"
                placeholder={t("searchPlaceholder")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-50 border border-gray-300 rounded-full pl-4 pr-10 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white transition"
              />
              <button
                type="submit"
                aria-label={t("search")}
                className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-red-600 hover:bg-red-700 text-white p-1.5 rounded-full transition"
              >
                <Search className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>

          {/* Right Header Promo / Live updates */}
          <div className="hidden lg:flex items-center gap-3">
            <div className="bg-red-50 border border-red-200 rounded-lg p-2 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-red-600" />
              <div className="text-xs">
                <p className="font-semibold text-red-900">
                  {language === "np" ? "डिजिटल संस्करण" : "Digital Edition"}
                </p>
                <p className="text-gray-600">
                  {language === "np" ? "२४ सै घण्टा ताजा अपडेट" : "24/7 Live Coverage"}
                </p>
              </div>
            </div>
          </div>

          {/* Mobile hamburger */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-700 hover:text-red-600 rounded-lg hover:bg-gray-100 transition"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Trending Tags pills */}
        <div className="hidden sm:flex items-center gap-2 mt-2 pt-2 border-t border-gray-100 text-xs">
          <span className="font-bold text-red-600 flex items-center gap-1 shrink-0">
            <TrendingUp className="w-3 h-3" />
            {t("trending")}:
          </span>
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            {trendingTags.map((tag, idx) => (
              <Link
                key={idx}
                href={`/search?q=${encodeURIComponent(tag[language])}`}
                className="bg-gray-100 hover:bg-red-50 hover:text-red-600 text-gray-700 px-2 py-0.5 rounded-full whitespace-nowrap transition"
              >
                #{tag[language]}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* 3. PRIMARY NAVIGATION BAR */}
      <nav className="bg-red-700 text-white shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center overflow-x-auto no-scrollbar py-0.5">
              {/* Home */}
              <Link
                href="/"
                className={`px-3 py-2 text-sm font-semibold whitespace-nowrap transition hover:bg-red-800 ${
                  pathname === "/" ? "bg-red-900 text-yellow-300 border-b-2 border-yellow-300" : ""
                }`}
              >
                {t("home")}
              </Link>

              {/* All Categories */}
              {categories.map((cat) => {
                const isActive = pathname === `/category/${cat.slug}`;
                return (
                  <Link
                    key={cat.slug}
                    href={`/category/${cat.slug}`}
                    className={`px-3 py-2 text-sm font-semibold whitespace-nowrap transition hover:bg-red-800 ${
                      isActive
                        ? "bg-red-900 text-yellow-300 border-b-2 border-yellow-300"
                        : "text-white"
                    }`}
                  >
                    {cat.name[language]}
                  </Link>
                );
              })}

              {/* Photo & Video Gallery */}
              <Link
                href="/gallery"
                className={`px-3 py-2 text-sm font-semibold whitespace-nowrap transition hover:bg-red-800 ${
                  pathname === "/gallery"
                    ? "bg-red-900 text-yellow-300 border-b-2 border-yellow-300"
                    : "text-white"
                }`}
              >
                {t("gallery")}
              </Link>
            </div>

            {/* Language Quick Switch pill on Navbar right */}
            <button
              onClick={toggleLanguage}
              className="hidden md:flex items-center gap-1.5 bg-red-800 hover:bg-red-900 px-3 py-1.5 rounded-md text-xs font-bold transition ml-2 border border-red-600 shrink-0"
              title="Switch language"
            >
              <Globe className="w-3.5 h-3.5 text-yellow-300" />
              <span>{language === "np" ? "Eng" : "नेपा"}</span>
            </button>
          </div>
        </div>
      </nav>

      {/* 4. BREAKING NEWS TICKER */}
      <BreakingTicker />

      {/* 5. MOBILE MENU DRAWER */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 px-4 py-4 shadow-lg animate-in slide-in-from-top">
          {/* Mobile Search */}
          <form onSubmit={handleSearchSubmit} className="mb-4">
            <div className="relative">
              <input
                type="text"
                placeholder={t("searchPlaceholder")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-50 border border-gray-300 rounded-lg pl-4 pr-10 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <button
                type="submit"
                aria-label={t("search")}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-red-600 text-white p-1.5 rounded-md"
              >
                <Search className="w-4 h-4" />
              </button>
            </div>
          </form>

          {/* Language Switcher Mobile */}
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-gray-100">
            <span className="text-xs font-semibold text-gray-600">भाषा / Language:</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setLanguage("np");
                  setMobileMenuOpen(false);
                }}
                className={`px-3 py-1 text-xs font-bold rounded ${
                  language === "np" ? "bg-red-600 text-white" : "bg-gray-100 text-gray-800"
                }`}
              >
                नेपाली
              </button>
              <button
                onClick={() => {
                  setLanguage("en");
                  setMobileMenuOpen(false);
                }}
                className={`px-3 py-1 text-xs font-bold rounded ${
                  language === "en" ? "bg-red-600 text-white" : "bg-gray-100 text-gray-800"
                }`}
              >
                English
              </button>
            </div>
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-2 gap-2 text-sm font-medium">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded bg-gray-50 hover:bg-red-50 hover:text-red-600"
            >
              🏠 {t("home")}
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded bg-gray-50 hover:bg-red-50 hover:text-red-600"
              >
                {cat.name[language]}
              </Link>
            ))}
            <Link
              href="/gallery"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded bg-gray-50 hover:bg-red-50 hover:text-red-600"
            >
              📷 {t("gallery")}
            </Link>
            <Link
              href="/epaper"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded bg-gray-50 hover:bg-red-50 hover:text-red-600"
            >
              📰 {t("epaper")}
            </Link>
            <Link
              href="/bookmarks"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded bg-gray-50 hover:bg-red-50 hover:text-red-600"
            >
              🔖 {t("bookmarks")}
            </Link>
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded bg-red-100 text-red-800 font-bold hover:bg-red-200"
            >
              ⚙️ {language === "np" ? "एडमिन प्यानल" : "Admin Panel"}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
