import { XMLParser } from 'fast-xml-parser';

export interface Essay {
  title: string;
  link: string;
  source: 'Medium' | 'Substack';
  publishedAt: string; // ISO 8601
}

const MEDIUM_FEED_URL = 'https://mpanojulesoreste.medium.com/feed';

// SUBSTACK_URL is not yet available. Once the client supplies one, set the
// env var to the publication root (e.g. https://name.substack.com) -- the
// /feed suffix is appended automatically, matching Substack's convention.
function substackFeedUrl(): string | null {
  const base = process.env.SUBSTACK_URL;
  if (!base) return null;
  return `${base.replace(/\/$/, '')}/feed`;
}

interface RssItem {
  title?: string;
  link?: string;
  pubDate?: string;
}

function parseRssItems(xml: string): RssItem[] {
  const parser = new XMLParser({ ignoreAttributes: true });
  const doc = parser.parse(xml);
  const items = doc?.rss?.channel?.item;
  if (!items) return [];
  return Array.isArray(items) ? items : [items];
}

async function fetchFeed(url: string, source: Essay['source']): Promise<Essay[]> {
  try {
    const res = await fetch(url, {
      // ISR: revalidate this fetch daily rather than on every request.
      next: { revalidate: 86400 },
      headers: { 'User-Agent': 'julesmpano.org essays fetcher' },
    });
    if (!res.ok) return [];

    const xml = await res.text();
    const items = parseRssItems(xml);

    return items
      .filter((item) => item.title && item.link)
      .map((item) => ({
        title: String(item.title),
        link: String(item.link),
        source,
        publishedAt: item.pubDate ? new Date(item.pubDate).toISOString() : new Date(0).toISOString(),
      }));
  } catch {
    // Network restrictions in sandboxed/build environments, feed downtime,
    // malformed XML, etc. -- fail soft, the page renders an empty state.
    return [];
  }
}

export async function getEssays(): Promise<Essay[]> {
  const feeds = [fetchFeed(MEDIUM_FEED_URL, 'Medium')];

  const substackUrl = substackFeedUrl();
  if (substackUrl) {
    feeds.push(fetchFeed(substackUrl, 'Substack'));
  }

  const results = await Promise.all(feeds);
  const merged = results.flat();

  return merged.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

export function isSubstackConfigured(): boolean {
  return Boolean(process.env.SUBSTACK_URL);
}
