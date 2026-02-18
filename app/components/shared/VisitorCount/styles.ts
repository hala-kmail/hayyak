/**
 * Style constants for VisitorCount component
 * Following Single Responsibility Principle - only contains style definitions
 */

export const visitorCountStyles = {
  container: 'flex items-center',
  card: (scrolled: boolean) =>
    `flex items-center gap-3 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl border shadow-sm backdrop-blur-sm transition-all duration-300 ${
      scrolled
        ? 'bg-white/95 border-gray-200'
        : 'bg-white/10 border-white/20'
    }`,
  iconContainer: 'flex-shrink-0',
  icon: (scrolled: boolean) =>
    `w-4 h-4 sm:w-5 sm:h-5 transition-colors duration-300 ${
      scrolled ? 'text-turquoise' : 'text-white'
    }`,
  content: 'flex items-center gap-2 sm:gap-3',
  stat: 'flex flex-col gap-0.5',
  label: (scrolled: boolean) =>
    `text-[10px] sm:text-xs font-medium transition-colors duration-300 ${
      scrolled ? 'text-gray-600' : 'text-white/80'
    }`,
  value: (scrolled: boolean) =>
    `text-xs sm:text-sm font-bold transition-colors duration-300 ${
      scrolled ? 'text-navy-blue' : 'text-white'
    }`,
  loading: (scrolled: boolean) => 'flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2',
  loadingDot: (scrolled: boolean) =>
    `w-2 h-2 rounded-full animate-pulse transition-colors duration-300 ${
      scrolled ? 'bg-turquoise' : 'bg-white/60'
    }`,
} as const;
