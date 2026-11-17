"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Image as ImageIcon,
  PlusCircle,
  Camera,
  Video,
  Trash2,
  ExternalLink,
  CheckCircle,
} from "lucide-react";
import ImageUpload from "@/components/admin/ImageUpload";

interface AdminMediaItem {
  id: string;
  type: "photo" | "video";
  titleEn: string;
  titleNp: string;
  image: string;
  authorEn: string;
  location: string;
  date: string;
}

const INITIAL_MEDIA: AdminMediaItem[] = [
  {
    id: "m-1",
    type: "photo",
    titleEn: "First Winter Snowfall at Everest Base Camp",
    titleNp: "सगरमाथा आधार शिविरमा हिउँदको पहिलो हिमपात",
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80",
    authorEn: "Dawa Sherpa",
    location: "Solukhumbu",
    date: "Nov 17, 2026",
  },
  {
    id: "m-2",
    type: "video",
    titleEn: "20,000 Fans Celebrate Historic Tri-Series Trophy at TU Ground",
    titleNp: "कीर्तिपुर रंगशालामा २० हजार दर्शकको विजय उत्सव",
    image: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=1200&q=80",
    authorEn: "Binod Pandey",
    location: "Kathmandu",
    date: "Nov 17, 2026",
  },
  {
    id: "m-3",
    type: "photo",
    titleEn: "Reflections of Machhapuchhre in Fewa Lake, Pokhara",
    titleNp: "पोखरा फेवातालमा माछापुच्छ्रेको मनमोहक छाया",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
    authorEn: "Priya Gurung",
    location: "Kaski",
    date: "Nov 16, 2026",
  },
];

export default function AdminGalleryPage() {
  const [mediaList, setMediaList] = useState<AdminMediaItem[]>(INITIAL_MEDIA);

  const [titleEn, setTitleEn] = useState("");
  const [titleNp, setTitleNp] = useState("");
  const [image, setImage] = useState("");
  const [type, setType] = useState<"photo" | "video">("photo");
  const [authorEn, setAuthorEn] = useState("Photo Bureau");
  const [location, setLocation] = useState("Kathmandu");
  const [success, setSuccess] = useState(false);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!titleEn.trim() || !image.trim()) return;

    const newItem: AdminMediaItem = {
      id: `m-${Date.now()}`,
      type,
      titleEn: titleEn.trim(),
      titleNp: titleNp.trim() || titleEn.trim(),
      image: image.trim(),
      authorEn: authorEn.trim(),
      location: location.trim(),
      date: "Nov 17, 2026",
    };

    setMediaList([newItem, ...mediaList]);
    setTitleEn("");
    setTitleNp("");
    setImage("");
    setSuccess(true);
    setTimeout(() => setSuccess(false), 2500);
  };

  const handleDelete = (id: string) => {
    if (confirm("Delete this media item permanently?")) {
      setMediaList(mediaList.filter((m) => m.id !== id));
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2.5">
            <ImageIcon className="w-6 h-6 text-red-500" />
            <span>Multimedia Gallery Manager</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Curate high-resolution photo stories and video features for the public gallery ({mediaList.length} items live).
          </p>
        </div>

        <Link
          href="/gallery"
          target="_blank"
          className="flex items-center gap-1.5 text-xs text-red-400 hover:text-white bg-red-600/10 border border-red-500/30 px-3.5 py-2 rounded-xl font-bold transition hover:bg-red-600"
        >
          <span>View Public Gallery</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Add Form (1 Col) */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <h3 className="font-extrabold text-sm text-white border-b border-slate-800 pb-3 flex items-center gap-2">
            <PlusCircle className="w-4 h-4 text-red-500" />
            <span>Upload New Media Story</span>
          </h3>

          {success && (
            <div className="p-3 bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 rounded-xl text-xs font-bold flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              <span>Media asset added successfully!</span>
            </div>
          )}

          <form onSubmit={handleAdd} className="space-y-3.5 text-xs">
            <div>
              <label className="block font-bold text-slate-300 mb-1">Media Type</label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setType("photo")}
                  className={`flex-1 py-1.5 rounded-lg font-bold flex items-center justify-center gap-1.5 border transition ${type === "photo"
                    ? "bg-red-600 border-red-500 text-white shadow-md shadow-red-900/40"
                    : "bg-slate-950 border-slate-800 text-slate-400 hover:text-white"
                    }`}
                >
                  <Camera className="w-3.5 h-3.5" />
                  <span>Photo Story</span>
                </button>
                <button
                  type="button"
                  onClick={() => setType("video")}
                  className={`flex-1 py-1.5 rounded-lg font-bold flex items-center justify-center gap-1.5 border transition ${type === "video"
                    ? "bg-blue-600 border-blue-500 text-white shadow-md shadow-blue-900/40"
                    : "bg-slate-950 border-slate-800 text-slate-400 hover:text-white"
                    }`}
                >
                  <Video className="w-3.5 h-3.5" />
                  <span>Video Clip</span>
                </button>
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-300 mb-1">
                Story Title (English) *
              </label>
              <input
                type="text"
                required
                value={titleEn}
                onChange={(e) => setTitleEn(e.target.value)}
                placeholder="Title in English..."
                className="w-full bg-slate-950 border border-slate-800 text-white rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-300 mb-1">
                तस्बिर शीर्षक (Nepali Title)
              </label>
              <input
                type="text"
                value={titleNp}
                onChange={(e) => setTitleNp(e.target.value)}
                placeholder="नेपाली शीर्षक..."
                className="w-full bg-slate-950 border border-slate-800 text-white rounded-lg px-3 py-2 text-xs font-nepali focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            <div>
              <ImageUpload
                value={image}
                onChange={setImage}
                label="Gallery Media (From Computer)"
                helperText="Upload image or poster snapshot from your computer"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block font-bold text-slate-300 mb-1">Location</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 text-white rounded-lg px-3 py-2 text-xs"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-300 mb-1">Credit / Photo Desk</label>
                <input
                  type="text"
                  value={authorEn}
                  onChange={(e) => setAuthorEn(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 text-white rounded-lg px-3 py-2 text-xs"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-500 text-white font-bold py-2.5 rounded-xl transition shadow-lg shadow-red-900/30"
            >
              + Add to Public Gallery
            </button>
          </form>
        </div>

        {/* Media Grid (2 Cols) */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {mediaList.map((m) => (
            <div
              key={m.id}
              className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden shadow-lg flex flex-col justify-between group hover:border-slate-700 transition"
            >
              <div className="relative h-44 w-full bg-slate-950">
                <img src={m.image} alt={m.titleEn} className="w-full h-full object-cover" />
                <span
                  className={`absolute top-2.5 left-2.5 text-[10px] font-bold px-2 py-0.5 rounded text-white shadow-md ${m.type === "video" ? "bg-blue-600" : "bg-red-600"
                    }`}
                >
                  {m.type === "video" ? "Video Story" : "Photo Story"}
                </span>
                <span className="absolute bottom-2.5 right-2.5 bg-black/70 backdrop-blur-xs text-white text-[10px] px-2 py-0.5 rounded font-medium">
                  {m.location}
                </span>
              </div>

              <div className="p-4">
                <h4 className="font-bold text-xs text-white line-clamp-2 mb-1.5">
                  {m.titleEn}
                </h4>
                <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-800 mt-2">
                  <span>Photo: {m.authorEn}</span>
                  <button
                    onClick={() => handleDelete(m.id)}
                    className="text-rose-400 hover:text-rose-300 p-1 rounded hover:bg-rose-950 transition"
                    title="Delete media"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
