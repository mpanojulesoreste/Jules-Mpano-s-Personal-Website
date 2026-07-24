import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/metadata';
import FeatureExtractorClient from './FeatureExtractorClient';

export const metadata: Metadata = pageMetadata({
  title: 'Feature Extractor',
  description:
    'Extract and visualize image keypoints with SIFT, ORB, AKAZE, or BRISK — an interactive computer vision tool by Jules Mpano.',
  path: '/tools/feature-extractor',
});

export default function FeatureExtractorPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <p className="eyebrow mb-4">TOOLS / FEATURE EXTRACTOR</p>
      <h1 className="font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
        Feature extractor.
      </h1>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink/75">
        Extract and visualize keypoints from images using classical computer vision algorithms.
      </p>
      <FeatureExtractorClient />
    </div>
  );
}
