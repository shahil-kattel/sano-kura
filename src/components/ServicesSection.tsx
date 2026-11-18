"use client";

import React, { useState } from "react";
import { ArrowUpRight, Sparkles, Check, X, Send } from "lucide-react";
import { ServiceItem } from "@/types/sanokuraa";
import { useLanguage } from "@/context/LanguageContext";
import { useSanokuraa } from "@/context/SanokuraaContext";

interface ServicesSectionProps {
  services: ServiceItem[];
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ services }) => {
  const { language } = useLanguage();
  const { submitInquiry } = useSanokuraa();

  // Modal / Drawer state for "Inquire / Start a Project"
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  // Form inputs
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [projectScope, setProjectScope] = useState("");
  const [budgetRange, setBudgetRange] = useState("$2,000 - $5,000");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleOpenInquiry = (service?: ServiceItem) => {
    setSelectedService(service || services[0]);
    setIsModalOpen(true);
    setIsSubmitted(false);
  };

  const handleSubmitInquiry = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientEmail || !projectScope) return;

    setIsSubmitting(true);
    await submitInquiry({
      clientName,
      clientEmail,
      clientPhone,
      serviceId: selectedService?.id || services[0]?.id || "",
      serviceTitle: selectedService?.title[language] || "General Consultation",
      projectScope,
      budgetRange,
    });
    setIsSubmitting(false);
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setIsModalOpen(false);
      setClientName("");
      setClientEmail("");
      setClientPhone("");
      setProjectScope("");
    }, 2500);
  };

  return (
    <section className="my-16 sm:my-24">
      {/* Editorial Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between pb-6 mb-10 border-b border-neutral-900 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2 font-mono text-xs text-neutral-500 uppercase tracking-[0.2em]">
            <span className="text-neutral-900 font-bold">05</span>
            <span className="text-neutral-300">/</span>
            <span>CREATIVE ATELIER & PRODUCTION</span>
          </div>
          <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl text-neutral-950 font-normal tracking-tight">
            {language === "np" ? "सेवाहरू: उत्पादन तथा व्यक्तिगत ब्रान्डिङ" : "Studio Services & Media Production"}
          </h2>
        </div>

        <button
          onClick={() => handleOpenInquiry()}
          className="px-5 py-2.5 bg-neutral-950 hover:bg-neutral-800 text-white text-xs font-mono font-medium uppercase tracking-wider rounded-lg transition inline-flex items-center gap-2 cursor-pointer"
        >
          <span>Start a Project</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Numbered Editorial Grid (01, 02, 03) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {services.map((service) => (
          <div
            key={service.id}
            className="flex flex-col justify-between bg-white rounded-2xl border border-neutral-200/90 p-7 sm:p-9 hover:border-neutral-900/60 transition duration-300 group"
          >
            <div className="space-y-6">
              <span className="font-editorial text-4xl sm:text-5xl font-light text-neutral-300 group-hover:text-accent transition duration-300 select-none block">
                {service.number}
              </span>

              <h3 className="font-editorial text-2xl font-normal text-neutral-950 leading-tight">
                {service.title[language]}
              </h3>

              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-sans">
                {service.description[language]}
              </p>

              {/* Deliverables Checklist */}
              <div className="pt-4 border-t border-neutral-100 space-y-2.5">
                <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-neutral-400 font-bold">
                  DELIVERABLES INCLUDE:
                </p>
                <ul className="space-y-2">
                  {service.deliverables[language].map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2.5 text-xs text-neutral-700 font-sans"
                    >
                      <Check className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Inquire Action Button */}
            <div className="pt-8 mt-6 border-t border-neutral-100">
              <button
                onClick={() => handleOpenInquiry(service)}
                className="w-full py-2.5 px-4 rounded-lg bg-neutral-50 hover:bg-neutral-900 hover:text-white border border-neutral-200 text-neutral-800 text-xs font-mono font-medium uppercase tracking-wider transition cursor-pointer flex items-center justify-between"
              >
                <span>Inquire for {service.number}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* INQUIRE / START A PROJECT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="relative w-full max-w-lg bg-white rounded-2xl border border-neutral-200 p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 transition"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {isSubmitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <h3 className="font-editorial text-2xl font-bold text-neutral-900">
                  Inquiry Received
                </h3>
                <p className="text-xs text-neutral-600 max-w-xs mx-auto">
                  Thank you. The Sanokuraa creative team will review your brief and reply within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitInquiry} className="space-y-4">
                <div className="space-y-1">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent font-bold">
                    START A COLLABORATION
                  </span>
                  <h3 className="font-editorial text-2xl font-normal text-neutral-950">
                    Project Brief & Consultation
                  </h3>
                  <p className="text-xs text-neutral-500 font-sans">
                    Selected Service:{" "}
                    <span className="font-semibold text-neutral-900">
                      {selectedService?.title[language] || "Media Consultation"}
                    </span>
                  </p>
                </div>

                <div className="space-y-3 pt-2">
                  <div>
                    <label className="block text-[11px] font-mono uppercase text-neutral-600 mb-1">
                      Your Name / Organization *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g., Siddhartha Arts Foundation"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      className="w-full bg-[#FAFAFA] border border-neutral-200 rounded-lg px-3.5 py-2 text-xs text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-900"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-mono uppercase text-neutral-600 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="contact@studio.org"
                        value={clientEmail}
                        onChange={(e) => setClientEmail(e.target.value)}
                        className="w-full bg-[#FAFAFA] border border-neutral-200 rounded-lg px-3.5 py-2 text-xs text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-900"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-mono uppercase text-neutral-600 mb-1">
                        Phone / WhatsApp
                      </label>
                      <input
                        type="tel"
                        placeholder="+977 9800000000"
                        value={clientPhone}
                        onChange={(e) => setClientPhone(e.target.value)}
                        className="w-full bg-[#FAFAFA] border border-neutral-200 rounded-lg px-3.5 py-2 text-xs text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-900"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase text-neutral-600 mb-1">
                      Project Scope & Timeline *
                    </label>
                    <textarea
                      required
                      rows={3}
                      placeholder="Briefly describe your objectives, deliverables, and target launch date..."
                      value={projectScope}
                      onChange={(e) => setProjectScope(e.target.value)}
                      className="w-full bg-[#FAFAFA] border border-neutral-200 rounded-lg px-3.5 py-2 text-xs text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-900 resize-none font-sans"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase text-neutral-600 mb-1">
                      Estimated Budget Range
                    </label>
                    <select
                      value={budgetRange}
                      onChange={(e) => setBudgetRange(e.target.value)}
                      className="w-full bg-[#FAFAFA] border border-neutral-200 rounded-lg px-3 py-2 text-xs text-neutral-900 focus:outline-none focus:border-neutral-900"
                    >
                      <option value="Under $1,500">Under $1,500 / रू १.५ लाख सम्म</option>
                      <option value="$1,500 - $3,500">$1,500 - $3,500 / रू १.५ - ३.५ लाख</option>
                      <option value="$3,500 - $8,000">$3,500 - $8,000 / रू ३.५ - ८ लाख</option>
                      <option value="$8,000+">$8,000+ / रू ८ लाख भन्दा माथि</option>
                    </select>
                  </div>
                </div>

                <div className="pt-3">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-2.5 px-4 rounded-lg bg-neutral-950 hover:bg-neutral-800 text-white text-xs font-mono font-medium uppercase tracking-wider transition cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{isSubmitting ? "Submitting..." : "Send Project Inquiry"}</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
