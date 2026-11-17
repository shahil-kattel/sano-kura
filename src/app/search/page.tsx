"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { Search, Home, ChevronRight, SlidersHorizontal, FileText } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { searchArticles, NewsArticle } from "@/data/newsData";
import { CATEGORIES } from "@/data/categories";
import { NewsCard } from "@/components/NewsCard";

function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialQuery = searchParams?.get("q") || "";
  const { language, t, toNepaliNum } = useLanguage();

  const [query, setQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [results, setResults] = useState<NewsArticle[]>([]);

  useEffect(() => {
    setQuery(initialQuery);
    const matched = searchArticles(initialQuery);
    if (selectedCategory === "all") {
      setResults(matched);
    } else {
      setResults(matched.filter((a) => a.category === selectedCategory));
    }
  }, [initialQuery, selectedCategory]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/search?q=${encodeURIComponent(query.trim())}`);
  };

  return (
    <div className="space-y-8">
      {/* Breadcrumb */}
      <nav className="flex items-center text-xs text-gray-500 gap-1.5 py-1">
        <Link href="/" className="hover:text-red-600 flex items-center gap-1 transition">
          <Home className="w-3.5 h-3.5" />
          <span>{t("home")}</span>
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
        <span className="font-semibold text-gray-800">{t("search")}</span>
      </nav>

      {/* Search Input Bar */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-xs">
        <h1 className="text-2xl sm:text-3xl font-black text-gray-900 mb-4 tracking-tight">
          {language === "np" ? "समाचार खोज्नुहोस्" : "Search News & Archives"}
        </h1>

        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder={t("searchPlaceholder")}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-gray-50 border border-gray-300 rounded-xl pl-4 pr-10 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white transition"
            />
            <Search className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2" />
          </div>

          <button
            type="submit"
            className="bg-red-600 hover:bg-red-700 text-white font-bold text-sm px-7 py-3 rounded-xl transition flex items-center justify-center gap-2"
          >
            <Search className="w-4 h-4" />
            <span>{t("search")}</span>
          </button>
        </form>

        {/* Filter by Category */}
        <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-100 overflow-x-auto no-scrollbar text-xs">
          <span className="font-bold text-gray-500 shrink-0">
            {language === "np" ? "विधा छानेर:" : "Filter:"}
          </span>
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-3 py-1 rounded-full font-semibold transition shrink-0 ${
              selectedCategory === "all"
                ? "bg-red-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {language === "np" ? "सबै विधा" : "All Categories"}
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => setSelectedCategory(cat.slug)}
              className={`px-3 py-1 rounded-full font-semibold transition shrink-0 ${
                selectedCategory === cat.slug
                  ? "bg-red-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {cat.name[language]}
            </button>
          ))}
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between text-xs text-gray-600 px-1">
        <span>
          {language === "np"
            ? `"${initialQuery || "सबै"}" का लागि ${toNepaliNum(results.length)} नतिजा भेटिए`
            : `Found ${results.length} results for "${initialQuery || "all"}"`}
        </span>
      </div>

      {/* Results Grid */}
      {results.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((article) => (
            <NewsCard key={article.id} article={article} variant="vertical" />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
          <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-gray-800 mb-1">
            {language === "np" ? "कुनै नतिजा फेला परेन" : "No Results Found"}
          </h3>
          <p className="text-xs text-gray-500 max-w-sm mx-auto">
            {language === "np"
              ? "कृपया अन्य शब्द वा विधा प्रयोग गरी पुनः प्रयास गर्नुहोस्।"
              : "Please try with different keywords or check spelling."}
          </p>
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="py-12 text-center text-gray-500">खोज्दैछ... Loading...</div>}>
      <SearchContent />
    </Suspense>
  );
}
