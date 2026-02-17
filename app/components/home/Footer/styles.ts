/**
 * Style constants for Footer component
 * Following Single Responsibility Principle - only contains style definitions
 */

export const footerStyles = {
  footer: 'bg-navy-blue text-white py-12 md:py-16 relative overflow-hidden',
  waveContainer: 'absolute left-0 w-full z-10 pointer-events-none',
  waveSvg: 'w-full h-full',
  backgroundEffects: 'absolute top-0 left-0 w-full h-full opacity-5',
  backgroundBlur1: 'absolute top-10 right-10 w-64 h-64 bg-turquoise rounded-full blur-3xl',
  backgroundBlur2: 'absolute bottom-10 left-10 w-48 h-48 bg-lime-green rounded-full blur-3xl',
  container: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-16',
  contentSection: 'text-center mb-8',
  title: 'text-3xl md:text-4xl font-black mb-3 text-white',
  divider: 'w-16 h-1 bg-turquoise mx-auto rounded-full mb-6',
  description: 'text-gray-300 text-base md:text-lg max-w-2xl mx-auto leading-relaxed',
  copyrightSection: 'pt-8 border-t border-white/10 text-center',
  copyright: 'text-gray-400 text-sm font-medium',
} as const;
