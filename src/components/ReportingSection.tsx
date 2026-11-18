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
    <section className="my-12 sm:my-20">
      {/* Editorial Section Header with Oversized Index */}
      <div className="flex flex-col md:flex-row md:items-end justify-between pb-6 mb-8 border-b border-neutral-950 dark:border-neutral-200 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2 font-mono text-xs text-neutral-500 dark:text-neutral-400 uppercase tracking-[0.2em]">
            <span className="text-neutral-950 dark:text-white font-bold">01</span>
            <span className="text-neutral-300 dark:text-neutral-700">/</span>
            <span>GROUND INVESTIGATIONS</span>
          </div>
          <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl text-neutral-950 dark:text-white font-normal tracking-tight">
            {language === "np" ? "यो हो सानोकुरा रिपोर्टिङ" : "This is Sanokuraa Reporting"}
          </h2>
        </div>

        <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 max-w-md font-sans leading-relaxed">
          {language === "np"
            ? "राजनीति, संस्कृति, प्रविधि र भुइँतहका सत्य तथ्यहरूमा आधारित स्थलगत अनुसन्धान तथा वृत्तचित्र।"
            : "Ground-truth field reporting, spatial investigative beats, and independent digital documentation across Nepal."}
        </p>
      </div>

      {/* Minimalist Single-Sheet Broadsheet Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-neutral-200 dark:border-neutral-800 divide-y md:divide-y-0 divide-neutral-200 dark:divide-neutral-800">
        {displayReports.map((report, idx) => {
          // Border rules for seamless broadsheet sheet grid
          const isLgRightCol = (idx + 1) % 3 === 0;
          const isMdRightCol = (idx + 1) % 2 === 0;

          return (
            <article
              key={report.id}
              className={`group flex flex-col justify-between bg-white dark:bg-[#111827] p-5 sm:p-7 border-b border-neutral-200 dark:border-neutral-800 transition duration-300 ${
                !isLgRightCol ? "lg:border-r lg:border-neutral-200 lg:dark:border-neutral-800" : ""
              } ${
                !isMdRightCol ? "md:max-lg:border-r md:max-lg:border-neutral-200 md:max-lg:dark:border-neutral-800" : ""
              }`}
            >
              <div>
                {/* 16:9 Cover Image */}
                <Link
                  href={`/reporting/${report.slug}`}
                  className="block relative aspect-video w-full overflow-hidden bg-neutral-100 dark:bg-neutral-800 border border-neutral-200/80 dark:border-neutral-800"
                >
                  <img
                    src={report.coverImage}
                    alt={report.title[language]}
                    className="w-full h-full object-cover grayscale-[15%] group-hover:grayscale-0 group-hover:scale-[1.03] transition duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-neutral-950/0 group-hover:bg-neutral-950/10 transition duration-300" />
                  {/* Beat Badge Overlay */}
                  <div className="absolute top-3 left-3">
                    <span className="inline-block px-2 py-0.5 text-[10px] font-mono font-bold tracking-[0.15em] uppercase bg-white/95 dark:bg-neutral-900/95 text-neutral-900 dark:text-neutral-100 backdrop-blur-xs border border-neutral-200 dark:border-neutral-700 shadow-2xs">
                      {report.beat}
                    </span>
                  </div>
                </Link>

                {/* Title & Excerpt */}
                <div className="pt-5 space-y-2.5">
                  <Link href={`/reporting/${report.slug}`} className="block">
                    <h3 className="font-editorial text-xl sm:text-2xl text-neutral-950 dark:text-white font-medium leading-snug group-hover:text-accent transition duration-200">
                      {report.title?.[language] || report.title?.["en"] || ""}
                    </h3>
                  </Link>
                  <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2 leading-relaxed font-sans">
                    {report.excerpt?.[language] || report.excerpt?.["en"] || ""}
                  </p>
                </div>
              </div>

              {/* Byline & Footer */}
              <div className="pt-5 mt-6 border-t border-neutral-100 dark:border-neutral-800/80 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={report.reporter?.avatar || "/placeholder.jpg"}
                    alt={report.reporter?.name?.[language] || "Reporter"}
                    className="w-7 h-7 rounded-full object-cover border border-neutral-200 dark:border-neutral-700"
                  />
                  <div>
                    <p className="text-xs font-semibold text-neutral-900 dark:text-neutral-200 leading-tight">
                      {report.reporter?.name?.[language] || report.reporter?.name?.["en"] || ""}
                    </p>
                    <p className="text-[11px] text-neutral-500 dark:text-neutral-400 font-mono">
                      {report.date} • {report.readTime}
                    </p>
                  </div>
                </div>

                <Link
                  href={`/reporting/${report.slug}`}
                  className="text-neutral-400 group-hover:text-accent transition transform group-hover:translate-x-0.5"
                  aria-label="Read full dispatch"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};
