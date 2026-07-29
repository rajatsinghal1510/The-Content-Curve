"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useGlobalContext } from "@/app/providers";

interface ImageRevealProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
  sizes?: string;
  disableHoverCursor?: boolean;
}

export default function ImageReveal({
  src,
  alt,
  width,
  height,
  fill = false,
  className = "",
  imageClassName = "",
  priority = false,
  sizes,
  disableHoverCursor = false
}: ImageRevealProps) {
  const { setCursorType } = useGlobalContext();

  const containerVariants = {
    hidden: {
      clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
    },
    visible: {
      clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
      transition: {
        duration: 1.2,
        ease: [0.76, 0, 0.24, 1] as const, // Custom premium ease-in-out
      },
    },
  };

  const imageVariants = {
    hidden: { scale: 1.15 },
    visible: {
      scale: 1,
      transition: {
        duration: 1.6,
        ease: [0.25, 1, 0.5, 1] as const,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-15%" }}
      className={`relative overflow-hidden ${className}`}
      onMouseEnter={() => {
        if (!disableHoverCursor) setCursorType("pointer");
      }}
      onMouseLeave={() => {
        if (!disableHoverCursor) setCursorType("default");
      }}
    >
      <motion.div 
        variants={imageVariants} 
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] as const }}
        className="w-full h-full relative"
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          fill={fill}
          priority={priority}
          sizes={sizes}
          className={`object-cover w-full h-full ${imageClassName}`}
          loading={priority ? undefined : "lazy"}
        />
      </motion.div>
    </motion.div>
  );
}
