/**
 * Style constants for NeighborhoodCard component
 * Following Single Responsibility Principle - only contains style definitions
 */

export const cardStyles = {
  card: (hasOnClick: boolean, isLeader: boolean) =>
    `group relative rounded-3xl p-6 transition-all duration-500 flex flex-col h-full text-right w-full ${
      hasOnClick ? 'cursor-pointer active:scale-[0.98]' : ''
    } ${
      isLeader
        ? 'bg-quite-purple/10 border-2 border-quite-purple shadow-xl ring-2 ring-quite-purple/30'
        : 'bg-white border border-gray-100 shadow-lg shadow-gray-200/40 hover:-translate-y-2 hover:shadow-xl hover:shadow-gold/10 hover:border-gold/20'
    }`,
  votesContainer: 'flex justify-end items-start mb-6',
  votesWrapper: 'text-left',
  votesValue: 'block text-2xl font-black text-navy-blue leading-none',
  votesLabel: 'text-[9px] font-bold text-warm-grey uppercase tracking-widest',
  contentContainer: 'mb-6',
  title: (isLeader: boolean) =>
    `font-headline text-xl font-bold mb-1 transition-colors ${
      isLeader ? 'text-quite-purple' : 'text-navy-blue group-hover:text-gold'
    }`,
  location: 'text-xs text-warm-grey font-medium flex items-center gap-1.5',
  locationDot: 'w-1.5 h-1.5 rounded-full bg-sand-brown/60',
  footer: 'mt-auto',
  progressContainer: 'mb-4',
  progressHeader: 'flex justify-between items-end mb-2',
  progressLabel: 'text-[10px] font-bold text-navy-blue/40',
  progressValue: (isLeader: boolean) =>
    `text-sm font-black ${isLeader ? 'text-quite-purple' : 'text-gold'}`,
  progressBar: 'h-2 w-full bg-gray-100 rounded-full overflow-hidden border border-gray-50',
  progressFill: (isLeader: boolean) =>
    `h-full rounded-full transition-all duration-1000 ease-out ${isLeader ? 'bg-quite-purple' : 'bg-gold'}`,
  ctaButton: (isLeader: boolean) =>
    `inline-flex items-center gap-2 text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity ${isLeader ? 'text-quite-purple' : 'text-gold'}`,
  ctaIcon: 'w-3 h-3',
  wrapperButton: 'w-full text-right',
} as const;
