"use client";

import React, { useState } from "react";
import { ArrowUpRight, Sparkles, Check, CheckCircle2, X, Send } from "lucide-react";
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
    <section className="my-14 sm:my-24">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between pb-4 mb-10 border-b-2 border-ink">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="font-mono text-xs uppercase tracking-widest text-slate font-bold">
              Creative Atelier & Consulting
            </span>
          </div>
          <h2 className="font-editorial text-3xl sm:text-4xl text-ink font-bold tracking-tight">
            {language === "np" ? "सेवाहरू: उत्पादन तथा व्यक्तिगत ब्रान्डिङ" : "Studio Services & Media Production"}
          </h2>
        </div>

        <button
          onClick={() => handleOpenInquiry()}
          className="mt-4 sm:mt-0 px-4 py-2 bg-ink hover:bg-black text-white text-xs font-mono font-bold uppercase tracking-wider rounded-lg transition inline-flex items-center gap-2 cursor-pointer shadow-xs"
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
            className="flex flex-col justify-between bg-sanok-paper rounded-2xl border border-hairline p-7 sm:p-8 hover:border-ink/60 transition duration-200"
          >
            <div className="space-y-4">
              <span className="font-mono text-4xl sm:text-5xl font-black text-hairline hover:text-accent transition select-none block">
                {service.number}
              </span>

              <h3 className="font-editorial text-2xl font-bold text-ink leading-tight">
                {service.title[language]}
              </h3>

              <p className="text-xs sm:text-sm text-slate leading-relaxed">
                {service.description[language]}
              </p>

              {/* Deliverables Checklist */}
              <div className="pt-4 border-t border-hairline space-y-2.5">
                <p className="text-[11px] font-mono uppercase tracking-wider text-ink font-bold">
                  Core Deliverables:
                </p>
                <ul className="space-y-1.5">
                  {service.deliverables[language]?.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-slate">
                      <Check className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" />
                      <span className="leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-hairline">
              <button
                onClick={() => handleOpenInquiry(service)}
                className="w-full py-2.5 rounded-xl border border-hairline bg-sanok hover:bg-ink hover:text-white text-xs font-mono font-bold tracking-wider uppercase text-ink transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Inquire About {service.number}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Inquire Modal Form */}
      {isModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="relative w-full max-w-xl bg-white rounded-2xl border border-hairline p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-hairline">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-accent font-bold">
                  Bespoke Production
                </span>
                <h3 className="font-editorial text-2xl font-bold text-ink">
                  Start a Project with Sanokuraa
                </h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-9 h-9 rounded-full bg-sanok hover:bg-hairline flex items-center justify-center text-slate hover:text-ink transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {isSubmitted ? (
              <div className="py-12 text-center space-y-3 animate-in zoom-in-95">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="font-editorial text-2xl font-bold text-ink">
                  Inquiry Received
                </h4>
                <p className="text-xs sm:text-sm text-slate max-w-sm mx-auto">
                  Thank you, {clientName}. Our executive production desk will review your scope and follow up within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitInquiry} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-ink mb-1">
                    Select Target Service
                  </label>
                  <select
                    value={selectedService?.id || ""}
                    onChange={(e) => {
                      const found = services.find((s) => s.id === e.target.value);
                      if (found) setSelectedService(found);
                    }}
                    className="w-full bg-sanok border border-hairline rounded-lg px-3 py-2.5 text-xs text-ink focus:outline-none focus:border-ink font-sans"
                  >
                    {services.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.number} - {s.title.en} ({s.title.np})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-ink mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Maya Shrestha"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      className="w-full bg-sanok border border-hairline rounded-lg px-3 py-2 text-xs text-ink focus:outline-none focus:border-ink"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-ink mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="maya@company.com"
                      value={clientEmail}
                      onChange={(e) => setClientEmail(e.target.value)}
                      className="w-full bg-sanok border border-hairline rounded-lg px-3 py-2 text-xs text-ink focus:outline-none focus:border-ink"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-ink mb-1">
                      Phone Number (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="+977-98..."
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      className="w-full bg-sanok border border-hairline rounded-lg px-3 py-2 text-xs text-ink focus:outline-none focus:border-ink"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-ink mb-1">
                      Estimated Budget Range
                    </label>
                    <select
                      value={budgetRange}
                      onChange={(e) => setBudgetRange(e.target.value)}
                      className="w-full bg-sanok border border-hairline rounded-lg px-3 py-2 text-xs text-ink focus:outline-none focus:border-ink"
                    >
                      <option value="Under $2,000">Under $2,000 (NPR 250k)</option>
                      <option value="$2,000 - $5,000">$2,000 - $5,000 (NPR 250k - 650k)</option>
                      <option value="$5,000 - $10,000">$5,000 - $10,000 (NPR 650k - 1.3M)</option>
                      <option value="$10,000+">$10,000+ (Institutional Production)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-ink mb-1">
                    Project Scope & Narrative Goals *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Briefly describe your vision, timeline, and what you aim to achieve..."
                    value={projectScope}
                    onChange={(e) => setProjectScope(e.target.value)}
                    className="w-full bg-sanok border border-hairline rounded-lg p-3 text-xs text-ink focus:outline-none focus:border-ink"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 border border-hairline rounded-lg text-slate hover:text-ink text-xs font-mono"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-2 bg-ink hover:bg-black text-white rounded-lg text-xs font-mono font-bold uppercase tracking-wider transition flex items-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{isSubmitting ? "Transmitting..." : "Submit Inquiry"}</span>
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
