/**
 * AdminStats styles
 * Following Single Responsibility Principle - only contains style definitions
 */

export const adminStatsStyles = {
  container: 'space-y-6',
  card: 'bg-white rounded-2xl shadow-md p-6',
  cardOverflow: 'bg-white rounded-2xl shadow-md overflow-hidden',
  statsGrid: 'grid grid-cols-1 md:grid-cols-3 gap-6',
  statRow: 'flex items-center gap-4',
  statIcon: (iconBgClass: string) => `${iconBgClass} p-3 rounded-xl`,
  statLabel: 'text-warm-grey text-sm font-semibold mb-1',
  statValue: 'text-4xl font-bold text-navy-blue tracking-tight',

  top3Section: 'mb-6',
  top3Header: 'flex items-center gap-3',
  top3IconWrapper: 'bg-turquoise/10 p-2 rounded-lg',
  top3Title: 'text-xl font-bold text-navy-blue',
  top3Grid: 'grid grid-cols-1 md:grid-cols-3 gap-6',

  top3Card: (border: string) =>
    `relative bg-white rounded-xl p-6 shadow-lg border-r-4 ${border} transform transition-all hover:scale-105`,
  top3RankWrapper: (rankBg: string, border: string) =>
    `${rankBg} rounded-full w-12 h-12 flex items-center justify-center border-2 ${border}`,
  top3RankText: (rankText: string) => `text-xl font-bold ${rankText}`,
  top3TownName: 'text-lg font-bold text-navy-blue mb-2',
  top3VotesRow: 'flex items-center gap-2 mt-4 mb-3',
  top3VotesText: (accent: string) => `text-2xl font-bold ${accent}`,
  top3VotesLabel: 'text-sm text-warm-grey',
  top3ProgressSection: 'mt-3 pt-3 border-t border-gray-100',
  top3ProgressHeader: 'flex items-center justify-between',
  top3ProgressLabel: 'text-xs text-warm-grey font-semibold',
  top3ProgressValue: (accent: string) => `text-lg font-bold ${accent}`,
  top3ProgressBar: 'mt-2 h-2 bg-gray-100 rounded-full overflow-hidden',
  top3ProgressFill: (progressBar: string) =>
    `h-full rounded-full transition-all duration-1000 ${progressBar}`,

  leadingHeader: 'p-6 border-b border-gray-200',
  leadingIconWrapper: 'bg-yellow-100 p-2 rounded-lg',

  tableWrapper: 'overflow-x-auto',
  table: 'w-full',
  tableHead: 'bg-gray-50 border-b border-gray-200',
  tableTh: 'px-6 py-4 text-right text-sm font-bold text-navy-blue',
  tableThW16: 'px-6 py-4 text-right text-sm font-bold text-navy-blue w-16',
  tableBody: 'divide-y divide-gray-200',
  tableRow: 'hover:bg-gray-50 transition-colors',
  tableCell: 'px-6 py-4 text-sm text-warm-grey',
  tableCellSemibold: 'px-6 py-4 text-sm font-semibold text-navy-blue',
  tableCellCenter: 'px-6 py-4',
  rankBadge: 'flex items-center justify-center w-8 h-8 rounded-full bg-turquoise/10',
  rankBadgeText: 'text-sm font-bold text-turquoise',
  votesBadge: 'inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-turquoise/10 text-turquoise font-bold text-sm',
} as const;
