'use client';

import dynamic from 'next/dynamic';
import { useMediaFlags } from '@/lib/useMediaFlags';
import DepthPoster from './DepthPoster';

// Kept out of the critical rendering path: react-three-fiber/three only
// load once this component mounts client-side, well after text has painted.
const DepthScene = dynamic(() => import('./DepthSchool'), {
  ssr: false,
  loading: () => <DepthPoster />,
});

const DESKTOP_COUNT = 220;
const MOBILE_COUNT = 70;

export default function HeroScene() {
  const { prefersReducedMotion, isMobileViewport } = useMediaFlags();

  // Fixed-aspect reserved box regardless of which path renders, so nothing
  // shifts layout (no CLS) whether it's the poster or the live scene.
  return (
    <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm sm:aspect-square lg:aspect-[4/5]">
      {prefersReducedMotion ? (
        <DepthPoster />
      ) : (
        <DepthScene particleCount={isMobileViewport ? MOBILE_COUNT : DESKTOP_COUNT} />
      )}
    </div>
  );
}
