import type { Metadata } from 'next';
import { ExternalLink } from 'lucide-react';
import { siteConfig } from '@/lib/site';
import { pageMetadata } from '@/lib/metadata';
import { chiPaperDoi, thesisTitle, thesisAbstract } from '@/lib/content';
import ResearchFigure from '@/components/ResearchFigure';

export const metadata: Metadata = pageMetadata({
  title: 'Research',
  description:
    'Vision-based navigation policies for CoralBot, a resource-constrained underwater robot, plus SorryIMissedThis, an HCI system for AI-assisted relationship maintenance published at CHI 2026.',
  path: '/research',
});

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

const thesisJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Thesis',
  name: thesisTitle,
  abstract: thesisAbstract,
  author: {
    '@type': 'Person',
    name: 'Jules Mpano',
  },
  provider: {
    '@type': 'CollegeOrUniversity',
    name: 'Princeton University',
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
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(thesisJsonLd) }}
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
        <h2 className="mt-3 font-display text-2xl font-semibold text-ink sm:text-3xl">{thesisTitle}</h2>
        <p className="mt-2 font-mono text-xs text-slate">
          Senior Thesis · Advised by Prof. Radhika Nagpal
        </p>

        <ResearchFigure
          slot="coralbot"
          caption="FIG. 01A — CoralBot, fish-shaped platform with fin-based actuation and dual fisheye cameras"
        />

        <div className="mt-6 space-y-5 text-[15px] leading-relaxed text-ink/80">
          <p>
            Coral-reef monitoring requires autonomous platforms capable of sustained, fine-grained data
            collection in environments where human divers cannot persist.{' '}
            <strong>CoralBot</strong> &mdash; a fish-shaped platform with fin-based actuation, dual fisheye
            cameras, and an onboard <strong>Raspberry Pi 5</strong> &mdash; is the hardware this thesis
            builds for. Enabling autonomous navigation on such resource-constrained hardware means solving
            perception, control, and validation together, not in isolation.
          </p>
          <p>
            The pipeline begins with a systematic evaluation of the{' '}
            <strong>Depth Anything V2</strong> monocular depth foundation model on underwater fisheye
            imagery, including input-size studies and calibration analysis. That depth signal feeds a{' '}
            <strong>six-region detection system</strong> that triggers heuristic obstacle avoidance,
            validated through physical pool deployment on CoralBot at two venues.
          </p>

          <ResearchFigure
            slot="pool-deployment"
            caption="FIG. 01B — Physical pool deployment validating six-region obstacle avoidance"
          />

          <p>
            To extend behavior beyond reactive avoidance, we built a hardware-matched{' '}
            <strong>HoloOcean simulation</strong> in which the constrained HoveringAUV agent serves as a
            CoralBot proxy, and trained a <strong>twelve-model behavioral cloning sweep</strong> across
            input modality (depth versus RGB), lighting augmentation, backbone initialization, and training
            budget. Closed-loop evaluation across seen and held-out trajectories produced two
            ImageNet-pretrained depth policies achieving <strong>10/10</strong> and <strong>9/10</strong>{' '}
            trajectory survival with collision rates of <strong>0.1%</strong> and <strong>0.2%</strong>, and
            identified <strong>depth-channel mode collapse</strong> as the binding constraint on tasks
            requiring vertical motion.
          </p>
          <p>
            As a downstream application, the thesis benchmarks <strong>COLMAP</strong>-based 3D
            reconstruction across terrestrial, in-air, and underwater datasets, characterizes the failure
            modes that prevent recognizable underwater reconstructions, and proposes a{' '}
            <strong>SIFT-based feasibility diagnostic</strong>. It concludes with a proposed deployment
            architecture for physical CoralBot and mitigations for the sim-to-real gap and the
            mode-collapse limitation.
          </p>

          <ResearchFigure slot="thesis-figure" caption="FIG. 01C — Selected result figure" />
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {[
            'Depth Anything V2',
            'CoralBot',
            'Dual Fisheye',
            'Raspberry Pi 5',
            'HoloOcean',
            'Behavioral Cloning',
            'COLMAP',
          ].map((tag) => (
            <span
              key={tag}
              className="depth-underline font-mono text-[0.65rem] tracking-wide text-slate transition-colors hover:text-abyss"
            >
              {tag}
            </span>
          ))}
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
