"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Camera,
  PlusCircle,
  Images,
  Trash2,
  Edit2,
  ExternalLink,
  CheckCircle2,
  X,
  ArrowUp,
  ArrowDown,
  MapPin,
} from "lucide-react";
import { PhotoStory, PhotoFrame } from "@/types/sanokuraa";
import { useSanokuraa } from "@/context/SanokuraaContext";
import ImageUpload from "@/components/admin/ImageUpload";

export default function AdminPhotoStoriesPage() {
  const {
    photoStories,
    addPhotoStory,
    editPhotoStory,
    deletePhotoStory,
  } = useSanokuraa();

  const [isBuilderOpen, setIsBuilderOpen] = useState(false);
  const [editingStoryId, setEditingStoryId] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  // Builder State
  const [titleEn, setTitleEn] = useState("");
  const [titleNp, setTitleNp] = useState("");
  const [slug, setSlug] = useState("");
  const [locationEn, setLocationEn] = useState("");
  const [locationNp, setLocationNp] = useState("");
  const [introEn, setIntroEn] = useState("");
  const [introNp, setIntroNp] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [status, setStatus] = useState<"DRAFT" | "PUBLISHED">("PUBLISHED");

  // Multi-Image Sequence Builder State
  const [frames, setFrames] = useState<PhotoFrame[]>([]);

  const openNewBuilder = () => {
    setEditingStoryId(null);
    setTitleEn("");
    setTitleNp("");
    setSlug(`story-${Date.now()}`);
    setLocationEn("Kathmandu Valley");
    setLocationNp("काठमाडौँ उपत्यका");
    setIntroEn("");
    setIntroNp("");
    setCoverImage(
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1600&q=80"
    );
    setStatus("PUBLISHED");
    setFrames([
      {
        id: `f-${Date.now()}-1`,
        url: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1400&q=80",
        caption: {
          en: "First morning light cuts across the Annapurna massifs.",
          np: "अन्नपूर्ण हिमशृंखलामा बिहानीको पहिलो किरण।",
        },
        altText: "Early golden morning over snowcapped peaks",
        order: 1,
      },
      {
        id: `f-${Date.now()}-2`,
        url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1400&q=80",
        caption: {
          en: "A caravan of laden mules navigates narrow shale ridges.",
          np: "भीरको बाटोमा भारी बोकेर हिँडिरहेको खच्चडको लस्कर।",
        },
        altText: "Mule caravan on mountain cliff trail",
        order: 2,
      },
    ]);
    setIsBuilderOpen(true);
  };

  const openEditBuilder = (story: PhotoStory) => {
    setEditingStoryId(story.id);
    setTitleEn(story.title.en);
    setTitleNp(story.title.np);
    setSlug(story.slug);
    setLocationEn(story.location.en);
    setLocationNp(story.location.np);
    setIntroEn(story.intro.en);
    setIntroNp(story.intro.np);
    setCoverImage(story.coverImage);
    setStatus(story.status);
    setFrames(story.frames);
    setIsBuilderOpen(true);
  };

  const handleAddFrame = () => {
    const newFrame: PhotoFrame = {
      id: `f-${Date.now()}-${frames.length + 1}`,
      url: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=1400&q=80",
      caption: {
        en: "Add sequenced narrative caption here...",
        np: "नेपाली क्याप्सन...",
      },
      altText: "Descriptive spatial alt text",
      order: frames.length + 1,
    };
    setFrames([...frames, newFrame]);
  };

  const handleUpdateFrame = (index: number, updated: Partial<PhotoFrame>) => {
    const next = [...frames];
    next[index] = { ...next[index], ...updated };
    setFrames(next);
  };

  const handleMoveFrame = (index: number, direction: "up" | "down") => {
    const target = direction === "up" ? index - 1 : index + 1;
    if (target < 0 || target >= frames.length) return;
    const next = [...frames];
    const temp = next[index];
    next[index] = next[target];
    next[target] = temp;
    const reindexed = next.map((f, i) => ({ ...f, order: i + 1 }));
    setFrames(reindexed);
  };

  const handleDeleteFrame = (index: number) => {
    if (frames.length <= 1) {
      alert("A photo story requires at least 1 photo frame.");
      return;
    }
    const next = frames.filter((_, i) => i !== index);
    const reindexed = next.map((f, i) => ({ ...f, order: i + 1 }));
    setFrames(reindexed);
  };

  const handleSaveStory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!titleEn.trim() || !coverImage.trim()) return;

    const payload: PhotoStory = {
      id: editingStoryId || `ps-${Date.now()}`,
      slug: slug.trim() || `story-${Date.now()}`,
      title: {
        en: titleEn.trim(),
        np: titleNp.trim() || titleEn.trim(),
      },
      location: {
        en: locationEn.trim(),
        np: locationNp.trim() || locationEn.trim(),
      },
      intro: {
        en: introEn.trim(),
        np: introNp.trim() || introEn.trim(),
      },
      coverImage: coverImage.trim(),
      date: "November 2026",
      status,
      frames,
      views: 180,
    };

    if (editingStoryId) {
      editPhotoStory(editingStoryId, payload);
      setNotice("Photo story sequence updated successfully!");
    } else {
      addPhotoStory(payload);
      setNotice("New curated photo essay published!");
    }

    setIsBuilderOpen(false);
    setTimeout(() => setNotice(null), 3000);
  };

  const handleDeleteStory = (id: string) => {
    if (confirm("Delete this photo essay?")) {
      deletePhotoStory(id);
      setNotice("Photo essay deleted.");
      setTimeout(() => setNotice(null), 2500);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Camera className="w-5 h-5 text-emerald-400" />
            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Photo Story & Scrollytelling Builder
            </h1>
          </div>
          <p className="text-xs text-slate-400">
            Create immersive visual essays like <em>kkcreate.in</em>. Every essay features high-res sequenced frames with individual captions, alt-text descriptions, and ordering controls.
          </p>
        </div>

        <button
          onClick={openNewBuilder}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-mono font-bold transition cursor-pointer shadow-md shadow-emerald-900/30"
        >
          <PlusCircle className="w-4 h-4" />
          <span>New Photo Essay</span>
        </button>
      </div>

      {notice && (
        <div className="p-3 bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-medium rounded-xl flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{notice}</span>
        </div>
      )}

      {/* Stories Table */}
      <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-sm">
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
            Photo Essays Archive ({photoStories.length})
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 text-slate-400 uppercase font-mono text-[11px] border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Cover</th>
                <th className="py-3 px-4">Title & Location</th>
                <th className="py-3 px-4 text-center">Frames Count</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-850">
              {photoStories.map((story) => (
                <tr key={story.id} className="hover:bg-slate-850/50 transition">
                  <td className="py-3 px-4 w-32">
                    <img
                      src={story.coverImage}
                      alt={story.title.en}
                      className="w-28 aspect-16/10 rounded-lg object-cover bg-slate-950 border border-slate-800"
                    />
                  </td>

                  <td className="py-3 px-4 max-w-sm">
                    <h3 className="font-bold text-white text-sm line-clamp-1">
                      {story.title.en}
                    </h3>
                    <p className="text-[11px] text-slate-400 font-mono mt-0.5 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-emerald-400" />
                      <span>{story.location.en}</span>
                    </p>
                    <p className="text-[10px] text-slate-500 font-mono mt-0.5">
                      /{story.slug} • {story.date}
                    </p>
                  </td>

                  <td className="py-3 px-4 text-center">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-950 border border-slate-800 font-mono text-emerald-400 text-xs font-bold">
                      <Images className="w-3.5 h-3.5" />
                      <span>{story.frames.length} Frames</span>
                    </span>
                  </td>

                  <td className="py-3 px-4 text-center">
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                        story.status === "PUBLISHED"
                          ? "bg-emerald-500/20 text-emerald-400"
                          : "bg-amber-500/20 text-amber-400"
                      }`}
                    >
                      {story.status}
                    </span>
                  </td>

                  <td className="py-3 px-4 text-right space-x-2">
                    <Link
                      href={`/photo-stories/${story.slug}`}
                      target="_blank"
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 inline-block"
                      title="View Live Reader View"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </Link>
                    <button
                      onClick={() => openEditBuilder(story)}
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
                      title="Edit Photo Essay"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDeleteStory(story.id)}
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

      {/* Photo Story Sequence Builder Modal */}
      {isBuilderOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setIsBuilderOpen(false)}
        >
          <div
            className="w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl max-h-[94vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 font-bold">
                  Spatial Visual Builder
                </span>
                <h3 className="font-bold text-white text-base">
                  {editingStoryId ? "Edit Photo Story & Sequence" : "Create Photo Essay"}
                </h3>
              </div>
              <button
                onClick={() => setIsBuilderOpen(false)}
                className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveStory} className="space-y-6 text-xs">
              {/* Core Metadata */}
              <div className="space-y-4">
                <h4 className="font-mono text-xs font-bold text-slate-300 uppercase tracking-wider border-b border-slate-800 pb-2">
                  1. Essay Metadata & Narrative Intro
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-300 mb-1">
                      Essay Title (English) *
                    </label>
                    <input
                      type="text"
                      required
                      value={titleEn}
                      onChange={(e) => setTitleEn(e.target.value)}
                      placeholder="e.g. Whispers of the High Passes..."
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
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-300 mb-1">
                      URL Slug *
                    </label>
                    <input
                      type="text"
                      required
                      value={slug}
                      onChange={(e) => setSlug(e.target.value)}
                      placeholder="whispers-of-the-high-passes"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-300 mb-1">
                      Location / Region (EN) *
                    </label>
                    <input
                      type="text"
                      required
                      value={locationEn}
                      onChange={(e) => setLocationEn(e.target.value)}
                      placeholder="e.g. Thorong La & Upper Manang"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-300 mb-1">
                      Narrative Intro (English) *
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={introEn}
                      onChange={(e) => setIntroEn(e.target.value)}
                      placeholder="Atmospheric contextual prelude..."
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-300 mb-1">
                      भूमिका (नेपालीमा)
                    </label>
                    <textarea
                      rows={3}
                      value={introNp}
                      onChange={(e) => setIntroNp(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white font-nepali"
                    />
                  </div>
                </div>

                {/* Cover Image Upload from Computer */}
                <ImageUpload
                  value={coverImage}
                  onChange={setCoverImage}
                  label="Hero Cover Photograph (From Computer) *"
                  helperText="Upload wide panoramic landscape image from your computer to serve as the essay cover"
                  required
                />
              </div>

              {/* Multi-Image Sequence Builder */}
              <div className="space-y-4 pt-4 border-t border-slate-800">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <div>
                    <h4 className="font-mono text-xs font-bold text-emerald-400 uppercase tracking-wider">
                      2. Sequenced Photo Frames ({frames.length})
                    </h4>
                    <p className="text-[11px] text-slate-400">
                      Reorder, configure captions, and set descriptive alt text for each frame in the scrollytelling essay.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={handleAddFrame}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs font-bold"
                  >
                    <PlusCircle className="w-3.5 h-3.5" />
                    <span>Add Frame</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {frames.map((frame, index) => (
                    <div
                      key={frame.id}
                      className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3"
                    >
                      <div className="flex items-center justify-between pb-2 border-b border-slate-850">
                        <span className="font-mono font-bold text-white text-xs">
                          Frame #{index + 1}
                        </span>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            disabled={index === 0}
                            onClick={() => handleMoveFrame(index, "up")}
                            className="p-1 rounded bg-slate-850 hover:bg-slate-800 text-slate-300 disabled:opacity-30"
                          >
                            <ArrowUp className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            disabled={index === frames.length - 1}
                            onClick={() => handleMoveFrame(index, "down")}
                            className="p-1 rounded bg-slate-850 hover:bg-slate-800 text-slate-300 disabled:opacity-30"
                          >
                            <ArrowDown className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteFrame(index)}
                            className="p-1 rounded bg-red-500/10 hover:bg-red-500/20 text-red-400 ml-2"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Photo Upload from Computer for this frame */}
                      <ImageUpload
                        value={frame.url}
                        onChange={(url) => handleUpdateFrame(index, { url })}
                        label={`Frame #${index + 1} Image (From Computer)`}
                        helperText="Upload photograph file directly from your computer"
                        required
                      />

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                        <div>
                          <label className="block text-slate-400 mb-1">
                            Caption (English) *
                          </label>
                          <input
                            type="text"
                            required
                            value={frame.caption.en}
                            onChange={(e) =>
                              handleUpdateFrame(index, {
                                caption: { ...frame.caption, en: e.target.value },
                              })
                            }
                            className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-slate-400 mb-1">
                            क्याप्सन (नेपालीमा)
                          </label>
                          <input
                            type="text"
                            value={frame.caption.np}
                            onChange={(e) =>
                              handleUpdateFrame(index, {
                                caption: { ...frame.caption, np: e.target.value },
                              })
                            }
                            className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-white font-nepali"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-slate-400 mb-1">
                          Descriptive Alt Text (For Accessibility & Image SEO)
                        </label>
                        <input
                          type="text"
                          value={frame.altText}
                          onChange={(e) =>
                            handleUpdateFrame(index, { altText: e.target.value })
                          }
                          placeholder="e.g. Traditional clay potter rotating wooden wheel"
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-white font-mono text-[11px]"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Status and Actions */}
              <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-slate-400">Publication Status:</span>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as any)}
                    className="bg-slate-950 border border-slate-800 text-white rounded-lg px-3 py-1 font-mono"
                  >
                    <option value="PUBLISHED">PUBLISHED</option>
                    <option value="DRAFT">DRAFT</option>
                  </select>
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setIsBuilderOpen(false)}
                    className="px-4 py-2 border border-slate-800 rounded-xl text-slate-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-mono font-bold rounded-xl transition"
                  >
                    {editingStoryId ? "Save Essay" : "Publish Photo Story"}
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
