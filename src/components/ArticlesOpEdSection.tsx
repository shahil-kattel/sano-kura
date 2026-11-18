"use client";

import React from "react";
import Link from "next/link";
import { Feather, ArrowUpRight, BookOpen } from "lucide-react";
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
    <section className="my-14 sm:my-20">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between pb-4 mb-8 border-b-2 border-ink">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <Feather className="w-4 h-4 text-accent" />
            <span className="font-mono text-xs uppercase tracking-widest text-slate font-bold">
              Perspectives & Columns
            </span>
          </div>
          <h2 className="font-editorial text-3xl sm:text-4xl text-ink font-bold tracking-tight">
            {language === "np" ? "विचार, स्तम्भ तथा विमर्श" : "Articles & Long-Form Essays"}
          </h2>
        </div>

        <p className="text-xs sm:text-sm text-slate mt-2 sm:mt-0 max-w-md font-sans">
          {language === "np"
            ? "गम्भीर विचार, दार्शनिक विश्लेषण र समाज रूपान्तरणका बहुआयामिक दृष्टिकोणहरू।"
            : "In-depth intellectual commentary, cultural criticism, and constitutional reflections."}
        </p>
      </div>

      {/* Asymmetric Editorial Split (1 Featured Lead + 3 Stacked Columns) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
        {/* Left: Featured Lead Op-Ed (7 Cols) */}
        <article className="lg:col-span-7 flex flex-col justify-between bg-sanok-paper rounded-2xl border border-hairline p-6 sm:p-8 hover:border-ink/50 transition">
          <div className="space-y-6">
            {/* Top Author Block */}
            <div className="flex items-center gap-4 pb-6 border-b border-hairline">
              <img
                src={leadArticle.author.avatar}
                alt={leadArticle.author.name[language]}
                className="w-16 h-16 rounded-full object-cover border-2 border-hairline shadow-xs shrink-0"
              />
              <div>
                <p className="text-sm font-mono uppercase tracking-wider text-accent font-bold">
                  Featured Columnist
                </p>
                <h4 className="text-base sm:text-lg font-bold text-ink">
                  {leadArticle.author.name[language]}
                </h4>
                <p className="text-xs text-slate mt-0.5 line-clamp-1">
                  {leadArticle.author.designation[language]}
                </p>
              </div>
            </div>

            {/* Optional Cover artwork or image */}
            {leadArticle.coverImage && (
              <Link
                href={`/articles/${leadArticle.slug}`}
                className="block relative aspect-21/9 w-full rounded-xl overflow-hidden bg-hairline"
              >
                <img
                  src={leadArticle.coverImage}
                  alt={leadArticle.headline[language]}
                  className="w-full h-full object-cover hover:scale-102 transition duration-500"
                />
              </Link>
            )}

            {/* Lead Headline & Deck */}
            <div className="space-y-3">
              <Link href={`/articles/${leadArticle.slug}`}>
                <h3 className="font-editorial text-2xl sm:text-3xl lg:text-4xl text-ink font-bold leading-tight hover:text-accent transition">
                  {leadArticle.headline[language]}
                </h3>
              </Link>
              <p className="font-editorial text-base sm:text-lg text-slate italic leading-relaxed">
                "{leadArticle.deck[language]}"
              </p>
            </div>
          </div>

          <div className="pt-6 mt-6 border-t border-hairline flex items-center justify-between text-xs text-slate">
            <span className="font-mono">
              {leadArticle.date} • {leadArticle.readTime}
            </span>
            <Link
              href={`/articles/${leadArticle.slug}`}
              className="inline-flex items-center gap-1.5 font-bold text-ink hover:text-accent transition"
            >
              <span>Read Full Essay</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </article>

        {/* Right: Stacked Author Columns (5 Cols, separated by 1px hairlines) */}
        <div className="lg:col-span-5 flex flex-col justify-between divide-y divide-hairline bg-sanok-paper rounded-2xl border border-hairline p-6">
          {stackedArticles.map((article, idx) => (
            <article
              key={article.id}
              className={`flex flex-col justify-between ${
                idx === 0 ? "pb-6" : idx === stackedArticles.length - 1 ? "pt-6" : "py-6"
              }`}
            >
              <div className="flex items-start gap-4">
                <img
                  src={article.author.avatar}
                  alt={article.author.name[language]}
                  className="w-12 h-12 rounded-full object-cover border border-hairline shrink-0 mt-1"
                />
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-bold text-ink">
                      {article.author.name[language]}
                    </p>
                    <span className="text-[11px] font-mono text-slate">
                      {article.readTime}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate line-clamp-1 font-mono">
                    {article.author.designation[language]}
                  </p>

                  <Link href={`/articles/${article.slug}`}>
                    <h4 className="font-editorial text-lg sm:text-xl text-ink font-bold leading-snug hover:text-accent transition pt-1">
                      {article.headline[language]}
                    </h4>
                  </Link>

                  <p className="text-xs text-slate line-clamp-2 leading-relaxed pt-1">
                    {article.deck[language]}
                  </p>
                </div>
              </div>

              <div className="flex justify-end pt-3">
                <Link
                  href={`/articles/${article.slug}`}
                  className="text-xs text-slate hover:text-ink font-mono inline-flex items-center gap-1 transition"
                >
                  <span>Read Column</span>
                  <ArrowUpRight className="w-3 h-3" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
