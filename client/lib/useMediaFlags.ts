'use client';

import { useEffect, useState } from 'react';

interface MediaFlags {
  prefersReducedMotion: boolean;
  isMobileViewport: boolean;
}

/**
 * Client-only media flags used to decide whether to render the WebGL
 * boids scene, a reduced particle count, or the static poster fallback.
 * Defaults are the safe/cheap choice (reduced motion assumed true, mobile
 * assumed true) until the real values are known post-mount, so SSR/first
 * paint never renders the heavy path.
 */
export function useMediaFlags(): MediaFlags {
  const [flags, setFlags] = useState<MediaFlags>({
    prefersReducedMotion: true,
    isMobileViewport: true,
  });

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const widthQuery = window.matchMedia('(max-width: 767px)');

    const update = () => {
      setFlags({
        prefersReducedMotion: motionQuery.matches,
        isMobileViewport: widthQuery.matches,
      });
    };

    update();
    motionQuery.addEventListener('change', update);
    widthQuery.addEventListener('change', update);
    return () => {
      motionQuery.removeEventListener('change', update);
      widthQuery.removeEventListener('change', update);
    };
  }, []);

  return flags;
}
