import { STIX_Two_Text, IBM_Plex_Sans, IBM_Plex_Mono } from 'next/font/google';

// Display: serif with scientific-publishing heritage.
export const displayFont = STIX_Two_Text({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
});

// Body copy.
export const sansFont = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-sans',
  display: 'swap',
});

// Utility / telemetry: dates, tags, eyebrows, figure labels.
export const monoFont = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-mono',
  display: 'swap',
});
