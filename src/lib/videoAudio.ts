"use client";

/**
 * Global Hover-Based Video Audio Switching Manager
 *
 * Rules:
 * 1. Only ONE video on the entire website can be audible at any given moment.
 * 2. When mouse enters/hovers a video: that video immediately unmutes, all other videos mute.
 * 3. When mouse moves from Video A to Video B: Video A mutes, Video B unmutes instantly.
 * 4. When mouse leaves a video into non-video areas: the video mutes after a short buffer.
 * 5. Playback is preserved: videos never restart or pause during audio switching.
 * 6. Looping videos retain their audio while hovered.
 * 7. Mobile touch interactions are handled gracefully without breaking normal playback.
 */

let activeAudibleVideo: HTMLVideoElement | null = null;
let leaveTimeout: ReturnType<typeof setTimeout> | null = null;

/**
 * Activates audio for target video, immediately muting all other videos on the website.
 */
export function activateVideoAudio(targetVideo: HTMLVideoElement | null): void {
  if (typeof window === "undefined" || !targetVideo) return;

  // Clear any pending leave/mute timer
  if (leaveTimeout) {
    clearTimeout(leaveTimeout);
    leaveTimeout = null;
  }

  activeAudibleVideo = targetVideo;

  // 1. Immediately mute EVERY other video in the document
  if (typeof document !== "undefined") {
    const allVideos = document.querySelectorAll("video");
    allVideos.forEach((v) => {
      if (v !== targetVideo && !v.muted) {
        v.muted = true;
      }
    });
  }

  // 2. Unmute target video
  targetVideo.muted = false;

  // 3. Ensure target video is playing without altering currentTime
  const playPromise = targetVideo.play();
  if (playPromise !== undefined) {
    playPromise.catch(() => {
      // If browser blocked unmuted autoplay due to lack of prior user gesture on domain:
      const handleUserGesture = () => {
        if (activeAudibleVideo === targetVideo) {
          targetVideo.muted = false;
          targetVideo.play().catch(() => {});
        }
        cleanup();
      };

      const cleanup = () => {
        window.removeEventListener("click", handleUserGesture);
        window.removeEventListener("pointerdown", handleUserGesture);
        window.removeEventListener("keydown", handleUserGesture);
      };

      window.addEventListener("click", handleUserGesture, { once: true, capture: true });
      window.addEventListener("pointerdown", handleUserGesture, { once: true, capture: true });
      window.addEventListener("keydown", handleUserGesture, { once: true, capture: true });
    });
  }
}

/**
 * Deactivates audio when pointer leaves a video.
 * Uses a small 50ms buffer so moving directly between adjacent videos
 * transitions audio seamlessly with zero silence blip.
 */
export function deactivateVideoAudio(targetVideo: HTMLVideoElement | null): void {
  if (typeof window === "undefined" || !targetVideo) return;

  if (leaveTimeout) {
    clearTimeout(leaveTimeout);
  }

  leaveTimeout = setTimeout(() => {
    if (activeAudibleVideo === targetVideo) {
      targetVideo.muted = true;
      activeAudibleVideo = null;
    }
  }, 50);
}

/**
 * Attaches hover-based audio switching to a video element and its container.
 */
export function attachHoverAudio(
  hoverTarget: HTMLElement | null,
  videoElement: HTMLVideoElement | null
): () => void {
  if (typeof window === "undefined" || !hoverTarget || !videoElement) {
    return () => {};
  }

  // Videos play in muted state by default until hovered
  videoElement.muted = true;
  videoElement.play().catch(() => {});

  const handlePointerEnter = (e: PointerEvent) => {
    // Only desktop mouse/pen pointer hover triggers hover switching
    if (e.pointerType === "touch") return;
    activateVideoAudio(videoElement);
  };

  const handlePointerLeave = (e: PointerEvent) => {
    if (e.pointerType === "touch") return;
    deactivateVideoAudio(videoElement);
  };

  // Touch / tap fallback for mobile devices
  const handleTouchOrClick = (e: MouseEvent | PointerEvent) => {
    if ("pointerType" in e && e.pointerType === "touch") {
      if (activeAudibleVideo === videoElement) {
        deactivateVideoAudio(videoElement);
      } else {
        activateVideoAudio(videoElement);
      }
    } else {
      activateVideoAudio(videoElement);
    }
  };

  // Ensure audio remains unmuted when the hovered video loops
  const handleLoop = () => {
    if (activeAudibleVideo === videoElement) {
      videoElement.muted = false;
    }
  };

  hoverTarget.addEventListener("pointerenter", handlePointerEnter as EventListener);
  hoverTarget.addEventListener("pointerleave", handlePointerLeave as EventListener);
  hoverTarget.addEventListener("click", handleTouchOrClick as EventListener);

  // Also listen on the video element itself in case it fills or offsets within the container
  if (hoverTarget !== videoElement) {
    videoElement.addEventListener("pointerenter", handlePointerEnter as EventListener);
    videoElement.addEventListener("pointerleave", handlePointerLeave as EventListener);
  }

  videoElement.addEventListener("seeked", handleLoop);
  videoElement.addEventListener("ended", handleLoop);

  return () => {
    if (activeAudibleVideo === videoElement) {
      videoElement.muted = true;
      activeAudibleVideo = null;
    }
    hoverTarget.removeEventListener("pointerenter", handlePointerEnter as EventListener);
    hoverTarget.removeEventListener("pointerleave", handlePointerLeave as EventListener);
    hoverTarget.removeEventListener("click", handleTouchOrClick as EventListener);

    if (hoverTarget !== videoElement) {
      videoElement.removeEventListener("pointerenter", handlePointerEnter as EventListener);
      videoElement.removeEventListener("pointerleave", handlePointerLeave as EventListener);
    }

    videoElement.removeEventListener("seeked", handleLoop);
    videoElement.removeEventListener("ended", handleLoop);
  };
}

/**
 * Scans a container element and attaches hover-audio switching to every video within it.
 */
export function setupContainerHoverAudio(container: HTMLElement | null): () => void {
  if (typeof window === "undefined" || !container) {
    return () => {};
  }

  const cleanups: (() => void)[] = [];
  const videoElements = container.querySelectorAll("video");

  videoElements.forEach((video) => {
    const parent = video.parentElement || video;
    cleanups.push(attachHoverAudio(parent, video));
  });

  return () => {
    cleanups.forEach((cleanup) => cleanup());
  };
}
