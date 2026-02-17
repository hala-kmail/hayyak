/**
 * Style constants for HowItWorks component
 * Following Single Responsibility Principle - only contains style definitions
 */

export const howItWorksStyles = {
  section: 'pt-4 pb-8 md:pt-6 md:pb-10 relative z-30',
  container: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative',
  contentWrapper: 'bg-white/80 backdrop-blur-sm relative z-40',
  stepsContainer: 'flex flex-col md:flex-row gap-6 md:gap-8 items-center justify-center',
  stepCard: (isVisible: boolean) =>
    `flex flex-col items-center gap-3 md:gap-4 group flex-1 md:flex-initial transition-all duration-700 ease-out ${
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
    }`,
  iconWrapper: 'relative shrink-0',
  iconContainer: (color: string, isVisible: boolean) =>
    `${color} w-11 h-11 md:w-12 md:h-12 rounded-xl flex items-center justify-center text-white shadow-md transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg ${
      isVisible ? 'animate-pulse-slow' : ''
    }`,
  stepNumber: (isVisible: boolean) =>
    `absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-turquoise text-white flex items-center justify-center font-black text-[10px] shadow-md border-2 border-white transition-all duration-500 ${
      isVisible ? 'scale-100 rotate-0' : 'scale-0 rotate-180'
    }`,
  textWrapper: 'min-w-0 text-center md:text-center',
  stepTitle: 'text-sm md:text-base font-bold text-navy-blue mb-0.5 group-hover:text-turquoise transition-colors',
  stepDescription: 'text-warm-grey text-[11px] md:text-xs leading-snug',
  divider: (isVisible: boolean) =>
    `hidden md:block w-px h-12 bg-gradient-to-b from-transparent via-gray-300 to-transparent transition-all duration-700 ${
      isVisible ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0'
    }`,
} as const;
