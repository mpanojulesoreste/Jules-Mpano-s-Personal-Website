import { ImageResponse } from 'next/og';
import { OgCard, ogSize, ogContentType } from '@/lib/og';

export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return new ImageResponse(
    <OgCard eyebrow="RESEARCH · JULES MPANO" title="Monocular depth estimation for underwater robots. SorryIMissedThis at CHI '26." />,
    { ...size }
  );
}
