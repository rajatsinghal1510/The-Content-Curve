"use client";

import React, { useState } from "react";
import { useGlobalContext } from "@/app/providers";
import Magnetic from "../ui/Magnetic";
import TextReveal from "../ui/TextReveal";
import { motion } from "framer-motion";

export default function Contact() {
  const { setCursorType } = useGlobalContext();
  const [form, setForm] = useState({ name: "", email: "", company: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;

    setIsSubmitting(true);
    // Simulate placeholder API submit
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setForm({ name: "", email: "", company: "", message: "" });
      
      setTimeout(() => setIsSuccess(false), 5000);
    }, 1500);
  };

  return (
    <section
      className="relative w-full bg-obsidian py-32 md:py-48 px-6 md:px-12 border-b border-surface/50"
      id="contact"
    >
      {/* Grid overlay lines */}
      <div className="absolute inset-0 grid grid-cols-1 md:grid-cols-4 opacity-[0.015] pointer-events-none">
        <div className="border-r border-primary-text" />
        <div className="border-r border-primary-text" />
        <div className="border-r border-primary-text" />
        <div className="w-full" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start select-none">
        
        {/* LEFT COLUMN: CONTACT DETAILS (5 Columns) */}
        <div className="col-span-1 lg:col-span-5 flex flex-col items-start">
          <div className="flex items-center gap-4 text-xs font-mono tracking-[0.25em] text-brand-red uppercase mb-4">
            <span className="w-6 h-[1px] bg-brand-red" />
            <span>LET&apos;S TALK</span>
          </div>

          <TextReveal
            text="Let's build something worth remembering."
            tag="h2"
            className="text-4xl md:text-5xl lg:text-6xl font-serif text-primary-text leading-tight uppercase font-medium"
          />

          <p className="text-sm md:text-base text-secondary-text leading-relaxed font-sans mt-6 max-w-md">
            Whether you&apos;re launching a new brand, growing your online presence, or planning your next campaign, we&apos;d love to hear about your project.
          </p>

          <div className="flex flex-col gap-6 mt-12 font-sans text-sm text-secondary-text w-full">
            <div>
              <h4 className="text-[10px] tracking-[0.25em] font-mono text-brand-red uppercase mb-1">Email</h4>
              <a 
                href="mailto:hello@thecontentcurve.com" 
                className="text-primary-text hover:text-brand-red transition-colors text-base"
                onMouseEnter={() => setCursorType("pointer")}
                onMouseLeave={() => setCursorType("default")}
              >
                hello@thecontentcurve.com
              </a>
            </div>
            <div>
              <h4 className="text-[10px] tracking-[0.25em] font-mono text-brand-red uppercase mb-1">Instagram</h4>
              <a 
                href="https://instagram.com/thecontentcurve" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-primary-text hover:text-brand-red transition-colors text-base"
                onMouseEnter={() => setCursorType("pointer")}
                onMouseLeave={() => setCursorType("default")}
              >
                @thecontentcurve
              </a>
            </div>
            <div>
              <h4 className="text-[10px] tracking-[0.25em] font-mono text-brand-red uppercase mb-1">Location</h4>
              <p className="text-primary-text text-base">India</p>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: CONTACT FORM (7 Columns) */}
        <div className="col-span-1 lg:col-span-7 w-full">
          {isSuccess ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="border border-brand-red/35 bg-charcoal/10 p-8 md:p-12 text-center flex flex-col items-center justify-center min-h-[420px]"
            >
              <div className="w-12 h-12 rounded-full border border-brand-red flex items-center justify-center mb-6 text-brand-red">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h3 className="text-2xl font-serif text-primary-text mb-3 uppercase tracking-wider">Brief Received</h3>
              <p className="text-sm text-secondary-text font-sans max-w-sm">
                Thank you. We&apos;ve received your brief and will contact you within 24 hours to schedule our onboarding call.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-8 w-full">
              
              {/* Form Input fields with Brand Red outline focuses */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] tracking-[0.25em] font-mono text-secondary-text/50 uppercase">Name</label>
                  <input
                    required
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleInputChange}
                    placeholder="Elena Rostova"
                    className="border border-surface/50 bg-charcoal/10 px-4 py-3 text-primary-text placeholder-primary-text/20 focus:border-brand-red focus:outline-none rounded-[4px] text-sm transition-all duration-300 font-sans"
                    onMouseEnter={() => setCursorType("pointer")}
                    onMouseLeave={() => setCursorType("default")}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[10px] tracking-[0.25em] font-mono text-secondary-text/50 uppercase">Email</label>
                  <input
                    required
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleInputChange}
                    placeholder="elena@triss.salon"
                    className="border border-surface/50 bg-charcoal/10 px-4 py-3 text-primary-text placeholder-primary-text/20 focus:border-brand-red focus:outline-none rounded-[4px] text-sm transition-all duration-300 font-sans"
                    onMouseEnter={() => setCursorType("pointer")}
                    onMouseLeave={() => setCursorType("default")}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] tracking-[0.25em] font-mono text-secondary-text/50 uppercase">Company (Optional)</label>
                <input
                  type="text"
                  name="company"
                  value={form.company}
                  onChange={handleInputChange}
                  placeholder="TRISS Salon & Wellness"
                  className="border border-surface/50 bg-charcoal/10 px-4 py-3 text-primary-text placeholder-primary-text/20 focus:border-brand-red focus:outline-none rounded-[4px] text-sm transition-all duration-300 font-sans"
                  onMouseEnter={() => setCursorType("pointer")}
                  onMouseLeave={() => setCursorType("default")}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] tracking-[0.25em] font-mono text-secondary-text/50 uppercase">Tell us about your project</label>
                <textarea
                  required
                  name="message"
                  value={form.message}
                  onChange={handleInputChange}
                  rows={6}
                  placeholder="Tell us about your project timeline, design assets, and marketing goals..."
                  className="border border-surface/50 bg-charcoal/10 px-4 py-3 text-primary-text placeholder-primary-text/20 focus:border-brand-red focus:outline-none rounded-[4px] text-sm transition-all duration-300 font-sans resize-none"
                  onMouseEnter={() => setCursorType("pointer")}
                  onMouseLeave={() => setCursorType("default")}
                />
              </div>

              {/* Submit Button */}
              <div className="mt-2 w-full">
                <Magnetic>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-brand-red text-obsidian text-[10px] uppercase tracking-[0.2em] font-bold py-5 rounded-[4px] hover:bg-primary-text hover:text-obsidian transition-colors duration-300 focus:outline-none flex items-center justify-center gap-3 disabled:opacity-50 select-none cursor-pointer"
                    onMouseEnter={() => setCursorType("pointer")}
                    onMouseLeave={() => setCursorType("default")}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-3.5 h-3.5 border-2 border-obsidian border-t-transparent rounded-full animate-spin" />
                        TRANSMITTING BRIEF...
                      </>
                    ) : (
                      "Start a Project →"
                    )}
                  </button>
                </Magnetic>
              </div>

            </form>
          )}
        </div>

      </div>
    </section>
  );
}
