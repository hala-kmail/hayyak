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
        'primary-gold': 'rgb(var(--primary-gold) / <alpha-value>)',
        'primary-grey': 'rgb(var(--primary-grey) / <alpha-value>)',
        grey: 'rgb(var(--primary-grey) / <alpha-value>)',
        'lime-green': 'rgb(var(--lime-green) / <alpha-value>)',
        'grey-blue': 'rgb(var(--grey-blue) / <alpha-value>)',
        'navy-blue': 'rgb(var(--navy-blue) / <alpha-value>)',
        'warm-grey': 'rgb(var(--warm-grey) / <alpha-value>)',
        'sand-brown': 'rgb(var(--sand-brown) / <alpha-value>)',
        'sand-brown-light': 'rgb(var(--sand-brown-light) / <alpha-value>)',
        'quite-purple': 'rgb(var(--quite-purple) / <alpha-value>)',
        gold: 'rgb(var(--primary-gold) / <alpha-value>)',
        'gray-bg': 'rgb(var(--gray-bg) / <alpha-value>)',
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
        shimmer: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        'glow-pulse': {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        },
        'trophy-bounce': {
          '0%, 100%': { transform: 'rotate(0deg) scale(1)' },
          '25%': { transform: 'rotate(-8deg) scale(1.1)' },
          '75%': { transform: 'rotate(8deg) scale(1.1)' },
        },
        'slide-in-right': {
          '0%': { opacity: '0', transform: 'translateX(30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'progress-fill': {
          '0%': { width: '0%' },
        },
      },
      animation: {
        'fade-in-up': 'fade-in-up 0.5s ease-out both',
        'pulse-slow': 'pulse-slow 3s ease-in-out infinite',
        float: 'float 4s ease-in-out infinite',
        shimmer: 'shimmer 2.5s ease-in-out infinite',
        'glow-pulse': 'glow-pulse 3s ease-in-out infinite',
        'trophy-bounce': 'trophy-bounce 2s ease-in-out infinite',
        'slide-in-right': 'slide-in-right 0.6s ease-out both',
        'progress-fill': 'progress-fill 1.2s ease-out both',
      },
    },
  },
  plugins: [],
};
