"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Zap, ChevronRight, ChevronLeft } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { getBreakingNews } from "@/data/newsData";

export const BreakingTicker: React.FC = () => {
  const { language, t } = useLanguage();
  const breaking = getBreakingNews();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (breaking.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % breaking.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [breaking.length]);

  if (breaking.length === 0) return null;
  const current = breaking[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % breaking.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + breaking.length) % breaking.length);
  };

  return (
    <div className="bg-red-700 text-white text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center py-1.5 gap-3">
        {/* Badge */}
        <div className="flex items-center gap-1.5 bg-red-900/80 px-2.5 py-0.5 rounded text-xs font-bold uppercase tracking-wider shrink-0 animate-pulse">
          <Zap className="w-3.5 h-3.5 text-yellow-300" />
          <span>{t("breakingNews")}</span>
        </div>

        {/* Headline slider */}
        <div className="flex-1 overflow-hidden">
          <Link
            href={`/news/${current.slug}`}
            className="hover:underline transition-all block truncate font-medium hover:text-yellow-200"
          >
            {current.title[language]}
          </Link>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={handlePrev}
            aria-label="Previous headline"
            className="p-1 hover:bg-red-800 rounded transition"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
          <span className="text-[11px] opacity-75 font-mono">
            {currentIndex + 1}/{breaking.length}
          </span>
          <button
            onClick={handleNext}
            aria-label="Next headline"
            className="p-1 hover:bg-red-800 rounded transition"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
