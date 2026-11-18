"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Feather,
  PlusCircle,
  Star,
  Trash2,
  Edit2,
  ExternalLink,
  CheckCircle2,
  X,
  User,
  Clock,
} from "lucide-react";
import { Article, AuthorProfile } from "@/types/sanokuraa";
import { useSanokuraa } from "@/context/SanokuraaContext";
import ImageUpload from "@/components/admin/ImageUpload";

const PRESET_AUTHORS: AuthorProfile[] = [
  {
    name: { en: "Prof. Dr. Sharada Adhikari", np: "प्रा. डा. शारदा अधिकारी" },
    avatar:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80",
    designation: {
      en: "Senior Constitutional & Public Policy Scholar",
      np: "वरिष्ठ संविधान तथा सार्वजनिक नीति विश्लेषक",
    },
    bio: {
      en: "Fellow at the Institute of South Asian Studies and author of 'The Fractured Republic'.",
      np: "दक्षिण एसियाली अध्ययन प्रतिष्ठानकी फेलो तथा 'द फ्र्याक्चर्ड रिपब्लिक' की लेखक।",
    },
  },
  {
    name: { en: "Rabin Shakya", np: "रविन शाक्य" },
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    designation: {
      en: "Urban Historian & Heritage Architect",
      np: "सहरी इतिहासकार तथा सम्पदा वास्तुविद्",
    },
    bio: {
      en: "Principal at Valley Design Lab; consulting architect on Bhaktapur post-quake restorations.",
      np: "भ्याली डिजाइन ल्याबका प्रमुख तथा भक्तपुर पुनर्निर्माणका सल्लाहकार वास्तुविद्।",
    },
  },
  {
    name: { en: "Dr. Anupama Rayamajhi", np: "डा. अनुपमा रायमाझी" },
    avatar:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
    designation: {
      en: "Glaciologist & Climate Diplomacy Fellow",
      np: "हिमनदी वैज्ञानिक तथा जलवायु कूटनीति अनुसन्धाता",
    },
    bio: {
      en: "Former lead contributor to ICIMOD Hindu Kush Himalayan Assessment Reports.",
      np: "इसिमोडको हिन्दुकुश हिमालय अनुसन्धान प्रतिवेदनकी प्रमुख अनुसन्धानकर्ता।",
    },
  },
  {
    name: { en: "Siddhartha Gautam Joshi", np: "सिद्धार्थ गौतम जोशी" },
    avatar:
      "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=200&q=80",
    designation: {
      en: "Cultural Critic & Independent Curator",
      np: "सांस्कृतिक समीक्षक तथा स्वतन्त्र क्युरेटर",
    },
    bio: {
      en: "Curator of the Himalayan Contemporary Visual Art Forum and essayist.",
      np: "हिमालयन कन्टेम्पोररी भिजुअल आर्ट फोरमका क्युरेटर तथा स्तम्भकार।",
    },
  },
];

