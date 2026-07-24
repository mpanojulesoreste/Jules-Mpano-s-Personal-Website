import { ImageResponse } from 'next/og';
import { OgCard, ogSize, ogContentType } from '@/lib/og';

export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return new ImageResponse(
    <OgCard eyebrow="TOOLS · JULES MPANO" title="Interactive computer vision instruments." />,
    { ...size }
  );
}
