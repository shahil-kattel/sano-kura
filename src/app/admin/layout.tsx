"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Newspaper,
  PlusCircle,
  FolderTree,
  Zap,
  TrendingUp,
  Image as ImageIcon,
  MessageSquare,
  FileText,
  Settings,
  ExternalLink,
  Menu,
  X,
  LogOut,
  Bell,
  Search,
  ShieldCheck,
  CheckCircle2,
  RefreshCw,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useNews } from "@/context/NewsContext";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { language, setLanguage, toNepaliNum } = useLanguage();
  const { articles, comments, resetToDefault } = useNews();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [resetNotice, setResetNotice] = useState(false);

  const pendingCommentsCount = comments.filter((c) => c.status === "pending").length;
  const breakingCount = articles.filter((a) => a.isBreaking).length;

  const navItems = [
    {
      href: "/admin",
      label: { np: "ड्यासबोर्ड", en: "Dashboard" },
      icon: LayoutDashboard,
      badge: null,
    },
    {
      href: "/admin/news",
      label: { np: "सबै समाचार", en: "All Articles" },
      icon: Newspaper,
      badge: toNepaliNum(articles.length),
    },
    {
      href: "/admin/news/new",
      label: { np: "नयाँ समाचार लेख्नुहोस्", en: "Write Article" },
      icon: PlusCircle,
      badge: "+",
    },
    {
      href: "/admin/breaking",
      label: { np: "ताजा / ब्रेकिङ नियन्त्रण", en: "Breaking Ticker" },
      icon: Zap,
      badge: breakingCount > 0 ? toNepaliNum(breakingCount) : null,
      badgeColor: "bg-red-500 text-white",
    },
    {
      href: "/admin/categories",
      label: { np: "विधा / वर्ग व्यवस्थापन", en: "Categories" },
      icon: FolderTree,
      badge: null,
    },
    {
      href: "/admin/markets",
      label: { np: "बजार भाउ (नेप्से/सुन/मुद्रा)", en: "Market Rates" },
      icon: TrendingUp,
      badge: null,
    },
    {
      href: "/admin/gallery",
      label: { np: "फोटो / भिडियो मिडिया", en: "Gallery Media" },
      icon: ImageIcon,
      badge: null,
    },
    {
      href: "/admin/comments",
      label: { np: "पाठक प्रतिक्रिया", en: "Comments" },
      icon: MessageSquare,
      badge: pendingCommentsCount > 0 ? toNepaliNum(pendingCommentsCount) : null,
      badgeColor: "bg-yellow-500 text-black",
    },
    {
      href: "/admin/epaper",
      label: { np: "ई-कागज संस्करण", en: "E-Paper Edition" },
      icon: FileText,
      badge: null,
    },
    {
      href: "/admin/settings",
      label: { np: "साइट सेटिङहरू", en: "Site Settings" },
      icon: Settings,
      badge: null,
    },
  ];

  const handleReset = () => {
    if (confirm("Reset demo data to original state? (के तपाईं डेटा पूर्ववत गर्न चाहनुहुन्छ?)")) {
      resetToDefault();
      setResetNotice(true);
      setTimeout(() => setResetNotice(false), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col antialiased text-gray-900">
      {/* 1. ADMIN TOP NAVIGATION BAR */}
      <header className="bg-gray-900 text-white border-b border-gray-800 sticky top-0 z-40 shadow-xs">
        <div className="px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
          {/* Left: Mobile hamburger & Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-1.5 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800"
              aria-label="Toggle sidebar"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <Link href="/admin" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 bg-red-600 text-white rounded-xl flex items-center justify-center font-black text-xl shadow-md">
                सा
              </div>
              <div className="hidden sm:flex flex-col">
                <span className="text-base font-black tracking-tight text-white group-hover:text-red-400 transition">
                  {language === "np" ? "सानो कुरा • CMS" : "Sano Kura • CMS"}
                </span>
                <span className="text-[10px] text-gray-400 font-medium">
                  {language === "np" ? "सम्पादकीय तथा व्यवस्थापन प्यानल" : "Newsroom Editorial Panel"}
                </span>
              </div>
            </Link>
          </div>

          {/* Right: Quick actions, Live site button, Language switch & Profile */}
          <div className="flex items-center gap-2.5 sm:gap-4 text-xs">
            {/* View Live Website Button */}
            <Link
              href="/"
              target="_blank"
              className="flex items-center gap-1.5 bg-gray-800 hover:bg-red-600 text-gray-200 hover:text-white px-3 py-1.5 rounded-lg font-semibold transition border border-gray-700"
              title="Open public news site in new tab"
            >
              <span>{language === "np" ? "लाइभ साइट हेर्नुहोस्" : "Live Site"}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>

            {/* Language Switch */}
            <div className="flex items-center bg-gray-800 p-0.5 rounded-md border border-gray-700">
              <button
                onClick={() => setLanguage("np")}
                className={`px-2 py-0.5 rounded font-bold transition ${
                  language === "np" ? "bg-red-600 text-white" : "text-gray-400 hover:text-white"
                }`}
              >
                नेपाली
              </button>
              <button
                onClick={() => setLanguage("en")}
                className={`px-2 py-0.5 rounded font-bold transition ${
                  language === "en" ? "bg-red-600 text-white" : "text-gray-400 hover:text-white"
                }`}
              >
                English
              </button>
            </div>

            {/* Reset data helper */}
            <button
              onClick={handleReset}
              className="hidden md:flex items-center gap-1 text-gray-400 hover:text-white transition"
              title="Reset data to initial state"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>{language === "np" ? "रिसेट" : "Reset"}</span>
            </button>

            {/* Admin Profile */}
            <div className="flex items-center gap-2 pl-2 border-l border-gray-700">
              <div className="w-8 h-8 rounded-full bg-red-700 text-white font-bold flex items-center justify-center text-xs border border-red-500">
                सम्पा
              </div>
              <div className="hidden lg:flex flex-col text-left">
                <span className="font-bold text-gray-200 text-xs">सन्तोष न्यौपाने</span>
                <span className="text-[10px] text-red-400 font-medium">प्रधान सम्पादक (Admin)</span>
              </div>
            </div>
          </div>
        </div>

        {resetNotice && (
          <div className="bg-green-600 text-white text-xs py-1 text-center font-bold">
            डेटा सफलतापूर्वक रिसेट भयो! (Data restored to initial state!)
          </div>
        )}
      </header>

      {/* 2. MAIN CMS SHELL (Sidebar + Content) */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar Navigation */}
        <aside
          className={`fixed inset-y-0 left-0 z-30 w-64 bg-gray-900 text-gray-300 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-auto border-r border-gray-800 flex flex-col justify-between pt-16 lg:pt-0 ${
            sidebarOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"
          }`}
        >
          {/* Navigation Links */}
          <div className="py-4 px-3 space-y-1 overflow-y-auto">
            <div className="px-3 pb-2 text-[10px] font-black uppercase tracking-wider text-gray-500">
              {language === "np" ? "मुख्य व्यवस्थापन" : "Content Management"}
            </div>

            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition ${
                    isActive
                      ? "bg-red-600 text-white shadow-xs"
                      : "text-gray-400 hover:text-white hover:bg-gray-800"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{item.label[language]}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`text-[10px] font-extrabold px-1.5 py-0.2 rounded-full ${
                        item.badgeColor || "bg-gray-800 text-gray-300"
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>

          {/* Sidebar Footer info */}
          <div className="p-4 border-t border-gray-800 text-xs text-gray-500 space-y-2">
            <div className="flex items-center gap-2 text-gray-400 font-semibold text-[11px]">
              <ShieldCheck className="w-4 h-4 text-green-400" />
              <span>प्रेस काउन्सिल प्रमाणीकरण प्रणाली</span>
            </div>
            <p className="text-[10px]">सानो कुरा मिडिया व्यवस्थापन प्रणाली v2.4</p>
          </div>
        </aside>

        {/* Backdrop for mobile */}
        {sidebarOpen && (
          <div
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black/60 z-20 lg:hidden"
          />
        )}

        {/* Main Content Workspace Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}
