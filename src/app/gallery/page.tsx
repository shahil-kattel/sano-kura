"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Home, ChevronRight, Camera, Video, X, Eye, Maximize2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface GalleryItem {
  id: string;
  type: "photo" | "video";
  title: { np: string; en: string };
  description: { np: string; en: string };
  image: string;
  author: { np: string; en: string };
  date: string;
  location: { np: string; en: string };
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "gal-1",
    type: "photo",
    title: {
      np: "सगरमाथा आधार शिविरमा हिउँदको पहिलो हिमपात र पदयात्रीहरूको उत्साह",
      en: "First Winter Snowfall at Everest Base Camp: Spirits Soar Among Mountaineers",
    },
    description: {
      np: "५,३६४ मिटरको उचाइमा हिउँले ढाकिएको खुम्बु हिमनदी र पदयात्रीहरूको रमणीय क्षण।",
      en: "Snow-covered Khumbu Glacier at 5,364m and the serene spirit of high-altitude trekkers.",
    },
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80",
    author: { np: "दावा शेर्पा", en: "Dawa Sherpa" },
    date: "२०८१ मंसिर २",
    location: { np: "सोलुखुम्बु", en: "Solukhumbu" },
  },
  {
    id: "gal-2",
    type: "video",
    title: {
      np: "कीर्तिपुर रंगशालामा २० हजार दर्शकको विजय उत्सव र रातो-नीलो झण्डाको लहर",
      en: "Euphoria in Kirtipur: 20,000 Fans Wave National Flags Celebrating Historic Series Win",
    },
    description: {
      np: "नेपाली क्रिकेट टोलीले त्रिकोणात्मक टी-२० सिरिजको ट्रफी उचाल्दा मैदानमा उर्लिएको जनसागर।",
      en: "Historic visual celebrations at TU Ground as Nepal lifts the international T20 trophy.",
    },
    image: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=1200&q=80",
    author: { np: "विनोद पाण्डे", en: "Binod Pandey" },
    date: "२०८१ मंसिर २",
    location: { np: "काठमाडौँ", en: "Kathmandu" },
  },
  {
    id: "gal-3",
    type: "photo",
    title: {
      np: "पोखरा फेवातालमा माछापुच्छ्रेको मनमोहक छाया र डुङ्गा सयर",
      en: "Mirror of Machhapuchhre in Fewa Lake: Tranquil Boating in Pokhara",
    },
    description: {
      np: "शरद ऋतुको सफा मौसममा फेवातालको नीलो पानीमा टल्किने अन्नपूर्ण हिमशृङ्खला।",
      en: "Stunning crystal reflections of the Annapurna range on Fewa Lake in autumn.",
    },
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
    author: { np: "प्रिया गुरुङ", en: "Priya Gurung" },
    date: "२०८१ मंसिर १",
    location: { np: "कास्की", en: "Kaski" },
  },
  {
    id: "gal-4",
    type: "photo",
    title: {
      np: "तराई मधेशमा झुलेका पहेँला तोरीका फूल र किसानको मुस्कान",
      en: "Golden Mustard Blossoms in the Terai Plains and Joyous Agrarian Rhythms",
    },
    description: {
      np: "हिउँद सुरु भएसँगै मधेशका फाँटहरूमा पहेँलपुर फुलेको तोरी र सौर्य सिँचाइको प्रभाव।",
      en: "Vibrant yellow mustard fields blossoming under bright winter skies across Madhesh.",
    },
    image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1200&q=80",
    author: { np: "राजेन्द्र मण्डल", en: "Rajendra Mandal" },
    date: "२०८१ कार्तिक ३०",
    location: { np: "धनुषा", en: "Dhanusha" },
  },
  {
    id: "gal-5",
    type: "video",
    title: {
      np: "दशरथ रंगशालामा रात्रिकालीन फुटबल फाइनलको रोमाञ्चक क्षण",
      en: "Electrifying Night Action Under the Lights at Dasharath Stadium NSL Finale",
    },
    description: {
      np: "नेपाल सुपर लिग फाइनलमा पोखरा थन्डर्सको विजयी गोल र उत्सव।",
      en: "High-definition visual capture of the championship-winning goal.",
    },
    image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1200&q=80",
    author: { np: "सन्तोष न्यौपाने", en: "Santosh Neupane" },
    date: "२०८१ कार्तिक २९",
    location: { np: "काठमाडौँ", en: "Kathmandu" },
  },
  {
    id: "gal-6",
    type: "photo",
    title: {
      np: "काठमाडौँको ऐतिहासिक पाटन दरबार क्षेत्रमा साँझको आरती र सम्पदा सौन्दर्य",
      en: "Evening Heritage Lights and Sacred Chants at Historic Patan Durbar Square",
    },
    description: {
      np: "मल्लकालीन कला, काष्ठकला र दीप प्रज्वलनले सजिएको विश्व सम्पदा क्षेत्र।",
      en: "Luminaries and ancient wood carvings illuminating the UNESCO world heritage site.",
    },
    image: "https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=1200&q=80",
    author: { np: "अमित श्रेष्ठ", en: "Amit Shrestha" },
    date: "२०८१ कार्तिक २८",
    location: { np: "ललितपुर", en: "Lalitpur" },
  },
];

