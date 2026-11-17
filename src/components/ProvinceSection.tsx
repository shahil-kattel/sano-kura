"use client";

import React, { useState } from "react";
import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { NEWS_ARTICLES } from "@/data/newsData";

interface ProvinceTab {
  id: "koshi" | "madhesh" | "bagmati" | "gandaki" | "lumbini" | "karnali" | "sudurpashchim";
  name: { np: string; en: string };
  capital: { np: string; en: string };
}

const PROVINCES: ProvinceTab[] = [
  { id: "bagmati", name: { np: "बागमती", en: "Bagmati" }, capital: { np: "हेटौँडा", en: "Hetauda" } },
  { id: "koshi", name: { np: "कोशी", en: "Koshi" }, capital: { np: "विराटनगर", en: "Biratnagar" } },
  { id: "madhesh", name: { np: "मधेश", en: "Madhesh" }, capital: { np: "जनकपुर", en: "Janakpur" } },
  { id: "gandaki", name: { np: "गण्डकी", en: "Gandaki" }, capital: { np: "पोखरा", en: "Pokhara" } },
  { id: "lumbini", name: { np: "लुम्बिनी", en: "Lumbini" }, capital: { np: "देउखुरी", en: "Deukhuri" } },
  { id: "karnali", name: { np: "कर्णाली", en: "Karnali" }, capital: { np: "वीरेन्द्रनगर", en: "Birendranagar" } },
  { id: "sudurpashchim", name: { np: "सुदूरपश्चिम", en: "Sudurpashchim" }, capital: { np: "गोदावरी", en: "Godawari" } },
];

export const ProvinceSection: React.FC = () => {
  const { language, t } = useLanguage();
  const [activeProvince, setActiveProvince] = useState<ProvinceTab["id"]>("bagmati");

  const filteredNews = NEWS_ARTICLES.filter(
    (a) => a.province === activeProvince || (!a.province && activeProvince === "bagmati")
  ).slice(0, 3);

  const currentProvinceInfo = PROVINCES.find((p) => p.id === activeProvince);

  return (
    <section className="my-10 bg-white rounded-2xl border border-gray-200 p-5 sm:p-7 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-gray-100 gap-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-red-100 text-red-600 flex items-center justify-center">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-black text-gray-900 tracking-tight">
              {t("provinceNews")}
            </h2>
            <p className="text-xs text-gray-500">
              {language === "np"
                ? `सातै प्रदेशका प्रमुख घटनाक्रम र स्थानीय समाचार (${currentProvinceInfo?.name[language]} प्रदेश)`
                : `News and developments from Nepal's 7 Provinces (${currentProvinceInfo?.name[language]} Province)`}
            </p>
          </div>
        </div>

        {/* Province selector pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
          {PROVINCES.map((prov) => (
            <button
              key={prov.id}
              onClick={() => setActiveProvince(prov.id)}
              className={`px-3 py-1 text-xs font-semibold rounded-full whitespace-nowrap transition ${
                activeProvince === prov.id
                  ? "bg-red-600 text-white shadow-xs"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {prov.name[language]}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of news for active province */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        {filteredNews.length > 0 ? (
          filteredNews.map((article) => (
            <div
              key={article.id}
              className="group flex flex-col bg-gray-50 rounded-xl overflow-hidden border border-gray-100 hover:border-red-200 transition"
            >
              <div className="relative h-44 w-full overflow-hidden bg-gray-200">
                <img
                  src={article.image}
                  alt={article.title[language]}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
                <span className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded">
                  {currentProvinceInfo?.name[language]}
                </span>
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <Link href={`/news/${article.slug}`}>
                    <h3 className="text-sm font-bold text-gray-900 group-hover:text-red-600 transition leading-snug line-clamp-2 mb-2">
                      {article.title[language]}
                    </h3>
                  </Link>
                  <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                    {article.excerpt[language]}
                  </p>
                </div>
                <div className="flex items-center justify-between text-[11px] text-gray-500 pt-3 border-t border-gray-200/60 mt-3">
                  <span>{article.author.name[language]}</span>
                  <Link
                    href={`/news/${article.slug}`}
                    className="text-red-600 font-semibold flex items-center gap-0.5 hover:underline"
                  >
                    <span>{t("readMore")}</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-3 text-center py-8 text-gray-500 text-sm">
            {language === "np"
              ? "यस प्रदेशका ताजा समाचार छिट्टै अपडेट हुनेछ।"
              : "Updates for this province will be published shortly."}
          </div>
        )}
      </div>
    </section>
  );
};
