import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: '#F5F0E8',
        'stone-dark': '#2C2C2C',
        earth: '#8B7355',
        sage: '#4A5E4A',
        'warm-gray': '#9E9589',
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        logo: '0.3em',
      },
    },
  },
  plugins: [],
}

export default config
