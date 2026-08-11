'use client';

import { useEffect, useRef, useState } from 'react';
import { Accessibility, Minus, Plus, Contrast, RotateCcw, SpellCheck } from 'lucide-react';

const FONT_SCALE_STEPS = [1, 1.125, 1.25, 1.4] as const;
const FONT_SCALE_KEY = 'a11y-font-scale';
const CONTRAST_KEY = 'a11y-high-contrast';
const DYSLEXIC_KEY = 'a11y-dyslexic';

export default function AccessibilityMenu() {
  const [open, setOpen] = useState(false);
  const [scaleIndex, setScaleIndex] = useState(0);
  const [highContrast, setHighContrast] = useState(false);
  const [dyslexicMode, setDyslexicMode] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const savedScale = Number(window.localStorage.getItem(FONT_SCALE_KEY));
    const savedContrast = window.localStorage.getItem(CONTRAST_KEY) === '1';
    const savedDyslexic = window.localStorage.getItem(DYSLEXIC_KEY) === '1';
    if (FONT_SCALE_STEPS.includes(savedScale as (typeof FONT_SCALE_STEPS)[number])) {
      const idx = FONT_SCALE_STEPS.indexOf(savedScale as (typeof FONT_SCALE_STEPS)[number]);
      setScaleIndex(idx);
      document.documentElement.style.setProperty('--a11y-font-scale', String(savedScale));
    }
    if (savedContrast) {
      setHighContrast(true);
      document.documentElement.setAttribute('data-high-contrast', 'true');
    }
    if (savedDyslexic) {
      setDyslexicMode(true);
      document.documentElement.setAttribute('data-dyslexic', 'true');
    }
  }, []);

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onClickOutside);
    document.addEventListener('keydown', onEscape);
    return () => {
      document.removeEventListener('mousedown', onClickOutside);
      document.removeEventListener('keydown', onEscape);
    };
  }, []);

  const applyScale = (idx: number) => {
    const clamped = Math.min(Math.max(idx, 0), FONT_SCALE_STEPS.length - 1);
    setScaleIndex(clamped);
    const scale = FONT_SCALE_STEPS[clamped];
    document.documentElement.style.setProperty('--a11y-font-scale', String(scale));
    window.localStorage.setItem(FONT_SCALE_KEY, String(scale));
  };

  const toggleContrast = () => {
    const next = !highContrast;
    setHighContrast(next);
    // Must set the value to the literal "true" the CSS selector matches --
    // toggleAttribute(name, true) would set an empty value that doesn't match.
    if (next) {
      document.documentElement.setAttribute('data-high-contrast', 'true');
    } else {
      document.documentElement.removeAttribute('data-high-contrast');
    }
    window.localStorage.setItem(CONTRAST_KEY, next ? '1' : '0');
  };

  const toggleDyslexic = () => {
    const next = !dyslexicMode;
    setDyslexicMode(next);
    if (next) {
      document.documentElement.setAttribute('data-dyslexic', 'true');
    } else {
      document.documentElement.removeAttribute('data-dyslexic');
    }
    window.localStorage.setItem(DYSLEXIC_KEY, next ? '1' : '0');
  };

  const reset = () => {
    applyScale(0);
    setHighContrast(false);
    setDyslexicMode(false);
    document.documentElement.removeAttribute('data-high-contrast');
    document.documentElement.removeAttribute('data-dyslexic');
    window.localStorage.removeItem(FONT_SCALE_KEY);
    window.localStorage.removeItem(CONTRAST_KEY);
    window.localStorage.removeItem(DYSLEXIC_KEY);
  };

  return (
    <div ref={menuRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="a11y-panel"
        aria-label="Accessibility options"
        className="flex items-center justify-center p-2 text-ink transition-colors hover:text-abyss"
      >
        <Accessibility className="h-5 w-5" aria-hidden="true" />
      </button>

      {open && (
        <div
          id="a11y-panel"
          role="region"
          aria-label="Accessibility options"
          className="absolute right-0 top-full z-50 mt-2 w-64 border border-slate/25 bg-paper p-4 shadow-lg"
        >
          <p className="eyebrow mb-3">ACCESSIBILITY</p>

          <div className="flex items-center justify-between">
            <span className="text-sm text-ink">Text size</span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => applyScale(scaleIndex - 1)}
                disabled={scaleIndex === 0}
                aria-label="Decrease text size"
                className="border border-slate/30 p-1.5 text-ink transition-colors hover:border-abyss hover:text-abyss disabled:cursor-not-allowed disabled:opacity-30"
              >
                <Minus className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
              <span className="w-8 text-center font-mono text-xs text-slate">
                {Math.round(FONT_SCALE_STEPS[scaleIndex] * 100)}%
              </span>
              <button
                type="button"
                onClick={() => applyScale(scaleIndex + 1)}
                disabled={scaleIndex === FONT_SCALE_STEPS.length - 1}
                aria-label="Increase text size"
                className="border border-slate/30 p-1.5 text-ink transition-colors hover:border-abyss hover:text-abyss disabled:cursor-not-allowed disabled:opacity-30"
              >
                <Plus className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
            </div>
          </div>

          <button
            type="button"
            onClick={toggleContrast}
            aria-pressed={highContrast}
            className="mt-4 flex w-full items-center justify-between border border-slate/30 px-3 py-2 text-sm text-ink transition-colors hover:border-abyss"
          >
            <span className="flex items-center gap-2">
              <Contrast className="h-4 w-4" aria-hidden="true" />
              High contrast
            </span>
            <span className="font-mono text-[0.65rem] text-slate">{highContrast ? 'ON' : 'OFF'}</span>
          </button>

          <button
            type="button"
            onClick={toggleDyslexic}
            aria-pressed={dyslexicMode}
            className="mt-2 flex w-full items-center justify-between border border-slate/30 px-3 py-2 text-sm text-ink transition-colors hover:border-abyss"
          >
            <span className="flex items-center gap-2">
              <SpellCheck className="h-4 w-4" aria-hidden="true" />
              Dyslexia-friendly
            </span>
            <span className="font-mono text-[0.65rem] text-slate">{dyslexicMode ? 'ON' : 'OFF'}</span>
          </button>

          <button
            type="button"
            onClick={reset}
            className="mt-3 flex items-center gap-2 font-mono text-[0.65rem] tracking-wide text-slate transition-colors hover:text-abyss"
          >
            <RotateCcw className="h-3 w-3" aria-hidden="true" />
            RESET
          </button>
        </div>
      )}
    </div>
  );
}
