/**
 * AdminStats styles
 * Following Single Responsibility Principle - only contains style definitions
 */

export const adminStatsStyles = {
  container: 'space-y-4',
  card: 'bg-white rounded-xl shadow-sm p-4',
  cardOverflow: 'bg-white rounded-xl shadow-sm overflow-hidden',
  statsGrid: 'grid grid-cols-1 md:grid-cols-3 gap-4',
  statRow: 'flex items-center gap-3',
  statIcon: (iconBgClass: string) => `${iconBgClass} p-2 rounded-lg`,
  statLabel: 'text-warm-grey text-xs font-medium mb-0.5',
  statValue: 'text-2xl font-bold text-navy-blue tracking-tight',

  top3Section: 'mb-4',
  top3Header: 'flex items-center gap-2',
  top3IconWrapper: 'bg-gold/10 p-1.5 rounded-lg',
  top3Title: 'text-base font-bold text-navy-blue',
  top3Grid: 'grid grid-cols-1 md:grid-cols-3 gap-4',

  top3Card: (border: string) =>
    `relative bg-white rounded-lg p-4 shadow-sm border-r-4 ${border} transform transition-all hover:shadow-md`,
  top3RankWrapper: (rankBg: string, border: string) =>
    `${rankBg} rounded-full w-9 h-9 flex items-center justify-center border-2 ${border}`,
  top3RankText: (rankText: string) => `text-base font-bold ${rankText}`,
  top3TownName: 'text-sm font-bold text-navy-blue mb-1',
  top3VotesRow: 'flex items-center gap-1.5 mt-2 mb-2',
  top3VotesText: (accent: string) => `text-lg font-bold ${accent}`,
  top3VotesLabel: 'text-xs text-warm-grey',
  top3ProgressSection: 'mt-2 pt-2 border-t border-gray-100',
  top3ProgressHeader: 'flex items-center justify-between',
  top3ProgressLabel: 'text-xs text-warm-grey font-medium',
  top3ProgressValue: (accent: string) => `text-sm font-bold ${accent}`,
  top3ProgressBar: 'mt-1.5 h-1.5 bg-gray-100 rounded-full overflow-hidden',
  top3ProgressFill: (progressBar: string) =>
    `h-full rounded-full transition-all duration-1000 ${progressBar}`,

  leadingHeader: 'p-4 border-b border-gray-200',
  leadingIconWrapper: 'bg-yellow-100 p-1.5 rounded-lg',

  tableWrapper: 'overflow-x-auto',
  table: 'w-full',
  tableHead: 'bg-gray-bg border-b border-gray-200',
  tableTh: 'px-4 py-2.5 text-right text-xs font-bold text-navy-blue',
  tableThW16: 'px-4 py-2.5 text-right text-xs font-bold text-navy-blue w-12',
  tableBody: 'divide-y divide-gray-200',
  tableRow: 'hover:bg-gray-bg transition-colors',
  tableCell: 'px-4 py-2.5 text-xs text-warm-grey',
  tableCellSemibold: 'px-4 py-2.5 text-xs font-semibold text-navy-blue',
  tableCellCenter: 'px-4 py-2.5',
  rankBadge: 'flex items-center justify-center w-6 h-6 rounded-full bg-gold/10',
  rankBadgeText: 'text-xs font-bold text-gold',
  votesBadge: 'inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-gold/10 text-gold font-bold text-xs',

  visitorSection: 'bg-white rounded-xl shadow-sm overflow-hidden',
  visitorHeader: 'p-4 border-b border-gray-200 flex flex-wrap items-center justify-between gap-3',
  visitorDaysSelect: 'px-2.5 py-1.5 text-sm rounded-lg border border-gray-200 font-medium text-navy-blue focus:outline-none focus:ring-2 focus:ring-gold/50',
  visitorStatsGrid: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 p-4',
  visitorVotersSection: 'mx-4 mb-4 p-4 rounded-lg bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-100',
  visitorVotersTitle: 'text-xs font-bold text-navy-blue mb-3 flex items-center gap-1.5',
  visitorVotersGrid: 'grid grid-cols-2 gap-3 mb-3',
  visitorVoterCard: (isVoter: boolean) =>
    `p-3 rounded-lg ${isVoter ? 'bg-emerald-50 border border-emerald-200' : 'bg-amber-50 border border-amber-200'}`,
  visitorVoterLabel: 'text-xs font-medium text-warm-grey mb-0.5',
  visitorVoterValue: (isVoter: boolean) =>
    `text-lg font-bold ${isVoter ? 'text-emerald-700' : 'text-amber-700'}`,
  visitorVoterPercent: (isVoter: boolean) =>
    `text-xs font-medium ${isVoter ? 'text-emerald-600' : 'text-amber-600'}`,
  visitorProgressBar: 'h-2 rounded-full overflow-hidden flex',
  visitorProgressVoters: 'bg-emerald-500',
  visitorProgressNonVoters: 'bg-amber-400',
  visitorByDayTable: 'w-full text-xs',
  visitorByDayRow: 'border-b border-gray-100 last:border-0',
  visitorByDayCell: 'px-3 py-2 text-warm-grey',
  visitorByDayCellBold: 'px-3 py-2 font-semibold text-navy-blue',
  visitorTableSection: 'px-4 pb-4',
  visitorTableTitle: 'text-xs font-bold text-navy-blue mb-2',
} as const;
