"use client";

import React from "react";
import Link from "next/link";
import { Home, ChevronRight, Mail, Award, CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface TeamMember {
  name: { np: string; en: string };
  role: { np: string; en: string };
  avatar: string;
  bio: { np: string; en: string };
  email: string;
}

const LEADERSHIP: TeamMember[] = [
  {
    name: { np: "सन्तोष न्यौपाने", en: "Santosh Neupane" },
    role: { np: "प्रधान सम्पादक", en: "Editor-in-Chief" },
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    bio: {
      np: "दुई दशकभन्दा लामो समयदेखि नेपाली राष्ट्रिय राजनीति, संसदीय मामिला र खोज पत्रकारितामा सक्रिय।",
      en: "Over two decades of experience in investigative reporting, parliamentary affairs, and national media.",
    },
    email: "editor@sanokura.com",
  },
  {
    name: { np: "सरिता तामाङ", en: "Sarita Tamang" },
    role: { np: "प्रबन्ध सम्पादक", en: "Managing Editor" },
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
    bio: {
      np: "पर्यावरण, जलवायु न्याय र समावेशी सामाजिक रूपान्तरण सम्बन्धी खोजमूलक अनुसन्धानमा समर्पित।",
      en: "Specialist in environmental justice, indigenous governance, and investigative enterprise journalism.",
    },
    email: "managing@sanokura.com",
  },
  {
    name: { np: "प्रशान्त अधिकारी", en: "Prashant Adhikari" },
    role: { np: "अर्थ ब्यूरो प्रमुख", en: "Economy Bureau Chief" },
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    bio: {
      np: "नेपाली पुँजी बजार, बैंकिङ क्षेत्र र बृहत् आर्थिक नीतिहरूको गहिरो विश्लेषणमा विज्ञता।",
      en: "Authoritative voice on NEPSE capital markets, macro-fiscal regulation, and regional energy trade.",
    },
    email: "economy@sanokura.com",
  },
  {
    name: { np: "विनोद पाण्डे", en: "Binod Pandey" },
    role: { np: "खेलकुद सम्पादक", en: "Sports Editor" },
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
    bio: {
      np: "नेपाल क्रिकेट तथा फुटबलका राष्ट्रिय तथा अन्तर्राष्ट्रिय प्रतियोगिताहरूको प्रत्यक्ष कभरेजमा अग्रपङ्क्ति।",
      en: "Frontline commentator covering ICC international cricket matches, domestic leagues, and youth sports.",
    },
    email: "sports@sanokura.com",
  },
  {
    name: { np: "अमित श्रेष्ठ", en: "Amit Shrestha" },
    role: { np: "प्रविधि तथा डिजिटल सम्पादक", en: "Tech & Digital Editor" },
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80",
    bio: {
      np: "एआई, साइबर सुरक्षा, सफ्टवेयर स्टार्टअप र डिजिटल नेपाल फ्रेमवर्कका अध्येता।",
      en: "Researcher and technology reporter covering machine learning, cyber resilience, and tech entrepreneurship.",
    },
    email: "tech@sanokura.com",
  },
  {
    name: { np: "सुनिता लामा", en: "Sunita Lama" },
    role: { np: "मनोरञ्जन तथा कला संवाददाता", en: "Arts & Culture Correspondent" },
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80",
    bio: {
      np: "नेपाली मौलिक सिनेमा, रङ्गमञ्च, साहित्य र लोक संस्कृतिको प्रचार-प्रसारमा क्रियाशील।",
      en: "Dedicated coverage of indigenous Himalayan storytelling, theatre, music, and the arts.",
    },
    email: "culture@sanokura.com",
  },
];

export default function TeamPage() {
  const { language, t } = useLanguage();

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Breadcrumb */}
      <nav className="flex items-center text-xs text-gray-500 gap-1.5 py-1">
        <Link href="/" className="hover:text-red-600 flex items-center gap-1 transition">
          <Home className="w-3.5 h-3.5" />
          <span>{t("home")}</span>
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
        <span className="font-semibold text-gray-800">{t("editorialTeam")}</span>
      </nav>

      {/* Hero */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-10 shadow-xs text-center">
        <span className="inline-block text-xs font-black uppercase tracking-wider px-3 py-1 rounded bg-red-100 text-red-600 mb-2">
          NEWSROOM EDITORIAL BOARD
        </span>
        <h1 className="text-2xl sm:text-4xl font-black text-gray-900 tracking-tight mb-3">
          {language === "np" ? "हाम्रो सम्पादकीय टिम" : "Our Editorial Board"}
        </h1>
        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed max-w-2xl mx-auto">
          {language === "np"
            ? "‘सानो कुरा’ का अनुभवी सम्पादक, खोज पत्रकार र विषयगत विश्लेषकहरूको समूह, जसले हरेक दिन तपाईंलाई सत्य र तथ्यपूर्ण सूचना पुर्‍याउन निष्ठापूर्वक काम गर्छ।"
            : "Meet the experienced editors, investigative reporters, and columnists driving principled journalism every day at Sano Kura."}
        </p>
      </div>

      {/* Team Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {LEADERSHIP.map((member, idx) => (
          <div
            key={idx}
            className="group bg-white rounded-xl border border-gray-200 p-5 shadow-xs hover:shadow-md transition flex flex-col justify-between"
          >
            <div>
              <div className="relative w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-2 border-red-500">
                <img
                  src={member.avatar}
                  alt={member.name[language]}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
              </div>

              <div className="text-center mb-3">
                <h3 className="font-bold text-base text-gray-900">
                  {member.name[language]}
                </h3>
                <p className="text-xs text-red-600 font-semibold">{member.role[language]}</p>
              </div>

              <p className="text-xs text-gray-600 leading-relaxed text-center mb-4">
                {member.bio[language]}
              </p>
            </div>

            <div className="pt-3 border-t border-gray-100 flex items-center justify-center text-xs text-gray-500 gap-1.5">
              <Mail className="w-3.5 h-3.5 text-red-500" />
              <a href={`mailto:${member.email}`} className="hover:text-red-600 font-mono">
                {member.email}
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
