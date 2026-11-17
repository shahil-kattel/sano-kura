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
import { useLanguage } from "@/context/LanguageContext";

interface AdminMediaItem {
  id: string;
  type: "photo" | "video";
  titleNp: string;
  titleEn: string;
  image: string;
  authorNp: string;
  authorEn: string;
  location: string;
  date: string;
}

const INITIAL_MEDIA: AdminMediaItem[] = [
  {
    id: "m-1",
    type: "photo",
    titleNp: "सगरमाथा आधार शिविरमा हिउँदको पहिलो हिमपात र पदयात्रीहरू",
    titleEn: "First Snowfall at Everest Base Camp",
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80",
    authorNp: "दावा शेर्पा",
    authorEn: "Dawa Sherpa",
    location: "सोलुखुम्बु",
    date: "२०८१ मंसिर २",
  },
  {
    id: "m-2",
    type: "video",
    titleNp: "कीर्तिपुर रंगशालामा २० हजार दर्शकको विजय उत्सव",
    titleEn: "Euphoria in Kirtipur: 20k Fans Wave National Flags",
    image: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=1200&q=80",
    authorNp: "विनोद पाण्डे",
    authorEn: "Binod Pandey",
    location: "काठमाडौँ",
    date: "२०८१ मंसिर २",
  },
  {
    id: "m-3",
    type: "photo",
    titleNp: "पोखरा फेवातालमा माछापुच्छ्रेको मनमोहक छाया",
    titleEn: "Mirror of Machhapuchhre in Fewa Lake",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
    authorNp: "प्रिया गुरुङ",
    authorEn: "Priya Gurung",
    location: "कास्की",
    date: "२०८१ मंसिर १",
  },
];

