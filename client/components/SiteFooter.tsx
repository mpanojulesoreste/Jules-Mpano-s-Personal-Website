import { siteConfig } from '@/lib/site';

export default function SiteFooter() {
  return (
    <footer className="border-t border-slate/20">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-xs tracking-wide text-slate">
            &copy; 2026 Jules Oreste Mpano &middot; Princeton University &middot; Computer Science
          </p>
          <a
            href={`mailto:${siteConfig.email}`}
            className="font-mono text-xs tracking-wide text-abyss underline decoration-slate/40 underline-offset-4 hover:decoration-abyss"
          >
            {siteConfig.email}
          </a>
        </div>
      </div>
    </footer>
  );
}
