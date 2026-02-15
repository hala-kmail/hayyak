/**
 * Theme Color Configuration
 * 
 * Centralized color definitions for light and dark themes.
 * Uses RGB values for compatibility with NativeWind.
 */

export const lightThemeColors = {
  // Primary Colors
  '--color-primary-50': '240 249 255',
  '--color-primary-100': '224 242 254',
  '--color-primary-200': '186 230 253',
  '--color-primary-300': '125 211 252',
  '--color-primary-400': '56 189 248',
  '--color-primary-500': '14 165 233',
  '--color-primary-600': '2 132 199',
  '--color-primary-700': '3 105 161',
  '--color-primary-800': '7 89 133',
  '--color-primary-900': '12 74 110',

  // Gray Colors
  '--color-gray-50': '249 250 251',
  '--color-gray-100': '245 245 245',
  '--color-gray-200': '229 231 235',
  '--color-gray-300': '209 213 219',
  '--color-gray-400': '156 163 175',
  '--color-gray-500': '107 114 128',
  '--color-gray-600': '75 85 99',
  '--color-gray-700': '55 65 81',
  '--color-gray-800': '31 41 55',
  '--color-gray-900': '17 24 39',

  // Success Colors
  '--color-success-50': '240 253 244',
  '--color-success-100': '220 252 231',
  '--color-success-200': '187 247 208',
  '--color-success-400': '74 222 128',
  '--color-success-600': '22 163 74',
  '--color-success-800': '22 101 52',
  '--color-success-900': '20 83 45',

  // Warning Colors
  '--color-warning-100': '254 233 199',
  '--color-warning-600': '252 229 159',
  '--color-warning-800': '146 64 14',
  '--color-warning-900': '120 53 15',

  // Danger Colors
  '--color-danger-100': '254 226 226',
  '--color-danger-600': '220 38 38',
  '--color-danger-800': '153 27 27',
  '--color-danger-900': '127 29 29',

  // Semantic Colors
  '--color-background': '249 250 251',
  '--color-surface': '255 255 255',
  '--color-border': '229 231 235',
  '--color-text': '17 24 39',
  '--color-text-muted': '107 114 128',
  '--color-white': '255 255 255',
  '--color-black': '0 0 0',

  // Shadows
  '--shadow-sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  '--shadow-md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  '--shadow-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  '--shadow-xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',

  // Glass Effect
  '--glass-background': 'rgba(255, 255, 255, 0.1)',
  '--glass-border': '1px solid rgba(255, 255, 255, 0.2)',

  // Star color
  '--color-star-color': '251 188 4',
};

export const darkThemeColors = {
  // Primary Colors (slightly adjusted for dark mode)
  '--color-primary-50': '8 47 73',
  '--color-primary-100': '12 74 110',
  '--color-primary-200': '7 89 133',
  '--color-primary-300': '3 105 161',
  '--color-primary-400': '2 132 199',
  '--color-primary-500': '14 165 233',
  '--color-primary-600': '56 189 248',
  '--color-primary-700': '125 211 252',
  '--color-primary-800': '186 230 253',
  '--color-primary-900': '224 242 254',

  // Gray Colors (inverted)
  '--color-gray-50': '3 7 18',
  '--color-gray-100': '10 14 23',
  '--color-gray-200': '31 41 55',
  '--color-gray-300': '55 65 81',
  '--color-gray-400': '75 85 99',
  '--color-gray-500': '107 114 128',
  '--color-gray-600': '156 163 175',
  '--color-gray-700': '209 213 219',
  '--color-gray-800': '229 231 235',
  '--color-gray-900': '243 244 246',

  // Success Colors (adjusted for dark mode)
  '--color-success-50': '20 83 45',
  '--color-success-100': '46 140 82',
  '--color-success-200': '21 128 61',
  '--color-success-400': '34 197 94',
  '--color-success-600': '74 222 128',
  '--color-success-800': '134 239 172',
  '--color-success-900': '187 247 208',

  // Warning Colors (adjusted for dark mode)
  '--color-warning-100': '196 137 3',
  '--color-warning-600': '252 229 159',
  '--color-warning-800': '251 191 36',
  '--color-warning-900': '253 230 138',

  // Danger Colors (adjusted for dark mode)
  '--color-danger-100': '171 72 72',
  '--color-danger-600': '239 68 68',
  '--color-danger-800': '248 113 113',
  '--color-danger-900': '252 165 165',

  // Semantic Colors
  '--color-background': '17 24 39',
  '--color-surface': '31 41 55',
  '--color-border': '55 65 81',
  '--color-text': '249 250 251',
  '--color-text-muted': '156 163 175',
  '--color-white': '255 255 255',
  '--color-black': '0 0 0',

  // Shadows (darker for dark mode)
  '--shadow-sm': '0 1px 2px 0 rgba(0, 0, 0, 0.3)',
  '--shadow-md': '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)',
  '--shadow-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.2)',
  '--shadow-xl': '0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2)',

  // Glass Effect (darker for dark mode)
  '--glass-background': 'rgba(0, 0, 0, 0.1)',
  '--glass-border': '1px solid rgba(255, 255, 255, 0.1)',

  // Star color
  '--color-star-color': '251 188 4',
};

export type ThemeColors = typeof lightThemeColors;

