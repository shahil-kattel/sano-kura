"use client";

import React from "react";
import Link from "next/link";
import {
  Newspaper,
  Zap,
  TrendingUp,
  MessageSquare,
  PlusCircle,
  Eye,
  Clock,
  ArrowRight,
  Flame,
  Award,
  CheckCircle,
  Trash2,
  Edit,
  ExternalLink,
  ShieldAlert,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useNews } from "@/context/NewsContext";

export default function AdminDashboardPage() {
  const { language, toNepaliNum } = useLanguage();
  const {
    articles,
    markets,
    comments,
    deleteArticle,
    toggleBreaking,
    approveComment,
    deleteComment,
  } = useNews();

  const breakingArticles = articles.filter((a) => a.isBreaking);
  const pendingComments = comments.filter((c) => c.status === "pending" || c.status === "approved");
  const totalViews = articles.reduce((sum, a) => sum + (a.views || 0), 0);

  return (
    <div className="space-y-8">
      {/* 1. TOP HEADER & GREETING */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-red-600 uppercase tracking-wider">
            {language === "np" ? "समाचार कक्ष नियन्त्रण केन्द्र" : "Newsroom Control Desk"}
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight mt-1">
            {language === "np"
              ? "नमस्ते, सम्पादक ज्यू! (Newsroom Dashboard)"
              : "Welcome, Editor-in-Chief! (Dashboard)"}
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            {language === "np"
              ? "सानो कुरा अनलाइन पोर्टलका सम्पूर्ण समाचार, ब्रेकिङ अलर्ट र बजार दर व्यवस्थापन गर्नुहोस्।"
              : "Manage news publishing, breaking alerts, market widgets, and reader feedback."}
          </p>
        </div>

        <Link
          href="/admin/news/new"
          className="bg-red-600 hover:bg-red-700 text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-xs transition flex items-center gap-2 shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          <span>{language === "np" ? "+ नयाँ समाचार थप्नुहोस्" : "+ Write Article"}</span>
        </Link>
      </div>

      {/* 2. STATS 4-GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Stat 1: Total Articles */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
              {language === "np" ? "कुल समाचार" : "Total Articles"}
            </span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <Newspaper className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-gray-900 mt-2">
            {toNepaliNum(articles.length)}
          </p>
          <div className="flex items-center gap-1.5 text-[11px] text-gray-500 mt-1">
            <Eye className="w-3 h-3 text-gray-400" />
            <span>
              {toNepaliNum(totalViews)} {language === "np" ? "कुल पाठक भ्युज" : "total views"}
            </span>
          </div>
        </div>

        {/* Stat 2: Active Breaking */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
              {language === "np" ? "सक्रिय ब्रेकिङ" : "Active Breaking"}
            </span>
            <div className="w-8 h-8 rounded-lg bg-red-50 text-red-600 flex items-center justify-center">
              <Zap className="w-4 h-4 text-red-600" />
            </div>
          </div>
          <p className="text-2xl font-black text-red-600 mt-2">
            {toNepaliNum(breakingArticles.length)}
          </p>
          <p className="text-[11px] text-gray-500 mt-1">
            {language === "np" ? "शीर्ष रातो टिकरमा जारी" : "Live in top red ticker"}
          </p>
        </div>

        {/* Stat 3: NEPSE Index */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
              {language === "np" ? "नेप्से परिसूचक" : "NEPSE Index"}
            </span>
            <div className="w-8 h-8 rounded-lg bg-green-50 text-green-600 flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-green-600" />
            </div>
          </div>
          <p className="text-2xl font-black text-green-700 mt-2">
            {markets.nepse.index}
          </p>
          <p className="text-[11px] text-green-600 font-semibold mt-1">
            {markets.nepse.change} ({markets.nepse.percent})
          </p>
        </div>

        {/* Stat 4: Comments */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
              {language === "np" ? "पाठक प्रतिक्रिया" : "Total Comments"}
            </span>
            <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
              <MessageSquare className="w-4 h-4 text-purple-600" />
            </div>
          </div>
          <p className="text-2xl font-black text-gray-900 mt-2">
            {toNepaliNum(comments.length)}
          </p>
          <p className="text-[11px] text-gray-500 mt-1">
            {language === "np" ? "अनुमोदित र पेन्डिङ" : "Approved & Active"}
          </p>
        </div>
      </div>

      {/* 3. QUICK ACTIONS BAR */}
      <div className="bg-gradient-to-r from-red-600 to-red-800 text-white rounded-2xl p-6 shadow-xs">
        <h3 className="font-bold text-sm uppercase tracking-wider text-red-200 mb-3">
          {language === "np" ? "द्रुत कार्यहरू (Quick Actions)" : "Quick Actions"}
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <Link
            href="/admin/news/new"
            className="bg-white/10 hover:bg-white/20 p-3 rounded-xl backdrop-blur-xs font-semibold text-xs flex items-center gap-2 transition"
          >
            <PlusCircle className="w-4 h-4 text-yellow-300" />
            <span>{language === "np" ? "नयाँ समाचार" : "New Article"}</span>
          </Link>

          <Link
            href="/admin/breaking"
            className="bg-white/10 hover:bg-white/20 p-3 rounded-xl backdrop-blur-xs font-semibold text-xs flex items-center gap-2 transition"
          >
            <Zap className="w-4 h-4 text-yellow-300" />
            <span>{language === "np" ? "ब्रेकिङ व्यवस्थापन" : "Breaking News"}</span>
          </Link>

          <Link
            href="/admin/markets"
            className="bg-white/10 hover:bg-white/20 p-3 rounded-xl backdrop-blur-xs font-semibold text-xs flex items-center gap-2 transition"
          >
            <TrendingUp className="w-4 h-4 text-yellow-300" />
            <span>{language === "np" ? "बजार दर अपडेट" : "Market Rates"}</span>
          </Link>

          <Link
            href="/admin/gallery"
            className="bg-white/10 hover:bg-white/20 p-3 rounded-xl backdrop-blur-xs font-semibold text-xs flex items-center gap-2 transition"
          >
            <PlusCircle className="w-4 h-4 text-yellow-300" />
            <span>{language === "np" ? "फोटो / भिडियो" : "Upload Media"}</span>
          </Link>
        </div>
      </div>

      {/* 4. RECENT ARTICLES TABLE */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-xs overflow-hidden">
        <div className="p-5 sm:p-6 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h2 className="text-base font-extrabold text-gray-900">
              {language === "np" ? "हालै प्रकाशित समाचारहरू" : "Recently Published Stories"}
            </h2>
            <p className="text-xs text-gray-500">
              {language === "np"
                ? "पोर्टलमा प्रकाशित पछिल्ला समाचारहरूको सूची र स्थिति"
                : "List of recently published articles across all desks"}
            </p>
          </div>

          <Link
            href="/admin/news"
            className="text-xs font-bold text-red-600 hover:text-red-700 flex items-center gap-1"
          >
            <span>{language === "np" ? "सबै हेर्नुहोस्" : "View All"}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 text-gray-500 uppercase tracking-wider font-bold border-b border-gray-100">
              <tr>
                <th className="py-3 px-4">समाचार शीर्षक (Headline)</th>
                <th className="py-3 px-4">विधा (Category)</th>
                <th className="py-3 px-4">लेखक (Author)</th>
                <th className="py-3 px-4">भ्युज (Views)</th>
                <th className="py-3 px-4">स्थिति (Status)</th>
                <th className="py-3 px-4 text-right">कार्यहरू (Actions)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-700 font-medium">
              {articles.slice(0, 6).map((art) => (
                <tr key={art.id} className="hover:bg-gray-50/80 transition">
                  <td className="py-3 px-4 max-w-sm">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-10 rounded overflow-hidden shrink-0 bg-gray-100">
                        <img
                          src={art.image}
                          alt={art.title[language]}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="truncate">
                        <Link
                          href={`/news/${art.slug}`}
                          target="_blank"
                          className="font-bold text-gray-900 hover:text-red-600 transition block truncate"
                        >
                          {art.title[language]}
                        </Link>
                        <span className="text-[10px] text-gray-400">{art.dateNep}</span>
                      </div>
                    </div>
                  </td>

                  <td className="py-3 px-4 whitespace-nowrap">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-gray-100 text-gray-700">
                      {art.categoryName[language]}
                    </span>
                  </td>

                  <td className="py-3 px-4 whitespace-nowrap text-gray-600">
                    {art.author.name[language]}
                  </td>

                  <td className="py-3 px-4 whitespace-nowrap font-mono text-gray-800">
                    {toNepaliNum(art.views)}
                  </td>

                  <td className="py-3 px-4 whitespace-nowrap">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {art.isBreaking && (
                        <span className="bg-red-100 text-red-700 font-bold px-1.5 py-0.5 rounded text-[10px]">
                          ब्रेकिङ
                        </span>
                      )}
                      {art.isLead && (
                        <span className="bg-yellow-100 text-yellow-800 font-bold px-1.5 py-0.5 rounded text-[10px]">
                          प्रमुख
                        </span>
                      )}
                      {!art.isBreaking && !art.isLead && (
                        <span className="bg-green-100 text-green-700 font-bold px-1.5 py-0.5 rounded text-[10px]">
                          प्रकाशित
                        </span>
                      )}
                    </div>
                  </td>

                  <td className="py-3 px-4 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-1.5">
                      {/* Toggle Breaking Button */}
                      <button
                        onClick={() => toggleBreaking(art.id)}
                        className={`p-1.5 rounded transition ${
                          art.isBreaking
                            ? "bg-red-600 text-white"
                            : "bg-gray-100 text-gray-500 hover:text-red-600"
                        }`}
                        title={art.isBreaking ? "Remove Breaking" : "Make Breaking"}
                      >
                        <Zap className="w-3.5 h-3.5" />
                      </button>

                      {/* Edit Button */}
                      <Link
                        href={`/admin/news/edit/${art.id}`}
                        className="p-1.5 rounded bg-gray-100 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition"
                        title="Edit Article"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </Link>

                      {/* View Link */}
                      <Link
                        href={`/news/${art.slug}`}
                        target="_blank"
                        className="p-1.5 rounded bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
                        title="View Live Article"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </Link>

                      {/* Delete */}
                      <button
                        onClick={() => {
                          if (confirm("Delete article? (के यो समाचार हटाउन निश्चित हुनुहुन्छ?)")) {
                            deleteArticle(art.id);
                          }
                        }}
                        className="p-1.5 rounded bg-gray-100 text-gray-500 hover:bg-red-50 hover:text-red-600 transition"
                        title="Delete Article"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 5. READER COMMENTS MODERATION CARD */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs">
        <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-4">
          <div>
            <h3 className="font-extrabold text-base text-gray-900 flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-purple-600" />
              <span>{language === "np" ? "पाठक प्रतिक्रियाहरू (Recent Comments)" : "Recent Comments"}</span>
            </h3>
            <p className="text-xs text-gray-500">
              {language === "np" ? "समाचारमा आएका ताजा टिप्पणीहरूको प्रमाणीकरण" : "Moderate reader feedback"}
            </p>
          </div>
          <Link
            href="/admin/comments"
            className="text-xs font-bold text-purple-600 hover:underline"
          >
            {language === "np" ? "सबै प्रतिक्रिया" : "View All"}
          </Link>
        </div>

        <div className="space-y-3">
          {comments.slice(0, 3).map((comm) => (
            <div
              key={comm.id}
              className="p-3 rounded-xl bg-gray-50 border border-gray-100 flex items-start justify-between gap-4 text-xs"
            >
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold text-gray-900">{comm.userName}</span>
                  <span className="text-[10px] text-gray-400">• {comm.date}</span>
                  <span className="text-[10px] bg-green-100 text-green-800 px-1.5 py-0.2 rounded font-bold">
                    {comm.status}
                  </span>
                </div>
                <p className="text-gray-700 leading-relaxed">{comm.text}</p>
                <p className="text-[10px] text-gray-400 mt-1 italic">
                  समाचार: {comm.articleTitle}
                </p>
              </div>

              <div className="flex items-center gap-1 shrink-0">
                <button
                  onClick={() => deleteComment(comm.id)}
                  className="p-1.5 rounded text-gray-400 hover:text-red-600 hover:bg-red-50 transition"
                  title="Delete Comment"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
