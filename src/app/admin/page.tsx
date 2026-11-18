"use client";

import React from "react";
import Link from "next/link";
import {
  Quote as QuoteIcon,
  Newspaper,
  Feather,
  Video,
  Camera,
  Briefcase,
  ExternalLink,
  PlusCircle,
  Eye,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";
import { useSanokuraa } from "@/context/SanokuraaContext";

export default function AdminOverviewPage() {
  const {
    quotes,
    reports,
    articles,
    reels,
    photoStories,
    inquiries,
  } = useSanokuraa();

  const activeQuotes = quotes.filter((q) => q.isActive).length;
  const publishedReports = reports.filter((r) => r.status === "PUBLISHED").length;
  const pinnedReports = reports.filter((r) => r.isPinnedToGrid).length;
  const publishedArticles = articles.filter((a) => a.status === "PUBLISHED").length;
  const publishedStories = photoStories.filter((s) => s.status === "PUBLISHED").length;
  const newInquiries = inquiries.filter((i) => i.status === "NEW").length;

  const metrics = [
    {
      title: "Active Quotes & Graphics",
      value: `${activeQuotes} / ${quotes.length}`,
      subtitle: "Shuffling on Homepage Hero",
      icon: QuoteIcon,
      color: "text-blue-400 bg-blue-500/10 border-blue-500/20",
      href: "/admin/quotes",
    },
    {
      title: "Sanokuraa Reporting",
      value: `${publishedReports} Published`,
      subtitle: `${pinnedReports} pinned to 2x3 grid`,
      icon: Newspaper,
      color: "text-red-400 bg-red-500/10 border-red-500/20",
      href: "/admin/reporting",
    },
    {
      title: "Articles / Op-Ed Essays",
      value: `${publishedArticles} Essays`,
      subtitle: "Columns & reflections",
      icon: Feather,
      color: "text-amber-400 bg-amber-500/10 border-amber-500/20",
      href: "/admin/articles",
    },
    {
      title: "Field Reels (9:16)",
      value: `${reels.length} Videos`,
      subtitle: "Vertical Shorts modal player",
      icon: Video,
      color: "text-purple-400 bg-purple-500/10 border-purple-500/20",
      href: "/admin/reels",
    },
    {
      title: "Photo Story Builder",
      value: `${publishedStories} Curated`,
      subtitle: "High-res spatial sequences",
      icon: Camera,
      color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
      href: "/admin/photo-stories",
    },
    {
      title: "Project Inquiries",
      value: `${newInquiries} New`,
      subtitle: `${inquiries.length} total client submissions`,
      icon: Briefcase,
      color: "text-rose-400 bg-rose-500/10 border-rose-500/20",
      href: "/admin/settings",
    },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-slate-850 p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-red-500/10 text-red-400 border border-red-500/20">
              <Sparkles className="w-3.5 h-3.5" />
              Editorial Command Center
            </span>
            <span className="text-xs text-slate-500">• Kathmandu Studio</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Sanokuraa Editorial & Portfolio Desk
          </h1>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            Manage your daily quotes randomizer, 2x3 investigative reporting grid, op-ed columns, 9:16 vertical field reels, scrollytelling photo stories, and client studio inquiries.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/"
            target="_blank"
            className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-4 py-2.5 rounded-xl text-xs font-semibold transition cursor-pointer"
          >
            <span>Live Portal</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          </Link>
        </div>
      </div>

      {/* KPI Stat Cards (6 Grid Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {metrics.map((m, idx) => {
          const Icon = m.icon;
          return (
            <Link
              key={idx}
              href={m.href}
              className="bg-slate-900/90 rounded-2xl border border-slate-800 p-5 hover:border-slate-700 transition group flex flex-col justify-between space-y-4 cursor-pointer"
            >
              <div className="flex items-start justify-between">
                <div className={`w-10 h-10 rounded-xl border flex items-center justify-center ${m.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-600 group-hover:text-white transition" />
              </div>

              <div>
                <p className="text-xs font-medium text-slate-400">{m.title}</p>
                <h3 className="text-2xl font-black text-white mt-1 tracking-tight font-sans">
                  {m.value}
                </h3>
                <p className="text-xs text-slate-500 mt-1 font-mono">{m.subtitle}</p>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Quick Action Dock */}
      <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 space-y-4">
        <h2 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
          Fast Editorial Actions
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          <Link
            href="/admin/quotes"
            className="p-3.5 rounded-xl bg-slate-950 border border-slate-850 hover:border-slate-700 text-center space-y-1.5 transition group"
          >
            <QuoteIcon className="w-5 h-5 mx-auto text-blue-400 group-hover:scale-110 transition" />
            <p className="text-xs font-semibold text-slate-200">Add Quote</p>
          </Link>

          <Link
            href="/admin/reporting"
            className="p-3.5 rounded-xl bg-slate-950 border border-slate-850 hover:border-slate-700 text-center space-y-1.5 transition group"
          >
            <Newspaper className="w-5 h-5 mx-auto text-red-400 group-hover:scale-110 transition" />
            <p className="text-xs font-semibold text-slate-200">Compose Report</p>
          </Link>

          <Link
            href="/admin/articles"
            className="p-3.5 rounded-xl bg-slate-950 border border-slate-850 hover:border-slate-700 text-center space-y-1.5 transition group"
          >
            <Feather className="w-5 h-5 mx-auto text-amber-400 group-hover:scale-110 transition" />
            <p className="text-xs font-semibold text-slate-200">Write Op-Ed</p>
          </Link>

          <Link
            href="/admin/reels"
            className="p-3.5 rounded-xl bg-slate-950 border border-slate-850 hover:border-slate-700 text-center space-y-1.5 transition group"
          >
            <Video className="w-5 h-5 mx-auto text-purple-400 group-hover:scale-110 transition" />
            <p className="text-xs font-semibold text-slate-200">Upload Reel</p>
          </Link>

          <Link
            href="/admin/photo-stories"
            className="p-3.5 rounded-xl bg-slate-950 border border-slate-850 hover:border-slate-700 text-center space-y-1.5 transition group"
          >
            <Camera className="w-5 h-5 mx-auto text-emerald-400 group-hover:scale-110 transition" />
            <p className="text-xs font-semibold text-slate-200">Photo Essay</p>
          </Link>

          <Link
            href="/admin/settings"
            className="p-3.5 rounded-xl bg-slate-950 border border-slate-850 hover:border-slate-700 text-center space-y-1.5 transition group"
          >
            <Briefcase className="w-5 h-5 mx-auto text-rose-400 group-hover:scale-110 transition" />
            <p className="text-xs font-semibold text-slate-200">View Inquiries</p>
          </Link>
        </div>
      </div>

      {/* Recent Dispatches & Inquiries Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Reports on the 2x3 Grid (7 Cols) */}
        <div className="lg:col-span-7 bg-slate-900 rounded-2xl border border-slate-800 p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="font-bold text-white text-sm flex items-center gap-2">
              <Newspaper className="w-4 h-4 text-red-500" />
              <span>Homepage 2×3 Grid Dispatches</span>
            </h3>
            <Link
              href="/admin/reporting"
              className="text-xs font-mono text-red-400 hover:text-red-300"
            >
              Manage Grid →
            </Link>
          </div>

          <div className="divide-y divide-slate-850">
            {reports.slice(0, 4).map((report) => (
              <div key={report.id} className="py-3 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <img
                    src={report.coverImage}
                    alt={report.title.en}
                    className="w-12 h-8 rounded object-cover bg-slate-950 shrink-0"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-white line-clamp-1">
                      {report.title.en}
                    </h4>
                    <p className="text-[11px] text-slate-400 font-mono">
                      Beat: {report.beat} • {report.date}
                    </p>
                  </div>
                </div>

                <span
                  className={`text-[10px] font-mono px-2 py-0.5 rounded-full shrink-0 ${
                    report.isPinnedToGrid
                      ? "bg-red-500/20 text-red-400 font-bold"
                      : "bg-slate-800 text-slate-400"
                  }`}
                >
                  {report.isPinnedToGrid ? "Pinned" : "Standard"}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Client Project Inquiries (5 Cols) */}
        <div className="lg:col-span-5 bg-slate-900 rounded-2xl border border-slate-800 p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="font-bold text-white text-sm flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-rose-500" />
              <span>Recent Client Inquiries</span>
            </h3>
            <Link
              href="/admin/settings"
              className="text-xs font-mono text-rose-400 hover:text-rose-300"
            >
              View All ({inquiries.length}) →
            </Link>
          </div>

          <div className="divide-y divide-slate-850">
            {inquiries.slice(0, 3).map((inq) => (
              <div key={inq.id} className="py-3 space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <p className="font-bold text-white">{inq.clientName}</p>
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                      inq.status === "NEW"
                        ? "bg-rose-500/20 text-rose-400 font-bold"
                        : "bg-slate-800 text-slate-400"
                    }`}
                  >
                    {inq.status}
                  </span>
                </div>
                <p className="text-[11px] font-mono text-slate-400">
                  Target: {inq.serviceTitle}
                </p>
                <p className="text-xs text-slate-300 line-clamp-1 italic">
                  "{inq.projectScope}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
