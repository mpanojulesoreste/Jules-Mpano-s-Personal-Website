import Link from 'next/link';
import type { BioSegment } from '@/lib/content';

function isExternal(href: string) {
  return href.startsWith('http');
}

export default function BioText({ paragraphs }: { paragraphs: BioSegment[][] }) {
  return (
    <div className="space-y-4 text-[15px] leading-relaxed text-ink/80">
      {paragraphs.map((segments, i) => (
        <p key={i}>
          {segments.map((segment, j) =>
            segment.href ? (
              isExternal(segment.href) ? (
                <a
                  key={j}
                  href={segment.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-abyss underline decoration-slate/40 underline-offset-2 transition-colors hover:decoration-abyss"
                >
                  {segment.text}
                </a>
              ) : (
                <Link
                  key={j}
                  href={segment.href}
                  className="text-abyss underline decoration-slate/40 underline-offset-2 transition-colors hover:decoration-abyss"
                >
                  {segment.text}
                </Link>
              )
            ) : (
              <span key={j}>{segment.text}</span>
            )
          )}
        </p>
      ))}
    </div>
  );
}
