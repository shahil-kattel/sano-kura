"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  FileText,
  Save,
  CheckCircle,
  ExternalLink,
  Upload,
  Calendar,
  Newspaper,
} from "lucide-react";
import ImageUpload from "@/components/admin/ImageUpload";

export default function AdminEPaperPage() {
  const [editionDateNp, setEditionDateNp] = useState("२०८१ मंसिर २, मंगलबार");
  const [editionDateEn, setEditionDateEn] = useState("Tuesday, Nov 17, 2026");
  const [volume, setVolume] = useState("Vol III, Issue 284");
  const [price, setPrice] = useState("Rs 10/-");
  const [frontPageImage, setFrontPageImage] = useState("");
  const [leadStoryTitle, setLeadStoryTitle] = useState(
    "Nepal Clean Energy Export: Historic Trilateral Electricity Pact with India & Bangladesh Takes Effect"
  );
  const [saved, setSaved] = useState(false);

  const pages = [
    { num: 1, title: "Page 1: Front Page Lead", story: leadStoryTitle },
    { num: 2, title: "Page 2: Editorial & Columns", story: "Rethinking Youth Outmigration and Domestic Enterprise" },
    { num: 3, title: "Page 3: National Politics", story: "Parliament Passes Digital Public Services Act" },
    { num: 4, title: "Page 4: Economy & Stock Markets", story: "NEPSE Rallies 52 Points with Rs 12B Turnover" },
    { num: 5, title: "Page 5: 7 Provinces Digest", story: "Solar Irrigation in Madhesh & Annapurna Eco-Trails" },
    { num: 6, title: "Page 6: World & Technology", story: "Nepal Launches Indigenous Devanagari AI Language Model" },
    { num: 7, title: "Page 7: Sports Arena", story: "Rohit Paudel's Century Seals International Tri-Series" },
    { num: 8, title: "Page 8: Cinema & Arts", story: "Nepali Film 'Ukali-Orali' Earns Standing Ovation in Toronto" },
  ];

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2.5">
            <Newspaper className="w-6 h-6 text-red-500" />
            <span>Digital E-Paper Edition Manager</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Configure the daily print edition metadata, issue dates, and page spreads.
          </p>
        </div>

        <Link
          href="/epaper"
          target="_blank"
          className="flex items-center gap-1.5 text-xs text-red-400 hover:text-white bg-red-600/10 border border-red-500/30 px-3.5 py-2 rounded-xl font-bold transition hover:bg-red-600"
        >
          <span>Open Live E-Paper</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>
      </div>

      {saved && (
        <div className="p-3 bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 rounded-xl text-xs font-bold flex items-center gap-2">
          <CheckCircle className="w-4 h-4" />
          <span>E-Paper edition configuration updated successfully!</span>
        </div>
      )}

      {/* Main Settings Form */}
      <form onSubmit={handleSave} className="space-y-6">
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-300 border-b border-slate-800 pb-3">
            Today's Edition Metadata
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block font-bold text-slate-300 mb-1">
                Publication Date (English)
              </label>
              <input
                type="text"
                value={editionDateEn}
                onChange={(e) => setEditionDateEn(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 text-white rounded-lg px-3 py-2 text-xs"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-300 mb-1">
                प्रकाशन मिति (वि.सं.)
              </label>
              <input
                type="text"
                value={editionDateNp}
                onChange={(e) => setEditionDateNp(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 text-white rounded-lg px-3 py-2 text-xs font-nepali"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-300 mb-1">
                Volume & Issue Number
              </label>
              <input
                type="text"
                value={volume}
                onChange={(e) => setVolume(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 text-white rounded-lg px-3 py-2 text-xs"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">
              Front-Page Lead Story Headline
            </label>
            <input
              type="text"
              value={leadStoryTitle}
              onChange={(e) => setLeadStoryTitle(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 text-white rounded-lg px-3 py-2 text-xs font-semibold"
            />
          </div>

          <div className="pt-2">
            <ImageUpload
              value={frontPageImage}
              onChange={setFrontPageImage}
              label="Front-Page Broadsheet Scan (From Computer)"
              helperText="Upload the daily high-resolution newspaper front page scanned from your computer"
            />
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="bg-red-600 hover:bg-red-500 text-white font-bold text-xs px-6 py-2.5 rounded-xl shadow-lg shadow-red-900/30 flex items-center gap-2 transition"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Edition Settings</span>
            </button>
          </div>
        </div>

        {/* 8 Pages Grid Overview */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-300 border-b border-slate-800 pb-3">
            Digital 8-Page Layout Overview
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            {pages.map((p) => (
              <div
                key={p.num}
                className="p-4 rounded-xl border border-slate-800 bg-slate-950/60 flex flex-col justify-between h-36 group hover:border-slate-700 transition"
              >
                <div>
                  <span className="font-extrabold text-red-400 text-[11px] block mb-1">
                    Page {p.num}
                  </span>
                  <p className="font-bold text-white text-xs mb-1">{p.title}</p>
                </div>
                <p className="text-[11px] text-slate-500 line-clamp-2 italic">
                  "{p.story}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </form>
    </div>
  );
}
