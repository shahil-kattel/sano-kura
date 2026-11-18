"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Quote as QuoteIcon,
  Newspaper,
  Feather,
  Video,
  Camera,
  Briefcase,
  Settings,
  ExternalLink,
  Menu,
  X,
  ShieldCheck,
  Inbox,
  Sparkles,
} from "lucide-react";
import { useSanokuraa } from "@/context/SanokuraaContext";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const {
    quotes,
    reports,
    articles,
    reels,
    photoStories,
    inquiries,
  } = useSanokuraa();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const activeQuotesCount = quotes.filter((q) => q.isActive).length;
  const pinnedReportsCount = reports.filter((r) => r.isPinnedToGrid).length;
  const newInquiriesCount = inquiries.filter((i) => i.status === "NEW").length;

  const navItems = [
    {
      href: "/admin",
      label: "Overview",
      icon: LayoutDashboard,
      badge: null,
      section: "Dashboard",
    },
    {
      href: "/admin/quotes",
      label: "Quotes & Graphics",
      icon: QuoteIcon,
      badge: `${activeQuotesCount} Active`,
      badgeColor: "bg-blue-500/20 text-blue-400 font-mono",
      section: "Editorial Studio",
    },
    {
      href: "/admin/reporting",
      label: "Sanokuraa Reporting",
      icon: Newspaper,
      badge: `${pinnedReportsCount}/6 Grid`,
      badgeColor: "bg-red-500/20 text-red-400 font-mono font-bold",
      section: "Newsroom",
    },
    {
      href: "/admin/articles",
      label: "Articles / Op-Ed",
      icon: Feather,
      badge: `${articles.length} Essays`,
      badgeColor: "bg-amber-500/20 text-amber-400 font-mono",
      section: "Columns",
    },
    {
      href: "/admin/reels",
      label: "Field Reels (9:16)",
      icon: Video,
      badge: `${reels.length} Videos`,
      badgeColor: "bg-purple-500/20 text-purple-400 font-mono",
      section: "Visuals",
    },
    {
      href: "/admin/photo-stories",
      label: "Photo Story Builder",
      icon: Camera,
      badge: `${photoStories.length} Essays`,
      badgeColor: "bg-emerald-500/20 text-emerald-400 font-mono",
      section: "Visuals",
    },
    {
      href: "/admin/settings",
      label: "Services & Inquiries",
      icon: Briefcase,
      badge: newInquiriesCount > 0 ? `${newInquiriesCount} New` : null,
      badgeColor: "bg-rose-500 text-white font-bold animate-pulse",
      section: "Studio & About",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col font-sans antialiased selection:bg-red-600 selection:text-white">
      {/* 1. TOP NAVBAR */}
      <header className="h-16 bg-slate-900 border-b border-slate-800 shadow-sm sticky top-0 z-40 px-4 sm:px-6 flex items-center justify-between">
        {/* Left: Mobile Toggle & Brand */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
            aria-label="Toggle sidebar"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <Link href="/admin" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-red-600 text-white flex items-center justify-center font-editorial font-bold text-lg shadow-sm">
              सा
            </div>
            <div>
              <span className="font-editorial text-lg font-bold tracking-tight text-white group-hover:text-red-400 transition">
                Sanokuraa CMS
              </span>
              <span className="hidden sm:inline-block text-[10px] text-slate-400 font-mono ml-2">
                Editorial Control Desk
              </span>
            </div>
          </Link>
        </div>

        {/* Right Action: Live Portal Link */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            target="_blank"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-mono font-medium transition cursor-pointer"
          >
            <span>Live Site</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          </Link>
        </div>
      </header>

      {/* 2. BODY WITH SIDEBAR & MAIN */}
      <div className="flex-1 flex">
        {/* SIDEBAR NAVIGATION */}
        <aside
          className={`fixed inset-y-0 left-0 z-30 w-64 bg-slate-900 border-r border-slate-800 transform lg:transform-none lg:static transition-transform duration-200 ease-in-out pt-16 lg:pt-0 flex flex-col justify-between ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="p-4 space-y-6 overflow-y-auto">
            {/* Nav Groupings */}
            <div className="space-y-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition group ${
                      isActive
                        ? "bg-red-600 text-white shadow-md shadow-red-600/20"
                        : "text-slate-300 hover:bg-slate-800/80 hover:text-white"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon
                        className={`w-4 h-4 transition ${
                          isActive ? "text-white" : "text-slate-400 group-hover:text-red-400"
                        }`}
                      />
                      <span>{item.label}</span>
                    </div>

                    {item.badge && (
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full ${
                          isActive
                            ? "bg-white/20 text-white font-bold"
                            : item.badgeColor || "bg-slate-800 text-slate-400"
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Bottom System Pulse */}
          <div className="p-4 border-t border-slate-800 text-xs font-mono text-slate-400 space-y-1">
            <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Production Engine Online</span>
            </div>
            <p className="text-[10px] text-slate-500">v2.4 • Next.js App Router</p>
          </div>
        </aside>

        {/* Backdrop for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-20 bg-black/60 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* MAIN ADMIN WORKSPACE */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}
