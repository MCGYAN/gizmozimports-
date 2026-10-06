/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./{app,components,libs,pages,hooks}/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],
        serif: ['"Playfair Display"', 'serif'],
        handwriting: ['Pacifico', 'cursive'],
      },
      colors: {
        brand: {
          DEFAULT: '#1D4ED8',
          light: '#60A5FA',
          dark: '#1E3A8A',
          accent: '#F97316',
          muted: '#F5F7FA',
          purple: '#1D4ED8',
          'purple-light': '#93C5FD',
          'purple-dark': '#1E3A8A',
          black: '#1F2937',
          white: '#FFFFFF',
          text: '#1F2937',
          background: '#FFFFFF',
          surface: '#F5F7FA',
        },
        // Backward-compatible color aliases used across existing classes.
        'brand-purple': '#1D4ED8',
        'brand-purple-light': '#93C5FD',
        'brand-purple-dark': '#1E3A8A',
        'brand-accent': '#F97316',
        'brand-black': '#1F2937',
        'brand-white': '#FFFFFF',
      },
      borderRadius: {
        'pill': '9999px',
        'card': '1rem',
        'card-lg': '1.5rem',
      },
    },
  },
  plugins: [],
}

