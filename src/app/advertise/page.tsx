"use client";

import React from "react";
import Link from "next/link";
import {
  Home,
  ChevronRight,
  TrendingUp,
  Users,
  Eye,
  Globe2,
  Mail,
  Phone,
  CheckCircle,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function AdvertisePage() {
  const { language, t, toNepaliNum } = useLanguage();

  const adPackages = [
    {
      name: { np: "शीर्ष ब्यानर (Leaderboard 970x90)", en: "Top Leaderboard (970x90)" },
      desc: {
        np: "वेबसाइटको मुख्य हेडर मुनि सबैभन्दा उच्च भिजिबिलिटी भएको प्रिमियम स्थान।",
        en: "Maximum brand visibility positioned immediately below the primary navigation.",
      },
      price: { np: "रु ७५,००० / महिना", en: "Rs 75,000 / month" },
      features: [
        { np: "सबै पृष्ठहरूमा देखिने (All Pages)", en: "Displayed across all site pages" },
        { np: "दैनिक ५ लाख+ इम्प्रेशन", en: "500k+ daily impressions" },
        { np: "मोबाइल र डेस्कटप दुवैमा अनुकूल", en: "Responsive desktop & mobile view" },
      ],
    },
    {
      name: { np: "साइडबार ब्यानर (Square 300x250)", en: "Sidebar Sticky (300x250)" },
      desc: {
        np: "समाचार पढ्ने क्रममा पाठकहरूको ध्यान आकर्षित गर्ने आकर्षक साइडबार स्थान।",
        en: "High-engagement sticky banner positioned next to trending articles.",
      },
      price: { np: "रु ४५,००० / महिना", en: "Rs 45,000 / month" },
      features: [
        { np: "समाचार भित्र रहने (In-Article Sticky)", en: "Stays visible during article scroll" },
        { np: "उच्च क्लिक दर (High CTR)", en: "Optimized click-through rate" },
        { np: "साप्ताहिक एनालिटिक्स रिपोर्ट", en: "Weekly analytics performance report" },
      ],
    },
    {
      name: { np: "प्रायोजित समाचार (Native Article)", en: "Sponsored Native Feature" },
      desc: {
        np: "तपाईंको ब्राण्ड, उत्पादन वा अभियानको बारेमा व्यावसायिक खोजमूलक आलेख।",
        en: "Dedicated branded content written by our editorial specialists.",
      },
      price: { np: "रु ३५,००० / आलेख", en: "Rs 35,000 / story" },
      features: [
        { np: "गृहपृष्ठमा विशेष स्थान (Home Feature)", en: "Featured on homepage for 72 hours" },
        { np: "सामाजिक सञ्जालमा सेयरिङ", en: "Shared across official social handles" },
        { np: "स्थायी अर्काइभ (Permanent Link)", en: "Permanent SEO archive link" },
      ],
    },
  ];

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Breadcrumb */}
      <nav className="flex items-center text-xs text-gray-500 gap-1.5 py-1">
        <Link href="/" className="hover:text-red-600 flex items-center gap-1 transition">
          <Home className="w-3.5 h-3.5" />
          <span>{t("home")}</span>
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
        <span className="font-semibold text-gray-800">{t("advertise")}</span>
      </nav>

      {/* Banner */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-10 shadow-xs">
        <span className="inline-block text-xs font-black uppercase tracking-wider px-3 py-1 rounded bg-red-100 text-red-600 mb-2">
          MEDIA KIT & ADVERTISING
        </span>
        <h1 className="text-2xl sm:text-4xl font-black text-gray-900 tracking-tight mb-3">
          {language === "np" ? "विज्ञापन तथा सहकार्य" : "Advertise with Sano Kura"}
        </h1>
        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed max-w-2xl">
          {language === "np"
            ? "नेपाल र विश्वभर छरिएर रहेका लाखौं सचेत नेपाली पाठकमाझ तपाईंको ब्रान्ड र सन्देश पुर्‍याउने सबैभन्दा प्रभावकारी डिजिटल माध्यम।"
            : "Connect your enterprise or brand with millions of highly engaged Nepali readers across Nepal and global diaspora communities."}
        </p>

        {/* Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-8 border-t border-gray-100">
          <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 text-center">
            <Users className="w-5 h-5 text-red-600 mx-auto mb-1" />
            <p className="text-xl font-black text-gray-900">
              {toNepaliNum("50")} लाख+
            </p>
            <p className="text-[11px] text-gray-500">
              {language === "np" ? "मासिक पाठक" : "Monthly Readers"}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 text-center">
            <Eye className="w-5 h-5 text-blue-600 mx-auto mb-1" />
            <p className="text-xl font-black text-gray-900">
              {toNepaliNum("1.8")} करोड+
            </p>
            <p className="text-[11px] text-gray-500">
              {language === "np" ? "मासिक पेजभ्यु" : "Monthly Pageviews"}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 text-center">
            <Globe2 className="w-5 h-5 text-green-600 mx-auto mb-1" />
            <p className="text-xl font-black text-gray-900">
              {toNepaliNum("120")}+
            </p>
            <p className="text-[11px] text-gray-500">
              {language === "np" ? "देशबाट भिजिट" : "Countries Reached"}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 text-center">
            <TrendingUp className="w-5 h-5 text-purple-600 mx-auto mb-1" />
            <p className="text-xl font-black text-gray-900">
              {toNepaliNum("65")}%
            </p>
            <p className="text-[11px] text-gray-500">
              {language === "np" ? "युवा पाठक (१८-३५)" : "Youth Demographic"}
            </p>
          </div>
        </div>
      </div>

      {/* Ad Packages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {adPackages.map((pkg, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs hover:shadow-md transition flex flex-col justify-between"
          >
            <div>
              <h3 className="font-bold text-base text-gray-900 mb-1">
                {pkg.name[language]}
              </h3>
              <p className="text-xs text-gray-500 mb-4">{pkg.desc[language]}</p>

              <div className="py-2 px-3 bg-red-50 text-red-700 font-black text-lg rounded-lg mb-4 text-center">
                {pkg.price[language]}
              </div>

              <ul className="space-y-2 text-xs text-gray-600 mb-6">
                {pkg.features.map((feat, fIdx) => (
                  <li key={fIdx} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 shrink-0" />
                    <span>{feat[language]}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Link
              href="/contact"
              className="w-full bg-gray-900 hover:bg-red-600 text-white text-center py-2.5 rounded-lg text-xs font-bold transition block"
            >
              {language === "np" ? "सम्पर्क गरी बुक गर्नुहोस्" : "Inquire & Book"}
            </Link>
          </div>
        ))}
      </div>

      {/* Direct Contact Banner */}
      <div className="bg-gray-900 text-white rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold">
            {language === "np" ? "विज्ञापन विभाग सिधा सम्पर्क:" : "Direct Advertising Desk:"}
          </h3>
          <p className="text-xs text-gray-400 mt-1">
            {language === "np"
              ? "कस्टमाइज्ड विज्ञापन योजना तथा दीर्घकालीन सम्झौताका लागि हामीलाई सम्पर्क गर्नुहोस्।"
              : "Contact us for customized brand integration and corporate packages."}
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0 text-xs">
          <a
            href="mailto:ads@sanokura.com"
            className="flex items-center gap-1.5 bg-red-600 hover:bg-red-700 text-white px-4 py-2.5 rounded-lg font-semibold transition"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>ads@sanokura.com</span>
          </a>
          <a
            href="tel:+9779801234567"
            className="flex items-center gap-1.5 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2.5 rounded-lg font-semibold transition border border-gray-700"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>+९७७-९८०१२३४५६७</span>
          </a>
        </div>
      </div>
    </div>
  );
}
