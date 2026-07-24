export const ogSize = { width: 1200, height: 630 };
export const ogContentType = 'image/png';

/**
 * Shared OG card visual language: paper background, depth-gradient accent
 * bar, serif headline, mono eyebrow -- reused per-route via ImageResponse
 * so no static image asset is needed anywhere in the site.
 */
export function OgCard({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        background: '#F7F7F5',
        padding: '72px',
      }}
    >
      <div
        style={{
          display: 'flex',
          fontSize: 20,
          letterSpacing: 4,
          textTransform: 'uppercase',
          color: '#5A6B73',
          fontFamily: 'monospace',
        }}
      >
        {eyebrow}
      </div>

      <div
        style={{
          display: 'flex',
          fontSize: 64,
          lineHeight: 1.15,
          fontWeight: 600,
          color: '#14181D',
          maxWidth: 980,
        }}
      >
        {title}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div
          style={{
            display: 'flex',
            width: '100%',
            height: 10,
            background: 'linear-gradient(90deg, #440154 0%, #21918C 50%, #FDE725 100%)',
          }}
        />
        <div style={{ display: 'flex', fontSize: 24, color: '#0B3C49', fontFamily: 'monospace' }}>
          julesmpano.org
        </div>
      </div>
    </div>
  );
}
