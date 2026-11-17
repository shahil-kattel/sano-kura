"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  MessageSquare,
  CheckCircle,
  Trash2,
  ExternalLink,
  ShieldAlert,
  User,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useNews } from "@/context/NewsContext";

export default function AdminCommentsPage() {
  const { language, toNepaliNum } = useLanguage();
  const { comments, approveComment, deleteComment } = useNews();
  const [filter, setFilter] = useState<"all" | "approved" | "pending">("all");

  const filtered = comments.filter((c) => {
    if (filter === "all") return true;
    return c.status === filter;
  });

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight flex items-center gap-2">
            <MessageSquare className="w-6 h-6 text-purple-600" />
            <span>
              {language === "np" ? "पाठक प्रतिक्रिया तथा टिप्पणी प्रमाणीकरण" : "Comments Moderation Desk"}
            </span>
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            {language === "np"
              ? `कुल ${toNepaliNum(comments.length)} प्रतिक्रियाहरू दर्ता छन्।`
              : `Total ${comments.length} comments across published articles.`}
          </p>
        </div>

        <div className="flex items-center gap-1.5 text-xs">
          <button
            onClick={() => setFilter("all")}
            className={`px-3 py-1.5 rounded-lg font-bold transition ${
              filter === "all" ? "bg-purple-600 text-white" : "bg-gray-100 text-gray-700"
            }`}
          >
            सबै ({toNepaliNum(comments.length)})
          </button>
          <button
            onClick={() => setFilter("approved")}
            className={`px-3 py-1.5 rounded-lg font-bold transition ${
              filter === "approved" ? "bg-purple-600 text-white" : "bg-gray-100 text-gray-700"
            }`}
          >
            स्वीकृत ({toNepaliNum(comments.filter((c) => c.status === "approved").length)})
          </button>
        </div>
      </div>

      {/* Comments List */}
      <div className="space-y-4">
        {filtered.map((comm) => (
          <div
            key={comm.id}
            className="bg-white rounded-2xl border border-gray-200 p-5 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs"
          >
            <div className="space-y-1.5 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-bold text-gray-900 text-sm flex items-center gap-1">
                  <User className="w-3.5 h-3.5 text-purple-600" />
                  {comm.userName}
                </span>
                <span className="text-[11px] text-gray-400">• {comm.date}</span>
                <span className="text-[10px] bg-green-100 text-green-800 px-2 py-0.5 rounded-full font-bold">
                  {comm.status}
                </span>
              </div>

              <p className="text-gray-700 text-xs sm:text-sm leading-relaxed bg-gray-50 p-3 rounded-xl border border-gray-100">
                "{comm.text}"
              </p>

              <div className="text-[11px] text-gray-400 flex items-center gap-1">
                <span>समाचार:</span>
                <Link
                  href={`/news/${comm.articleSlug}`}
                  target="_blank"
                  className="text-red-600 font-semibold hover:underline flex items-center gap-0.5"
                >
                  <span>{comm.articleTitle}</span>
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-gray-100 w-full sm:w-auto justify-end">
              <button
                onClick={() => {
                  if (confirm("Delete comment?")) {
                    deleteComment(comm.id);
                  }
                }}
                className="p-2 rounded-lg bg-gray-100 text-gray-500 hover:bg-red-50 hover:text-red-600 transition"
                title="Delete Comment"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
