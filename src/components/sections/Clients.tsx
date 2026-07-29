"use client";

import React from "react";
import TextReveal from "../ui/TextReveal";

const brands = [
  { name: "TRISS Salon" },
  { name: "Activiya" },
  { name: "The Content Curve" }
];

export default function Clients() {
  return (
    <section
      className="relative w-full bg-obsidian py-32 md:py-40 px-6 md:px-12 border-b border-surface/50"
      id="clients"
    >
      {/* Grid overlay lines */}
      <div className="absolute inset-0 grid grid-cols-1 md:grid-cols-4 opacity-[0.015] pointer-events-none">
        <div className="border-r border-primary-text" />
        <div className="border-r border-primary-text" />
        <div className="border-r border-primary-text" />
        <div className="w-full" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col gap-16 select-none">
        
        {/* Title and Supporting copy */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 w-full">
          <div className="flex flex-col items-start">
            <div className="flex items-center gap-4 text-xs font-mono tracking-[0.25em] text-brand-red uppercase mb-4">
              <span className="w-6 h-[1px] bg-brand-red" />
              <span>TRUSTED BY</span>
            </div>
            <TextReveal
              text="Brands we've had the privilege to create for."
              tag="h2"
              className="text-3xl sm:text-4xl md:text-5xl font-serif text-primary-text leading-tight uppercase font-medium max-w-xl"
            />
          </div>

          <p className="text-sm md:text-base text-secondary-text leading-relaxed font-sans max-w-xs md:mb-2">
            Building long-term creative partnerships with ambitious brands.
          </p>
        </div>

        {/* Logo showcase row with border-y dividers */}
        <div className="w-full flex flex-col items-center mt-6">
          <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-12 sm:gap-6 py-12 border-y border-surface/50 items-center justify-items-center">
            {brands.map((brand, idx) => (
              <span
                key={idx}
                className="font-mono text-base sm:text-lg md:text-xl tracking-[0.25em] uppercase font-bold text-secondary-text/30 hover:text-white hover:scale-105 transition-all duration-500 cursor-default select-none"
              >
                {brand.name}
              </span>
            ))}
          </div>

          {/* Muted footnote */}
          <span className="text-[10px] sm:text-xs font-mono text-secondary-text/20 tracking-wider italic mt-8 select-none">
            More collaborations coming soon.
          </span>
        </div>

      </div>
    </section>
  );
}
