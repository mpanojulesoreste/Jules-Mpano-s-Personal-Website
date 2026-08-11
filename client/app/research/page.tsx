import type { Metadata } from 'next';
import { ExternalLink } from 'lucide-react';
import { siteConfig } from '@/lib/site';
import { pageMetadata } from '@/lib/metadata';
import { chiPaperDoi, thesisTitle, thesisAbstract } from '@/lib/content';

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
  author: { '@type': 'Person', name: 'Jules Mpano' },
  isPartOf: { '@type': 'PublicationVolume', name: 'CHI 2026 Extended Abstracts' },
  publisher: { '@type': 'Organization', name: 'ACM' },
};

const thesisJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Thesis',
  name: thesisTitle,
  abstract: thesisAbstract,
  author: { '@type': 'Person', name: 'Jules Mpano' },
  provider: { '@type': 'CollegeOrUniversity', name: 'Princeton University' },
};

const thesisTags = ['Depth Anything V2', 'CoralBot', 'Raspberry Pi 5', 'HoloOcean', 'Behavioral Cloning', 'COLMAP'];
const smtTags = ['Flask', 'React', 'Azure Cosmos DB', 'LLM Pipeline', 'N=15 Study'];

function Tags({ items }: { items: string[] }) {
  return (
    <div className="mt-6 flex flex-wrap gap-x-4 gap-y-2">
      {items.map((tag) => (
        <span key={tag} className="font-mono text-[0.7rem] tracking-wide text-slate">
          {tag}
        </span>
      ))}
    </div>
  );
}

export default function ResearchPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
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
      <h1 className="font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">Research</h1>
      <a
        href={siteConfig.links.scholar}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-abyss hover:underline"
      >
        Google Scholar
        <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
      </a>

      {/* Thesis */}
      <article id="thesis" className="mt-16 scroll-mt-24 border-t border-slate/20 pt-10">
        <p className="eyebrow">Self-Organizing Swarms &amp; Robotics Lab</p>
        <h2 className="mt-3 font-display text-2xl font-semibold leading-snug text-ink sm:text-3xl">{thesisTitle}</h2>
        <p className="mt-2 font-mono text-xs text-slate">Senior Thesis · Advised by Prof. Radhika Nagpal</p>

        <div className="mt-8 space-y-5 text-[15px] leading-relaxed text-ink/80">
          <p>
            Coral-reef monitoring needs autonomous platforms that can collect fine-grained data where human
            divers cannot persist. <strong>CoralBot</strong> — a fish-shaped robot with fin-based actuation,
            dual fisheye cameras, and an onboard <strong>Raspberry Pi 5</strong> — is the hardware this thesis
            builds for. Getting it to navigate on its own means solving perception, control, and validation
            together.
          </p>
          <p>
            The pipeline starts with a systematic evaluation of the <strong>Depth Anything V2</strong>{' '}
            monocular depth model on underwater fisheye imagery. That depth signal feeds a{' '}
            <strong>six-region detection system</strong> that triggers obstacle avoidance, validated through
            physical pool deployments at two venues.
          </p>
          <p>
            To go beyond reactive avoidance, I built a hardware-matched <strong>HoloOcean simulation</strong>{' '}
            and trained a twelve-model behavioral cloning sweep. Two ImageNet-pretrained depth policies
            reached <strong>10/10</strong> and <strong>9/10</strong> trajectory survival at{' '}
            <strong>0.1%</strong> and <strong>0.2%</strong> collision rates — with depth-channel mode collapse
            emerging as the binding constraint on vertical motion. A final <strong>COLMAP</strong>{' '}
            reconstruction benchmark characterizes why underwater scenes fail and proposes a SIFT-based
            feasibility diagnostic.
          </p>
        </div>

        <Tags items={thesisTags} />
      </article>

      {/* SorryIMissedThis */}
      <article id="sorryimissedthis" className="mt-16 scroll-mt-24 border-t border-slate/20 pt-10">
        <p className="eyebrow">Princeton HCI Group</p>
        <h2 className="mt-3 font-display text-2xl font-semibold text-ink sm:text-3xl">SorryIMissedThis</h2>
        <p className="mt-2 font-mono text-xs text-slate">
          Advised by Prof. Parastoo Abtahi · CHI &rsquo;26 Extended Abstracts · ACM
        </p>

        <a
          href={chiPaperDoi}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-2 border border-abyss px-4 py-2 text-sm font-medium text-abyss transition-colors hover:bg-abyss hover:text-paper"
        >
          Read the paper (DOI)
          <ExternalLink className="h-4 w-4" aria-hidden="true" />
        </a>

        <div className="mt-8 space-y-5 text-[15px] leading-relaxed text-ink/80">
          <p>
            SorryIMissedThis is an AI-powered relationship-maintenance system that ingests conversation
            histories and generates context-aware prompts through a{' '}
            <strong>three-stage LLM pipeline</strong>: context and style modeling, template-guided synthesis,
            and a heuristic fallback. It&rsquo;s privacy-preserving and local-first, sending only aggregated
            metadata off-device.
          </p>
          <p>
            A counterbalanced within-subjects study (<strong>N=15</strong>) found history-informed prompts
            drove <strong>3×</strong> the engagement of generic ones, with significant gains in connectedness
            (<strong>r=0.82</strong>) and overall satisfaction (<strong>r=0.92</strong>).
          </p>
        </div>

        <Tags items={smtTags} />
      </article>
    </div>
  );
}
