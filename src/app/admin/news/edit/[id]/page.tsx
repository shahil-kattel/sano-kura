"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Save,
  CheckCircle,
  Zap,
  Award,
  Flame,
  Trash2,
  ExternalLink,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useNews } from "@/context/NewsContext";

export default function EditArticlePage() {
  const params = useParams();
  const id = params?.id as string;
  const router = useRouter();
  const { language } = useLanguage();
  const { articles, categories, updateArticle, deleteArticle } = useNews();

  const article = articles.find((a) => a.id === id || a.slug === id);

  const [titleNp, setTitleNp] = useState("");
  const [titleEn, setTitleEn] = useState("");
  const [subtitleNp, setSubtitleNp] = useState("");
  const [subtitleEn, setSubtitleEn] = useState("");
  const [contentNp, setContentNp] = useState("");
  const [contentEn, setContentEn] = useState("");
  const [category, setCategory] = useState("politics");
  const [imageUrl, setImageUrl] = useState("");
  const [authorNameNp, setAuthorNameNp] = useState("");
  const [authorNameEn, setAuthorNameEn] = useState("");
  const [isBreaking, setIsBreaking] = useState(false);
  const [isLead, setIsLead] = useState(false);
  const [isTrending, setIsTrending] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (article) {
      setTitleNp(article.title.np);
      setTitleEn(article.title.en);
      setSubtitleNp(article.subtitle.np);
      setSubtitleEn(article.subtitle.en);
      setContentNp(article.content.np.join("\n\n"));
      setContentEn(article.content.en.join("\n\n"));
      setCategory(article.category);
      setImageUrl(article.image);
      setAuthorNameNp(article.author.name.np);
      setAuthorNameEn(article.author.name.en);
      setIsBreaking(Boolean(article.isBreaking));
      setIsLead(Boolean(article.isLead));
      setIsTrending(Boolean(article.isTrending));
    }
  }, [article]);

  if (!article) {
    return (
      <div className="py-12 text-center bg-white rounded-2xl border border-gray-200">
        <h2 className="text-xl font-bold text-gray-800 mb-2">समाचार फेला परेन (Article Not Found)</h2>
        <Link href="/admin/news" className="text-xs text-red-600 font-bold hover:underline">
          समाचार सूचीमा फर्कनुहोस्
        </Link>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const paragraphsNp = contentNp.split("\n\n").map((p) => p.trim()).filter(Boolean);
    const paragraphsEn = contentEn ? contentEn.split("\n\n").map((p) => p.trim()).filter(Boolean) : paragraphsNp;
    const catObj = categories.find((c) => c.slug === category);

    updateArticle(article.id, {
      title: { np: titleNp, en: titleEn || titleNp },
      subtitle: { np: subtitleNp, en: subtitleEn || subtitleNp },
      excerpt: {
        np: paragraphsNp[0]?.slice(0, 160) || titleNp,
        en: paragraphsEn[0]?.slice(0, 160) || titleEn || titleNp,
      },
      content: { np: paragraphsNp, en: paragraphsEn },
      category,
      categoryName: {
        np: catObj?.name.np || article.categoryName.np,
        en: catObj?.name.en || article.categoryName.en,
      },
      image: imageUrl,
      author: {
        ...article.author,
        name: { np: authorNameNp, en: authorNameEn },
      },
      isBreaking,
      isLead,
      isTrending,
    });

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
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-600 hover:text-red-600 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{language === "np" ? "समाचार सूचीमा फर्कनुहोस्" : "Back to Articles"}</span>
        </Link>

        <div className="flex items-center gap-2">
          <Link
            href={`/news/${article.slug}`}
            target="_blank"
            className="flex items-center gap-1 text-xs text-gray-600 hover:text-red-600 bg-white border border-gray-200 px-3 py-1.5 rounded-lg"
          >
            <span>लाइभ हेर्नुहोस्</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          {success && (
            <div className="flex items-center gap-1 text-xs font-bold text-green-700 bg-green-100 px-3 py-1.5 rounded-lg">
              <CheckCircle className="w-4 h-4" />
              <span>परिमार्जन सुरक्षित भयो!</span>
            </div>
          )}
        </div>
      </div>

      {/* Edit Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-gray-100">
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
                {language === "np" ? "समाचार सम्पादन गर्नुहोस्" : "Edit News Article"}
              </h1>
              <p className="text-xs text-gray-500 mt-1">ID: {article.id} • Slug: {article.slug}</p>
            </div>

            <button
              type="button"
              onClick={() => {
                if (confirm("Delete article?")) {
                  deleteArticle(article.id);
                  router.push("/admin/news");
                }
              }}
              className="text-xs text-red-600 hover:text-red-700 border border-red-200 px-3 py-1.5 rounded-lg flex items-center gap-1"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>हटाउनुहोस् (Delete)</span>
            </button>
          </div>

          {/* Title */}
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-800 mb-1">
                समाचार शीर्षक (नेपाली) *
              </label>
              <input
                type="text"
                required
                value={titleNp}
                onChange={(e) => setTitleNp(e.target.value)}
                className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-2.5 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-800 mb-1">
                Headline (English Translation)
              </label>
              <input
                type="text"
                value={titleEn}
                onChange={(e) => setTitleEn(e.target.value)}
                className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
          </div>

          {/* Subtitles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">उप-शीर्षक (नेपाली)</label>
              <input
                type="text"
                value={subtitleNp}
                onChange={(e) => setSubtitleNp(e.target.value)}
                className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Subtitle (English)</label>
              <input
                type="text"
                value={subtitleEn}
                onChange={(e) => setSubtitleEn(e.target.value)}
                className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-xs"
              />
            </div>
          </div>

          {/* Category & Image */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">विधा (Category)</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-xs"
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
                तस्बिर लिङ्क (Image URL)
              </label>
              <input
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-xs"
              />
            </div>
          </div>

          {/* Content Paragraphs */}
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-800 mb-1">
                विस्तृत सामग्री (नेपाली - अनुच्छेद परिवर्तन गर्न खाली लाइन छाड्नुहोस्)
              </label>
              <textarea
                rows={6}
                value={contentNp}
                onChange={(e) => setContentNp(e.target.value)}
                className="w-full bg-gray-50 border border-gray-300 rounded-xl p-4 text-xs sm:text-sm font-nepali leading-relaxed focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-800 mb-1">
                Full Content (English Translation)
              </label>
              <textarea
                rows={5}
                value={contentEn}
                onChange={(e) => setContentEn(e.target.value)}
                className="w-full bg-gray-50 border border-gray-300 rounded-xl p-4 text-xs sm:text-sm leading-relaxed focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
          </div>

          {/* Authors */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">लेखक (नेपाली)</label>
              <input
                type="text"
                value={authorNameNp}
                onChange={(e) => setAuthorNameNp(e.target.value)}
                className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Author (English)</label>
              <input
                type="text"
                value={authorNameEn}
                onChange={(e) => setAuthorNameEn(e.target.value)}
                className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-xs"
              />
            </div>
          </div>

          {/* Toggles */}
          <div className="pt-4 border-t border-gray-100 flex flex-wrap items-center gap-6">
            <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-gray-800">
              <input
                type="checkbox"
                checked={isBreaking}
                onChange={(e) => setIsBreaking(e.target.checked)}
                className="w-4 h-4 text-red-600 rounded"
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
                className="w-4 h-4 text-yellow-600 rounded"
              />
              <span className="flex items-center gap-1 text-yellow-700">
                <Award className="w-3.5 h-3.5" />
                प्रमुख समाचार (Hero Lead)
              </span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-gray-800">
              <input
                type="checkbox"
                checked={isTrending}
                onChange={(e) => setIsTrending(e.target.checked)}
                className="w-4 h-4 text-orange-600 rounded"
              />
              <span className="flex items-center gap-1 text-orange-600">
                <Flame className="w-3.5 h-3.5" />
                ट्रेन्डिङ (Trending)
              </span>
            </label>
          </div>

          {/* Action Buttons */}
          <div className="pt-6 border-t border-gray-100 flex items-center justify-end gap-3">
            <Link
              href="/admin/news"
              className="px-5 py-2.5 rounded-xl border border-gray-300 text-gray-700 text-xs font-semibold hover:bg-gray-100 transition"
            >
              रद्द गर्नुहोस्
            </Link>
            <button
              type="submit"
              className="bg-red-600 hover:bg-red-700 text-white font-bold text-xs sm:text-sm px-7 py-2.5 rounded-xl shadow-xs transition flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>परिमार्जन सुरक्षित गर्नुहोस् (Save Changes)</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
