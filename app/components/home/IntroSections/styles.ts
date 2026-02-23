/**
 * Style constants for IntroSections component
 * Following Single Responsibility Principle - only contains style definitions
 */

export const introStyles = {
  section: 'py-14 md:py-20 bg-white relative overflow-hidden',
  backgroundOverlay: 'absolute inset-0 opacity-30 pointer-events-none',
  backgroundBlur1: 'absolute top-0 right-0 w-96 h-96 bg-gold/10 rounded-full blur-3xl',
  backgroundBlur2: 'absolute bottom-0 left-0 w-80 h-80 bg-quite-purple/10 rounded-full blur-3xl',
  container: 'max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10',
  headerWrapper: 'text-center mb-10 md:mb-12',
  headerTitle: 'font-headline text-subhead md:text-2xl font-bold text-navy-blue mb-2',
  headerAccentLine: 'w-16 h-1 rounded-full bg-gold mx-auto mb-4 opacity-80',
  headerDescription: 'text-warm-grey text-base md:text-lg leading-relaxed max-w-2xl mx-auto',
  grid: 'flex flex-col lg:flex-row gap-8 md:gap-8 items-center justify-center',
  card: (isVisible: boolean) =>
    `group relative flex-1 md:flex-initial ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'} transition-all duration-500 ease-out`,
  cardInner: 'h-full flex flex-col items-center text-center p-6 md:p-8 bg-white/80 backdrop-blur-sm transition-all duration-300',
  divider: (isVisible: boolean) =>
    `hidden md:block w-px h-12 bg-gradient-to-b from-transparent via-gray-300 to-transparent transition-all duration-700 ${
      isVisible ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0'
    }`,
  logoWrapper: 'flex flex-row items-center justify-center gap-3 mb-4 shrink-0',
  logoContainer: 'flex items-center justify-center shrink-0',
  logoLink: 'inline-block hover:opacity-90 hover:scale-105 transition-all duration-300',
  logoImage: 'object-contain w-32 md:w-36 rounded-xl',
  logoImageNext: 'object-contain w-32 md:w-36 rounded-xl',
  title: (textColor: string) => `text-xl md:text-2xl font-black ${textColor}`,
  accentLine: (accentColor: string) => `w-12 h-1 rounded-full ${accentColor} mb-4 opacity-80 shrink-0`,
  description: 'text-warm-grey text-sm leading-relaxed max-w-sm flex-1 min-h-0',
} as const;
