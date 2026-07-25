import type { Metadata } from 'next';
import { displayFont, sansFont, monoFont, dyslexicFont } from '@/lib/fonts';
import { siteConfig } from '@/lib/site';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';
import DepthGauge from '@/components/DepthGauge';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — Computer Science MSE Student & Researcher`,
    template: '%s — Jules Mpano',
  },
  description: siteConfig.description,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} — Computer Science MSE Student & Researcher`,
    description: siteConfig.description,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.name} — Computer Science MSE Student & Researcher`,
    description: siteConfig.description,
  },
};

const A11Y_INIT_SCRIPT = `
(function () {
  try {
    var scale = localStorage.getItem('a11y-font-scale');
    if (scale) document.documentElement.style.setProperty('--a11y-font-scale', scale);
    if (localStorage.getItem('a11y-high-contrast') === '1') {
      document.documentElement.setAttribute('data-high-contrast', 'true');
    }
    if (localStorage.getItem('a11y-dyslexic') === '1') {
      document.documentElement.setAttribute('data-dyslexic', 'true');
    }
    var savedTheme = localStorage.getItem('theme');
    var theme = savedTheme || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    if (theme === 'dark') document.documentElement.setAttribute('data-theme', 'dark');
  } catch (e) {}
})();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${displayFont.variable} ${sansFont.variable} ${monoFont.variable} ${dyslexicFont.variable}`}
    >
      <head>
        {/* Applies saved accessibility preferences before paint to avoid a flash of unstyled content. */}
        {/* eslint-disable-next-line react/no-danger */}
        <script dangerouslySetInnerHTML={{ __html: A11Y_INIT_SCRIPT }} />
      </head>
      <body className="flex min-h-screen flex-col bg-paper text-ink">
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <SiteNav />
        <DepthGauge />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
