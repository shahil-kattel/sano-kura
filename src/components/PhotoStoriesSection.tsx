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
    <section className="my-12 sm:my-20">
      {/* Editorial Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between pb-6 mb-8 border-b border-neutral-950 dark:border-neutral-200 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2 font-mono text-xs text-neutral-500 dark:text-neutral-400 uppercase tracking-[0.2em]">
            <span className="text-neutral-950 dark:text-white font-bold">04</span>
            <span className="text-neutral-300 dark:text-neutral-700">/</span>
            <span>VISUAL ESSAYS & ARCHIVES</span>
          </div>
          <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl text-neutral-950 dark:text-white font-normal tracking-tight">
            {language === "np" ? "फोटो कथा तथा दृश्य निबन्ध" : "Photo Stories & Spatial Essays"}
          </h2>
        </div>

        <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 max-w-md font-sans leading-relaxed">
          {language === "np"
            ? "शब्दभन्दा गहिरा तस्बिरहरू: हिमालयको जनजीवन, मौलिक संस्कृति र लोपोन्मुख सम्पदा।"
            : "High-resolution curated visual essays capturing living heritage, high-altitude peripheries, and human resilience."}
        </p>
      </div>

      {/* Minimalist Single-Sheet 2-Column Photo Essay Spread */}
      <div className="grid grid-cols-1 md:grid-cols-2 border-y border-neutral-200 dark:border-neutral-800 md:divide-x divide-neutral-200 dark:divide-neutral-800">
        {published.map((story) => (
          <article
            key={story.id}
            className="group flex flex-col justify-between bg-white dark:bg-[#111827] p-6 sm:p-8 lg:p-10 transition duration-300"
          >
            <div>
              {/* Cover Photo */}
              <Link
                href={`/photo-stories/${story.slug}`}
                className="block relative aspect-16/10 w-full overflow-hidden bg-neutral-100 dark:bg-neutral-800 border border-neutral-200/80 dark:border-neutral-800"
              >
                <img
                  src={story.coverImage}
                  alt={story.title[language]}
                  className="w-full h-full object-cover grayscale-[15%] group-hover:grayscale-0 group-hover:scale-[1.03] transition duration-700 ease-out"
                />

                {/* Top Badge: Frame Count */}
                <div className="absolute top-3.5 left-3.5 flex items-center gap-1.5 px-2.5 py-0.5 bg-white/95 dark:bg-neutral-900/95 text-neutral-900 dark:text-neutral-100 text-xs font-mono font-bold border border-neutral-200 dark:border-neutral-700 shadow-2xs">
                  <Images className="w-3 h-3 text-accent" />
                  <span>{story.frames.length} FRAMES</span>
                </div>

                {/* Location Badge Bottom Left */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center gap-1.5 text-white text-xs font-mono drop-shadow-md">
                  <MapPin className="w-3.5 h-3.5 text-accent shrink-0" />
                  <span className="truncate tracking-wide">
                    {story.location?.[language] || story.location?.["en"] || ""}
                  </span>
                </div>
              </Link>

              {/* Title & Narrative Intro */}
              <div className="pt-6 space-y-3">
                <Link href={`/photo-stories/${story.slug}`} className="block">
                  <h3 className="font-editorial text-2xl sm:text-3xl text-neutral-950 dark:text-white font-normal leading-snug group-hover:text-accent transition duration-200">
                    {story.title?.[language] || story.title?.["en"] || ""}
                  </h3>
                </Link>
                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 line-clamp-3 leading-relaxed font-sans">
                  {(story.intro && (story.intro[language] || story.intro.en || story.intro.np)) || (story as any).narrativeIntro?.[language] || ""}
                </p>
              </div>
            </div>

            {/* Link to Reader View */}
            <div className="pt-6 mt-8 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between text-xs font-mono">
              <span className="text-neutral-400 dark:text-neutral-500">
                CURATED ARCHIVE • {story.date}
              </span>
              <Link
                href={`/photo-stories/${story.slug}`}
                className="inline-flex items-center gap-1.5 text-neutral-950 dark:text-white font-semibold group-hover:text-accent transition"
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
