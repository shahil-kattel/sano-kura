"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle,
  ArrowUp,
  ShieldCheck,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { CATEGORIES } from "@/data/categories";

export const Footer: React.FC = () => {
  const { language, t } = useLanguage();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-gray-900 text-gray-300 border-t-4 border-red-600">
      {/* Newsletter Strip */}
      <div className="bg-gray-800 border-b border-gray-700 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-center md:text-left">
            <div className="w-10 h-10 rounded-full bg-red-600/20 text-red-500 flex items-center justify-center shrink-0">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">{t("newsletterTitle")}</h3>
              <p className="text-xs text-gray-400">
                {language === "np"
                  ? "महत्वपूर्ण र आधिकारिक समाचारको दैनिक सारांश निःशुल्क पाउनुहोस्।"
                  : "Get vital curated news briefings directly delivered each morning."}
              </p>
            </div>
          </div>

          <form onSubmit={handleSubscribe} className="flex w-full md:w-auto max-w-md gap-2">
            <input
              type="email"
              required
              placeholder={t("emailPlaceholder")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-gray-900 border border-gray-700 text-white text-sm px-4 py-2 rounded-lg focus:outline-none focus:border-red-500 flex-1"
            />
            <button
              type="submit"
              className="bg-red-600 hover:bg-red-700 text-white font-semibold text-sm px-5 py-2 rounded-lg transition flex items-center gap-1.5 shrink-0"
            >
              <span>{t("subscribe")}</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>

          {subscribed && (
            <div className="w-full text-center text-xs text-green-400 flex items-center justify-center gap-1">
              <CheckCircle className="w-4 h-4" />
              <span>
                {language === "np"
                  ? "धन्यवाद! तपाईंको इमेल सफलतापूर्वक दर्ता भएको छ।"
                  : "Thank you! You have successfully subscribed."}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Col 1: About & Registration */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-600 text-white rounded-xl flex items-center justify-center font-black text-2xl shadow-md">
                सा
              </div>
              <span className="text-2xl font-black tracking-tight text-white">
                {language === "np" ? "सानो कुरा" : "SANO KURA"}
              </span>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">
              {language === "np"
                ? "सानो कुरा मिडिया प्रा.लि. द्वारा सञ्चालित नेपालको आधिकारिक, निष्पक्ष र द्रुत डिजिटल समाचार पोर्टल। राष्ट्रिय तथा अन्तर्राष्ट्रिय घटनाक्रमको सत्यतथ्य संप्रेषण हाम्रो मुख्य धर्म हो।"
                : "Sano Kura Media Pvt. Ltd. is a premier digital news organization delivering independent, principled, and fact-driven reporting on national and global affairs."}
            </p>
            <div className="bg-gray-800/80 p-3 rounded-lg border border-gray-700 text-[11px] text-gray-400 space-y-1">
              <div className="flex items-center gap-1.5 text-gray-300 font-semibold">
                <ShieldCheck className="w-4 h-4 text-green-400" />
                <span>
                  {language === "np" ? "प्रेस काउन्सिल प्रमाणीकरण" : "Press Council Certified"}
                </span>
              </div>
              <p>{t("pressCouncil")}</p>
            </div>
          </div>

          {/* Col 2: Categories */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-red-500 pl-2">
              {t("allCategories")}
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {CATEGORIES.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/category/${cat.slug}`}
                  className="hover:text-red-400 transition hover:translate-x-1 inline-block py-0.5"
                >
                  {cat.name[language]}
                </Link>
              ))}
              <Link
                href="/gallery"
                className="hover:text-red-400 transition hover:translate-x-1 inline-block py-0.5 text-yellow-300"
              >
                {t("gallery")}
              </Link>
            </div>
          </div>

          {/* Col 3: Useful Links & Corporate */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-red-500 pl-2">
              {language === "np" ? "महत्वपूर्ण पृष्ठहरू" : "Useful Links"}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/about" className="hover:text-red-400 transition block">
                  {t("aboutUs")}
                </Link>
              </li>
              <li>
                <Link href="/team" className="hover:text-red-400 transition block">
                  {t("editorialTeam")}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-red-400 transition block">
                  {t("contactUs")}
                </Link>
              </li>
              <li>
                <Link href="/advertise" className="hover:text-red-400 transition block">
                  {t("advertise")}
                </Link>
              </li>
              <li>
                <Link href="/epaper" className="hover:text-red-400 transition block">
                  {t("epaper")}
                </Link>
              </li>
              <li>
                <Link href="/bookmarks" className="hover:text-red-400 transition block">
                  {t("bookmarks")}
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-red-400 transition block">
                  {t("privacyPolicy")}
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-red-400 transition block">
                  {t("termsOfService")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Social */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-red-500 pl-2">
              {t("contactUs")}
            </h4>
            <div className="space-y-2.5 text-xs text-gray-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <span>
                  {language === "np"
                    ? "अनामनगर, काठमाडौँ, नेपाल"
                    : "Anamnagar, Kathmandu, Nepal"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-red-500 shrink-0" />
                <span>+९७७-१-४१०२९३८ / ९८०१२३४५६७</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-red-500 shrink-0" />
                <span>news@sanokura.com, info@sanokura.com</span>
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold text-white mb-2">
                {language === "np" ? "हामीसँग जोडिनुहोस्:" : "Connect with us:"}
              </p>
              <div className="flex items-center gap-2 text-gray-400">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-gray-800 hover:bg-blue-600 hover:text-white flex items-center justify-center transition"
                  aria-label="Facebook"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-gray-800 hover:bg-sky-500 hover:text-white flex items-center justify-center transition"
                  aria-label="Twitter / X"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-gray-800 hover:bg-red-600 hover:text-white flex items-center justify-center transition"
                  aria-label="YouTube"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-gray-800 hover:bg-pink-600 hover:text-white flex items-center justify-center transition"
                  aria-label="Instagram"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
          <p>{t("copyright")}</p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-gray-300">
              {t("privacyPolicy")}
            </Link>
            <span>•</span>
            <Link href="/terms" className="hover:text-gray-300">
              {t("termsOfService")}
            </Link>
            <span>•</span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 text-red-400 hover:text-red-300 transition"
            >
              <span>{language === "np" ? "माथि जानुहोस्" : "Back to Top"}</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
