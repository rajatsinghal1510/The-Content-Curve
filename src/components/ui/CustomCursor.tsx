"use client";

import React, { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useGlobalContext } from "@/app/providers";
import { useIsMobile } from "@/hooks/useIsMobile";

export default function CustomCursor() {
  const { cursorType, cursorLabel } = useGlobalContext();
  const isMobile = useIsMobile();

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 35, stiffness: 400, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    if (isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      // Center coordinates directly on mouse point
      mouseX.set(e.clientX); 
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mouseX, mouseY, isMobile]);

  if (isMobile) return null;

  const variants = {
    default: {
      width: 6,
      height: 6,
      backgroundColor: "#F7F7F7",
      mixBlendMode: "difference" as const,
      border: "none",
    },
    pointer: {
      width: 44,
      height: 44,
      backgroundColor: "rgba(227, 27, 35, 0.02)",
      border: "1px solid #E31B23",
      mixBlendMode: "normal" as const,
    },
    view: {
      width: 120,
      height: 120,
      backgroundColor: "#E31B23",
      mixBlendMode: "normal" as const,
      border: "none",
    },
    nav: {
      width: 48,
      height: 48,
      backgroundColor: "transparent",
      border: "1px solid #E31B23",
      mixBlendMode: "normal" as const,
    }
  };

  const activeVariant = variants[cursorType as keyof typeof variants] || variants.default;

  return (
    <motion.div
      className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] flex items-center justify-center text-center overflow-hidden font-semibold select-none text-[10px] tracking-widest text-[#FAF9F6] uppercase -translate-x-1/2 -translate-y-1/2"
      style={{
        x: cursorX,
        y: cursorY,
        width: activeVariant.width,
        height: activeVariant.height,
        backgroundColor: activeVariant.backgroundColor,
        border: activeVariant.border,
        mixBlendMode: activeVariant.mixBlendMode,
      }}
      animate={cursorType}
      transition={{ type: "spring", stiffness: 450, damping: 30 }}
    >
      {cursorType === "view" && (
        <motion.span
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-[#F7F7F7] font-bold text-[8px] tracking-widest px-3 text-center leading-relaxed"
        >
          {cursorLabel || "VIEW"}
        </motion.span>
      )}
    </motion.div>
  );
}
