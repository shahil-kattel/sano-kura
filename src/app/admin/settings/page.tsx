"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Settings,
  Save,
  CheckCircle,
  ShieldCheck,
  Building,
  Phone,
  Mail,
  MapPin,
  ExternalLink,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useNews } from "@/context/NewsContext";

export default function AdminSettingsPage() {
  const { language } = useLanguage();
  const { settings, updateSettings } = useNews();

  const [siteNameNp, setSiteNameNp] = useState(settings.siteNameNp);
  const [siteNameEn, setSiteNameEn] = useState(settings.siteNameEn);
  const [taglineNp, setTaglineNp] = useState(settings.taglineNp);
  const [taglineEn, setTaglineEn] = useState(settings.taglineEn);
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
      {/* Header */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight flex items-center gap-2">
            <Settings className="w-6 h-6 text-red-600" />
            <span>{language === "np" ? "वेबसाइट सेटिङ तथा कानुनी विवरण" : "Portal Settings & Identity"}</span>
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            {language === "np"
              ? "वेबसाइटको नाम, स्लोगन, प्रेस काउन्सिल दर्ता नम्बर, फोन, इमेल र ठेगाना व्यवस्थापन गर्नुहोस्।"
              : "Manage website branding, statutory Press Council numbers, contact info, and legal filings."}
          </p>
        </div>

        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-1.5 text-xs text-red-600 bg-red-50 border border-red-200 px-3 py-2 rounded-xl font-bold transition"
        >
          <span>{language === "np" ? "लाइभ हेर्नुहोस्" : "Live View"}</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>
      </div>

      {saved && (
        <div className="p-4 bg-green-600 text-white rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 shadow-xs animate-in fade-in">
          <CheckCircle className="w-5 h-5" />
          <span>
            {language === "np"
              ? "सेटिङहरू सफलतापूर्वक सुरक्षित गरियो र पोर्टलभर लागु भयो!"
              : "Settings successfully saved and synchronized across the portal!"}
          </span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 1. BRAND IDENTITY */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs space-y-4">
          <h2 className="text-sm font-bold text-gray-900 border-b border-gray-100 pb-3 flex items-center gap-2">
            <Building className="w-4 h-4 text-red-600" />
            <span>ब्रान्ड तथा पहिचान (Brand Identity)</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-bold text-gray-700 mb-1">
                पत्रिकाको नाम (नेपालीमा)
              </label>
              <input
                type="text"
                required
                value={siteNameNp}
                onChange={(e) => setSiteNameNp(e.target.value)}
                className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 font-bold"
              />
            </div>

            <div>
              <label className="block font-bold text-gray-700 mb-1">
                Portal Name (English)
              </label>
              <input
                type="text"
                required
                value={siteNameEn}
                onChange={(e) => setSiteNameEn(e.target.value)}
                className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 font-bold"
              />
            </div>

            <div>
              <label className="block font-bold text-gray-700 mb-1">
                स्लोगन / मोटो (नेपालीमा)
              </label>
              <input
                type="text"
                value={taglineNp}
                onChange={(e) => setTaglineNp(e.target.value)}
                className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2"
              />
            </div>

            <div>
              <label className="block font-bold text-gray-700 mb-1">
                Tagline / Slogan (English)
              </label>
              <input
                type="text"
                value={taglineEn}
                onChange={(e) => setTaglineEn(e.target.value)}
                className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2"
              />
            </div>
          </div>
        </div>

        {/* 2. STATUTORY REGISTRATIONS */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs space-y-4">
          <h2 className="text-sm font-bold text-gray-900 border-b border-gray-100 pb-3 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-green-600" />
            <span>कानुनी तथा दर्ता विवरण (Statutory Regulatory Registrations)</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div>
              <label className="block font-bold text-gray-700 mb-1">प्रेस काउन्सिल दर्ता नं.</label>
              <input
                type="text"
                value={pressCouncilRegd}
                onChange={(e) => setPressCouncilRegd(e.target.value)}
                className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2"
              />
            </div>

            <div>
              <label className="block font-bold text-gray-700 mb-1">सूचना तथा प्रसारण विभाग दर्ता</label>
              <input
                type="text"
                value={infoDeptRegd}
                onChange={(e) => setInfoDeptRegd(e.target.value)}
                className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2"
              />
            </div>

            <div>
              <label className="block font-bold text-gray-700 mb-1">कम्पनी रजिस्ट्रार दर्ता नं.</label>
              <input
                type="text"
                value={companyRegd}
                onChange={(e) => setCompanyRegd(e.target.value)}
                className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2"
              />
            </div>

            <div>
              <label className="block font-bold text-gray-700 mb-1">PAN / VAT स्थायी लेखा नं.</label>
              <input
                type="text"
                value={panNumber}
                onChange={(e) => setPanNumber(e.target.value)}
                className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2"
              />
            </div>
          </div>
        </div>

        {/* 3. CONTACT & NEWSROOM DESK */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs space-y-4">
          <h2 className="text-sm font-bold text-gray-900 border-b border-gray-100 pb-3 flex items-center gap-2">
            <Phone className="w-4 h-4 text-blue-600" />
            <span>सम्पर्क तथा कार्यालय विवरण (Contact & Newsroom Information)</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-bold text-gray-700 mb-1">सम्पर्क फोन नम्बरहरू</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2"
              />
            </div>

            <div>
              <label className="block font-bold text-gray-700 mb-1">केन्द्रीय कार्यालय ठेगाना</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2"
              />
            </div>

            <div>
              <label className="block font-bold text-gray-700 mb-1">समाचार कक्ष इमेल (Editorial)</label>
              <input
                type="email"
                value={emailNews}
                onChange={(e) => setEmailNews(e.target.value)}
                className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2"
              />
            </div>

            <div>
              <label className="block font-bold text-gray-700 mb-1">विज्ञापन विभाग इमेल (Ads)</label>
              <input
                type="email"
                value={emailAds}
                onChange={(e) => setEmailAds(e.target.value)}
                className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2"
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-red-600 hover:bg-red-700 text-white font-black text-xs sm:text-sm px-8 py-3 rounded-xl shadow-xs transition flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>सेटिङहरू सुरक्षित गर्नुहोस् (Save Settings)</span>
          </button>
        </div>
      </form>
    </div>
  );
}
