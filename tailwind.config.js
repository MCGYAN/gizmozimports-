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
        // Gizmoz Trades brand identity
        brand: {
          DEFAULT: '#1D4ED8', // Royal blue — primary buttons, links
          primary: '#1E3A8A', // Deep blue — trust, dark surfaces, headings
          accent: '#F97316', // Orange — action / CTA
          surface: '#FFFFFF',
          light: '#F5F7FA', // Light surfaces
          foreground: '#1F2937', // Body text
          dark: '#1E3A8A',
          muted: '#F5F7FA',
          black: '#1F2937',
          white: '#FFFFFF',
          text: '#1F2937',
          background: '#FFFFFF',
          purple: '#1D4ED8',
          'purple-light': '#93C5FD',
          'purple-dark': '#1E3A8A',
        },
      },
      maxWidth: {
        store: '1440px',
      },
      boxShadow: {
        store: '0 4px 24px -4px rgba(30, 58, 138, 0.08)',
        'store-lg': '0 12px 40px -8px rgba(30, 58, 138, 0.12)',
        'store-card': '0 2px 12px rgba(30, 58, 138, 0.06)',
        'store-card-hover': '0 20px 48px -12px rgba(249, 115, 22, 0.18)',
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
