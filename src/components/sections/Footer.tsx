"use client";

import React from "react";
import Magnetic from "../ui/Magnetic";
import { useGlobalContext } from "@/app/providers";

export default function Footer() {
  const { setCursorType } = useGlobalContext();

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative w-full bg-obsidian py-8 sm:py-12 px-4 sm:px-6 md:px-12 border-t border-surface/50 select-none">
      {/* Grid overlay lines */}
      <div className="absolute inset-0 grid grid-cols-1 md:grid-cols-4 opacity-[0.015] pointer-events-none">
        <div className="border-r border-primary-text" />
        <div className="border-r border-primary-text" />
        <div className="border-r border-primary-text" />
        <div className="w-full" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-secondary-text/30 font-mono text-center md:text-left">
        {/* Left Side: Copyright */}
        <div className="order-3 md:order-1">
          <span>© 2026 The Content Curve</span>
        </div>

        {/* Center: Links */}
        <div className="flex items-center gap-6 sm:gap-8 order-1 md:order-2">
          <a
            href="https://www.instagram.com/thecontentcurvemedia/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-brand-red transition-colors py-1.5 px-2 text-secondary-text/60 md:text-secondary-text/30"
            onMouseEnter={() => setCursorType("pointer")}
            onMouseLeave={() => setCursorType("default")}
          >
            Instagram
          </a>
          <a
            href="mailto:hello@thecontentcurve.in"
            className="hover:text-brand-red transition-colors py-1.5 px-2 text-secondary-text/60 md:text-secondary-text/30"
            onMouseEnter={() => setCursorType("pointer")}
            onMouseLeave={() => setCursorType("default")}
          >
            Email
          </a>
        </div>

        {/* Right Side: Back to top / Designed & Developed by */}
        <div className="flex flex-col md:flex-row items-center gap-3 md:gap-8 order-2 md:order-3">
          <span className="text-[11px] sm:text-xs">Designed & Developed by The Content Curve</span>
          <Magnetic>
            <button
              onClick={handleScrollToTop}
              className="flex items-center gap-2 hover:text-brand-red transition-colors focus:outline-none group text-[10px] py-1.5 px-2 text-secondary-text/60 md:text-secondary-text/30"
              onMouseEnter={() => setCursorType("pointer")}
              onMouseLeave={() => setCursorType("default")}
              aria-label="Back to top"
            >
              <span>BACK TO TOP</span>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="transform group-hover:-translate-y-0.5 transition-transform">
                <line x1="12" y1="19" x2="12" y2="5" />
                <polyline points="5 12 12 5 19 12" />
              </svg>
            </button>
          </Magnetic>
        </div>
      </div>
    </footer>
  );
}
