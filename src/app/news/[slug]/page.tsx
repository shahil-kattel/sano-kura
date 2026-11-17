"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  Home,
  ChevronRight,
  Clock,
  Eye,
  Bookmark,
  Share2,
  Volume2,
  VolumeX,
  Type,
  Copy,
  Check,
  Send,
  User,
  MessageSquare,
  Globe,
  Sparkles,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import {
  getArticleBySlug,
  getRelatedArticles,
  getTrendingArticles,
  NEWS_ARTICLES,
} from "@/data/newsData";
import { NewsCard } from "@/components/NewsCard";

export default function ArticlePage() {
  const params = useParams();
  const slug = params?.slug as string;
  const { language, setLanguage, toggleLanguage, t, toNepaliNum } = useLanguage();

  const article = getArticleBySlug(slug) || NEWS_ARTICLES[0];
  const relatedArticles = getRelatedArticles(article.slug, article.category, 3);
  const trendingArticles = getTrendingArticles();

  // Reader state
  const [fontSize, setFontSize] = useState<"normal" | "large" | "xlarge">("normal");
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  // Comments state
  const [comments, setComments] = useState<
    Array<{ name: string; text: string; date: string }>
  >([
    {
      name: "गोपाल शर्मा (Gopal Sharma)",
      text: "नेपालको ऊर्जा र आर्थिक विकासका लागि यो सम्झौता साँच्चिकै ऐतिहासिक छ। कार्यान्वयन समयमै होस्!",
      date: "१ घण्टा अघि",
    },
    {
      name: "अनिता दाहाल (Anita Dahal)",
      text: "सानो कुराको सन्तुलित र निष्पक्ष समाचार प्रस्तुति धेरै राम्रो लाग्यो। बधाई छ टिमलाई।",
      date: "२ घण्टा अघि",
    },
  ]);
  const [commentName, setCommentName] = useState("");
  const [commentText, setCommentText] = useState("");

  // Check bookmark status
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("sano_kura_bookmarks") || "[]");
      if (Array.isArray(saved)) {
        setIsBookmarked(saved.some((item: any) => item.slug === article.slug));
      }
    } catch {
      setIsBookmarked(false);
    }
  }, [article.slug]);

  const toggleBookmark = () => {
    try {
      const saved = JSON.parse(localStorage.getItem("sano_kura_bookmarks") || "[]");
      let updated;
      if (isBookmarked) {
        updated = saved.filter((item: any) => item.slug !== article.slug);
        setIsBookmarked(false);
      } else {
        updated = [
          ...saved,
          { slug: article.slug, title: article.title, date: article.date },
        ];
        setIsBookmarked(true);
      }
      localStorage.setItem("sano_kura_bookmarks", JSON.stringify(updated));
      window.dispatchEvent(new Event("storage"));
    } catch (err) {
      console.error(err);
    }
  };

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const toggleAudio = () => {
    setIsPlayingAudio(!isPlayingAudio);
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (commentName.trim() && commentText.trim()) {
      setComments([
        {
          name: commentName.trim(),
          text: commentText.trim(),
          date: language === "np" ? "भर्खरै" : "Just now",
        },
        ...comments,
      ]);
      setCommentName("");
      setCommentText("");
    }
  };

  const fontSizeClass =
    fontSize === "xlarge"
      ? "text-xl sm:text-2xl leading-relaxed sm:leading-loose"
      : fontSize === "large"
      ? "text-lg sm:text-xl leading-relaxed"
      : "text-base sm:text-lg leading-relaxed";

  return (
    <div className="space-y-8">
      {/* 1. BREADCRUMBS */}
      <nav className="flex items-center text-xs text-gray-500 gap-1.5 py-1">
        <Link href="/" className="hover:text-red-600 flex items-center gap-1 transition">
          <Home className="w-3.5 h-3.5" />
          <span>{t("home")}</span>
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
        <Link
          href={`/category/${article.category}`}
          className="hover:text-red-600 font-medium transition"
        >
          {article.categoryName[language]}
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
        <span className="truncate max-w-xs text-gray-800 font-semibold">
          {article.title[language]}
        </span>
      </nav>

      {/* 2. MAIN ARTICLE & SIDEBAR LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Article Body (2 Cols) */}
        <article className="lg:col-span-2 bg-white rounded-2xl border border-gray-200 p-5 sm:p-8 shadow-xs">
          {/* Category Badge & Breaking Notice */}
          <div className="flex items-center justify-between gap-3 mb-4">
            <Link
              href={`/category/${article.category}`}
              className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-3 py-1 rounded shadow-xs uppercase tracking-wide transition"
            >
              {article.categoryName[language]}
            </Link>

            {/* Language Switcher pill right in article */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 bg-gray-100 hover:bg-red-50 hover:text-red-600 text-gray-700 px-3 py-1 rounded-full text-xs font-semibold border border-gray-200 transition"
              title="Toggle language"
            >
              <Globe className="w-3.5 h-3.5 text-red-600" />
              <span>
                {language === "np"
                  ? "Read in English (अनुवाद)"
                  : "नेपालीमा पढ्नुहोस् (Nepali)"}
              </span>
            </button>
          </div>

          {/* Headline */}
          <h1 className="text-2xl sm:text-4xl font-black text-gray-900 leading-snug sm:leading-tight mb-4 tracking-tight">
            {article.title[language]}
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-gray-600 font-medium mb-6 leading-relaxed border-l-4 border-red-500 pl-4 bg-gray-50/60 py-2 rounded-r-lg">
            {article.subtitle[language]}
          </p>

          {/* Author, Date & Reading Meta Strip */}
          <div className="flex flex-wrap items-center justify-between gap-4 py-3 border-y border-gray-100 mb-6 text-xs text-gray-500">
            {/* Author info */}
            <div className="flex items-center gap-3">
              <img
                src={article.author.avatar}
                alt={article.author.name[language]}
                className="w-10 h-10 rounded-full object-cover border border-gray-200"
              />
              <div>
                <p className="font-bold text-gray-900 text-sm">
                  {article.author.name[language]}
                </p>
                <p className="text-gray-500">{article.author.role[language]}</p>
              </div>
            </div>

            {/* Date & Views */}
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-red-500" />
                <span>{article.dateNep}</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Eye className="w-3.5 h-3.5" />
                <span>
                  {toNepaliNum(article.views)}{" "}
                  {language === "np" ? "पटक पढिएको" : "views"}
                </span>
              </span>
            </div>
          </div>

          {/* Reading Toolbar (Font Size, Audio reader, Bookmark, Share) */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-gray-50 p-3 rounded-xl border border-gray-200 mb-6">
            {/* Font size toggles */}
            <div className="flex items-center gap-1.5 text-xs text-gray-600 font-medium">
              <Type className="w-4 h-4 text-gray-500" />
              <span>{t("fontSize")}:</span>
              <button
                onClick={() => setFontSize("normal")}
                className={`px-2 py-0.5 rounded ${
                  fontSize === "normal"
                    ? "bg-red-600 text-white font-bold"
                    : "bg-white text-gray-700 hover:bg-gray-200"
                }`}
              >
                A
              </button>
              <button
                onClick={() => setFontSize("large")}
                className={`px-2 py-0.5 rounded text-sm ${
                  fontSize === "large"
                    ? "bg-red-600 text-white font-bold"
                    : "bg-white text-gray-700 hover:bg-gray-200"
                }`}
              >
                A+
              </button>
              <button
                onClick={() => setFontSize("xlarge")}
                className={`px-2 py-0.5 rounded text-base ${
                  fontSize === "xlarge"
                    ? "bg-red-600 text-white font-bold"
                    : "bg-white text-gray-700 hover:bg-gray-200"
                }`}
              >
                A++
              </button>
            </div>

            {/* Audio Reader & Social sharing */}
            <div className="flex items-center gap-2">
              {/* Audio Listen Simulation */}
              <button
                onClick={toggleAudio}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition ${
                  isPlayingAudio
                    ? "bg-red-600 text-white animate-pulse"
                    : "bg-white text-gray-700 hover:bg-red-50 border border-gray-200"
                }`}
              >
                {isPlayingAudio ? (
                  <>
                    <VolumeX className="w-3.5 h-3.5" />
                    <span>{t("paused")}</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-3.5 h-3.5 text-red-600" />
                    <span>{t("listenNews")}</span>
                  </>
                )}
              </button>

              {/* Bookmark */}
              <button
                onClick={toggleBookmark}
                className={`p-2 rounded-lg transition border border-gray-200 ${
                  isBookmarked
                    ? "bg-yellow-50 text-yellow-600 border-yellow-300"
                    : "bg-white text-gray-600 hover:text-red-600"
                }`}
                title={isBookmarked ? t("saved") : t("saveArticle")}
              >
                <Bookmark
                  className={`w-4 h-4 ${isBookmarked ? "fill-yellow-500" : ""}`}
                />
              </button>

              {/* Copy Link */}
              <button
                onClick={handleCopyLink}
                className="p-2 rounded-lg bg-white border border-gray-200 text-gray-600 hover:text-red-600 transition"
                title={t("copyLink")}
              >
                {copiedLink ? (
                  <Check className="w-4 h-4 text-green-600" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* Featured Image */}
          <div className="rounded-xl overflow-hidden mb-6 bg-gray-100 shadow-xs">
            <img
              src={article.image}
              alt={article.title[language]}
              className="w-full h-auto max-h-[460px] object-cover"
            />
            <div className="bg-gray-100 px-4 py-2 text-xs text-gray-600 italic border-t border-gray-200">
              {article.imageCaption[language]}
            </div>
          </div>

          {/* Full Rich Article Paragraphs */}
          <div className={`space-y-5 text-gray-800 ${fontSizeClass}`}>
            {article.content[language].map((paragraph, idx) => (
              <p key={idx} className="leading-relaxed">
                {paragraph}
              </p>
            ))}

            {/* Key quote highlight callout */}
            <div className="my-6 p-5 rounded-xl bg-red-50 border-l-4 border-red-600 text-red-950 font-semibold italic text-base sm:text-lg">
              "{article.excerpt[language]}"
            </div>
          </div>

          {/* Tags Cloud */}
          <div className="mt-8 pt-6 border-t border-gray-100">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">
                Tags:
              </span>
              {article.tags[language].map((tag, idx) => (
                <Link
                  key={idx}
                  href={`/search?q=${encodeURIComponent(tag)}`}
                  className="bg-gray-100 hover:bg-red-50 hover:text-red-600 text-gray-700 text-xs px-3 py-1 rounded-full transition"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          </div>

          {/* Author Box */}
          <div className="mt-8 p-5 rounded-xl bg-gray-50 border border-gray-200 flex items-center gap-4">
            <img
              src={article.author.avatar}
              alt={article.author.name[language]}
              className="w-14 h-14 rounded-full object-cover border-2 border-red-300"
            />
            <div>
              <h4 className="font-bold text-gray-900 text-base">
                {article.author.name[language]}
              </h4>
              <p className="text-xs text-red-600 font-semibold mb-1">
                {article.author.role[language]}
              </p>
              <p className="text-xs text-gray-500">
                {language === "np"
                  ? "सानो कुरा मिडियाका आधिकारिक लेखक तथा विश्लेषक।"
                  : "Accredited journalist and contributing analyst at Sano Kura Media."}
              </p>
            </div>
          </div>

          {/* 3. COMMENTS SECTION */}
          <div className="mt-10 pt-8 border-t border-gray-200">
            <h3 className="text-xl font-black text-gray-900 flex items-center gap-2 mb-6">
              <MessageSquare className="w-5 h-5 text-red-600" />
              <span>
                {t("comments")} ({toNepaliNum(comments.length)})
              </span>
            </h3>

            {/* Comment Submission Form */}
            <form
              onSubmit={handleAddComment}
              className="bg-gray-50 p-4 sm:p-6 rounded-xl border border-gray-200 mb-8 space-y-4"
            >
              <h4 className="font-bold text-sm text-gray-800">{t("leaveComment")}</h4>
              <div>
                <input
                  type="text"
                  required
                  placeholder={t("yourName")}
                  value={commentName}
                  onChange={(e) => setCommentName(e.target.value)}
                  className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div>
                <textarea
                  required
                  rows={3}
                  placeholder={t("yourComment")}
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <button
                type="submit"
                className="bg-red-600 hover:bg-red-700 text-white font-semibold text-xs sm:text-sm px-5 py-2.5 rounded-lg transition flex items-center gap-2"
              >
                <span>{t("submitComment")}</span>
                <Send className="w-4 h-4" />
              </button>
            </form>

            {/* Comment List */}
            <div className="space-y-4">
              {comments.map((c, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-white border border-gray-100 shadow-2xs"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-bold text-sm text-gray-900 flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-red-500" />
                      {c.name}
                    </span>
                    <span className="text-xs text-gray-400">{c.date}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                    {c.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </article>

        {/* Sidebar (1 Col): Most Read & Related */}
        <aside className="space-y-6">
          {/* Trending / Most Read */}
          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-xs">
            <div className="flex items-center justify-between pb-3 mb-3 border-b-2 border-red-600">
              <h3 className="text-base font-extrabold text-gray-900 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-red-600" />
                <span>{t("mostRead")}</span>
              </h3>
            </div>
            <div className="divide-y divide-gray-100">
              {trendingArticles.map((art, idx) => (
                <NewsCard
                  key={art.id}
                  article={art}
                  variant="trending"
                  rankingNumber={idx + 1}
                />
              ))}
            </div>
          </div>

          {/* Related News */}
          {relatedArticles.length > 0 && (
            <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-xs">
              <h3 className="text-base font-extrabold text-gray-900 pb-3 mb-3 border-b-2 border-red-600">
                {t("relatedNews")}
              </h3>
              <div className="space-y-3">
                {relatedArticles.map((rel) => (
                  <NewsCard key={rel.id} article={rel} variant="compact" />
                ))}
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
