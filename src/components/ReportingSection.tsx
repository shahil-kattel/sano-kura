"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, Flame, Clock } from "lucide-react";
import { Report } from "@/types/sanokuraa";
import { useLanguage } from "@/context/LanguageContext";

interface ReportingSectionProps {
  reports: Report[];
}

export const ReportingSection: React.FC<ReportingSectionProps> = ({ reports }) => {
  const { language } = useLanguage();

  // Show up to 6 pinned/published reports for the 2x3 grid
  const featuredReports = reports
    .filter((r) => r.status === "PUBLISHED" && r.isPinnedToGrid)
    .slice(0, 6);

  const displayReports =
    featuredReports.length >= 6
      ? featuredReports
      : reports.filter((r) => r.status === "PUBLISHED").slice(0, 6);

  return (
    <section className="my-12 sm:my-16">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between pb-4 mb-8 border-b-2 border-ink">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2 h-2 bg-accent rounded-full" />
            <span className="font-mono text-xs uppercase tracking-widest text-slate font-bold">
              Newsroom Dispatches
            </span>
          </div>
          <h2 className="font-editorial text-3xl sm:text-4xl text-ink font-bold tracking-tight">
            {language === "np" ? "यो हो सानोकुरा रिपोर्टिङ" : "This is Sanokuraa Reporting"}
          </h2>
        </div>

        <p className="text-xs sm:text-sm text-slate mt-2 sm:mt-0 max-w-md font-sans">
          {language === "np"
            ? "राजनीति, संस्कृति, प्रविधि र भुइँतहका सत्य तथ्यहरूमा आधारित स्थलगत अनुसन्धान।"
            : "Ground-truth investigative beats, spatial dispatches, and public accountability reporting."}
        </p>
      </div>

      {/* Strict 2 Rows × 3 Columns Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {displayReports.map((report) => (
          <article
            key={report.id}
            className="group flex flex-col justify-between bg-sanok-paper rounded-xl border border-hairline overflow-hidden hover:border-ink/40 transition duration-200"
          >
            <div>
              {/* 16:9 Cover Image */}
              <Link
                href={`/reporting/${report.slug}`}
                className="block relative aspect-video w-full overflow-hidden bg-hairline"
              >
                <img
                  src={report.coverImage}
                  alt={report.title[language]}
                  className="w-full h-full object-cover group-hover:scale-103 transition duration-500 ease-out"
                />
                {/* Beat Badge Overlay */}
                <div className="absolute top-3 left-3">
                  <span className="inline-block px-2.5 py-1 text-[11px] font-mono font-bold tracking-wider uppercase bg-white/95 text-ink shadow-xs backdrop-blur-xs border border-hairline/80 rounded-md">
                    {report.beat}
                  </span>
                </div>
              </Link>

              {/* Title & Excerpt */}
              <div className="p-5 space-y-2.5">
                <Link href={`/reporting/${report.slug}`}>
                  <h3 className="font-editorial text-xl sm:text-2xl text-ink font-bold leading-snug group-hover:text-accent transition">
                    {report.title[language]}
                  </h3>
                </Link>
                <p className="text-xs sm:text-sm text-slate line-clamp-2 leading-relaxed">
                  {report.excerpt[language]}
                </p>
              </div>
            </div>

            {/* Byline & Footer */}
            <div className="px-5 pb-5 pt-3 border-t border-hairline/60 flex items-center justify-between mt-2">
              <div className="flex items-center gap-2.5">
                <img
                  src={report.reporter.avatar}
                  alt={report.reporter.name[language]}
                  className="w-8 h-8 rounded-full object-cover border border-hairline"
                />
                <div className="text-left">
                  <p className="text-xs font-bold text-ink leading-tight">
                    {report.reporter.name[language]}
                  </p>
                  <p className="text-[11px] text-slate font-mono">
                    {report.date} • {report.readTime}
                  </p>
                </div>
              </div>

              <Link
                href={`/reporting/${report.slug}`}
                className="w-7 h-7 rounded-full bg-sanok hover:bg-hairline flex items-center justify-center text-slate hover:text-ink transition"
                aria-label="Read full report"
              >
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
