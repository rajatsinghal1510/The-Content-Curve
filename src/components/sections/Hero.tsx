"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { useGlobalContext } from "@/app/providers";
import Magnetic from "../ui/Magnetic";
import TextReveal from "../ui/TextReveal";
import ImageReveal from "../ui/ImageReveal";
import Link from "next/link";
import { setupContainerHoverAudio } from "@/lib/videoAudio";

// =========================================================================
// FUTURE-PROOF HERO MEDIA SLOTS CONFIGURATION
// Replace these paths or URLs to update the Hero visual elements.
// =========================================================================
const HERO_ASSETS = {
  // 1. HERO VIDEO (Widescreen 16:9 cinematic loop)
  heroVideo: "/videos/hero/hero-video.mp4",

  // 2. FEATURED PHOTOGRAPHY (Portrait lookbook image)
  featuredPhoto: "/images/rashmeet-concert.jpg",

  // 3. WEDDING SHOWREEL (Square video loop on the left)
  weddingShowreel: "/videos/wedding-showreel.mp4.mp4",

  // 4. SOCIAL MEDIA CAMPAIGN (Smartphone aspect ratio tall portrait image)
  socialCampaign: "/images/hero-campaign.jpg",

  // 5. FUTURE CLIENT SHOWCASE (Landscape project cover image)
  futureShowcase: "/images/hero-showcase.jpg"
};

