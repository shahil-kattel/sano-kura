"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Home,
  ChevronRight,
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle,
  MessageSquare,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function ContactPage() {
  const { language, t } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    department: "editorial",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setSubmitted(true);
      setTimeout(() => {
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          department: "editorial",
          message: "",
        });
      }, 500);
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Breadcrumb */}
      <nav className="flex items-center text-xs text-gray-500 gap-1.5 py-1">
        <Link href="/" className="hover:text-red-600 flex items-center gap-1 transition">
          <Home className="w-3.5 h-3.5" />
          <span>{t("home")}</span>
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
        <span className="font-semibold text-gray-800">{t("contactUs")}</span>
      </nav>

      {/* Header Banner */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-xs">
        <h1 className="text-2xl sm:text-4xl font-black text-gray-900 tracking-tight mb-2">
          {language === "np" ? "हामीलाई सम्पर्क गर्नुहोस्" : "Contact Us"}
        </h1>
        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed max-w-2xl">
          {language === "np"
            ? "समाचार सुझाव, गुनासो, विज्ञापन तथा सहकार्यका लागि तलको फारम भर्नुहोस् वा हाम्रा प्रतिनिधिहरूलाई सिधै सम्पर्क गर्नुहोस्।"
            : "Reach out to our newsroom, investigative desk, or commercial team using the form below or direct contacts."}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contact Info (1 Col) */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-xs space-y-4">
            <h3 className="font-bold text-base text-gray-900 border-b border-gray-100 pb-3">
              {language === "np" ? "केन्द्रीय कार्यालय" : "Headquarters"}
            </h3>

            <div className="flex items-start gap-3 text-xs text-gray-600">
              <MapPin className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-gray-900">
                  {language === "np" ? "सानो कुरा मिडिया प्रा.लि." : "Sano Kura Media Pvt. Ltd."}
                </p>
                <p>
                  {language === "np"
                    ? "अनामनगर-२९, काठमाडौँ, नेपाल"
                    : "Anamnagar-29, Kathmandu, Nepal"}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 text-xs text-gray-600">
              <Phone className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-gray-900">
                  {language === "np" ? "फोन नम्बरहरू:" : "Phone Numbers:"}
                </p>
                <p>+९७७-१-४१०२९३८ / ४१०२९३९</p>
                <p>+९७७-९८०१२३४५६७ (समाचार कक्ष)</p>
              </div>
            </div>

            <div className="flex items-start gap-3 text-xs text-gray-600">
              <Mail className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-gray-900">
                  {language === "np" ? "इमेल ठेगाना:" : "Email Addresses:"}
                </p>
                <p>समाचार: news@sanokura.com</p>
                <p>विज्ञापन: ads@sanokura.com</p>
                <p>प्रशासन: info@sanokura.com</p>
              </div>
            </div>

            <div className="flex items-start gap-3 text-xs text-gray-600">
              <Clock className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-gray-900">
                  {language === "np" ? "कार्यालय समय:" : "Operating Hours:"}
                </p>
                <p>
                  {language === "np"
                    ? "समाचार कक्ष: २४ सै घण्टा"
                    : "Newsroom: 24/7 Operations"}
                </p>
                <p>
                  {language === "np"
                    ? "प्रशासन: आइतबार - शुक्रबार (१०:०० - ५:००)"
                    : "Admin: Sunday - Friday (10am - 5pm)"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form (2 Cols) */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-xs">
          {submitted ? (
            <div className="py-12 text-center space-y-3">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">
                {language === "np" ? "सन्देश प्राप्त भयो!" : "Message Received!"}
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 max-w-md mx-auto">
                {language === "np"
                  ? "धन्यवाद। तपाईंको सन्देश हाम्रो सम्बन्धित विभागमा पठाइएको छ। हामी यथाशीघ्र सम्पर्क गर्नेछौँ।"
                  : "Thank you. Your inquiry has been forwarded to the appropriate desk. We will respond shortly."}
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-4 px-5 py-2 bg-red-600 text-white rounded-lg text-xs font-semibold hover:bg-red-700 transition"
              >
                {language === "np" ? "अर्को सन्देश पठाउनुहोस्" : "Send Another Message"}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h3 className="font-bold text-base text-gray-900 flex items-center gap-2 mb-2">
                <MessageSquare className="w-4 h-4 text-red-600" />
                <span>
                  {language === "np" ? "प्रतिक्रिया वा जिज्ञासा पठाउनुहोस्" : "Send us an Inquiry"}
                </span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    {language === "np" ? "पूरा नाम *" : "Full Name *"}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. राम श्रेष्ठ"
                    className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    {language === "np" ? "इमेल ठेगाना *" : "Email Address *"}
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@example.com"
                    className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    {language === "np" ? "सम्पर्क फोन" : "Phone Number"}
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+977-98..."
                    className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    {language === "np" ? "विभाग छानेर" : "Department"}
                  </label>
                  <select
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    <option value="editorial">
                      {language === "np" ? "सम्पादकीय / समाचार कक्ष" : "Newsroom & Editorial"}
                    </option>
                    <option value="advertising">
                      {language === "np" ? "विज्ञापन विभाग" : "Advertising & Marketing"}
                    </option>
                    <option value="opinion">
                      {language === "np" ? "विचार तथा लेख सम्पादन" : "Op-Ed & Articles"}
                    </option>
                    <option value="technical">
                      {language === "np" ? "प्राविधिक / वेबसाइट सहयोग" : "Technical Support"}
                    </option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  {language === "np" ? "विषय" : "Subject"}
                </label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder={language === "np" ? "समाचार सुझाव वा सोधपुछ..." : "Subject summary..."}
                  className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  {language === "np" ? "सन्देश वा विवरण *" : "Message *"}
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder={language === "np" ? "विस्तृत विवरण लेख्नुहोस्..." : "Type your inquiry in detail..."}
                  className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <button
                type="submit"
                className="bg-red-600 hover:bg-red-700 text-white font-bold text-sm px-6 py-2.5 rounded-lg transition flex items-center gap-2"
              >
                <span>{language === "np" ? "सन्देश पठाउनुहोस्" : "Send Message"}</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
