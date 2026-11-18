"use client";

import React from "react";
import Link from "next/link";
import { Mail, ArrowUpRight, Compass, Users } from "lucide-react";
import { AboutSettings } from "@/types/sanokuraa";
import { INITIAL_ABOUT } from "@/data/sanokuraaSeed";
import { useLanguage } from "@/context/LanguageContext";

interface AboutSectionProps {
  about?: AboutSettings;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ about = INITIAL_ABOUT }) => {
  const { language } = useLanguage();
  const safeAbout = about || INITIAL_ABOUT;
  const manifestoText = safeAbout.manifesto?.[language] || safeAbout.manifesto?.["np"] || INITIAL_ABOUT.manifesto.np;
  const storyText = safeAbout.story?.[language] || safeAbout.story?.["np"] || INITIAL_ABOUT.story.np;
  const teamList = safeAbout.team || INITIAL_ABOUT.team;
  const social = safeAbout.socialLinks || INITIAL_ABOUT.socialLinks;

  return (
    <section className="my-16 sm:my-24 pt-12 border-t-2 border-ink">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
        {/* Left Column: Manifesto & Mission (6 Cols) */}
        <div className="lg:col-span-6 space-y-6">
          <div className="flex items-center gap-2">
            <Compass className="w-4 h-4 text-accent" />
            <span className="font-mono text-xs uppercase tracking-widest text-slate font-bold">
              The Sanokuraa Manifesto
            </span>
          </div>

          <h2 className="font-editorial text-3xl sm:text-4xl text-ink font-bold leading-tight tracking-tight">
            {language === "np"
              ? "साँचो पत्रकारिता कोलाहलमा होइन, सत्यको मौन खोजमा हुन्छ।"
              : "True journalism is not found in noise, but in the quiet pursuit of truth."}
          </h2>

          <div className="prose prose-slate max-w-none text-slate text-sm sm:text-base leading-relaxed space-y-4 font-sans">
            <p className="font-editorial text-lg sm:text-xl text-ink leading-relaxed">
              {manifestoText}
            </p>
            <p className="text-xs sm:text-sm text-slate">
              {storyText}
            </p>
          </div>

          <div className="pt-4 flex items-center gap-4 text-xs font-mono">
            <span className="px-3 py-1 rounded-full bg-sanok-paper border border-hairline text-ink font-bold">
              Independent Studio
            </span>
            <span className="text-slate">Based in Kathmandu, Nepal</span>
          </div>
        </div>

        {/* Right Column: Collective, Team & Links (6 Cols) */}
        <div className="lg:col-span-6 flex flex-col justify-between space-y-8 lg:border-l lg:border-hairline lg:pl-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Users className="w-4 h-4 text-accent" />
              <span className="font-mono text-xs uppercase tracking-widest text-slate font-bold">
                Editorial Collective
              </span>
            </div>

            <div className="divide-y divide-hairline">
              {teamList.map((member, idx) => (
                <div key={idx} className="py-4 first:pt-0 last:pb-0 flex items-start gap-4">
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-12 h-12 rounded-full object-cover border border-hairline shrink-0"
                  />
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-ink">{member.name}</h4>
                    <p className="text-xs font-mono text-accent">{member.role}</p>
                    <p className="text-xs text-slate leading-relaxed">{member.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Coordinates */}
          <div className="pt-6 border-t border-hairline space-y-3">
            <p className="font-mono text-xs uppercase tracking-wider text-slate font-bold">
              Direct Inquiries & Submissions:
            </p>
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-ink">
              <a
                href={`mailto:${social?.email || "editorial@sanokuraa.com"}`}
                className="inline-flex items-center gap-1.5 text-ink hover:text-accent font-bold transition"
              >
                <Mail className="w-4 h-4 text-slate" />
                <span>{social?.email || "editorial@sanokuraa.com"}</span>
              </a>

              {social?.instagram && (
                <a
                  href={social.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-accent transition"
                >
                  Instagram ↗
                </a>
              )}
              {social?.youtube && (
                <a
                  href={social.youtube}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-accent transition"
                >
                  YouTube ↗
                </a>
              )}
              {social?.twitter && (
                <a
                  href={social.twitter}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-accent transition"
                >
                  Twitter/X ↗
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
