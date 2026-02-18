/**
 * Admin table styles shared between AdminsTable and TownsTable
 * Following Single Responsibility Principle - only contains style definitions
 */

export const tableStyles = {
  container: 'bg-white rounded-2xl shadow-md overflow-hidden',
  wrapper: 'overflow-x-auto',
  table: 'w-full',
  head: 'bg-gray-50 border-b border-gray-200',
  th: 'px-6 py-4 text-right text-sm font-bold text-navy-blue',
  thCenter: 'px-6 py-4 text-center text-sm font-bold text-navy-blue',
  thW16: 'px-6 py-4 text-right text-sm font-bold text-navy-blue w-16',
  thMin150: 'px-6 py-4 text-center text-sm font-bold text-navy-blue min-w-[150px]',
  thMin100: 'px-6 py-4 text-center text-sm font-bold text-navy-blue min-w-[100px]',
  thMin140: 'px-6 py-4 text-center text-sm font-bold text-navy-blue min-w-[140px]',
  body: 'divide-y divide-gray-200',
  row: 'hover:bg-gray-50 transition-colors',
  cell: 'px-6 py-4 text-sm text-warm-grey',
  cellSemibold: 'px-6 py-4 text-sm font-semibold text-navy-blue',
  cellCenter: 'px-6 py-4',
  rankBadge: 'flex items-center justify-center w-8 h-8 rounded-full bg-turquoise/10',
  rankBadgeText: 'text-sm font-bold text-turquoise',
  roleBadge: (isSuperAdmin: boolean) =>
    `px-3 py-1 rounded-lg text-xs font-bold ${
      isSuperAdmin ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
    }`,
  statusBadge: (isActive: boolean) =>
    `px-3 py-1 rounded-lg text-xs font-bold ${
      isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
    }`,
  statusBadgeVotes: 'px-3 py-1 rounded-lg text-xs font-bold',
  actions: 'flex items-center justify-center gap-3',
  actionsSmall: 'flex items-center justify-center gap-2',
  btnEdit: 'w-10 h-10 flex items-center justify-center rounded-xl bg-turquoise/10 text-turquoise hover:bg-turquoise hover:text-white transition-all',
  btnDelete: 'w-10 h-10 flex items-center justify-center rounded-xl bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-all',
  btnToggle: (isActive: boolean) =>
    `group flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-sm transition-all shadow-sm hover:shadow-md ${
      isActive
        ? 'bg-green-50 text-green-700 hover:bg-green-100 border-2 border-green-200'
        : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border-2 border-gray-200'
    }`,
  btnDeleteAction:
    'group flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-sm bg-red-50 text-red-700 hover:bg-red-100 border-2 border-red-200 transition-all shadow-sm hover:shadow-md',
  iconScale: 'w-4 h-4 group-hover:scale-110 transition-transform',
  iconHidden: 'hidden sm:inline',
} as const;
