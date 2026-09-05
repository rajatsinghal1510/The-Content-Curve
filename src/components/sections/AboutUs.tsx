"use client";

import React from "react";

export default function AboutUs() {
  return (
    <section
      className="relative w-full bg-obsidian pt-16 sm:pt-24 md:pt-36 pb-12 sm:pb-16 md:pb-24 px-4 sm:px-6 md:px-12 border-b border-surface/50 scroll-mt-12 md:scroll-mt-20"
      id="about-us"
    >
      {/* Editorial layout lines */}
      <div className="absolute inset-0 grid grid-cols-1 md:grid-cols-4 opacity-[0.015] pointer-events-none">
        <div className="border-r border-primary-text" />
        <div className="border-r border-primary-text" />
        <div className="border-r border-primary-text" />
        <div className="w-full" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-24 items-start select-none">
          
          {/* LEFT COLUMN: ABOUT US LABEL & MAIN LARGE TYPOGRAPHY */}
          <div className="col-span-1 lg:col-span-7 flex flex-col items-start">
            <div className="flex items-center gap-3 sm:gap-4 text-xs font-mono tracking-[0.25em] text-brand-red uppercase mb-4 sm:mb-6 md:mb-8">
              <span className="w-6 sm:w-8 h-[1px] bg-brand-red" />
              <span>ABOUT US</span>
            </div>

            <p className="text-lg sm:text-2xl md:text-3xl font-serif text-brand-red tracking-wide font-normal mb-3 sm:mb-4">
              Built for bolder brands.
            </p>

            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-serif text-primary-text leading-[1.3] sm:leading-[1.25] tracking-tight font-normal">
              The Content Curve is a creative studio built for brands that want to be seen, remembered, and talked about.
            </h2>
          </div>

          {/* RIGHT COLUMN: SUPPORTING COPY & CLOSING STATEMENT */}
          <div className="col-span-1 lg:col-span-5 flex flex-col justify-between lg:pt-14">
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-secondary-text font-sans font-light leading-relaxed">
              We bring together strategy, photography, videography, web design, and performance marketing to create work that looks good and delivers a purpose.
            </p>

            <div className="pt-6 sm:pt-8 md:pt-12 mt-6 sm:mt-8 md:mt-12 border-t border-surface/40 flex flex-col">
              <p className="text-lg sm:text-2xl md:text-3xl font-serif text-primary-text tracking-wide font-normal">
                We think. We create. <span className="text-brand-red font-medium">We grow brands.</span>
              </p>
            </div>
          </div>

        </div>

        {/* BOTTOM DETAIL: EDITORIAL SMALL-LABEL LINE */}
        <div className="pt-6 sm:pt-8 md:pt-12 mt-8 sm:mt-12 md:mt-20 border-t border-surface/40 flex items-center justify-between">
          <span className="text-[9px] min-[360px]:text-[10px] sm:text-xs font-mono tracking-[0.12em] min-[380px]:tracking-[0.2em] sm:tracking-[0.3em] text-secondary-text/50 uppercase">
            STRATEGY / CONTENT / DESIGN / GROWTH
          </span>
        </div>
      </div>
    </section>
  );
}
