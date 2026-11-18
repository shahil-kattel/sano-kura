"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Quote as QuoteIcon, Shuffle, Copy, Check, Sparkles, ArrowRight } from "lucide-react";
import { Quote } from "@/types/sanokuraa";
import { useLanguage } from "@/context/LanguageContext";

interface QuoteHeroProps {
  initialQuotes: Quote[];
}

export const QuoteHero: React.FC<QuoteHeroProps> = ({ initialQuotes }) => {
  const { language } = useLanguage();
  const activeQuotes = initialQuotes.filter((q) => q.isActive);

  // Hydration-safe initial index
  const [currentIndex, setCurrentIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const [isFading, setIsFading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (activeQuotes.length > 1) {
      const randomIndex = Math.floor(Math.random() * activeQuotes.length);
      setCurrentIndex(randomIndex);
    }
  }, [activeQuotes.length]);

  const currentQuote = activeQuotes[currentIndex] || activeQuotes[0];

  if (!currentQuote) return null;

  const handleShuffle = () => {
    if (activeQuotes.length <= 1) return;
    setIsFading(true);
    setTimeout(() => {
      let nextIndex = Math.floor(Math.random() * activeQuotes.length);
      if (nextIndex === currentIndex) {
        nextIndex = (currentIndex + 1) % activeQuotes.length;
      }
      setCurrentIndex(nextIndex);
      setIsFading(false);
    }, 180);
  };

  const handleCopy = async () => {
    const textToCopy = `"${currentQuote.quoteText[language]}" — ${currentQuote.author[language]} (via Sanokuraa)`;
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.warn("Failed to copy:", err);
    }
  };

  const isGraphic = Boolean(currentQuote.graphicUrl);
  const quoteNumber = String(currentIndex + 1).padStart(2, "0");
  const totalCount = String(activeQuotes.length).padStart(2, "0");

  return (
    <section className="relative w-full border border-neutral-200/90 bg-white rounded-2xl p-6 sm:p-10 md:p-14 my-6 sm:my-8 transition-all duration-300">
      {/* Top Gallery Metadata Strip */}
      <div className="flex items-center justify-between pb-6 sm:pb-8 border-b border-neutral-200 text-xs font-mono">
        <div className="flex items-center gap-3 text-neutral-500">
          <span className="flex items-center gap-1.5 text-neutral-900 font-semibold tracking-wider">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span>DISPATCH NOTE</span>
          </span>
          <span className="text-neutral-300">/</span>
          <span className="hidden sm:inline-block uppercase tracking-wider text-[11px] text-neutral-500">
            {currentQuote.tag}
          </span>
          <span className="hidden sm:inline-block text-neutral-300">/</span>
          <span className="text-[11px] text-neutral-400">
            ENTRY {quoteNumber} OF {totalCount}
          </span>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-mono font-medium transition cursor-pointer ${
              copied
                ? "bg-emerald-50 border-emerald-300 text-emerald-700"
                : "bg-[#FAFAFA] hover:bg-neutral-100 border-neutral-200 text-neutral-800"
            }`}
            title="Copy Quote to Clipboard"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="font-semibold">COPIED</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-neutral-500" />
                <span className="hidden xs:inline">COPY</span>
              </>
            )}
          </button>

          <button
            onClick={handleShuffle}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-mono font-medium transition cursor-pointer"
            title="Cycle to next quote"
          >
            <Shuffle className="w-3.5 h-3.5" />
            <span className="hidden xs:inline">SHUFFLE</span>
          </button>
        </div>
      </div>

      {/* Main Quote Content */}
      <div
        className={`pt-8 sm:pt-12 transition-opacity duration-200 ${
          isFading ? "opacity-20" : "opacity-100"
        }`}
      >
        {isGraphic ? (
          /* Graphic Quote Card: Art Gallery Placement */
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="md:col-span-5 relative aspect-4/3 md:aspect-square w-full rounded-xl overflow-hidden border border-neutral-200 bg-neutral-50 group">
              <img
                src={currentQuote.graphicUrl}
                alt={currentQuote.author[language]}
                className="w-full h-full object-cover grayscale contrast-105 group-hover:grayscale-0 group-hover:scale-102 transition duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-3 right-3 text-white text-[11px] font-mono tracking-wider opacity-90 truncate">
                ARCHIVE VISUAL • SANOKURAA ATELIER
              </div>
            </div>

            <div className="md:col-span-7 space-y-6">
              <span className="font-editorial text-4xl sm:text-5xl text-accent font-light leading-none select-none block">
                “
              </span>
              <blockquote className="font-editorial text-2xl sm:text-3xl lg:text-4xl text-neutral-950 font-normal leading-[1.3] tracking-tight">
                {currentQuote.quoteText[language]}
              </blockquote>
              <div className="pt-4 border-t border-neutral-200/80">
                <p className="font-editorial text-lg sm:text-xl font-medium text-neutral-900">
                  — {currentQuote.author[language]}
                </p>
                <p className="font-mono text-xs text-neutral-500 mt-1 uppercase tracking-wider">
                  Category: {currentQuote.tag} • Curated Thought
                </p>
              </div>
            </div>
          </div>
        ) : (
          /* Text-Only Editorial Quote: High Typography */
          <div className="max-w-4xl mx-auto space-y-6">
            <span className="font-editorial text-5xl sm:text-6xl text-accent/40 font-light leading-none select-none block">
              “
            </span>
            <blockquote className="font-editorial text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-neutral-950 font-light leading-[1.25] tracking-tight">
              {currentQuote.quoteText[language]}
            </blockquote>
            <div className="pt-6 sm:pt-8 border-t border-neutral-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <p className="font-editorial text-xl sm:text-2xl font-medium text-neutral-900">
                  — {currentQuote.author[language]}
                </p>
                <p className="font-mono text-xs text-neutral-500 mt-1 uppercase tracking-wider">
                  Beat: {currentQuote.tag} • Independent Reflection
                </p>
              </div>
              <div className="font-mono text-[11px] text-neutral-400 uppercase tracking-widest">
                SANOKURAA EDITORIAL NOTE #{quoteNumber}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
