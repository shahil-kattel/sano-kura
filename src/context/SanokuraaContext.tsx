"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import {
  Quote,
  Report,
  Article,
  Reel,
  PhotoStory,
  ServiceItem,
  Inquiry,
  AboutSettings,
} from "@/types/sanokuraa";
import {
  INITIAL_QUOTES,
  INITIAL_REPORTS,
  INITIAL_ARTICLES,
  INITIAL_REELS,
  INITIAL_PHOTO_STORIES,
  INITIAL_SERVICES,
  INITIAL_INQUIRIES,
  INITIAL_ABOUT,
} from "@/data/sanokuraaSeed";

interface SanokuraaContextType {
  quotes: Quote[];
  reports: Report[];
  articles: Article[];
  reels: Reel[];
  photoStories: PhotoStory[];
  services: ServiceItem[];
  inquiries: Inquiry[];
  about: AboutSettings;

  // Quotes
  updateQuotes: (quotes: Quote[]) => void;
  addQuote: (quote: Omit<Quote, "id" | "createdAt">) => void;
  editQuote: (id: string, updated: Partial<Quote>) => void;
  deleteQuote: (id: string) => void;
  toggleQuoteActive: (id: string) => void;

  // Reports
  updateReports: (reports: Report[]) => void;
  addReport: (report: Report) => void;
  editReport: (id: string, updated: Partial<Report>) => void;
  deleteReport: (id: string) => void;
  togglePinReport: (id: string) => void;

  // Articles
  updateArticles: (articles: Article[]) => void;
  addArticle: (article: Article) => void;
  editArticle: (id: string, updated: Partial<Article>) => void;
  deleteArticle: (id: string) => void;
  toggleLeadArticle: (id: string) => void;

  // Reels
  updateReels: (reels: Reel[]) => void;
  addReel: (reel: Reel) => void;
  editReel: (id: string, updated: Partial<Reel>) => void;
  deleteReel: (id: string) => void;

  // Photo Stories
  updatePhotoStories: (stories: PhotoStory[]) => void;
  addPhotoStory: (story: PhotoStory) => void;
  editPhotoStory: (id: string, updated: Partial<PhotoStory>) => void;
  deletePhotoStory: (id: string) => void;

  // Services & Inquiries & About
  updateServices: (services: ServiceItem[]) => void;
  submitInquiry: (inquiry: Omit<Inquiry, "id" | "createdAt" | "status">) => Promise<boolean>;
  updateInquiryStatus: (id: string, status: Inquiry["status"]) => void;
  deleteInquiry: (id: string) => void;
  updateAbout: (updated: Partial<AboutSettings>) => void;
}

const SanokuraaContext = createContext<SanokuraaContextType | undefined>(undefined);

const LS_KEY = "sanokuraa_store_v1";

