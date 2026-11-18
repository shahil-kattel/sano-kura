"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowUp, Mail, Shield, Check, ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export const Footer: React.FC = () => {
  const { language } = useLanguage();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full bg-white border-t border-neutral-200 mt-24 text-neutral-600 text-xs font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-14 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-14 border-b border-neutral-200">
          {/* Col 1: Brand & Colophon (5 Cols) */}
          <div className="md:col-span-5 space-y-4">
            <Link href="/" className="inline-block">
              <span className="font-editorial text-3xl sm:text-4xl font-normal tracking-tight text-neutral-950 hover:text-accent transition">
                {language === "np" ? "सानोकुरा" : "SANOKURAA"}
              </span>
            </Link>
            <p className="text-xs text-neutral-500 leading-relaxed max-w-sm font-sans">
              {language === "np"
                ? "स्वतन्त्र सम्पादकीय स्टुडियो, डिजिटल अनुसन्धान तथा भिजुअल स्टोरीटेलिङ। काठमाडौँ, नेपाल।"
                : "An independent editorial atelier, investigative ground dispatches, and visual archives documenting life and culture across Nepal."}
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-3 font-mono text-[11px] text-neutral-400">
              <span>Press Council Regd: १४२५/०८०-८१</span>
              <span>•</span>
              <span>PAN: ६०९८३७२१०</span>
            </div>
          </div>

          {/* Col 2: Navigation Beats (3 Cols) */}
          <div className="md:col-span-3 space-y-3 font-mono text-xs">
            <p className="font-bold uppercase tracking-[0.2em] text-neutral-950 text-[10px]">
              EDITORIAL ARCHIVES
            </p>
            <ul className="space-y-2.5 text-neutral-500">
              <li>
                <Link href="/#reporting" className="hover:text-neutral-950 transition">
                  01 / Field Reporting
                </Link>
              </li>
              <li>
                <Link href="/#articles" className="hover:text-neutral-950 transition">
                  02 / Critical Essays & Op-Ed
                </Link>
              </li>
              <li>
                <Link href="/#reels" className="hover:text-neutral-950 transition">
                  03 / Vertical Field Shorts
                </Link>
              </li>
              <li>
                <Link href="/#photo-stories" className="hover:text-neutral-950 transition">
                  04 / Spatial Photo Stories
                </Link>
              </li>
              <li>
                <Link href="/#services" className="hover:text-neutral-950 transition">
                  05 / Atelier Media Production
                </Link>
              </li>
              <li>
                <Link href="/#about" className="hover:text-neutral-950 transition">
                  06 / Manifesto & Collective
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Weekly Dispatch Newsletter (4 Cols) */}
          <div className="md:col-span-4 space-y-4">
            <p className="font-mono font-bold uppercase tracking-[0.2em] text-neutral-950 text-[10px]">
              THE WEEKLY DISPATCH
            </p>
            <p className="text-xs text-neutral-500 leading-relaxed font-sans">
              Curated investigative reporting, spatial photo essays, and cultural criticism delivered to your inbox every Sunday morning.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2 pt-2">
              <div className="flex items-center border-b border-neutral-900 pb-1.5 gap-2">
                <input
                  type="email"
                  required
                  placeholder="name@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-transparent text-xs text-neutral-900 placeholder:text-neutral-400 focus:outline-none flex-1 font-sans"
                />
                <button
                  type="submit"
                  className="text-neutral-900 hover:text-accent text-xs font-mono font-medium transition cursor-pointer inline-flex items-center gap-1"
                >
                  <span>{subscribed ? "JOINED" : "SUBSCRIBE"}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
              {subscribed && (
                <p className="text-[11px] text-emerald-600 font-mono flex items-center gap-1 pt-1">
                  <Check className="w-3 h-3" />
                  <span>Welcome to the Sanokuraa readership circle.</span>
                </p>
              )}
            </form>
          </div>
        </div>

        {/* Bottom Bar: Legal & Coordinates */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] text-neutral-400">
          <p>© {new Date().getFullYear()} Sanokuraa Media Collective. Kathmandu, Nepal.</p>

          <div className="flex items-center gap-6">
            <Link href="/admin" className="hover:text-neutral-950 transition inline-flex items-center gap-1">
              <Shield className="w-3 h-3 text-accent" />
              <span>Admin CMS</span>
            </Link>
            <button
              onClick={scrollToTop}
              className="hover:text-neutral-950 transition inline-flex items-center gap-1 cursor-pointer"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