export default function AdminArticlesPage() {
  const { articles, addArticle, editArticle, deleteArticle, toggleLeadArticle } = useSanokuraa();

  const [isComposerOpen, setIsComposerOpen] = useState(false);
  const [editingArticleId, setEditingArticleId] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  // Form State
  const [headlineEn, setHeadlineEn] = useState("");
  const [headlineNp, setHeadlineNp] = useState("");
  const [slug, setSlug] = useState("");
  const [deckEn, setDeckEn] = useState("");
  const [deckNp, setDeckNp] = useState("");
  const [contentEn, setContentEn] = useState("");
  const [contentNp, setContentNp] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [authorIndex, setAuthorIndex] = useState(0);
  const [customAuthorName, setCustomAuthorName] = useState("");
  const [readTime, setReadTime] = useState("6 min read");
  const [isFeaturedLead, setIsFeaturedLead] = useState(false);
  const [status, setStatus] = useState<"DRAFT" | "PUBLISHED">("PUBLISHED");

  const openNewComposer = () => {
    setEditingArticleId(null);
    setHeadlineEn("");
    setHeadlineNp("");
    setSlug(`essay-${Date.now()}`);
    setDeckEn("");
    setDeckNp("");
    setContentEn("");
    setContentNp("");
    setCoverImage("");
    setAuthorIndex(0);
    setIsFeaturedLead(false);
    setStatus("PUBLISHED");
    setIsComposerOpen(true);
  };

  const openEditComposer = (article: Article) => {
    setEditingArticleId(article.id);
    setHeadlineEn(article.headline.en);
    setHeadlineNp(article.headline.np);
    setSlug(article.slug);
    setDeckEn(article.deck.en);
    setDeckNp(article.deck.np);
    setContentEn(article.content.en.join("\n\n"));
    setContentNp(article.content.np.join("\n\n"));
    setCoverImage(article.coverImage || "");
    setIsFeaturedLead(article.isFeaturedLead);
    setStatus(article.status);
    setReadTime(article.readTime);
    setIsComposerOpen(true);
  };

  const handleSaveArticle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!headlineEn.trim() || !deckEn.trim()) return;

    const selectedAuthor = PRESET_AUTHORS[authorIndex] || PRESET_AUTHORS[0];

    const payload: Article = {
      id: editingArticleId || `art-${Date.now()}`,
      slug: slug.trim() || `essay-${Date.now()}`,
      headline: {
        en: headlineEn.trim(),
        np: headlineNp.trim() || headlineEn.trim(),
      },
      deck: {
        en: deckEn.trim(),
        np: deckNp.trim() || deckEn.trim(),
      },
      content: {
        en: contentEn.split("\n\n").filter((p) => p.trim()),
        np: contentNp.split("\n\n").filter((p) => p.trim()),
      },
      coverImage: coverImage.trim() || undefined,
      author: selectedAuthor,
      date: "Nov 17, 2026",
      dateNep: "२०८१ मंसिर २",
      readTime,
      isFeaturedLead,
      status,
      views: 240,
    };

    if (editingArticleId) {
      editArticle(editingArticleId, payload);
      setNotice("Article / Op-Ed updated successfully!");
    } else {
      addArticle(payload);
      setNotice("New essay published to Op-Ed desk!");
    }

    setIsComposerOpen(false);
    setTimeout(() => setNotice(null), 3000);
  };

  const handleDelete = (id: string) => {
    if (confirm("Delete this essay from Op-Ed desk?")) {
      deleteArticle(id);
      setNotice("Article deleted.");
      setTimeout(() => setNotice(null), 2500);
    }
  };

  const featuredLead = articles.find((a) => a.isFeaturedLead);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Feather className="w-5 h-5 text-amber-400" />
            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Articles & Op-Ed Columns
            </h1>
          </div>
          <p className="text-xs text-slate-400">
            Publish thoughtful columns and intellectual essays. One article is highlighted as the <strong>Featured Lead Op-Ed</strong>, while others appear as stacked author columns.
          </p>
        </div>

        <button
          onClick={openNewComposer}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-mono font-bold transition cursor-pointer shadow-md shadow-amber-900/30"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Write New Essay</span>
        </button>
      </div>

      {notice && (
        <div className="p-3 bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-medium rounded-xl flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{notice}</span>
        </div>
      )}

      {/* Articles Table */}
      <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-sm">
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
            Columns & Reflections ({articles.length})
          </h2>
          <span className="text-xs font-mono text-amber-400">
            Featured Lead: {featuredLead?.headline.en.slice(0, 32)}...
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 text-slate-400 uppercase font-mono text-[11px] border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Author Profile</th>
                <th className="py-3 px-4">Serif Headline & Deck</th>
                <th className="py-3 px-4 text-center">Featured Lead</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-850">
              {articles.map((article) => (
                <tr key={article.id} className="hover:bg-slate-850/50 transition">
                  <td className="py-3 px-4 w-56">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={article.author.avatar}
                        alt="Author"
                        className="w-10 h-10 rounded-full object-cover border border-slate-800 shrink-0"
                      />
                      <div>
                        <p className="font-bold text-white leading-tight">
                          {article.author.name.en}
                        </p>
                        <p className="text-[10px] text-slate-400 font-mono line-clamp-1">
                          {article.author.designation.en}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="py-3 px-4 max-w-md">
                    <h3 className="font-bold text-white text-sm line-clamp-1">
                      {article.headline.en}
                    </h3>
                    <p className="text-[11px] text-slate-400 line-clamp-1 italic mt-0.5">
                      "{article.deck.en}"
                    </p>
                    <p className="text-[10px] text-slate-500 font-mono mt-0.5">
                      /{article.slug} • {article.readTime}
                    </p>
                  </td>

                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => toggleLeadArticle(article.id)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono font-bold transition cursor-pointer ${
                        article.isFeaturedLead
                          ? "bg-amber-500/20 text-amber-400 border border-amber-500/40"
                          : "bg-slate-800 text-slate-400 hover:text-white border border-slate-700"
                      }`}
                    >
                      <Star className={`w-3 h-3 ${article.isFeaturedLead ? "fill-amber-400" : ""}`} />
                      <span>{article.isFeaturedLead ? "Lead Op-Ed" : "Make Lead"}</span>
                    </button>
                  </td>

                  <td className="py-3 px-4 text-center">
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                        article.status === "PUBLISHED"
                          ? "bg-emerald-500/20 text-emerald-400"
                          : "bg-amber-500/20 text-amber-400"
                      }`}
                    >
                      {article.status}
                    </span>
                  </td>

                  <td className="py-3 px-4 text-right space-x-2">
                    <Link
                      href={`/articles/${article.slug}`}
                      target="_blank"
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 inline-block"
                      title="View Reader View"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </Link>
                    <button
                      onClick={() => openEditComposer(article)}
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
                      title="Edit Essay"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(article.id)}
                      className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition"
                      title="Delete Essay"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Article Composer Modal */}
      {isComposerOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setIsComposerOpen(false)}
        >
          <div
            className="w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-5 shadow-2xl max-h-[92vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <h3 className="font-bold text-white text-base">
                {editingArticleId ? "Edit Essay & Column" : "Compose Long-Form Op-Ed Essay"}
              </h3>
              <button
                onClick={() => setIsComposerOpen(false)}
                className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveArticle} className="space-y-4 text-xs">
              {/* Author Profile Selector */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2.5">
                <label className="block font-bold text-slate-300 uppercase tracking-wider font-mono text-[11px]">
                  Select Columnist / Author Profile *
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {PRESET_AUTHORS.map((author, idx) => (
                    <div
                      key={idx}
                      onClick={() => setAuthorIndex(idx)}
                      className={`p-3 rounded-xl border flex items-center gap-3 cursor-pointer transition ${
                        authorIndex === idx
                          ? "bg-amber-500/10 border-amber-500/40 text-white"
                          : "bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700"
                      }`}
                    >
                      <img
                        src={author.avatar}
                        alt={author.name.en}
                        className="w-10 h-10 rounded-full object-cover border border-slate-800 shrink-0"
                      />
                      <div className="overflow-hidden">
                        <p className="font-bold text-xs truncate text-white">
                          {author.name.en}
                        </p>
                        <p className="text-[10px] text-slate-400 font-mono truncate">
                          {author.designation.en}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">
                  URL Slug *
                </label>
                <input
                  type="text"
                  required
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="the-architecture-of-public-trust"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-white font-mono"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">
                  Serif Headline (English) *
                </label>
                <input
                  type="text"
                  required
                  value={headlineEn}
                  onChange={(e) => setHeadlineEn(e.target.value)}
                  placeholder="e.g. The Architecture of Public Trust..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-white text-sm font-semibold"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">
                  स्तम्भ शीर्षक (नेपालीमा)
                </label>
                <input
                  type="text"
                  value={headlineNp}
                  onChange={(e) => setHeadlineNp(e.target.value)}
                  placeholder="नेपाली शीर्षक..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-white font-nepali text-sm"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">
                  Deck / Standfirst Excerpt (English) *
                </label>
                <textarea
                  rows={2}
                  required
                  value={deckEn}
                  onChange={(e) => setDeckEn(e.target.value)}
                  placeholder="2-line intellectual premise or thesis statement..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white italic"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">
                  उपकथन / सारांश (नेपालीमा)
                </label>
                <textarea
                  rows={2}
                  value={deckNp}
                  onChange={(e) => setDeckNp(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white font-nepali"
                />
              </div>

              {/* Cover Artwork Image Upload from Computer */}
              <div className="pt-2 border-t border-slate-800">
                <ImageUpload
                  value={coverImage}
                  onChange={setCoverImage}
                  label="Optional Header Artwork (From Computer)"
                  helperText="Upload artistic banner or contextual portrait from your computer"
                />
              </div>

              {/* Content Body */}
              <div className="pt-2 border-t border-slate-800 space-y-3">
                <div>
                  <label className="block font-bold text-slate-300 mb-1">
                    Full Essay Body (English - separate paragraphs with empty line)
                  </label>
                  <textarea
                    rows={6}
                    value={contentEn}
                    onChange={(e) => setContentEn(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white leading-relaxed font-sans"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-300 mb-1">
                    पूर्ण लेख (नेपालीमा)
                  </label>
                  <textarea
                    rows={6}
                    value={contentNp}
                    onChange={(e) => setContentNp(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white leading-relaxed font-nepali"
                  />
                </div>
              </div>

              {/* Controls */}
              <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-6">
                  <label className="flex items-center gap-2 cursor-pointer font-bold text-amber-300">
                    <input
                      type="checkbox"
                      checked={isFeaturedLead}
                      onChange={(e) => setIsFeaturedLead(e.target.checked)}
                      className="w-4 h-4 rounded bg-slate-950 border-slate-800 text-amber-600 focus:ring-0"
                    />
                    <span>Highlight as Featured Lead Op-Ed</span>
                  </label>

                  <div className="flex items-center gap-2">
                    <span className="text-slate-400">Status:</span>
                    <select
                      value={status}
                      onChange={(e) => setStatus(e.target.value as any)}
                      className="bg-slate-950 border border-slate-800 text-white rounded-lg px-3 py-1 font-mono text-xs"
                    >
                      <option value="PUBLISHED">PUBLISHED</option>
                      <option value="DRAFT">DRAFT</option>
                    </select>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setIsComposerOpen(false)}
                    className="px-4 py-2 border border-slate-800 rounded-xl text-slate-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-amber-600 hover:bg-amber-500 text-white font-mono font-bold rounded-xl transition"
                  >
                    {editingArticleId ? "Save Changes" : "Publish Column"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
