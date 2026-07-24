'use client';

import { useEffect, useState } from 'react';

const MAX_METERS = 40;
const MARKS = [0, 10, 20, 30, 40];

/**
 * Restrained scroll-depth indicator along the viewport edge: "0 m" at the
 * top, increasing as the page scrolls, echoing the site's depth-map
 * conceit. Hidden below lg so it never competes with content on small
 * screens, and hidden entirely under reduced motion.
 */
export default function DepthGauge() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = scrollable > 0 ? window.scrollY / scrollable : 0;
      setProgress(Math.min(1, Math.max(0, ratio)));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const meters = Math.round(progress * MAX_METERS);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed right-3 top-1/2 z-30 hidden -translate-y-1/2 flex-col items-end gap-3 motion-reduce:hidden lg:flex"
    >
      <div className="relative h-56 w-px bg-slate/25">
        <div
          className="absolute left-1/2 top-0 w-px -translate-x-1/2 bg-abyss transition-[height] duration-150 ease-out"
          style={{ height: `${progress * 100}%` }}
        />
        {MARKS.map((m) => (
          <span
            key={m}
            className="absolute right-1.5 h-px w-1.5 bg-slate/40"
            style={{ top: `${(m / MAX_METERS) * 100}%` }}
          />
        ))}
      </div>
      <span className="font-mono text-[0.65rem] tabular-nums tracking-wide text-slate">{meters}&nbsp;m</span>
    </div>
  );
}
