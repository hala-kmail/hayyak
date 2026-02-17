/**
 * Style constants for NeighborhoodCard component
 * Following Single Responsibility Principle - only contains style definitions
 */

export const cardStyles = {
  card: (hasOnClick: boolean, isLeader: boolean) =>
    `group relative bg-white rounded-3xl p-6 shadow-lg shadow-gray-200/40 border border-gray-100 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-turquoise/10 hover:border-turquoise/20 flex flex-col h-full text-right w-full ${
      hasOnClick ? 'cursor-pointer active:scale-[0.98]' : ''
    } ${isLeader ? 'ring-2 ring-turquoise/30' : ''}`,
  votesContainer: 'flex justify-end items-start mb-6',
  votesWrapper: 'text-left',
  votesValue: 'block text-2xl font-black text-navy-blue leading-none',
  votesLabel: 'text-[9px] font-bold text-warm-grey uppercase tracking-widest',
  contentContainer: 'mb-6',
  title: 'text-xl font-black text-navy-blue mb-1 group-hover:text-turquoise transition-colors',
  location: 'text-xs text-warm-grey font-medium flex items-center gap-1.5',
  locationDot: 'w-1.5 h-1.5 rounded-full bg-sand-brown/60',
  footer: 'mt-auto',
  progressContainer: 'mb-4',
  progressHeader: 'flex justify-between items-end mb-2',
  progressLabel: 'text-[10px] font-bold text-navy-blue/40',
  progressValue: 'text-sm font-black text-turquoise',
  progressBar: 'h-2 w-full bg-gray-100 rounded-full overflow-hidden border border-gray-50',
  progressFill: 'h-full bg-turquoise rounded-full transition-all duration-1000 ease-out',
  ctaButton: 'inline-flex items-center gap-2 text-xs font-bold text-turquoise opacity-0 group-hover:opacity-100 transition-opacity',
  ctaIcon: 'w-3 h-3',
  wrapperButton: 'w-full text-right',
} as const;
