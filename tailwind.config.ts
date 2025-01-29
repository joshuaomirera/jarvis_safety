import type { Config } from 'tailwindcss'

export default {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0a9882', // Your green
        secondary: '#171f40', // Your navy
        accent: '#ffd700', // Your yellow
        bright: '#08ffa4bf ', // Your lime green
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
      fontFamily: {
        sans: ['Barlow Condensed', 'sans-serif'],
      },
      spacing: {
        section: '5rem', // Consistent section spacing
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '4rem',
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
} satisfies Config
