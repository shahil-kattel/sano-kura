"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import {
  NEWS_ARTICLES as INITIAL_ARTICLES,
  NewsArticle,
} from "@/data/newsData";
import { CATEGORIES as INITIAL_CATEGORIES, CategoryInfo } from "@/data/categories";

export interface MarketData {
  nepse: {
    index: string;
    change: string;
    percent: string;
    turnover: string;
    isUp: boolean;
  };
  gold: {
    fineTola: string;
    fine10g: string;
    tejabiTola: string;
    silverTola: string;
    change: string;
    isUp: boolean;
  };
  forex: Array<{
    code: string;
    name: string;
    buy: string;
    sell: string;
    isUp: boolean;
  }>;
}

export interface SiteSettings {
  siteNameNp: string;
  siteNameEn: string;
  taglineNp: string;
  taglineEn: string;
  pressCouncilRegd: string;
  infoDeptRegd: string;
  companyRegd: string;
  panNumber: string;
  phone: string;
  emailNews: string;
  emailAds: string;
  address: string;
}

export interface AdminComment {
  id: string;
  articleSlug: string;
  articleTitle: string;
  userName: string;
  userEmail?: string;
  text: string;
  date: string;
  status: "approved" | "pending" | "spam";
}

interface NewsContextType {
  articles: NewsArticle[];
  categories: CategoryInfo[];
  markets: MarketData;
  settings: SiteSettings;
  comments: AdminComment[];
  // Article Actions
  addArticle: (article: Omit<NewsArticle, "id">) => NewsArticle;
  updateArticle: (id: string, updated: Partial<NewsArticle>) => void;
  deleteArticle: (id: string) => void;
  toggleBreaking: (id: string) => void;
  toggleLead: (id: string) => void;
  toggleTrending: (id: string) => void;
  // Category Actions
  addCategory: (cat: CategoryInfo) => void;
  updateCategory: (slug: string, updated: Partial<CategoryInfo>) => void;
  deleteCategory: (slug: string) => void;
  // Market Actions
  updateMarkets: (newMarkets: Partial<MarketData>) => void;
  // Settings Actions
  updateSettings: (newSettings: Partial<SiteSettings>) => void;
  // Comments Actions
  approveComment: (id: string) => void;
  deleteComment: (id: string) => void;
  addComment: (comment: Omit<AdminComment, "id" | "date" | "status">) => void;
  // Reset
  resetToDefault: () => void;
}

const DEFAULT_MARKETS: MarketData = {
  nepse: {
    index: "२,८१०.५०",
    change: "+५२.४०",
    percent: "+१.९०%",
    turnover: "१२.३५ अर्ब",
    isUp: true,
  },
  gold: {
    fineTola: "१,६५,०००",
    fine10g: "१,४१,४६०",
    tejabiTola: "१,६४,२००",
    silverTola: "२,१००",
    change: "+१,४००",
    isUp: true,
  },
  forex: [
    { code: "USD", name: "अमेरिकी डलर", buy: "१३४.२०", sell: "१३४.८०", isUp: true },
    { code: "EUR", name: "युरो", buy: "१४१.५०", sell: "१४२.१५", isUp: false },
    { code: "GBP", name: "पाउन्ड", buy: "१६९.८०", sell: "१७०.५५", isUp: true },
    { code: "AED", name: "दिरहाम", buy: "३६.५४", sell: "३६.७०", isUp: true },
    { code: "QAR", name: "रियाल", buy: "३६.८६", sell: "३७.०२", isUp: true },
    { code: "AUD", name: "अस्ट्रेलियन डलर", buy: "८६.९०", sell: "८७.३०", isUp: false },
  ],
};

const DEFAULT_SETTINGS: SiteSettings = {
  siteNameNp: "सानो कुरा",
  siteNameEn: "Sano Kura",
  taglineNp: "सत्य, तथ्य र निष्पक्ष समाचारको संवाहक",
  taglineEn: "True, Objective & Unbiased News Portal",
  pressCouncilRegd: "१४२५/०८०-८१",
  infoDeptRegd: "२१३०/०७९-८०",
  companyRegd: "२३८०१/०७९/०८०",
  panNumber: "६०९८३७२१०",
  phone: "+९७७-१-४१०२९३८ / ९८०१२३४५६७",
  emailNews: "news@sanokura.com",
  emailAds: "ads@sanokura.com",
  address: "अनामनगर-२९, काठमाडौँ, नेपाल",
};

