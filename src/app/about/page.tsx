"use client";

import React from "react";
import Link from "next/link";
import { Home, ChevronRight, Award, ShieldCheck, Target, HeartHandshake, Users } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function AboutPage() {
  const { language, t } = useLanguage();

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Breadcrumb */}
      <nav className="flex items-center text-xs text-gray-500 gap-1.5 py-1">
        <Link href="/" className="hover:text-red-600 flex items-center gap-1 transition">
          <Home className="w-3.5 h-3.5" />
          <span>{t("home")}</span>
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
        <span className="font-semibold text-gray-800">{t("aboutUs")}</span>
      </nav>

      {/* Hero Banner */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-10 shadow-xs">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-14 h-14 bg-red-600 text-white rounded-2xl flex items-center justify-center font-black text-3xl shadow-md">
            सा
          </div>
          <div>
            <h1 className="text-2xl sm:text-4xl font-black text-gray-900 tracking-tight">
              {language === "np" ? "हाम्रो बारेमा" : "About Sano Kura"}
            </h1>
            <p className="text-xs sm:text-sm text-red-600 font-semibold">
              {language === "np"
                ? "सानो कुरा मिडिया प्रा.लि. द्वारा सञ्चालित नेपाली अनलाइन पत्रिका"
                : "A Premier Digital News Portal Operated by Sano Kura Media Pvt. Ltd."}
            </p>
          </div>
        </div>

        <div className="prose prose-gray max-w-none text-sm sm:text-base text-gray-700 space-y-4 pt-4 border-t border-gray-100 leading-relaxed">
          <p>
            {language === "np"
              ? "‘सानो कुरा’ डिजिटल युगको विश्वसनीय, निष्पक्ष र व्यावसायिक नेपाली अनलाइन समाचार माध्यम हो। सञ्चार प्रविधिको तीव्र विकाससँगै नागरिकहरूलाई छिटो, सही र तथ्यमा आधारित सूचना प्रवाह गर्नु हाम्रो प्रमुख दायित्व हो। हामी कुनै पनि राजनीतिक दल, व्यापारिक स्वार्थ वा दबाबबाट मुक्त रही पत्रकारिताको आधारभूत मूल्य र आचारसंहिताप्रति सधैं प्रतिबद्ध छौँ।"
              : "'Sano Kura' is an independent, forward-thinking digital news organization committed to objective, reliable, and verified reporting. Amidst the fast-evolving digital sphere, delivering accurate, balanced, and principled journalism to citizens remains our core mission. We operate free from political or commercial bias, adhering strictly to global journalistic ethics."}
          </p>

          <p>
            {language === "np"
              ? "राजनीति, अर्थतन्त्र, समाज, खेलकुद, विचार, विज्ञान प्रविधि, मनोरञ्जन र जीवनशैलीका बहुआयामिक विषयहरूमा हाम्रा सम्पादक तथा खोज पत्रकारहरूले गहिराइमा पुगेर अनुसन्धानमूलक सामग्री पस्कने गर्छन्। गाउँदेखि सहरसम्म र हिमालदेखि तराईसम्मका नेपाली आवाजलाई विश्व मञ्चमा पुर्‍याउनु हाम्रो संकल्प हो।"
              : "From grassroots communities across all seven provinces to international diplomatic corridors, our dedicated reporters and editorial specialists provide in-depth investigative reports, policy analyses, cultural narratives, and continuous real-time updates."}
          </p>
        </div>
      </div>

      {/* Core Values 3-Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-xs text-center">
          <div className="w-12 h-12 rounded-xl bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-3">
            <Target className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-base text-gray-900 mb-2">
            {language === "np" ? "सत्य र तथ्य" : "Truth & Verification"}
          </h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            {language === "np"
              ? "हामी कुनै पनि समाचार प्रकाशन गर्नुपूर्व बहु-स्रोतबाट तथ्य प्रमाणीकरण गर्छौँ।"
              : "Every story undergoes multi-tier fact verification before publication."}
          </p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-xs text-center">
          <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mx-auto mb-3">
            <HeartHandshake className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-base text-gray-900 mb-2">
            {language === "np" ? "निष्पक्षता" : "Impartiality"}
          </h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            {language === "np"
              ? "सबै पक्षका धारणा र सन्तुलित दृष्टिकोणलाई उचित स्थान दिन्छौँ।"
              : "Balanced viewpoints with unwavering editorial independence."}
          </p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-xs text-center">
          <div className="w-12 h-12 rounded-xl bg-green-100 text-green-600 flex items-center justify-center mx-auto mb-3">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-base text-gray-900 mb-2">
            {language === "np" ? "उत्तरदायित्व" : "Public Accountability"}
          </h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            {language === "np"
              ? "नागरिक अधिकार र लोकतान्त्रिक मूल्यको सदैव पहरेदारी गर्दछौँ।"
              : "Championing civic rights, transparency and good governance."}
          </p>
        </div>
      </div>

      {/* Official Registry Details */}
      <div className="bg-gray-50 rounded-2xl border border-gray-200 p-6 text-xs text-gray-700 space-y-2">
        <h4 className="font-bold text-sm text-gray-900">
          {language === "np" ? "कानुनी तथा आधिकारिक विवरण:" : "Statutory & Regulatory Filings:"}
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <p>
            <strong>{language === "np" ? "कम्पनी दर्ता नं.:" : "Company Regd No:"}</strong> २३८०१/०७९/०८०
          </p>
          <p>
            <strong>{language === "np" ? "प्रेस काउन्सिल दर्ता:" : "Press Council No:"}</strong> १४२५/०८०-८१
          </p>
          <p>
            <strong>{language === "np" ? "सूचना विभाग दर्ता:" : "Dept. of Info No:"}</strong> २१३०/०७९-८०
          </p>
          <p>
            <strong>{language === "np" ? "स्थायी लेखा नं. (PAN):" : "PAN / VAT:"}</strong> ६०९८३७२१०
          </p>
        </div>
      </div>
    </div>
  );
}
