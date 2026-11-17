"use client";

import React, { useState } from "react";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { ChevronRight, Home, Flame, Filter, SlidersHorizontal } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useNews } from "@/context/NewsContext";
import { NewsCard } from "@/components/NewsCard";

export default function CategoryPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const { language, t } = useLanguage();
  const { articles: allArticles, categories: allCategories } = useNews();

  const category = allCategories.find((c) => c.slug === slug);
  const articles = allArticles.filter((a) => a.category === slug);
  const trendingArticles = [...allArticles].sort((a, b) => b.views - a.views).slice(0, 5);

  const [activeFilter, setActiveFilter] = useState<"all" | "latest" | "popular">("all");

  if (!category) {
    return (
      <div className="py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          {language === "np" ? "विधा फेला परेन" : "Category Not Found"}
        </h2>
        <p className="text-gray-500 mb-6">
          {language === "np"
            ? "तपाईंले खोज्नुभएको समाचार विधा उपलब्ध छैन।"
            : "The category you requested does not exist."}
        </p>
        <Link
          href="/"
          className="inline-block bg-red-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-red-700 transition"
        >
          {t("home")}
        </Link>
      </div>
    );
  }

  // Filtered articles
  let displayedArticles = [...articles];
  if (displayedArticles.length === 0) {
    // If specifically no articles yet for this sub-category, provide related fallback from allArticles
    displayedArticles = allArticles.slice(0, 3);
  }

  if (activeFilter === "popular") {
    displayedArticles = [...displayedArticles].sort((a, b) => b.views - a.views);
  } else if (activeFilter === "latest") {
    displayedArticles = [...displayedArticles].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }

  return (
    <div className="space-y-8">
      {/* 1. BREADCRUMBS */}
      <nav className="flex items-center text-xs text-gray-500 gap-1.5 py-1">
        <Link href="/" className="hover:text-red-600 flex items-center gap-1 transition">
          <Home className="w-3.5 h-3.5" />
          <span>{t("home")}</span>
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
        <span className="font-semibold text-gray-800">{category.name[language]}</span>
      </nav>

      {/* 2. CATEGORY HEADER BANNER */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-xs relative overflow-hidden">
        <div
          className="absolute top-0 left-0 w-2 h-full"
          style={{ backgroundColor: category.color }}
        />
        <div className="max-w-3xl">
          <span
            className="inline-block text-xs font-black uppercase tracking-wider px-3 py-1 rounded text-white mb-2"
            style={{ backgroundColor: category.color }}
          >
            {category.name.en}
          </span>
          <h1 className="text-2xl sm:text-4xl font-black text-gray-900 tracking-tight mb-3">
            {category.name[language]}
          </h1>
          <p className="text-sm text-gray-600 leading-relaxed">
            {category.description[language]}
          </p>
        </div>
      </div>

      {/* 3. FILTER TABS & MAIN CONTENT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column (2 Cols): News Articles */}
        <div className="lg:col-span-2 space-y-6">
          {/* Sub-Filter Controls */}
          <div className="flex items-center justify-between pb-3 border-b border-gray-200">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              {language === "np" ? "समाचार सूची" : "Article List"} (
              {displayedArticles.length})
            </span>
            <div className="flex items-center gap-1 text-xs">
              <button
                onClick={() => setActiveFilter("all")}
                className={`px-3 py-1 rounded-md font-medium transition ${
                  activeFilter === "all"
                    ? "bg-red-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {language === "np" ? "सबै" : "All"}
              </button>
              <button
                onClick={() => setActiveFilter("latest")}
                className={`px-3 py-1 rounded-md font-medium transition ${
                  activeFilter === "latest"
                    ? "bg-red-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {t("latestNews")}
              </button>
              <button
                onClick={() => setActiveFilter("popular")}
                className={`px-3 py-1 rounded-md font-medium transition ${
                  activeFilter === "popular"
                    ? "bg-red-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {t("mostRead")}
              </button>
            </div>
          </div>

          {/* First Feature Card */}
          {displayedArticles.length > 0 && (
            <NewsCard article={displayedArticles[0]} variant="hero" />
          )}

          {/* Remaining Articles List */}
          <div className="space-y-4">
            {displayedArticles.slice(1).map((article) => (
              <NewsCard key={article.id} article={article} variant="horizontal" />
            ))}
          </div>
        </div>

        {/* Right Column (1 Col): Sidebar */}
        <div className="space-y-6">
          {/* Most Read in Sano Kura */}
          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-xs">
            <div className="flex items-center justify-between pb-3 mb-3 border-b-2 border-red-600">
              <h3 className="text-base font-extrabold text-gray-900 flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-red-600" />
                <span>{t("mostRead")}</span>
              </h3>
            </div>
            <div className="divide-y divide-gray-100">
              {trendingArticles.map((article, idx) => (
                <NewsCard
                  key={article.id}
                  article={article}
                  variant="trending"
                  rankingNumber={idx + 1}
                />
              ))}
            </div>
          </div>

          {/* Quick Categories list */}
          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-xs">
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider pb-2 mb-3 border-b border-gray-100">
              {t("allCategories")}
            </h3>
            <div className="space-y-1.5 text-xs">
              {allCategories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/category/${cat.slug}`}
                  className={`flex items-center justify-between p-2 rounded-lg transition ${
                    cat.slug === slug
                      ? "bg-red-50 text-red-600 font-bold"
                      : "text-gray-700 hover:bg-gray-50 hover:text-red-600"
                  }`}
                >
                  <span>{cat.name[language]}</span>
                  <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
