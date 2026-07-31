'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { NAV_ITEMS, siteConfig } from '@/lib/site';
import AccessibilityMenu from './AccessibilityMenu';
import ThemeToggle from './ThemeToggle';

// Matches Tailwind's `md` breakpoint, where the mobile menu is hidden in favor of the desktop nav.
const MD_BREAKPOINT_QUERY = '(min-width: 768px)';

export default function SiteNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname?.startsWith(href));

  useEffect(() => {
    if (!open) return;

    const onClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    const mql = window.matchMedia(MD_BREAKPOINT_QUERY);
    const onBreakpointChange = (e: MediaQueryListEvent) => {
      if (e.matches) setOpen(false);
    };

    document.addEventListener('mousedown', onClickOutside);
    document.addEventListener('keydown', onEscape);
    mql.addEventListener('change', onBreakpointChange);
    return () => {
      document.removeEventListener('mousedown', onClickOutside);
      document.removeEventListener('keydown', onEscape);
      mql.removeEventListener('change', onBreakpointChange);
    };
  }, [open]);

  return (
    <header ref={navRef} className="sticky top-0 z-40 border-b border-slate/20 bg-paper/90 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="font-display text-lg font-semibold tracking-tight text-ink">
          Jules Mpano
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? 'page' : undefined}
              className={`eyebrow transition-colors hover:text-abyss ${
                isActive(item.href) ? 'text-abyss' : 'text-slate'
              }`}
            >
              {item.label}
            </Link>
          ))}
          <a
            href={siteConfig.cvHref}
            className="eyebrow border border-abyss px-3 py-1.5 text-abyss transition-colors hover:bg-abyss hover:text-paper"
          >
            CV
          </a>
          <ThemeToggle />
          <AccessibilityMenu />
        </nav>

        <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle />
          <AccessibilityMenu />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="p-2 text-ink"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label="Primary mobile" className="border-t border-slate/20 bg-paper md:hidden">
          <div className="flex flex-col gap-1 px-6 py-4">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                aria-current={isActive(item.href) ? 'page' : undefined}
                className={`eyebrow py-2 ${isActive(item.href) ? 'text-abyss' : 'text-slate'}`}
              >
                {item.label}
              </Link>
            ))}
            <a href={siteConfig.cvHref} onClick={() => setOpen(false)} className="eyebrow py-2 text-abyss">
              CV
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
