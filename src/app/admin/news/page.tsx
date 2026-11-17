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
import { useLanguage } from "@/context/LanguageContext";
import { useNews } from "@/context/NewsContext";

export default function AdminArticlesPage() {
  const { language, toNepaliNum } = useLanguage();
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
    // Search match
    const q = searchQuery.toLowerCase().trim();
    const matchesQuery =
      !q ||
      art.title.np.toLowerCase().includes(q) ||
      art.title.en.toLowerCase().includes(q) ||
      art.author.name.np.toLowerCase().includes(q) ||
      art.author.name.en.toLowerCase().includes(q);

    // Category match
    const matchesCat = selectedCat === "all" || art.category === selectedCat;

    // Status match
    let matchesStatus = true;
    if (filterStatus === "breaking") matchesStatus = Boolean(art.isBreaking);
    if (filterStatus === "lead") matchesStatus = Boolean(art.isLead);
    if (filterStatus === "trending") matchesStatus = Boolean(art.isTrending);

    return matchesQuery && matchesCat && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight flex items-center gap-2">
            <Newspaper className="w-6 h-6 text-red-600" />
            <span>{language === "np" ? "समाचार व्यवस्थापन सूची" : "Articles Manager"}</span>
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            {language === "np"
              ? `कुल ${toNepaliNum(articles.length)} समाचार प्रकाशित छन्। सम्पादन वा हटाउन सक्नुहुन्छ।`
              : `Total ${articles.length} stories published. Edit, delete, or toggle featured status.`}
          </p>
        </div>

        <Link
          href="/admin/news/new"
          className="bg-red-600 hover:bg-red-700 text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-xs transition flex items-center gap-2 shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          <span>{language === "np" ? "+ नयाँ समाचार थप्नुहोस्" : "+ Add Article"}</span>
        </Link>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-xs flex flex-col md:flex-row gap-3 items-center justify-between">
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <input
            type="text"
            placeholder={
              language === "np"
                ? "शीर्षक वा लेखक खोज्नुहोस्..."
                : "Search by title or author..."
            }
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-gray-50 border border-gray-300 rounded-lg pl-9 pr-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
        </div>

        {/* Filter Dropdowns */}
        <div className="flex items-center gap-2 w-full md:w-auto flex-wrap text-xs">
          {/* Category Dropdown */}
          <select
            value={selectedCat}
            onChange={(e) => setSelectedCat(e.target.value)}
            className="bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value="all">
              {language === "np" ? "सबै विधा (All Categories)" : "All Categories"}
            </option>
            {categories.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.name[language]}
              </option>
            ))}
          </select>

          {/* Status Dropdown */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as any)}
            className="bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value="all">{language === "np" ? "सबै स्थिति (All Status)" : "All Status"}</option>
            <option value="breaking">{language === "np" ? "ताजा / ब्रेकिङ (Breaking)" : "Breaking News"}</option>
            <option value="lead">{language === "np" ? "प्रमुख समाचार (Lead Story)" : "Lead Story"}</option>
            <option value="trending">{language === "np" ? "ट्रेन्डिङ (Trending)" : "Trending"}</option>
          </select>
        </div>
      </div>

      {/* Articles Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 text-gray-600 font-bold uppercase tracking-wider border-b border-gray-200">
              <tr>
                <th className="py-3 px-4">समाचार शीर्षक (Headline)</th>
                <th className="py-3 px-4">विधा (Category)</th>
                <th className="py-3 px-4">लेखक (Author)</th>
                <th className="py-3 px-4">भ्युज (Views)</th>
                <th className="py-3 px-4">विशेष टगल (Toggles)</th>
                <th className="py-3 px-4 text-right">कार्य (Actions)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-700">
              {filteredArticles.length > 0 ? (
                filteredArticles.map((art) => (
                  <tr key={art.id} className="hover:bg-gray-50/70 transition">
                    <td className="py-3 px-4 max-w-md">
                      <div className="flex items-center gap-3">
                        <div className="w-14 h-11 rounded-md overflow-hidden shrink-0 bg-gray-100">
                          <img
                            src={art.image}
                            alt={art.title[language]}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="truncate">
                          <Link
                            href={`/news/${art.slug}`}
                            target="_blank"
                            className="font-bold text-gray-900 hover:text-red-600 transition block truncate"
                          >
                            {art.title[language]}
                          </Link>
                          <span className="text-[10px] text-gray-400">
                            {art.dateNep} • {art.readTime[language]}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-4 whitespace-nowrap">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-gray-100 text-gray-800">
                        {art.categoryName[language]}
                      </span>
                    </td>

                    <td className="py-3 px-4 whitespace-nowrap text-gray-600">
                      {art.author.name[language]}
                    </td>

                    <td className="py-3 px-4 whitespace-nowrap font-mono text-gray-800">
                      {toNepaliNum(art.views)}
                    </td>

                    <td className="py-3 px-4 whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        {/* Toggle Breaking Button */}
                        <button
                          onClick={() => toggleBreaking(art.id)}
                          className={`px-2 py-0.5 rounded text-[10px] font-bold transition flex items-center gap-1 ${
                            art.isBreaking
                              ? "bg-red-600 text-white"
                              : "bg-gray-100 text-gray-500 hover:text-red-600"
                          }`}
                          title="Toggle Breaking News"
                        >
                          <Zap className="w-3 h-3" />
                          <span>ब्रेकिङ</span>
                        </button>

                        {/* Toggle Lead Story */}
                        <button
                          onClick={() => toggleLead(art.id)}
                          className={`px-2 py-0.5 rounded text-[10px] font-bold transition flex items-center gap-1 ${
                            art.isLead
                              ? "bg-yellow-500 text-black font-extrabold"
                              : "bg-gray-100 text-gray-500 hover:text-yellow-700"
                          }`}
                          title="Toggle Lead Hero Story"
                        >
                          <Award className="w-3 h-3" />
                          <span>प्रमुख</span>
                        </button>

                        {/* Toggle Trending */}
                        <button
                          onClick={() => toggleTrending(art.id)}
                          className={`px-2 py-0.5 rounded text-[10px] font-bold transition flex items-center gap-1 ${
                            art.isTrending
                              ? "bg-orange-600 text-white"
                              : "bg-gray-100 text-gray-500 hover:text-orange-600"
                          }`}
                          title="Toggle Trending"
                        >
                          <Flame className="w-3 h-3" />
                          <span>ट्रेन्डिङ</span>
                        </button>
                      </div>
                    </td>

                    <td className="py-3 px-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        {/* Edit Button */}
                        <Link
                          href={`/admin/news/edit/${art.id}`}
                          className="p-1.5 rounded bg-gray-100 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition"
                          title="Edit Article"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </Link>

                        {/* Live Article Link */}
                        <Link
                          href={`/news/${art.slug}`}
                          target="_blank"
                          className="p-1.5 rounded bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
                          title="View on Live Site"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </Link>

                        {/* Delete Button */}
                        <button
                          onClick={() => {
                            if (confirm("Delete this news article? (के तपाईं यो समाचार हटाउन निश्चित हुनुहुन्छ?)")) {
                              deleteArticle(art.id);
                            }
                          }}
                          className="p-1.5 rounded bg-gray-100 text-gray-500 hover:bg-red-50 hover:text-red-600 transition"
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
                  <td colSpan={6} className="py-12 text-center text-gray-400">
                    {language === "np" ? "कुनै समाचार भेटिएन।" : "No articles match your search."}
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
