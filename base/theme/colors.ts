/**
 * Theme color keys for use with useCSSVar.
 * Actual values are defined in styles/globals.css.
 */
export const themeColorKeys = [
  '--color-primary-50',
  '--color-primary-100',
  '--color-primary-200',
  '--color-primary-300',
  '--color-primary-400',
  '--color-primary-500',
  '--color-primary-600',
  '--color-primary-700',
  '--color-primary-800',
  '--color-primary-900',
  '--color-gray-50',
  '--color-gray-100',
  '--color-gray-200',
  '--color-gray-300',
  '--color-gray-400',
  '--color-gray-500',
  '--color-gray-600',
  '--color-gray-700',
  '--color-gray-800',
  '--color-gray-900',
  '--color-success-600',
  '--color-warning-500',
  '--color-warning-600',
  '--color-danger-600',
  '--color-background',
  '--color-surface',
  '--color-border',
  '--color-text',
  '--color-text-muted',
  '--color-white',
  '--color-black',
] as const;

export type ThemeColorKey = (typeof themeColorKeys)[number];
