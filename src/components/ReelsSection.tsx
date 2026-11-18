"use client";

import React, { useState, useRef } from "react";
import { Play, ChevronLeft, ChevronRight, Video } from "lucide-react";
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
    <section className="my-16 sm:my-24">
      {/* Editorial Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between pb-6 mb-8 border-b border-neutral-900 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2 font-mono text-xs text-neutral-500 uppercase tracking-[0.2em]">
            <span className="text-neutral-900 font-bold">03</span>
            <span className="text-neutral-300">/</span>
            <span>FIELD VISUALS & SHORTS</span>
          </div>
          <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl text-neutral-950 font-normal tracking-tight">
            {language === "np" ? "सानोकुरा रिल्स (छोटो भिडियो)" : "Sanokuraa Reels & Field Shorts"}
          </h2>
        </div>

        {/* Scroll Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleScroll("left")}
            className="w-10 h-10 rounded-full bg-white hover:bg-neutral-100 border border-neutral-200 flex items-center justify-center text-neutral-700 hover:text-neutral-950 transition cursor-pointer"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleScroll("right")}
            className="w-10 h-10 rounded-full bg-white hover:bg-neutral-100 border border-neutral-200 flex items-center justify-center text-neutral-700 hover:text-neutral-950 transition cursor-pointer"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Horizontal Scroll-Snap Strip */}
      <div
        ref={scrollContainerRef}
        className="flex items-center gap-5 sm:gap-6 overflow-x-auto no-scrollbar snap-x snap-mandatory py-2 -mx-4 px-4 sm:mx-0 sm:px-0"
      >
        {reels.map((reel, index) => (
          <div
            key={reel.id}
            onClick={() => setActiveModalIndex(index)}
            className="relative flex-none w-[200px] sm:w-[240px] md:w-[260px] aspect-[9/16] rounded-2xl overflow-hidden bg-black border border-neutral-200/90 group cursor-pointer snap-start hover:border-neutral-900 transition duration-300"
          >
            {/* Poster Thumbnail */}
            <img
              src={reel.thumbnail}
              alt={reel.title[language]}
              className="w-full h-full object-cover group-hover:scale-105 transition duration-700 ease-out"
            />

            {/* Gradient Mask */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/30 group-hover:from-black/95 transition" />

            {/* Top Play Badge */}
            <div className="absolute top-3.5 left-3.5 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[11px] font-mono border border-white/20">
              <Play className="w-3 h-3 fill-white" />
              <span>{reel.duration || "0:45"}</span>
            </div>

            {/* Center Play Button on Hover */}
            <div className="absolute inset-0 flex items-center justify-center z-10 opacity-0 group-hover:opacity-100 transition duration-300">
              <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center text-white shadow-lg">
                <Play className="w-5 h-5 fill-white ml-0.5" />
              </div>
            </div>

            {/* Bottom Caption & Views */}
            <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 z-10 text-white space-y-1.5">
              <h3 className="font-editorial text-base sm:text-lg font-medium leading-snug line-clamp-2">
                {reel.title[language]}
              </h3>
              <div className="flex items-center justify-between text-[11px] font-mono text-neutral-300">
                <span>{reel.views ? `${reel.views.toLocaleString()} views` : "12.4K views"}</span>
                <span className="text-[10px] uppercase tracking-wider text-accent font-semibold">Watch ↗</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Playback for Vertical Short */}
      {activeModalIndex !== null && (
        <ReelModal
          reels={reels}
          currentReelIndex={activeModalIndex}
          isOpen={true}
          onSelectIndex={(newIdx) => setActiveModalIndex(newIdx)}
          onClose={() => setActiveModalIndex(null)}
        />
      )}
    </section>
  );
};
