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
import { useLanguage } from "@/context/LanguageContext";
import { useNews } from "@/context/NewsContext";

export default function AdminCategoriesPage() {
  const { language, toNepaliNum } = useLanguage();
  const { categories, articles, addCategory, deleteCategory } = useNews();

  const [nameNp, setNameNp] = useState("");
  const [nameEn, setNameEn] = useState("");
  const [slug, setSlug] = useState("");
  const [descriptionNp, setDescriptionNp] = useState("");
  const [descriptionEn, setDescriptionEn] = useState("");
  const [color, setColor] = useState("#b91c1c");
  const [success, setSuccess] = useState(false);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameNp.trim() || !slug.trim()) return;

    addCategory({
      slug: slug.trim().toLowerCase(),
      name: { np: nameNp.trim(), en: nameEn.trim() || nameNp.trim() },
      description: {
        np: descriptionNp.trim() || `${nameNp} सम्बन्धी समाचारहरू।`,
        en: descriptionEn.trim() || `Articles and updates on ${nameEn || nameNp}.`,
      },
      color,
    });

    setNameNp("");
    setNameEn("");
    setSlug("");
    setDescriptionNp("");
    setDescriptionEn("");
    setSuccess(true);
    setTimeout(() => setSuccess(false), 2500);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight flex items-center gap-2">
            <FolderTree className="w-6 h-6 text-red-600" />
            <span>{language === "np" ? "समाचार विधा तथा वर्ग व्यवस्थापन" : "Category Manager"}</span>
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            {language === "np"
              ? `हाल पोर्टलमा ${toNepaliNum(categories.length)} विधाहरू सक्रिय छन्।`
              : `Currently ${categories.length} categories active across the portal.`}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Add New Category Form (1 Col) */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs space-y-4">
          <h3 className="font-extrabold text-sm text-gray-900 border-b border-gray-100 pb-3 flex items-center gap-2">
            <PlusCircle className="w-4 h-4 text-red-600" />
            <span>{language === "np" ? "नयाँ विधा थप्नुहोस्" : "Add New Category"}</span>
          </h3>

          {success && (
            <div className="p-2.5 bg-green-100 text-green-800 rounded-lg text-xs font-bold flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              <span>{language === "np" ? "विधा सफलतापूर्वक थपियो!" : "Category added!"}</span>
            </div>
          )}

          <form onSubmit={handleAdd} className="space-y-3 text-xs">
            <div>
              <label className="block font-bold text-gray-700 mb-1">विधा नाम (नेपालीमा) *</label>
              <input
                type="text"
                required
                placeholder="e.g. शिक्षा / क्याम्पस"
                value={nameNp}
                onChange={(e) => setNameNp(e.target.value)}
                className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            <div>
              <label className="block font-bold text-gray-700 mb-1">Category Name (English)</label>
              <input
                type="text"
                placeholder="e.g. Education"
                value={nameEn}
                onChange={(e) => {
                  setNameEn(e.target.value);
                  if (!slug) {
                    setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-"));
                  }
                }}
                className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            <div>
              <label className="block font-bold text-gray-700 mb-1">URL Slug (अङ्ग्रेजीमा) *</label>
              <input
                type="text"
                required
                placeholder="e.g. education"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-red-500 font-mono"
              />
            </div>

            <div>
              <label className="block font-bold text-gray-700 mb-1">रङ पहिचान (Brand Color)</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="w-8 h-8 rounded border-none cursor-pointer"
                />
                <span className="font-mono text-gray-600">{color}</span>
              </div>
            </div>

            <div>
              <label className="block font-bold text-gray-700 mb-1">संक्षिप्त विवरण (नेपाली)</label>
              <textarea
                rows={2}
                value={descriptionNp}
                onChange={(e) => setDescriptionNp(e.target.value)}
                placeholder="यस विधाको संक्षिप्त विवरण..."
                className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 rounded-lg transition"
            >
              {language === "np" ? "+ विधा थप्नुहोस्" : "+ Add Category"}
            </button>
          </form>
        </div>

        {/* Existing Categories Table (2 Cols) */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-200 shadow-xs overflow-hidden">
          <div className="p-4 border-b border-gray-100 font-bold text-sm text-gray-800">
            {language === "np" ? "सक्रिय विधाहरूको सूची" : "Active Categories List"}
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50 text-gray-500 font-bold uppercase tracking-wider border-b border-gray-100">
                <tr>
                  <th className="py-3 px-4">विधा (Category)</th>
                  <th className="py-3 px-4">Slug</th>
                  <th className="py-3 px-4">लेख संख्या (Articles)</th>
                  <th className="py-3 px-4 text-right">कार्य (Actions)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-700">
                {categories.map((cat) => {
                  const count = articles.filter((a) => a.category === cat.slug).length;
                  return (
                    <tr key={cat.slug} className="hover:bg-gray-50/70 transition">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2.5">
                          <span
                            className="w-3.5 h-3.5 rounded-full shrink-0"
                            style={{ backgroundColor: cat.color }}
                          />
                          <div>
                            <span className="font-bold text-gray-900 block">
                              {cat.name[language]}
                            </span>
                            <span className="text-[10px] text-gray-400">
                              {cat.name.en}
                            </span>
                          </div>
                        </div>
                      </td>

                      <td className="py-3 px-4 font-mono text-gray-600">
                        /category/{cat.slug}
                      </td>

                      <td className="py-3 px-4 font-mono font-bold text-gray-900">
                        {toNepaliNum(count)}
                      </td>

                      <td className="py-3 px-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1.5">
                          <Link
                            href={`/category/${cat.slug}`}
                            target="_blank"
                            className="p-1.5 rounded bg-gray-100 text-gray-600 hover:text-red-600 transition"
                            title="Open category page"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </Link>

                          <button
                            onClick={() => {
                              if (confirm(`Delete category "${cat.name.np}"?`)) {
                                deleteCategory(cat.slug);
                              }
                            }}
                            className="p-1.5 rounded bg-gray-100 text-gray-500 hover:bg-red-50 hover:text-red-600 transition"
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
