import type { Metadata } from 'next';
import { ExternalLink } from 'lucide-react';
import { siteConfig } from '@/lib/site';
import { chiPaperDoi } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Research',
  description:
    'Monocular depth estimation and 3D reconstruction for autonomous underwater robot navigation at Princeton, plus SorryIMissedThis, an HCI system for AI-assisted relationship maintenance published at CHI 2026.',
  alternates: { canonical: '/research' },
  openGraph: {
    title: 'Research — Jules Mpano',
    description:
      'Monocular depth estimation for underwater robotics and SorryIMissedThis, an HCI system published at CHI 2026.',
    url: `${siteConfig.url}/research`,
  },
};

const scholarlyArticleJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ScholarlyArticle',
  headline: 'SorryIMissedThis: AI-Powered Relationship Maintenance',
  sameAs: chiPaperDoi,
  identifier: chiPaperDoi,
  author: {
    '@type': 'Person',
    name: 'Jules Mpano',
  },
  isPartOf: {
    '@type': 'PublicationVolume',
    name: 'CHI 2026 Extended Abstracts',
  },
  publisher: {
    '@type': 'Organization',
    name: 'ACM',
  },
};

export default function ResearchPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(scholarlyArticleJsonLd) }}
      />

      <p className="eyebrow mb-4">RESEARCH</p>
      <h1 className="font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
        Two questions about seeing and being seen.
      </h1>
      <a
        href={siteConfig.links.scholar}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-abyss hover:underline"
      >
        Google Scholar
        <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
      </a>

      {/* Entry 1: thesis */}
      <article id="thesis" className="mt-16 scroll-mt-24 border-t border-slate/20 pt-10">
        <p className="font-mono text-xs tracking-wide text-slate">
          FIG. 01 — DEPTH FIELD · SELF-ORGANIZING SWARMS &amp; ROBOTICS LAB
        </p>
        <h2 className="mt-3 font-display text-2xl font-semibold text-ink sm:text-3xl">
          Monocular Depth Estimation &amp; 3D Reconstruction for Autonomous Underwater Robot Navigation
        </h2>
        <p className="mt-2 font-mono text-xs text-slate">
          Senior Thesis · Advised by Prof. Radhika Nagpal
        </p>

        <div className="mt-6 space-y-5 text-[15px] leading-relaxed text-ink/80">
          <p>
            A bio-inspired robotic fish needs to know what is in front of it with a single camera and no
            depth sensor. This thesis deploys <strong>Depth Anything V2</strong> for real-time obstacle
            avoidance on a <strong>Raspberry Pi 5</strong>, running entirely on embedded hardware at the
            edge, with no offboard compute.
          </p>
          <p>
            A complementary <strong>threshold-based detection pipeline</strong> runs over stereo fisheye
            feeds, partitioning the robot&rsquo;s field of view into six spatial regions, each scored with a
            five-level confidence classification, to keep obstacle response robust when monocular depth
            alone is uncertain.
          </p>
          <p>
            Alongside navigation, the thesis includes a <strong>3D-reconstruction benchmark</strong> across{' '}
            <strong>COLMAP</strong>, <strong>MapAnything</strong>, and <strong>Depth-Anything-V3</strong> on
            underwater datasets, comparing reconstruction quality for marine environments where lighting,
            turbidity, and texture violate the assumptions most of these methods are built on.
          </p>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {['Depth Anything V2', 'Raspberry Pi 5', 'COLMAP', 'MapAnything', 'Depth-Anything-V3', 'Stereo Fisheye'].map(
            (tag) => (
              <span
                key={tag}
                className="depth-underline font-mono text-[0.65rem] tracking-wide text-slate transition-colors hover:text-abyss"
              >
                {tag}
              </span>
            )
          )}
        </div>
      </article>

      {/* Entry 2: SorryIMissedThis */}
      <article id="sorryimissedthis" className="mt-16 scroll-mt-24 border-t border-slate/20 pt-10">
        <p className="font-mono text-xs tracking-wide text-slate">
          FIG. 02 — CONTACT MODEL · PRINCETON HCI GROUP
        </p>
        <h2 className="mt-3 font-display text-2xl font-semibold text-ink sm:text-3xl">SorryIMissedThis</h2>
        <p className="mt-2 font-mono text-xs text-slate">
          Advised by Prof. Parastoo Abtahi · CHI &rsquo;26 Extended Abstracts · ACM
        </p>

        <a
          href={chiPaperDoi}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-2 border border-abyss px-4 py-2 text-sm font-medium text-abyss transition-colors hover:bg-abyss hover:text-paper"
        >
          Read the paper (DOI)
          <ExternalLink className="h-4 w-4" aria-hidden="true" />
        </a>

        <div className="mt-6 space-y-5 text-[15px] leading-relaxed text-ink/80">
          <p>
            SorryIMissedThis is an AI-powered relationship-maintenance system: a full-stack architecture
            (Flask, React/Tailwind, Azure Cosmos DB) that ingests conversation histories and generates
            context-aware prompts through a <strong>three-stage LLM pipeline</strong> &mdash; context and
            style modeling, template-guided synthesis, and a heuristic fallback for when the model is
            unsure. The architecture is privacy-preserving and local-first, transmitting only aggregated
            metadata off-device.
          </p>
          <p>
            A counterbalanced within-subjects study (<strong>N=15</strong>) found that history-informed
            prompts drove <strong>3&times;</strong> the engagement of generic prompts, with significant
            gains in connectedness (<strong>r=0.82</strong>) and overall satisfaction (<strong>r=0.92</strong>).
          </p>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {['Flask', 'React', 'Tailwind', 'Azure Cosmos DB', 'LLM Pipeline', 'N=15 Study'].map((tag) => (
            <span
              key={tag}
              className="depth-underline font-mono text-[0.65rem] tracking-wide text-slate transition-colors hover:text-abyss"
            >
              {tag}
            </span>
          ))}
        </div>
      </article>
    </div>
  );
}
