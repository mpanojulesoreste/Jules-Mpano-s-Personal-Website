/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}', './lib/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        paper: 'var(--paper)',
        ink: 'var(--ink)',
        abyss: 'var(--abyss)',
        slate: 'var(--slate)',
        depth: {
          1: 'var(--depth-1)',
          2: 'var(--depth-2)',
          3: 'var(--depth-3)',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      backgroundImage: {
        'depth-gradient': 'linear-gradient(90deg, #440154 0%, #21918C 50%, #FDE725 100%)',
      },
      maxWidth: {
        prose: '68ch',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        riseIn: {
          '0%': { transform: 'translateY(12px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out both',
        'rise-in': 'riseIn 0.6s ease-out both',
      },
    },
  },
  plugins: [],
};
