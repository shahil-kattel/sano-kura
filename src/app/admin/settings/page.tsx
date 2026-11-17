"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Settings,
  Save,
  CheckCircle2,
  ShieldCheck,
  Building2,
  Phone,
  Mail,
  MapPin,
  ExternalLink,
  Sparkles,
  FileCheck2,
  Globe2,
} from "lucide-react";
import ImageUpload from "@/components/admin/ImageUpload";
import { useNews } from "@/context/NewsContext";

export default function AdminSettingsPage() {
  const { settings, updateSettings } = useNews();

  const [siteNameNp, setSiteNameNp] = useState(settings.siteNameNp);
  const [siteNameEn, setSiteNameEn] = useState(settings.siteNameEn);
  const [taglineNp, setTaglineNp] = useState(settings.taglineNp);
  const [taglineEn, setTaglineEn] = useState(settings.taglineEn);
  const [logoUrl, setLogoUrl] = useState(settings.logoUrl || "");
  const [pressCouncilRegd, setPressCouncilRegd] = useState(settings.pressCouncilRegd);
  const [infoDeptRegd, setInfoDeptRegd] = useState(settings.infoDeptRegd);
  const [companyRegd, setCompanyRegd] = useState(settings.companyRegd);
  const [panNumber, setPanNumber] = useState(settings.panNumber);
  const [phone, setPhone] = useState(settings.phone);
  const [emailNews, setEmailNews] = useState(settings.emailNews);
  const [emailAds, setEmailAds] = useState(settings.emailAds);
  const [address, setAddress] = useState(settings.address);
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings({
      siteNameNp,
      siteNameEn,
      taglineNp,
      taglineEn,
      logoUrl,
      pressCouncilRegd,
      infoDeptRegd,
      companyRegd,
      panNumber,
      phone,
      emailNews,
      emailAds,
      address,
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-slate-850 p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-red-500/10 text-red-400 border border-red-500/20">
              <Settings className="w-3.5 h-3.5" />
              Site Administration
            </span>
            <span className="text-xs text-slate-500">• Global Settings</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Portal Settings & Compliance
          </h1>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            Configure portal identity, statutory Press Council registrations, official contact coordinates, and editorial newsroom desk information.
          </p>
        </div>

        <Link
          href="/"
          target="_blank"
          className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 hover:border-slate-600 px-4 py-2.5 rounded-xl text-xs font-semibold transition shadow-sm"
        >
          <span>View Public Portal</span>
          <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
        </Link>
      </div>

      {/* Save Success Banner */}
      {saved && (
        <div className="p-4 bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 rounded-2xl text-xs sm:text-sm font-semibold flex items-center gap-3 shadow-lg animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
          <span>Portal settings and compliance records saved successfully and synchronized across the entire site!</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 1. BRAND IDENTITY & LOCALIZATION */}
        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 shadow-sm space-y-5">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400">
                <Building2 className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-white">Brand Identity & Portal Names</h2>
                <p className="text-xs text-slate-400">Public name and publication slogans across English and Nepali locales</p>
              </div>
            </div>
            <span className="text-xs px-2.5 py-1 bg-slate-800 text-slate-400 rounded-md border border-slate-700/60 font-mono">
              Locale sync active
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs">
            <div>
              <label className="block font-semibold text-slate-300 mb-1.5 flex items-center justify-between">
                <span>Portal Name (Nepali)</span>
                <span className="text-[10px] text-red-400 font-normal">Primary Display</span>
              </label>
              <input
                type="text"
                required
                value={siteNameNp}
                onChange={(e) => setSiteNameNp(e.target.value)}
                placeholder="e.g. सानो कुरा"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white font-medium focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1.5 flex items-center justify-between">
                <span>Portal Name (English)</span>
                <span className="text-[10px] text-slate-400 font-normal">International</span>
              </label>
              <input
                type="text"
                required
                value={siteNameEn}
                onChange={(e) => setSiteNameEn(e.target.value)}
                placeholder="e.g. Sano Kura"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white font-medium focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1.5">
                Editorial Tagline / Slogan (Nepali)
              </label>
              <input
                type="text"
                value={taglineNp}
                onChange={(e) => setTaglineNp(e.target.value)}
                placeholder="e.g. सत्य, तथ्य र निष्पक्ष नेपाली डिजिटल पत्रिका"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white font-normal focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1.5">
                Editorial Tagline / Slogan (English)
              </label>
              <input
                type="text"
                value={taglineEn}
                onChange={(e) => setTaglineEn(e.target.value)}
                placeholder="e.g. Accurate, Independent & Trustworthy Nepali Digital Journal"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white font-normal focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
              />
            </div>
          </div>

          {/* Official Publication Logo Upload */}
          <div className="pt-4 border-t border-slate-850">
            <ImageUpload
              value={logoUrl}
              onChange={setLogoUrl}
              label="Official Publication Logo (From Computer)"
              helperText="Upload transparent PNG, SVG, or high-res JPG logo to display on the public website header"
            />
          </div>
        </div>

        {/* 2. STATUTORY & REGULATORY FILINGS */}
        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 shadow-sm space-y-5">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-white">Statutory Regulatory Registrations</h2>
                <p className="text-xs text-slate-400">Official Government of Nepal press, company, and tax accreditations</p>
              </div>
            </div>
            <span className="text-xs px-2.5 py-1 bg-emerald-500/10 text-emerald-400 rounded-md border border-emerald-500/20 font-medium">
              Legal Compliance
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-300 mb-1.5">
                Press Council Regd No.
              </label>
              <input
                type="text"
                value={pressCouncilRegd}
                onChange={(e) => setPressCouncilRegd(e.target.value)}
                placeholder="e.g. १२३/०८०-८१"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white font-mono focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1.5">
                Dept of Information Regd
              </label>
              <input
                type="text"
                value={infoDeptRegd}
                onChange={(e) => setInfoDeptRegd(e.target.value)}
                placeholder="e.g. ४५६/०८०-८१"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white font-mono focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1.5">
                Company Registrar Regd
              </label>
              <input
                type="text"
                value={companyRegd}
                onChange={(e) => setCompanyRegd(e.target.value)}
                placeholder="e.g. ७८९/०८०"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white font-mono focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1.5">
                PAN / VAT Number
              </label>
              <input
                type="text"
                value={panNumber}
                onChange={(e) => setPanNumber(e.target.value)}
                placeholder="e.g. ६०१२३४५६७"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white font-mono focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
              />
            </div>
          </div>
        </div>

        {/* 3. CONTACT & NEWSROOM INFORMATION */}
        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 shadow-sm space-y-5">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-white">Contact & Newsroom Information</h2>
                <p className="text-xs text-slate-400">Public reader helplines, editorial offices, and commercial communication channels</p>
              </div>
            </div>
            <span className="text-xs px-2.5 py-1 bg-blue-500/10 text-blue-400 rounded-md border border-blue-500/20 font-medium">
              Newsroom Desk
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs">
            <div>
              <label className="block font-semibold text-slate-300 mb-1.5">
                Headquarters Address
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="e.g. नयाँ बानेश्वर, काठमाडौँ, नेपाल"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1.5">
                Editorial Phone / Hotline
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="e.g. +९७७-१-४१२३४५६, ९८५१२३४५६७"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1.5">
                Editorial & Newsroom Email
              </label>
              <input
                type="email"
                value={emailNews}
                onChange={(e) => setEmailNews(e.target.value)}
                placeholder="news@sanokura.com"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1.5">
                Advertising & Marketing Email
              </label>
              <input
                type="email"
                value={emailAds}
                onChange={(e) => setEmailAds(e.target.value)}
                placeholder="ads@sanokura.com"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
              />
            </div>
          </div>
        </div>

        {/* Submit Actions */}
        <div className="flex items-center justify-between pt-2">
          <p className="text-xs text-slate-500">
            Changes take effect immediately across public headers, footers, statutory notices, and contact pages.
          </p>

          <button
            type="submit"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-xl shadow-lg shadow-red-500/20 transition cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Save Portal Settings</span>
          </button>
        </div>
      </form>
    </div>
  );
}
