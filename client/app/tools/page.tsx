import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/metadata';
import ToolsClient from './ToolsClient';

export const metadata: Metadata = pageMetadata({
  title: 'Tools',
  description:
    'Interactive computer vision tools built by Jules Mpano, including a keypoint feature extractor (SIFT, ORB, AKAZE, BRISK) backed by a Flask and OpenCV API.',
  path: '/tools',
});

export default function ToolsPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <p className="eyebrow mb-4">TOOLS</p>
      <h1 className="font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
        Interactive instruments.
      </h1>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink/75">
        Computer vision and image-processing tools running against a Flask and OpenCV backend.
      </p>
      <ToolsClient />
    </div>
  );
}
