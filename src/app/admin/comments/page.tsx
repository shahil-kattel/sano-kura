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
import { useNews } from "@/context/NewsContext";

export default function AdminCommentsPage() {
  const { comments, approveComment, deleteComment } = useNews();
  const [filter, setFilter] = useState<"all" | "approved" | "pending">("all");

  const filtered = comments.filter((c) => {
    if (filter === "all") return true;
    return c.status === filter;
  });

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2.5">
            <MessageSquare className="w-6 h-6 text-purple-400" />
            <span>Reader Feedback & Moderation Desk</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Review user comments, enforce community standards, and delete abusive or spam content ({comments.length} total comments).
          </p>
        </div>

        <div className="flex items-center gap-1.5 text-xs">
          <button
            onClick={() => setFilter("all")}
            className={`px-3 py-1.5 rounded-lg font-bold transition border ${
              filter === "all"
                ? "bg-purple-600 border-purple-500 text-white shadow-md shadow-purple-900/30"
                : "bg-slate-800 border-slate-700 text-slate-300 hover:text-white"
            }`}
          >
            All ({comments.length})
          </button>
          <button
            onClick={() => setFilter("approved")}
            className={`px-3 py-1.5 rounded-lg font-bold transition border ${
              filter === "approved"
                ? "bg-purple-600 border-purple-500 text-white shadow-md shadow-purple-900/30"
                : "bg-slate-800 border-slate-700 text-slate-300 hover:text-white"
            }`}
          >
            Approved ({comments.filter((c) => c.status === "approved").length})
          </button>
        </div>
      </div>

      {/* Comments List */}
      <div className="space-y-3.5">
        {filtered.map((comm) => (
          <div
            key={comm.id}
            className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs group hover:border-slate-700 transition"
          >
            <div className="space-y-2 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-bold text-white text-sm flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-purple-400" />
                  {comm.userName}
                </span>
                <span className="text-[11px] text-slate-500">• {comm.date}</span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full font-bold uppercase tracking-wide">
                  {comm.status}
                </span>
              </div>

              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
                "{comm.text}"
              </p>

              <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
                <span className="text-slate-500">Story:</span>
                <Link
                  href={`/news/${comm.articleSlug}`}
                  target="_blank"
                  className="text-red-400 font-semibold hover:text-red-300 transition flex items-center gap-1"
                >
                  <span className="truncate max-w-sm">{comm.articleTitle}</span>
                  <ExternalLink className="w-3 h-3 shrink-0" />
                </Link>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-800 w-full sm:w-auto justify-end">
              <button
                onClick={() => {
                  if (confirm("Delete this comment permanently?")) {
                    deleteComment(comm.id);
                  }
                }}
                className="p-2 rounded-lg bg-slate-800 hover:bg-rose-950 text-slate-400 hover:text-rose-400 border border-slate-700 transition"
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
