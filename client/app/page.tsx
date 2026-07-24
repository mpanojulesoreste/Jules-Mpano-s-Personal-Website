import Link from 'next/link';
import { ArrowRight, Github, Linkedin, GraduationCap, Mail } from 'lucide-react';
import HeroScene from '@/components/hero/HeroScene';
import { siteConfig } from '@/lib/site';
import { bio, currentWork, projects } from '@/lib/content';

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Jules Mpano',
  affiliation: {
    '@type': 'CollegeOrUniversity',
    name: 'Princeton University',
  },
  jobTitle: 'Computer Science MSE Student & Researcher',
  sameAs: [siteConfig.links.github, siteConfig.links.linkedin, siteConfig.links.scholar, siteConfig.links.medium],
};

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: siteConfig.name,
  url: siteConfig.url,
};

export default function HomePage() {
  return (
    <div>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />

      {/* Hero: content left-anchored, scene occupies the right and bleeds off-canvas. */}
      <section className="relative overflow-hidden border-b border-slate/20">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-6 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-4 lg:py-24">
          <div className="relative z-10 max-w-xl">
            <p className="eyebrow mb-6">RESEARCH &middot; ROBOTICS &middot; HCI</p>
            <h1 className="font-display text-5xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-6xl">
              Seeing depth where there is only one camera.
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-ink/80">{bio}</p>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
              <a
                href={siteConfig.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-ink transition-colors hover:text-abyss"
              >
                <Github className="h-4 w-4" aria-hidden="true" />
                GitHub
              </a>
              <a
                href={siteConfig.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-ink transition-colors hover:text-abyss"
              >
                <Linkedin className="h-4 w-4" aria-hidden="true" />
                LinkedIn
              </a>
              <a
                href={siteConfig.links.scholar}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-ink transition-colors hover:text-abyss"
              >
                <GraduationCap className="h-4 w-4" aria-hidden="true" />
                Scholar
              </a>
              <a
                href={`mailto:${siteConfig.email}`}
                className="inline-flex items-center gap-2 text-sm font-medium text-ink transition-colors hover:text-abyss"
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
                Email
              </a>
              <a
                href={siteConfig.cvHref}
                className="eyebrow border border-abyss px-3 py-1.5 text-abyss transition-colors hover:bg-abyss hover:text-paper"
              >
                CV
              </a>
            </div>
          </div>

          <div className="relative lg:-mr-6 lg:translate-x-4">
            <HeroScene />
          </div>
        </div>
      </section>

      {/* Current work */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <p className="eyebrow mb-8">CURRENT WORK</p>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-8">
          {currentWork.map((item) => (
            <Link key={item.id} href={item.href} className="group block">
              <p className="font-mono text-[0.7rem] tracking-wide text-slate">{item.eyebrow}</p>
              <h3 className="depth-underline mt-3 inline font-display text-2xl font-semibold leading-snug text-ink transition-colors group-hover:text-abyss">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-ink/75">{item.description}</p>
              <p className="mt-3 font-mono text-xs text-slate">{item.advisor}</p>
            </Link>
          ))}
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-6">
        <div className="hairline" />
      </div>

      {/* Selected projects -- staggered, not equal cards */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <p className="eyebrow mb-8">SELECTED PROJECTS</p>
        <div className="space-y-14">
          {projects.map((project, i) => (
            <article
              key={project.id}
              className={`flex flex-col gap-3 md:flex-row md:gap-10 ${i % 2 === 1 ? 'md:pl-16' : ''}`}
            >
              <div className="font-mono text-xs text-slate md:w-24 md:flex-shrink-0 md:pt-1">{project.dates}</div>
              <div className="max-w-2xl">
                <h3 className="font-display text-xl font-semibold text-ink">{project.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/75">{project.description}</p>
                <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
                  {project.outcomes.map((o) => (
                    <span key={o} className="font-mono text-xs text-abyss">
                      {o}
                    </span>
                  ))}
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {project.stack.map((s) => (
                    <span key={s} className="font-mono text-[0.65rem] tracking-wide text-slate">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
        <Link
          href="/projects"
          className="mt-10 inline-flex items-center gap-2 text-sm font-medium text-abyss hover:gap-3 transition-all"
        >
          All projects
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </section>

      <div className="mx-auto max-w-6xl px-6">
        <div className="hairline" />
      </div>

      {/* Essays teaser */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <Link href="/essays" className="group inline-flex items-center gap-3">
          <span className="font-display text-xl text-ink transition-colors group-hover:text-abyss">
            Essays on research, robotics, and building.
          </span>
          <ArrowRight className="h-5 w-5 text-abyss transition-transform group-hover:translate-x-1" aria-hidden="true" />
        </Link>
      </section>
    </div>
  );
}
