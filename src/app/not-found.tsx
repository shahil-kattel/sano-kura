import React from "react";
import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 py-16">
      <span className="font-editorial text-7xl sm:text-8xl font-bold text-accent tracking-tighter mb-2">
        ४०४
      </span>
      <h1 className="font-editorial text-2xl sm:text-3xl font-bold text-ink mb-2">
        पृष्ठ भेटिएन / Page Not Found
      </h1>
      <p className="text-slate text-xs sm:text-sm max-w-md mb-8 leading-relaxed">
        तपाईंले खोज्नुभएको सामग्री सरेको वा मेटिएको हुन सक्छ। The dispatch or archive you requested could not be located.
      </p>
      <div className="flex items-center gap-3">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-ink text-white rounded-lg text-xs font-medium hover:bg-accent transition"
        >
          <Home className="w-3.5 h-3.5" />
          <span>गृहपृष्ठ फर्कनुहोस् / Home</span>
        </Link>
      </div>
    </div>
  );
}
