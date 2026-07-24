import type { Metadata } from 'next';
import { ExternalLink, Mail } from 'lucide-react';
import { siteConfig } from '@/lib/site';
import { pageMetadata } from '@/lib/metadata';
import { getEssays, isSubstackConfigured } from '@/lib/essays';

export const metadata: Metadata = pageMetadata({
  title: 'Essays',
  description:
    'Essays by Jules Mpano on technology, research, and building — from underwater robotics to human-computer interaction, cross-posted from Medium and Substack.',
  path: '/essays',
});

// Revalidate daily -- essays don't need to be fresher than that.
export const revalidate = 86400;

function formatDate(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return '';
  return date
    .toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: '2-digit' })
    .toUpperCase();
}

export default async function EssaysPage() {
  const essays = await getEssays();
  const substackReady = isSubstackConfigured();

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <p className="eyebrow mb-4">ESSAYS</p>
      <h1 className="font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">Essays.</h1>
      <p className="mt-4 max-w-xl text-lg leading-relaxed text-ink/75">
        I write about technology, research, and building.
      </p>

      {essays.length === 0 ? (
        <div className="mt-14 border border-slate/25 p-10 text-center">
          <p className="font-display text-xl text-ink">First essays arriving soon.</p>
          <p className="mt-2 text-sm text-ink/70">Subscribe to be notified.</p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <a
              href={siteConfig.links.medium}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-abyss px-4 py-2 font-mono text-xs tracking-wide text-abyss transition-colors hover:bg-abyss hover:text-paper"
            >
              READ ON MEDIUM
              <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
            <SubstackCta substackReady={substackReady} />
          </div>
        </div>
      ) : (
        <>
          <ul className="mt-14 divide-y divide-slate/20 border-t border-slate/20">
            {essays.map((essay) => (
              <li key={essay.link}>
                <a
                  href={essay.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col gap-1 py-5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
                >
                  <span className="font-display text-lg text-ink transition-colors group-hover:text-abyss">
                    {essay.title}
                  </span>
                  <span className="flex flex-shrink-0 items-center gap-3 font-mono text-xs text-slate">
                    <span className="border border-slate/40 px-1.5 py-0.5">{essay.source.toUpperCase()}</span>
                    <span>{formatDate(essay.publishedAt)}</span>
                    <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-10 flex justify-center">
            <SubstackCta substackReady={substackReady} />
          </div>
        </>
      )}
    </div>
  );
}

function SubstackCta({ substackReady }: { substackReady: boolean }) {
  if (!substackReady) return null;
  return (
    <a
      href={siteConfig.links.substack}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 font-mono text-xs tracking-wide text-slate transition-colors hover:text-abyss"
    >
      <Mail className="h-3.5 w-3.5" aria-hidden="true" />
      SUBSCRIBE ON SUBSTACK
    </a>
  );
}
