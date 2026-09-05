"use client";

import React from "react";
import TextReveal from "../ui/TextReveal";

const brands = [
  { 
    name: "TRISS",
    style: "font-serif text-base sm:text-xl md:text-2xl tracking-[0.22em] sm:tracking-[0.25em] font-medium"
  },
  { 
    name: "BEYOND BY NISHA",
    style: "font-sans text-[10px] sm:text-xs md:text-base tracking-[0.14em] sm:tracking-[0.22em] font-normal whitespace-nowrap"
  },
  { 
    name: "ALORA",
    style: "font-serif text-base sm:text-xl md:text-2xl tracking-[0.22em] sm:tracking-[0.28em] font-normal"
  },
  { 
    name: "KAAFI",
    style: "font-mono text-sm sm:text-lg md:text-xl tracking-[0.22em] sm:tracking-[0.3em] font-semibold"
  },
  { 
    name: "NOIR",
    style: "font-serif text-base sm:text-xl md:text-2xl tracking-[0.25em] sm:tracking-[0.35em] font-semibold"
  },
  { 
    name: "VERVE",
    style: "font-sans text-sm sm:text-lg md:text-xl tracking-[0.25em] sm:tracking-[0.35em] font-light"
  }
];

export default function Clients() {
  return (
    <section
      className="relative w-full bg-obsidian pt-12 sm:pt-16 md:pt-24 pb-16 sm:pb-24 md:pb-32 px-4 sm:px-6 md:px-12 border-b border-surface/50"
      id="clients"
    >
      {/* Grid overlay lines */}
      <div className="absolute inset-0 grid grid-cols-1 md:grid-cols-4 opacity-[0.015] pointer-events-none">
        <div className="border-r border-primary-text" />
        <div className="border-r border-primary-text" />
        <div className="border-r border-primary-text" />
        <div className="w-full" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col gap-10 sm:gap-16 select-none">
        
        {/* Title and Supporting copy */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 sm:gap-6 w-full">
          <div className="flex flex-col items-start">
            <div className="flex items-center gap-3 sm:gap-4 text-xs font-mono tracking-[0.25em] text-brand-red uppercase mb-3 sm:mb-4">
              <span className="w-6 sm:w-8 h-[1px] bg-brand-red" />
              <span>TRUSTED BY</span>
            </div>
            <TextReveal
              text="Brands we've had the privilege to work with."
              tag="h2"
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif text-primary-text leading-tight uppercase font-medium max-w-xl"
            />
          </div>

          <p className="text-sm md:text-base text-secondary-text leading-relaxed font-sans max-w-xs md:mb-2">
            Building long-term creative partnerships with ambitious brands.
          </p>
        </div>

        {/* Logo showcase row with border-y dividers */}
        <div className="w-full flex flex-col items-center mt-2 sm:mt-6">
          <div className="w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-y-8 sm:gap-y-12 gap-x-4 sm:gap-x-8 py-8 sm:py-16 border-y border-surface/50 items-center justify-items-center">
            {brands.map((brand, idx) => (
              <div 
                key={idx}
                className="flex items-center justify-center w-full h-10 sm:h-12 text-secondary-text/40 hover:text-primary-text transition-colors duration-300 cursor-default select-none"
              >
                <span className={`${brand.style} text-center uppercase`}>
                  {brand.name}
                </span>
              </div>
            ))}
          </div>

          {/* Muted footnote */}
          <span className="text-[10px] sm:text-xs font-mono text-secondary-text/25 tracking-wider italic mt-6 sm:mt-8 select-none text-center">
            Selected client collaborations & creative partnerships.
          </span>
        </div>

      </div>
    </section>
  );
}
