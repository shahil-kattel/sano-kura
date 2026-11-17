"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type Language = "np" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  toNepaliNum: (num: number | string) => string;
  t: (key: string) => string;
}

const nepaliDigits = ["०", "१", "२", "३", "४", "५", "६", "७", "८", "९"];

export const toNepaliNum = (num: number | string): string => {
  return String(num).replace(/[0-9]/g, (match) => nepaliDigits[parseInt(match, 10)]);
};

const translations: Record<string, { np: string; en: string }> = {
  // Brand
  siteName: { np: "सानो कुरा", en: "Sano Kura" },
  siteTagline: {
    np: "सत्य, तथ्य र निष्पक्ष समाचारको संवाहक",
    en: "True, Objective & Unbiased News Portal",
  },

  // Navigation
  home: { np: "गृहपृष्ठ", en: "Home" },
  politics: { np: "राजनीति", en: "Politics" },
  society: { np: "समाज", en: "Society" },
  economy: { np: "अर्थ / वाणिज्य", en: "Economy" },
  sports: { np: "खेलकुद", en: "Sports" },
  opinion: { np: "विचार", en: "Opinion" },
  entertainment: { np: "मनोरञ्जन", en: "Entertainment" },
  world: { np: "विश्व", en: "World" },
  technology: { np: "प्रविधि", en: "Tech" },
  lifestyle: { np: "जीवनशैली", en: "Lifestyle" },
  gallery: { np: "फोटो / भिडियो", en: "Gallery" },
  allCategories: { np: "सबै विधा", en: "All Sections" },
  epaper: { np: "ई-कागज", en: "E-Paper" },

  // Header & Widgets
  breakingNews: { np: "ताजा अपडेट", en: "Breaking News" },
  trending: { np: "ट्रेन्डिङ", en: "Trending" },
  searchPlaceholder: {
    np: "समाचार, विषय वा व्यक्ति खोज्नुहोस्...",
    en: "Search news, topics or people...",
  },
  search: { np: "खोज्नुहोस्", en: "Search" },
  weather: { np: "मौसम", en: "Weather" },
  forex: { np: "विदेशी मुद्रा", en: "Forex" },
  bullion: { np: "सुन/चाँदी", en: "Gold/Silver" },
  gold: { np: "छापावाल सुन", en: "Fine Gold" },
  silver: { np: "चाँदी", en: "Silver" },
  nepse: { np: "नेप्से", en: "NEPSE" },
  bookmarks: { np: "सुरक्षित समाचार", en: "Saved News" },
  darkMode: { np: "डार्क मोड", en: "Dark Mode" },
  lightMode: { np: "लाइट मोड", en: "Light Mode" },
  switchToEng: { np: "English", en: "नेपाली" },

  // Sections
  leadNews: { np: "प्रमुख समाचार", en: "Lead Story" },
  specialNews: { np: "विशेष समाचार", en: "Special News" },
  mostRead: { np: "सर्वाधिक पढिएका", en: "Most Read" },
  latestNews: { np: "ताजा समाचार", en: "Latest Updates" },
  editorPicks: { np: "सम्पादकीय छनोट", en: "Editor's Picks" },
  provinceNews: { np: "प्रदेश समाचार", en: "Provincial News" },
  shareMarket: { np: "सेयर बजार", en: "Stock Market" },
  interviews: { np: "अन्तर्वार्ता", en: "Interviews" },
  relatedNews: { np: "सम्बन्धित समाचार", en: "Related News" },
  viewAll: { np: "सबै हेर्नुहोस्", en: "View All" },
  readMore: { np: "पूरा पढ्नुहोस्", en: "Read More" },
  minuteAgo: { np: "मिनेट अघि", en: "mins ago" },
  hoursAgo: { np: "घण्टा अघि", en: "hours ago" },
  daysAgo: { np: "दिन अघि", en: "days ago" },

  // Article page
  fontSize: { np: "अक्षर आकार", en: "Font Size" },
  share: { np: "सेयर गर्नुहोस्", en: "Share" },
  listenNews: { np: "समाचार सुन्नुहोस्", en: "Listen Article" },
  playing: { np: "वाचन हुँदैछ...", en: "Playing audio..." },
  paused: { np: "रोकिएको छ", en: "Paused" },
  comments: { np: "प्रतिक्रियाहरू", en: "Comments" },
  leaveComment: { np: "प्रतिक्रिया दिनुहोस्", en: "Leave a Comment" },
  yourName: { np: "तपाईंको नाम", en: "Your Name" },
  yourComment: { np: "तपाईंको प्रतिक्रिया लेख्नुहोस्...", en: "Write your comment here..." },
  submitComment: { np: "प्रतिक्रिया पठाउनुहोस्", en: "Submit Comment" },
  copyLink: { np: "लिङ्क कपी", en: "Copy Link" },
  copied: { np: "कपी भयो!", en: "Copied!" },
  saveArticle: { np: "सुरक्षित गर्नुहोस्", en: "Save Story" },
  saved: { np: "सुरक्षित भयो", en: "Saved" },

  // Footer & Corporate
  aboutUs: { np: "हाम्रो बारेमा", en: "About Us" },
  contactUs: { np: "सम्पर्क", en: "Contact Us" },
  editorialTeam: { np: "सम्पादकीय टिम", en: "Editorial Team" },
  advertise: { np: "विज्ञापन", en: "Advertise" },
  privacyPolicy: { np: "गोपनीयता नीति", en: "Privacy Policy" },
  termsOfService: { np: "प्रयोगका सर्तहरू", en: "Terms of Service" },
  copyright: {
    np: "सर्वाधिकार सुरक्षित © सानो कुरा मिडिया प्रा.लि.",
    en: "All rights reserved © Sano Kura Media Pvt. Ltd.",
  },
  pressCouncil: {
    np: "प्रेस काउन्सिल दर्ता नं. १४२५/०८०-८१ | सूचना तथा प्रसारण विभाग दर्ता नं. २१३०/०७९-८०",
    en: "Press Council Regd. No: 1425/080-81 | Dept. of Information & Broadcasting Regd. No: 2130/079-80",
  },
  newsletterTitle: {
    np: "हरेक बिहान ताजा खबर तपाईंको इनबक्समा",
    en: "Get daily morning briefing in your inbox",
  },
  subscribe: { np: "सदस्य बन्नुहोस्", en: "Subscribe" },
  emailPlaceholder: { np: "तपाईंको इमेल ठेगाना...", en: "Enter your email..." },
};

const LanguageContext = createContext<LanguageContextType>({
  language: "np",
  setLanguage: () => {},
  toggleLanguage: () => {},
  toNepaliNum: (n) => String(n),
  t: (k) => k,
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>("np");

  useEffect(() => {
    const saved = localStorage.getItem("sano_kura_lang") as Language;
    if (saved === "np" || saved === "en") {
      setLanguageState(saved);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== "undefined") {
      localStorage.setItem("sano_kura_lang", lang);
    }
  };

  const toggleLanguage = () => {
    const next = language === "np" ? "en" : "np";
    setLanguage(next);
  };

  const t = (key: string): string => {
    if (translations[key]) {
      return translations[key][language];
    }
    return key;
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        toNepaliNum: language === "np" ? toNepaliNum : (n) => String(n),
        t,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
