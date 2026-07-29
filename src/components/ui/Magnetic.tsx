"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";

interface MagneticProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: React.ReactElement<any>;
  range?: number; // Distance threshold to trigger magnetic pull
  action?: () => void;
}

export default function Magnetic({ children, range = 40 }: MagneticProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const elX = rect.left + rect.width / 2;
      const elY = rect.top + rect.height / 2;
      
      const distanceX = e.clientX - elX;
      const distanceY = e.clientY - elY;
      const distance = Math.hypot(distanceX, distanceY);

      if (distance < range) {
        // Pull the element inside
        gsap.to(el, {
          x: distanceX * 0.35,
          y: distanceY * 0.35,
          duration: 0.4,
          ease: "power2.out"
        });
      } else {
        // Reset
        gsap.to(el, {
          x: 0,
          y: 0,
          duration: 0.6,
          ease: "power3.out"
        });
      }
    };

    const handleMouseLeave = () => {
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 0.8,
        ease: "elastic.out(1, 0.4)"
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [range]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const cloneProps: any = {
    ref: containerRef,
    style: { ...children.props.style, position: "relative" }
  };

  return React.cloneElement(children, cloneProps);
}
