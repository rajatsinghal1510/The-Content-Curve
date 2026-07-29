"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Manifesto() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const text = textRef.current;
    if (!text) return;

    const words = text.querySelectorAll(".word");

    const textRevealAnimation = gsap.to(words, {
      scrollTrigger: {
        trigger: text,
        start: "top 75%",
        end: "bottom 35%",
        scrub: true,
      },
      opacity: 1,
      // Target color determined by custom attributes injected in the elements
      color: (index, target) => target.getAttribute("data-target-color") || "#F7F7F7",
      stagger: 0.1,
      ease: "power2.out",
    });

    return () => {
      textRevealAnimation.scrollTrigger?.kill();
    };
  }, []);

  const lines = [
    "We don't believe in creating content just to fill a feed.",
    "Every photograph, film, website, and campaign is designed to tell a story, build trust, and help brands grow.",
    "Simple ideas.",
    "Thoughtful execution.",
    "Lasting impact."
  ];

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen bg-obsidian py-32 md:py-48 flex items-center justify-center px-6 md:px-12 border-b border-surface"
      id="manifesto"
    >
      {/* Editorial layout lines */}
      <div className="absolute inset-0 grid grid-cols-1 md:grid-cols-4 opacity-[0.015] pointer-events-none">
        <div className="border-r border-primary-text" />
        <div className="border-r border-primary-text" />
        <div className="border-r border-primary-text" />
        <div className="w-full" />
      </div>

      <div className="w-full max-w-5xl mx-auto flex flex-col items-start gap-8 relative z-10">
        <div className="flex items-center gap-4 text-xs font-mono tracking-[0.25em] text-brand-red uppercase">
          <span className="w-6 h-[1px] bg-brand-red" />
          <span>Our Approach</span>
        </div>

        <p
          ref={textRef}
          className="text-xl sm:text-3xl md:text-4xl font-serif text-primary-text leading-[1.6] md:leading-[1.7] tracking-wide select-none max-w-[1000px] w-full self-center whitespace-normal break-words text-left"
        >
          {lines.map((line, lineIdx) => (
            <React.Fragment key={lineIdx}>
              {line.split(" ").map((word, wordIdx) => {
                const cleanWord = word.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
                const isHighlight = 
                  cleanWord === "story" || 
                  cleanWord === "trust" || 
                  cleanWord === "grow" || 
                  cleanWord === "impact";

                const targetColor = isHighlight ? "#E31B23" : "#F7F7F7";

                return (
                  <span
                    key={wordIdx}
                    className="word inline-block mr-[0.25em] transition-all duration-300 opacity-15"
                    data-target-color={targetColor}
                    style={{ 
                      color: "#3A3A3C",
                      fontWeight: isHighlight ? "500" : "normal"
                    }}
                  >
                    {word}
                  </span>
                );
              })}
              {lineIdx < lines.length - 1 && <br className="hidden md:inline" />}
            </React.Fragment>
          ))}
        </p>
      </div>
    </section>
  );
}
