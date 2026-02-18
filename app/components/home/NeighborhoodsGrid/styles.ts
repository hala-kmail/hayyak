/**
 * Style constants for NeighborhoodsGrid component
 * Following Single Responsibility Principle - only contains style definitions
 */

export const gridStyles = {
  section: 'pt-0 pb-20 relative bg-gray-50 w-full',
  sectionMargin: 'mb-[-3px]',
  headerContainer: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12 relative',
  headerBadge: 'text-turquoise font-black tracking-[0.3em] uppercase text-[10px] mb-2 block',
  headerTitle: 'text-2xl md:text-4xl font-black text-navy-blue mb-4',
  headerDivider: 'w-12 h-1 bg-turquoise mx-auto rounded-full mb-6',
  contentContainer: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
  contentWrapper: ' p-6 md:p-10',
  navigationContainer: 'flex flex-col sm:flex-row items-stretch sm:items-center justify-between mb-4 gap-4',
  controlsWrapper: 'flex flex-col sm:flex-row gap-4 flex-1',
  tabsContainer: 'flex gap-2 bg-gray-100 rounded-xl p-1',
  tabButton: (isActive: boolean) =>
    `flex-1 sm:flex-none px-4 py-2 rounded-lg text-sm font-bold transition-all ${
      isActive
        ? 'bg-white text-turquoise shadow-sm'
        : 'text-warm-grey hover:text-navy-blue'
    }`,
  searchContainer: 'relative bg-gray-100 rounded-xl p-1 flex-1 max-w-md',
  searchIcon: 'absolute right-3 top-1/2 -translate-y-1/2 text-warm-grey pointer-events-none',
  searchIconSvg: 'w-4 h-4',
  searchInput: 'w-full pr-10 pl-4 py-2 rounded-lg bg-white text-sm text-right font-bold text-warm-grey placeholder-warm-grey focus:outline-none focus:text-navy-blue transition-all',
  scrollButtonsContainer: 'flex gap-2',
  scrollButton: 'w-10 h-10 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-warm-grey hover:text-turquoise hover:border-turquoise transition-colors',
  scrollIcon: 'w-4 h-4',
  scrollContainer: (isScrollable: boolean) =>
    `overflow-x-auto scrollbar-hide py-4 px-2 ${isScrollable ? 'scroll-smooth' : ''}`,
  emptyState: 'text-center py-12',
  emptyStateTitle: 'text-warm-grey text-lg font-medium',
  emptyStateSubtitle: 'text-warm-grey text-sm mt-2',
  cardsContainer: (isScrollable: boolean) =>
    `flex gap-4 ${isScrollable ? 'flex-nowrap' : 'flex-wrap '}`,
  card: (isLeader: boolean, width: string) =>
    `group relative flex-shrink-0 bg-white rounded-xl p-6 shadow-sm border transition-all duration-300 hover:shadow-md hover:scale-[1.02] cursor-pointer active:scale-[0.98] ${
      isLeader
        ? 'border-turquoise bg-turquoise/5'
        : 'border-gray-100 hover:border-turquoise/30'
    } ${width}`,
  cardHeader: 'flex items-center justify-between mb-4',
  cardLeftSection: 'flex items-center gap-4',
  rankContainer: (isLeader: boolean) =>
    `w-12 h-12 rounded-full flex items-center justify-center border-2 transition-colors flex-shrink-0 ${
      isLeader 
        ? 'border-turquoise bg-turquoise/10' 
        : 'border-gray-200 bg-white'
    }`,
  rankNumber: (isLeader: boolean) =>
    `text-lg font-black ${
      isLeader ? 'text-turquoise' : 'text-navy-blue'
    }`,
  iconContainer: (isLeader: boolean) =>
    `w-12 h-12 rounded-lg flex items-center justify-center transition-colors ${
      isLeader ? 'bg-turquoise/10' : 'bg-gray-50'
    }`,
  icon: (isLeader: boolean, iconColor: string) =>
    `w-6 h-6 ${isLeader ? 'text-turquoise' : iconColor}`,
  cardTextSection: 'text-right',
  cardTitle: (isLeader: boolean) =>
    `text-lg font-black transition-colors mb-1 ${
      isLeader ? 'text-turquoise' : 'text-navy-blue group-hover:text-turquoise'
    }`,
  cardLocation: 'text-xs text-warm-grey',
  votesSection: 'text-left flex-shrink-0',
  votesValue: 'block text-2xl font-black text-navy-blue leading-none',
  votesLabel: 'text-[10px] font-bold text-warm-grey uppercase',
  progressContainer: 'space-y-2 mt-2',
  progressBar: 'h-3 w-full bg-gray-100 rounded-full overflow-hidden',
  progressFill: (isLeader: boolean) =>
    `h-full rounded-full transition-all duration-1000 ease-out ${
      isLeader ? 'bg-turquoise' : 'bg-turquoise'
    }`,
  progressFooter: 'flex justify-between items-center mt-1',
  progressLabel: 'text-xs font-bold text-navy-blue/70',
  progressValue: 'text-base font-black text-turquoise',
} as const;