export default function AdminGalleryPage() {
  const { language, toNepaliNum } = useLanguage();
  const [mediaList, setMediaList] = useState<AdminMediaItem[]>(INITIAL_MEDIA);

  const [titleNp, setTitleNp] = useState("");
  const [titleEn, setTitleEn] = useState("");
  const [image, setImage] = useState("");
  const [type, setType] = useState<"photo" | "video">("photo");
  const [authorNp, setAuthorNp] = useState("फोटो ब्यूरो");
  const [location, setLocation] = useState("काठमाडौँ");
  const [success, setSuccess] = useState(false);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!titleNp.trim() || !image.trim()) return;

    const newItem: AdminMediaItem = {
      id: `m-${Date.now()}`,
      type,
      titleNp: titleNp.trim(),
      titleEn: titleEn.trim() || titleNp.trim(),
      image: image.trim(),
      authorNp: authorNp.trim(),
      authorEn: "Photo Bureau",
      location: location.trim(),
      date: "२०८१ मंसिर २",
    };

    setMediaList([newItem, ...mediaList]);
    setTitleNp("");
    setTitleEn("");
    setImage("");
    setSuccess(true);
    setTimeout(() => setSuccess(false), 2500);
  };

  const handleDelete = (id: string) => {
    if (confirm("Delete this media item?")) {
      setMediaList(mediaList.filter((m) => m.id !== id));
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight flex items-center gap-2">
            <ImageIcon className="w-6 h-6 text-red-600" />
            <span>
              {language === "np" ? "फोटो तथा भिडियो ग्यालरी व्यवस्थापन" : "Gallery Media Manager"}
            </span>
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            {language === "np"
              ? `हाल ${toNepaliNum(mediaList.length)} मिडिया सामग्री सक्रिय छन्।`
              : `Currently ${mediaList.length} media items published in public gallery.`}
          </p>
        </div>

        <Link
          href="/gallery"
          target="_blank"
          className="flex items-center gap-1.5 text-xs text-red-600 bg-red-50 border border-red-200 px-3 py-2 rounded-xl font-bold transition"
        >
          <span>{language === "np" ? "लाइभ ग्यालरी हेर्नुहोस्" : "View Live Gallery"}</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Add Form (1 Col) */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs space-y-4">
          <h3 className="font-extrabold text-sm text-gray-900 border-b border-gray-100 pb-3 flex items-center gap-2">
            <PlusCircle className="w-4 h-4 text-red-600" />
            <span>{language === "np" ? "नयाँ तस्बिर वा भिडियो थप्नुहोस्" : "Add Gallery Item"}</span>
          </h3>

          {success && (
            <div className="p-2.5 bg-green-100 text-green-800 rounded-lg text-xs font-bold flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              <span>सफलतापूर्वक थपियो!</span>
            </div>
          )}

          <form onSubmit={handleAdd} className="space-y-3 text-xs">
            <div>
              <label className="block font-bold text-gray-700 mb-1">प्रकार (Type)</label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setType("photo")}
                  className={`flex-1 py-1.5 rounded-lg font-bold flex items-center justify-center gap-1 ${
                    type === "photo" ? "bg-red-600 text-white" : "bg-gray-100 text-gray-700"
                  }`}
                >
                  <Camera className="w-3.5 h-3.5" />
                  <span>फोटो कथा</span>
                </button>
                <button
                  type="button"
                  onClick={() => setType("video")}
                  className={`flex-1 py-1.5 rounded-lg font-bold flex items-center justify-center gap-1 ${
                    type === "video" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700"
                  }`}
                >
                  <Video className="w-3.5 h-3.5" />
                  <span>भिडियो</span>
                </button>
              </div>
            </div>

            <div>
              <label className="block font-bold text-gray-700 mb-1">शीर्षक (नेपालीमा) *</label>
              <input
                type="text"
                required
                value={titleNp}
                onChange={(e) => setTitleNp(e.target.value)}
                placeholder="तस्बिर वा भिडियोको शीर्षक..."
                className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2"
              />
            </div>

            <div>
              <label className="block font-bold text-gray-700 mb-1">Title (English)</label>
              <input
                type="text"
                value={titleEn}
                onChange={(e) => setTitleEn(e.target.value)}
                placeholder="Title in English..."
                className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2"
              />
            </div>

            <div>
              <label className="block font-bold text-gray-700 mb-1">मिडिया लिङ्क (Image / Video URL) *</label>
              <input
                type="url"
                required
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="https://images.unsplash.com/..."
                className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block font-bold text-gray-700 mb-1">स्थान (Location)</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2"
                />
              </div>
              <div>
                <label className="block font-bold text-gray-700 mb-1">फोटो पत्रकार (Credit)</label>
                <input
                  type="text"
                  value={authorNp}
                  onChange={(e) => setAuthorNp(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 rounded-lg transition"
            >
              + ग्यालरीमा थप्नुहोस्
            </button>
          </form>
        </div>

        {/* Existing Media Grid (2 Cols) */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {mediaList.map((m) => (
            <div
              key={m.id}
              className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-2xs flex flex-col justify-between"
            >
              <div className="relative h-44 w-full bg-gray-100">
                <img src={m.image} alt={m.titleNp} className="w-full h-full object-cover" />
                <span
                  className={`absolute top-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded text-white ${
                    m.type === "video" ? "bg-blue-600" : "bg-red-600"
                  }`}
                >
                  {m.type === "video" ? "भिडियो" : "फोटो"}
                </span>
                <span className="absolute bottom-2 right-2 bg-black/60 text-white text-[10px] px-2 py-0.5 rounded">
                  {m.location}
                </span>
              </div>

              <div className="p-3">
                <h4 className="font-bold text-xs text-gray-900 line-clamp-2 mb-1">
                  {m.titleNp}
                </h4>
                <div className="flex items-center justify-between text-[11px] text-gray-400 pt-2 border-t border-gray-100 mt-2">
                  <span>तस्बिर: {m.authorNp}</span>
                  <button
                    onClick={() => handleDelete(m.id)}
                    className="text-red-500 hover:text-red-700"
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
