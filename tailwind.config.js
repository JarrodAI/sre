/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'background': '#bddbe8',
        'foreground': '#444444',
        'header-bg': '#2c8769',
        'header-text': '#444444',
        'accent': '#2c8769',
      },
      fontFamily: {
        barlow: ['var(--font-barlow)'],
      },
      textColor: {
        'header-text': '#444444',
      },
    },
  },
  plugins: [],
}
