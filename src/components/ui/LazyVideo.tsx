"use client";

import React, {
  useEffect,
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
  VideoHTMLAttributes,
} from "react";

export interface LazyVideoProps extends VideoHTMLAttributes<HTMLVideoElement> {
  src: string;
  poster?: string;
  eager?: boolean;
  rootMargin?: string;
  pauseWhenHidden?: boolean;
}

const LazyVideo = forwardRef<HTMLVideoElement, LazyVideoProps>(
  (
    {
      src,
      poster,
      eager = false,
      rootMargin = "350px",
      pauseWhenHidden = true,
      autoPlay = true,
      loop = true,
      playsInline = true,
      muted = true,
      className = "",
      ...props
    },
    forwardedRef
  ) => {
    const internalRef = useRef<HTMLVideoElement | null>(null);
    useImperativeHandle(forwardedRef, () => internalRef.current as HTMLVideoElement);

    const [, setIsInView] = useState(false);
    const [hasLoaded, setHasLoaded] = useState(false);

    useEffect(() => {
      const el = internalRef.current;
      if (!el) return;

      // If IntersectionObserver is not supported, load immediately
      if (typeof IntersectionObserver === "undefined") {
        setHasLoaded(true);
        setIsInView(true);
        return;
      }

      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            // An element with display:none (e.g. lg:hidden on desktop, or hidden lg:block on mobile)
            // will NEVER have isIntersecting === true.
            if (entry.isIntersecting) {
              setHasLoaded(true);
              setIsInView(true);
              if (autoPlay && el.paused) {
                el.play().catch(() => {});
              }
            } else {
              setIsInView(false);
              if (pauseWhenHidden && !el.paused) {
                el.pause();
              }
            }
          }
        },
        {
          rootMargin: eager ? "50px" : rootMargin,
          threshold: 0,
        }
      );

      observer.observe(el);

      return () => {
        observer.disconnect();
      };
    }, [eager, rootMargin, autoPlay, pauseWhenHidden]);

    // For eager elements, if they are visible in DOM (not display: none), mark loaded immediately
    useEffect(() => {
      if (eager && internalRef.current) {
        if (internalRef.current.offsetParent !== null) {
          setHasLoaded(true);
          setIsInView(true);
        }
      }
    }, [eager]);

    return (
      <video
        ref={internalRef}
        src={hasLoaded ? src : undefined}
        data-src={src}
        poster={poster}
        autoPlay={autoPlay}
        loop={loop}
        playsInline={playsInline}
        muted={muted}
        preload={hasLoaded ? (eager ? "auto" : "metadata") : "none"}
        className={className}
        {...props}
      />
    );
  }
);

LazyVideo.displayName = "LazyVideo";

export default LazyVideo;