export const SanokuraaProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [quotes, setQuotes] = useState<Quote[]>(INITIAL_QUOTES);
  const [reports, setReports] = useState<Report[]>(INITIAL_REPORTS);
  const [articles, setArticles] = useState<Article[]>(INITIAL_ARTICLES);
  const [reels, setReels] = useState<Reel[]>(INITIAL_REELS);
  const [photoStories, setPhotoStories] = useState<PhotoStory[]>(INITIAL_PHOTO_STORIES);
  const [services, setServices] = useState<ServiceItem[]>(INITIAL_SERVICES);
  const [inquiries, setInquiries] = useState<Inquiry[]>(INITIAL_INQUIRIES);
  const [about, setAbout] = useState<AboutSettings>(INITIAL_ABOUT);

  // Load from LocalStorage and sync with API
  useEffect(() => {
    try {
      const local = localStorage.getItem(LS_KEY);
      if (local) {
        const parsed = JSON.parse(local);
        if (parsed.quotes) setQuotes(parsed.quotes);
        if (parsed.reports) setReports(parsed.reports);
        if (parsed.articles) setArticles(parsed.articles);
        if (parsed.reels) setReels(parsed.reels);
        if (parsed.photoStories) setPhotoStories(parsed.photoStories);
        if (parsed.services) setServices(parsed.services);
        if (parsed.inquiries) setInquiries(parsed.inquiries);
        if (parsed.about) setAbout(parsed.about);
      }
    } catch (e) {
      console.warn("Failed to read from localStorage:", e);
    }

    // Attempt to fetch fresh from server
    fetch("/api/sanokuraa")
      .then((res) => (res.ok ? res.json() : null))
      .then((res) => {
        if (res?.data) {
          if (res.data.quotes) setQuotes(res.data.quotes);
          if (res.data.reports) setReports(res.data.reports);
          if (res.data.articles) setArticles(res.data.articles);
          if (res.data.reels) setReels(res.data.reels);
          if (res.data.photoStories) setPhotoStories(res.data.photoStories);
          if (res.data.services) setServices(res.data.services);
          if (res.data.inquiries) setInquiries(res.data.inquiries);
          if (res.data.about) setAbout(res.data.about);
        }
      })
      .catch(() => {});
  }, []);

  // Helper to persist to localStorage & server
  const syncStore = (key: string, data: any) => {
    try {
      const current = {
        quotes,
        reports,
        articles,
        reels,
        photoStories,
        services,
        inquiries,
        about,
        [key]: data,
      };
      localStorage.setItem(LS_KEY, JSON.stringify(current));
    } catch {}

    // Async push to server
    fetch("/api/sanokuraa", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ resource: key, data }),
    }).catch((err) => console.error("Sync API error:", err));
  };

  // 1. QUOTES MUTATIONS
  const updateQuotes = (newQuotes: Quote[]) => {
    setQuotes(newQuotes);
    syncStore("quotes", newQuotes);
  };

  const addQuote = (q: Omit<Quote, "id" | "createdAt">) => {
    const item: Quote = {
      ...q,
      id: `q-${Date.now()}`,
      createdAt: new Date().toISOString().split("T")[0],
    };
    const next = [item, ...quotes];
    updateQuotes(next);
  };

  const editQuote = (id: string, updated: Partial<Quote>) => {
    const next = quotes.map((q) => (q.id === id ? { ...q, ...updated } : q));
    updateQuotes(next);
  };

  const deleteQuote = (id: string) => {
    const next = quotes.filter((q) => q.id !== id);
    updateQuotes(next);
  };

  const toggleQuoteActive = (id: string) => {
    const next = quotes.map((q) => (q.id === id ? { ...q, isActive: !q.isActive } : q));
    updateQuotes(next);
  };

  // 2. REPORTS MUTATIONS
  const updateReports = (newReports: Report[]) => {
    setReports(newReports);
    syncStore("reports", newReports);
  };

  const addReport = (report: Report) => {
    const next = [report, ...reports];
    updateReports(next);
  };

  const editReport = (id: string, updated: Partial<Report>) => {
    const next = reports.map((r) => (r.id === id ? { ...r, ...updated } : r));
    updateReports(next);
  };

  const deleteReport = (id: string) => {
    const next = reports.filter((r) => r.id !== id);
    updateReports(next);
  };

  const togglePinReport = (id: string) => {
    const next = reports.map((r) => (r.id === id ? { ...r, isPinnedToGrid: !r.isPinnedToGrid } : r));
    updateReports(next);
  };

  // 3. ARTICLES MUTATIONS
  const updateArticles = (newArticles: Article[]) => {
    setArticles(newArticles);
    syncStore("articles", newArticles);
  };

  const addArticle = (article: Article) => {
    const next = [article, ...articles];
    updateArticles(next);
  };

  const editArticle = (id: string, updated: Partial<Article>) => {
    const next = articles.map((a) => (a.id === id ? { ...a, ...updated } : a));
    updateArticles(next);
  };

  const deleteArticle = (id: string) => {
    const next = articles.filter((a) => a.id !== id);
    updateArticles(next);
  };

  const toggleLeadArticle = (id: string) => {
    const next = articles.map((a) =>
      a.id === id ? { ...a, isFeaturedLead: true } : { ...a, isFeaturedLead: false }
    );
    updateArticles(next);
  };

  // 4. REELS MUTATIONS
  const updateReels = (newReels: Reel[]) => {
    setReels(newReels);
    syncStore("reels", newReels);
  };

  const addReel = (reel: Reel) => {
    const next = [...reels, reel].sort((a, b) => a.order - b.order);
    updateReels(next);
  };

  const editReel = (id: string, updated: Partial<Reel>) => {
    const next = reels.map((r) => (r.id === id ? { ...r, ...updated } : r));
    updateReels(next);
  };

  const deleteReel = (id: string) => {
    const next = reels.filter((r) => r.id !== id);
    updateReels(next);
  };

  // 5. PHOTO STORIES MUTATIONS
  const updatePhotoStories = (newStories: PhotoStory[]) => {
    setPhotoStories(newStories);
    syncStore("photoStories", newStories);
  };

  const addPhotoStory = (story: PhotoStory) => {
    const next = [story, ...photoStories];
    updatePhotoStories(next);
  };

  const editPhotoStory = (id: string, updated: Partial<PhotoStory>) => {
    const next = photoStories.map((s) => (s.id === id ? { ...s, ...updated } : s));
    updatePhotoStories(next);
  };

  const deletePhotoStory = (id: string) => {
    const next = photoStories.filter((s) => s.id !== id);
    updatePhotoStories(next);
  };

  // 6. SERVICES, INQUIRIES & ABOUT
  const updateServices = (newServices: ServiceItem[]) => {
    setServices(newServices);
    syncStore("services", newServices);
  };

  const submitInquiry = async (
    inquiry: Omit<Inquiry, "id" | "createdAt" | "status">
  ): Promise<boolean> => {
    const newInq: Inquiry = {
      ...inquiry,
      id: `inq-${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: "NEW",
    };
    const next = [newInq, ...inquiries];
    setInquiries(next);
    syncStore("inquiries", next);

    try {
      const res = await fetch("/api/sanokuraa", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "submit_inquiry", data: inquiry }),
      });
      return res.ok;
    } catch {
      return true; // Already saved locally
    }
  };

  const updateInquiryStatus = (id: string, status: Inquiry["status"]) => {
    const next = inquiries.map((i) => (i.id === id ? { ...i, status } : i));
    setInquiries(next);
    syncStore("inquiries", next);
  };

  const deleteInquiry = (id: string) => {
    const next = inquiries.filter((i) => i.id !== id);
    setInquiries(next);
    syncStore("inquiries", next);
  };

  const updateAbout = (updated: Partial<AboutSettings>) => {
    const next = { ...about, ...updated };
    setAbout(next);
    syncStore("about", next);
  };

  return (
    <SanokuraaContext.Provider
      value={{
        quotes,
        reports,
        articles,
        reels,
        photoStories,
        services,
        inquiries,
        about,
        updateQuotes,
        addQuote,
        editQuote,
        deleteQuote,
        toggleQuoteActive,
        updateReports,
        addReport,
        editReport,
        deleteReport,
        togglePinReport,
        updateArticles,
        addArticle,
        editArticle,
        deleteArticle,
        toggleLeadArticle,
        updateReels,
        addReel,
        editReel,
        deleteReel,
        updatePhotoStories,
        addPhotoStory,
        editPhotoStory,
        deletePhotoStory,
        updateServices,
        submitInquiry,
        updateInquiryStatus,
        deleteInquiry,
        updateAbout,
      }}
    >
      {children}
    </SanokuraaContext.Provider>
  );
};

export const useSanokuraa = () => {
  const context = useContext(SanokuraaContext);
  if (!context) {
    throw new Error("useSanokuraa must be used within a SanokuraaProvider");
  }
  return context;
};
