/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./{app,components,lib,pages,hooks}/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        // Outfit: Gizmoz Trades UI and body text
        sans: ['var(--font-outfit)', 'system-ui', 'sans-serif'],
        heading: ['var(--font-outfit)', 'system-ui', 'sans-serif'],
        serif: ['"Playfair Display"', 'serif'],
      },
      colors: {
        // Gizmoz Trades — White / Light Blue / Soft Ocean
        brand: {
          DEFAULT: '#8CCFFF', // Light Blue — signature
          primary: '#0C4A6E', // Soft Ocean — type, headers, dark surfaces
          accent: '#8CCFFF', // Light Blue — highlights & signature CTAs
          ice: '#EAF6FF', // Ice Blue — soft section washes
          slate: '#64748B', // Supporting text / borders / icons
          surface: '#FFFFFF',
          light: '#EAF6FF',
          foreground: '#0C4A6E',
          dark: '#0C4A6E',
          muted: '#EAF6FF',
          black: '#0C4A6E',
          white: '#FFFFFF',
          text: '#0C4A6E',
          background: '#FFFFFF',
          // Legacy aliases → new palette (keep old class names working)
          purple: '#8CCFFF',
          'purple-light': '#EAF6FF',
          'purple-dark': '#0C4A6E',
        },
      },
      maxWidth: {
        store: '1440px',
      },
      boxShadow: {
        store: '0 4px 24px -4px rgba(12, 74, 110, 0.08)',
        'store-lg': '0 12px 40px -8px rgba(12, 74, 110, 0.12)',
        'store-card': '0 2px 12px rgba(12, 74, 110, 0.06)',
        'store-card-hover': '0 20px 48px -12px rgba(140, 207, 255, 0.35)',
        glass: '0 8px 32px -12px rgba(12, 74, 110, 0.12)',
      },
      borderRadius: {
        pill: '9999px',
        card: '1rem',
        'card-lg': '1.5rem',
        store: '1rem',
        'store-lg': '1.25rem',
        'store-xl': '1.5rem',
      },
    },
  },
  plugins: [],
}
