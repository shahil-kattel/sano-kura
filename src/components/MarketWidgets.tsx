"use client";

import React, { useState } from "react";
import { TrendingUp, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useNews } from "@/context/NewsContext";

export const MarketWidgets: React.FC = () => {
  const { language } = useLanguage();
  const { markets } = useNews();
  const [activeTab, setActiveTab] = useState<"nepse" | "bullion" | "forex">("nepse");

  const bullionList = [
    {
      name: { np: "छापावाल सुन (१० ग्राम)", en: "Fine Gold (10g)" },
      price: markets.gold.fine10g,
      change: markets.gold.change,
    },
    {
      name: { np: "छापावाल सुन (तोला)", en: "Fine Gold (Tola)" },
      price: markets.gold.fineTola,
      change: markets.gold.change,
    },
    {
      name: { np: "तेजाबी सुन (तोला)", en: "Tejabi Gold (Tola)" },
      price: markets.gold.tejabiTola,
      change: markets.gold.change,
    },
    {
      name: { np: "चाँदी (तोला)", en: "Silver (Tola)" },
      price: markets.gold.silverTola,
      change: "+२५",
    },
  ];

  const nepseTopMovers = [
    { symbol: "CHCL", name: "Chilime Hydro", ltp: "५४०.०", change: "+९.८%" },
    { symbol: "NABIL", name: "Nabil Bank", ltp: "६८०.०", change: "+३.४%" },
    { symbol: "SHIVM", name: "Shivam Cements", ltp: "६१०.५", change: "+५.१%" },
    { symbol: "HDL", name: "Himalayan Distillery", ltp: "१,५२०.०", change: "+२.२%" },
  ];

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-xs">
      {/* Tab Switcher */}
      <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-4">
        <h3 className="font-bold text-gray-900 text-sm flex items-center gap-1.5">
          <TrendingUp className="w-4 h-4 text-red-600" />
          <span>{language === "np" ? "बजार परिसूचक" : "Market Indicators"}</span>
        </h3>
        <div className="flex bg-gray-100 p-0.5 rounded-lg text-xs font-semibold">
          <button
            onClick={() => setActiveTab("nepse")}
            className={`px-2.5 py-1 rounded-md transition ${
              activeTab === "nepse"
                ? "bg-white text-red-600 shadow-2xs"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            {language === "np" ? "नेप्से" : "NEPSE"}
          </button>
          <button
            onClick={() => setActiveTab("bullion")}
            className={`px-2.5 py-1 rounded-md transition ${
              activeTab === "bullion"
                ? "bg-white text-red-600 shadow-2xs"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            {language === "np" ? "सुन/चाँदी" : "Bullion"}
          </button>
          <button
            onClick={() => setActiveTab("forex")}
            className={`px-2.5 py-1 rounded-md transition ${
              activeTab === "forex"
                ? "bg-white text-red-600 shadow-2xs"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            {language === "np" ? "मुद्रा विनिमय" : "Forex"}
          </button>
        </div>
      </div>

      {/* NEPSE TAB */}
      {activeTab === "nepse" && (
        <div className="space-y-3">
          <div className="bg-green-50 border border-green-200 rounded-xl p-3 flex items-center justify-between">
            <div>
              <p className="text-xs text-green-800 font-medium">NEPSE INDEX</p>
              <p className="text-xl font-black text-green-700">{markets.nepse.index}</p>
            </div>
            <div className="text-right">
              <span className="inline-flex items-center text-xs font-bold bg-green-200 text-green-900 px-2 py-0.5 rounded">
                <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" />
                {markets.nepse.change} ({markets.nepse.percent})
              </span>
              <p className="text-[11px] text-gray-500 mt-1">
                {language === "np"
                  ? `कारोबार: रु ${markets.nepse.turnover}`
                  : `Turnover: Rs ${markets.nepse.turnover}`}
              </p>
            </div>
          </div>

          <div className="text-xs divide-y divide-gray-100">
            {nepseTopMovers.map((item) => (
              <div key={item.symbol} className="py-1.5 flex items-center justify-between">
                <div>
                  <span className="font-bold text-gray-800">{item.symbol}</span>
                  <span className="text-[11px] text-gray-500 ml-1.5">{item.name}</span>
                </div>
                <div className="text-right flex items-center gap-2">
                  <span className="font-semibold text-gray-900">रु {item.ltp}</span>
                  <span className="text-green-600 font-bold">{item.change}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* BULLION TAB */}
      {activeTab === "bullion" && (
        <div className="space-y-2.5 text-xs">
          {bullionList.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-2 rounded-lg bg-gray-50 border border-gray-100"
            >
              <span className="font-medium text-gray-800">{item.name[language]}</span>
              <div className="text-right">
                <span className="font-bold text-gray-900">रु {item.price}</span>
                <span className="text-[11px] text-green-600 font-semibold ml-1.5">
                  ({item.change})
                </span>
              </div>
            </div>
          ))}
          <p className="text-[10px] text-gray-400 text-right italic pt-1">
            * नेपाल सुनचाँदी व्यवसायी महासंघ
          </p>
        </div>
      )}

      {/* FOREX TAB */}
      {activeTab === "forex" && (
        <div className="space-y-1.5 text-xs">
          <div className="grid grid-cols-3 text-gray-400 font-medium pb-1 border-b border-gray-100 text-[11px]">
            <span>{language === "np" ? "मुद्रा" : "Currency"}</span>
            <span className="text-center">{language === "np" ? "खरिद दर" : "Buying"}</span>
            <span className="text-right">{language === "np" ? "बिक्री दर" : "Selling"}</span>
          </div>
          {markets.forex.map((item) => (
            <div key={item.code} className="grid grid-cols-3 py-1 items-center border-b border-gray-50">
              <span className="font-bold text-gray-800">{item.code}</span>
              <span className="text-center text-gray-700">{item.buy}</span>
              <span className="text-right font-semibold text-gray-900">{item.sell}</span>
            </div>
          ))}
          <p className="text-[10px] text-gray-400 text-right italic pt-1">
            * नेपाल राष्ट्र बैंक
          </p>
        </div>
      )}
    </div>
  );
};
