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
  ShieldCheck,
  RefreshCw,
  Bell,
  Search,
  ChevronRight,
  Sparkles,
  Radio,
} from "lucide-react";
import { useNews } from "@/context/NewsContext";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { articles, comments, resetToDefault } = useNews();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [resetNotice, setResetNotice] = useState(false);

  const pendingCommentsCount = comments.filter((c) => c.status === "pending").length;
  const breakingCount = articles.filter((a) => a.isBreaking).length;

  const navItems = [
    {
      href: "/admin",
      label: "Dashboard",
      icon: LayoutDashboard,
      badge: null,
      section: "Overview",
    },
    {
      href: "/admin/news",
      label: "All Articles",
      icon: Newspaper,
      badge: String(articles.length),
      badgeColor: "bg-slate-800 text-slate-300",
      section: "Content",
    },
    {
      href: "/admin/news/new",
      label: "Write Article",
      icon: PlusCircle,
      badge: "NEW",
      badgeColor: "bg-red-500/20 text-red-400 font-bold",
      section: "Content",
    },
    {
      href: "/admin/breaking",
      label: "Breaking Ticker",
      icon: Zap,
      badge: breakingCount > 0 ? `${breakingCount} Live` : null,
      badgeColor: "bg-red-600 text-white animate-pulse",
      section: "Content",
    },
    {
      href: "/admin/categories",
      label: "Categories",
      icon: FolderTree,
      badge: null,
      section: "Management",
    },
    {
      href: "/admin/markets",
      label: "Market Rates (NEPSE / Gold)",
      icon: TrendingUp,
      badge: null,
      section: "Management",
    },
    {
      href: "/admin/gallery",
      label: "Media Gallery",
      icon: ImageIcon,
      badge: null,
      section: "Management",
    },
    {
      href: "/admin/comments",
      label: "Comments Desk",
      icon: MessageSquare,
      badge: pendingCommentsCount > 0 ? `${pendingCommentsCount} Pending` : null,
      badgeColor: "bg-amber-500/20 text-amber-400 font-semibold",
      section: "Community",
    },
    {
      href: "/admin/epaper",
      label: "E-Paper Edition",
      icon: FileText,
      badge: null,
      section: "Publishing",
    },
    {
      href: "/admin/ads",
      label: "Ads Manager",
      icon: LayoutDashboard,
      badge: "NEW",
      badgeColor: "bg-purple-500/20 text-purple-400 font-bold",
      section: "Management",
    },
    {
      href: "/admin/settings",
      label: "Site Settings",
      icon: Settings,
      badge: null,
      section: "Settings",
    },
  ];

  const handleReset = () => {
    if (confirm("Reset demo data to initial state?")) {
      resetToDefault();
      setResetNotice(true);
      setTimeout(() => setResetNotice(false), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans antialiased selection:bg-red-600 selection:text-white">
      {/* 1. TOP NAVBAR */}
      <header className="h-16 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 sticky top-0 z-40 px-4 sm:px-6 flex items-center justify-between">
        {/* Left: Mobile Toggle & Brand */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
            aria-label="Toggle Navigation"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <Link href="/admin" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-red-700 text-white rounded-xl flex items-center justify-center font-black text-xl shadow-lg shadow-red-900/30 group-hover:scale-105 transition-transform">
              सा
            </div>
            <div className="hidden sm:flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-white text-base tracking-tight group-hover:text-red-400 transition">
                  Sano Kura
                </span>
                <span className="text-[10px] font-bold bg-red-600/20 text-red-400 border border-red-500/30 px-1.5 py-0.2 rounded uppercase tracking-wider">
                  CMS Pro
                </span>
              </div>
              <span className="text-[11px] text-slate-400">
                Editorial & Publishing Workspace
              </span>
            </div>
          </Link>
        </div>

        {/* Center / Right: System Status & User Actions */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Live Newsroom Pulse Badge */}
          <div className="hidden md:flex items-center gap-2 bg-slate-800/80 border border-slate-700/60 px-3 py-1.5 rounded-full text-xs text-slate-300">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-medium text-[11px]">Newsroom Live</span>
          </div>

          {/* Reset Demo Data Button */}
          <button
            onClick={handleReset}
            className="hidden sm:flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-lg transition border border-slate-700"
            title="Reset data to factory state"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Data</span>
          </button>

          {/* View Live Website Button */}
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-1.5 text-xs font-semibold bg-red-600 hover:bg-red-500 text-white px-3.5 py-1.5 rounded-lg shadow-md shadow-red-900/30 transition hover:shadow-red-700/50"
          >
            <span>View Live Site</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          {/* Admin Avatar Profile */}
          <div className="flex items-center gap-2.5 pl-2 sm:pl-3 border-l border-slate-800">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-red-600 to-amber-500 text-white font-bold flex items-center justify-center text-xs shadow-md ring-2 ring-slate-800">
              ED
            </div>
            <div className="hidden xl:flex flex-col text-left">
              <span className="text-xs font-bold text-slate-200">Editor-in-Chief</span>
              <span className="text-[10px] text-slate-400">Santosh Neupane</span>
            </div>
          </div>
        </div>
      </header>

      {resetNotice && (
        <div className="bg-emerald-600 text-white text-xs py-1.5 px-4 text-center font-bold tracking-wide animate-in fade-in">
          System data has been successfully restored to initial state!
        </div>
      )}

      {/* 2. BODY LAYOUT (Sidebar + Main Content) */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 z-30 w-64 bg-slate-900 text-slate-300 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-auto border-r border-slate-800 flex flex-col justify-between pt-16 lg:pt-0 ${
            sidebarOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"
          }`}
        >
          {/* Nav Items */}
          <div className="py-5 px-3 space-y-1 overflow-y-auto">
            {navItems.map((item, idx) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`group flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-150 ${
                    isActive
                      ? "bg-red-600 text-white font-bold shadow-md shadow-red-900/30"
                      : "text-slate-400 hover:text-slate-100 hover:bg-slate-800/70"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      className={`w-4 h-4 transition-transform group-hover:scale-110 ${
                        isActive ? "text-white" : "text-slate-400 group-hover:text-red-400"
                      }`}
                    />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                        item.badgeColor || "bg-slate-800 text-slate-300"
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>

          {/* Sidebar Footer */}
          <div className="p-4 border-t border-slate-800/80 bg-slate-950/40 text-xs text-slate-400 space-y-2">
            <div className="flex items-center gap-2 text-slate-300 font-semibold text-[11px]">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Press Council Verified</span>
            </div>
            <p className="text-[10px] text-slate-500">
              Sano Kura Digital CMS • Build 14.2.20
            </p>
          </div>
        </aside>

        {/* Mobile Backdrop */}
        {sidebarOpen && (
          <div
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black/70 z-20 lg:hidden backdrop-blur-xs"
          />
        )}

        {/* Content Viewport */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-slate-950 text-slate-100">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}
