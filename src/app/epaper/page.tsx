"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Home,
  ChevronRight,
  Newspaper,
  Calendar,
  Download,
  ZoomIn,
  ZoomOut,
  ChevronLeft,
  Share2,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function EPaperPage() {
  const { language, t, toNepaliNum } = useLanguage();
  const [currentPage, setCurrentPage] = useState(1);
  const [zoomLevel, setZoomLevel] = useState(100);
  const totalPages = 8;

  const pages = [
    { pageNum: 1, title: { np: "पृष्ठ १: मुख्य समाचार", en: "Page 1: Front Page" } },
    { pageNum: 2, title: { np: "पृष्ठ २: सम्पादकीय र विचार", en: "Page 2: Editorial & Op-Ed" } },
    { pageNum: 3, title: { np: "पृष्ठ ३: राष्ट्रिय राजनीति", en: "Page 3: National Politics" } },
    { pageNum: 4, title: { np: "पृष्ठ ४: अर्थ र वाणिज्य", en: "Page 4: Economy & Markets" } },
    { pageNum: 5, title: { np: "पृष्ठ ५: सातै प्रदेश", en: "Page 5: Provincial Digest" } },
    { pageNum: 6, title: { np: "पृष्ठ ६: विश्व र प्रविधि", en: "Page 6: World & Tech" } },
    { pageNum: 7, title: { np: "पृष्ठ ७: खेलकुद समाचार", en: "Page 7: Sports Arena" } },
    { pageNum: 8, title: { np: "पृष्ठ ८: मनोरञ्जन र जीवनशैली", en: "Page 8: Entertainment" } },
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Breadcrumb */}
      <nav className="flex items-center text-xs text-gray-500 gap-1.5 py-1">
        <Link href="/" className="hover:text-red-600 flex items-center gap-1 transition">
          <Home className="w-3.5 h-3.5" />
          <span>{t("home")}</span>
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
        <span className="font-semibold text-gray-800">{t("epaper")}</span>
      </nav>

      {/* Header Bar */}
      <div className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-6 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center shrink-0">
            <Newspaper className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
              {language === "np" ? "सानो कुरा ई-कागज (E-Paper)" : "Sano Kura Digital E-Paper"}
            </h1>
            <p className="text-xs text-gray-500">
              {language === "np"
                ? "२०८१ मंसिर २ गते, मंगलबारको राष्ट्रिय दैनिक संस्करण"
                : "National Daily Print Edition - Tuesday, Nov 17, 2026"}
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2 text-xs">
          <button
            onClick={() => setZoomLevel((z) => Math.max(z - 15, 70))}
            className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 transition"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <span className="font-mono text-xs px-1 text-gray-600">{zoomLevel}%</span>
          <button
            onClick={() => setZoomLevel((z) => Math.min(z + 15, 140))}
            className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 transition"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>

          <button
            onClick={() => alert(language === "np" ? "ई-कागज PDF डाउनलोड हुँदैछ..." : "Downloading E-Paper PDF...")}
            className="flex items-center gap-1.5 bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg font-semibold transition ml-2"
          >
            <Download className="w-3.5 h-3.5" />
            <span>PDF {language === "np" ? "डाउनलोड" : "Download"}</span>
          </button>
        </div>
      </div>

      {/* Page Selector Strip */}
      <div className="flex items-center justify-between bg-gray-900 text-white px-4 py-2.5 rounded-xl text-xs">
        <div className="flex items-center gap-2">
          <button
            disabled={currentPage <= 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className="p-1 rounded hover:bg-gray-800 disabled:opacity-40 transition"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="font-semibold">
            {language === "np" ? "पृष्ठ" : "Page"}: {toNepaliNum(currentPage)} / {toNepaliNum(totalPages)}
          </span>
          <button
            disabled={currentPage >= totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
            className="p-1 rounded hover:bg-gray-800 disabled:opacity-40 transition"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
          {pages.map((p) => (
            <button
              key={p.pageNum}
              onClick={() => setCurrentPage(p.pageNum)}
              className={`px-2 py-0.5 rounded text-[11px] font-bold transition ${
                currentPage === p.pageNum ? "bg-red-600 text-white" : "text-gray-400 hover:text-white"
              }`}
            >
              {toNepaliNum(p.pageNum)}
            </button>
          ))}
        </div>
      </div>

      {/* E-Paper Newspaper Simulated Canvas */}
      <div className="bg-white rounded-2xl border border-gray-300 shadow-md p-6 sm:p-10 overflow-auto">
        <div
          style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: "top center" }}
          className="transition-transform duration-200 border-2 border-gray-800 p-6 sm:p-8 bg-[#faf8f5] shadow-inner max-w-3xl mx-auto space-y-6"
        >
          {/* Newspaper Masthead */}
          <div className="border-b-4 border-double border-gray-900 pb-4 text-center">
            <p className="text-[10px] tracking-widest uppercase font-bold text-gray-600 mb-1">
              {language === "np"
                ? "नेपालको राष्ट्रिय दैनिक पत्रिका • वर्ष ३ • अंक २८४"
                : "NEPAL'S NATIONAL DAILY NEWSPAPER • VOL III • NO 284"}
            </p>
            <h2 className="text-4xl sm:text-6xl font-black tracking-tight text-gray-900 font-serif">
              {language === "np" ? "सानो कुरा" : "SANO KURA"}
            </h2>
            <div className="flex items-center justify-between text-[11px] text-gray-700 font-serif border-t border-b border-gray-800 mt-2 py-1">
              <span>{language === "np" ? "२०८१ मंसिर २, मंगलबार" : "Tuesday, Nov 17, 2026"}</span>
              <span>{pages[currentPage - 1].title[language]}</span>
              <span>{language === "np" ? "मूल्य: रु १०।-" : "Price: Rs 10/-"}</span>
            </div>
          </div>

          {/* Newspaper Body Simulated columns */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 font-serif">
            {/* Main Lead Column (2 cols) */}
            <div className="sm:col-span-2 space-y-3 border-r border-gray-300 pr-4">
              <h3 className="text-xl sm:text-2xl font-black text-gray-900 leading-tight">
                {language === "np"
                  ? "नेपालको जलविद्युत दक्षिण एसियाली बजारमा: भारत र बंगलादेशसँग ऐतिहासिक सम्झौता"
                  : "Nepal's Clean Energy Export Landmark: Trilateral Accord Operational"}
              </h3>
              <p className="text-xs text-gray-600 italic">
                {language === "np"
                  ? "काठमाडौँ — नेपाल विद्युत प्राधिकरणले ढल्केबर–मुजफ्फरपुर अन्तरदेशीय प्रसारण लाइनमार्फत बंगलादेश बिजुली निर्यात सुरु गरेको छ।"
                  : "KATHMANDU — Nepal has officially commenced export of 40MW clean energy to Bangladesh via Indian grid."}
              </p>
              <div className="h-48 bg-gray-200 rounded overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=800&q=80"
                  alt="Hydro"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-xs text-gray-800 leading-relaxed text-justify">
                {language === "np"
                  ? "यस सम्झौताले नेपाललाई दक्षिण एसियाको हरित ऊर्जा केन्द्रका रूपमा स्थापित गर्न मद्दत गर्नेछ। आगामी पाँच वर्षसम्म हरेक वर्षको जुन १५ देखि नोभेम्बर १५ सम्म नेपालले बंगलादेशलाई बिजुली बिक्री गर्नेछ जसबाट करोडौं डलर आर्जन हुनेछ।"
                  : "The pact cements Nepal's role as a renewable power hub in South Asia, fetching substantial hard currency earnings while aiding regional transition from fossil fuels."}
              </p>
            </div>

            {/* Side Column (1 col) */}
            <div className="space-y-4 text-xs font-serif">
              <div className="border-b border-gray-300 pb-3">
                <h4 className="font-bold text-sm text-gray-900 leading-snug mb-1">
                  {language === "np"
                    ? "नेप्सेमा ५२ अंकको उछाल, १२ अर्बको कारोबार"
                    : "NEPSE Rallies 52 Points with Rs 12B Turnover"}
                </h4>
                <p className="text-gray-700 text-justify">
                  {language === "np"
                    ? "ब्याजदर घट्दा पुँजी बजारमा लगानीकर्ताको उत्साह बढेको छ। बैंकिङ र जलविद्युत कम्पनीहरूको सेयरमा सर्किट लागेको छ।"
                    : "Equity markets soared on the back of softened commercial lending rates, generating historic single-day liquidity."}
                </p>
              </div>

              <div>
                <h4 className="font-bold text-sm text-gray-900 leading-snug mb-1">
                  {language === "np"
                    ? "क्रिकेट: रोहित पौडेलको शतकसँगै नेपाल च्याम्पियन"
                    : "Cricket: Rohit's Century Seals Tri-Series"}
                </h4>
                <p className="text-gray-700 text-justify">
                  {language === "np"
                    ? "कीर्तिपुर मैदानमा २० हजार दर्शकका अगाडि नेपालले उपाधि उचाल्दै इतिहास रचेको छ।"
                    : "Nepal national team thrilled thousands of roaring home supporters at Kirtipur to lift international silverware."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
