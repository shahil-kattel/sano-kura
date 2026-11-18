"use client";

import React, { useState } from "react";
import {
  Briefcase,
  Inbox,
  Sparkles,
  Save,
  CheckCircle2,
  Trash2,
  Check,
  Mail,
  Phone,
  Compass,
  PlusCircle,
  FileCheck2,
} from "lucide-react";
import { ServiceItem, Inquiry, AboutSettings } from "@/types/sanokuraa";
import { useSanokuraa } from "@/context/SanokuraaContext";

export default function AdminSettingsAndServicesPage() {
  const {
    services,
    updateServices,
    inquiries,
    updateInquiryStatus,
    deleteInquiry,
    about,
    updateAbout,
  } = useSanokuraa();

  const [activeTab, setActiveTab] = useState<"inquiries" | "services" | "about">("inquiries");
  const [notice, setNotice] = useState<string | null>(null);

  // Inquiries filter
  const [inquiryFilter, setInquiryFilter] = useState<"ALL" | "NEW" | "CONTACTED" | "ARCHIVED">("ALL");

  // Services Local State
  const [servicesData, setServicesData] = useState<ServiceItem[]>(services);

  // About Local State (safe fallback)
  const [manifestoEn, setManifestoEn] = useState(about?.manifesto?.en || "");
  const [manifestoNp, setManifestoNp] = useState(about?.manifesto?.np || "");
  const [storyEn, setStoryEn] = useState(about?.story?.en || "");
  const [storyNp, setStoryNp] = useState(about?.story?.np || "");
  const [contactEmail, setContactEmail] = useState(about?.socialLinks?.email || "editorial@sanokuraa.com");
  const [instagram, setInstagram] = useState(about?.socialLinks?.instagram || "");
  const [youtube, setYoutube] = useState(about?.socialLinks?.youtube || "");
  const [twitter, setTwitter] = useState(about?.socialLinks?.twitter || "");

  // Update a service field
  const handleServiceChange = (index: number, field: string, value: any) => {
    const updated = [...servicesData];
    updated[index] = { ...updated[index], [field]: value };
    setServicesData(updated);
  };

  const handleDeliverableChange = (
    serviceIndex: number,
    lang: "en" | "np",
    delivIndex: number,
    value: string
  ) => {
    const updated = [...servicesData];
    const nextList = [...updated[serviceIndex].deliverables[lang]];
    nextList[delivIndex] = value;
    updated[serviceIndex].deliverables[lang] = nextList;
    setServicesData(updated);
  };

  const handleAddDeliverable = (serviceIndex: number) => {
    const updated = [...servicesData];
    updated[serviceIndex].deliverables.en.push("New core deliverable...");
    updated[serviceIndex].deliverables.np.push("नयाँ सेवा विशेषता...");
    setServicesData(updated);
  };

  const handleRemoveDeliverable = (serviceIndex: number, delivIndex: number) => {
    const updated = [...servicesData];
    updated[serviceIndex].deliverables.en = updated[serviceIndex].deliverables.en.filter((_, i) => i !== delivIndex);
    updated[serviceIndex].deliverables.np = updated[serviceIndex].deliverables.np.filter((_, i) => i !== delivIndex);
    setServicesData(updated);
  };

  const handleSaveServices = (e: React.FormEvent) => {
    e.preventDefault();
    updateServices(servicesData);
    setNotice("Studio services configuration updated successfully!");
    setTimeout(() => setNotice(null), 3000);
  };

  const handleSaveAbout = (e: React.FormEvent) => {
    e.preventDefault();
    updateAbout({
      manifesto: { en: manifestoEn, np: manifestoNp },
      story: { en: storyEn, np: storyNp },
      socialLinks: {
        ...(about?.socialLinks || {}),
        email: contactEmail,
        instagram,
        youtube,
        twitter,
      },
    });
    setNotice("Studio manifesto and contact coordinates saved!");
    setTimeout(() => setNotice(null), 3000);
  };

  const filteredInquiries =
    inquiryFilter === "ALL"
      ? inquiries
      : inquiries.filter((i) => i.status === inquiryFilter);

  const newCount = inquiries.filter((i) => i.status === "NEW").length;

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Briefcase className="w-5 h-5 text-rose-400" />
            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Services, Inquiries & Studio Settings
            </h1>
          </div>
          <p className="text-xs text-slate-400">
            Review inbound client project submissions, edit studio production service offerings, and update the Sanokuraa manifesto.
          </p>
        </div>

        {/* Tab Switchers */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-950 border border-slate-800 rounded-xl text-xs font-mono">
          <button
            onClick={() => setActiveTab("inquiries")}
            className={`px-3 py-1.5 rounded-lg transition cursor-pointer flex items-center gap-1.5 ${
              activeTab === "inquiries"
                ? "bg-rose-600 text-white font-bold"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Inbox className="w-3.5 h-3.5" />
            <span>Inquiries {newCount > 0 ? `(${newCount})` : `(${inquiries.length})`}</span>
          </button>

          <button
            onClick={() => setActiveTab("services")}
            className={`px-3 py-1.5 rounded-lg transition cursor-pointer flex items-center gap-1.5 ${
              activeTab === "services"
                ? "bg-rose-600 text-white font-bold"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Services Grid (3)</span>
          </button>

          <button
            onClick={() => setActiveTab("about")}
            className={`px-3 py-1.5 rounded-lg transition cursor-pointer flex items-center gap-1.5 ${
              activeTab === "about"
                ? "bg-rose-600 text-white font-bold"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Manifesto & About</span>
          </button>
        </div>
      </div>

      {notice && (
        <div className="p-3 bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-medium rounded-xl flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{notice}</span>
        </div>
      )}

      {/* TAB 1: CLIENT INQUIRIES DESK */}
      {activeTab === "inquiries" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-1.5 text-xs font-mono">
              {(["ALL", "NEW", "CONTACTED", "ARCHIVED"] as const).map((st) => (
                <button
                  key={st}
                  onClick={() => setInquiryFilter(st)}
                  className={`px-3 py-1.5 rounded-lg transition ${
                    inquiryFilter === st
                      ? "bg-rose-600 text-white font-bold"
                      : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
                  }`}
                >
                  {st} ({st === "ALL" ? inquiries.length : inquiries.filter((i) => i.status === st).length})
                </button>
              ))}
            </div>
            <span className="text-xs font-mono text-slate-500">
              Submitted via "Start a Project" modal
            </span>
          </div>

          <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-950 text-slate-400 uppercase font-mono text-[11px] border-b border-slate-800">
                  <tr>
                    <th className="py-3 px-4">Client Contact</th>
                    <th className="py-3 px-4">Service & Budget</th>
                    <th className="py-3 px-4">Project Scope</th>
                    <th className="py-3 px-4 text-center">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-850">
                  {filteredInquiries.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-12 text-center text-slate-500 font-mono">
                        No inquiries found under this filter.
                      </td>
                    </tr>
                  ) : (
                    filteredInquiries.map((inq) => (
                      <tr key={inq.id} className="hover:bg-slate-850/50 transition">
                        <td className="py-3 px-4 w-52">
                          <p className="font-bold text-white text-sm">{inq.clientName}</p>
                          <a
                            href={`mailto:${inq.clientEmail}`}
                            className="text-slate-400 hover:text-white font-mono text-[11px] flex items-center gap-1 mt-0.5"
                          >
                            <Mail className="w-3 h-3 text-slate-500" />
                            <span>{inq.clientEmail}</span>
                          </a>
                          {inq.clientPhone && (
                            <p className="text-slate-500 font-mono text-[10px] flex items-center gap-1 mt-0.5">
                              <Phone className="w-3 h-3" />
                              <span>{inq.clientPhone}</span>
                            </p>
                          )}
                        </td>

                        <td className="py-3 px-4 w-48 font-mono">
                          <p className="font-bold text-rose-400">{inq.serviceTitle}</p>
                          <p className="text-[11px] text-slate-400 mt-0.5">
                            Budget: {inq.budgetRange || "Flexible"}
                          </p>
                        </td>

                        <td className="py-3 px-4 max-w-md">
                          <p className="text-slate-200 leading-relaxed italic">
                            "{inq.projectScope}"
                          </p>
                          <p className="text-[10px] text-slate-500 font-mono mt-1">
                            Received {new Date(inq.createdAt).toLocaleDateString()}
                          </p>
                        </td>

                        <td className="py-3 px-4 text-center">
                          <select
                            value={inq.status}
                            onChange={(e) => updateInquiryStatus(inq.id, e.target.value as any)}
                            className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-slate-950 border border-slate-800 ${
                              inq.status === "NEW"
                                ? "text-rose-400"
                                : inq.status === "CONTACTED"
                                ? "text-blue-400"
                                : "text-slate-400"
                            }`}
                          >
                            <option value="NEW">NEW</option>
                            <option value="CONTACTED">CONTACTED</option>
                            <option value="ARCHIVED">ARCHIVED</option>
                          </select>
                        </td>

                        <td className="py-3 px-4 text-right">
                          <button
                            onClick={() => deleteInquiry(inq.id)}
                            className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition"
                            title="Delete Inquiry"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: SERVICES REPEATER FORM */}
      {activeTab === "services" && (
        <form onSubmit={handleSaveServices} className="space-y-6">
          <div className="space-y-6">
            {servicesData.map((service, sIdx) => (
              <div
                key={service.id}
                className="bg-slate-900 rounded-2xl border border-slate-800 p-6 space-y-4"
              >
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <span className="font-mono text-2xl font-black text-rose-500">
                    Service {service.number}
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    ID: {service.id}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block font-bold text-slate-300 mb-1">
                      Service Title (English) *
                    </label>
                    <input
                      type="text"
                      required
                      value={service.title.en}
                      onChange={(e) =>
                        handleServiceChange(sIdx, "title", {
                          ...service.title,
                          en: e.target.value,
                        })
                      }
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-300 mb-1">
                      शीर्षक (नेपालीमा)
                    </label>
                    <input
                      type="text"
                      value={service.title.np}
                      onChange={(e) =>
                        handleServiceChange(sIdx, "title", {
                          ...service.title,
                          np: e.target.value,
                        })
                      }
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-nepali"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block font-bold text-slate-300 mb-1">
                      Description (English) *
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={service.description.en}
                      onChange={(e) =>
                        handleServiceChange(sIdx, "description", {
                          ...service.description,
                          en: e.target.value,
                        })
                      }
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-300 mb-1">
                      विवरण (नेपालीमा)
                    </label>
                    <textarea
                      rows={3}
                      value={service.description.np}
                      onChange={(e) =>
                        handleServiceChange(sIdx, "description", {
                          ...service.description,
                          np: e.target.value,
                        })
                      }
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white font-nepali"
                    />
                  </div>
                </div>

                {/* Deliverables Repeater */}
                <div className="pt-2 border-t border-slate-850 space-y-3">
                  <div className="flex items-center justify-between">
                    <p className="font-mono text-xs font-bold text-slate-300 uppercase">
                      Core Deliverables Checklist ({service.deliverables.en.length})
                    </p>
                    <button
                      type="button"
                      onClick={() => handleAddDeliverable(sIdx)}
                      className="inline-flex items-center gap-1 text-xs font-mono text-rose-400 hover:text-rose-300"
                    >
                      <PlusCircle className="w-3.5 h-3.5" />
                      <span>Add Deliverable</span>
                    </button>
                  </div>

                  <div className="space-y-2">
                    {service.deliverables.en.map((item, dIdx) => (
                      <div key={dIdx} className="flex items-center gap-2">
                        <input
                          type="text"
                          value={item}
                          onChange={(e) =>
                            handleDeliverableChange(sIdx, "en", dIdx, e.target.value)
                          }
                          className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white"
                          placeholder="Deliverable item (EN)"
                        />
                        <input
                          type="text"
                          value={service.deliverables.np[dIdx] || ""}
                          onChange={(e) =>
                            handleDeliverableChange(sIdx, "np", dIdx, e.target.value)
                          }
                          className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white font-nepali"
                          placeholder="नेपाली विवरण"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveDeliverable(sIdx, dIdx)}
                          className="p-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="px-6 py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-mono font-bold rounded-xl transition flex items-center gap-2 cursor-pointer shadow-lg shadow-rose-900/30"
            >
              <Save className="w-4 h-4" />
              <span>Save Studio Services</span>
            </button>
          </div>
        </form>
      )}

      {/* TAB 3: MANIFESTO & ABOUT SETTINGS */}
      {activeTab === "about" && (
        <form onSubmit={handleSaveAbout} className="space-y-6">
          <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 space-y-4">
            <h3 className="font-mono text-xs font-bold text-slate-300 uppercase tracking-wider border-b border-slate-800 pb-2">
              Sanokuraa Manifesto & Story Copy
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-bold text-slate-300 mb-1">
                  Studio Manifesto (English) *
                </label>
                <textarea
                  rows={4}
                  required
                  value={manifestoEn}
                  onChange={(e) => setManifestoEn(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white leading-relaxed"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-300 mb-1">
                  घोषणापत्र / दृष्टि (नेपालीमा)
                </label>
                <textarea
                  rows={4}
                  value={manifestoNp}
                  onChange={(e) => setManifestoNp(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white leading-relaxed font-nepali"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-bold text-slate-300 mb-1">
                  Sanokuraa Origin Story (English) *
                </label>
                <textarea
                  rows={4}
                  required
                  value={storyEn}
                  onChange={(e) => setStoryEn(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white leading-relaxed"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-300 mb-1">
                  हाम्रो यात्रा / कथा (नेपालीमा)
                </label>
                <textarea
                  rows={4}
                  value={storyNp}
                  onChange={(e) => setStoryNp(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white leading-relaxed font-nepali"
                />
              </div>
            </div>
          </div>

          <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 space-y-4">
            <h3 className="font-mono text-xs font-bold text-slate-300 uppercase tracking-wider border-b border-slate-800 pb-2">
              Contact & Social Channels
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-bold text-slate-300 mb-1">
                  Official Editorial Email
                </label>
                <input
                  type="email"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-300 mb-1">
                  Instagram URL
                </label>
                <input
                  type="url"
                  value={instagram}
                  onChange={(e) => setInstagram(e.target.value)}
                  placeholder="https://instagram.com/sanokuraa"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-300 mb-1">
                  YouTube Channel URL
                </label>
                <input
                  type="url"
                  value={youtube}
                  onChange={(e) => setYoutube(e.target.value)}
                  placeholder="https://youtube.com/@sanokuraa"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-300 mb-1">
                  Twitter / X Profile URL
                </label>
                <input
                  type="url"
                  value={twitter}
                  onChange={(e) => setTwitter(e.target.value)}
                  placeholder="https://twitter.com/sanokuraa"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="px-6 py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-mono font-bold rounded-xl transition flex items-center gap-2 cursor-pointer shadow-lg shadow-rose-900/30"
            >
              <Save className="w-4 h-4" />
              <span>Save Manifesto & Settings</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
