import type { Metadata } from 'next';
import { displayFont, sansFont, monoFont } from '@/lib/fonts';
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${displayFont.variable} ${sansFont.variable} ${monoFont.variable}`}>
      <body className="min-h-screen bg-paper text-ink">
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <SiteNav />
        <DepthGauge />
        <main id="main-content">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
