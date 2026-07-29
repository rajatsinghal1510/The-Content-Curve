"use client";

import React from "react";
import { motion } from "framer-motion";

interface TextRevealProps {
  text: string;
  className?: string;
  tag?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
  delay?: number;
}

export default function TextReveal({
  text,
  className = "",
  tag: Tag = "h2",
  delay = 0
}: TextRevealProps) {
  const words = text.split(" ");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.04,
        delayChildren: delay,
      },
    },
  };

  const wordVariants = {
    hidden: { y: "100%" },
    visible: {
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.215, 0.61, 0.355, 1] as const, // cubic-bezier for premium feel
      },
    },
  };

  return (
    <Tag className={`overflow-hidden ${className}`}>
      <motion.span
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-10%" }}
        className="inline-block flex-wrap"
      >
        {words.map((word, idx) => (
          <span
            key={idx}
            className="inline-block overflow-hidden mr-[0.25em] leading-[1.2]"
          >
            <motion.span
              variants={wordVariants}
              className="inline-block origin-bottom"
            >
              {word}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}
