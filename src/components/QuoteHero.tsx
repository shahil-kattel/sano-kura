"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Quote as QuoteIcon, Shuffle, Copy, Check, Sparkles } from "lucide-react";
import { Quote } from "@/types/sanokuraa";
import { useLanguage } from "@/context/LanguageContext";

interface QuoteHeroProps {
  initialQuotes: Quote[];
}

export const QuoteHero: React.FC<QuoteHeroProps> = ({ initialQuotes }) => {
  const { language } = useLanguage();
  const activeQuotes = initialQuotes.filter((q) => q.isActive);

  // Hydration-safe initial index (default to 0 on server, randomize on client mount)
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

  return (
    <section className="relative w-full border border-hairline bg-sanok-paper rounded-2xl p-6 sm:p-10 md:p-14 my-4 sm:my-6 transition-all duration-300">
      {/* Top Utility Header inside Card */}
      <div className="flex items-center justify-between pb-6 sm:pb-8 border-b border-hairline/80 text-xs text-slate">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          <span className="font-mono uppercase tracking-widest text-[11px] font-medium text-ink">
            Sanokuraa Thought of the Day
          </span>
          <span className="hidden sm:inline-block text-hairline">|</span>
          <span className="hidden sm:inline-block px-2 py-0.5 rounded-full bg-sanok border border-hairline text-[10px] uppercase font-mono font-semibold text-slate">
            {currentQuote.tag}
          </span>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition cursor-pointer ${
              copied
                ? "bg-emerald-50 border-emerald-300 text-emerald-700"
                : "bg-sanok hover:bg-hairline/60 border-hairline text-ink"
            }`}
            title="Copy Quote to Clipboard"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="font-semibold">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate" />
                <span className="hidden xs:inline">Copy Quote</span>
              </>
            )}
          </button>

          <button
            onClick={handleShuffle}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sanok hover:bg-hairline/60 border border-hairline text-xs font-medium text-ink transition cursor-pointer"
            title="Shuffle Quote"
          >
            <Shuffle className="w-3.5 h-3.5 text-slate" />
            <span className="hidden xs:inline">Shuffle</span>
          </button>
        </div>
      </div>

      {/* Main Quote Canvas */}
      <div
        className={`pt-8 sm:pt-10 transition-opacity duration-200 ${
          isFading ? "opacity-20" : "opacity-100"
        }`}
      >
        {isGraphic ? (
          /* Graphic Quote Card */
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-5 relative aspect-square sm:aspect-4/3 md:aspect-square w-full rounded-xl overflow-hidden border border-hairline bg-sanok">
              <img
                src={currentQuote.graphicUrl}
                alt={currentQuote.author[language]}
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-3 right-3 text-white text-[11px] font-mono tracking-wider opacity-90 truncate">
                Framed artwork • Sanokuraa Archive
              </div>
            </div>

            <div className="md:col-span-7 space-y-5">
              <QuoteIcon className="w-8 h-8 text-accent/30" />
              <blockquote className="font-editorial text-2xl sm:text-3xl lg:text-4xl text-ink leading-snug tracking-tight">
                "{currentQuote.quoteText[language]}"
              </blockquote>
              <div className="pt-3 border-t border-hairline">
                <p className="font-sans font-bold text-base text-ink tracking-tight">
                  — {currentQuote.author[language]}
                </p>
                <p className="font-mono text-xs text-slate mt-0.5">
                  Collection: {currentQuote.tag}
                </p>
              </div>
            </div>
          </div>
        ) : (
          /* Text-Only Editorial Quote */
          <div className="max-w-4xl mx-auto space-y-6 text-center sm:text-left">
            <QuoteIcon className="w-10 h-10 text-accent/30 mx-auto sm:mx-0" />
            <blockquote className="font-editorial text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-ink leading-tight sm:leading-snug tracking-tight font-normal">
              "{currentQuote.quoteText[language]}"
            </blockquote>
            <div className="pt-4 sm:pt-6 border-t border-hairline/80 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div>
                <p className="font-sans font-extrabold text-base sm:text-lg text-ink">
                  — {currentQuote.author[language]}
                </p>
                <p className="font-mono text-xs text-slate mt-0.5">
                  Category: {currentQuote.tag} • Curated by Sanokuraa
                </p>
              </div>
              <span className="font-mono text-[11px] text-slate/70">
                #{currentIndex + 1} of {activeQuotes.length}
              </span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
