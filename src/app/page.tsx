"use client";

import React from "react";
import Link from "next/link";
import {
  Flame,
  ArrowRight,
  TrendingUp,
  Bookmark,
  Sparkles,
  Award,
  Video,
  Camera,
  Layers,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useNews } from "@/context/NewsContext";
import { NewsCard } from "@/components/NewsCard";
import { ProvinceSection } from "@/components/ProvinceSection";
import { MarketWidgets } from "@/components/MarketWidgets";

export default function HomePage() {
  const { language, t } = useLanguage();
  const { articles } = useNews();

  const leadArticle = articles.find((a) => a.isLead) || articles[0];
  const trendingArticles = [...articles].sort((a, b) => b.views - a.views).slice(0, 5);

  // Category specific articles
  const politicsArticles = articles.filter((a) => a.category === "politics");
  const economyArticles = articles.filter((a) => a.category === "economy");
  const sportsArticles = articles.filter((a) => a.category === "sports");
  const opinionArticles = articles.filter((a) => a.category === "opinion");
  const entArticles = articles.filter((a) => a.category === "entertainment");
  const techArticles = articles.filter((a) => a.category === "technology");
  const lifeArticles = articles.filter((a) => a.category === "lifestyle");
  const societyArticles = articles.filter((a) => a.category === "society");

  // Secondary highlights (excluding lead)
  const secondaryArticles = articles.filter((a) => a.id !== leadArticle?.id).slice(0, 3);

  return (
    <div className="space-y-10">
      {/* 1. LEAD STORY & TRENDING SIDEBAR */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Lead Main Story (2 Cols) */}
        <div className="lg:col-span-2">
          <NewsCard article={leadArticle} variant="hero" />
        </div>

        {/* Trending / Most Read Sidebar (1 Col) */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 mb-2 border-b-2 border-red-600">
              <h2 className="text-base font-extrabold text-gray-900 flex items-center gap-1.5">
                <Flame className="w-5 h-5 text-red-600" />
                <span>{t("mostRead")}</span>
              </h2>
              <span className="text-xs bg-red-100 text-red-700 font-bold px-2 py-0.5 rounded-full">
                २४ घण्टा
              </span>
            </div>

            <div className="divide-y divide-gray-100">
              {trendingArticles.map((article, idx) => (
                <NewsCard
                  key={article.id}
                  article={article}
                  variant="trending"
                  rankingNumber={idx + 1}
                />
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-gray-100 text-center">
            <Link
              href="/category/politics"
              className="text-xs font-semibold text-red-600 hover:text-red-700 inline-flex items-center gap-1"
            >
              <span>{t("viewAll")}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* 2. SECONDARY HIGHLIGHTS GRID */}
      <section>
        <div className="flex items-center justify-between mb-4 border-b border-gray-200 pb-2">
          <h2 className="text-lg font-black text-gray-900 flex items-center gap-2">
            <span className="w-3 h-3 bg-red-600 rounded-xs" />
            <span>{t("specialNews")}</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {secondaryArticles.map((article) => (
            <NewsCard key={article.id} article={article} variant="vertical" />
          ))}
        </div>
      </section>

      {/* 3. POLITICS SECTION */}
      <section className="bg-white rounded-2xl border border-gray-200 p-5 sm:p-7 shadow-xs">
        <div className="flex items-center justify-between pb-3 mb-6 border-b-2 border-red-600">
          <div className="flex items-center gap-2">
            <div className="w-3 h-6 bg-red-600 rounded-xs" />
            <h2 className="text-xl font-black text-gray-900 tracking-tight">
              {t("politics")}
            </h2>
          </div>
          <Link
            href="/category/politics"
            className="text-xs font-bold text-red-600 hover:text-red-700 flex items-center gap-1 hover:translate-x-0.5 transition"
          >
            <span>{t("viewAll")}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {politicsArticles.slice(0, 3).map((article) => (
            <NewsCard key={article.id} article={article} variant="vertical" />
          ))}
        </div>
      </section>

      {/* 4. PROVINCIAL NEWS INTERACTIVE WIDGET */}
      <ProvinceSection />

      {/* 5. ECONOMY & LIVE MARKET WIDGETS */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Economy Articles (2 Cols) */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-200 p-5 sm:p-7 shadow-xs">
          <div className="flex items-center justify-between pb-3 mb-6 border-b-2 border-green-600">
            <div className="flex items-center gap-2">
              <div className="w-3 h-6 bg-green-600 rounded-xs" />
              <h2 className="text-xl font-black text-gray-900 tracking-tight">
                {t("economy")}
              </h2>
            </div>
            <Link
              href="/category/economy"
              className="text-xs font-bold text-green-700 hover:text-green-800 flex items-center gap-1 hover:translate-x-0.5 transition"
            >
              <span>{t("viewAll")}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-4">
            {economyArticles.map((article) => (
              <NewsCard key={article.id} article={article} variant="horizontal" />
            ))}
            {/* Additional Society / Infra in Economy context */}
            {societyArticles.slice(0, 1).map((article) => (
              <NewsCard key={article.id} article={article} variant="horizontal" />
            ))}
          </div>
        </div>

        {/* Live Market Indices Widget (1 Col) */}
        <div className="lg:col-span-1">
          <MarketWidgets />
        </div>
      </section>

      {/* 6. SPORTS (खेलकुद) SECTION */}
      <section className="bg-white rounded-2xl border border-gray-200 p-5 sm:p-7 shadow-xs">
        <div className="flex items-center justify-between pb-3 mb-6 border-b-2 border-orange-600">
          <div className="flex items-center gap-2">
            <div className="w-3 h-6 bg-orange-600 rounded-xs" />
            <h2 className="text-xl font-black text-gray-900 tracking-tight">
              {t("sports")}
            </h2>
          </div>
          <Link
            href="/category/sports"
            className="text-xs font-bold text-orange-600 hover:text-orange-700 flex items-center gap-1 hover:translate-x-0.5 transition"
          >
            <span>{t("viewAll")}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sportsArticles.map((article) => (
            <NewsCard key={article.id} article={article} variant="vertical" />
          ))}
        </div>
      </section>

      {/* 7. OPINION & EDITORIAL (विचार र दृष्टिकोण) */}
      <section className="bg-gradient-to-br from-purple-50 via-white to-indigo-50 border border-purple-100 rounded-2xl p-6 sm:p-8 shadow-xs">
        <div className="flex items-center justify-between pb-3 mb-6 border-b border-purple-200">
          <div className="flex items-center gap-2">
            <Award className="w-6 h-6 text-purple-700" />
            <div>
              <h2 className="text-xl font-black text-gray-900 tracking-tight">
                {t("opinion")}
              </h2>
              <p className="text-xs text-purple-800">
                {language === "np"
                  ? "विद्वान, विश्लेषक र स्तम्भकारका दृष्टिकोणहरू"
                  : "Insightful perspectives from renowned analysts & thinkers"}
              </p>
            </div>
          </div>
          <Link
            href="/category/opinion"
            className="text-xs font-bold text-purple-700 hover:text-purple-900 flex items-center gap-1 hover:translate-x-0.5 transition"
          >
            <span>{t("viewAll")}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {opinionArticles.map((article) => (
            <div
              key={article.id}
              className="bg-white rounded-xl p-5 border border-purple-100 shadow-xs hover:shadow-md transition flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <img
                    src={article.author.avatar}
                    alt={article.author.name[language]}
                    className="w-12 h-12 rounded-full object-cover border-2 border-purple-300"
                  />
                  <div>
                    <h4 className="font-bold text-sm text-gray-900">
                      {article.author.name[language]}
                    </h4>
                    <p className="text-xs text-purple-700 font-medium">
                      {article.author.role[language]}
                    </p>
                  </div>
                </div>

                <Link href={`/news/${article.slug}`}>
                  <h3 className="text-base font-bold text-gray-900 hover:text-purple-700 transition leading-snug line-clamp-2 mb-2">
                    {article.title[language]}
                  </h3>
                </Link>
                <p className="text-xs text-gray-600 line-clamp-3 leading-relaxed">
                  {article.excerpt[language]}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                <span>{article.dateNep}</span>
                <Link
                  href={`/news/${article.slug}`}
                  className="text-purple-700 font-semibold flex items-center gap-0.5 hover:underline"
                >
                  <span>{t("readMore")}</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. ENTERTAINMENT, TECH & LIFESTYLE 3-COLUMN SHOWCASE */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Entertainment */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-xs">
          <div className="flex items-center justify-between pb-2 mb-4 border-b-2 border-pink-500">
            <h3 className="font-black text-base text-gray-900">{t("entertainment")}</h3>
            <Link
              href="/category/entertainment"
              className="text-xs text-pink-600 font-bold hover:underline"
            >
              {t("viewAll")}
            </Link>
          </div>
          {entArticles.slice(0, 1).map((article) => (
            <NewsCard key={article.id} article={article} variant="vertical" />
          ))}
        </div>

        {/* Technology */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-xs">
          <div className="flex items-center justify-between pb-2 mb-4 border-b-2 border-teal-500">
            <h3 className="font-black text-base text-gray-900">{t("technology")}</h3>
            <Link
              href="/category/technology"
              className="text-xs text-teal-600 font-bold hover:underline"
            >
              {t("viewAll")}
            </Link>
          </div>
          {techArticles.slice(0, 1).map((article) => (
            <NewsCard key={article.id} article={article} variant="vertical" />
          ))}
        </div>

        {/* Lifestyle */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-xs">
          <div className="flex items-center justify-between pb-2 mb-4 border-b-2 border-amber-500">
            <h3 className="font-black text-base text-gray-900">{t("lifestyle")}</h3>
            <Link
              href="/category/lifestyle"
              className="text-xs text-amber-600 font-bold hover:underline"
            >
              {t("viewAll")}
            </Link>
          </div>
          {lifeArticles.slice(0, 1).map((article) => (
            <NewsCard key={article.id} article={article} variant="vertical" />
          ))}
        </div>
      </section>

      {/* 9. PHOTO & VIDEO MULTIMEDIA SPOTLIGHT */}
      <section className="bg-gray-900 text-white rounded-2xl p-6 sm:p-8 shadow-md">
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-gray-800">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-red-600/20 text-red-500 flex items-center justify-center">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-black text-white">{t("gallery")}</h2>
              <p className="text-xs text-gray-400">
                {language === "np"
                  ? "तस्बिर र भिडियोमा कैद भएका नेपालका रोमाञ्चक क्षणहरू"
                  : "Captivating moments and stories captured through lens and video"}
              </p>
            </div>
          </div>
          <Link
            href="/gallery"
            className="text-xs font-bold text-red-400 hover:text-red-300 flex items-center gap-1 hover:translate-x-0.5 transition"
          >
            <span>{t("viewAll")}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="group relative rounded-xl overflow-hidden bg-gray-800 h-60">
            <img
              src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80"
              alt="Everest"
              className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute top-3 left-3 bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1">
              <Camera className="w-3 h-3" />
              <span>फोटो कथा</span>
            </div>
            <div className="absolute bottom-3 inset-x-3 text-white">
              <Link href="/gallery" className="text-sm font-bold hover:text-yellow-300 transition line-clamp-2">
                {language === "np"
                  ? "सगरमाथा आधार शिविरमा हिउँदको स्वागत: शेर्पा जीवनशैलीको सौन्दर्य"
                  : "Welcoming Winter at Everest Base Camp: The Grace of Sherpa Life"}
              </Link>
            </div>
          </div>

          <div className="group relative rounded-xl overflow-hidden bg-gray-800 h-60">
            <img
              src="https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=800&q=80"
              alt="Cricket"
              className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute top-3 left-3 bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1">
              <Video className="w-3 h-3" />
              <span>भिडियो झलक</span>
            </div>
            <div className="absolute bottom-3 inset-x-3 text-white">
              <Link href="/gallery" className="text-sm font-bold hover:text-yellow-300 transition line-clamp-2">
                {language === "np"
                  ? "कीर्तिपुरमा नेपाली समर्थकहरूको अनौठो क्रेज र भव्य जित उत्सव"
                  : "Rapturous Fervor: Kirtipur Fans Celebrate Tri-Series Triumph"}
              </Link>
            </div>
          </div>

          <div className="group relative rounded-xl overflow-hidden bg-gray-800 h-60">
            <img
              src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"
              alt="Annapurna"
              className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute top-3 left-3 bg-green-600 text-white text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1">
              <Camera className="w-3 h-3" />
              <span>प्रकृति</span>
            </div>
            <div className="absolute bottom-3 inset-x-3 text-white">
              <Link href="/gallery" className="text-sm font-bold hover:text-yellow-300 transition line-clamp-2">
                {language === "np"
                  ? "अन्नपूर्ण पदमार्गमा नयाँ इको-रुट: प्रकृतिको न्यानो काख"
                  : "Alternative Eco-Trails on the Annapurna Circuit"}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
