"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowUp, Mail, Shield, Check } from "lucide-react";
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
    <footer className="w-full bg-white border-t border-hairline mt-20 text-slate text-xs font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-hairline">
          {/* Col 1: Brand & Bio (5 Cols) */}
          <div className="md:col-span-5 space-y-4">
            <Link href="/" className="inline-block">
              <span className="font-editorial text-3xl font-bold tracking-tight text-ink hover:text-accent transition">
                {language === "np" ? "सानोकुरा" : "SANOKURAA"}
              </span>
            </Link>
            <p className="text-xs text-slate leading-relaxed max-w-sm">
              {language === "np"
                ? "स्वतन्त्र सम्पादकीय स्टुडियो, डिजिटल अनुसन्धान तथा भिजुअल स्टोरीटेलिङ। काठमाडौँ, नेपाल।"
                : "Independent editorial atelier, investigative dispatches, and creative storytelling based in Kathmandu, Nepal."}
            </p>
            <div className="pt-2 flex items-center gap-4 font-mono text-[11px] text-ink">
              <span>Press Council Regd: १४२५/०८०-८१</span>
              <span>•</span>
              <span>PAN: ६०९८३७२१०</span>
            </div>
          </div>

          {/* Col 2: Navigation Beats (3 Cols) */}
          <div className="md:col-span-3 space-y-3 font-mono text-xs">
            <p className="font-bold uppercase tracking-wider text-ink text-[11px]">
              Editorial Beats
            </p>
            <ul className="space-y-2 text-slate">
              <li>
                <Link href="/#reporting" className="hover:text-ink transition">
                  Investigative Reporting
                </Link>
              </li>
              <li>
                <Link href="/#articles" className="hover:text-ink transition">
                  Articles & Op-Ed
                </Link>
              </li>
              <li>
                <Link href="/#photo-stories" className="hover:text-ink transition">
                  Photo Stories & Archives
                </Link>
              </li>
              <li>
                <Link href="/#reels" className="hover:text-ink transition">
                  Vertical Field Shorts
                </Link>
              </li>
              <li>
                <Link href="/#services" className="hover:text-ink transition">
                  Studio Media Services
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Dispatch Newsletter (4 Cols) */}
          <div className="md:col-span-4 space-y-3">
            <p className="font-mono font-bold uppercase tracking-wider text-ink text-[11px]">
              Weekly Editorial Dispatch
            </p>
            <p className="text-xs text-slate">
              Curated field reporting, visual essays, and critical essays delivered to your inbox every Sunday morning.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2 pt-1">
              <div className="flex items-center gap-2">
                <input
                  type="email"
                  required
                  placeholder="name@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-sanok border border-hairline rounded-lg px-3 py-2 text-xs text-ink placeholder:text-slate focus:outline-none focus:border-ink flex-1"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-ink hover:bg-black text-white text-xs font-mono font-bold rounded-lg transition shrink-0 cursor-pointer"
                >
                  {subscribed ? "Subscribed!" : "Subscribe"}
                </button>
              </div>
              {subscribed && (
                <p className="text-[11px] text-emerald-600 font-mono flex items-center gap-1">
                  <Check className="w-3 h-3" />
                  <span>Welcome to the Sanokuraa readership circle.</span>
                </p>
              )}
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] text-slate">
          <p>© {new Date().getFullYear()} Sanokuraa Media Pvt. Ltd. All rights reserved.</p>

          <div className="flex items-center gap-6">
            <Link href="/admin" className="hover:text-ink transition inline-flex items-center gap-1">
              <Shield className="w-3 h-3 text-accent" />
              <span>Admin CMS</span>
            </Link>
            <button
              onClick={scrollToTop}
              className="hover:text-ink transition inline-flex items-center gap-1 cursor-pointer"
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
