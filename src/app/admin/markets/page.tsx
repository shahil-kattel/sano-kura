"use client";

import React, { useState } from "react";
import Link from "next/link";
import { TrendingUp, Save, CheckCircle, Coins, DollarSign, ExternalLink } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useNews, MarketData } from "@/context/NewsContext";

export default function AdminMarketsPage() {
  const { language } = useLanguage();
  const { markets, updateMarkets } = useNews();

  // Local form state
  const [nepseIndex, setNepseIndex] = useState(markets.nepse.index);
  const [nepseChange, setNepseChange] = useState(markets.nepse.change);
  const [nepsePercent, setNepsePercent] = useState(markets.nepse.percent);
  const [nepseTurnover, setNepseTurnover] = useState(markets.nepse.turnover);

  const [fineTola, setFineTola] = useState(markets.gold.fineTola);
  const [fine10g, setFine10g] = useState(markets.gold.fine10g);
  const [tejabiTola, setTejabiTola] = useState(markets.gold.tejabiTola);
  const [silverTola, setSilverTola] = useState(markets.gold.silverTola);
  const [goldChange, setGoldChange] = useState(markets.gold.change);

  const [forexList, setForexList] = useState(markets.forex);
  const [saved, setSaved] = useState(false);

  const handleForexChange = (index: number, field: "buy" | "sell", value: string) => {
    const updated = [...forexList];
    updated[index] = { ...updated[index], [field]: value };
    setForexList(updated);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateMarkets({
      nepse: {
        index: nepseIndex,
        change: nepseChange,
        percent: nepsePercent,
        turnover: nepseTurnover,
        isUp: nepseChange.startsWith("+"),
      },
      gold: {
        fineTola,
        fine10g,
        tejabiTola,
        silverTola,
        change: goldChange,
        isUp: goldChange.startsWith("+"),
      },
      forex: forexList,
    });

    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-green-600" />
            <span>
              {language === "np" ? "बजार परिसूचक तथा दर व्यवस्थापन" : "Live Market Rates Editor"}
            </span>
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            {language === "np"
              ? "नेप्से परिसूचक, सुन-चाँदी र विदेशी मुद्रा दरहरू परिवर्तन गरी तत्काल वेबसाइटमा अपडेट गर्नुहोस्।"
              : "Update NEPSE, Bullion (Gold/Silver), and NRB Forex rates displayed on the live homepage."}
          </p>
        </div>

        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-1.5 text-xs text-green-700 bg-green-50 border border-green-200 px-3 py-2 rounded-xl font-bold transition"
        >
          <span>{language === "np" ? "लाइभ बजार हेर्नुहोस्" : "View Live Widget"}</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>
      </div>

      {saved && (
        <div className="p-4 bg-green-600 text-white rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 shadow-xs animate-in fade-in">
          <CheckCircle className="w-5 h-5" />
          <span>
            {language === "np"
              ? "बजार दरहरू सफलतापूर्वक सुरक्षित गरियो र मुख्य वेबसाइटमा अपडेट भयो!"
              : "Market rates successfully saved and live on the homepage!"}
          </span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* 1. NEPSE STOCK MARKET */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-gray-100">
            <TrendingUp className="w-5 h-5 text-green-600" />
            <h2 className="text-base font-bold text-gray-900">
              {language === "np" ? "नेप्से परिसूचक (NEPSE Index)" : "NEPSE Stock Market Index"}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div>
              <label className="block font-bold text-gray-700 mb-1">
                नेप्से अंक (Current Index)
              </label>
              <input
                type="text"
                required
                value={nepseIndex}
                onChange={(e) => setNepseIndex(e.target.value)}
                className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-xs font-bold font-mono focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="block font-bold text-gray-700 mb-1">
                परिवर्तन अंक (Point Change)
              </label>
              <input
                type="text"
                required
                value={nepseChange}
                onChange={(e) => setNepseChange(e.target.value)}
                className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-xs font-bold text-green-600 font-mono focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="block font-bold text-gray-700 mb-1">
                प्रतिशत परिवर्तन (Percent)
              </label>
              <input
                type="text"
                required
                value={nepsePercent}
                onChange={(e) => setNepsePercent(e.target.value)}
                className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-xs font-bold font-mono focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="block font-bold text-gray-700 mb-1">
                कुल कारोबार रकम (Turnover)
              </label>
              <input
                type="text"
                required
                value={nepseTurnover}
                onChange={(e) => setNepseTurnover(e.target.value)}
                className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-xs font-bold font-mono focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>
        </div>

        {/* 2. BULLION (GOLD & SILVER) */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-gray-100">
            <Coins className="w-5 h-5 text-yellow-600" />
            <h2 className="text-base font-bold text-gray-900">
              {language === "np" ? "सुन/चाँदी भाउ (Bullion Rates)" : "Gold & Silver Rates"}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block font-bold text-gray-700 mb-1">
                छापावाल सुन (तोला) Fine Gold / Tola
              </label>
              <input
                type="text"
                required
                value={fineTola}
                onChange={(e) => setFineTola(e.target.value)}
                className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-xs font-bold font-mono focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>

            <div>
              <label className="block font-bold text-gray-700 mb-1">
                छापावाल सुन (१० ग्राम) Fine Gold / 10g
              </label>
              <input
                type="text"
                required
                value={fine10g}
                onChange={(e) => setFine10g(e.target.value)}
                className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-xs font-bold font-mono focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>

            <div>
              <label className="block font-bold text-gray-700 mb-1">
                तेजाबी सुन (तोला) Tejabi Gold / Tola
              </label>
              <input
                type="text"
                required
                value={tejabiTola}
                onChange={(e) => setTejabiTola(e.target.value)}
                className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-xs font-bold font-mono focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>

            <div>
              <label className="block font-bold text-gray-700 mb-1">
                चाँदी (तोला) Silver / Tola
              </label>
              <input
                type="text"
                required
                value={silverTola}
                onChange={(e) => setSilverTola(e.target.value)}
                className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-xs font-bold font-mono focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>

            <div>
              <label className="block font-bold text-gray-700 mb-1">
                दैनिक घटबढ (Daily Change)
              </label>
              <input
                type="text"
                value={goldChange}
                onChange={(e) => setGoldChange(e.target.value)}
                className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-xs font-bold text-green-600 font-mono focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>
          </div>
        </div>

        {/* 3. FOREX EXCHANGE RATES */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-gray-100">
            <DollarSign className="w-5 h-5 text-blue-600" />
            <h2 className="text-base font-bold text-gray-900">
              {language === "np" ? "विदेशी मुद्रा विनिमय दर (NRB Forex)" : "Forex Exchange Rates"}
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50 text-gray-500 font-bold uppercase tracking-wider">
                <tr>
                  <th className="py-2.5 px-3">मुद्रा (Currency)</th>
                  <th className="py-2.5 px-3">खरिद दर (Buying Rate)</th>
                  <th className="py-2.5 px-3">बिक्री दर (Selling Rate)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-mono">
                {forexList.map((item, idx) => (
                  <tr key={item.code} className="hover:bg-gray-50">
                    <td className="py-2.5 px-3 font-bold text-gray-900">
                      {item.code} ({item.name})
                    </td>
                    <td className="py-2.5 px-3">
                      <input
                        type="text"
                        value={item.buy}
                        onChange={(e) => handleForexChange(idx, "buy", e.target.value)}
                        className="bg-gray-50 border border-gray-300 rounded px-2.5 py-1 text-xs w-28 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </td>
                    <td className="py-2.5 px-3">
                      <input
                        type="text"
                        value={item.sell}
                        onChange={(e) => handleForexChange(idx, "sell", e.target.value)}
                        className="bg-gray-50 border border-gray-300 rounded px-2.5 py-1 text-xs w-28 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Save Changes Button */}
        <div className="flex items-center justify-end">
          <button
            type="submit"
            className="bg-red-600 hover:bg-red-700 text-white font-black text-xs sm:text-sm px-8 py-3 rounded-xl shadow-xs transition flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>{language === "np" ? "बजार दरहरू सुरक्षित गर्नुहोस् (Save Rates)" : "Save Market Rates"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