const DEFAULT_COMMENTS: AdminComment[] = [
  {
    id: "c-1",
    articleSlug: "nepal-clean-energy-export-milestone-regional-grid",
    articleTitle: "नेपालको जलविद्युत दक्षिण एसियाली बजारमा",
    userName: "गोपाल शर्मा (Gopal Sharma)",
    userEmail: "gopal@example.com",
    text: "नेपालको ऊर्जा र आर्थिक विकासका लागि यो सम्झौता साँच्चिकै ऐतिहासिक छ। कार्यान्वयन समयमै होस्!",
    date: "२०८१ मंसिर २ गते",
    status: "approved",
  },
  {
    id: "c-2",
    articleSlug: "nepse-index-rallies-bull-run-tech-stocks-record-turnover",
    articleTitle: "नेप्से परिसूचकमा ५२ अंकको उछाल",
    userName: "अनिता दाहाल (Anita Dahal)",
    userEmail: "anita@example.com",
    text: "सानो कुराको सन्तुलित र निष्पक्ष समाचार प्रस्तुति धेरै राम्रो लाग्यो। बधाई छ टिमलाई।",
    date: "२०८१ मंसिर २ गते",
    status: "approved",
  },
  {
    id: "c-3",
    articleSlug: "nepal-cricket-t20-series-victory-rohit-paudel-masterclass",
    articleTitle: "रोहित पौडेलको विस्फोटक शतकसँगै नेपालले जित्यो त्रिकोणात्मक टी-२०",
    userName: "रमेश श्रेष्ठ (Ramesh Shrestha)",
    userEmail: "ramesh@example.com",
    text: "कप्तान रोहित र सम्पूर्ण टिमलाई बधाई! हामी विश्वकपको उत्कृष्ट तयारीमा छौँ।",
    date: "२०८१ मंसिर २ गते",
    status: "approved",
  },
];

const NewsContext = createContext<NewsContextType | undefined>(undefined);

