import fs from 'node:fs';
import path from 'node:path';
import Image from 'next/image';

// Figure slots wait on real assets in public/research/. Drop a file named
// `${slot}.jpg` or `${slot}.png` in that folder and it appears automatically
// on the next build -- no code change needed.
const EXTENSIONS = ['jpg', 'jpeg', 'png', 'webp'];

interface ResearchFigureProps {
  slot: string;
  caption: string;
}

function findAsset(slot: string): string | null {
  const dir = path.join(process.cwd(), 'public', 'research');
  for (const ext of EXTENSIONS) {
    const file = `${slot}.${ext}`;
    if (fs.existsSync(path.join(dir, file))) {
      return `/research/${file}`;
    }
  }
  return null;
}

export default function ResearchFigure({ slot, caption }: ResearchFigureProps) {
  const src = findAsset(slot);

  return (
    <figure className="my-8">
      {src ? (
        <Image
          src={src}
          alt={caption}
          width={1600}
          height={1200}
          className="w-full border border-slate/20 object-cover"
        />
      ) : (
        <div
          aria-hidden="true"
          className="depth-underline flex aspect-[4/3] w-full items-center justify-center border border-dashed border-slate/30 bg-slate/5"
        >
          <span className="font-mono text-[0.65rem] tracking-wide text-slate">AWAITING FIGURE</span>
        </div>
      )}
      <figcaption className="mt-2 font-mono text-[0.65rem] tracking-wide text-slate">{caption}</figcaption>
    </figure>
  );
}
