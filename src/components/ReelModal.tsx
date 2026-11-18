"use client";

import React, { useEffect, useRef } from "react";
import { X, ChevronLeft, ChevronRight, Play, Volume2, VolumeX, Eye } from "lucide-react";
import { Reel } from "@/types/sanokuraa";
import { useLanguage } from "@/context/LanguageContext";

interface ReelModalProps {
  reels: Reel[];
  currentReelIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onSelectIndex: (index: number) => void;
}

export const ReelModal: React.FC<ReelModalProps> = ({
  reels,
  currentReelIndex,
  isOpen,
  onClose,
  onSelectIndex,
}) => {
  const { language } = useLanguage();
  const videoRef = useRef<HTMLVideoElement>(null);
  const currentReel = reels[currentReelIndex];

  // Keyboard navigation: Esc to close, ArrowLeft for prev, ArrowRight for next
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft") {
        if (currentReelIndex > 0) onSelectIndex(currentReelIndex - 1);
      } else if (e.key === "ArrowRight") {
        if (currentReelIndex < reels.length - 1) onSelectIndex(currentReelIndex + 1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, currentReelIndex, reels.length, onClose, onSelectIndex]);

  // Autoplay current video when active
  useEffect(() => {
    if (isOpen && videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {
        // Autoplay may be restricted without user interaction
      });
    }
  }, [isOpen, currentReelIndex]);

  if (!isOpen || !currentReel) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-2 sm:p-6 animate-in fade-in duration-200"
      onClick={onClose}
    >
      {/* Close Button Top Right */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 sm:top-6 sm:right-6 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition z-50 cursor-pointer"
        aria-label="Close video player"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Prev Navigation Button */}
      {currentReelIndex > 0 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onSelectIndex(currentReelIndex - 1);
          }}
          className="hidden sm:flex absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 text-white items-center justify-center transition z-50 cursor-pointer"
          aria-label="Previous reel"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      )}

      {/* Next Navigation Button */}
      {currentReelIndex < reels.length - 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onSelectIndex(currentReelIndex + 1);
          }}
          className="hidden sm:flex absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 text-white items-center justify-center transition z-50 cursor-pointer"
          aria-label="Next reel"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      )}

      {/* Reel Card Container (9:16 aspect ratio) */}
      <div
        className="relative w-full max-w-[380px] sm:max-w-[420px] aspect-[9/16] max-h-[85vh] rounded-2xl overflow-hidden bg-black shadow-2xl border border-white/10 flex flex-col justify-end"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Video Player or Fallback Artwork */}
        <video
          ref={videoRef}
          src={currentReel.videoUrl}
          poster={currentReel.thumbnail}
          controls
          playsInline
          loop
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Gradient Overlay for Text Legibility */}
        <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />

        {/* Top Reel Counter */}
        <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[11px] font-mono border border-white/20">
            {currentReelIndex + 1} / {reels.length}
          </span>
          <span className="px-2 py-0.5 rounded-full bg-accent text-white text-[10px] font-bold uppercase tracking-wider">
            Reel
          </span>
        </div>

        {/* Bottom Metadata & Caption */}
        <div className="relative z-20 p-5 space-y-2 text-white">
          <h3 className="font-editorial text-lg sm:text-xl font-bold leading-snug drop-shadow-md">
            {currentReel.title[language]}
          </h3>
          <p className="text-xs text-white/90 line-clamp-2 leading-relaxed drop-shadow-sm font-sans">
            {currentReel.caption[language]}
          </p>

          <div className="pt-2 flex items-center justify-between text-[11px] text-white/70 font-mono">
            <span>Duration: {currentReel.duration || "0:45"}</span>
            <span className="flex items-center gap-1">
              <Eye className="w-3.5 h-3.5" />
              <span>{currentReel.views.toLocaleString()} views</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
