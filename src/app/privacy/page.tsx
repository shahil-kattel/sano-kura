"use client";

import React from "react";
import Link from "next/link";
import { Home, ChevronRight, ShieldCheck, Lock } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function PrivacyPage() {
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
        <span className="font-semibold text-gray-800">{t("privacyPolicy")}</span>
      </nav>

      <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-10 shadow-xs">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
              {language === "np" ? "गोपनीयता नीति (Privacy Policy)" : "Privacy Policy"}
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
              ? "सानो कुरा मिडिया प्रा.लि. ('हामी', 'हाम्रो' वा 'सानो कुरा') आफ्ना पाठक र प्रयोगकर्ताहरूको गोपनीयताको पूर्ण सम्मान गर्दछ। यस गोपनीयता नीति दस्तावेजले हामीले सङ्कलन गर्ने जानकारी, त्यसको प्रयोग र सुरक्षाका उपायहरूलाई स्पष्ट गर्दछ।"
              : "Sano Kura Media Pvt. Ltd. ('we', 'us', or 'Sano Kura') is committed to protecting the privacy of our visitors and subscribers. This Privacy Policy details the data collected, intended usage, and security protocols."}
          </p>

          <h3 className="text-base font-bold text-gray-900 pt-2">
            {language === "np" ? "१. हामीले सङ्कलन गर्ने जानकारी" : "1. Information We Collect"}
          </h3>
          <p>
            {language === "np"
              ? "जब तपाईं हाम्रो वेबसाइटमा प्रतिक्रिया दिनुहुन्छ, न्युजलेटर सदस्य बन्नुहुन्छ वा सम्पर्क फारम भर्नुहुन्छ, हामी तपाईंको नाम, इमेल ठेगाना र सम्पर्क विवरण सङ्कलन गर्न सक्दछौँ। यसका अलावा वेबसाइटको कार्यक्षमता अभिवृद्धि गर्न कुकिज (Cookies) र विश्लेषणात्मक डेटा (Google Analytics) प्रयोग गरिन्छ।"
              : "When subscribing to briefings, posting comments, or submitting feedback, we collect voluntary information such as your name and email. Standard analytical logs and cookies are utilized to optimize page load speeds and reader experience."}
          </p>

          <h3 className="text-base font-bold text-gray-900 pt-2">
            {language === "np" ? "२. जानकारीको प्रयोग र सुरक्षा" : "2. Use of Information and Data Security"}
          </h3>
          <p>
            {language === "np"
              ? "सङ्कलन गरिएको जानकारी केवल पाठक सेवालाई प्रभावकारी बनाउन, समाचार अपडेट पठाउन र सुरक्षा अनुगमनका लागि प्रयोग गरिन्छ। हामी तपाईंको व्यक्तिगत विवरण कुनै पनि तेस्रो पक्षलाई बिक्री वा गैरकानुनी रूपमा हस्तान्तरण गर्दैनौँ।"
              : "Collected information is strictly deployed to deliver requested briefings, improve content architecture, and prevent fraudulent activity. We never sell or distribute reader data to unauthorized third parties."}
          </p>

          <h3 className="text-base font-bold text-gray-900 pt-2">
            {language === "np" ? "३. बाह्य लिङ्कहरू र विज्ञापन" : "3. External Links & Third-Party Advertising"}
          </h3>
          <p>
            {language === "np"
              ? "हाम्रो पोर्टलमा अन्य बाह्य वेबसाइटका लिङ्क वा विज्ञापनदाताका सामग्री रहन सक्छन्। ती वेबसाइटहरूको आफ्नै गोपनीयता नीति हुने भएकाले पाठकहरूलाई सचेत रहन अनुरोध गर्दछौँ।"
              : "Our portal may feature hyperlinks to external reference sites or verified advertiser banners. Readers are advised to consult those entities' respective privacy statements."}
          </p>

          <h3 className="text-base font-bold text-gray-900 pt-2">
            {language === "np" ? "४. सम्पर्क" : "4. Contact Desk"}
          </h3>
          <p>
            {language === "np"
              ? "यस नीतिका सम्बन्धमा कुनै जिज्ञासा भएमा privacy@sanokura.com मा सम्पर्क गर्न सक्नुहुनेछ।"
              : "For privacy questions, reach us at privacy@sanokura.com."}
          </p>
        </div>
      </div>
    </div>
  );
}
