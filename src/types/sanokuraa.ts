export type LocaleText = {
  en: string;
  np: string;
};

export type LocaleList = {
  en: string[];
  np: string[];
};

export interface Quote {
  id: string;
  quoteText: LocaleText;
  author: LocaleText;
  tag: string;
  graphicUrl?: string; // Optional artwork card
  isActive: boolean;
  createdAt: string;
}

export type BeatType =
  | "Society"
  | "Culture"
  | "Tech"
  | "Policy"
  | "Ground Report"
  | "Environment"
  | "Economy";

export interface Reporter {
  name: LocaleText;
  avatar: string;
  role: LocaleText;
}

export interface Report {
  id: string;
  slug: string;
  title: LocaleText;
  excerpt: LocaleText;
  content: LocaleList;
  coverImage: string;
  beat: BeatType;
  reporter: Reporter;
  date: string;
  dateNep: string;
  readTime: string;
  status: "DRAFT" | "PUBLISHED";
  isPinnedToGrid: boolean; // Controls 2x3 desktop homepage grid
  views: number;
}

export interface AuthorProfile {
  name: LocaleText;
  avatar: string;
  designation: LocaleText;
  bio: LocaleText;
}

export interface Article {
  id: string;
  slug: string;
  headline: LocaleText;
  deck: LocaleText;
  content: LocaleList;
  coverImage?: string;
  author: AuthorProfile;
  date: string;
  dateNep: string;
  readTime: string;
  isFeaturedLead: boolean; // Lead Op-Ed vs stacked column
  status: "DRAFT" | "PUBLISHED";
  views: number;
}

export interface Reel {
  id: string;
  title: LocaleText;
  caption: LocaleText;
  thumbnail: string;
  videoUrl: string; // MP4/WebM or YouTube Shorts / Embed URL
  aspectRatio: "9/16";
  duration?: string;
  order: number;
  views: number;
}

export interface PhotoFrame {
  id: string;
  url: string;
  caption: LocaleText;
  altText: string;
  order: number;
}

export interface PhotoStory {
  id: string;
  slug: string;
  title: LocaleText;
  intro: LocaleText;
  location: LocaleText;
  coverImage: string;
  date: string;
  frames: PhotoFrame[];
  status: "DRAFT" | "PUBLISHED";
  views: number;
}

export interface ServiceItem {
  id: string;
  number: string; // e.g. "01", "02", "03"
  title: LocaleText;
  description: LocaleText;
  deliverables: LocaleList;
}

export interface Inquiry {
  id: string;
  clientName: string;
  clientEmail: string;
  clientPhone?: string;
  serviceId: string;
  serviceTitle: string;
  projectScope: string;
  budgetRange?: string;
  createdAt: string;
  status: "NEW" | "CONTACTED" | "ARCHIVED";
}

export interface AboutSettings {
  manifesto: LocaleText;
  story: LocaleText;
  team: {
    name: string;
    role: string;
    avatar: string;
    bio: string;
  }[];
  socialLinks: {
    twitter?: string;
    instagram?: string;
    youtube?: string;
    linkedin?: string;
    github?: string;
    email?: string;
  };
}
