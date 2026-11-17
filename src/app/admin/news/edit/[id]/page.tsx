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
import { useNews } from "@/context/NewsContext";

export default function EditArticlePage() {
  const params = useParams();
  const id = params?.id as string;
  const router = useRouter();
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
      <div className="py-16 text-center bg-slate-900 border border-slate-800 rounded-2xl">
        <h2 className="text-xl font-bold text-slate-200 mb-2">Article Not Found</h2>
        <Link href="/admin/news" className="text-xs text-red-400 font-bold hover:underline">
          Return to Articles Manager
        </Link>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const paragraphsNp = contentNp
      ? contentNp.split("\n\n").map((p) => p.trim()).filter(Boolean)
      : [contentEn];
    const paragraphsEn = contentEn
      ? contentEn.split("\n\n").map((p) => p.trim()).filter(Boolean)
      : paragraphsNp;

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
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Articles</span>
        </Link>

        <div className="flex items-center gap-2">
          <Link
            href={`/news/${article.slug}`}
            target="_blank"
            className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-white bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg transition"
          >
            <span>View Live</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          {success && (
            <div className="flex items-center gap-1 text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1.5 rounded-lg">
              <CheckCircle className="w-4 h-4" />
              <span>Modifications Saved!</span>
            </div>
          )}
        </div>
      </div>

      {/* Edit Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                Edit News Article
              </h1>
              <p className="text-xs text-slate-400 mt-1">ID: {article.id} • Slug: {article.slug}</p>
            </div>

            <button
              type="button"
              onClick={() => {
                if (confirm("Delete article permanently?")) {
                  deleteArticle(article.id);
                  router.push("/admin/news");
                }
              }}
              className="text-xs text-rose-400 hover:text-rose-300 border border-rose-500/30 bg-rose-500/10 px-3 py-1.5 rounded-lg flex items-center gap-1 transition"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Delete Story</span>
            </button>
          </div>

          {/* Headlines */}
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                Headline (English) *
              </label>
              <input
                type="text"
                required
                value={titleEn}
                onChange={(e) => setTitleEn(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl px-4 py-2.5 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                Headline in Nepali (नेपाली शीर्षक) *
              </label>
              <input
                type="text"
                required
                value={titleNp}
                onChange={(e) => setTitleNp(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl px-4 py-2.5 text-sm font-nepali focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
          </div>

          {/* Subtitles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Subtitle (English)</label>
              <input
                type="text"
                value={subtitleEn}
                onChange={(e) => setSubtitleEn(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 text-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">उप-शीर्षक (नेपाली)</label>
              <input
                type="text"
                value={subtitleNp}
                onChange={(e) => setSubtitleNp(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 text-slate-200 rounded-lg px-3 py-2 text-xs font-nepali focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
          </div>

          {/* Category & Image */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Category Desk</label>
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
                Featured Image URL
              </label>
              <input
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 text-slate-200 rounded-lg px-3 py-2 text-xs font-mono"
              />
            </div>
          </div>

          {/* Content Paragraphs */}
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                Full Content (English - separate paragraphs with blank lines)
              </label>
              <textarea
                rows={6}
                value={contentEn}
                onChange={(e) => setContentEn(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 text-slate-200 rounded-xl p-4 text-xs sm:text-sm leading-relaxed focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                विस्तृत सामग्री (नेपाली)
              </label>
              <textarea
                rows={5}
                value={contentNp}
                onChange={(e) => setContentNp(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 text-slate-200 rounded-xl p-4 text-xs sm:text-sm font-nepali leading-relaxed focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
          </div>

          {/* Authors */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Author Name (English)</label>
              <input
                type="text"
                value={authorNameEn}
                onChange={(e) => setAuthorNameEn(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 text-slate-200 rounded-lg px-3 py-2 text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">लेखक (नेपाली)</label>
              <input
                type="text"
                value={authorNameNp}
                onChange={(e) => setAuthorNameNp(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 text-slate-200 rounded-lg px-3 py-2 text-xs font-nepali"
              />
            </div>
          </div>

          {/* Toggles */}
          <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center gap-6">
            <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-300">
              <input
                type="checkbox"
                checked={isBreaking}
                onChange={(e) => setIsBreaking(e.target.checked)}
                className="w-4 h-4 text-red-600 bg-slate-950 border-slate-800 rounded"
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
                className="w-4 h-4 text-amber-500 bg-slate-950 border-slate-800 rounded"
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
                className="w-4 h-4 text-orange-500 bg-slate-950 border-slate-800 rounded"
              />
              <span className="flex items-center gap-1 text-orange-400">
                <Flame className="w-3.5 h-3.5" />
                Featured in Trending
              </span>
            </label>
          </div>

          {/* Action Buttons */}
          <div className="pt-6 border-t border-slate-800 flex items-center justify-end gap-3">
            <Link
              href="/admin/news"
              className="px-5 py-2.5 rounded-xl border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 text-xs font-semibold transition"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="bg-red-600 hover:bg-red-500 text-white font-bold text-xs sm:text-sm px-7 py-2.5 rounded-xl shadow-lg shadow-red-900/30 transition flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>Save Changes</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
