"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  FolderTree,
  PlusCircle,
  Edit,
  Trash2,
  ExternalLink,
  CheckCircle,
} from "lucide-react";
import { useNews } from "@/context/NewsContext";

export default function AdminCategoriesPage() {
  const { categories, articles, addCategory, deleteCategory } = useNews();

  const [nameEn, setNameEn] = useState("");
  const [nameNp, setNameNp] = useState("");
  const [slug, setSlug] = useState("");
  const [descriptionEn, setDescriptionEn] = useState("");
  const [descriptionNp, setDescriptionNp] = useState("");
  const [color, setColor] = useState("#b91c1c");
  const [success, setSuccess] = useState(false);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameEn.trim() || !slug.trim()) return;

    addCategory({
      slug: slug.trim().toLowerCase(),
      name: { np: nameNp.trim() || nameEn.trim(), en: nameEn.trim() },
      description: {
        np: descriptionNp.trim() || `${nameEn} सम्बन्धी समाचारहरू।`,
        en: descriptionEn.trim() || `Articles and updates on ${nameEn}.`,
      },
      color,
    });

    setNameEn("");
    setNameNp("");
    setSlug("");
    setDescriptionEn("");
    setDescriptionNp("");
    setSuccess(true);
    setTimeout(() => setSuccess(false), 2500);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2.5">
            <FolderTree className="w-6 h-6 text-red-500" />
            <span>Category & Section Manager</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Organize content taxonomies and assign custom branding colors ({categories.length} active categories).
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Add New Category Form (1 Col) */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <h3 className="font-extrabold text-sm text-white border-b border-slate-800 pb-3 flex items-center gap-2">
            <PlusCircle className="w-4 h-4 text-red-500" />
            <span>Add New Category</span>
          </h3>

          {success && (
            <div className="p-3 bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 rounded-xl text-xs font-bold flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              <span>Category added successfully!</span>
            </div>
          )}

          <form onSubmit={handleAdd} className="space-y-3.5 text-xs">
            <div>
              <label className="block font-bold text-slate-300 mb-1">
                Category Name (English) *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Education"
                value={nameEn}
                onChange={(e) => {
                  setNameEn(e.target.value);
                  if (!slug) {
                    setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-"));
                  }
                }}
                className="w-full bg-slate-950 border border-slate-800 text-white rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-300 mb-1">
                विधा नाम (Nepali Name)
              </label>
              <input
                type="text"
                placeholder="e.g. शिक्षा / क्याम्पस"
                value={nameNp}
                onChange={(e) => setNameNp(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 text-white rounded-lg px-3 py-2 text-xs font-nepali focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-300 mb-1">
                URL Slug *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. education"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 text-white rounded-lg px-3 py-2 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-300 mb-1">
                Badge Color Accent
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="w-9 h-9 rounded-lg bg-transparent border border-slate-700 cursor-pointer p-0.5"
                />
                <span className="font-mono text-slate-300 font-bold">{color}</span>
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-300 mb-1">
                Description (English)
              </label>
              <textarea
                rows={2}
                value={descriptionEn}
                onChange={(e) => setDescriptionEn(e.target.value)}
                placeholder="Brief summary of stories in this category..."
                className="w-full bg-slate-950 border border-slate-800 text-white rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-500 text-white font-bold py-2.5 rounded-xl transition shadow-lg shadow-red-900/30"
            >
              + Create Category
            </button>
          </form>
        </div>

        {/* Categories Table (2 Cols) */}
        <div className="lg:col-span-2 bg-slate-900/80 border border-slate-800 rounded-2xl shadow-xl overflow-hidden">
          <div className="p-4 border-b border-slate-800 font-bold text-sm text-white">
            Active Categories Across Portal
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950/60 text-slate-400 font-bold uppercase tracking-wider border-b border-slate-800">
                <tr>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Route</th>
                  <th className="py-3 px-4">Stories</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                {categories.map((cat) => {
                  const count = articles.filter((a) => a.category === cat.slug).length;
                  return (
                    <tr key={cat.slug} className="hover:bg-slate-800/40 transition">
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <span
                            className="w-3.5 h-3.5 rounded-full shrink-0 shadow-sm"
                            style={{ backgroundColor: cat.color }}
                          />
                          <div>
                            <span className="font-bold text-white block">
                              {cat.name.en}
                            </span>
                            <span className="text-[11px] text-slate-500">
                              {cat.name.np}
                            </span>
                          </div>
                        </div>
                      </td>

                      <td className="py-3.5 px-4 font-mono text-slate-400 text-[11px]">
                        /category/{cat.slug}
                      </td>

                      <td className="py-3.5 px-4 font-mono font-bold text-white">
                        {count}
                      </td>

                      <td className="py-3.5 px-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1.5">
                          <Link
                            href={`/category/${cat.slug}`}
                            target="_blank"
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition border border-slate-700"
                            title="Open category live view"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </Link>

                          <button
                            onClick={() => {
                              if (confirm(`Delete category "${cat.name.en}"?`)) {
                                deleteCategory(cat.slug);
                              }
                            }}
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-950 text-slate-400 hover:text-rose-400 transition border border-slate-700"
                            title="Delete Category"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
