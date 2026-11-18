"use client";

import React from "react";
import Link from "next/link";
import { Camera, MapPin, ArrowRight, Images } from "lucide-react";
import { PhotoStory } from "@/types/sanokuraa";
import { useLanguage } from "@/context/LanguageContext";

interface PhotoStoriesSectionProps {
  stories: PhotoStory[];
}

export const PhotoStoriesSection: React.FC<PhotoStoriesSectionProps> = ({ stories }) => {
  const { language } = useLanguage();

  const published = stories.filter((s) => s.status === "PUBLISHED");

  if (published.length === 0) return null;

  return (
    <section className="my-16 sm:my-24">
      {/* Editorial Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between pb-6 mb-10 border-b border-neutral-900 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2 font-mono text-xs text-neutral-500 uppercase tracking-[0.2em]">
            <span className="text-neutral-900 font-bold">04</span>
            <span className="text-neutral-300">/</span>
            <span>VISUAL ESSAYS & ARCHIVES</span>
          </div>
          <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl text-neutral-950 font-normal tracking-tight">
            {language === "np" ? "फोटो कथा तथा दृश्य निबन्ध" : "Photo Stories & Spatial Essays"}
          </h2>
        </div>

        <p className="text-xs sm:text-sm text-neutral-600 max-w-md font-sans leading-relaxed">
          {language === "np"
            ? "शब्दभन्दा गहिरा तस्बिरहरू: हिमालयको जनजीवन, मौलिक संस्कृति र लोपोन्मुख सम्पदा।"
            : "High-resolution curated visual essays capturing living heritage, high-altitude peripheries, and human resilience."}
        </p>
      </div>

      {/* Grid of Photo Essays */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {published.map((story) => (
          <article
            key={story.id}
            className="group flex flex-col justify-between bg-white rounded-2xl border border-neutral-200/90 overflow-hidden hover:border-neutral-900/60 transition duration-300"
          >
            <div>
              {/* Cover Photo */}
              <Link
                href={`/photo-stories/${story.slug}`}
                className="block relative aspect-16/10 w-full overflow-hidden bg-neutral-100"
              >
                <img
                  src={story.coverImage}
                  alt={story.title[language]}
                  className="w-full h-full object-cover group-hover:scale-[1.03] transition duration-700 ease-out"
                />

                {/* Top Badge: Frame Count */}
                <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-neutral-900 text-xs font-mono font-bold border border-neutral-200 shadow-2xs">
                  <Images className="w-3.5 h-3.5 text-accent" />
                  <span>{story.frames.length} FRAMES</span>
                </div>

                {/* Location Badge Bottom Left */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center gap-1.5 text-white text-xs font-mono drop-shadow-md">
                  <MapPin className="w-3.5 h-3.5 text-accent shrink-0" />
                  <span className="truncate tracking-wide">{story.location[language]}</span>
                </div>
              </Link>

              {/* Title & Narrative Intro */}
              <div className="p-6 sm:p-8 space-y-3">
                <Link href={`/photo-stories/${story.slug}`} className="block">
                  <h3 className="font-editorial text-2xl sm:text-3xl text-neutral-950 font-normal leading-snug group-hover:text-accent transition duration-200">
                    {story.title[language]}
                  </h3>
                </Link>
                <p className="text-xs sm:text-sm text-neutral-600 line-clamp-3 leading-relaxed font-sans">
                  {story.intro[language]}
                </p>
              </div>
            </div>

            {/* Link to Reader View */}
            <div className="px-6 sm:px-8 pb-6 sm:pb-8 pt-3 border-t border-neutral-100 flex items-center justify-between text-xs font-mono">
              <span className="text-neutral-400">
                CURATED ARCHIVE • {story.date}
              </span>
              <Link
                href={`/photo-stories/${story.slug}`}
                className="inline-flex items-center gap-1.5 text-neutral-950 font-semibold group-hover:text-accent transition"
              >
                <span>View Essay</span>
                <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
