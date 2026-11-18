"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Clock, Share2, Check, Feather } from "lucide-react";
import { useSanokuraa } from "@/context/SanokuraaContext";
import { useLanguage } from "@/context/LanguageContext";

export default function ArticleDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const { articles } = useSanokuraa();
  const { language } = useLanguage();

  const article = articles.find((a) => a.slug === slug);
  const [copied, setCopied] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Reading progress indicator
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, currentProgress)));
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!article) {
    return (
      <div className="py-24 text-center space-y-4">
        <h2 className="font-editorial text-3xl font-bold text-ink">Essay Not Found</h2>
        <p className="text-xs font-mono text-slate">The article or op-ed column you requested could not be located.</p>
        <Link
          href="/#articles"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-ink text-white text-xs font-mono font-bold"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Essays & Op-Ed</span>
        </Link>
      </div>
    );
  }

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  return (
    <>
      {/* Sticky Reading Progress Indicator Bar at Very Top */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-transparent pointer-events-none">
        <div
          className="h-full bg-accent transition-all duration-75"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <article className="max-w-2xl mx-auto my-10 sm:my-16 px-4 sm:px-0">
        {/* Navigation Breadcrumb */}
        <div className="mb-8 flex items-center justify-between">
          <Link
            href="/#articles"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-slate hover:text-ink transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Columns & Op-Ed</span>
          </Link>

          <span className="text-xs font-mono text-slate">
            {article.readTime}
          </span>
        </div>

        {/* Essay Header */}
        <header className="space-y-6 pb-8 border-b border-hairline text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sanok border border-hairline text-xs font-mono text-accent font-bold uppercase tracking-wider">
            <Feather className="w-3.5 h-3.5" />
            <span>Patramanjusha & Sanokuraa Perspectives</span>
          </div>

          <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold text-ink leading-tight tracking-tight">
            {article.headline[language]}
          </h1>

          <p className="font-editorial text-lg sm:text-xl text-slate italic leading-relaxed max-w-xl mx-auto">
            "{article.deck[language]}"
          </p>

          {/* Author Block */}
          <div className="pt-4 flex flex-col items-center justify-center space-y-2">
            <img
              src={article.author.avatar}
              alt={article.author.name[language]}
              className="w-16 h-16 rounded-full object-cover border-2 border-hairline shadow-sm"
            />
            <div>
              <p className="text-base font-bold text-ink">{article.author.name[language]}</p>
              <p className="text-xs font-mono text-slate">{article.author.designation[language]}</p>
            </div>
            <p className="text-[11px] font-mono text-slate/80">{article.date}</p>
          </div>
        </header>

        {/* Optional Cover image */}
        {article.coverImage && (
          <div className="my-10 rounded-2xl overflow-hidden border border-hairline bg-sanok">
            <img
              src={article.coverImage}
              alt={article.headline[language]}
              className="w-full h-auto object-cover"
            />
          </div>
        )}

        {/* Essay Body with Drop Cap & Pull-Quotes */}
        <div className="pt-8 space-y-6 text-ink/90 font-sans text-base sm:text-lg leading-relaxed">
          {article.content[language]?.map((paragraph, index) => (
            <React.Fragment key={index}>
              <p
                className={
                  index === 0
                    ? "first-letter:float-left first-letter:text-6xl first-letter:pr-3.5 first-letter:pt-1 first-letter:font-editorial first-letter:font-bold first-letter:text-accent leading-relaxed"
                    : "leading-relaxed"
                }
              >
                {paragraph}
              </p>

              {/* Insert Pull-Quote after paragraph 1 if available */}
              {index === 0 && (
                <blockquote className="my-8 pl-6 border-l-2 border-accent font-editorial text-xl sm:text-2xl text-ink italic leading-snug bg-sanok/60 py-4 pr-4 rounded-r-xl">
                  "{article.deck[language]}"
                </blockquote>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Author Bio Box */}
        <section className="mt-14 p-6 sm:p-8 bg-sanok-paper rounded-2xl border border-hairline flex flex-col sm:flex-row items-center sm:items-start gap-5">
          <img
            src={article.author.avatar}
            alt={article.author.name[language]}
            className="w-16 h-16 rounded-full object-cover border border-hairline shrink-0"
          />
          <div className="space-y-1.5 text-center sm:text-left flex-1">
            <p className="font-mono text-xs uppercase tracking-wider text-accent font-bold">
              About the Author
            </p>
            <h4 className="font-bold text-base text-ink">{article.author.name[language]}</h4>
            <p className="text-xs text-slate leading-relaxed">{article.author.bio[language]}</p>
          </div>
        </section>

        {/* Share & Return */}
        <div className="mt-10 pt-6 border-t border-hairline flex items-center justify-between text-xs font-mono">
          <Link
            href="/#articles"
            className="inline-flex items-center gap-1.5 text-ink hover:text-accent font-bold transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Op-Ed Index</span>
          </Link>

          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-hairline bg-white hover:bg-sanok text-ink transition cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
            <span>{copied ? "Link Copied" : "Share Essay"}</span>
          </button>
        </div>
      </article>
    </>
  );
}
