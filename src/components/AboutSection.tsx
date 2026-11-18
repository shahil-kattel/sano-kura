"use client";

import React from "react";
import Link from "next/link";
import { Mail, Compass, Users, ArrowUpRight } from "lucide-react";
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
    <section className="my-16 sm:my-24 pt-12 border-t border-neutral-900">
      {/* Editorial Section Header */}
      <div className="flex items-center gap-2 mb-8 font-mono text-xs text-neutral-500 uppercase tracking-[0.2em]">
        <span className="text-neutral-900 font-bold">06</span>
        <span className="text-neutral-300">/</span>
        <span>THE SANOKURAA MANIFESTO & COLLECTIVE</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
        {/* Left Column: Manifesto & Mission (6 Cols) */}
        <div className="lg:col-span-6 space-y-6">
          <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl text-neutral-950 font-normal leading-[1.2] tracking-tight">
            {language === "np"
              ? "साँचो पत्रकारिता कोलाहलमा होइन, सत्यको मौन खोजमा हुन्छ।"
              : "True journalism is not found in noise, but in the quiet pursuit of truth."}
          </h2>

          <div className="text-neutral-600 text-sm sm:text-base leading-relaxed space-y-4 font-sans">
            <p className="font-editorial text-xl sm:text-2xl text-neutral-900 leading-relaxed font-light">
              "{manifestoText}"
            </p>
            <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed">
              {storyText}
            </p>
          </div>

          <div className="pt-4 flex items-center gap-4 text-xs font-mono">
            <span className="px-3 py-1 rounded-full bg-neutral-100 text-neutral-900 font-medium">
              Independent Atelier
            </span>
            <span className="text-neutral-500">Based in Kathmandu, Nepal</span>
          </div>
        </div>

        {/* Right Column: Collective, Team & Links (6 Cols) */}
        <div className="lg:col-span-6 flex flex-col justify-between space-y-8 lg:border-l lg:border-neutral-200 lg:pl-10">
          <div>
            <div className="flex items-center gap-2 mb-4 font-mono text-xs text-neutral-500 uppercase tracking-widest font-semibold">
              <Users className="w-3.5 h-3.5 text-accent" />
              <span>Editorial Collective</span>
            </div>

            <div className="divide-y divide-neutral-200">
              {teamList.map((member, idx) => (
                <div key={idx} className="py-4 first:pt-0 last:pb-0 flex items-start gap-4">
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-12 h-12 rounded-full object-cover border border-neutral-200 shrink-0"
                  />
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-neutral-900">{member.name}</h4>
                    <p className="text-xs font-mono text-accent">{member.role}</p>
                    <p className="text-xs text-neutral-500 leading-relaxed">{member.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Coordinates */}
          <div className="pt-6 border-t border-neutral-200 space-y-3">
            <p className="font-mono text-xs uppercase tracking-wider text-neutral-400 font-semibold">
              DIRECT INQUIRIES & DISPATCHES:
            </p>
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-neutral-900">
              <a
                href={`mailto:${social?.email || "editorial@sanokuraa.com"}`}
                className="inline-flex items-center gap-1.5 text-neutral-900 hover:text-accent font-semibold transition"
              >
                <Mail className="w-4 h-4 text-neutral-400" />
                <span>{social?.email || "editorial@sanokuraa.com"}</span>
              </a>

              {social?.instagram && (
                <a
                  href={social.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-accent transition inline-flex items-center gap-1"
                >
                  <span>Instagram</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              )}
              {social?.youtube && (
                <a
                  href={social.youtube}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-accent transition inline-flex items-center gap-1"
                >
                  <span>YouTube</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              )}
              {social?.twitter && (
                <a
                  href={social.twitter}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-accent transition inline-flex items-center gap-1"
                >
                  <span>X / Twitter</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
