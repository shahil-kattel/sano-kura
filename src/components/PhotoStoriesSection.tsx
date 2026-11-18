"use client";

import React from "react";
import Link from "next/link";
import { Camera, MapPin, ArrowUpRight, Images } from "lucide-react";
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
    <section className="my-14 sm:my-20">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between pb-4 mb-8 border-b-2 border-ink">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <Camera className="w-4 h-4 text-accent" />
            <span className="font-mono text-xs uppercase tracking-widest text-slate font-bold">
              Visual Essays & Archives
            </span>
          </div>
          <h2 className="font-editorial text-3xl sm:text-4xl text-ink font-bold tracking-tight">
            {language === "np" ? "फोटो कथा तथा दृश्य निबन्ध" : "Photo Stories & Spatial Essays"}
          </h2>
        </div>

        <p className="text-xs sm:text-sm text-slate mt-2 sm:mt-0 max-w-md font-sans">
          {language === "np"
            ? "शब्दभन्दा गहिरा तस्बिरहरू: हिमालयको जनजीवन, कला र मौलिक संस्कृति।"
            : "High-resolution curated visual essays capturing living heritage and Himalayan peripheries."}
        </p>
      </div>

      {/* Grid of Photo Essays */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
        {published.map((story) => (
          <article
            key={story.id}
            className="group flex flex-col justify-between bg-sanok-paper rounded-2xl border border-hairline overflow-hidden hover:border-ink/50 transition duration-300"
          >
            <div>
              {/* Cover Photo */}
              <Link
                href={`/photo-stories/${story.slug}`}
                className="block relative aspect-16/10 w-full overflow-hidden bg-hairline"
              >
                <img
                  src={story.coverImage}
                  alt={story.title[language]}
                  className="w-full h-full object-cover group-hover:scale-103 transition duration-700 ease-out"
                />

                {/* Top Badge: Frame Count */}
                <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-ink text-xs font-mono font-bold shadow-xs border border-hairline">
                  <Images className="w-3.5 h-3.5 text-accent" />
                  <span>{story.frames.length} Frames</span>
                </div>

                {/* Location Badge Bottom Left */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center gap-1.5 text-white text-xs font-mono drop-shadow-md">
                  <MapPin className="w-3.5 h-3.5 text-accent" />
                  <span className="truncate">{story.location[language]}</span>
                </div>
              </Link>

              {/* Title & Narrative Intro */}
              <div className="p-6 sm:p-7 space-y-3">
                <Link href={`/photo-stories/${story.slug}`}>
                  <h3 className="font-editorial text-2xl sm:text-3xl text-ink font-bold leading-snug group-hover:text-accent transition">
                    {story.title[language]}
                  </h3>
                </Link>
                <p className="text-xs sm:text-sm text-slate leading-relaxed line-clamp-3">
                  {story.intro[language]}
                </p>
              </div>
            </div>

            {/* Essay Card Footer */}
            <div className="px-6 sm:px-7 pb-6 pt-4 border-t border-hairline/70 flex items-center justify-between text-xs text-slate">
              <span className="font-mono">{story.date}</span>
              <Link
                href={`/photo-stories/${story.slug}`}
                className="inline-flex items-center gap-1.5 font-bold text-ink group-hover:text-accent transition"
              >
                <span>View Full Essay</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
