"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TextReveal from "../ui/TextReveal";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const processSteps = [
  {
    num: "01",
    title: "Discover",
    desc: "Understand the brand, audience and goals."
  },
  {
    num: "02",
    title: "Strategize",
    desc: "Define the creative direction and content plan."
  },
  {
    num: "03",
    title: "Create",
    desc: "Photography, videography, branding and design."
  },
  {
    num: "04",
    title: "Launch",
    desc: "Deliver campaigns and digital experiences."
  },
  {
    num: "05",
    title: "Grow",
    desc: "Measure, refine and scale what works."
  }
];

export default function Process() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressLineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    const progressLine = progressLineRef.current;
    if (!container || !track || !progressLine) return;

    const steps = container.querySelectorAll(".process-step-item");

    // Context wrapper for safe cleanup
    const ctx = gsap.context(() => {
      // 1. Animate progress line scale-y on scroll
      gsap.fromTo(
        progressLine,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: track,
            start: "top 45%",
            end: "bottom 55%",
            scrub: true,
          }
        }
      );

      // 2. Animate step fades & highlight active index
      steps.forEach((step) => {
        gsap.fromTo(
          step,
          { opacity: 0.15, y: 15 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            scrollTrigger: {
              trigger: step,
              start: "top 65%",
              end: "bottom 35%",
              toggleActions: "play reverse play reverse",
            }
          }
        );
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-obsidian py-16 sm:py-24 md:py-48 px-4 sm:px-6 md:px-12 border-b border-surface/50 scroll-mt-12 md:scroll-mt-20"
      id="process"
    >
      {/* Grid overlay lines */}
      <div className="absolute inset-0 grid grid-cols-1 md:grid-cols-4 opacity-[0.015] pointer-events-none">
        <div className="border-r border-primary-text" />
        <div className="border-r border-primary-text" />
        <div className="border-r border-primary-text" />
        <div className="w-full" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-14 lg:gap-24 items-start select-none">
        
        {/* LEFT COLUMN: Sticky Header block (4 Columns) */}
        <div className="col-span-1 lg:col-span-4 lg:sticky lg:top-32 lg:h-fit flex flex-col items-start min-w-0 w-full">
          <div className="flex items-center gap-3 sm:gap-4 text-xs font-mono tracking-[0.25em] text-brand-red uppercase mb-3 sm:mb-4">
            <span className="w-6 sm:w-8 h-[1px] bg-brand-red" />
            <span>OUR PROCESS</span>
          </div>
          <TextReveal
            text="From Idea to Impact."
            tag="h2"
            className="text-3xl sm:text-4xl md:text-5xl font-serif text-primary-text leading-none uppercase max-w-sm"
          />
        </div>

        {/* RIGHT COLUMN: Vertical timeline with steps (8 Columns) */}
        <div 
          ref={trackRef}
          className="col-span-1 lg:col-span-8 relative pl-6 sm:pl-10 md:pl-16 py-2 sm:py-4 min-w-0 w-full"
        >
          {/* Base timeline track gray line */}
          <div className="absolute left-[3px] md:left-[5px] top-0 bottom-0 w-[1px] bg-surface/30" />

          {/* Animating red progress line */}
          <div 
            ref={progressLineRef}
            className="absolute left-[2px] md:left-[4px] top-0 bottom-0 w-[3px] bg-brand-red origin-top"
            style={{ transform: "scaleY(0)" }}
          />

          {/* Process steps list */}
          <div className="flex flex-col w-full">
            {processSteps.map((step, idx) => (
              <div
                key={idx}
                className="process-step-item py-6 sm:py-10 md:py-16 first:pt-0 last:pb-0 border-b border-surface/20 last:border-none flex flex-col gap-2.5 sm:gap-4 transition-all duration-500"
              >
                {/* Step number and title */}
                <div className="flex items-baseline gap-3 sm:gap-4 font-serif">
                  <span className="font-mono text-xs md:text-sm text-brand-red font-semibold select-none">
                    {step.num}
                  </span>
                  <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-primary-text font-medium uppercase tracking-wide">
                    {step.title}
                  </h3>
                </div>

                {/* Step description */}
                <p className="text-sm md:text-base text-secondary-text leading-relaxed font-sans max-w-xl pl-0">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
