"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Newspaper,
  PlusCircle,
  Pin,
  Trash2,
  Edit2,
  ExternalLink,
  CheckCircle2,
  Filter,
  X,
  Clock,
  Sparkles,
} from "lucide-react";
import { Report, BeatType } from "@/types/sanokuraa";
import { useSanokuraa } from "@/context/SanokuraaContext";
import ImageUpload from "@/components/admin/ImageUpload";

const BEATS: BeatType[] = [
  "Society",
  "Culture",
  "Tech",
  "Policy",
  "Ground Report",
  "Environment",
  "Economy",
];

export default function AdminReportingPage() {
  const { reports, addReport, editReport, deleteReport, togglePinReport } = useSanokuraa();

  const [isComposerOpen, setIsComposerOpen] = useState(false);
  const [editingReportId, setEditingReportId] = useState<string | null>(null);
  const [filterBeat, setFilterBeat] = useState<string>("ALL");
  const [notice, setNotice] = useState<string | null>(null);

  // Composer Form State
  const [titleEn, setTitleEn] = useState("");
  const [titleNp, setTitleNp] = useState("");
  const [slug, setSlug] = useState("");
  const [excerptEn, setExcerptEn] = useState("");
  const [excerptNp, setExcerptNp] = useState("");
  const [contentEn, setContentEn] = useState("");
  const [contentNp, setContentNp] = useState("");
  const [beat, setBeat] = useState<BeatType>("Ground Report");
  const [coverImage, setCoverImage] = useState("");
  const [reporterNameEn, setReporterNameEn] = useState("Pasang Dorje Lama");
  const [reporterNameNp, setReporterNameNp] = useState("पासाङ दोर्जे लामा");
  const [reporterRoleEn, setReporterRoleEn] = useState("Himalayan Correspondent");
  const [reporterRoleNp, setReporterRoleNp] = useState("हिमाली संवाददाता");
  const [reporterAvatar, setReporterAvatar] = useState(
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
  );
  const [readTime, setReadTime] = useState("5 min read");
  const [status, setStatus] = useState<"DRAFT" | "PUBLISHED">("PUBLISHED");
  const [isPinnedToGrid, setIsPinnedToGrid] = useState(true);

  const openNewComposer = () => {
    setEditingReportId(null);
    setTitleEn("");
    setTitleNp("");
    setSlug(`report-${Date.now()}`);
    setExcerptEn("");
    setExcerptNp("");
    setContentEn("");
    setContentNp("");
    setBeat("Ground Report");
    setCoverImage(
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80"
    );
    setStatus("PUBLISHED");
    setIsPinnedToGrid(true);
    setIsComposerOpen(true);
  };

  const openEditComposer = (report: Report) => {
    setEditingReportId(report.id);
    setTitleEn(report.title.en);
    setTitleNp(report.title.np);
    setSlug(report.slug);
    setExcerptEn(report.excerpt.en);
    setExcerptNp(report.excerpt.np);
    setContentEn(report.content.en.join("\n\n"));
    setContentNp(report.content.np.join("\n\n"));
    setBeat(report.beat);
    setCoverImage(report.coverImage);
    setReporterNameEn(report.reporter.name.en);
    setReporterNameNp(report.reporter.name.np);
    setReporterRoleEn(report.reporter.role.en);
    setReporterRoleNp(report.reporter.role.np);
    setReporterAvatar(report.reporter.avatar);
    setReadTime(report.readTime);
    setStatus(report.status);
    setIsPinnedToGrid(report.isPinnedToGrid);
    setIsComposerOpen(true);
  };

  const handleSaveReport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!titleEn.trim() || !coverImage.trim()) return;

    const payload: Report = {
      id: editingReportId || `rep-${Date.now()}`,
      slug: slug.trim() || `report-${Date.now()}`,
      title: {
        en: titleEn.trim(),
        np: titleNp.trim() || titleEn.trim(),
      },
      excerpt: {
        en: excerptEn.trim(),
        np: excerptNp.trim() || excerptEn.trim(),
      },
      content: {
        en: contentEn.split("\n\n").filter((p) => p.trim()),
        np: contentNp.split("\n\n").filter((p) => p.trim()),
      },
      coverImage: coverImage.trim(),
      beat,
      reporter: {
        name: {
          en: reporterNameEn.trim(),
          np: reporterNameNp.trim() || reporterNameEn.trim(),
        },
        avatar: reporterAvatar,
        role: {
          en: reporterRoleEn.trim(),
          np: reporterRoleNp.trim() || reporterRoleEn.trim(),
        },
      },
      date: "Nov 17, 2026",
      dateNep: "२०८१ मंसिर २",
      readTime,
      status,
      isPinnedToGrid,
      views: 120,
    };

    if (editingReportId) {
      editReport(editingReportId, payload);
      setNotice("Report dispatch updated successfully!");
    } else {
      addReport(payload);
      setNotice("New dispatch published to reporting newsroom!");
    }

    setIsComposerOpen(false);
    setTimeout(() => setNotice(null), 3000);
  };

  const handleDelete = (id: string) => {
    if (confirm("Permanently delete this reporting dispatch?")) {
      deleteReport(id);
      setNotice("Report deleted.");
      setTimeout(() => setNotice(null), 2500);
    }
  };

  const filteredReports =
    filterBeat === "ALL" ? reports : reports.filter((r) => r.beat === filterBeat);

  const pinnedCount = reports.filter((r) => r.isPinnedToGrid).length;

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Newspaper className="w-5 h-5 text-red-500" />
            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Sanokuraa Reporting Newsroom
            </h1>
          </div>
          <p className="text-xs text-slate-400">
            Curate field dispatches and beat investigations. Exactly 6 pinned dispatches populate the homepage 2×3 desktop grid (currently {pinnedCount}/6 pinned).
          </p>
        </div>

        <button
          onClick={openNewComposer}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-mono font-bold transition cursor-pointer shadow-md shadow-red-900/30"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Compose New Dispatch</span>
        </button>
      </div>

      {notice && (
        <div className="p-3 bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-medium rounded-xl flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{notice}</span>
        </div>
      )}

      {/* Beat Filter Bar */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
        <button
          onClick={() => setFilterBeat("ALL")}
          className={`px-3 py-1.5 rounded-xl text-xs font-mono font-semibold transition cursor-pointer ${
            filterBeat === "ALL"
              ? "bg-white text-ink shadow-xs"
              : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
          }`}
        >
          All Beats ({reports.length})
        </button>
        {BEATS.map((b) => (
          <button
            key={b}
            onClick={() => setFilterBeat(b)}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-semibold transition cursor-pointer whitespace-nowrap ${
              filterBeat === b
                ? "bg-red-600 text-white shadow-xs"
                : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
            }`}
          >
            {b} ({reports.filter((r) => r.beat === b).length})
          </button>
        ))}
      </div>

      {/* Reports Grid Table */}
      <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-sm">
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
            Reporting Inventory ({filteredReports.length})
          </h2>
          <span className="text-xs font-mono text-slate-400">
            {pinnedCount} pinned to 2x3 grid
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 text-slate-400 uppercase font-mono text-[11px] border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Cover (16:9)</th>
                <th className="py-3 px-4">Headline & Beat</th>
                <th className="py-3 px-4">Byline</th>
                <th className="py-3 px-4 text-center">2×3 Grid Pin</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-850">
              {filteredReports.map((report) => (
                <tr key={report.id} className="hover:bg-slate-850/50 transition">
                  <td className="py-3 px-4 w-28">
                    <img
                      src={report.coverImage}
                      alt={report.title.en}
                      className="w-24 aspect-video rounded-lg object-cover bg-slate-950 border border-slate-800"
                    />
                  </td>

                  <td className="py-3 px-4 max-w-sm">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-bold uppercase mb-1 inline-block">
                      {report.beat}
                    </span>
                    <h3 className="font-bold text-white line-clamp-1">
                      {report.title.en}
                    </h3>
                    <p className="text-[11px] text-slate-400 font-mono mt-0.5">
                      /{report.slug}
                    </p>
                  </td>

                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <img
                        src={report.reporter.avatar}
                        alt="Reporter"
                        className="w-6 h-6 rounded-full object-cover border border-slate-800"
                      />
                      <div>
                        <p className="font-semibold text-white">{report.reporter.name.en}</p>
                        <p className="text-[10px] text-slate-400 font-mono">
                          {report.readTime}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => togglePinReport(report.id)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-bold transition cursor-pointer ${
                        report.isPinnedToGrid
                          ? "bg-red-500/20 text-red-400 border border-red-500/40"
                          : "bg-slate-800 text-slate-400 border border-slate-700"
                      }`}
                    >
                      <Pin className={`w-3 h-3 ${report.isPinnedToGrid ? "fill-red-400" : ""}`} />
                      <span>{report.isPinnedToGrid ? "Pinned (2×3)" : "Unpinned"}</span>
                    </button>
                  </td>

                  <td className="py-3 px-4 text-center">
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                        report.status === "PUBLISHED"
                          ? "bg-emerald-500/20 text-emerald-400"
                          : "bg-amber-500/20 text-amber-400"
                      }`}
                    >
                      {report.status}
                    </span>
                  </td>

                  <td className="py-3 px-4 text-right space-x-2">
                    <Link
                      href={`/reporting/${report.slug}`}
                      target="_blank"
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 inline-block"
                      title="View Live Reader View"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </Link>
                    <button
                      onClick={() => openEditComposer(report)}
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
                      title="Edit Dispatch"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(report.id)}
                      className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition"
                      title="Delete Dispatch"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Composer Modal / Drawer */}
      {isComposerOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setIsComposerOpen(false)}
        >
          <div
            className="w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-5 shadow-2xl max-h-[92vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <h3 className="font-bold text-white text-base">
                {editingReportId ? "Edit Reporting Dispatch" : "Compose Field Dispatch"}
              </h3>
              <button
                onClick={() => setIsComposerOpen(false)}
                className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveReport} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-300 mb-1">
                    Beat Taxonomy *
                  </label>
                  <select
                    value={beat}
                    onChange={(e) => setBeat(e.target.value as BeatType)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-red-500"
                  >
                    {BEATS.map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-300 mb-1">
                    URL Slug *
                  </label>
                  <input
                    type="text"
                    required
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    placeholder="karnali-high-altitude-solar"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-white font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">
                  Headline (English) *
                </label>
                <input
                  type="text"
                  required
                  value={titleEn}
                  onChange={(e) => setTitleEn(e.target.value)}
                  placeholder="e.g. Karnali's High-Altitude Solar Revolution..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-white text-sm font-semibold"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">
                  मुख्य शीर्षक (नेपालीमा)
                </label>
                <input
                  type="text"
                  value={titleNp}
                  onChange={(e) => setTitleNp(e.target.value)}
                  placeholder="नेपाली शीर्षक..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-white font-nepali text-sm"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">
                  Excerpt / Summary (English) *
                </label>
                <textarea
                  rows={2}
                  required
                  value={excerptEn}
                  onChange={(e) => setExcerptEn(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">
                  सारांश (नेपालीमा)
                </label>
                <textarea
                  rows={2}
                  value={excerptNp}
                  onChange={(e) => setExcerptNp(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white font-nepali"
                />
              </div>

              {/* Cover Graphic Image Upload from Computer */}
              <div className="pt-2 border-t border-slate-800">
                <ImageUpload
                  value={coverImage}
                  onChange={setCoverImage}
                  label="16:9 Cover Graphic (From Computer) *"
                  helperText="Upload 16:9 aspect-video photograph or visual graphic from your computer"
                  required
                />
              </div>

              {/* Byline / Reporter Selectors */}
              <div className="pt-2 border-t border-slate-800 space-y-3">
                <p className="font-mono text-xs font-bold text-slate-300 uppercase">
                  Reporter & Byline Attribution
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-400 mb-1">Reporter Name (EN)</label>
                    <input
                      type="text"
                      value={reporterNameEn}
                      onChange={(e) => setReporterNameEn(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">Reporter Name (NP)</label>
                    <input
                      type="text"
                      value={reporterNameNp}
                      onChange={(e) => setReporterNameNp(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white font-nepali"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">Reporter Role (EN)</label>
                    <input
                      type="text"
                      value={reporterRoleEn}
                      onChange={(e) => setReporterRoleEn(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">Estimated Read Time</label>
                    <input
                      type="text"
                      value={readTime}
                      onChange={(e) => setReadTime(e.target.value)}
                      placeholder="e.g. 5 min read"
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Full Article Content */}
              <div className="pt-2 border-t border-slate-800 space-y-3">
                <div>
                  <label className="block font-bold text-slate-300 mb-1">
                    Full Content (English - separate paragraphs with empty line)
                  </label>
                  <textarea
                    rows={6}
                    value={contentEn}
                    onChange={(e) => setContentEn(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white leading-relaxed font-sans"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-300 mb-1">
                    पूर्ण समाचार विवरण (नेपालीमा)
                  </label>
                  <textarea
                    rows={6}
                    value={contentNp}
                    onChange={(e) => setContentNp(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white leading-relaxed font-nepali"
                  />
                </div>
              </div>

              {/* Grid Pin & Status Toggles */}
              <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-6">
                  <label className="flex items-center gap-2 cursor-pointer font-bold text-slate-200">
                    <input
                      type="checkbox"
                      checked={isPinnedToGrid}
                      onChange={(e) => setIsPinnedToGrid(e.target.checked)}
                      className="w-4 h-4 rounded bg-slate-950 border-slate-800 text-red-600 focus:ring-0"
                    />
                    <span>Pin to 2×3 Desktop Homepage Grid</span>
                  </label>

                  <div className="flex items-center gap-2">
                    <span className="text-slate-400">Status:</span>
                    <select
                      value={status}
                      onChange={(e) => setStatus(e.target.value as any)}
                      className="bg-slate-950 border border-slate-800 text-white rounded-lg px-3 py-1 font-mono text-xs"
                    >
                      <option value="PUBLISHED">PUBLISHED</option>
                      <option value="DRAFT">DRAFT</option>
                    </select>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setIsComposerOpen(false)}
                    className="px-4 py-2 border border-slate-800 rounded-xl text-slate-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-red-600 hover:bg-red-500 text-white font-mono font-bold rounded-xl transition"
                  >
                    {editingReportId ? "Save Changes" : "Publish Dispatch"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
