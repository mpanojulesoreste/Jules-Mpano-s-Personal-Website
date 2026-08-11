import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/metadata';
import { projects } from '@/lib/content';

export const metadata: Metadata = pageMetadata({
  title: 'Projects',
  description:
    'Case studies in applied engineering: LexAI (GPT-4.1 legal document pipeline with CUDA-accelerated inference), Edu-Sports Academy, and Our Kids Read, from Jules Mpano, a Princeton Computer Science researcher.',
  path: '/projects',
});

export default function ProjectsPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <p className="eyebrow mb-4">PROJECTS</p>
      <h1 className="font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
        Selected Projects
      </h1>

      <div className="mt-16 space-y-16">
        {projects.map((project) => (
          <article key={project.id} className="border-t border-slate/20 pt-8">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">{project.name}</h2>
              <span className="font-mono text-xs tracking-wide text-slate">{project.dates}</span>
            </div>

            <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-ink/80">{project.description}</p>

            <dl className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
              {project.outcomes.map((outcome) => (
                <div key={outcome}>
                  <dt className="sr-only">Outcome</dt>
                  <dd className="font-mono text-sm text-abyss">{outcome}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-6 flex flex-wrap gap-2">
              {project.stack.map((s) => (
                <span key={s} className="font-mono text-[0.65rem] tracking-wide text-slate">
                  {s}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