export const NewsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [articles, setArticles] = useState<NewsArticle[]>(INITIAL_ARTICLES);
  const [categories, setCategories] = useState<CategoryInfo[]>(INITIAL_CATEGORIES);
  const [markets, setMarkets] = useState<MarketData>(DEFAULT_MARKETS);
  const [settings, setSettings] = useState<SiteSettings>(DEFAULT_SETTINGS);
  const [comments, setComments] = useState<AdminComment[]>(DEFAULT_COMMENTS);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load state from localStorage on client mount
  useEffect(() => {
    try {
      const savedArticles = localStorage.getItem("sano_kura_articles");
      if (savedArticles) setArticles(JSON.parse(savedArticles));

      const savedCategories = localStorage.getItem("sano_kura_categories");
      if (savedCategories) setCategories(JSON.parse(savedCategories));

      const savedMarkets = localStorage.getItem("sano_kura_markets");
      if (savedMarkets) setMarkets(JSON.parse(savedMarkets));

      const savedSettings = localStorage.getItem("sano_kura_settings");
      if (savedSettings) setSettings(JSON.parse(savedSettings));

      const savedComments = localStorage.getItem("sano_kura_admin_comments");
      if (savedComments) setComments(JSON.parse(savedComments));
    } catch (e) {
      console.error("Error reading localStorage", e);
    }
    setIsInitialized(true);
  }, []);

  // Sync to localStorage
  const persistArticles = (data: NewsArticle[]) => {
    setArticles(data);
    if (typeof window !== "undefined") {
      localStorage.setItem("sano_kura_articles", JSON.stringify(data));
    }
  };

  const persistCategories = (data: CategoryInfo[]) => {
    setCategories(data);
    if (typeof window !== "undefined") {
      localStorage.setItem("sano_kura_categories", JSON.stringify(data));
    }
  };

  const persistMarkets = (data: MarketData) => {
    setMarkets(data);
    if (typeof window !== "undefined") {
      localStorage.setItem("sano_kura_markets", JSON.stringify(data));
    }
  };

  const persistSettings = (data: SiteSettings) => {
    setSettings(data);
    if (typeof window !== "undefined") {
      localStorage.setItem("sano_kura_settings", JSON.stringify(data));
    }
  };

  const persistComments = (data: AdminComment[]) => {
    setComments(data);
    if (typeof window !== "undefined") {
      localStorage.setItem("sano_kura_admin_comments", JSON.stringify(data));
    }
  };

  // Article handlers
  const addArticle = (newArt: Omit<NewsArticle, "id">): NewsArticle => {
    const id = `art-${Date.now()}`;
    const fullArticle: NewsArticle = { ...newArt, id };
    const updated = [fullArticle, ...articles];
    persistArticles(updated);
    return fullArticle;
  };

  const updateArticle = (id: string, updated: Partial<NewsArticle>) => {
    const next = articles.map((a) => (a.id === id || a.slug === id ? { ...a, ...updated } : a));
    persistArticles(next);
  };

  const deleteArticle = (id: string) => {
    const next = articles.filter((a) => a.id !== id && a.slug !== id);
    persistArticles(next);
  };

  const toggleBreaking = (id: string) => {
    const next = articles.map((a) =>
      a.id === id || a.slug === id ? { ...a, isBreaking: !a.isBreaking } : a
    );
    persistArticles(next);
  };

  const toggleLead = (id: string) => {
    const next = articles.map((a) => {
      if (a.id === id || a.slug === id) {
        return { ...a, isLead: true };
      }
      return { ...a, isLead: false };
    });
    persistArticles(next);
  };

  const toggleTrending = (id: string) => {
    const next = articles.map((a) =>
      a.id === id || a.slug === id ? { ...a, isTrending: !a.isTrending } : a
    );
    persistArticles(next);
  };

  // Category handlers
  const addCategory = (cat: CategoryInfo) => {
    const next = [...categories, cat];
    persistCategories(next);
  };

  const updateCategory = (slug: string, updated: Partial<CategoryInfo>) => {
    const next = categories.map((c) => (c.slug === slug ? { ...c, ...updated } : c));
    persistCategories(next);
  };

  const deleteCategory = (slug: string) => {
    const next = categories.filter((c) => c.slug !== slug);
    persistCategories(next);
  };

  // Market handlers
  const updateMarkets = (newMarkets: Partial<MarketData>) => {
    const next = { ...markets, ...newMarkets };
    persistMarkets(next);
  };

  // Settings handlers
  const updateSettings = (newSettings: Partial<SiteSettings>) => {
    const next = { ...settings, ...newSettings };
    persistSettings(next);
  };

  // Comments handlers
  const approveComment = (id: string) => {
    const next = comments.map((c) => (c.id === id ? { ...c, status: "approved" as const } : c));
    persistComments(next);
  };

  const deleteComment = (id: string) => {
    const next = comments.filter((c) => c.id !== id);
    persistComments(next);
  };

  const addComment = (comment: Omit<AdminComment, "id" | "date" | "status">) => {
    const newComment: AdminComment = {
      ...comment,
      id: `comm-${Date.now()}`,
      date: "भर्खरै",
      status: "approved",
    };
    persistComments([newComment, ...comments]);
  };

  const resetToDefault = () => {
    persistArticles(INITIAL_ARTICLES);
    persistCategories(INITIAL_CATEGORIES);
    persistMarkets(DEFAULT_MARKETS);
    persistSettings(DEFAULT_SETTINGS);
    persistComments(DEFAULT_COMMENTS);
  };

  return (
    <NewsContext.Provider
      value={{
        articles,
        categories,
        markets,
        settings,
        comments,
        addArticle,
        updateArticle,
        deleteArticle,
        toggleBreaking,
        toggleLead,
        toggleTrending,
        addCategory,
        updateCategory,
        deleteCategory,
        updateMarkets,
        updateSettings,
        approveComment,
        deleteComment,
        addComment,
        resetToDefault,
      }}
    >
      {children}
    </NewsContext.Provider>
  );
};

export const useNews = () => {
  const context = useContext(NewsContext);
  if (!context) {
    throw new Error("useNews must be used within a NewsProvider");
  }
  return context;
};
