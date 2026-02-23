/**
 * Admin table styles shared between AdminsTable and TownsTable
 * Following Single Responsibility Principle - only contains style definitions
 */

export const tableStyles = {
  container: 'bg-white rounded-xl shadow-sm overflow-hidden',
  wrapper: 'overflow-x-auto',
  table: 'w-full',
  head: 'bg-gray-bg border-b border-gray-200',
  th: 'px-4 py-2.5 text-right text-xs font-bold text-navy-blue',
  thCenter: 'px-4 py-2.5 text-center text-xs font-bold text-navy-blue',
  thW16: 'px-4 py-2.5 text-right text-xs font-bold text-navy-blue w-12',
  thMin150: 'px-4 py-2.5 text-center text-xs font-bold text-navy-blue min-w-[120px]',
  thMin100: 'px-4 py-2.5 text-center text-xs font-bold text-navy-blue min-w-[80px]',
  thMin140: 'px-4 py-2.5 text-center text-xs font-bold text-navy-blue min-w-[110px]',
  body: 'divide-y divide-gray-200',
  row: 'hover:bg-gray-bg transition-colors',
  cell: 'px-4 py-2.5 text-xs text-warm-grey',
  cellSemibold: 'px-4 py-2.5 text-xs font-semibold text-navy-blue',
  cellCenter: 'px-4 py-2.5',
  rankBadge: 'flex items-center justify-center w-6 h-6 rounded-full bg-gold/10',
  rankBadgeText: 'text-xs font-bold text-gold',
  roleBadge: (isSuperAdmin: boolean) =>
    `px-2 py-0.5 rounded-md text-xs font-bold ${
      isSuperAdmin ? 'bg-quite-purple/10 text-navy-blue' : 'bg-grey-blue/10 text-navy-blue'
    }`,
  statusBadge: (isActive: boolean) =>
    `px-2 py-0.5 rounded-md text-xs font-bold ${
      isActive ? 'bg-lime-green/10 text-navy-blue' : 'bg-navy-blue/10 text-navy-blue'
    }`,
  statusBadgeVotes: 'px-2 py-0.5 rounded-md text-xs font-bold',
  actions: 'flex items-center justify-center gap-2',
  actionsSmall: 'flex items-center justify-center gap-1.5',
  btnEdit: 'w-8 h-8 flex items-center justify-center rounded-lg bg-gold/10 text-gold hover:bg-gold hover:text-white transition-all',
  btnDelete: 'w-8 h-8 flex items-center justify-center rounded-lg bg-navy-blue/10 text-navy-blue hover:bg-navy-blue hover:text-white transition-all',
  btnToggle: (isActive: boolean) =>
    `group flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium text-xs transition-all shadow-sm hover:shadow ${
      isActive
        ? 'bg-lime-green/10 text-navy-blue hover:bg-lime-green/20 border border-lime-green/30'
        : 'bg-gray-bg text-navy-blue hover:bg-navy-blue/10 border border-gray-200'
    }`,
  btnDeleteAction:
    'group flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium text-xs bg-navy-blue/10 text-navy-blue hover:bg-navy-blue/20 border border-gray-200 transition-all shadow-sm hover:shadow',
  iconScale: 'w-3.5 h-3.5 group-hover:scale-110 transition-transform',
  iconHidden: 'hidden sm:inline',
} as const;
