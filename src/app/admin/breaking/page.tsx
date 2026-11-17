"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Zap,
  CheckCircle,
  ExternalLink,
  Flame,
  PlusCircle,
  ArrowRight,
  ShieldAlert,
  Radio,
} from "lucide-react";
import ImageUpload from "@/components/admin/ImageUpload";
import { useNews } from "@/context/NewsContext";

export default function AdminBreakingPage() {
  const { articles, toggleBreaking, addArticle } = useNews();

  const [instantAlertEn, setInstantAlertEn] = useState("");
  const [instantAlertNp, setInstantAlertNp] = useState("");
  const [breakingImage, setBreakingImage] = useState(
    "https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=1200&q=80"
  );
  const [created, setCreated] = useState(false);

  const breakingArticles = articles.filter((a) => a.isBreaking);
  const nonBreakingArticles = articles.filter((a) => !a.isBreaking);

  const handleCreateInstant = (e: React.FormEvent) => {
    e.preventDefault();
    if (!instantAlertEn.trim() && !instantAlertNp.trim()) return;

    const headlineEn = instantAlertEn.trim() || instantAlertNp.trim();
    const headlineNp = instantAlertNp.trim() || instantAlertEn.trim();

    addArticle({
      slug: `flash-${Date.now()}`,
      title: {
        np: headlineNp,
        en: headlineEn,
      },
      subtitle: {
        np: "ताजा ब्रेकिङ अपडेट",
        en: "Breaking Flash Update",
      },
      excerpt: {
        np: headlineNp,
        en: headlineEn,
      },
      content: {
        np: [headlineNp],
        en: [headlineEn],
      },
      category: "politics",
      categoryName: { np: "राजनीति", en: "Politics" },
      image: breakingImage || "https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=1200&q=80",
      imageCaption: { np: "ताजा ब्रेकिङ समाचार।", en: "Breaking news alert." },
      author: {
        name: { np: "सानो कुरा डेस्क", en: "Sano Kura Desk" },
        role: { np: "समाचार ब्यूरो", en: "Newsroom Bureau" },
        avatar:
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      },
      date: new Date().toISOString(),
      dateNep: "२०८१ मंसिर २ गते",
      readTime: { np: "१ मिनेट", en: "1 min" },
      views: 350,
      isBreaking: true,
      tags: { np: ["ब्रेकिङ", "ताजा"], en: ["Breaking", "Flash"] },
    });

    setInstantAlertEn("");
    setInstantAlertNp("");
    setCreated(true);
    setTimeout(() => setCreated(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2.5">
            <Zap className="w-6 h-6 text-red-500 animate-pulse" />
            <span>Breaking News & Live Ticker Controller</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Control the real-time red banner streaming across the top of the portal.
          </p>
        </div>

        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-1.5 text-xs text-red-400 hover:text-white bg-red-600/10 border border-red-500/30 px-3.5 py-2 rounded-xl font-bold transition hover:bg-red-600"
        >
          <span>View Live Ticker</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Broadcast Flash Form */}
      <div className="bg-gradient-to-r from-red-950 via-slate-900 to-slate-900 border border-red-500/40 rounded-2xl p-6 shadow-xl">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
          <h2 className="text-sm font-bold uppercase tracking-wider text-red-400 flex items-center gap-1.5">
            <Radio className="w-4 h-4 text-red-400" />
            <span>Broadcast Instant Breaking Flash</span>
          </h2>
        </div>
        <p className="text-xs text-slate-400 mb-4">
          Headlines broadcasted here immediately roll across the top breaking news bar on the live site.
        </p>

        {created && (
          <div className="mb-4 p-3 bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 rounded-xl text-xs font-bold flex items-center gap-2 animate-in fade-in">
            <CheckCircle className="w-4 h-4" />
            <span>Breaking alert successfully broadcasted to live ticker!</span>
          </div>
        )}

        <form onSubmit={handleCreateInstant} className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              type="text"
              required
              placeholder="Breaking flash headline in English..."
              value={instantAlertEn}
              onChange={(e) => setInstantAlertEn(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-red-500 placeholder-slate-500"
            />
            <input
              type="text"
              placeholder="नेपाली ब्रेकिङ शीर्षक (Nepali headline)..."
              value={instantAlertNp}
              onChange={(e) => setInstantAlertNp(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl px-4 py-2.5 text-xs font-nepali focus:outline-none focus:ring-2 focus:ring-red-500 placeholder-slate-500"
            />
          </div>

          <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-850">
            <ImageUpload
              value={breakingImage}
              onChange={setBreakingImage}
              label="Flash Alert Photo (From Computer)"
              helperText="Upload breaking alert snapshot or thumbnail from your computer"
            />
          </div>

          <button
            type="submit"
            className="bg-red-600 hover:bg-red-500 text-white font-bold text-xs px-6 py-2.5 rounded-xl shadow-lg shadow-red-900/40 transition flex items-center gap-2 cursor-pointer"
          >
            <Zap className="w-4 h-4" />
            <span>Broadcast Flash Alert</span>
          </button>
        </form>
      </div>

      {/* Active Streaming List */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
            <span>Currently Streaming in Ticker ({breakingArticles.length})</span>
          </h2>
        </div>

        {breakingArticles.length > 0 ? (
          <div className="space-y-3">
            {breakingArticles.map((art) => (
              <div
                key={art.id}
                className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs group hover:border-slate-700 transition"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-10 rounded-lg overflow-hidden shrink-0 bg-slate-800 border border-slate-700">
                    <img src={art.image} alt={art.title.en} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <span className="font-bold text-white text-sm block mb-0.5">
                      {art.title.en || art.title.np}
                    </span>
                    <span className="text-slate-500 text-[11px]">
                      {art.categoryName.en || art.category} • {art.dateNep}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => toggleBreaking(art.id)}
                    className="px-3 py-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 font-bold text-xs transition"
                  >
                    Remove from Ticker
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-8 text-center text-slate-500 text-xs">
            No breaking news stories currently streaming.
          </div>
        )}
      </div>

      {/* Promote to Breaking */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <h2 className="text-base font-bold text-white pb-3 border-b border-slate-800">
          Promote Other Published Stories to Breaking
        </h2>

        <div className="space-y-2">
          {nonBreakingArticles.slice(0, 6).map((art) => (
            <div
              key={art.id}
              className="p-3 rounded-xl bg-slate-950/40 hover:bg-slate-800/40 border border-slate-800 flex items-center justify-between gap-4 text-xs transition"
            >
              <div className="truncate flex-1">
                <span className="font-semibold text-slate-200 block truncate">
                  {art.title.en || art.title.np}
                </span>
                <span className="text-[11px] text-slate-500">
                  {art.categoryName.en || art.category}
                </span>
              </div>

              <button
                onClick={() => toggleBreaking(art.id)}
                className="px-3 py-1.5 bg-slate-800 hover:bg-red-600 font-bold text-slate-300 hover:text-white rounded-lg transition shrink-0 border border-slate-700"
              >
                + Make Breaking
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
