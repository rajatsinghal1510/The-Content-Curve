"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { useGlobalContext } from "@/app/providers";
import Magnetic from "../ui/Magnetic";
import TextReveal from "../ui/TextReveal";
import ImageReveal from "../ui/ImageReveal";
import Link from "next/link";

// =========================================================================
// FUTURE-PROOF HERO MEDIA SLOTS CONFIGURATION
// Replace these paths or URLs to update the Hero visual elements.
// =========================================================================
const HERO_ASSETS = {
  // 1. HERO VIDEO (Widescreen 16:9 cinematic loop)
  heroVideo: "/videos/hero/hero-video.mp4",

  // 2. FEATURED PHOTOGRAPHY (Portrait lookbook image)
  featuredPhoto: "/images/rashmeet-concert.jpg",

  // 3. BRANDING / IDENTITY MOCKUP (Square detail image)
  brandingMockup: "/images/hero-mockup.jpg",

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

    // Slow, multi-layered parallax collage scroll triggers
    const ctx = gsap.context(() => {
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
    }, heroRef);

    return () => ctx.revert();
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
      className="relative w-full min-h-screen bg-obsidian flex flex-col px-6 md:px-12 lg:px-16 pt-32 pb-24 overflow-hidden select-none"
      id="hero"
    >
      {/* Grid overlay lines */}
      <div className="absolute inset-0 grid grid-cols-1 md:grid-cols-4 opacity-[0.015] pointer-events-none z-1">
        <div className="border-r border-primary-text" />
        <div className="border-r border-primary-text" />
        <div className="border-r border-primary-text" />
        <div className="w-full" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start my-auto">
        
        {/* Left Column: Sticky Typography & Branding Mockup */}
        <div className="col-span-1 lg:col-span-5 flex flex-col items-start gap-8 lg:sticky lg:top-28">
          <div ref={textContainerRef} className="flex flex-col items-start gap-8">
            {/* Branding Studio Label */}
            <div className="flex items-center gap-4 text-[10px] font-mono tracking-[0.25em] text-brand-red uppercase">
              <span className="w-8 h-[1px] bg-brand-red" />
              <span>CREATIVE BRANDING STUDIO</span>
            </div>

            {/* Headline */}
            <TextReveal
              text="Turning Scrolls Into Sales."
              tag="h1"
              className="text-5xl sm:text-7xl md:text-[5.5rem] lg:text-[5rem] xl:text-[6rem] font-serif text-primary-text leading-[0.9] tracking-tight uppercase font-medium max-w-xl"
            />

            {/* Supporting Text */}
            <p className="text-sm sm:text-base md:text-lg text-secondary-text leading-relaxed font-sans max-w-lg mt-2">
              We craft branding, content, websites and campaigns that transform attention into lasting business growth.
            </p>

            {/* CTAs */}
            <div className="flex flex-row items-center gap-8 mt-6">
              <Magnetic>
                <Link
                  href="#work"
                  className="bg-charcoal text-primary-text text-[10px] uppercase tracking-[0.2em] font-mono font-bold px-8 py-4 border border-primary-text/10 hover:border-brand-red hover:text-brand-red transition-all duration-300 rounded-none bg-obsidian select-none cursor-pointer"
                  onMouseEnter={() => setCursorType("pointer")}
                  onMouseLeave={() => setCursorType("default")}
                >
                  View Our Work
                </Link>
              </Magnetic>

              <Magnetic>
                <Link
                  href="#contact"
                  className="text-[10px] uppercase tracking-[0.2em] font-mono text-secondary-text hover:text-brand-red transition-colors duration-300 flex items-center gap-2 group select-none cursor-pointer"
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

          {/* SLOT 3: BRANDING / IDENTITY MOCKUP (1:1 square frame) */}
          <div className="w-full aspect-square relative border border-surface bg-charcoal/20 mt-12 overflow-hidden group">
            <ImageReveal
              src={HERO_ASSETS.brandingMockup}
              alt="The Content Curve Branding Mockup Placeholder"
              fill
              priority={true}
              className="object-cover w-full h-full grayscale group-hover:grayscale-0 transition-all duration-1000"
            />
          </div>
        </div>

        {/* Right Column: Layered Editorial Media Collage */}
        <div className="col-span-1 lg:col-span-7 flex flex-col gap-16 md:gap-24 w-full">
          
          {/* SLOT 1: HERO VIDEO (16:9 widescreen player) */}
          <div 
            ref={videoContainerRef} 
            className="w-full aspect-video relative border border-surface bg-charcoal/20 overflow-hidden group"
          >
            <video
              src={HERO_ASSETS.heroVideo}
              autoPlay
              loop
              muted
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
              muted
              playsInline
              preload="metadata"
              className="object-cover w-full h-full grayscale group-hover:grayscale-0 transition-all duration-1000"
            />
          </div>

          {/* SLOT 5: FUTURE CLIENT SHOWCASE (Landscape 3:2 project reveal frame) */}
          <div 
            ref={showcaseContainerRef} 
            className="w-full aspect-[3/2] relative border border-surface bg-charcoal/20 overflow-hidden group"
          >
            <ImageReveal
              src={HERO_ASSETS.futureShowcase}
              alt="The Content Curve Future Client Showcase Placeholder"
              fill
              className="object-cover w-full h-full grayscale group-hover:grayscale-0 transition-all duration-1000"
            />
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
