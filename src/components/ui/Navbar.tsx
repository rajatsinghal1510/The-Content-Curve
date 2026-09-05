"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGlobalContext } from "@/app/providers";
import Magnetic from "./Magnetic";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const { navOpen, setNavOpen, setCursorType } = useGlobalContext();
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Control background styling
      if (currentScrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Control show/hide based on scroll direction
      if (currentScrollY > lastScrollY && currentScrollY > 150) {
        setVisible(false); // Scrolling down
      } else {
        setVisible(true); // Scrolling up
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && navOpen) {
        setNavOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [navOpen, setNavOpen]);

  useEffect(() => {
    if (navOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [navOpen]);

  const toggleMenu = () => setNavOpen(!navOpen);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    document.body.style.overflow = "";
    setNavOpen(false);

    if (href.startsWith("#")) {
      const targetId = href.replace("#", "");
      if (window.location.pathname !== "/") {
        window.location.href = `/${href}`;
        return;
      }

      setTimeout(() => {
        if (targetId === "manifesto" || targetId === "hero") {
          window.scrollTo({ top: 0, behavior: "smooth" });
          window.history.pushState(null, "", `#${targetId}`);
        } else {
          const targetEl = document.getElementById(targetId);
          if (targetEl) {
            targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
            window.history.pushState(null, "", `#${targetId}`);
          }
        }
      }, 150);
    } else {
      window.location.href = href;
    }
  };

  const menuLinks = [
    { label: "Manifesto", href: "#manifesto" },
    { label: "Featured Work", href: "#work" },
    { label: "Services", href: "#services" },
    { label: "About", href: "#about-us" },
    { label: "Process", href: "#process" },
    { label: "Contact", href: "#contact" }
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ 
          y: (visible || navOpen) ? 0 : -100, 
          opacity: (visible || navOpen) ? 1 : 0 
        }}
        transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] as const }}
        className={`fixed top-0 left-0 w-full z-[999] transition-all duration-300 ${
          scrolled 
            ? "py-3.5 sm:py-4 bg-obsidian/85 backdrop-blur-md border-b border-surface" 
            : "py-4 sm:py-6 md:py-8 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 flex justify-between items-center">
          {/* Logo with Red Curve Graphic */}
          <Link 
            href="/" 
            className="flex items-center gap-2.5 sm:gap-3 focus:outline-none"
            onMouseEnter={() => setCursorType("pointer")}
            onMouseLeave={() => setCursorType("default")}
            onClick={(e) => {
              if (window.location.pathname === "/") {
                e.preventDefault();
                document.body.style.overflow = "";
                setNavOpen(false);
                window.scrollTo({ top: 0, behavior: "smooth" });
              } else {
                setNavOpen(false);
              }
            }}
            aria-label="The Content Curve Logo"
          >
            <div className="w-6 h-6 sm:w-7 sm:h-7 relative select-none">
              <Image 
                src="/images/logo-red.svg" 
                alt="The Content Curve Logo" 
                fill 
                className="object-contain"
                priority
              />
            </div>
            <span className="text-[11px] sm:text-xs font-bold tracking-[0.16em] sm:tracking-[0.2em] font-sans-display text-primary-text uppercase">
              THE CONTENT CURVE
            </span>
          </Link>

          {/* Action Row */}
          <div className="flex items-center gap-4 sm:gap-8">
            {/* Quick Contact CTA (Desktop only) */}
            <div className="hidden md:block">
              <Magnetic>
                <a
                  href="#contact"
                  onClick={(e) => handleNavClick(e, "#contact")}
                  className="text-[10px] uppercase tracking-[0.2em] font-mono text-primary-text hover:text-brand-red transition-colors border border-primary-text/10 hover:border-brand-red px-5 py-2.5 rounded-none bg-obsidian cursor-pointer select-none"
                  onMouseEnter={() => setCursorType("pointer")}
                  onMouseLeave={() => setCursorType("default")}
                >
                  Get In Touch
                </a>
              </Magnetic>
            </div>

            {/* Menu Button */}
            <Magnetic>
              <button
                onClick={toggleMenu}
                className="flex items-center gap-2.5 sm:gap-3 focus:outline-none group p-2"
                onMouseEnter={() => setCursorType("nav")}
                onMouseLeave={() => setCursorType("default")}
                aria-label={navOpen ? "Close menu" : "Open menu"}
              >
                <span className={`text-[10px] uppercase tracking-[0.2em] text-primary-text font-mono transition-colors group-hover:text-brand-red ${navOpen ? "inline" : "hidden sm:inline"}`}>
                  {navOpen ? "CLOSE" : "MENU"}
                </span>
                
                {/* Custom Hamburger Line Animation */}
                <div className="w-8 h-4 flex flex-col justify-between items-end relative">
                  <span className={`h-[1px] bg-primary-text transition-all duration-300 group-hover:bg-brand-red ${navOpen ? "w-8 rotate-45 translate-y-[7.5px]" : "w-8"}`} />
                  <span className={`h-[1px] bg-primary-text transition-all duration-300 group-hover:bg-brand-red ${navOpen ? "opacity-0 w-0" : "w-6"}`} />
                  <span className={`h-[1px] bg-primary-text transition-all duration-300 group-hover:bg-brand-red ${navOpen ? "w-8 -rotate-45 -translate-y-[7.5px]" : "w-4"}`} />
                </div>
              </button>
            </Magnetic>
          </div>
        </div>
      </motion.nav>

      {/* Fullscreen Overlay Menu */}
      <AnimatePresence>
        {navOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] as const }}
            className="fixed inset-0 z-[998] bg-obsidian overflow-y-auto overflow-x-hidden pt-24 sm:pt-28 pb-12 sm:pb-16 px-4 sm:px-6 md:px-12 flex items-start md:items-center justify-center"
          >
            {/* Minimal Grid lines */}
            <div className="absolute inset-0 grid grid-cols-1 md:grid-cols-4 opacity-[0.015] pointer-events-none min-h-full">
              <div className="border-r border-primary-text" />
              <div className="border-r border-primary-text" />
              <div className="border-r border-primary-text" />
              <div className="w-full" />
            </div>

            <div className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 items-start md:items-center relative z-10">
              {/* Main Links */}
              <div className="md:col-span-2 flex flex-col gap-3 sm:gap-4 md:gap-5">
                {menuLinks.map((link, idx) => (
                  <div key={idx} className="overflow-hidden group">
                    <motion.div
                      initial={{ y: "100%" }}
                      animate={{ y: 0 }}
                      exit={{ y: "100%" }}
                      transition={{ 
                        duration: 0.65, 
                        delay: idx * 0.05, 
                        ease: [0.25, 1, 0.5, 1] as const
                      }}
                      className="flex items-center gap-4"
                    >
                      {/* Active / Hover red dash indicator */}
                      <span className="h-[1px] w-0 bg-brand-red group-hover:w-6 sm:group-hover:w-8 transition-all duration-300 block" />
                      <a
                        href={link.href}
                        onClick={(e) => handleNavClick(e, link.href)}
                        className="text-3xl sm:text-5xl md:text-7xl font-serif text-primary-text hover:text-brand-red transition-colors leading-none inline-block font-normal cursor-pointer select-none"
                        onMouseEnter={() => setCursorType("pointer")}
                        onMouseLeave={() => setCursorType("default")}
                      >
                        {link.label}
                      </a>
                    </motion.div>
                  </div>
                ))}
              </div>

              {/* Sidebar coordinates */}
              <div className="flex flex-col gap-8 md:gap-10 text-secondary-text text-sm border-t md:border-t-0 md:border-l border-surface pt-8 md:pt-0 md:pl-12">
                <div>
                  <h4 className="text-[10px] tracking-[0.25em] font-mono text-brand-red uppercase mb-3">Location</h4>
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Panchsheel,+Paschim+Puri,+Agra,+Uttar+Pradesh,+India"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-sans leading-relaxed text-secondary-text hover:text-brand-red transition-colors inline-block"
                    onMouseEnter={() => setCursorType("pointer")}
                    onMouseLeave={() => setCursorType("default")}
                    title="View on Google Maps"
                  >
                    Panchsheel,<br />
                    Paschim Puri, Agra,<br />
                    Uttar Pradesh, India
                  </a>
                </div>
                <div>
                  <h4 className="text-[10px] tracking-[0.25em] font-mono text-brand-red uppercase mb-3">Inquiries</h4>
                  <div className="flex flex-col gap-2">
                    <a
                      href="mailto:hello@thecontentcurve.in"
                      className="font-sans text-secondary-text hover:text-brand-red transition-colors inline-block"
                      onMouseEnter={() => setCursorType("pointer")}
                      onMouseLeave={() => setCursorType("default")}
                    >
                      hello@thecontentcurve.in
                    </a>
                    <div className="flex flex-col gap-1 font-mono text-xs text-secondary-text pt-1">
                      <a
                        href="tel:+918979128558"
                        className="hover:text-brand-red transition-colors w-fit"
                        onMouseEnter={() => setCursorType("pointer")}
                        onMouseLeave={() => setCursorType("default")}
                      >
                        +91 89791 28558
                      </a>
                      <a
                        href="tel:+918279628563"
                        className="hover:text-brand-red transition-colors w-fit"
                        onMouseEnter={() => setCursorType("pointer")}
                        onMouseLeave={() => setCursorType("default")}
                      >
                        +91 82796 28563
                      </a>
                      <a
                        href="tel:+918979839075"
                        className="hover:text-brand-red transition-colors w-fit"
                        onMouseEnter={() => setCursorType("pointer")}
                        onMouseLeave={() => setCursorType("default")}
                      >
                        +91 89798 39075
                      </a>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="text-[10px] tracking-[0.25em] font-mono text-brand-red uppercase mb-3">Socials</h4>
                  <div className="flex gap-4">
                    <a
                      href="https://www.instagram.com/thecontentcurvemedia/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-brand-red transition-colors font-sans text-xs tracking-wider text-secondary-text inline-block"
                      onMouseEnter={() => setCursorType("pointer")}
                      onMouseLeave={() => setCursorType("default")}
                    >
                      Instagram
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
