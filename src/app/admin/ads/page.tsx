"use client";

import React, { useState, useEffect } from "react";
import {
  PlusCircle,
  Trash2,
  Layout,
  CheckCircle,
  Image as ImageIcon,
} from "lucide-react";

interface AdSlot {
  id: string;
  name: string;
  position: string;
  resolution: string;
  type: "image" | "script" | "html";
  content: string;
  targetUrl?: string;
  active: boolean;
}

const DEFAULT_AD_SLOTS: AdSlot[] = [
  {
    id: "ad-1",
    name: "Homepage Hero Top Leaderboard",
    position: "home-top",
    resolution: "728x90",
    type: "image",
    content: "https://images.unsplash.com/photo-1579389083078-4e7018379f7e?auto=format&fit=crop&w=1200&q=80",
    targetUrl: "https://example.com",
    active: true,
  },
  {
    id: "ad-2",
    name: "Sidebar Medium Rectangle",
    position: "sidebar-mid",
    resolution: "300x250",
    type: "image",
    content: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
    targetUrl: "https://example.com",
    active: true,
  },
  {
    id: "ad-3",
    name: "Article Bottom Banner",
    position: "article-bottom",
    resolution: "728x90",
    type: "image",
    content: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1200&q=80",
    targetUrl: "https://example.com",
    active: true,
  },
];

