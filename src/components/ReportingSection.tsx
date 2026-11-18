"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, Clock, ArrowRight } from "lucide-react";
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
    <section className="my-16 sm:my-24">
      {/* Editorial Section Header with Oversized Index */}
      <div className="flex flex-col md:flex-row md:items-end justify-between pb-6 mb-10 border-b border-neutral-900 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2 font-mono text-xs text-neutral-500 uppercase tracking-[0.2em]">
            <span className="text-neutral-900 font-bold">01</span>
            <span className="text-neutral-300">/</span>
            <span>GROUND INVESTIGATIONS</span>
          </div>
          <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl text-neutral-950 font-normal tracking-tight">
            {language === "np" ? "यो हो सानोकुरा रिपोर्टिङ" : "This is Sanokuraa Reporting"}
          </h2>
        </div>

        <p className="text-xs sm:text-sm text-neutral-600 max-w-md font-sans leading-relaxed">
          {language === "np"
            ? "राजनीति, संस्कृति, प्रविधि र भुइँतहका सत्य तथ्यहरूमा आधारित स्थलगत अनुसन्धान तथा वृत्तचित्र।"
            : "Ground-truth field reporting, spatial investigative beats, and independent digital documentation across Nepal."}
        </p>
      </div>

      {/* Strict 2 Rows × 3 Columns Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {displayReports.map((report, idx) => (
          <article
            key={report.id}
            className="group flex flex-col justify-between bg-white rounded-xl border border-neutral-200/90 overflow-hidden hover:border-neutral-900/60 transition duration-300"
          >
            <div>
              {/* 16:9 Cover Image */}
              <Link
                href={`/reporting/${report.slug}`}
                className="block relative aspect-video w-full overflow-hidden bg-neutral-100"
              >
                <img
                  src={report.coverImage}
                  alt={report.title[language]}
                  className="w-full h-full object-cover group-hover:scale-[1.03] transition duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-neutral-950/0 group-hover:bg-neutral-950/10 transition duration-300" />
                {/* Beat Badge Overlay */}
                <div className="absolute top-3.5 left-3.5">
                  <span className="inline-block px-2.5 py-1 text-[10px] font-mono font-bold tracking-[0.15em] uppercase bg-white/95 text-neutral-900 backdrop-blur-xs border border-neutral-200 rounded-md shadow-2xs">
                    {report.beat}
                  </span>
                </div>
              </Link>

              {/* Title & Excerpt */}
              <div className="p-6 space-y-3">
                <Link href={`/reporting/${report.slug}`} className="block">
                  <h3 className="font-editorial text-xl sm:text-2xl text-neutral-950 font-medium leading-snug group-hover:text-accent transition duration-200">
                    {report.title[language]}
                  </h3>
                </Link>
                <p className="text-xs sm:text-sm text-neutral-600 line-clamp-2 leading-relaxed font-sans">
                  {report.excerpt[language]}
                </p>
              </div>
            </div>

            {/* Byline & Footer */}
            <div className="px-6 pb-6 pt-4 border-t border-neutral-100 flex items-center justify-between mt-auto">
              <div className="flex items-center gap-3">
                <img
                  src={report.reporter.avatar}
                  alt={report.reporter.name[language]}
                  className="w-8 h-8 rounded-full object-cover border border-neutral-200"
                />
                <div>
                  <p className="text-xs font-semibold text-neutral-900 leading-tight">
                    {report.reporter.name[language]}
                  </p>
                  <p className="text-[11px] text-neutral-500 font-mono">
                    {report.date} • {report.readTime}
                  </p>
                </div>
              </div>

              <Link
                href={`/reporting/${report.slug}`}
                className="text-neutral-400 group-hover:text-accent transition transform group-hover:translate-x-0.5"
                aria-label="Read full dispatch"
              >
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
