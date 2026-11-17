"use client";

import React, { useState } from "react";
import Link from "next/link";
import { TrendingUp, Save, CheckCircle, Coins, DollarSign, ExternalLink } from "lucide-react";
import { useNews, MarketData } from "@/context/NewsContext";

export default function AdminMarketsPage() {
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
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2.5">
            <TrendingUp className="w-6 h-6 text-emerald-500" />
            <span>Market Rates & Financial Feeds Editor</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Update NEPSE stock market benchmarks, Bullion gold/silver rates, and NRB foreign exchange rates in real-time.
          </p>
        </div>

        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-1.5 text-xs text-emerald-400 hover:text-white bg-emerald-600/10 border border-emerald-500/30 px-3.5 py-2 rounded-xl font-bold transition hover:bg-emerald-600"
        >
          <span>View Live Widgets</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>
      </div>

      {saved && (
        <div className="p-4 bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 shadow-lg animate-in fade-in">
          <CheckCircle className="w-5 h-5 text-emerald-400" />
          <span>Market data successfully updated and synchronized across all live portal widgets!</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* 1. NEPSE STOCK MARKET */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
            <TrendingUp className="w-5 h-5 text-emerald-400" />
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-200">
              Nepal Stock Exchange (NEPSE) Benchmark
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div>
              <label className="block font-bold text-slate-300 mb-1">
                Current Index Points
              </label>
              <input
                type="text"
                required
                value={nepseIndex}
                onChange={(e) => setNepseIndex(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 text-white rounded-lg px-3 py-2 text-xs font-bold font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-300 mb-1">
                Point Gain / Loss
              </label>
              <input
                type="text"
                required
                value={nepseChange}
                onChange={(e) => setNepseChange(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 text-emerald-400 rounded-lg px-3 py-2 text-xs font-bold font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-300 mb-1">
                Percentage Change
              </label>
              <input
                type="text"
                required
                value={nepsePercent}
                onChange={(e) => setNepsePercent(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 text-emerald-400 rounded-lg px-3 py-2 text-xs font-bold font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-300 mb-1">
                Daily Turnover (e.g. 12.35B)
              </label>
              <input
                type="text"
                required
                value={nepseTurnover}
                onChange={(e) => setNepseTurnover(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 text-white rounded-lg px-3 py-2 text-xs font-bold font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>
        </div>

        {/* 2. BULLION (GOLD & SILVER) */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
            <Coins className="w-5 h-5 text-amber-400" />
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-200">
              Federation of Nepal Gold & Silver (Bullion Rates)
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block font-bold text-slate-300 mb-1">
                Fine Gold / Tola (छापावाल सुन)
              </label>
              <input
                type="text"
                required
                value={fineTola}
                onChange={(e) => setFineTola(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 text-white rounded-lg px-3 py-2 text-xs font-bold font-mono focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-300 mb-1">
                Fine Gold / 10g (१० ग्राम)
              </label>
              <input
                type="text"
                required
                value={fine10g}
                onChange={(e) => setFine10g(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 text-white rounded-lg px-3 py-2 text-xs font-bold font-mono focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-300 mb-1">
                Tejabi Gold / Tola (तेजाबी सुन)
              </label>
              <input
                type="text"
                required
                value={tejabiTola}
                onChange={(e) => setTejabiTola(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 text-white rounded-lg px-3 py-2 text-xs font-bold font-mono focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-300 mb-1">
                Silver / Tola (चाँदी)
              </label>
              <input
                type="text"
                required
                value={silverTola}
                onChange={(e) => setSilverTola(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 text-white rounded-lg px-3 py-2 text-xs font-bold font-mono focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-300 mb-1">
                Daily Fluctuation (e.g. +1,400)
              </label>
              <input
                type="text"
                value={goldChange}
                onChange={(e) => setGoldChange(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 text-emerald-400 rounded-lg px-3 py-2 text-xs font-bold font-mono focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </div>
        </div>

        {/* 3. FOREX EXCHANGE RATES */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
            <DollarSign className="w-5 h-5 text-blue-400" />
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-200">
              Nepal Rastra Bank (Forex Daily Exchange Rates)
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950/60 text-slate-400 font-bold uppercase tracking-wider border-b border-slate-800">
                <tr>
                  <th className="py-2.5 px-3">Currency</th>
                  <th className="py-2.5 px-3">Buying Rate (खरिद)</th>
                  <th className="py-2.5 px-3">Selling Rate (बिक्री)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 font-mono text-slate-300">
                {forexList.map((item, idx) => (
                  <tr key={item.code} className="hover:bg-slate-800/40">
                    <td className="py-2.5 px-3 font-bold text-white">
                      {item.code} - {item.name}
                    </td>
                    <td className="py-2.5 px-3">
                      <input
                        type="text"
                        value={item.buy}
                        onChange={(e) => handleForexChange(idx, "buy", e.target.value)}
                        className="bg-slate-950 border border-slate-800 text-white rounded px-2.5 py-1 text-xs w-28 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                      />
                    </td>
                    <td className="py-2.5 px-3">
                      <input
                        type="text"
                        value={item.sell}
                        onChange={(e) => handleForexChange(idx, "sell", e.target.value)}
                        className="bg-slate-950 border border-slate-800 text-white rounded px-2.5 py-1 text-xs w-28 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex items-center justify-end">
          <button
            type="submit"
            className="bg-red-600 hover:bg-red-500 text-white font-black text-xs sm:text-sm px-8 py-3 rounded-xl shadow-lg shadow-red-900/30 transition flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Save All Market Rates</span>
          </button>
        </div>
      </form>
    </div>
  );
}
