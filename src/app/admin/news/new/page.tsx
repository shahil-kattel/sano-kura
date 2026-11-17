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
import { useLanguage } from "@/context/LanguageContext";
import { useNews } from "@/context/NewsContext";

export default function CreateArticlePage() {
  const router = useRouter();
  const { language } = useLanguage();
  const { categories, addArticle } = useNews();

  const [titleNp, setTitleNp] = useState("");
  const [titleEn, setTitleEn] = useState("");
  const [subtitleNp, setSubtitleNp] = useState("");
  const [subtitleEn, setSubtitleEn] = useState("");
  const [excerptNp, setExcerptNp] = useState("");
  const [excerptEn, setExcerptEn] = useState("");
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

  // Generate URL slug from title
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
    if (!titleNp.trim() || !contentNp.trim()) {
      alert("कृपया नेपाली शीर्षक र समाचार विवरण अनिवार्य लेख्नुहोस्।");
      return;
    }

    setSaving(true);

    const paragraphsNp = contentNp
      .split("\n\n")
      .map((p) => p.trim())
      .filter(Boolean);
    const paragraphsEn = contentEn
      ? contentEn
          .split("\n\n")
          .map((p) => p.trim())
          .filter(Boolean)
      : paragraphsNp;

    const catObj = categories.find((c) => c.slug === category);

    const newArt = {
      slug: generateSlug(titleEn || titleNp),
      title: {
        np: titleNp.trim(),
        en: titleEn.trim() || titleNp.trim(),
      },
      subtitle: {
        np: subtitleNp.trim() || titleNp.trim(),
        en: subtitleEn.trim() || titleEn.trim() || titleNp.trim(),
      },
      excerpt: {
        np: excerptNp.trim() || paragraphsNp[0]?.slice(0, 160) || titleNp.trim(),
        en:
          excerptEn.trim() ||
          paragraphsEn[0]?.slice(0, 160) ||
          titleEn.trim() ||
          titleNp.trim(),
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
      views: 120,
      isBreaking,
      isLead,
      isTrending,
      province,
      tags: {
        np: tagsNp.split(",").map((t) => t.trim()).filter(Boolean),
        en: tagsEn.split(",").map((t) => t.trim()).filter(Boolean),
      },
    };

    addArticle(newArt);
    setSaving(false);
    setSuccess(true);

    setTimeout(() => {
      router.push("/admin/news");
    }, 1200);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Top Bar */}
      <div className="flex items-center justify-between">
        <Link
          href="/admin/news"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-600 hover:text-red-600 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{language === "np" ? "समाचार सूचीमा फर्कनुहोस्" : "Back to Articles"}</span>
        </Link>

        {success && (
          <div className="flex items-center gap-1.5 text-xs font-bold text-green-700 bg-green-100 px-3 py-1 rounded-md animate-in fade-in">
            <CheckCircle className="w-4 h-4" />
            <span>{language === "np" ? "समाचार सफलतापूर्वक प्रकाशित भयो!" : "Article Published!"}</span>
          </div>
        )}
      </div>

      {/* Main Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-xs space-y-6">
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
              {language === "np" ? "नयाँ समाचार सिर्जना गर्नुहोस्" : "Create New News Article"}
            </h1>
            <p className="text-xs text-gray-500 mt-1">
              {language === "np"
                ? "नेपाली र अङ्ग्रेजी दुवै भाषामा शीर्षक, सारांश तथा विस्तृत अनुच्छेदहरू भर्नुहोस्।"
                : "Fill in both Nepali and English fields for bilingual publishing."}
            </p>
          </div>

          {/* 1. HEADLINES (Bilingual) */}
          <div className="space-y-4 pt-4 border-t border-gray-100">
            <div>
              <label className="block text-xs font-bold text-gray-800 mb-1">
                {language === "np" ? "समाचार शीर्षक (नेपालीमा) *" : "Headline in Nepali *"}
              </label>
              <input
                type="text"
                required
                placeholder="यहाँ मुख्य नेपाली समाचार शीर्षक लेख्नुहोस्..."
                value={titleNp}
                onChange={(e) => setTitleNp(e.target.value)}
                className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-2.5 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-800 mb-1">
                {language === "np" ? "समाचार शीर्षक (English Translation)" : "Headline in English"}
              </label>
              <input
                type="text"
                placeholder="Enter headline translation in English..."
                value={titleEn}
                onChange={(e) => setTitleEn(e.target.value)}
                className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
          </div>

          {/* 2. SUBTITLES */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                उप-शीर्षक (नेपालीमा)
              </label>
              <input
                type="text"
                placeholder="उप-शीर्षक..."
                value={subtitleNp}
                onChange={(e) => setSubtitleNp(e.target.value)}
                className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Subtitle (English)
              </label>
              <input
                type="text"
                placeholder="Subtitle in English..."
                value={subtitleEn}
                onChange={(e) => setSubtitleEn(e.target.value)}
                className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
          </div>

          {/* 3. CATEGORY & PROVINCE SELECTION */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                समाचार विधा (Category) *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                {categories.map((c) => (
                  <option key={c.slug} value={c.slug}>
                    {c.name.np} ({c.name.en})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                प्रदेश (Province Focus)
              </label>
              <select
                value={province}
                onChange={(e) => setProvince(e.target.value)}
                className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="bagmati">बागमती (Bagmati)</option>
                <option value="koshi">कोशी (Koshi)</option>
                <option value="madhesh">मधेश (Madhesh)</option>
                <option value="gandaki">गण्डकी (Gandaki)</option>
                <option value="lumbini">लुम्बिनी (Lumbini)</option>
                <option value="karnali">कर्णाली (Karnali)</option>
                <option value="sudurpashchim">सुदूरपश्चिम (Sudurpashchim)</option>
              </select>
            </div>
          </div>

          {/* 4. FEATURED IMAGE */}
          <div className="space-y-3 bg-gray-50 p-4 rounded-xl border border-gray-200">
            <label className="block text-xs font-bold text-gray-800">
              मुख्य तस्बिर (Featured Image URL) *
            </label>
            <input
              type="url"
              required
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://images.unsplash.com/..."
              className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-red-500"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] text-gray-600 mb-0.5">
                  तस्बिर विवरण / क्याप्सन (नेपाली)
                </label>
                <input
                  type="text"
                  value={captionNp}
                  onChange={(e) => setCaptionNp(e.target.value)}
                  className="w-full bg-white border border-gray-300 rounded px-2.5 py-1.5 text-xs"
                />
              </div>
              <div>
                <label className="block text-[11px] text-gray-600 mb-0.5">
                  Image Caption (English)
                </label>
                <input
                  type="text"
                  value={captionEn}
                  onChange={(e) => setCaptionEn(e.target.value)}
                  className="w-full bg-white border border-gray-300 rounded px-2.5 py-1.5 text-xs"
                />
              </div>
            </div>
          </div>

          {/* 5. CONTENT (Full rich text paragraphs) */}
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-800 mb-1">
                विस्तृत समाचार सामग्री (नेपालीमा) * (अनुच्छेदहरू खाली लाइन छाडेर लेख्नुहोस्)
              </label>
              <textarea
                required
                rows={6}
                value={contentNp}
                onChange={(e) => setContentNp(e.target.value)}
                placeholder="यहाँ पूर्ण समाचारका अनुच्छेदहरू लेख्नुहोस्। अनुच्छेद परिवर्तन गर्न दुई पटक Enter थिच्नुहोस्..."
                className="w-full bg-gray-50 border border-gray-300 rounded-xl p-4 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-red-500 font-nepali leading-relaxed"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-800 mb-1">
                Full Article Content (English Translation)
              </label>
              <textarea
                rows={5}
                value={contentEn}
                onChange={(e) => setContentEn(e.target.value)}
                placeholder="Enter the full article paragraphs in English here..."
                className="w-full bg-gray-50 border border-gray-300 rounded-xl p-4 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-red-500 leading-relaxed"
              />
            </div>
          </div>

          {/* 6. AUTHOR & TAGS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                लेखक / संवाददाताको नाम (नेपाली)
              </label>
              <input
                type="text"
                value={authorNameNp}
                onChange={(e) => setAuthorNameNp(e.target.value)}
                className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Author Name (English)
              </label>
              <input
                type="text"
                value={authorNameEn}
                onChange={(e) => setAuthorNameEn(e.target.value)}
                className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                ट्यागहरू (Tags NP - अल्पविरामले छुट्ट्याउनुहोस्)
              </label>
              <input
                type="text"
                value={tagsNp}
                onChange={(e) => setTagsNp(e.target.value)}
                className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Tags (English - comma separated)
              </label>
              <input
                type="text"
                value={tagsEn}
                onChange={(e) => setTagsEn(e.target.value)}
                className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-xs"
              />
            </div>
          </div>

          {/* 7. TOGGLES: Breaking, Lead, Trending */}
          <div className="pt-4 border-t border-gray-100 flex flex-wrap items-center gap-6">
            <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-gray-800">
              <input
                type="checkbox"
                checked={isBreaking}
                onChange={(e) => setIsBreaking(e.target.checked)}
                className="w-4 h-4 text-red-600 rounded focus:ring-red-500"
              />
              <span className="flex items-center gap-1 text-red-600">
                <Zap className="w-3.5 h-3.5" />
                ताजा / ब्रेकिङ समाचार (Breaking)
              </span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-gray-800">
              <input
                type="checkbox"
                checked={isLead}
                onChange={(e) => setIsLead(e.target.checked)}
                className="w-4 h-4 text-yellow-600 rounded focus:ring-yellow-500"
              />
              <span className="flex items-center gap-1 text-yellow-700">
                <Award className="w-3.5 h-3.5" />
                गृहपृष्ठको प्रमुख समाचार (Hero Lead)
              </span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-gray-800">
              <input
                type="checkbox"
                checked={isTrending}
                onChange={(e) => setIsTrending(e.target.checked)}
                className="w-4 h-4 text-orange-600 rounded focus:ring-orange-500"
              />
              <span className="flex items-center gap-1 text-orange-600">
                <Flame className="w-3.5 h-3.5" />
                ट्रेन्डिङ सूचीमा देखाउने (Trending)
              </span>
            </label>
          </div>

          {/* 8. SUBMIT BUTTON */}
          <div className="pt-6 border-t border-gray-100 flex items-center justify-end gap-3">
            <Link
              href="/admin/news"
              className="px-5 py-2.5 rounded-xl border border-gray-300 text-gray-700 text-xs font-semibold hover:bg-gray-100 transition"
            >
              रद्द गर्नुहोस् (Cancel)
            </Link>
            <button
              type="submit"
              disabled={saving}
              className="bg-red-600 hover:bg-red-700 text-white font-bold text-xs sm:text-sm px-7 py-2.5 rounded-xl shadow-xs transition flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>{saving ? "सुरक्षित हुँदैछ..." : "समाचार प्रकाशित गर्नुहोस् (Publish)"}</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
