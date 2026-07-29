"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGlobalContext } from "@/app/providers";
import Image from "next/image";
import TextReveal from "../ui/TextReveal";

const servicesList = [
  { 
    num: "01", 
    name: "Social Media Strategy", 
    visual: "/videos/triss-reel.mp4", 
    isVideo: true 
  },
  { 
    num: "02", 
    name: "Content Production", 
    visual: "/videos/hero/hero-video.mp4", 
    isVideo: true 
  },
  { 
    num: "03", 
    name: "Photography", 
    visual: "/images/rashmeet-concert.jpg", 
    isVideo: false 
  },
  { 
    num: "04", 
    name: "Videography", 
    visual: "/videos/hero/hero-video.mp4", 
    isVideo: true 
  },
  { 
    num: "05", 
    name: "Brand Identity", 
    visual: "/images/hero-mockup.jpg", 
    isVideo: false 
  },
  { 
    num: "06", 
    name: "Website Design", 
    visual: "/images/hero-showcase.jpg", 
    isVideo: false 
  },
  { 
    num: "07", 
    name: "Performance Marketing", 
    visual: "/images/hero-campaign.jpg", 
    isVideo: false 
  }
];

export default function About() {
  const { setCursorType } = useGlobalContext();
  const [activeIndex, setActiveIndex] = useState(0);

  const activeAsset = servicesList[activeIndex] || servicesList[0];

  return (
    <section
      className="relative w-full bg-obsidian py-24 md:py-32 px-6 md:px-12 border-b border-surface/50"
      id="about"
    >
      {/* Grid overlay lines */}
      <div className="absolute inset-0 grid grid-cols-1 md:grid-cols-4 opacity-[0.015] pointer-events-none">
        <div className="border-r border-primary-text" />
        <div className="border-r border-primary-text" />
        <div className="border-r border-primary-text" />
        <div className="w-full" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-stretch select-none">
        
        {/* LEFT COLUMN: WHAT WE DO DESCRIPTION & SERVICES (6 Columns) */}
        <div className="col-span-1 lg:col-span-6 flex flex-col items-start justify-between h-full">
          <div className="flex flex-col items-start w-full">
            <div className="flex items-center gap-4 text-xs font-mono tracking-[0.25em] text-brand-red uppercase">
              <span className="w-6 h-[1px] bg-brand-red" />
              <span>WHAT WE DO</span>
            </div>

            <TextReveal
              text="Creative solutions built for modern brands."
              tag="h2"
              className="text-3xl sm:text-4xl md:text-5xl font-serif text-primary-text leading-tight uppercase font-medium mt-6"
            />

            <p className="text-sm md:text-base text-secondary-text leading-relaxed font-sans mt-6 max-w-xl">
              We help brands grow through strategy, storytelling, and design. From social media to websites, we create work that connects with people and delivers lasting impact.
            </p>
          </div>

          {/* Editorial services list with hover shifting */}
          <div className="w-full flex flex-col mt-12 border-t border-surface/50">
            {servicesList.map((service, idx) => (
              <div
                key={service.num}
                className="w-full flex items-center justify-between py-4.5 border-b border-surface/50 group cursor-pointer transition-all duration-500 hover:pl-4 select-none"
                onMouseEnter={() => {
                  setActiveIndex(idx);
                  setCursorType("pointer");
                }}
                onMouseLeave={() => {
                  setCursorType("default");
                }}
              >
                <div className="flex items-center gap-6">
                  <span className={`font-mono text-xs md:text-sm transition-colors duration-300 font-medium ${
                    activeIndex === idx ? "text-brand-red" : "text-secondary-text/30 group-hover:text-brand-red"
                  }`}>
                    {service.num}
                  </span>
                  <span className={`font-serif text-lg md:text-xl transition-colors duration-300 tracking-wide font-normal uppercase ${
                    activeIndex === idx ? "text-brand-red" : "text-primary-text group-hover:text-brand-red"
                  }`}>
                    {service.name}
                  </span>
                </div>
                <span className={`transition-all duration-300 font-mono text-sm ${
                  activeIndex === idx ? "text-brand-red translate-x-1.5" : "text-secondary-text/20 group-hover:text-brand-red group-hover:translate-x-1.5"
                }`}>
                  &rarr;
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN: DOMINANT HEIGHT-MATCHED DISPLAY CONTAINER (6 Columns) */}
        <div className="col-span-1 lg:col-span-6 relative w-full h-full min-h-[500px] lg:sticky lg:top-32 flex flex-col mt-8 lg:mt-0">
          
          {/* Main Active Asset frame (matches full height of the service list) */}
          <div className="relative w-full h-full flex-grow border border-surface bg-charcoal/30 overflow-hidden shadow-2xl min-h-[500px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, scale: 1.03 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
                className="absolute inset-0 w-full h-full"
              >
                {activeAsset.isVideo ? (
                  <video
                    src={activeAsset.visual}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="metadata"
                    className="object-cover w-full h-full grayscale hover:grayscale-0 transition-all duration-1000"
                  />
                ) : (
                  <Image
                    src={activeAsset.visual}
                    alt={activeAsset.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover w-full h-full grayscale hover:grayscale-0 transition-all duration-1000"
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
