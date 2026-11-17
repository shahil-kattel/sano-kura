"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Newspaper,
  PlusCircle,
  Search,
  Filter,
  Edit,
  Trash2,
  ExternalLink,
  Zap,
  Award,
  Flame,
  ChevronRight,
  SlidersHorizontal,
} from "lucide-react";
import { useNews } from "@/context/NewsContext";

export default function AdminArticlesPage() {
  const {
    articles,
    categories,
    deleteArticle,
    toggleBreaking,
    toggleLead,
    toggleTrending,
  } = useNews();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCat, setSelectedCat] = useState("all");
  const [filterStatus, setFilterStatus] = useState<"all" | "breaking" | "lead" | "trending">("all");

  const filteredArticles = articles.filter((art) => {
    const q = searchQuery.toLowerCase().trim();
    const matchesQuery =
      !q ||
      art.title.en.toLowerCase().includes(q) ||
      art.title.np.toLowerCase().includes(q) ||
      art.author.name.en.toLowerCase().includes(q) ||
      art.author.name.np.toLowerCase().includes(q);

    const matchesCat = selectedCat === "all" || art.category === selectedCat;

    let matchesStatus = true;
    if (filterStatus === "breaking") matchesStatus = Boolean(art.isBreaking);
    if (filterStatus === "lead") matchesStatus = Boolean(art.isLead);
    if (filterStatus === "trending") matchesStatus = Boolean(art.isTrending);

    return matchesQuery && matchesCat && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2.5">
            <Newspaper className="w-6 h-6 text-red-500" />
            <span>Articles & Publishing Manager</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Browse, search, edit, and organize all {articles.length} news stories published across the portal.
          </p>
        </div>

        <Link
          href="/admin/news/new"
          className="bg-red-600 hover:bg-red-500 text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-lg shadow-red-900/30 transition flex items-center gap-2 shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Write New Article</span>
        </Link>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 shadow-lg flex flex-col md:flex-row gap-3 items-center justify-between">
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <input
            type="text"
            placeholder="Search headline, keyword, author..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 text-slate-200 rounded-lg pl-9 pr-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-red-500 placeholder-slate-500"
          />
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
        </div>

        {/* Filter Dropdowns */}
        <div className="flex items-center gap-2 w-full md:w-auto flex-wrap text-xs">
          {/* Category Dropdown */}
          <select
            value={selectedCat}
            onChange={(e) => setSelectedCat(e.target.value)}
            className="bg-slate-950 border border-slate-800 text-slate-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value="all">All Categories</option>
            {categories.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.name.en} ({c.name.np})
              </option>
            ))}
          </select>

          {/* Status Dropdown */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as any)}
            className="bg-slate-950 border border-slate-800 text-slate-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value="all">All Statuses</option>
            <option value="breaking">Breaking News</option>
            <option value="lead">Lead Hero Story</option>
            <option value="trending">Trending Now</option>
          </select>
        </div>
      </div>

      {/* Articles Table */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/60 text-slate-400 font-bold uppercase tracking-wider border-b border-slate-800">
              <tr>
                <th className="py-3.5 px-4">Headline</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Author</th>
                <th className="py-3.5 px-4">Views</th>
                <th className="py-3.5 px-4">Quick Toggles</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 text-slate-300">
              {filteredArticles.length > 0 ? (
                filteredArticles.map((art) => (
                  <tr key={art.id} className="hover:bg-slate-800/40 transition">
                    <td className="py-3.5 px-4 max-w-md">
                      <div className="flex items-center gap-3">
                        <div className="w-14 h-11 rounded-lg overflow-hidden shrink-0 bg-slate-800 border border-slate-700/60">
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
                          <span className="text-[11px] text-slate-500 block truncate">
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

                    <td className="py-3.5 px-4 whitespace-nowrap text-slate-400 font-medium">
                      {art.author.name.en || art.author.name.np}
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap font-mono text-slate-200">
                      {art.views.toLocaleString()}
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        {/* Toggle Breaking */}
                        <button
                          onClick={() => toggleBreaking(art.id)}
                          className={`px-2.5 py-1 rounded-md text-[10px] font-bold transition flex items-center gap-1 border ${
                            art.isBreaking
                              ? "bg-red-600 border-red-500 text-white"
                              : "bg-slate-800 border-slate-700 text-slate-400 hover:text-red-400"
                          }`}
                          title="Toggle live breaking ticker"
                        >
                          <Zap className="w-3 h-3" />
                          <span>Breaking</span>
                        </button>

                        {/* Toggle Lead */}
                        <button
                          onClick={() => toggleLead(art.id)}
                          className={`px-2.5 py-1 rounded-md text-[10px] font-bold transition flex items-center gap-1 border ${
                            art.isLead
                              ? "bg-amber-500 border-amber-400 text-slate-950 font-black"
                              : "bg-slate-800 border-slate-700 text-slate-400 hover:text-amber-400"
                          }`}
                          title="Toggle Hero Lead Story"
                        >
                          <Award className="w-3 h-3" />
                          <span>Lead</span>
                        </button>

                        {/* Toggle Trending */}
                        <button
                          onClick={() => toggleTrending(art.id)}
                          className={`px-2.5 py-1 rounded-md text-[10px] font-bold transition flex items-center gap-1 border ${
                            art.isTrending
                              ? "bg-orange-600 border-orange-500 text-white"
                              : "bg-slate-800 border-slate-700 text-slate-400 hover:text-orange-400"
                          }`}
                          title="Toggle Trending"
                        >
                          <Flame className="w-3 h-3" />
                          <span>Trending</span>
                        </button>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
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
                            if (confirm("Are you sure you want to permanently delete this article?")) {
                              deleteArticle(art.id);
                            }
                          }}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-950 text-slate-400 hover:text-rose-400 transition border border-slate-700"
                          title="Delete Article"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-500">
                    No articles match your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
