"use client";

import React from "react";
import Link from "next/link";
import {
  Newspaper,
  Zap,
  TrendingUp,
  MessageSquare,
  PlusCircle,
  Eye,
  ArrowRight,
  Flame,
  Award,
  CheckCircle,
  Trash2,
  Edit,
  ExternalLink,
  Users,
  Activity,
  ArrowUpRight,
  Shield,
  Clock,
} from "lucide-react";
import { useNews } from "@/context/NewsContext";

export default function AdminDashboardPage() {
  const {
    articles,
    markets,
    comments,
    deleteArticle,
    toggleBreaking,
  } = useNews();

  const breakingArticles = articles.filter((a) => a.isBreaking);
  const totalViews = articles.reduce((sum, a) => sum + (a.views || 0), 0);

  const stats = [
    {
      title: "Total Published Stories",
      value: articles.length.toLocaleString(),
      change: "+4 today",
      isPositive: true,
      icon: Newspaper,
      accent: "from-blue-600 to-indigo-600",
      textColor: "text-blue-400",
    },
    {
      title: "Active Breaking Alerts",
      value: breakingArticles.length.toString(),
      change: "Streaming in top ticker",
      isPositive: true,
      icon: Zap,
      accent: "from-red-600 to-rose-600",
      textColor: "text-red-400",
    },
    {
      title: "NEPSE Market Index",
      value: markets.nepse.index,
      change: `${markets.nepse.change} (${markets.nepse.percent})`,
      isPositive: markets.nepse.isUp,
      icon: TrendingUp,
      accent: "from-emerald-600 to-teal-600",
      textColor: "text-emerald-400",
    },
    {
      title: "Reader Comments",
      value: comments.length.toString(),
      change: "Active & moderated",
      isPositive: true,
      icon: MessageSquare,
      accent: "from-purple-600 to-violet-600",
      textColor: "text-purple-400",
    },
  ];

  return (
    <div className="space-y-8">
      {/* 1. WELCOME HERO BANNER */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-red-950/40 border border-slate-800 p-6 sm:p-8 shadow-xl">
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse"></span>
              <span className="text-xs font-bold uppercase tracking-wider text-red-400">
                Editorial Control Center
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Welcome back, Editor-in-Chief!
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 max-w-xl">
              Monitor portal performance, publish verified news stories, trigger live breaking flashes, and regulate market feeds across Sano Kura.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/admin/news/new"
              className="bg-red-600 hover:bg-red-500 text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-lg shadow-red-900/40 transition flex items-center gap-2"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Draft New Story</span>
            </Link>
          </div>
        </div>

        {/* Subtle background glow */}
        <div className="absolute -right-10 -bottom-10 w-72 h-72 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* 2. STATS 4-GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={idx}
              className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg relative overflow-hidden group hover:border-slate-700 transition"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-slate-400">
                  {stat.title}
                </span>
                <div
                  className={`w-9 h-9 rounded-xl bg-gradient-to-br ${stat.accent} flex items-center justify-center text-white shadow-md`}
                >
                  <Icon className="w-4 h-4" />
                </div>
              </div>

              <div className="text-2xl font-black text-white tracking-tight">
                {stat.value}
              </div>

              <div className="flex items-center gap-1.5 text-xs font-medium mt-1.5 text-slate-400">
                <span className={stat.isPositive ? "text-emerald-400 font-semibold" : "text-rose-400 font-semibold"}>
                  {stat.change}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* 3. QUICK ACTIONS BAR */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-lg">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-2">
          <Activity className="w-4 h-4 text-red-500" />
          <span>Quick Editorial Actions</span>
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <Link
            href="/admin/news/new"
            className="group bg-slate-950/60 hover:bg-red-600/10 border border-slate-800 hover:border-red-500/50 p-4 rounded-xl font-semibold text-xs transition flex flex-col justify-between gap-3"
          >
            <div className="w-8 h-8 rounded-lg bg-red-600/20 text-red-400 flex items-center justify-center group-hover:scale-110 transition-transform">
              <PlusCircle className="w-4 h-4" />
            </div>
            <div>
              <p className="text-white font-bold">New Article</p>
              <p className="text-[11px] text-slate-500">Draft & publish news</p>
            </div>
          </Link>

          <Link
            href="/admin/breaking"
            className="group bg-slate-950/60 hover:bg-amber-600/10 border border-slate-800 hover:border-amber-500/50 p-4 rounded-xl font-semibold text-xs transition flex flex-col justify-between gap-3"
          >
            <div className="w-8 h-8 rounded-lg bg-amber-600/20 text-amber-400 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <p className="text-white font-bold">Breaking Ticker</p>
              <p className="text-[11px] text-slate-500">Control live alerts</p>
            </div>
          </Link>

          <Link
            href="/admin/markets"
            className="group bg-slate-950/60 hover:bg-emerald-600/10 border border-slate-800 hover:border-emerald-500/50 p-4 rounded-xl font-semibold text-xs transition flex flex-col justify-between gap-3"
          >
            <div className="w-8 h-8 rounded-lg bg-emerald-600/20 text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform">
              <TrendingUp className="w-4 h-4" />
            </div>
            <div>
              <p className="text-white font-bold">Market Rates</p>
              <p className="text-[11px] text-slate-500">NEPSE, Gold & Forex</p>
            </div>
          </Link>

          <Link
            href="/admin/gallery"
            className="group bg-slate-950/60 hover:bg-purple-600/10 border border-slate-800 hover:border-purple-500/50 p-4 rounded-xl font-semibold text-xs transition flex flex-col justify-between gap-3"
          >
            <div className="w-8 h-8 rounded-lg bg-purple-600/20 text-purple-400 flex items-center justify-center group-hover:scale-110 transition-transform">
              <PlusCircle className="w-4 h-4" />
            </div>
            <div>
              <p className="text-white font-bold">Media Upload</p>
              <p className="text-[11px] text-slate-500">Photos & video stories</p>
            </div>
          </Link>
        </div>
      </div>

      {/* 4. RECENT ARTICLES TABLE */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl shadow-lg overflow-hidden">
        <div className="p-5 sm:p-6 border-b border-slate-800 flex items-center justify-between">
          <div>
            <h2 className="text-base font-extrabold text-white">
              Recently Published Stories
            </h2>
            <p className="text-xs text-slate-400">
              Live status across domestic, international, and regional desks
            </p>
          </div>

          <Link
            href="/admin/news"
            className="text-xs font-bold text-red-400 hover:text-red-300 flex items-center gap-1 transition"
          >
            <span>View All Stories</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/60 text-slate-400 uppercase tracking-wider font-semibold border-b border-slate-800">
              <tr>
                <th className="py-3.5 px-4">Headline</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Author</th>
                <th className="py-3.5 px-4">Views</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 text-slate-300 font-medium">
              {articles.slice(0, 6).map((art) => (
                <tr key={art.id} className="hover:bg-slate-800/40 transition">
                  <td className="py-3.5 px-4 max-w-sm">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-10 rounded-lg overflow-hidden shrink-0 bg-slate-800 border border-slate-700/60">
                        <img
                          src={art.image}
                          alt={art.title.en}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="truncate">
                        <Link
                          href={`/news/${art.slug}`}
                          target="_blank"
                          className="font-bold text-white hover:text-red-400 transition block truncate text-xs sm:text-sm"
                        >
                          {art.title.en || art.title.np}
                        </Link>
                        <span className="text-[11px] text-slate-500 font-normal">
                          {art.title.np}
                        </span>
                      </div>
                    </div>
                  </td>

                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span className="px-2.5 py-1 rounded-md text-[10px] font-bold bg-slate-800 text-slate-300 border border-slate-700">
                      {art.categoryName.en || art.category}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 whitespace-nowrap text-slate-400">
                    {art.author.name.en || art.author.name.np}
                  </td>

                  <td className="py-3.5 px-4 whitespace-nowrap font-mono text-slate-200">
                    {art.views.toLocaleString()}
                  </td>

                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {art.isBreaking && (
                        <span className="bg-red-500/20 text-red-400 border border-red-500/30 font-bold px-2 py-0.5 rounded text-[10px]">
                          Breaking
                        </span>
                      )}
                      {art.isLead && (
                        <span className="bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold px-2 py-0.5 rounded text-[10px]">
                          Lead
                        </span>
                      )}
                      {!art.isBreaking && !art.isLead && (
                        <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold px-2 py-0.5 rounded text-[10px]">
                          Published
                        </span>
                      )}
                    </div>
                  </td>

                  <td className="py-3.5 px-4 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => toggleBreaking(art.id)}
                        className={`p-1.5 rounded-lg transition border ${
                          art.isBreaking
                            ? "bg-red-600 border-red-500 text-white"
                            : "bg-slate-800 border-slate-700 text-slate-400 hover:text-red-400"
                        }`}
                        title={art.isBreaking ? "Deactivate Breaking" : "Promote to Breaking"}
                      >
                        <Zap className="w-3.5 h-3.5" />
                      </button>

                      <Link
                        href={`/admin/news/edit/${art.id}`}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition border border-slate-700"
                        title="Edit Article"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </Link>

                      <Link
                        href={`/news/${art.slug}`}
                        target="_blank"
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition border border-slate-700"
                        title="Open Live Article"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </Link>

                      <button
                        onClick={() => {
                          if (confirm("Are you sure you want to permanently delete this story?")) {
                            deleteArticle(art.id);
                          }
                        }}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-950 text-slate-400 hover:text-rose-400 transition border border-slate-700"
                        title="Delete Story"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 5. READER COMMENTS DESK */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-lg">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
          <div>
            <h3 className="font-extrabold text-base text-white flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-purple-400" />
              <span>Reader Feedback Desk</span>
            </h3>
            <p className="text-xs text-slate-400">
              Recent user comments requiring moderation or compliance review
            </p>
          </div>
          <Link
            href="/admin/comments"
            className="text-xs font-bold text-purple-400 hover:text-purple-300 transition"
          >
            Moderate All
          </Link>
        </div>

        <div className="space-y-3">
          {comments.slice(0, 3).map((comm) => (
            <div
              key={comm.id}
              className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 flex items-start justify-between gap-4 text-xs"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-200">{comm.userName}</span>
                  <span className="text-[10px] text-slate-500">• {comm.date}</span>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-1.5 py-0.2 rounded font-bold">
                    {comm.status}
                  </span>
                </div>
                <p className="text-slate-300 leading-relaxed font-normal">{comm.text}</p>
                <p className="text-[10px] text-slate-500 italic">
                  Story: {comm.articleTitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
