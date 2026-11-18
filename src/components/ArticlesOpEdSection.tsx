"use client";

import React from "react";
import Link from "next/link";
import { Feather, ArrowRight, BookOpen } from "lucide-react";
import { Article } from "@/types/sanokuraa";
import { useLanguage } from "@/context/LanguageContext";

interface ArticlesOpEdSectionProps {
  articles: Article[];
}

export const ArticlesOpEdSection: React.FC<ArticlesOpEdSectionProps> = ({ articles }) => {
  const { language } = useLanguage();

  const published = articles.filter((a) => a.status === "PUBLISHED");
  const leadArticle = published.find((a) => a.isFeaturedLead) || published[0];
  const stackedArticles = published.filter((a) => a.id !== leadArticle?.id).slice(0, 3);

  if (!leadArticle) return null;

  return (
    <section className="my-16 sm:my-24">
      {/* Editorial Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between pb-6 mb-10 border-b border-neutral-900 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2 font-mono text-xs text-neutral-500 uppercase tracking-[0.2em]">
            <span className="text-neutral-900 font-bold">02</span>
            <span className="text-neutral-300">/</span>
            <span>PERSPECTIVES & ESSAYS</span>
          </div>
          <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl text-neutral-950 font-normal tracking-tight">
            {language === "np" ? "विचार, स्तम्भ तथा विमर्श" : "Articles & Long-Form Essays"}
          </h2>
        </div>

        <p className="text-xs sm:text-sm text-neutral-600 max-w-md font-sans leading-relaxed">
          {language === "np"
            ? "गम्भीर विचार, दार्शनिक विश्लेषण र समाज रूपान्तरणका बहुआयामिक दृष्टिकोणहरू।"
            : "Critical commentary, cultural philosophy, and intellectual essays by leading thinkers and writers."}
        </p>
      </div>

      {/* Asymmetric Editorial Split (1 Featured Lead + 3 Stacked Columns) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
        {/* Left: Featured Lead Op-Ed (7 Cols) */}
        <article className="lg:col-span-7 flex flex-col justify-between bg-white rounded-2xl border border-neutral-200/90 p-6 sm:p-8 md:p-10 hover:border-neutral-900/60 transition duration-300 group">
          <div className="space-y-6">
            {/* Top Author Block */}
            <div className="flex items-center gap-4 pb-6 border-b border-neutral-200">
              <img
                src={leadArticle.author.avatar}
                alt={leadArticle.author.name[language]}
                className="w-14 h-14 rounded-full object-cover border border-neutral-200 shrink-0"
              />
              <div>
                <p className="text-[11px] font-mono uppercase tracking-[0.15em] text-accent font-semibold">
                  FEATURED COLUMNIST
                </p>
                <h4 className="text-base sm:text-lg font-bold text-neutral-900">
                  {leadArticle.author.name[language]}
                </h4>
                <p className="text-xs text-neutral-500 line-clamp-1 font-mono">
                  {leadArticle.author.designation[language]}
                </p>
              </div>
            </div>

            {/* Optional Cover image */}
            {leadArticle.coverImage && (
              <Link
                href={`/articles/${leadArticle.slug}`}
                className="block relative aspect-21/9 w-full rounded-xl overflow-hidden bg-neutral-100"
              >
                <img
                  src={leadArticle.coverImage}
                  alt={leadArticle.headline[language]}
                  className="w-full h-full object-cover group-hover:scale-102 transition duration-700"
                />
              </Link>
            )}

            {/* Lead Headline & Deck */}
            <div className="space-y-4">
              <Link href={`/articles/${leadArticle.slug}`} className="block">
                <h3 className="font-editorial text-2xl sm:text-3xl lg:text-4xl text-neutral-950 font-normal leading-[1.25] group-hover:text-accent transition duration-200">
                  {leadArticle.headline[language]}
                </h3>
              </Link>
              <div className="pl-4 border-l-2 border-accent/40 italic font-editorial text-base sm:text-lg text-neutral-600 leading-relaxed">
                "{leadArticle.deck[language]}"
              </div>
            </div>
          </div>

          <div className="pt-6 mt-8 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-500 font-mono">
            <span>
              {leadArticle.date} • {leadArticle.readTime}
            </span>
            <Link
              href={`/articles/${leadArticle.slug}`}
              className="inline-flex items-center gap-1.5 text-neutral-900 group-hover:text-accent font-semibold transition"
            >
              <span>Read Essay</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </article>

        {/* Right: 3 Stacked Column Essays (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between divide-y divide-neutral-200 bg-white rounded-2xl border border-neutral-200/90 p-6 sm:p-8">
          {stackedArticles.map((article, idx) => (
            <article
              key={article.id}
              className="py-6 first:pt-0 last:pb-0 space-y-3 group"
            >
              <div className="flex items-center gap-3">
                <img
                  src={article.author.avatar}
                  alt={article.author.name[language]}
                  className="w-9 h-9 rounded-full object-cover border border-neutral-200 shrink-0"
                />
                <div>
                  <h4 className="text-xs font-bold text-neutral-900 leading-tight">
                    {article.author.name[language]}
                  </h4>
                  <p className="text-[10px] text-neutral-500 font-mono">
                    {article.author.designation[language]}
                  </p>
                </div>
              </div>

              <Link href={`/articles/${article.slug}`} className="block">
                <h4 className="font-editorial text-lg sm:text-xl text-neutral-950 font-normal leading-snug group-hover:text-accent transition duration-200">
                  {article.headline[language]}
                </h4>
              </Link>

              <p className="text-xs text-neutral-600 line-clamp-2 leading-relaxed font-sans">
                {article.deck[language]}
              </p>

              <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400 pt-1">
                <span>{article.readTime}</span>
                <Link
                  href={`/articles/${article.slug}`}
                  className="text-neutral-700 hover:text-accent transition font-semibold"
                >
                  Read →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
