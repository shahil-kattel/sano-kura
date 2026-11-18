"use client";

import React, { useState } from "react";
import {
  Quote as QuoteIcon,
  PlusCircle,
  Trash2,
  Edit2,
  Check,
  X,
  Shuffle,
  Image as ImageIcon,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";
import { Quote } from "@/types/sanokuraa";
import { useSanokuraa } from "@/context/SanokuraaContext";
import ImageUpload from "@/components/admin/ImageUpload";

export default function AdminQuotesPage() {
  const { quotes, addQuote, editQuote, deleteQuote, toggleQuoteActive } = useSanokuraa();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingQuoteId, setEditingQuoteId] = useState<string | null>(null);

  // Form fields
  const [quoteTextEn, setQuoteTextEn] = useState("");
  const [quoteTextNp, setQuoteTextNp] = useState("");
  const [authorEn, setAuthorEn] = useState("");
  const [authorNp, setAuthorNp] = useState("");
  const [tag, setTag] = useState("Integrity");
  const [graphicUrl, setGraphicUrl] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [notice, setNotice] = useState<string | null>(null);

  const openAddModal = () => {
    setEditingQuoteId(null);
    setQuoteTextEn("");
    setQuoteTextNp("");
    setAuthorEn("");
    setAuthorNp("");
    setTag("Integrity");
    setGraphicUrl("");
    setIsActive(true);
    setIsModalOpen(true);
  };

  const openEditModal = (q: Quote) => {
    setEditingQuoteId(q.id);
    setQuoteTextEn(q.quoteText.en);
    setQuoteTextNp(q.quoteText.np);
    setAuthorEn(q.author.en);
    setAuthorNp(q.author.np);
    setTag(q.tag);
    setGraphicUrl(q.graphicUrl || "");
    setIsActive(q.isActive);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quoteTextEn.trim() || !authorEn.trim()) return;

    if (editingQuoteId) {
      editQuote(editingQuoteId, {
        quoteText: {
          en: quoteTextEn.trim(),
          np: quoteTextNp.trim() || quoteTextEn.trim(),
        },
        author: {
          en: authorEn.trim(),
          np: authorNp.trim() || authorEn.trim(),
        },
        tag: tag.trim() || "Editorial",
        graphicUrl: graphicUrl.trim() || undefined,
        isActive,
      });
      setNotice("Quote updated successfully!");
    } else {
      addQuote({
        quoteText: {
          en: quoteTextEn.trim(),
          np: quoteTextNp.trim() || quoteTextEn.trim(),
        },
        author: {
          en: authorEn.trim(),
          np: authorNp.trim() || authorEn.trim(),
        },
        tag: tag.trim() || "Editorial",
        graphicUrl: graphicUrl.trim() || undefined,
        isActive,
      });
      setNotice("New quote added to shuffle pool!");
    }

    setIsModalOpen(false);
    setTimeout(() => setNotice(null), 3000);
  };

  const handleDelete = (id: string) => {
    if (confirm("Remove this quote from the shuffle pool?")) {
      deleteQuote(id);
      setNotice("Quote deleted.");
      setTimeout(() => setNotice(null), 2500);
    }
  };

  const activeCount = quotes.filter((q) => q.isActive).length;

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <QuoteIcon className="w-5 h-5 text-blue-400" />
            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Quotes & Graphics Randomizer
            </h1>
          </div>
          <p className="text-xs text-slate-400">
            Curate the pool of editorial quotes and framed graphic cards shuffled on the homepage hero. Active quotes in pool: {activeCount}.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-mono font-bold transition cursor-pointer shadow-md shadow-blue-900/30"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Add Quote Card</span>
        </button>
      </div>

      {/* Notice Banner */}
      {notice && (
        <div className="p-3 bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-medium rounded-xl flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{notice}</span>
        </div>
      )}

      {/* Quotes Inventory Table */}
      <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-sm">
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
            Active Pool ({quotes.length})
          </h2>
          <span className="text-xs font-mono text-slate-400">
            {activeCount} active in live shuffle
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 text-slate-400 uppercase font-mono text-[11px] border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Artwork / Type</th>
                <th className="py-3 px-4">Quote & Attribution</th>
                <th className="py-3 px-4">Tag</th>
                <th className="py-3 px-4 text-center">In Pool</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-850">
              {quotes.map((q) => (
                <tr key={q.id} className="hover:bg-slate-850/50 transition">
                  <td className="py-3 px-4">
                    {q.graphicUrl ? (
                      <div className="flex items-center gap-2">
                        <img
                          src={q.graphicUrl}
                          alt="Graphic"
                          className="w-10 h-10 rounded-lg object-cover bg-slate-950 border border-slate-800"
                        />
                        <span className="text-[10px] font-mono text-purple-400 font-bold bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20">
                          Artwork
                        </span>
                      </div>
                    ) : (
                      <span className="text-[10px] font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                        Text Quote
                      </span>
                    )}
                  </td>

                  <td className="py-3 px-4 max-w-md">
                    <p className="text-white font-medium line-clamp-2">
                      "{q.quoteText.en}"
                    </p>
                    <p className="text-[11px] text-slate-400 mt-0.5 font-mono">
                      — {q.author.en} ({q.author.np})
                    </p>
                  </td>

                  <td className="py-3 px-4 font-mono text-slate-300">
                    <span className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800">
                      {q.tag}
                    </span>
                  </td>

                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => toggleQuoteActive(q.id)}
                      className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold transition cursor-pointer ${
                        q.isActive
                          ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                          : "bg-slate-800 text-slate-500 border border-slate-700"
                      }`}
                    >
                      {q.isActive ? "Active (In Pool)" : "Disabled"}
                    </button>
                  </td>

                  <td className="py-3 px-4 text-right space-x-2">
                    <button
                      onClick={() => openEditModal(q)}
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition cursor-pointer"
                      title="Edit Quote"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(q.id)}
                      className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition cursor-pointer"
                      title="Delete Quote"
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

      {/* Add / Edit Quote Modal */}
      {isModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-5 shadow-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <h3 className="font-bold text-white text-base">
                {editingQuoteId ? "Edit Quote & Attribution" : "Create New Quote Card"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-300 mb-1">
                  Quote Text (English) *
                </label>
                <textarea
                  required
                  rows={3}
                  value={quoteTextEn}
                  onChange={(e) => setQuoteTextEn(e.target.value)}
                  placeholder="e.g. Journalism is what somebody somewhere wants to suppress..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:outline-none focus:border-blue-500 font-sans"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">
                  उद्धरण / विचार (नेपालीमा)
                </label>
                <textarea
                  rows={3}
                  value={quoteTextNp}
                  onChange={(e) => setQuoteTextNp(e.target.value)}
                  placeholder="नेपालीमा अनुवाद वा मौलिक विचार..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:outline-none focus:border-blue-500 font-nepali"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-300 mb-1">
                    Author / Attribution (English) *
                  </label>
                  <input
                    type="text"
                    required
                    value={authorEn}
                    onChange={(e) => setAuthorEn(e.target.value)}
                    placeholder="e.g. George Orwell"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-blue-500 font-sans"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-300 mb-1">
                    लेखक / वक्ता (नेपालीमा)
                  </label>
                  <input
                    type="text"
                    value={authorNp}
                    onChange={(e) => setAuthorNp(e.target.value)}
                    placeholder="जस्तै: जर्ज ओर्वेल"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-blue-500 font-nepali"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-300 mb-1">
                    Category Tag
                  </label>
                  <input
                    type="text"
                    value={tag}
                    onChange={(e) => setTag(e.target.value)}
                    placeholder="e.g. Integrity, Literature, Truth"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-blue-500 font-sans"
                  />
                </div>

                <div className="flex items-center gap-3 pt-6">
                  <input
                    type="checkbox"
                    id="isActiveToggle"
                    checked={isActive}
                    onChange={(e) => setIsActive(e.target.checked)}
                    className="w-4 h-4 rounded bg-slate-950 border-slate-800 text-blue-600 focus:ring-0"
                  />
                  <label htmlFor="isActiveToggle" className="font-bold text-slate-300 cursor-pointer">
                    Active in live Hero Shuffle pool
                  </label>
                </div>
              </div>

              {/* Optional Graphic Card Image Upload from Computer */}
              <div className="pt-2 border-t border-slate-800">
                <ImageUpload
                  value={graphicUrl}
                  onChange={setGraphicUrl}
                  label="Framed Artwork / Graphic Card (Optional)"
                  helperText="Upload artwork image from your computer to transform this into a Graphic Quote Card"
                />
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-slate-800 rounded-xl text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-mono font-bold rounded-xl transition"
                >
                  {editingQuoteId ? "Save Changes" : "Add to Pool"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
