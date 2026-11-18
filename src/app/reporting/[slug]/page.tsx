"use client";

import React from "react";
import Link from "next/link";
import { useParams, notFound } from "next/navigation";
import { ArrowLeft, Clock, Share2, Bookmark, Check, Calendar } from "lucide-react";
import { useSanokuraa } from "@/context/SanokuraaContext";
import { useLanguage } from "@/context/LanguageContext";

export default function ReportDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const { reports } = useSanokuraa();
  const { language } = useLanguage();

  const report = reports.find((r) => r.slug === slug);
  const [copied, setCopied] = React.useState(false);

  if (!report) {
    return (
      <div className="py-24 text-center space-y-4">
        <h2 className="font-editorial text-3xl font-bold text-ink">Report Not Found</h2>
        <p className="text-xs font-mono text-slate">The investigative report you requested could not be located.</p>
        <Link
          href="/#reporting"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-ink text-white text-xs font-mono font-bold"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Reporting Grid</span>
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
    <article className="max-w-4xl mx-auto my-8 sm:my-12 px-2 sm:px-0">
      {/* Back button */}
      <div className="mb-6">
        <Link
          href="/#reporting"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-slate hover:text-ink transition"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to All Reports</span>
        </Link>
      </div>

      {/* Header Info */}
      <header className="space-y-4 pb-8 border-b border-hairline">
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-white border border-hairline text-accent">
            {report.beat}
          </span>
          <span className="text-hairline">•</span>
          <span className="text-xs font-mono text-slate">
            Dispatched from {report.date}
          </span>
        </div>

        <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold text-ink leading-tight tracking-tight">
          {report.title[language]}
        </h1>

        <p className="font-editorial text-lg sm:text-xl text-slate italic leading-relaxed">
          {report.excerpt[language]}
        </p>

        {/* Reporter Byline Bar */}
        <div className="pt-4 flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <img
              src={report.reporter.avatar}
              alt={report.reporter.name[language]}
              className="w-11 h-11 rounded-full object-cover border border-hairline"
            />
            <div>
              <p className="text-sm font-bold text-ink">{report.reporter.name[language]}</p>
              <p className="text-xs font-mono text-slate">{report.reporter.role[language]}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="text-slate flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              <span>{report.readTime}</span>
            </span>
            <button
              onClick={handleShare}
              className="ml-2 inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-hairline bg-white hover:bg-sanok text-ink transition cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copied ? "Link Copied" : "Share"}</span>
            </button>
          </div>
        </div>
      </header>

      {/* 16:9 Cover Image */}
      <div className="my-8 rounded-2xl overflow-hidden border border-hairline aspect-video w-full bg-sanok">
        <img
          src={report.coverImage}
          alt={report.title[language]}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Narrative Body Content */}
      <div className="prose prose-lg max-w-none text-ink font-sans leading-relaxed space-y-6 pt-4">
        {report.content[language]?.map((paragraph, index) => (
          <p
            key={index}
            className={`text-base sm:text-lg leading-relaxed text-ink/90 ${
              index === 0
                ? "first-letter:float-left first-letter:text-5xl first-letter:pr-3 first-letter:font-editorial first-letter:font-bold first-letter:text-accent"
                : ""
            }`}
          >
            {paragraph}
          </p>
        ))}
      </div>

      {/* Report Footer */}
      <div className="mt-12 pt-8 border-t border-hairline flex items-center justify-between">
        <Link
          href="/#reporting"
          className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-ink hover:text-accent transition"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Reporting Grid</span>
        </Link>
        <span className="text-xs font-mono text-slate">
          Sanokuraa Investigative Dispatches
        </span>
      </div>
    </article>
  );
}
