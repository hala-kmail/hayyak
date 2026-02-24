/**
 * Style constants for NeighborhoodsGrid component
 * Following Single Responsibility Principle - only contains style definitions
 */

export const gridStyles = {
  section: 'pt-0 pb-20 relative bg-gray-bg w-full',
  sectionMargin: 'mb-[-3px]',
  headerContainer: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12 relative',
  headerBadge: 'text-gold font-black tracking-[0.3em] uppercase text-[10px] mb-2 block',
  headerTitle: 'font-headline text-subhead md:text-3xl font-bold text-navy-blue mb-4',
  headerDivider: 'w-12 h-1 bg-gold mx-auto rounded-full mb-6',
  contentContainer: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
  contentWrapper: ' p-0 md:p-10',
  navigationContainer: 'flex flex-col sm:flex-row items-stretch sm:items-center justify-between mb-4 gap-4',
  controlsWrapper: 'flex flex-col sm:flex-row gap-4 flex-1',
  tabsContainer: 'flex gap-2 bg-gray-100 rounded-xl p-1',
  tabButton: (isActive: boolean) =>
    `flex-1 sm:flex-none px-4 py-2 rounded-lg text-sm font-bold transition-all ${
      isActive
        ? 'bg-white text-gold shadow-sm'
        : 'text-warm-grey hover:text-navy-blue'
    }`,
  searchContainer: 'relative bg-gray-100 rounded-xl p-1 flex-1 ',
  searchIcon: 'absolute right-3 top-1/2 -translate-y-1/2 text-warm-grey pointer-events-none',
  searchIconSvg: 'w-4 h-4',
  searchInput: 'w-full pr-10 pl-4 py-2 rounded-lg bg-white text-sm text-right font-bold text-warm-grey placeholder-warm-grey focus:outline-none focus:text-navy-blue transition-all',
  scrollButtonsContainer: 'flex gap-2',
  scrollButton: 'w-10 h-10 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-warm-grey hover:text-gold hover:border-gold transition-colors',
  scrollIcon: 'w-4 h-4',
  scrollContainer: (isScrollable: boolean) =>
    `overflow-x-auto scrollbar-hide py-4 px-2 ${isScrollable ? 'scroll-smooth' : ''}`,
  emptyState: 'text-center py-12',
  emptyStateTitle: 'text-warm-grey text-lg font-medium',
  emptyStateSubtitle: 'text-warm-grey text-sm mt-2',
  cardsContainer: (isScrollable: boolean) =>
    `flex gap-4 ${isScrollable ? 'flex-nowrap' : 'flex-wrap '}`,
  card: (isLeader: boolean, width: string) =>
    `group relative flex-shrink-0 rounded-xl p-6 shadow-sm border-r-4 transition-all duration-300 hover:shadow-md hover:scale-[1.02] cursor-pointer active:scale-[0.98] ${
      isLeader
        ? 'border-navy-blue bg-white shadow-lg ring-2 ring-navy-blue/30'
        : 'bg-white border-gray-100 hover:border-gold/30'
    } ${width}`,
  cardHeader: 'flex items-center justify-between mb-2',
  cardLeftSection: 'flex items-center gap-4',
  rankContainer: (isLeader: boolean) =>
    `w-12 h-12 rounded-full flex items-center justify-center border-2 transition-colors flex-shrink-0 ${
      isLeader
        ? 'border-navy-blue bg-quite-purple/15'
        : 'border-gray-200 bg-white'
    }`,
  rankNumber: (isLeader: boolean) =>
    `text-lg font-black ${
      isLeader ? 'text-navy-blue' : 'text-navy-blue'
    }`,
  iconContainer: (isLeader: boolean) =>
    `w-12 h-12 rounded-lg flex items-center justify-center transition-colors ${
      isLeader ? 'bg-quite-purple/15' : 'bg-gray-bg'
    }`,
  icon: (isLeader: boolean, iconColor: string) =>
    `w-6 h-6 ${isLeader ? 'text-quite-purple' : iconColor}`,
  cardTextSection: 'text-right',
  cardTitle: (isLeader: boolean) =>
    `text-lg font-black transition-colors ${
      isLeader ? 'text-navy-blue' : 'text-navy-blue group-hover:text-gold'
    }`,
  votesSection: 'text-left flex-shrink-0',
  votesValue: 'block text-2xl font-black text-navy-blue leading-none',
  votesLabel: 'text-[10px] font-bold text-warm-grey uppercase',
  ctaContainer: (isLeader: boolean) =>
    `flex items-center justify-center gap-2 mt-3 py-2.5 rounded-lg transition-all duration-300 ${
      isLeader
        ? 'bg-navy-blue/10 text-navy-blue group-hover:bg-navy-blue group-hover:text-white'
        : 'bg-gold/10 text-gold group-hover:bg-gold group-hover:text-white'
    }`,
  ctaText: 'text-sm font-black',
  ctaIcon: 'w-3 h-3',
} as const;
