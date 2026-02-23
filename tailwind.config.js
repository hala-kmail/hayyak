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
        'primary-gold': 'rgb(var(--primary-gold))',
        'primary-grey': 'rgb(var(--primary-grey))',
        grey: 'rgb(var(--primary-grey))', // الرمادي الأساسي (نفس primary-grey)
        'lime-green': 'rgb(var(--lime-green))',
        'grey-blue': 'rgb(var(--grey-blue))',
        'navy-blue': 'rgb(var(--navy-blue))',
        'warm-grey': 'rgb(var(--warm-grey))',
        'sand-brown': 'rgb(var(--sand-brown))',
        'sand-brown-light': 'rgb(var(--sand-brown-light))', // بني رملي فاتح
        'quite-purple': 'rgb(var(--quite-purple))',
        gold: 'rgb(var(--primary-gold))',
        'gray-bg': 'rgb(var(--gray-bg))',
      },
      fontFamily: {
        sans: ['var(--font-body)'],
        headline: ['var(--font-headline)'],
        subhead: ['var(--font-subhead)'],
        body: ['var(--font-body)'],
        cta: ['var(--font-cta)'],
      },
      fontSize: {
        headline: ['120px', { lineHeight: '1', letterSpacing: '0' }],
        subhead: ['30px', { lineHeight: '1', letterSpacing: '0' }],
        body: ['18px', { lineHeight: '1', letterSpacing: '0' }],
        cta: ['18px', { lineHeight: '1', letterSpacing: '0' }],
      },
      keyframes: {
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'pulse-slow': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      animation: {
        'fade-in-up': 'fade-in-up 0.5s ease-out both',
        'pulse-slow': 'pulse-slow 3s ease-in-out infinite',
        float: 'float 4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
