"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGlobalContext } from "@/app/providers";

interface AccordionProps {
  id: string;
  index: number;
  title: string;
  description: string;
  deliverables: string[];
  isOpen: boolean;
  onToggle: () => void;
}

export default function Accordion({
  index,
  title,
  description,
  deliverables,
  isOpen,
  onToggle
}: AccordionProps) {
  const { setCursorType } = useGlobalContext();

  return (
    <div className="border-b border-surface w-full py-6 md:py-8">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between text-left focus:outline-none group"
        onMouseEnter={() => setCursorType("pointer")}
        onMouseLeave={() => setCursorType("default")}
      >
        <div className="flex items-center gap-6 md:gap-12">
          {/* Index Counter */}
          <span className="font-mono text-xs md:text-sm text-brand-red tracking-wider select-none">
            {(index + 1).toString().padStart(2, "0")}
          </span>
          {/* Title */}
          <h3 className={`text-xl sm:text-2xl md:text-3xl font-serif tracking-wide font-normal transition-colors duration-300 ${isOpen ? "text-brand-red" : "text-primary-text group-hover:text-brand-red"}`}>
            {title}
          </h3>
        </div>

        {/* Plus / Minus Indicator Icon */}
        <div className="relative w-4 h-4 flex items-center justify-center">
          <span className={`absolute h-[1px] w-4 bg-primary-text rounded-none transition-all duration-300 ${isOpen ? "bg-brand-red" : "group-hover:bg-brand-red"}`} />
          <span className={`absolute h-4 w-[1px] bg-primary-text rounded-none transition-all duration-300 ${isOpen ? "rotate-90 bg-brand-red" : "group-hover:bg-brand-red"}`} />
        </div>
      </button>

      {/* Accordion Content Panel */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ 
              height: "auto", 
              opacity: 1,
              transition: { height: { duration: 0.4 }, opacity: { duration: 0.3 } }
            }}
            exit={{ 
              height: 0, 
              opacity: 0,
              transition: { height: { duration: 0.4 }, opacity: { duration: 0.2 } }
            }}
            className="overflow-hidden"
          >
            <div className="pt-6 pb-2 pl-12 md:pl-[88px] grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Description */}
              <div className="md:col-span-2">
                <p className="text-sm md:text-base text-secondary-text leading-relaxed font-sans max-w-xl">
                  {description}
                </p>
              </div>

              {/* Deliverables List */}
              <div className="flex flex-col gap-2">
                <h4 className="text-[10px] tracking-[0.25em] font-mono text-brand-red uppercase mb-2">Deliverables</h4>
                <ul className="flex flex-col gap-2">
                  {deliverables.map((del, idx) => (
                    <li 
                      key={idx} 
                      className="text-xs md:text-sm text-secondary-text flex items-center gap-2 font-mono"
                    >
                      <span className="w-1.5 h-[1px] bg-brand-red" />
                      {del}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
