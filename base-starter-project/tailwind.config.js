/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './base/**/*.{js,jsx,ts,tsx}',
    './providers/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: {
          50: 'rgb(var(--color-primary-50))',
          100: 'rgb(var(--color-primary-100))',
          200: 'rgb(var(--color-primary-200))',
          300: 'rgb(var(--color-primary-300))',
          400: 'rgb(var(--color-primary-400))',
          500: 'rgb(var(--color-primary-500))',
          600: 'rgb(var(--color-primary-600))',
          700: 'rgb(var(--color-primary-700))',
          800: 'rgb(var(--color-primary-800))',
          900: 'rgb(var(--color-primary-900))',
        },
        success: {
          100: 'rgb(var(--color-success-100))',
          600: 'rgb(var(--color-success-600))',
          800: 'rgb(var(--color-success-800))',
        },
        warning: {
          100: 'rgb(var(--color-warning-100))',
          600: 'rgb(var(--color-warning-600))',
          800: 'rgb(var(--color-warning-800))',
        },
        danger: {
          100: 'rgb(var(--color-danger-100))',
          600: 'rgb(var(--color-danger-600))',
          800: 'rgb(var(--color-danger-800))',
        },
      },
    },
  },
  plugins: [],
};

