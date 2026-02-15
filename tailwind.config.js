/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './base/**/*.{js,ts,jsx,tsx,mdx}',
    './providers/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary-turquoise': 'rgb(var(--primary-turquoise))',
        'primary-grey': 'rgb(var(--primary-grey))',
        'lime-green': 'rgb(var(--lime-green))',
        'grey-blue': 'rgb(var(--grey-blue))',
        'navy-blue': 'rgb(var(--navy-blue))',
        'warm-grey': 'rgb(var(--warm-grey))',
        'sand-brown': 'rgb(var(--sand-brown))',
        'sand-brown-light': 'rgb(var(--sand-brown-light))', // بني رملي فاتح
        'quite-purple': 'rgb(var(--quite-purple))',
      },
      fontFamily: {
        sans: ['var(--font-cairo)', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-in-up': 'fade-in-up 0.5s ease-out both',
      },
    },
  },
  plugins: [],
};