export default function AdminAdsPage() {
  const [ads, setAds] = useState<AdSlot[]>(DEFAULT_AD_SLOTS);
  const [name, setName] = useState("");
  const [position, setPosition] = useState("home-top");
  const [resolution, setResolution] = useState("728x90");
  const [type, setType] = useState<"image" | "script" | "html">("image");
  const [content, setContent] = useState("");
  const [targetUrl, setTargetUrl] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("sano_kura_ads_manager");
      if (saved) {
        setAds(JSON.parse(saved));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const saveToStorage = (updated: AdSlot[]) => {
    setAds(updated);
    if (typeof window !== "undefined") {
      localStorage.setItem("sano_kura_ads_manager", JSON.stringify(updated));
    }
  };

  const handleCreateAd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !content.trim()) {
      alert("Please enter Ad Name and Ad Content/Image URL.");
      return;
    }

    const newAd: AdSlot = {
      id: `ad-${Date.now()}`,
      name: name.trim(),
      position,
      resolution,
      type,
      content: content.trim(),
      targetUrl: targetUrl.trim(),
      active: true,
    };

    saveToStorage([newAd, ...ads]);
    setName("");
    setContent("");
    setTargetUrl("");
    setSuccessMsg("Ad slot created & published successfully!");
    setTimeout(() => setSuccessMsg(""), 3000);
  };

  const toggleActive = (id: string) => {
    const updated = ads.map((ad) => (ad.id === id ? { ...ad, active: !ad.active } : ad));
    saveToStorage(updated);
  };

  const handleDelete = (id: string) => {
    if (confirm("Delete this ad slot permanently?")) {
      const updated = ads.filter((ad) => ad.id !== id);
      saveToStorage(updated);
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2.5">
            <Layout className="w-6 h-6 text-purple-500" />
            <span>Ads Manager & Monetization</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Place banner, sidebar, and inline advertisements anywhere on the site using standard industry resolutions.
          </p>
        </div>
        {successMsg && (
          <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1.5 rounded-lg">
            <CheckCircle className="w-4 h-4" />
            <span>{successMsg}</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Create Ad Form (1 Col) */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <h3 className="font-extrabold text-sm text-white border-b border-slate-800 pb-3 flex items-center gap-2">
            <PlusCircle className="w-4 h-4 text-purple-500" />
            <span>Create New Ad Placement</span>
          </h3>

          <form onSubmit={handleCreateAd} className="space-y-3.5 text-xs">
            <div>
              <label className="block font-bold text-slate-300 mb-1">Ad Title / Campaign Name *</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Ncell Winter Promo Banner"
                className="w-full bg-slate-950 border border-slate-800 text-white rounded-lg px-3 py-2 text-xs focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-300 mb-1">Website Placement Position *</label>
              <select
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 text-slate-200 rounded-lg px-3 py-2 text-xs focus:ring-2 focus:ring-purple-500"
              >
                <option value="home-top">Homepage Top (Below Header / Ticker)</option>
                <option value="home-mid">Homepage Middle Stream</option>
                <option value="sidebar-mid">Sidebar Rectangle (All Pages)</option>
                <option value="article-top">Article Detail Top</option>
                <option value="article-bottom">Article Detail Bottom</option>
                <option value="footer-banner">Footer Banner</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block font-bold text-slate-300 mb-1">Standard Resolution *</label>
                <select
                  value={resolution}
                  onChange={(e) => setResolution(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 text-slate-200 rounded-lg px-3 py-2 text-xs focus:ring-2 focus:ring-purple-500"
                >
                  <option value="728x90">728 x 90 (Leaderboard)</option>
                  <option value="300x250">300 x 250 (Medium Rect)</option>
                  <option value="300x600">300 x 600 (Half Page)</option>
                  <option value="320x50">320 x 50 (Mobile Banner)</option>
                  <option value="970x90">970 x 90 (Large Billboard)</option>
                  <option value="160x600">160 x 600 (Skyscraper)</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">Ad Type</label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value as any)}
                  className="w-full bg-slate-950 border border-slate-800 text-slate-200 rounded-lg px-3 py-2 text-xs focus:ring-2 focus:ring-purple-500"
                >
                  <option value="image">Image Banner URL</option>
                  <option value="script">AdScript / Embed</option>
                  <option value="html">Custom HTML / Code</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-300 mb-1">
                {type === "image" ? "Banner Image URL *" : "Ad Embed Code / HTML *"}
              </label>
              <textarea
                required
                rows={3}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder={
                  type === "image"
                    ? "https://images.unsplash.com/... or upload link"
                    : "<script>...</script> or custom HTML banner"
                }
                className="w-full bg-slate-950 border border-slate-800 text-slate-200 rounded-lg p-2.5 text-xs focus:ring-2 focus:ring-purple-500 font-mono"
              />
            </div>

            {type === "image" && (
              <div>
                <label className="block font-bold text-slate-300 mb-1">Click-through Destination URL</label>
                <input
                  type="url"
                  value={targetUrl}
                  onChange={(e) => setTargetUrl(e.target.value)}
                  placeholder="https://advertiser-website.com"
                  className="w-full bg-slate-950 border border-slate-800 text-white rounded-lg px-3 py-2 text-xs focus:ring-2 focus:ring-purple-500"
                />
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold py-2.5 rounded-xl transition shadow-lg shadow-purple-900/30 flex items-center justify-center gap-1.5"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Deploy Ad Slot</span>
            </button>
          </form>
        </div>

        {/* Active Ads List & Preview (2 Cols) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 shadow-xl flex items-center justify-between text-xs">
            <span className="font-bold text-slate-300">Active Placements ({ads.filter((a) => a.active).length} live)</span>
            <span className="text-slate-500">Standard Resolutions: 728x90, 300x250, 320x50, 300x600</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {ads.map((ad) => (
              <div
                key={ad.id}
                className={`bg-slate-900/80 border rounded-2xl overflow-hidden shadow-lg flex flex-col justify-between transition ${
                  ad.active ? "border-slate-800" : "border-slate-800/40 opacity-60"
                }`}
              >
                <div className="p-4 border-b border-slate-800 flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className={`text-[10px] font-extrabold px-2 py-0.5 rounded uppercase tracking-wider ${
                          ad.active ? "bg-emerald-500/20 text-emerald-400" : "bg-slate-800 text-slate-400"
                        }`}
                      >
                        {ad.active ? "Live" : "Paused"}
                      </span>
                      <span className="text-[10px] font-mono bg-purple-500/20 text-purple-300 px-1.5 py-0.5 rounded">
                        {ad.resolution}
                      </span>
                    </div>
                    <h4 className="font-bold text-xs text-white line-clamp-1">{ad.name}</h4>
                    <p className="text-[10px] text-slate-400 font-mono mt-0.5">Position: {ad.position}</p>
                  </div>
                  <button
                    onClick={() => toggleActive(ad.id)}
                    className={`text-[10px] px-2.5 py-1 rounded-lg font-bold transition ${
                      ad.active ? "bg-slate-800 text-slate-300 hover:bg-slate-700" : "bg-emerald-600 text-white"
                    }`}
                  >
                    {ad.active ? "Pause" : "Activate"}
                  </button>
                </div>

                {/* Ad Preview Box */}
                <div className="p-4 bg-slate-950 flex flex-col items-center justify-center min-h-[120px] relative">
                  {ad.type === "image" ? (
                    <div className="w-full text-center">
                      <img
                        src={ad.content}
                        alt={ad.name}
                        className="max-h-28 w-full object-cover rounded-lg border border-slate-800"
                      />
                      {ad.targetUrl && (
                        <span className="text-[9px] text-slate-500 mt-1 block truncate">
                          Target: {ad.targetUrl}
                        </span>
                      )}
                    </div>
                  ) : (
                    <div className="w-full bg-slate-900 p-3 rounded-lg border border-slate-800 font-mono text-[10px] text-purple-300 overflow-hidden line-clamp-3">
                      {ad.content}
                    </div>
                  )}
                </div>

                <div className="p-3 bg-slate-900/50 border-t border-slate-800 flex items-center justify-between text-[11px]">
                  <span className="text-slate-500 capitalize">Type: {ad.type}</span>
                  <button
                    onClick={() => handleDelete(ad.id)}
                    className="text-rose-400 hover:text-rose-300 p-1.5 rounded hover:bg-rose-950 transition flex items-center gap-1"
                    title="Delete ad slot"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
