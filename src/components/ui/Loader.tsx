"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGlobalContext } from "@/app/providers";
import Image from "next/image";

export default function Loader() {
  const { setIsLoading } = useGlobalContext();
  const [counter, setCounter] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    if (counter < 100) {
      const increment = Math.floor(Math.random() * 8) + 4;
      const delay = Math.floor(Math.random() * 16) + 10;
      const timer = setTimeout(() => {
        setCounter((prev) => Math.min(prev + increment, 100));
      }, delay);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setIsFinished(true);
        // Delay setting global loading to allow slideUp to run smoothly
        setTimeout(() => {
          setIsLoading(false);
        }, 650);
      }, 250);
      return () => clearTimeout(timer);
    }
  }, [counter, setIsLoading]);

  const words = "THE CONTENT CURVE".split(" ");

  return (
    <AnimatePresence mode="wait">
      {!isFinished && (
        <motion.div
          initial={{ y: 0 }}
          exit={{ 
            y: "-100vh",
            transition: { duration: 0.65, ease: [0.85, 0, 0.15, 1] as const } 
          }}
          className="fixed inset-0 z-[10000] bg-obsidian flex flex-col justify-between p-8 md:p-16 select-none"
        >
          {/* Header */}
          <div className="flex justify-between items-center text-[10px] md:text-xs tracking-[0.25em] text-secondary-text/30 font-mono">
            <span>BRANDING STUDIO</span>
            <span>TURNING SCROLLS INTO SALES</span>
          </div>

          {/* Center Brand Name & Counter */}
          <div className="my-auto flex flex-col md:flex-row justify-between items-start md:items-end w-full max-w-7xl mx-auto gap-8">
            <div className="flex flex-col items-start gap-8">
              {/* Brand Logo Red Image */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] as const, delay: 0.2 }}
                className="w-16 h-16 relative"
              >
                <Image
                  src="/images/logo-red.svg"
                  alt="The Content Curve Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </motion.div>

              <h1 className="text-4xl sm:text-6xl md:text-8xl font-serif text-primary-text leading-none flex flex-wrap gap-x-4">
                {words.map((word, idx) => (
                  <span key={idx} className="overflow-hidden inline-block">
                    <motion.span
                      initial={{ y: "100%" }}
                      animate={{ y: 0 }}
                      transition={{
                        duration: 0.8,
                        delay: idx * 0.1,
                        ease: [0.215, 0.61, 0.355, 1] as const,
                      }}
                      className="inline-block"
                    >
                      {word}
                    </motion.span>
                  </span>
                ))}
              </h1>
            </div>

            {/* Custom counter display */}
            <div className="overflow-hidden">
              <motion.span
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-8xl sm:text-9xl md:text-[12rem] font-sans font-extrabold text-brand-red/10 leading-none block select-none"
              >
                {counter}
              </motion.span>
            </div>
          </div>

          {/* Bottom Progress Bar */}
          <div className="w-full max-w-7xl mx-auto flex flex-col gap-4">
            <div className="h-[1px] bg-charcoal w-full relative">
              <motion.div
                className="absolute top-0 left-0 h-full bg-brand-red"
                style={{ width: `${counter}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
            <div className="flex justify-between items-center text-[10px] md:text-xs tracking-wider text-secondary-text/30 font-mono">
              <span>LOADING SYSTEMS</span>
              <span>©2026 THE CONTENT CURVE</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
