'use client';

import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

const THEME_KEY = 'theme';

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(document.documentElement.getAttribute('data-theme') === 'dark');
  }, []);

  const toggle = () => {
    const next = !isDark;
    setIsDark(next);
    if (next) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
    window.localStorage.setItem(THEME_KEY, next ? 'dark' : 'light');
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={isDark}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="flex items-center justify-center p-2 text-ink transition-colors hover:text-abyss"
    >
      {isDark ? <Sun className="h-5 w-5" aria-hidden="true" /> : <Moon className="h-5 w-5" aria-hidden="true" />}
    </button>
  );
}
