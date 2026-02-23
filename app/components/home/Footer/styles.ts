/**
 * Style constants for Footer component
 * Following Single Responsibility Principle - only contains style definitions
 */

export const footerStyles = {
  footer:
    'relative overflow-hidden bg-navy-blue py-16 md:py-24 text-white',
  topBorder:
    'absolute top-0 left-0 right-0 h-1 bg-gradient-to-l from-transparent via-gold to-transparent opacity-90',
  accentBlur:
    'ios-reduce-blur absolute bottom-0 left-1/2 -translate-x-1/2 w-[480px] h-48 bg-gold/20 rounded-full blur-[80px] pointer-events-none',
  container: 'relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8',
  contentSection: 'text-center max-w-lg mx-auto mb-14',
  title:
    'font-headline text-2xl md:text-3xl font-bold text-white mb-3 tracking-tight',
  description:
    'font-body text-white/75 text-sm md:text-base leading-relaxed',
  partnersSection: 'mb-14',
  partnersTitle:
    'font-subhead text-xs font-medium text-white/50 uppercase tracking-[0.25em] text-center mb-6',
  partnersList:
    'flex flex-wrap justify-center items-center gap-3',
  partnerLink:
    'inline-flex items-center px-5 py-2.5 rounded-full bg-white/5 text-white/90 text-sm font-medium border border-white/10 hover:bg-gold/25 hover:text-white hover:border-gold/50 hover:shadow-lg hover:shadow-gold/10 transition-all duration-300 no-underline',
  copyrightSection:
    'pt-8 border-t border-white/10 text-center',
  copyright: 'text-white/40 text-xs font-medium',
} as const;
