import fs from "fs";
import path from "path";
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

export interface SanokuraaStoreData {
  quotes: Quote[];
  reports: Report[];
  articles: Article[];
  reels: Reel[];
  photoStories: PhotoStory[];
  services: ServiceItem[];
  inquiries: Inquiry[];
  about: AboutSettings;
}

const STORE_PATH = path.join(process.cwd(), "src", "data", "sanokuraaStore.json");

export function getSanokuraaStore(): SanokuraaStoreData {
  try {
    if (fs.existsSync(STORE_PATH)) {
      const raw = fs.readFileSync(STORE_PATH, "utf-8");
      return JSON.parse(raw);
    }
  } catch (err) {
    console.error("Error reading store from disk, using seed data:", err);
  }

  // Fallback to initial seed
  const defaultStore: SanokuraaStoreData = {
    quotes: INITIAL_QUOTES,
    reports: INITIAL_REPORTS,
    articles: INITIAL_ARTICLES,
    reels: INITIAL_REELS,
    photoStories: INITIAL_PHOTO_STORIES,
    services: INITIAL_SERVICES,
    inquiries: INITIAL_INQUIRIES,
    about: INITIAL_ABOUT,
  };

  try {
    fs.mkdirSync(path.dirname(STORE_PATH), { recursive: true });
    fs.writeFileSync(STORE_PATH, JSON.stringify(defaultStore, null, 2), "utf-8");
  } catch {
    // If running in read-only environment, ignore write error
  }

  return defaultStore;
}

export function saveSanokuraaStore(data: Partial<SanokuraaStoreData>): SanokuraaStoreData {
  const current = getSanokuraaStore();
  const updated: SanokuraaStoreData = {
    ...current,
    ...data,
  };

  try {
    fs.mkdirSync(path.dirname(STORE_PATH), { recursive: true });
    fs.writeFileSync(STORE_PATH, JSON.stringify(updated, null, 2), "utf-8");
  } catch (err) {
    console.error("Error writing store to disk:", err);
  }

  return updated;
}

export async function getQuotes(): Promise<Quote[]> {
  const store = getSanokuraaStore();
  return store.quotes;
}

export async function getActiveQuotes(): Promise<Quote[]> {
  const store = getSanokuraaStore();
  return store.quotes.filter((q) => q.isActive);
}

export async function getReports(): Promise<Report[]> {
  const store = getSanokuraaStore();
  return store.reports;
}

export async function getReportBySlug(slug: string): Promise<Report | undefined> {
  const store = getSanokuraaStore();
  return store.reports.find((r) => r.slug === slug);
}

export async function getArticles(): Promise<Article[]> {
  const store = getSanokuraaStore();
  return store.articles;
}

export async function getArticleBySlug(slug: string): Promise<Article | undefined> {
  const store = getSanokuraaStore();
  return store.articles.find((a) => a.slug === slug);
}

export async function getReels(): Promise<Reel[]> {
  const store = getSanokuraaStore();
  return [...store.reels].sort((a, b) => a.order - b.order);
}

export async function getPhotoStories(): Promise<PhotoStory[]> {
  const store = getSanokuraaStore();
  return store.photoStories;
}

export async function getPhotoStoryBySlug(slug: string): Promise<PhotoStory | undefined> {
  const store = getSanokuraaStore();
  return store.photoStories.find((p) => p.slug === slug);
}

export async function getServices(): Promise<ServiceItem[]> {
  const store = getSanokuraaStore();
  return store.services;
}

export async function getInquiries(): Promise<Inquiry[]> {
  const store = getSanokuraaStore();
  return store.inquiries;
}

export async function getAboutSettings(): Promise<AboutSettings> {
  const store = getSanokuraaStore();
  return store.about;
}
