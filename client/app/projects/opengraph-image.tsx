import { ImageResponse } from 'next/og';
import { OgCard, ogSize, ogContentType } from '@/lib/og';

export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return new ImageResponse(
    <OgCard eyebrow="PROJECTS · JULES MPANO" title="LexAI, Edu-Sports Academy, and Our Kids Read." />,
    { ...size }
  );
}
