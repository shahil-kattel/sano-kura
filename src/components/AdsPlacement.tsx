"use client";

import React, { useState, useEffect } from "react";
import { Layout } from "lucide-react";

interface AdSlot {
  id: string;
  name: string;
  position: string;
  resolution: string;
  type: "image" | "script" | "html";
  content: string;
  targetUrl?: string;
  active: boolean;
}

const STORAGE_KEY = "sano_kura_ads_manager";

export default function AdsPlacement({ position }: { position: string }) {
  const [ads, setAds] = useState<AdSlot[]>([]);

  useEffect(() => {
    const load = () => {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved) as AdSlot[];
          setAds(parsed.filter((a) => a.active && a.position === position));
        } else {
          setAds([]);
        }
      } catch {
        setAds([]);
      }
    };
    load();
    window.addEventListener("storage", load);
    return () => window.removeEventListener("storage", load);
  }, [position]);

  if (ads.length === 0) {
    return (
      <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl p-4 text-center">
        <div className="flex items-center justify-center gap-2 text-gray-400">
          <Layout className="w-4 h-4" />
          <span className="text-xs font-medium">
            Ad Placement — {position}
          </span>
        </div>
        <p className="text-[10px] text-gray-400 mt-1">
          No active ad configured for this position
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {ads.map((ad) => (
        <div key={ad.id} className="bg-white border border-gray-200 rounded-xl p-3 shadow-xs">
          {ad.type === "image" ? (
            <a
              href={ad.targetUrl || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <img
                src={ad.content}
                alt={ad.name}
                className="w-full rounded-lg object-cover"
              />
            </a>
          ) : (
            <div
              className="bg-gray-900 text-gray-200 p-3 rounded-lg text-xs font-mono overflow-x-auto"
              dangerouslySetInnerHTML={{ __html: ad.content }}
            />
          )}
        </div>
      ))}
    </div>
  );
}