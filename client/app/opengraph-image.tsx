import { ImageResponse } from 'next/og';
import { OgCard, ogSize, ogContentType } from '@/lib/og';

export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return new ImageResponse(
    <OgCard
      eyebrow="JULES MPANO · PRINCETON"
      title="Computer Science MSE student in Robotics and Human-Computer Interaction"
    />,
    { ...size }
  );
}
