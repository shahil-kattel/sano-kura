"use client";

import React from "react";
import Link from "next/link";
import { Home, ChevronRight, FileText, CheckCircle } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function TermsPage() {
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
        <span className="font-semibold text-gray-800">{t("termsOfService")}</span>
      </nav>

      <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-10 shadow-xs">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
              {language === "np" ? "प्रयोगका सर्तहरू (Terms of Service)" : "Terms of Service"}
            </h1>
            <p className="text-xs text-gray-500">
              {language === "np"
                ? "पछिल्लो पटक परिमार्जित: २०८१ मंसिर २ गते"
                : "Last Updated: November 17, 2026"}
            </p>
          </div>
        </div>

        <div className="prose prose-gray max-w-none text-xs sm:text-sm text-gray-700 space-y-4 pt-4 border-t border-gray-100 leading-relaxed">
          <p>
            {language === "np"
              ? "‘सानो कुरा’ अनलाइन समाचार पोर्टल प्रयोग गर्दा तपाईं यी सर्तहरू स्वीकार गर्न मञ्जुर हुनुहुन्छ। यदि तपाईं यी सर्तहरूसँग असहमत हुनुहुन्छ भने कृपया सेवा प्रयोग नगर्नुहोला।"
              : "By accessing and using Sano Kura News Portal, you agree to comply with the terms and conditions outlined below."}
          </p>

          <h3 className="text-base font-bold text-gray-900 pt-2">
            {language === "np" ? "१. प्रतिलिपि अधिकार (Copyright)" : "1. Intellectual Property & Copyright"}
          </h3>
          <p>
            {language === "np"
              ? "यस पोर्टलमा प्रकाशित सम्पूर्ण समाचार, आलेख, तस्बिर, भिडियो र ग्राफिक्स सानो कुरा मिडिया प्रा.लि. को बौद्धिक सम्पत्ति हुन्। पूर्वलिखित अनुमति बिना कुनै पनि सामग्री व्यावसायिक उद्देश्यले पुनरुत्पादन वा प्रकाशन गर्न पाइने छैन।"
              : "All text, photographs, audio-visual recordings, and graphic assets published on this website are protected under copyright laws. Reproduction without prior written authorization is strictly prohibited."}
          </p>

          <h3 className="text-base font-bold text-gray-900 pt-2">
            {language === "np" ? "२. पाठक प्रतिक्रिया र आचारसंहिता" : "2. Reader Comments & Community Guidelines"}
          </h3>
          <p>
            {language === "np"
              ? "समाचारमा पाठकहरूले व्यक्त गरेका विचारहरू व्यक्तिगत हुन्। घृणास्पद अभिव्यक्ति, गालीगलौज, धार्मिक वा सामाजिक सद्भाव भड्काउने खालका अश्लील टिप्पणीहरू स्वतः हटाइनेछ।"
              : "Comments reflect the personal opinions of readers. Hate speech, defamatory remarks, harassment, and violation of public harmony will be moderated and deleted."}
          </p>

          <h3 className="text-base font-bold text-gray-900 pt-2">
            {language === "np" ? "३. कानुनी क्षेत्राधिकार" : "3. Governing Jurisdiction"}
          </h3>
          <p>
            {language === "np"
              ? "यस पोर्टलसँग सम्बन्धित कुनै पनि विवाद नेपालको विद्यमान कानुन र काठमाडौँ जिल्ला अदालतको क्षेत्राधिकार अन्तर्गत रहनेछ।"
              : "Any legal disputes arising from use of this website shall be governed by the laws of Nepal under the jurisdiction of Kathmandu courts."}
          </p>
        </div>
      </div>
    </div>
  );
}
