"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Save,
  CheckCircle,
  Image as ImageIcon,
  Zap,
  Award,
  Flame,
  Globe,
  Sparkles,
} from "lucide-react";
import { useNews } from "@/context/NewsContext";

export default function CreateArticlePage() {
  const router = useRouter();
  const { categories, addArticle } = useNews();

  const [titleNp, setTitleNp] = useState("");
  const [titleEn, setTitleEn] = useState("");
  const [subtitleNp, setSubtitleNp] = useState("");
  const [subtitleEn, setSubtitleEn] = useState("");
  const [contentNp, setContentNp] = useState("");
  const [contentEn, setContentEn] = useState("");
  const [category, setCategory] = useState("politics");
  const [province, setProvince] = useState<any>("bagmati");
  const [imageUrl, setImageUrl] = useState(
    "https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=1200&q=80"
  );
  const [captionNp, setCaptionNp] = useState("तस्बिर: सानो कुरा समाचार ब्यूरो।");
  const [captionEn, setCaptionEn] = useState("Photo: Sano Kura News Bureau.");
  const [authorNameNp, setAuthorNameNp] = useState("सन्तोष न्यौपाने");
  const [authorNameEn, setAuthorNameEn] = useState("Santosh Neupane");
  const [authorRoleNp, setAuthorRoleNp] = useState("विशेष संवाददाता");
  const [authorRoleEn, setAuthorRoleEn] = useState("Special Correspondent");
  const [tagsNp, setTagsNp] = useState("समाचार, नेपाल, ताजा");
  const [tagsEn, setTagsEn] = useState("News, Nepal, Updates");
  const [isBreaking, setIsBreaking] = useState(false);
  const [isLead, setIsLead] = useState(false);
  const [isTrending, setIsTrending] = useState(false);

  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  const generateSlug = (text: string) => {
    return (
      text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "") || `news-${Date.now()}`
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!titleNp.trim() && !titleEn.trim()) {
      alert("Please provide at least a title.");
      return;
    }

    setSaving(true);

    const paragraphsNp = contentNp
      ? contentNp.split("\n\n").map((p) => p.trim()).filter(Boolean)
      : [contentEn];
    const paragraphsEn = contentEn
      ? contentEn.split("\n\n").map((p) => p.trim()).filter(Boolean)
      : paragraphsNp;

    const catObj = categories.find((c) => c.slug === category);

    const primaryTitle = titleEn.trim() || titleNp.trim();
    const nepaliTitle = titleNp.trim() || titleEn.trim();

    addArticle({
      slug: generateSlug(primaryTitle),
      title: {
        np: nepaliTitle,
        en: primaryTitle,
      },
      subtitle: {
        np: subtitleNp.trim() || nepaliTitle,
        en: subtitleEn.trim() || primaryTitle,
      },
      excerpt: {
        np: paragraphsNp[0]?.slice(0, 160) || nepaliTitle,
        en: paragraphsEn[0]?.slice(0, 160) || primaryTitle,
      },
      content: {
        np: paragraphsNp,
        en: paragraphsEn,
      },
      category,
      categoryName: {
        np: catObj?.name.np || "समाचार",
        en: catObj?.name.en || "News",
      },
      image: imageUrl.trim(),
      imageCaption: {
        np: captionNp.trim(),
        en: captionEn.trim(),
      },
      author: {
        name: { np: authorNameNp.trim(), en: authorNameEn.trim() },
        role: { np: authorRoleNp.trim(), en: authorRoleEn.trim() },
        avatar:
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      },
      date: new Date().toISOString(),
      dateNep: "२०८१ मंसिर २ गते",
      readTime: { np: "३ मिनेट पढाइ", en: "3 min read" },
      views: 100,
      isBreaking,
      isLead,
      isTrending,
      province,
      tags: {
        np: tagsNp.split(",").map((t) => t.trim()).filter(Boolean),
        en: tagsEn.split(",").map((t) => t.trim()).filter(Boolean),
      },
    });

    setSaving(false);
    setSuccess(true);

    setTimeout(() => {
      router.push("/admin/news");
    }, 1200);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <Link
          href="/admin/news"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Articles</span>
        </Link>

        {success && (
          <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1.5 rounded-lg">
            <CheckCircle className="w-4 h-4" />
            <span>Article Published Successfully!</span>
          </div>
        )}
      </div>

      {/* Main Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Create New Article
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Publish news simultaneously in Nepali and English with rich editorial controls.
            </p>
          </div>

          {/* 1. HEADLINES */}
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                Headline (English) *
              </label>
              <input
                type="text"
                required
                placeholder="Enter prominent article headline in English..."
                value={titleEn}
                onChange={(e) => setTitleEn(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl px-4 py-2.5 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                Headline in Nepali (नेपाली शीर्षक) *
              </label>
              <input
                type="text"
                required
                placeholder="यहाँ मुख्य नेपाली समाचार शीर्षक लेख्नुहोस्..."
                value={titleNp}
                onChange={(e) => setTitleNp(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl px-4 py-2.5 text-sm font-nepali focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
          </div>

          {/* 2. SUBTITLES */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                Subtitle (English)
              </label>
              <input
                type="text"
                placeholder="Brief secondary summary..."
                value={subtitleEn}
                onChange={(e) => setSubtitleEn(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 text-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                उप-शीर्षक (नेपाली)
              </label>
              <input
                type="text"
                placeholder="नेपाली उप-शीर्षक..."
                value={subtitleNp}
                onChange={(e) => setSubtitleNp(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 text-slate-200 rounded-lg px-3 py-2 text-xs font-nepali focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
          </div>

          {/* 3. CATEGORY & PROVINCE */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                Category Section *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 text-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                {categories.map((c) => (
                  <option key={c.slug} value={c.slug}>
                    {c.name.en} ({c.name.np})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                Regional Focus (Province)
              </label>
              <select
                value={province}
                onChange={(e) => setProvince(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 text-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="bagmati">Bagmati Province (बागमती)</option>
                <option value="koshi">Koshi Province (कोशी)</option>
                <option value="madhesh">Madhesh Province (मधेश)</option>
                <option value="gandaki">Gandaki Province (गण्डकी)</option>
                <option value="lumbini">Lumbini Province (लुम्बिनी)</option>
                <option value="karnali">Karnali Province (कर्णाली)</option>
                <option value="sudurpashchim">Sudurpashchim (सुदूरपश्चिम)</option>
              </select>
            </div>
          </div>

          {/* 4. FEATURED IMAGE */}
          <div className="space-y-3 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
            <label className="block text-xs font-bold text-slate-300">
              Featured Image URL *
            </label>
            <input
              type="url"
              required
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://images.unsplash.com/..."
              className="w-full bg-slate-900 border border-slate-800 text-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-red-500 font-mono"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] text-slate-400 mb-0.5">
                  Image Caption (English)
                </label>
                <input
                  type="text"
                  value={captionEn}
                  onChange={(e) => setCaptionEn(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 text-slate-300 rounded px-2.5 py-1.5 text-xs"
                />
              </div>
              <div>
                <label className="block text-[11px] text-slate-400 mb-0.5">
                  तस्बिर क्याप्सन (नेपाली)
                </label>
                <input
                  type="text"
                  value={captionNp}
                  onChange={(e) => setCaptionNp(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 text-slate-300 rounded px-2.5 py-1.5 text-xs font-nepali"
                />
              </div>
            </div>
          </div>

          {/* 5. CONTENT (Paragraphs) */}
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                Full Article Content (English) * (separate paragraphs with blank lines)
              </label>
              <textarea
                required
                rows={6}
                value={contentEn}
                onChange={(e) => setContentEn(e.target.value)}
                placeholder="Enter complete news paragraphs in English. Press Enter twice for a new paragraph..."
                className="w-full bg-slate-950 border border-slate-800 text-slate-200 rounded-xl p-4 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-red-500 leading-relaxed"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                विस्तृत समाचार सामग्री (नेपालीमा) (खाली लाइन छाडेर अनुच्छेद छुट्ट्याउनुहोस्)
              </label>
              <textarea
                rows={6}
                value={contentNp}
                onChange={(e) => setContentNp(e.target.value)}
                placeholder="नेपाली समाचार सामग्री यहाँ लेख्नुहोस्..."
                className="w-full bg-slate-950 border border-slate-800 text-slate-200 rounded-xl p-4 text-xs sm:text-sm font-nepali leading-relaxed focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
          </div>

          {/* 6. AUTHOR & TAGS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                Author Name (English)
              </label>
              <input
                type="text"
                value={authorNameEn}
                onChange={(e) => setAuthorNameEn(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 text-slate-200 rounded-lg px-3 py-2 text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                Author Role (English)
              </label>
              <input
                type="text"
                value={authorRoleEn}
                onChange={(e) => setAuthorRoleEn(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 text-slate-200 rounded-lg px-3 py-2 text-xs"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">
              Article Tags (Comma separated)
            </label>
            <input
              type="text"
              value={tagsEn}
              onChange={(e) => setTagsEn(e.target.value)}
              placeholder="e.g. Economy, Hydropower, Regional Trade"
              className="w-full bg-slate-950 border border-slate-800 text-slate-200 rounded-lg px-3 py-2 text-xs"
            />
          </div>

          {/* 7. PROMOTION TOGGLES */}
          <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center gap-6">
            <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-300">
              <input
                type="checkbox"
                checked={isBreaking}
                onChange={(e) => setIsBreaking(e.target.checked)}
                className="w-4 h-4 text-red-600 bg-slate-950 border-slate-800 rounded focus:ring-red-500"
              />
              <span className="flex items-center gap-1 text-red-400">
                <Zap className="w-3.5 h-3.5" />
                Breaking News (Flash Ticker)
              </span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-300">
              <input
                type="checkbox"
                checked={isLead}
                onChange={(e) => setIsLead(e.target.checked)}
                className="w-4 h-4 text-amber-500 bg-slate-950 border-slate-800 rounded focus:ring-amber-500"
              />
              <span className="flex items-center gap-1 text-amber-400">
                <Award className="w-3.5 h-3.5" />
                Homepage Hero Lead Story
              </span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-300">
              <input
                type="checkbox"
                checked={isTrending}
                onChange={(e) => setIsTrending(e.target.checked)}
                className="w-4 h-4 text-orange-500 bg-slate-950 border-slate-800 rounded focus:ring-orange-500"
              />
              <span className="flex items-center gap-1 text-orange-400">
                <Flame className="w-3.5 h-3.5" />
                Featured in Trending
              </span>
            </label>
          </div>

          {/* 8. ACTIONS */}
          <div className="pt-6 border-t border-slate-800 flex items-center justify-end gap-3">
            <Link
              href="/admin/news"
              className="px-5 py-2.5 rounded-xl border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 text-xs font-semibold transition"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={saving}
              className="bg-red-600 hover:bg-red-500 text-white font-bold text-xs sm:text-sm px-7 py-2.5 rounded-xl shadow-lg shadow-red-900/30 transition flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>{saving ? "Publishing..." : "Publish Article"}</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
