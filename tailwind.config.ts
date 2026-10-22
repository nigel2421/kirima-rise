import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'kirima-red': '#B01F24',
        'kirima-green': '#00491E',
        'kirima-sand': '#FAF7F2',
        'kirima-charcoal': '#1A1A1A',
        'kirima-muted': '#555555',
        'kirima-border': '#E5E7EB',
      },
      fontFamily: {
        serif: ['var(--font-eb-garamond)', 'EB Garamond', 'Georgia', 'serif'],
        sans: ['var(--font-plus-jakarta)', 'Plus Jakarta Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
