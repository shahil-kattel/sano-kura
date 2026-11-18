"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { AlertCircle, RefreshCw, Home } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Sanokuraa App Error caught:", error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 py-12">
      <div className="w-12 h-12 rounded-full bg-red-50 border border-red-100 flex items-center justify-center text-accent mb-4">
        <AlertCircle className="w-6 h-6" />
      </div>
      <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-ink mb-2">
        Something went wrong
      </h2>
      <p className="text-slate text-xs sm:text-sm max-w-md mb-6 leading-relaxed">
        {error?.message ||
          "An unexpected error occurred while loading this page. Our editorial desk has been notified."}
      </p>
      <div className="flex items-center gap-3">
        <button
          onClick={() => reset()}
          className="inline-flex items-center gap-2 px-4 py-2 bg-ink text-white rounded-lg text-xs font-medium hover:bg-accent transition"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Try again</span>
        </button>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-hairline text-slate hover:text-ink rounded-lg text-xs font-medium transition"
        >
          <Home className="w-3.5 h-3.5" />
          <span>Return to Home</span>
        </Link>
      </div>
    </div>
  );
}