export default function GalleryPage() {
  const { language, t } = useLanguage();
  const [filter, setFilter] = useState<"all" | "photo" | "video">("all");
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  const filteredItems = GALLERY_ITEMS.filter((item) => {
    if (filter === "all") return true;
    return item.type === filter;
  });

  return (
    <div className="space-y-8">
      {/* Breadcrumb */}
      <nav className="flex items-center text-xs text-gray-500 gap-1.5 py-1">
        <Link href="/" className="hover:text-red-600 flex items-center gap-1 transition">
          <Home className="w-3.5 h-3.5" />
          <span>{t("home")}</span>
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
        <span className="font-semibold text-gray-800">{t("gallery")}</span>
      </nav>

      {/* Header Banner */}
      <div className="bg-gray-900 text-white rounded-2xl p-6 sm:p-8 shadow-md">
        <div className="max-w-3xl">
          <span className="inline-block text-xs font-black uppercase tracking-wider px-3 py-1 rounded bg-red-600 text-white mb-2">
            MULTIMEDIA
          </span>
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight mb-3">
            {language === "np" ? "फोटो कथा तथा भिडियो फिचर" : "Photo Stories & Video Features"}
          </h1>
          <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
            {language === "np"
              ? "नेपालका हिमाल, संस्कृति, जनजीवन, खेलकुद र ऐतिहासिक क्षणहरूलाई हाम्रा फोटो पत्रकारहरूले क्यामरामा उतारेका जीवन्त दृश्यहरू।"
              : "Vivid visual narratives capturing the landscapes, resilience, athletic milestones, and culture of Nepal."}
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center justify-between pb-3 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition ${
              filter === "all"
                ? "bg-red-600 text-white shadow-xs"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {language === "np" ? "सबै (All)" : "All"}
          </button>
          <button
            onClick={() => setFilter("photo")}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition flex items-center gap-1.5 ${
              filter === "photo"
                ? "bg-red-600 text-white shadow-xs"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <Camera className="w-3.5 h-3.5" />
            <span>{language === "np" ? "फोटो कथा" : "Photos"}</span>
          </button>
          <button
            onClick={() => setFilter("video")}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition flex items-center gap-1.5 ${
              filter === "video"
                ? "bg-red-600 text-white shadow-xs"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <Video className="w-3.5 h-3.5" />
            <span>{language === "np" ? "भिडियो" : "Videos"}</span>
          </button>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedItem(item)}
            className="group cursor-pointer bg-white rounded-xl overflow-hidden border border-gray-200 shadow-2xs hover:shadow-md transition flex flex-col"
          >
            <div className="relative h-56 w-full overflow-hidden bg-gray-100">
              <img
                src={item.image}
                alt={item.title[language]}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition flex items-center justify-center opacity-0 group-hover:opacity-100">
                <div className="bg-white/90 text-gray-900 p-2.5 rounded-full shadow-lg">
                  <Maximize2 className="w-5 h-5" />
                </div>
              </div>
              <div className="absolute top-3 left-3">
                <span
                  className={`text-[10px] font-black uppercase px-2 py-0.5 rounded text-white flex items-center gap-1 ${
                    item.type === "video" ? "bg-blue-600" : "bg-red-600"
                  }`}
                >
                  {item.type === "video" ? <Video className="w-3 h-3" /> : <Camera className="w-3 h-3" />}
                  <span>{item.type === "video" ? "भिडियो" : "फोटो"}</span>
                </span>
              </div>
              <span className="absolute bottom-2 right-2 bg-black/60 text-white text-[10px] px-2 py-0.5 rounded backdrop-blur-xs">
                {item.location[language]}
              </span>
            </div>

            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-sm text-gray-900 group-hover:text-red-600 transition leading-snug line-clamp-2 mb-1.5">
                  {item.title[language]}
                </h3>
                <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                  {item.description[language]}
                </p>
              </div>

              <div className="flex items-center justify-between text-[11px] text-gray-400 pt-3 border-t border-gray-100 mt-3">
                <span>तस्बिर: {item.author[language]}</span>
                <span>{item.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 sm:p-6 backdrop-blur-sm animate-in fade-in">
          <div className="relative max-w-4xl w-full bg-gray-900 rounded-2xl overflow-hidden shadow-2xl border border-gray-800">
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 z-10 bg-black/60 hover:bg-black text-white p-2 rounded-full transition"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative h-80 sm:h-[460px] w-full bg-black">
              <img
                src={selectedItem.image}
                alt={selectedItem.title[language]}
                className="w-full h-full object-contain"
              />
            </div>

            <div className="p-5 sm:p-6 bg-gray-900 text-white">
              <div className="flex items-center gap-2 mb-2 text-xs text-red-400 font-bold">
                <span>📍 {selectedItem.location[language]}</span>
                <span>•</span>
                <span>तस्बिर: {selectedItem.author[language]}</span>
                <span>•</span>
                <span>{selectedItem.date}</span>
              </div>
              <h2 className="text-lg sm:text-2xl font-bold mb-2">
                {selectedItem.title[language]}
              </h2>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                {selectedItem.description[language]}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
