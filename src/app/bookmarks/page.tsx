"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Home, ChevronRight, Bookmark, Trash2, ArrowRight, BookOpen } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { getArticleBySlug, NEWS_ARTICLES, NewsArticle } from "@/data/newsData";

export default function BookmarksPage() {
  const { language, t, toNepaliNum } = useLanguage();
  const [savedArticles, setSavedArticles] = useState<NewsArticle[]>([]);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("sano_kura_bookmarks") || "[]");
      if (Array.isArray(saved)) {
        const fullArticles: NewsArticle[] = [];
        saved.forEach((item: any) => {
          const found = getArticleBySlug(item.slug);
          if (found) fullArticles.push(found);
        });
        setSavedArticles(fullArticles);
      }
    } catch {
      setSavedArticles([]);
    }
  }, []);

  const removeBookmark = (slug: string) => {
    try {
      const saved = JSON.parse(localStorage.getItem("sano_kura_bookmarks") || "[]");
      const updated = saved.filter((item: any) => item.slug !== slug);
      localStorage.setItem("sano_kura_bookmarks", JSON.stringify(updated));
      setSavedArticles((prev) => prev.filter((a) => a.slug !== slug));
      window.dispatchEvent(new Event("storage"));
    } catch (e) {
      console.error(e);
    }
  };

  const clearAllBookmarks = () => {
    if (confirm(language === "np" ? "सबै सुरक्षित समाचार हटाउन चाहनुहुन्छ?" : "Remove all saved articles?")) {
      localStorage.removeItem("sano_kura_bookmarks");
      setSavedArticles([]);
      window.dispatchEvent(new Event("storage"));
    }
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Breadcrumb */}
      <nav className="flex items-center text-xs text-gray-500 gap-1.5 py-1">
        <Link href="/" className="hover:text-red-600 flex items-center gap-1 transition">
          <Home className="w-3.5 h-3.5" />
          <span>{t("home")}</span>
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
        <span className="font-semibold text-gray-800">{t("bookmarks")}</span>
      </nav>

      {/* Header Banner */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-xs flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-yellow-100 text-yellow-700 flex items-center justify-center">
            <Bookmark className="w-6 h-6 fill-yellow-600" />
          </div>
          <div>
            <h1 className="text-xl sm:text-3xl font-black text-gray-900 tracking-tight">
              {t("bookmarks")}
            </h1>
            <p className="text-xs text-gray-500">
              {language === "np"
                ? `तपाईंले पछिका लागि सुरक्षित गर्नुभएका समाचारहरू (${toNepaliNum(savedArticles.length)})`
                : `Articles you saved for later reading (${savedArticles.length})`}
            </p>
          </div>
        </div>

        {savedArticles.length > 0 && (
          <button
            onClick={clearAllBookmarks}
            className="text-xs text-red-600 hover:text-red-700 font-semibold border border-red-200 hover:bg-red-50 px-3 py-1.5 rounded-lg transition"
          >
            {language === "np" ? "सबै मेटाउनुहोस्" : "Clear All"}
          </button>
        )}
      </div>

      {/* List */}
      {savedArticles.length > 0 ? (
        <div className="space-y-4">
          {savedArticles.map((article) => (
            <div
              key={article.id}
              className="bg-white rounded-xl border border-gray-200 p-4 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div className="flex items-start gap-4 flex-1">
                <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0 bg-gray-100">
                  <img
                    src={article.image}
                    alt={article.title[language]}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-red-600 uppercase">
                    {article.categoryName[language]}
                  </span>
                  <Link href={`/news/${article.slug}`}>
                    <h3 className="font-bold text-sm sm:text-base text-gray-900 hover:text-red-600 transition leading-snug line-clamp-2">
                      {article.title[language]}
                    </h3>
                  </Link>
                  <p className="text-xs text-gray-500">
                    {article.author.name[language]} • {article.dateNep}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto justify-end pt-2 sm:pt-0 border-t sm:border-t-0 border-gray-100">
                <Link
                  href={`/news/${article.slug}`}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1 transition"
                >
                  <span>{t("readMore")}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <button
                  onClick={() => removeBookmark(article.slug)}
                  className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                  title="Remove"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
          <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-gray-800 mb-1">
            {language === "np" ? "अहिलेसम्म कुनै समाचार सुरक्षित गरिएको छैन" : "No Saved Stories Yet"}
          </h3>
          <p className="text-xs text-gray-500 max-w-sm mx-auto mb-6">
            {language === "np"
              ? "कुनै पनि समाचार पढ्दा बुकमार्क (सुरक्षित) आइकनमा क्लिक गरी यहाँ संकलन गर्न सक्नुहुन्छ।"
              : "Click the bookmark icon on any news story to save it for offline reading later."}
          </p>
          <Link
            href="/"
            className="inline-block bg-red-600 hover:bg-red-700 text-white font-bold text-xs px-6 py-2.5 rounded-lg transition"
          >
            {language === "np" ? "ताजा समाचार हेर्नुहोस्" : "Browse News"}
          </Link>
        </div>
      )}
    </div>
  );
}
