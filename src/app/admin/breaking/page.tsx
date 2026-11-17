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
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useNews } from "@/context/NewsContext";

export default function AdminBreakingPage() {
  const { language, toNepaliNum } = useLanguage();
  const { articles, toggleBreaking, addArticle } = useNews();

  const [instantAlertNp, setInstantAlertNp] = useState("");
  const [instantAlertEn, setInstantAlertEn] = useState("");
  const [created, setCreated] = useState(false);

  const breakingArticles = articles.filter((a) => a.isBreaking);
  const nonBreakingArticles = articles.filter((a) => !a.isBreaking);

  const handleCreateInstant = (e: React.FormEvent) => {
    e.preventDefault();
    if (!instantAlertNp.trim()) return;

    addArticle({
      slug: `flash-${Date.now()}`,
      title: {
        np: instantAlertNp.trim(),
        en: instantAlertEn.trim() || instantAlertNp.trim(),
      },
      subtitle: {
        np: "ताजा ब्रेकिङ अपडेट",
        en: "Breaking Flash Update",
      },
      excerpt: {
        np: instantAlertNp.trim(),
        en: instantAlertEn.trim() || instantAlertNp.trim(),
      },
      content: {
        np: [instantAlertNp.trim()],
        en: [instantAlertEn.trim() || instantAlertNp.trim()],
      },
      category: "politics",
      categoryName: { np: "राजनीति", en: "Politics" },
      image:
        "https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=1200&q=80",
      imageCaption: { np: "ताजा ब्रेकिङ समाचार।", en: "Breaking news alert." },
      author: {
        name: { np: "सानो कुरा डेस्क", en: "Sano Kura Desk" },
        role: { np: "समाचार ब्यूरो", en: "News Bureau" },
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

    setInstantAlertNp("");
    setInstantAlertEn("");
    setCreated(true);
    setTimeout(() => setCreated(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight flex items-center gap-2">
            <Zap className="w-6 h-6 text-red-600 animate-pulse" />
            <span>
              {language === "np" ? "ताजा / ब्रेकिङ समाचार नियन्त्रक" : "Breaking News & Ticker Controller"}
            </span>
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            {language === "np"
              ? "वेबसाइटको शीर्ष रातो टिकरमा गुड्ने ब्रेकिङ समाचारहरू यहाँबाट नियन्त्रण गर्नुहोस्।"
              : "Manage active headlines streaming on the site's top red flash banner."}
          </p>
        </div>

        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-1.5 text-xs text-red-600 hover:text-red-700 bg-red-50 border border-red-200 px-3 py-2 rounded-xl font-bold transition"
        >
          <span>{language === "np" ? "लाइभ टिकर हेर्नुहोस्" : "View Live Ticker"}</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Instant Flash Alert Form */}
      <div className="bg-gradient-to-r from-red-600 to-red-800 text-white rounded-2xl p-6 shadow-xs">
        <h2 className="text-sm font-bold uppercase tracking-wider text-red-200 mb-2 flex items-center gap-1.5">
          <ShieldAlert className="w-4 h-4 text-yellow-300" />
          <span>{language === "np" ? "अति जरुरी ब्रेकिङ फ्ल्यास थप्नुहोस्" : "Publish Urgent Breaking Flash"}</span>
        </h2>
        <p className="text-xs text-red-100 mb-4">
          {language === "np"
            ? "यहाँ लेखिएको शीर्षक तुरुन्तै वेबसाइटको शीर्ष रातो पट्टीमा डिस्प्ले हुनेछ।"
            : "Headlines submitted here immediately stream on the website's top breaking news ticker."}
        </p>

        {created && (
          <div className="mb-4 p-2.5 bg-green-500 text-white rounded-lg text-xs font-bold flex items-center gap-2">
            <CheckCircle className="w-4 h-4" />
            <span>{language === "np" ? "ब्रेकिङ समाचार सफलतापूर्वक जारी भयो!" : "Breaking alert published!"}</span>
          </div>
        )}

        <form onSubmit={handleCreateInstant} className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              type="text"
              required
              placeholder="ब्रेकिङ समाचारको शीर्षक (नेपालीमा)..."
              value={instantAlertNp}
              onChange={(e) => setInstantAlertNp(e.target.value)}
              className="w-full bg-white text-gray-900 border-none rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-yellow-400 placeholder-gray-400"
            />
            <input
              type="text"
              placeholder="Breaking headline translation (English)..."
              value={instantAlertEn}
              onChange={(e) => setInstantAlertEn(e.target.value)}
              className="w-full bg-white text-gray-900 border-none rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-yellow-400 placeholder-gray-400"
            />
          </div>

          <button
            type="submit"
            className="bg-yellow-400 hover:bg-yellow-300 text-red-950 font-black text-xs px-6 py-2.5 rounded-xl shadow-xs transition flex items-center gap-2"
          >
            <Zap className="w-4 h-4" />
            <span>{language === "np" ? "तुरुन्तै टिकरमा पठाउनुहोस् (Publish Flash)" : "Broadcast to Ticker"}</span>
          </button>
        </form>
      </div>

      {/* Active Breaking List */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
          <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-ping" />
            <span>
              {language === "np" ? "हाल सक्रिय ब्रेकिङ समाचारहरू" : "Currently Streaming Breaking News"} (
              {toNepaliNum(breakingArticles.length)})
            </span>
          </h2>
        </div>

        {breakingArticles.length > 0 ? (
          <div className="space-y-3">
            {breakingArticles.map((art) => (
              <div
                key={art.id}
                className="p-4 rounded-xl bg-red-50/50 border border-red-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-10 rounded overflow-hidden shrink-0 bg-gray-200">
                    <img src={art.image} alt={art.title[language]} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <span className="font-bold text-gray-900 text-sm block mb-0.5">
                      {art.title[language]}
                    </span>
                    <span className="text-gray-500 text-[11px]">
                      {art.categoryName[language]} • {art.dateNep}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => toggleBreaking(art.id)}
                    className="px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-xs transition"
                  >
                    {language === "np" ? "टिकरबाट हटाउनुहोस्" : "Deactivate"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-8 text-center text-gray-400 text-xs">
            {language === "np"
              ? "अहिले कुनै पनि ब्रेकिङ समाचार सक्रिय छैन।"
              : "No active breaking news currently."}
          </div>
        )}
      </div>

      {/* Available to Promote */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs space-y-4">
        <h2 className="text-base font-bold text-gray-900 pb-3 border-b border-gray-100">
          {language === "np" ? "अन्य समाचारलाई ब्रेकिङ बनाउनुहोस्" : "Promote Other News to Breaking"}
        </h2>

        <div className="space-y-2">
          {nonBreakingArticles.slice(0, 6).map((art) => (
            <div
              key={art.id}
              className="p-3 rounded-lg hover:bg-gray-50 border border-gray-100 flex items-center justify-between gap-4 text-xs"
            >
              <span className="font-medium text-gray-800 truncate flex-1">{art.title[language]}</span>
              <button
                onClick={() => toggleBreaking(art.id)}
                className="px-3 py-1 bg-gray-100 hover:bg-red-50 hover:text-red-600 font-bold text-gray-700 rounded-md transition shrink-0"
              >
                {language === "np" ? "+ ब्रेकिङ बनाउनुहोस्" : "Make Breaking"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
