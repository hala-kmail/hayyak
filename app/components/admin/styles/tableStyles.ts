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
      isSuperAdmin ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
    }`,
  statusBadge: (isActive: boolean) =>
    `px-2 py-0.5 rounded-md text-xs font-bold ${
      isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
    }`,
  statusBadgeVotes: 'px-2 py-0.5 rounded-md text-xs font-bold',
  actions: 'flex items-center justify-center gap-2',
  actionsSmall: 'flex items-center justify-center gap-1.5',
  btnEdit: 'w-8 h-8 flex items-center justify-center rounded-lg bg-gold/10 text-gold hover:bg-gold hover:text-white transition-all',
  btnDelete: 'w-8 h-8 flex items-center justify-center rounded-lg bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-all',
  btnToggle: (isActive: boolean) =>
    `group flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium text-xs transition-all shadow-sm hover:shadow ${
      isActive
        ? 'bg-green-50 text-green-700 hover:bg-green-100 border border-green-200'
        : 'bg-gray-bg text-gray-700 hover:bg-gray-100 border border-gray-200'
    }`,
  btnDeleteAction:
    'group flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium text-xs bg-red-50 text-red-700 hover:bg-red-100 border border-red-200 transition-all shadow-sm hover:shadow',
  iconScale: 'w-3.5 h-3.5 group-hover:scale-110 transition-transform',
  iconHidden: 'hidden sm:inline',
} as const;