export default function Hero() {
  const { setCursorType } = useGlobalContext();
  const heroRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);

  // References for right-side collage elements (for slow scroll parallax)
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const photoContainerRef = useRef<HTMLDivElement>(null);
  const socialContainerRef = useRef<HTMLDivElement>(null);
  const showcaseContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    // Slow, multi-layered parallax collage scroll triggers (Desktop only to keep mobile 60fps native scroll)
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        if (textContainerRef.current) {
          gsap.to(textContainerRef.current, {
            y: "-5%",
            opacity: 0.4,
            scrollTrigger: {
              trigger: hero,
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
            ease: "none",
          });
        }

        if (videoContainerRef.current) {
          gsap.to(videoContainerRef.current, {
            y: "8%",
            scrollTrigger: {
              trigger: hero,
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
            ease: "none",
          });
        }

        if (photoContainerRef.current) {
          gsap.to(photoContainerRef.current, {
            y: "-4%",
            scrollTrigger: {
              trigger: hero,
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
            ease: "none",
          });
        }

        if (socialContainerRef.current) {
          gsap.to(socialContainerRef.current, {
            y: "-15%",
            scrollTrigger: {
              trigger: hero,
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
            ease: "none",
          });
        }

        if (showcaseContainerRef.current) {
          gsap.to(showcaseContainerRef.current, {
            y: "6%",
            scrollTrigger: {
              trigger: hero,
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
            ease: "none",
          });
        }
      });
    }, heroRef);

    const cleanupAudio = setupContainerHoverAudio(heroRef.current);

    return () => {
      ctx.revert();
      cleanupAudio();
    };
  }, []);

  const handleScrollDown = () => {
    const nextSection = document.getElementById("manifesto");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={heroRef}
      className="relative w-full min-h-screen bg-obsidian flex flex-col px-4 sm:px-6 md:px-12 lg:px-16 pt-24 sm:pt-28 md:pt-32 pb-16 sm:pb-20 md:pb-24 overflow-hidden select-none"
      id="hero"
    >
      <span id="manifesto" className="sr-only" />

      {/* Grid overlay lines */}
      <div className="absolute inset-0 grid grid-cols-1 md:grid-cols-4 opacity-[0.015] pointer-events-none z-1">
        <div className="border-r border-primary-text" />
        <div className="border-r border-primary-text" />
        <div className="border-r border-primary-text" />
        <div className="w-full" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 lg:gap-24 items-start my-auto">
        
        {/* Left Column: Sticky Typography & Branding Mockup */}
        <div className="col-span-1 lg:col-span-5 flex flex-col items-start gap-8 lg:sticky lg:top-28 min-w-0 w-full">
          <div ref={textContainerRef} className="flex flex-col items-start gap-6 sm:gap-8 w-full min-w-0">
            {/* Branding Studio Label */}
            <div className="flex items-center gap-3 sm:gap-4 text-[10px] font-mono tracking-[0.25em] text-brand-red uppercase">
              <span className="w-6 sm:w-8 h-[1px] bg-brand-red" />
              <span>CREATIVE BRANDING STUDIO</span>
            </div>

            {/* Headline */}
            <TextReveal
              text="Turning Scrolls Into Sales."
              tag="h1"
              className="text-[1.85rem] min-[360px]:text-[2.15rem] sm:text-5xl md:text-6xl lg:text-[5rem] xl:text-[6rem] font-serif text-primary-text leading-[1.05] sm:leading-[0.95] tracking-tight uppercase font-medium w-full max-w-xl"
            />

            {/* Supporting Text */}
            <p className="text-sm sm:text-base md:text-lg text-secondary-text leading-relaxed font-sans w-full max-w-lg mt-1 sm:mt-2">
              We craft branding, content, websites and campaigns that transform attention into lasting business growth.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-6 mt-4 sm:mt-6 w-full sm:w-auto">
              <Magnetic>
                <Link
                  href="#work"
                  className="bg-charcoal text-primary-text text-[10px] uppercase tracking-[0.2em] font-mono font-bold px-7 sm:px-8 py-3.5 sm:py-4 border border-primary-text/10 hover:border-brand-red hover:text-brand-red transition-all duration-300 rounded-none bg-obsidian select-none cursor-pointer text-center"
                  onMouseEnter={() => setCursorType("pointer")}
                  onMouseLeave={() => setCursorType("default")}
                >
                  View Our Work
                </Link>
              </Magnetic>

              <Magnetic>
                <Link
                  href="#contact"
                  className="text-[10px] uppercase tracking-[0.2em] font-mono text-secondary-text hover:text-brand-red transition-colors duration-300 flex items-center justify-center sm:justify-start gap-2 group select-none cursor-pointer py-2 sm:py-0"
                  onMouseEnter={() => setCursorType("pointer")}
                  onMouseLeave={() => setCursorType("default")}
                >
                  Start a Project
                  <svg 
                    width="12" 
                    height="12" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="1.8"
                    className="transform group-hover:translate-x-1 transition-transform"
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </Link>
              </Magnetic>
            </div>
          </div>

          {/* SLOT 3: WEDDING SHOWREEL (Desktop Placement in Left Column) */}
          <div className="hidden lg:block w-[84%] aspect-[9/16] relative border border-surface bg-charcoal/20 mt-12 overflow-hidden group">
            <video
              src={HERO_ASSETS.weddingShowreel}
              autoPlay
              loop
              playsInline
              preload="metadata"
              className="object-cover w-full h-full grayscale group-hover:grayscale-0 transition-all duration-1000"
            />
          </div>
        </div>

        {/* Right Column / Media Collage Area */}
        <div id="work" className="col-span-1 lg:col-span-7 w-full scroll-mt-24 md:scroll-mt-28">
          
          {/* ================================================================= */}
          {/* MOBILE ART-DIRECTED MEDIA FLOW (lg:hidden)                        */}
          {/* ================================================================= */}
          <div className="flex lg:hidden flex-col gap-8 sm:gap-12 w-full mt-4">
            
            {/* 1. DOMINANT HERO VIDEO (16:9 widescreen focal point) */}
            <div className="w-full aspect-video relative border border-surface bg-charcoal/20 overflow-hidden group">
              <video
                src={HERO_ASSETS.heroVideo}
                autoPlay
                loop
                playsInline
                preload="auto"
                className="object-cover w-full h-full grayscale opacity-70 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-1000"
              />
              <div className="absolute inset-0 bg-black/20 pointer-events-none z-[5]" />
            </div>

            {/* 2. CURATED EDITORIAL PAIR (Rashmeet Photo 3:4 + Triss Reel 9:16) */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4 w-full">
              {/* Featured Photo */}
              <div className="w-full aspect-[3/4] relative border border-surface bg-charcoal/20 overflow-hidden group">
                <ImageReveal
                  src={HERO_ASSETS.featuredPhoto}
                  alt="The Content Curve Featured Lookbook Visual"
                  fill
                  className="object-cover w-full h-full grayscale group-hover:grayscale-0 transition-all duration-1000"
                />
              </div>

              {/* Triss Salon Reel */}
              <div className="w-full aspect-[3/4] relative border border-surface bg-charcoal/20 overflow-hidden group">
                <video
                  src="/videos/triss-reel.mp4"
                  autoPlay
                  loop
                  playsInline
                  preload="metadata"
                  className="object-cover w-full h-full grayscale group-hover:grayscale-0 transition-all duration-1000"
                />
              </div>
            </div>

            {/* 3. WEDDING SHOWREEL (Centered vertical showcase) */}
            <div className="w-[75%] sm:w-[65%] mx-auto aspect-[9/16] relative border border-surface bg-charcoal/20 overflow-hidden group">
              <video
                src={HERO_ASSETS.weddingShowreel}
                autoPlay
                loop
                playsInline
                preload="metadata"
                className="object-cover w-full h-full grayscale group-hover:grayscale-0 transition-all duration-1000"
              />
            </div>

            {/* 4. LANDSCAPE SHOWCASE (Widescreen cinematic player) */}
            <div className="w-full aspect-video relative border border-surface bg-charcoal/20 overflow-hidden group">
              <video
                src="/videos/landscape-showreel.mp4"
                autoPlay
                loop
                playsInline
                preload="metadata"
                className="object-cover w-full h-full grayscale group-hover:grayscale-0 transition-all duration-1000"
              />
            </div>

          </div>

          {/* ================================================================= */}
          {/* DESKTOP LAYERED COLLAGE (hidden lg:flex) — 100% UNCHANGED         */}
          {/* ================================================================= */}
          <div className="hidden lg:flex flex-col gap-16 md:gap-24 w-full">
            
            {/* SLOT 1: HERO VIDEO (16:9 widescreen player) */}
            <div 
              ref={videoContainerRef} 
              className="w-full aspect-video relative border border-surface bg-charcoal/20 overflow-hidden group"
            >
              <video
                src={HERO_ASSETS.heroVideo}
                autoPlay
                loop
                playsInline
                preload="auto"
                className="object-cover w-full h-full grayscale opacity-60 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-1000"
              />
              <div className="absolute inset-0 bg-black/20 pointer-events-none z-[5]" />
            </div>

            {/* SLOT 2: FEATURED PHOTOGRAPHY (Portrait 3:4 lookbook frame) */}
            <div 
              ref={photoContainerRef} 
              className="w-[85%] aspect-[3/4] relative border border-surface bg-charcoal/20 overflow-hidden group"
            >
              <ImageReveal
                src={HERO_ASSETS.featuredPhoto}
                alt="The Content Curve Featured Lookbook Visual"
                fill
                className="object-cover w-full h-full grayscale group-hover:grayscale-0 transition-all duration-1000"
              />
            </div>

            {/* SLOT 4: SOCIAL MEDIA CAMPAIGN (Vertical 9:16 smartphone aspect layout frame, playing Triss Salon video loop) */}
            <div 
              ref={socialContainerRef} 
              className="w-[60%] aspect-[9/16] relative border border-surface bg-charcoal/20 ml-auto -mt-32 md:-mt-48 z-10 overflow-hidden group"
            >
              <video
                src="/videos/triss-reel.mp4"
                autoPlay
                loop
                playsInline
                preload="metadata"
                className="object-cover w-full h-full grayscale group-hover:grayscale-0 transition-all duration-1000"
              />
            </div>

            {/* SLOT 5: FUTURE CLIENT SHOWCASE (Landscape video frame) */}
            <div 
              ref={showcaseContainerRef} 
              className="w-full h-[50vh] lg:h-[56.25vw] xl:h-[720px] relative z-0"
            >
              <div className="absolute top-0 right-0 h-full w-full lg:w-[171.4%] border border-surface bg-charcoal/20 overflow-hidden group">
                <video
                  src="/videos/landscape-showreel.mp4"
                  autoPlay
                  loop
                  playsInline
                  preload="metadata"
                  className="object-cover w-full h-full grayscale group-hover:grayscale-0 transition-all duration-1000"
                />
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Bottom Scroll Indicator */}
      <div className="w-full flex justify-center mt-12 relative z-10">
        <Magnetic>
          <button
            onClick={handleScrollDown}
            className="w-10 h-10 rounded-full border border-primary-text/5 flex items-center justify-center hover:border-brand-red transition-all duration-300 focus:outline-none bg-obsidian group"
            onMouseEnter={() => setCursorType("pointer")}
            onMouseLeave={() => setCursorType("default")}
            aria-label="Scroll down to Manifesto"
          >
            <svg 
              width="12" 
              height="12" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="1.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              className="text-primary-text group-hover:text-brand-red group-hover:translate-y-0.5 transition-all"
            >
              <line x1="12" y1="5" x2="12" y2="19" />
              <polyline points="19 12 12 19 5 12" />
            </svg>
          </button>
        </Magnetic>
      </div>
    </section>
  );
}
