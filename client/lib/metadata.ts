import type { Metadata } from 'next';
import { siteConfig } from './site';

interface PageMetadataInput {
  title: string; // page-specific title, e.g. "Research" -- the "— Jules Mpano" suffix is applied by the root template
  description: string;
  path: string; // e.g. "/research"
}

/**
 * Builds consistent per-route metadata: canonical, Open Graph, and Twitter
 * card all derived from the same title/description so they never drift
 * apart (Next.js does not auto-derive twitter:* from openGraph:*).
 */
export function pageMetadata({ title, description, path }: PageMetadataInput): Metadata {
  const fullTitle = `${title} — ${siteConfig.name}`;
  const url = `${siteConfig.url}${path}`;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: fullTitle,
      description,
      url,
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
    },
  };
}
