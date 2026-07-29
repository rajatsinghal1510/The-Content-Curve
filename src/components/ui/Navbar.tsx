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

  const toggleMenu = () => setNavOpen(!navOpen);

  const menuLinks = [
    { label: "Manifesto", href: "#manifesto" },
    { label: "Featured Work", href: "#work" },
    { label: "Services", href: "#services" },
    { label: "About", href: "#about" },
    { label: "Process", href: "#process" },
    { label: "Contact", href: "#contact" }
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ 
          y: visible ? 0 : -100, 
          opacity: visible ? 1 : 0 
        }}
        transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] as const }}
        className={`fixed top-0 left-0 w-full z-[999] transition-all duration-300 ${
          scrolled 
            ? "py-4 bg-obsidian/85 backdrop-blur-md border-b border-surface" 
            : "py-8 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          {/* Logo with Red Curve Graphic */}
          <Link 
            href="/" 
            className="flex items-center gap-3 focus:outline-none"
            onMouseEnter={() => setCursorType("pointer")}
            onMouseLeave={() => setCursorType("default")}
            onClick={() => setNavOpen(false)}
            aria-label="The Content Curve Logo"
          >
            <div className="w-7 h-7 relative select-none">
              <Image 
                src="/images/logo-red.svg" 
                alt="The Content Curve Logo" 
                fill 
                className="object-contain"
                priority
              />
            </div>
            <span className="text-xs font-bold tracking-[0.2em] font-sans-display text-primary-text uppercase">
              THE CONTENT CURVE
            </span>
          </Link>

          {/* Action Row */}
          <div className="flex items-center gap-8">
            {/* Quick Contact CTA (Desktop only) */}
            <div className="hidden md:block">
              <Magnetic>
                <Link
                  href="#contact"
                  className="text-[10px] uppercase tracking-[0.2em] font-mono text-primary-text hover:text-brand-red transition-colors border border-primary-text/10 hover:border-brand-red px-5 py-2.5 rounded-none bg-obsidian"
                  onMouseEnter={() => setCursorType("pointer")}
                  onMouseLeave={() => setCursorType("default")}
                >
                  Get In Touch
                </Link>
              </Magnetic>
            </div>

            {/* Menu Button */}
            <Magnetic>
              <button
                onClick={toggleMenu}
                className="flex items-center gap-3 focus:outline-none group"
                onMouseEnter={() => setCursorType("nav")}
                onMouseLeave={() => setCursorType("default")}
                aria-label="Toggle menu"
              >
                <span className="text-[10px] uppercase tracking-[0.2em] text-primary-text font-mono hidden sm:inline transition-colors group-hover:text-brand-red">
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
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[998] bg-obsidian flex items-center justify-center pt-24 px-6 md:px-12"
          >
            {/* Minimal Grid lines */}
            <div className="absolute inset-0 grid grid-cols-1 md:grid-cols-4 opacity-[0.015] pointer-events-none">
              <div className="border-r border-primary-text" />
              <div className="border-r border-primary-text" />
              <div className="border-r border-primary-text" />
              <div className="w-full" />
            </div>

            <div className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 items-center relative z-10">
              {/* Main Links */}
              <div className="md:col-span-2 flex flex-col gap-4">
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
                      <span className="h-[1px] w-0 bg-brand-red group-hover:w-8 transition-all duration-300 block" />
                      <Link
                        href={link.href}
                        onClick={toggleMenu}
                        className="text-4xl sm:text-6xl md:text-7xl font-serif text-primary-text hover:text-brand-red transition-colors leading-none inline-block font-normal"
                        onMouseEnter={() => setCursorType("pointer")}
                        onMouseLeave={() => setCursorType("default")}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  </div>
                ))}
              </div>

              {/* Sidebar coordinates */}
              <div className="flex flex-col gap-12 text-secondary-text text-sm border-t md:border-t-0 md:border-l border-surface pt-8 md:pt-0 md:pl-12">
                <div>
                  <h4 className="text-[10px] tracking-[0.25em] font-mono text-brand-red uppercase mb-4">Location</h4>
                  <p className="font-sans leading-relaxed text-secondary-text">
                    Suite 104, The Design Curve Tower<br />
                    Creative District, NY 10013
                  </p>
                </div>
                <div>
                  <h4 className="text-[10px] tracking-[0.25em] font-mono text-brand-red uppercase mb-4">Inquiries</h4>
                  <p className="font-sans text-secondary-text">hello@thecontentcurve.com</p>
                  <p className="font-sans text-secondary-text">+1 (555) 902-8821</p>
                </div>
                <div>
                  <h4 className="text-[10px] tracking-[0.25em] font-mono text-brand-red uppercase mb-4">Socials</h4>
                  <div className="flex gap-4">
                    {["Instagram", "LinkedIn", "Vimeo", "Twitter"].map((social) => (
                      <a
                        key={social}
                        href="#"
                        className="hover:text-brand-red transition-colors font-sans text-xs tracking-wider"
                        onMouseEnter={() => setCursorType("pointer")}
                        onMouseLeave={() => setCursorType("default")}
                      >
                        {social}
                      </a>
                    ))}
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
