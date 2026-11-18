"use client";

import React from "react";
import { useSanokuraa } from "@/context/SanokuraaContext";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { QuoteHero } from "@/components/QuoteHero";
import { ReportingSection } from "@/components/ReportingSection";
import { ArticlesOpEdSection } from "@/components/ArticlesOpEdSection";
import { ReelsSection } from "@/components/ReelsSection";
import { PhotoStoriesSection } from "@/components/PhotoStoriesSection";
import { ServicesSection } from "@/components/ServicesSection";
import { AboutSection } from "@/components/AboutSection";

export default function HomePage() {
  const {
    quotes,
    reports,
    articles,
    reels,
    photoStories,
    services,
    about,
  } = useSanokuraa();

  return (
    <div className="space-y-6 sm:space-y-10">
      {/* 1. HERO: RANDOMIZED QUOTES & GRAPHICS (kkcreate.in style) */}
      <ErrorBoundary fallbackTitle="Quote Hero failed to load.">
        <QuoteHero initialQuotes={quotes} />
      </ErrorBoundary>

      {/* 2. "THIS IS SANOKURAA REPORTING" (2x3 Grid Newsroom Dispatches) */}
      <section id="reporting">
        <ErrorBoundary fallbackTitle="Reporting section failed to load.">
          <ReportingSection reports={reports} />
        </ErrorBoundary>
      </section>

      {/* 3. ARTICLES / OP-ED SECTION (Patramanjusha & OnlineKhabar style) */}
      <section id="articles">
        <ErrorBoundary fallbackTitle="Articles & Op-Ed section failed to load.">
          <ArticlesOpEdSection articles={articles} />
        </ErrorBoundary>
      </section>

      {/* 4. REELS (Vertical 9:16 Short-Form Field Videos) */}
      <section id="reels">
        <ErrorBoundary fallbackTitle="Reels section failed to load.">
          <ReelsSection reels={reels} />
        </ErrorBoundary>
      </section>

      {/* 5. PHOTO STORY (kkcreate.in/photo-essays style) */}
      <section id="photo-stories">
        <ErrorBoundary fallbackTitle="Photo Stories failed to load.">
          <PhotoStoriesSection stories={photoStories} />
        </ErrorBoundary>
      </section>

      {/* 6. SERVICES (Production & Personal Branding) */}
      <section id="services">
        <ErrorBoundary fallbackTitle="Services section failed to load.">
          <ServicesSection services={services} />
        </ErrorBoundary>
      </section>

      {/* 7. ABOUT US & MANIFESTO */}
      <section id="about">
        <ErrorBoundary fallbackTitle="About section failed to load.">
          <AboutSection about={about} />
        </ErrorBoundary>
      </section>
    </div>
  );
}
