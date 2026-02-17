/**
 * Style constants for IntroSections component
 * Following Single Responsibility Principle - only contains style definitions
 */

export const introStyles = {
  section: 'py-14 md:py-20 bg-white relative overflow-hidden',
  backgroundOverlay: 'absolute inset-0 opacity-30 pointer-events-none',
  backgroundBlur1: 'absolute top-0 right-0 w-96 h-96 bg-turquoise/10 rounded-full blur-3xl',
  backgroundBlur2: 'absolute bottom-0 left-0 w-80 h-80 bg-quite-purple/10 rounded-full blur-3xl',
  container: 'max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10',
  grid: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10',
  card: (isVisible: boolean) =>
    `group relative ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'} transition-all duration-500 ease-out`,
  cardInner: 'h-full flex flex-col items-center text-center p-6 md:p-8 rounded-2xl bg-white/80 backdrop-blur-sm border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all duration-300',
  logoWrapper: 'flex flex-row items-center justify-center gap-3 mb-4 shrink-0',
  logoContainer: 'flex items-center justify-center shrink-0',
  logoLink: 'inline-block hover:opacity-90 hover:scale-105 transition-all duration-300',
  logoImage: 'object-contain w-32 md:w-36 rounded-xl',
  logoImageNext: 'object-contain w-32 md:w-36 rounded-xl',
  title: (textColor: string) => `text-xl md:text-2xl font-black ${textColor}`,
  accentLine: (accentColor: string) => `w-12 h-1 rounded-full ${accentColor} mb-4 opacity-80 shrink-0`,
  description: 'text-warm-grey text-sm leading-relaxed max-w-sm flex-1 min-h-0',
} as const;
