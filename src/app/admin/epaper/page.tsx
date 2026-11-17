"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  FileText,
  Save,
  CheckCircle,
  ExternalLink,
  Upload,
  Calendar,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function AdminEPaperPage() {
  const { language, toNepaliNum } = useLanguage();

  const [editionDateNp, setEditionDateNp] = useState("२०८१ मंसिर २, मंगलबार");
  const [editionDateEn, setEditionDateEn] = useState("Tuesday, Nov 17, 2026");
  const [volume, setVolume] = useState("३ (Vol III)");
  const [issueNumber, setIssueNumber] = useState("२८४ (No 284)");
  const [price, setPrice] = useState("रु १०/-");
  const [leadStoryTitle, setLeadStoryTitle] = useState(
    "नेपालको जलविद्युत दक्षिण एसियाली बजारमा: भारत र बंगलादेशसँग ऐतिहासिक सम्झौता"
  );
  const [saved, setSaved] = useState(false);

  const pages = [
    { num: 1, title: "मुख्य पृष्ठ (Front Page)", story: leadStoryTitle },
    { num: 2, title: "सम्पादकीय र विचार (Editorial & Opinion)", story: "युवा जनशक्तिको पलायन रोक्न नीतिगत पुनर्विचार" },
    { num: 3, title: "संसद् र राजनीति (National Politics)", story: "विद्युतीय सुशासन तथा सार्वजनिक सेवा विधेयक पारित" },
    { num: 4, title: "अर्थ र वाणिज्य (Economy & Markets)", story: "नेप्से परिसूचकमा ५२ अंकको उछाल, १२ अर्बको कारोबार" },
    { num: 5, title: "सातै प्रदेश (Provincial Digest)", story: "मधेशमा सौर्य सिँचाइ र गण्डकीमा इको-ट्रेक" },
    { num: 6, title: "विश्व र प्रविधि (World & Tech)", story: "नेपालमै विकास भयो नेपाली भाषा बुझ्ने ठूलो एआई मोडेल" },
    { num: 7, title: "खेलकुद (Sports Arena)", story: "रोहित पौडेलको शतकसँगै नेपाललाई त्रिकोणात्मक टी-२० ट्रफी" },
    { num: 8, title: "मनोरञ्जन र कला (Arts & Culture)", story: "नेपाली फिल्म ‘उकाली-ओराली’ लाई दर्शकको स्ट्यान्डिङ ओभेसन" },
  ];

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight flex items-center gap-2">
            <FileText className="w-6 h-6 text-red-600" />
            <span>{language === "np" ? "ई-कागज डिजिटल संस्करण व्यवस्थापक" : "Digital E-Paper Manager"}</span>
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            {language === "np"
              ? "दैनिक छापा संस्करणको डिजिटल ई-कागज, मिति र पृष्ठहरू यहाँबाट व्यवस्थापन गर्नुहोस्।"
              : "Manage the digital newspaper edition layout, publish dates, and headlines."}
          </p>
        </div>

        <Link
          href="/epaper"
          target="_blank"
          className="flex items-center gap-1.5 text-xs text-red-600 bg-red-50 border border-red-200 px-3 py-2 rounded-xl font-bold transition"
        >
          <span>{language === "np" ? "लाइभ ई-कागज हेर्नुहोस्" : "Open Live E-Paper"}</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>
      </div>

      {saved && (
        <div className="p-3 bg-green-100 text-green-800 rounded-xl text-xs font-bold flex items-center gap-2">
          <CheckCircle className="w-4 h-4" />
          <span>ई-कागज संस्करण सफलतापूर्वक सुरक्षित भयो!</span>
        </div>
      )}

      {/* Main Settings Form */}
      <form onSubmit={handleSave} className="space-y-6">
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs space-y-4">
          <h2 className="text-sm font-bold text-gray-900 border-b border-gray-100 pb-3">
            आजको संस्करण विवरण (Current Edition Metadata)
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block font-bold text-gray-700 mb-1">प्रकाशन मिति (वि.सं.)</label>
              <input
                type="text"
                value={editionDateNp}
                onChange={(e) => setEditionDateNp(e.target.value)}
                className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2"
              />
            </div>

            <div>
              <label className="block font-bold text-gray-700 mb-1">Publication Date (A.D.)</label>
              <input
                type="text"
                value={editionDateEn}
                onChange={(e) => setEditionDateEn(e.target.value)}
                className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2"
              />
            </div>

            <div>
              <label className="block font-bold text-gray-700 mb-1">अंक तथा वर्ष (Volume & Issue)</label>
              <input
                type="text"
                value={issueNumber}
                onChange={(e) => setIssueNumber(e.target.value)}
                className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              पहिलो पृष्ठको मुख्य समाचार शीर्षक (Front Page Banner Headline)
            </label>
            <input
              type="text"
              value={leadStoryTitle}
              onChange={(e) => setLeadStoryTitle(e.target.value)}
              className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-xs font-semibold"
            />
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="bg-red-600 hover:bg-red-700 text-white font-bold text-xs px-6 py-2.5 rounded-lg flex items-center gap-1.5 transition"
            >
              <Save className="w-3.5 h-3.5" />
              <span>संस्करण सुरक्षित गर्नुहोस्</span>
            </button>
          </div>
        </div>

        {/* 8 Pages Grid Overview */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs space-y-4">
          <h2 className="text-sm font-bold text-gray-900 border-b border-gray-100 pb-3">
            कुल ८ पृष्ठको संरचना (8-Page Digital Newspaper Layout)
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            {pages.map((p) => (
              <div
                key={p.num}
                className="p-4 rounded-xl border border-gray-200 bg-gray-50 flex flex-col justify-between h-36"
              >
                <div>
                  <span className="font-extrabold text-red-600 text-[11px] block mb-1">
                    पृष्ठ {toNepaliNum(p.num)}
                  </span>
                  <p className="font-bold text-gray-900 text-xs mb-1">{p.title}</p>
                </div>
                <p className="text-[11px] text-gray-500 line-clamp-2 italic">
                  "{p.story}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </form>
    </div>
  );
}
