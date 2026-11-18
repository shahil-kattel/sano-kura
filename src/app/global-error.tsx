"use client";

import React, { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Sanokuraa Global Error caught:", error);
  }, [error]);

  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col items-center justify-center bg-[#FAFAFA] text-[#111827] font-sans p-6">
        <div className="max-w-md w-full bg-white border border-[#E5E7EB] rounded-2xl p-8 text-center shadow-xs">
          <div className="w-12 h-12 rounded-full bg-red-50 border border-red-100 flex items-center justify-center text-[#B91C1C] mx-auto mb-4 font-bold text-lg">
            !
          </div>
          <h1 className="text-xl font-bold mb-2 font-serif text-[#111827]">
            Sanokuraa — System Error
          </h1>
          <p className="text-xs text-[#6B7280] mb-6 leading-relaxed">
            {error?.message ||
              "A critical layout error occurred. Please click below to reset and reload the application."}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
            <button
              onClick={() => reset()}
              className="w-full sm:w-auto px-5 py-2.5 bg-[#111827] text-white rounded-lg text-xs font-medium hover:bg-[#B91C1C] transition cursor-pointer"
            >
              Reload Page
            </button>
            <button
              onClick={() => {
                if (typeof window !== "undefined") {
                  window.location.href = "/";
                }
              }}
              className="w-full sm:w-auto px-5 py-2.5 bg-white border border-[#E5E7EB] text-[#111827] rounded-lg text-xs font-medium hover:bg-gray-50 transition cursor-pointer"
            >
              Go to Home
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
