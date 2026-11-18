"use client";

import React, { useState, useRef } from "react";
import { Play, ChevronLeft, ChevronRight, Video, Flame } from "lucide-react";
import { Reel } from "@/types/sanokuraa";
import { useLanguage } from "@/context/LanguageContext";
import { ReelModal } from "./ReelModal";

interface ReelsSectionProps {
  reels: Reel[];
}

export const ReelsSection: React.FC<ReelsSectionProps> = ({ reels }) => {
  const { language } = useLanguage();
  const [activeModalIndex, setActiveModalIndex] = useState<number | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleScroll = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return;
    const scrollAmount = 320;
    scrollContainerRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section className="my-14 sm:my-20">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between pb-4 mb-6 border-b-2 border-ink">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <Video className="w-4 h-4 text-accent" />
            <span className="font-mono text-xs uppercase tracking-widest text-slate font-bold">
              Visual Shorts
            </span>
          </div>
          <h2 className="font-editorial text-3xl sm:text-4xl text-ink font-bold tracking-tight">
            {language === "np" ? "सानोकुरा रिल्स (छोटो भिडियो)" : "Sanokuraa Reels & Field Shorts"}
          </h2>
        </div>

        {/* Scroll Controls on Desktop */}
        <div className="flex items-center gap-2 mt-3 sm:mt-0">
          <button
            onClick={() => handleScroll("left")}
            className="w-9 h-9 rounded-full bg-sanok-paper hover:bg-hairline border border-hairline flex items-center justify-center text-slate hover:text-ink transition cursor-pointer"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleScroll("right")}
            className="w-9 h-9 rounded-full bg-sanok-paper hover:bg-hairline border border-hairline flex items-center justify-center text-slate hover:text-ink transition cursor-pointer"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Horizontal Scroll-Snap Strip */}
      <div
        ref={scrollContainerRef}
        className="flex items-center gap-4 sm:gap-6 overflow-x-auto no-scrollbar snap-x snap-mandatory py-2 -mx-4 px-4 sm:mx-0 sm:px-0"
      >
        {reels.map((reel, index) => (
          <div
            key={reel.id}
            onClick={() => setActiveModalIndex(index)}
            className="relative flex-none w-[200px] sm:w-[240px] md:w-[260px] aspect-[9/16] rounded-2xl overflow-hidden bg-black border border-hairline group cursor-pointer snap-start hover:shadow-xl hover:border-ink/50 transition duration-300"
          >
            {/* Poster Thumbnail */}
            <img
              src={reel.thumbnail}
              alt={reel.title[language]}
              className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
            />

            {/* Gradient Mask */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/30 group-hover:from-black/90 transition" />

            {/* Top Play Badge */}
            <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[11px] font-mono border border-white/20">
              <Play className="w-3 h-3 fill-white" />
              <span>{reel.duration || "0:45"}</span>
            </div>

            {/* Center Play Button on Hover */}
            <div className="absolute inset-0 flex items-center justify-center z-10 opacity-0 group-hover:opacity-100 transition duration-300">
              <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center text-white shadow-lg">
                <Play className="w-6 h-6 fill-white ml-0.5" />
              </div>
            </div>

            {/* Bottom Caption & Views */}
            <div className="absolute inset-x-0 bottom-0 p-4 z-10 text-white space-y-1">
              <h3 className="font-editorial text-base sm:text-lg font-bold leading-snug line-clamp-2">
                {reel.title[language]}
              </h3>
              <p className="text-[11px] text-white/80 line-clamp-1 font-sans">
                {reel.caption[language]}
              </p>
              <div className="pt-1 flex items-center justify-between text-[10px] text-white/60 font-mono">
                <span>Watch Reel</span>
                <span>{reel.views.toLocaleString()} views</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Reel Modal Player */}
      <ReelModal
        reels={reels}
        currentReelIndex={activeModalIndex ?? 0}
        isOpen={activeModalIndex !== null}
        onClose={() => setActiveModalIndex(null)}
        onSelectIndex={(index) => setActiveModalIndex(index)}
      />
    </section>
  );
};
