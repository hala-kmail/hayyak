/**
 * Style constants for PrizeSection component
 * Following Single Responsibility Principle - only contains style definitions
 */

export const prizeStyles = {
  section: 'py-14 md:py-20 bg-white relative overflow-hidden scroll-mt-20',
  backgroundOverlay: 'absolute inset-0 opacity-30 pointer-events-none',
  backgroundBlur1: 'absolute top-0 left-0 w-96 h-96 bg-gold/10 rounded-full blur-3xl',
  backgroundBlur2: 'absolute bottom-0 right-0 w-80 h-80 bg-quite-purple/10 rounded-full blur-3xl',
  container: 'max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10',
  contentWrapper:
    'bg-white/80 backdrop-blur-sm rounded-2xl  p-6 md:p-10 relative z-20',
  title: 'font-headline text-subhead md:text-2xl font-bold text-navy-blue text-center mb-2',
  accentLine: 'w-16 h-1 rounded-full bg-gold mx-auto mb-6 opacity-80',
  description:
    'text-warm-grey text-base md:text-lg leading-relaxed text-center max-w-2xl mx-auto mb-8',
  carouselWrapper: 'relative max-w-2xl mx-auto',
  fanosSide: 'absolute z-10 w-14 h-20 md:w-20 md:h-28 object-contain pointer-events-none opacity-95',
  fanosLeft: 'left-0',
  fanosRight: 'right-0 scale-x-[-1]',
  carouselTrack: 'w-full overflow-hidden rounded-xl relative',
  slidesContainer: 'flex flex-row transition-transform duration-500 ease-out',
  slide: 'shrink-0', // width set inline as percentage
  imageWrapper: (isVisible: boolean) =>
    `rounded-xl overflow-hidden border border-gray-200 shadow-md transition-all duration-500 ${
      isVisible ? 'opacity-100' : 'opacity-0'
    }`,
  image: 'w-full h-56 md:h-72 object-cover',
  navButton:
    'absolute top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-white/95 hover:bg-white border border-gray-200 shadow-lg flex items-center justify-center text-navy-blue hover:text-gold transition-colors disabled:opacity-40 disabled:pointer-events-none',
  navButtonPrev: 'left-2 sm:left-4 md:-left-14',
  navButtonNext: 'right-2 sm:right-4 md:-right-14',
  dots: 'flex justify-center gap-2 mt-4',
  dot: (active: boolean) =>
    `w-2.5 h-2.5 rounded-full transition-colors cursor-pointer ${
      active ? 'bg-gold scale-110' : 'bg-gray-300 hover:bg-gray-400'
    }`,
} as const;
