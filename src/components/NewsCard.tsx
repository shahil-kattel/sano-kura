"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Clock, Eye, Bookmark, Share2 } from "lucide-react";
import { NewsArticle } from "@/data/newsData";
import { useLanguage } from "@/context/LanguageContext";

interface NewsCardProps {
  article: NewsArticle;
  variant?: "vertical" | "horizontal" | "hero" | "compact" | "trending";
  rankingNumber?: number;
}

export const NewsCard: React.FC<NewsCardProps> = ({
  article,
  variant = "vertical",
  rankingNumber,
}) => {
  const { language, toNepaliNum } = useLanguage();
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("sano_kura_bookmarks") || "[]");
      if (Array.isArray(saved)) {
        setIsBookmarked(saved.some((item: any) => item.slug === article.slug));
      }
    } catch {
      setIsBookmarked(false);
    }
  }, [article.slug]);

  const toggleBookmark = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const saved = JSON.parse(localStorage.getItem("sano_kura_bookmarks") || "[]");
      let updated;
      if (isBookmarked) {
        updated = saved.filter((item: any) => item.slug !== article.slug);
        setIsBookmarked(false);
      } else {
        updated = [...saved, { slug: article.slug, title: article.title, date: article.date }];
        setIsBookmarked(true);
      }
      localStorage.setItem("sano_kura_bookmarks", JSON.stringify(updated));
      window.dispatchEvent(new Event("storage"));
    } catch (err) {
      console.error(err);
    }
  };

  // 1. HERO VARIANT (Lead Major Story)
  if (variant === "hero") {
    return (
      <div className="group relative bg-white border border-gray-200 rounded-xl overflow-hidden shadow-xs hover:shadow-md transition">
        <div className="relative h-72 sm:h-96 w-full overflow-hidden bg-gray-100">
          <img
            src={article.image}
            alt={article.title[language]}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />

          {/* Top category & breaking badge */}
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <Link
              href={`/category/${article.category}`}
              className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-3 py-1 rounded shadow-xs uppercase tracking-wide transition"
            >
              {article.categoryName[language]}
            </Link>
            {article.isBreaking && (
              <span className="bg-yellow-400 text-red-900 text-xs font-extrabold px-2.5 py-1 rounded shadow-xs uppercase tracking-wide animate-pulse">
                {language === "np" ? "ब्रेकिङ" : "BREAKING"}
              </span>
            )}
          </div>

          {/* Bookmark icon */}
          <button
            onClick={toggleBookmark}
            aria-label="Bookmark"
            className="absolute top-4 right-4 p-2 rounded-full bg-black/40 hover:bg-black/70 text-white transition backdrop-blur-xs"
          >
            <Bookmark
              className={`w-4 h-4 ${isBookmarked ? "text-yellow-400 fill-yellow-400" : ""}`}
            />
          </button>

          {/* Content overlay */}
          <div className="absolute bottom-0 inset-x-0 p-5 sm:p-7 text-white">
            <Link href={`/news/${article.slug}`} className="block">
              <h1 className="text-xl sm:text-3xl font-black leading-tight sm:leading-snug mb-2 hover:text-yellow-300 transition">
                {article.title[language]}
              </h1>
            </Link>
            <p className="hidden sm:block text-sm text-gray-200 line-clamp-2 mb-3 leading-relaxed">
              {article.excerpt[language]}
            </p>

            <div className="flex items-center gap-4 text-xs text-gray-300 pt-2 border-t border-white/20">
              <span className="font-medium text-white">{article.author.name[language]}</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-yellow-400" />
                {article.dateNep}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Eye className="w-3.5 h-3.5" />
                {toNepaliNum(article.views)} {language === "np" ? "पटक पढिएको" : "views"}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 2. TRENDING WITH RANKING NUMBER
  if (variant === "trending" && rankingNumber !== undefined) {
    return (
      <Link
        href={`/news/${article.slug}`}
        className="group flex items-start gap-4 p-3 rounded-lg hover:bg-red-50/60 transition border-b border-gray-100 last:border-b-0"
      >
        <div className="w-8 h-8 rounded-full bg-red-100 text-red-600 font-black text-lg flex items-center justify-center shrink-0 group-hover:bg-red-600 group-hover:text-white transition">
          {toNepaliNum(rankingNumber)}
        </div>
        <div className="flex-1">
          <h4 className="text-sm font-bold text-gray-900 group-hover:text-red-600 transition leading-snug line-clamp-2">
            {article.title[language]}
          </h4>
          <div className="flex items-center gap-2 text-[11px] text-gray-500 mt-1">
            <span className="text-red-600 font-medium">{article.categoryName[language]}</span>
            <span>•</span>
            <span>{article.readTime[language]}</span>
          </div>
        </div>
      </Link>
    );
  }

  // 3. HORIZONTAL VARIANT
  if (variant === "horizontal") {
    return (
      <div className="group bg-white border border-gray-100 hover:border-gray-200 rounded-lg p-3 sm:p-4 shadow-2xs hover:shadow-sm transition flex flex-col sm:flex-row gap-4 items-start">
        <div className="relative w-full sm:w-44 h-40 sm:h-28 shrink-0 rounded-md overflow-hidden bg-gray-100">
          <img
            src={article.image}
            alt={article.title[language]}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <Link
            href={`/category/${article.category}`}
            className="absolute top-2 left-2 bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-xs"
          >
            {article.categoryName[language]}
          </Link>
        </div>

        <div className="flex-1 w-full">
          <Link href={`/news/${article.slug}`}>
            <h3 className="text-base font-bold text-gray-900 group-hover:text-red-600 transition leading-snug mb-1.5 line-clamp-2">
              {article.title[language]}
            </h3>
          </Link>
          <p className="text-xs text-gray-600 line-clamp-2 mb-2 leading-relaxed">
            {article.excerpt[language]}
          </p>
          <div className="flex items-center justify-between text-[11px] text-gray-500 pt-2 border-t border-gray-100">
            <span className="font-medium text-gray-700">{article.author.name[language]}</span>
            <div className="flex items-center gap-2">
              <span>{article.dateNep}</span>
              <button
                onClick={toggleBookmark}
                aria-label="Bookmark"
                className="hover:text-red-600 transition"
              >
                <Bookmark
                  className={`w-3.5 h-3.5 ${isBookmarked ? "text-yellow-500 fill-yellow-500" : ""}`}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 4. COMPACT VARIANT (Text heavy for sidebars)
  if (variant === "compact") {
    return (
      <div className="group border-b border-gray-100 py-3 last:border-b-0">
        <div className="flex items-center gap-2 text-[11px] text-red-600 font-semibold mb-1">
          <Link href={`/category/${article.category}`} className="hover:underline">
            {article.categoryName[language]}
          </Link>
          <span className="text-gray-300">•</span>
          <span className="text-gray-400 font-normal">{article.readTime[language]}</span>
        </div>
        <Link href={`/news/${article.slug}`}>
          <h4 className="text-sm font-bold text-gray-800 group-hover:text-red-600 transition leading-snug line-clamp-2">
            {article.title[language]}
          </h4>
        </Link>
      </div>
    );
  }

  // 5. STANDARD VERTICAL CARD (Default)
  return (
    <div className="group bg-white border border-gray-200 hover:border-gray-300 rounded-xl overflow-hidden shadow-2xs hover:shadow-md transition flex flex-col h-full">
      <div className="relative h-48 w-full overflow-hidden bg-gray-100">
        <img
          src={article.image}
          alt={article.title[language]}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 left-3">
          <Link
            href={`/category/${article.category}`}
            className="bg-red-600 hover:bg-red-700 text-white text-[11px] font-bold px-2.5 py-0.5 rounded shadow-xs uppercase tracking-wide transition"
          >
            {article.categoryName[language]}
          </Link>
        </div>
        <button
          onClick={toggleBookmark}
          aria-label="Bookmark"
          className="absolute top-3 right-3 p-1.5 rounded-full bg-white/80 hover:bg-white text-gray-700 hover:text-red-600 transition shadow-xs"
        >
          <Bookmark
            className={`w-3.5 h-3.5 ${isBookmarked ? "text-yellow-500 fill-yellow-500" : ""}`}
          />
        </button>
      </div>

      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <Link href={`/news/${article.slug}`}>
            <h3 className="text-base font-bold text-gray-900 group-hover:text-red-600 transition leading-snug mb-2 line-clamp-2">
              {article.title[language]}
            </h3>
          </Link>
          <p className="text-xs text-gray-600 line-clamp-3 mb-3 leading-relaxed">
            {article.excerpt[language]}
          </p>
        </div>

        <div className="flex items-center justify-between text-[11px] text-gray-500 pt-3 border-t border-gray-100">
          <span className="font-medium text-gray-700">{article.author.name[language]}</span>
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3 text-gray-400" />
            {article.dateNep}
          </span>
        </div>
      </div>
    </div>
  );
};
