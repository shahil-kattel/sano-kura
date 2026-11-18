"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, MapPin, Calendar, Images, Share2, Check } from "lucide-react";
import { useSanokuraa } from "@/context/SanokuraaContext";
import { useLanguage } from "@/context/LanguageContext";

export default function PhotoStoryDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const { photoStories } = useSanokuraa();
  const { language } = useLanguage();

  const story = photoStories.find((s) => s.slug === slug);
  const [copied, setCopied] = useState(false);

  if (!story) {
    return (
      <div className="py-24 text-center space-y-4">
        <h2 className="font-editorial text-3xl font-bold text-ink">Photo Essay Not Found</h2>
        <p className="text-xs font-mono text-slate">The curated photo story you requested could not be located.</p>
        <Link
          href="/#photo-stories"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-ink text-white text-xs font-mono font-bold"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Photo Stories</span>
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
    <article className="max-w-5xl mx-auto my-10 sm:my-16 px-4 sm:px-6">
      {/* Back button */}
      <div className="mb-6">
        <Link
          href="/#photo-stories"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-slate hover:text-ink transition"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Photo Stories</span>
        </Link>
      </div>

      {/* Hero Header */}
      <header className="space-y-4 pb-8 border-b border-hairline">
        <div className="flex items-center gap-3 text-xs font-mono">
          <span className="flex items-center gap-1 text-accent font-bold">
            <MapPin className="w-3.5 h-3.5" />
            <span>{story.location[language]}</span>
          </span>
          <span className="text-hairline">•</span>
          <span className="text-slate flex items-center gap-1">
            <Images className="w-3.5 h-3.5" />
            <span>{story.frames.length} Sequenced Frames</span>
          </span>
          <span className="text-hairline">•</span>
          <span className="text-slate">{story.date}</span>
        </div>

        <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold text-ink leading-tight tracking-tight max-w-3xl">
          {story.title[language]}
        </h1>

        <p className="font-editorial text-lg sm:text-xl text-slate italic leading-relaxed max-w-2xl">
          {story.intro[language]}
        </p>

        <div className="pt-2 flex items-center justify-between">
          <span className="text-xs font-mono text-slate/80">
            Sanokuraa Spatial Photo Essay Series
          </span>
          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-hairline bg-white hover:bg-sanok text-ink text-xs font-mono transition cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
            <span>{copied ? "Link Copied" : "Share Essay"}</span>
          </button>
        </div>
      </header>

      {/* Immersive Scrollytelling Sequence */}
      <div className="my-12 space-y-16 sm:space-y-24">
        {story.frames.map((frame, index) => (
          <figure key={frame.id} className="space-y-4">
            <div className="relative w-full rounded-2xl overflow-hidden border border-hairline bg-black shadow-md">
              <img
                src={frame.url}
                alt={frame.altText || frame.caption[language]}
                className="w-full h-auto max-h-[85vh] object-contain mx-auto"
              />
              {/* Frame numbering watermark */}
              <div className="absolute top-4 right-4 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] font-mono border border-white/20">
                Frame {index + 1} / {story.frames.length}
              </div>
            </div>

            {/* Sequenced Caption & Narrative block */}
            <figcaption className="max-w-2xl mx-auto text-center sm:text-left space-y-1 px-2">
              <p className="font-editorial text-base sm:text-lg text-ink font-semibold leading-relaxed">
                {frame.caption[language]}
              </p>
              {frame.altText && (
                <p className="font-mono text-[11px] text-slate tracking-wide">
                  Visual Note: {frame.altText}
                </p>
              )}
            </figcaption>
          </figure>
        ))}
      </div>

      {/* Essay Completion Footer */}
      <div className="mt-16 pt-8 border-t border-hairline flex items-center justify-between text-xs font-mono">
        <Link
          href="/#photo-stories"
          className="inline-flex items-center gap-1.5 text-ink hover:text-accent font-bold transition"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Photo Stories Archive</span>
        </Link>
        <span className="text-slate">Curated by Sanokuraa Visual Archive</span>
      </div>
    </article>
  );
}
