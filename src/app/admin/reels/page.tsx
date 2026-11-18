"use client";

import React, { useState } from "react";
import {
  Video,
  PlusCircle,
  Play,
  Trash2,
  Edit2,
  ArrowUp,
  ArrowDown,
  CheckCircle2,
  X,
  ExternalLink,
} from "lucide-react";
import { Reel } from "@/types/sanokuraa";
import { useSanokuraa } from "@/context/SanokuraaContext";
import ImageUpload from "@/components/admin/ImageUpload";

export default function AdminReelsPage() {
  const { reels, addReel, editReel, deleteReel, updateReels } = useSanokuraa();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingReelId, setEditingReelId] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  // Form State
  const [titleEn, setTitleEn] = useState("");
  const [titleNp, setTitleNp] = useState("");
  const [captionEn, setCaptionEn] = useState("");
  const [captionNp, setCaptionNp] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [duration, setDuration] = useState("0:45");
  const [order, setOrder] = useState(reels.length + 1);

  const openNewModal = () => {
    setEditingReelId(null);
    setTitleEn("");
    setTitleNp("");
    setCaptionEn("");
    setCaptionNp("");
    setThumbnail(
      "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=600&q=80"
    );
    setVideoUrl(
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
    );
    setDuration("0:45");
    setOrder(reels.length + 1);
    setIsModalOpen(true);
  };

  const openEditModal = (reel: Reel) => {
    setEditingReelId(reel.id);
    setTitleEn(reel.title.en);
    setTitleNp(reel.title.np);
    setCaptionEn(reel.caption.en);
    setCaptionNp(reel.caption.np);
    setThumbnail(reel.thumbnail);
    setVideoUrl(reel.videoUrl);
    setDuration(reel.duration || "0:45");
    setOrder(reel.order);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!titleEn.trim() || !thumbnail.trim() || !videoUrl.trim()) return;

    const payload: Reel = {
      id: editingReelId || `reel-${Date.now()}`,
      title: {
        en: titleEn.trim(),
        np: titleNp.trim() || titleEn.trim(),
      },
      caption: {
        en: captionEn.trim(),
        np: captionNp.trim() || captionEn.trim(),
      },
      thumbnail: thumbnail.trim(),
      videoUrl: videoUrl.trim(),
      aspectRatio: "9/16",
      duration,
      order: Number(order) || 1,
      views: 320,
    };

    if (editingReelId) {
      editReel(editingReelId, payload);
      setNotice("Reel updated successfully!");
    } else {
      addReel(payload);
      setNotice("New 9:16 vertical video reel added!");
    }

    setIsModalOpen(false);
    setTimeout(() => setNotice(null), 3000);
  };

  const handleDelete = (id: string) => {
    if (confirm("Delete this video reel?")) {
      deleteReel(id);
      setNotice("Reel deleted.");
      setTimeout(() => setNotice(null), 2500);
    }
  };

  const moveOrder = (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= reels.length) return;

    const updated = [...reels];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;

    // re-index order
    const reindexed = updated.map((r, i) => ({ ...r, order: i + 1 }));
    updateReels(reindexed);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Video className="w-5 h-5 text-purple-400" />
            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Field Reels & Vertical Video Manager
            </h1>
          </div>
          <p className="text-xs text-slate-400">
            Publish 9:16 mobile-first field videos, documentary cuts, and soundscapes. Click any card on the live site to open the fullscreen Reel Modal player.
          </p>
        </div>

        <button
          onClick={openNewModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-mono font-bold transition cursor-pointer shadow-md shadow-purple-900/30"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Add New Reel</span>
        </button>
      </div>

      {notice && (
        <div className="p-3 bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-medium rounded-xl flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{notice}</span>
        </div>
      )}

      {/* Reels Grid Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
        {reels.map((reel, index) => (
          <div
            key={reel.id}
            className="bg-slate-900 rounded-2xl border border-slate-800 p-3 space-y-3 flex flex-col justify-between group hover:border-slate-700 transition"
          >
            <div>
              {/* 9:16 Thumbnail */}
              <div className="relative aspect-[9/16] w-full rounded-xl overflow-hidden bg-black border border-slate-800">
                <img
                  src={reel.thumbnail}
                  alt={reel.title.en}
                  className="w-full h-full object-cover group-hover:scale-103 transition"
                />
                <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/70 text-white text-[10px] font-mono border border-white/20">
                  #{reel.order} • {reel.duration}
                </div>
              </div>

              {/* Title & Caption */}
              <div className="pt-3 space-y-1">
                <h4 className="text-xs font-bold text-white line-clamp-1">
                  {reel.title.en}
                </h4>
                <p className="text-[11px] text-slate-400 line-clamp-2">
                  {reel.caption.en}
                </p>
              </div>
            </div>

            {/* Bottom Actions & Order Stepper */}
            <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-1">
                <button
                  disabled={index === 0}
                  onClick={() => moveOrder(index, "up")}
                  className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 disabled:opacity-30 cursor-pointer"
                  title="Move earlier"
                >
                  <ArrowUp className="w-3 h-3" />
                </button>
                <button
                  disabled={index === reels.length - 1}
                  onClick={() => moveOrder(index, "down")}
                  className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 disabled:opacity-30 cursor-pointer"
                  title="Move later"
                >
                  <ArrowDown className="w-3 h-3" />
                </button>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => openEditModal(reel)}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
                  title="Edit Reel"
                >
                  <Edit2 className="w-3 h-3" />
                </button>
                <button
                  onClick={() => handleDelete(reel.id)}
                  className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition"
                  title="Delete Reel"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Reel Modal Editor */}
      {isModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="w-full max-w-xl bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-5 shadow-2xl max-h-[92vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <h3 className="font-bold text-white text-base">
                {editingReelId ? "Edit 9:16 Reel" : "Add New 9:16 Video Reel"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-300 mb-1">
                  Title (English) *
                </label>
                <input
                  type="text"
                  required
                  value={titleEn}
                  onChange={(e) => setTitleEn(e.target.value)}
                  placeholder="e.g. Inside Patan's Secret 800-Year Courtyard..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-white"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">
                  शीर्षक (नेपालीमा)
                </label>
                <input
                  type="text"
                  value={titleNp}
                  onChange={(e) => setTitleNp(e.target.value)}
                  placeholder="नेपाली शीर्षक..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-white font-nepali"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">
                  Caption / Narrative Context (English)
                </label>
                <textarea
                  rows={2}
                  value={captionEn}
                  onChange={(e) => setCaptionEn(e.target.value)}
                  placeholder="Brief 1-2 sentence context for the vertical viewer..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">
                  क्याप्सन (नेपालीमा)
                </label>
                <textarea
                  rows={2}
                  value={captionNp}
                  onChange={(e) => setCaptionNp(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white font-nepali"
                />
              </div>

              {/* 9:16 Thumbnail Image Upload from Computer */}
              <div className="pt-2 border-t border-slate-800">
                <ImageUpload
                  value={thumbnail}
                  onChange={setThumbnail}
                  label="9:16 Vertical Poster / Thumbnail (From Computer) *"
                  helperText="Upload vertical 9:16 thumbnail image from your computer"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-300 mb-1">
                    Video Stream URL (MP4 / WebM / Embed) *
                  </label>
                  <input
                    type="url"
                    required
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                    placeholder="https://.../video.mp4"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-300 mb-1">
                    Duration (e.g. 0:45)
                  </label>
                  <input
                    type="text"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    placeholder="0:45"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-white font-mono"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-slate-800 rounded-xl text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-mono font-bold rounded-xl transition"
                >
                  {editingReelId ? "Save Reel" : "Publish Reel"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
