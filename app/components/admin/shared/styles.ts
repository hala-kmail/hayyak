/**
 * Shared admin styles
 * Following Single Responsibility Principle - only contains style definitions
 */

export const sharedStyles = {
  pageHeader: 'flex items-center justify-between mb-4',
  pageTitle: 'text-xl font-bold text-navy-blue',

  alertError: 'bg-red-50 border border-red-200 rounded-lg p-3 mb-4',
  alertSuccess: 'bg-green-50 border border-green-200 rounded-lg p-3 mb-4',
  alertInfo: 'bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4',
  alertTextError: 'text-xs font-semibold text-red-800',
  alertTextSuccess: 'text-xs font-semibold text-green-800',
  alertTextInfo: 'text-xs font-semibold text-blue-800',

  searchContainer: 'mb-4',
  searchWrapper: 'relative',
  searchIcon: 'absolute right-3 top-1/2 -translate-y-1/2 text-warm-grey',
  searchInput:
    'w-full pr-10 pl-3 py-2 text-sm border border-gray-200 rounded-lg focus:border-turquoise focus:outline-none transition-colors text-navy-blue bg-white',

  loadingContainer: 'bg-white rounded-xl shadow-md p-8 text-center',
  loadingSpinner:
    'inline-block w-6 h-6 border-2 border-turquoise border-t-transparent rounded-full animate-spin mb-3',
  loadingText: 'text-sm text-warm-grey',

  emptyContainer: 'bg-white rounded-xl shadow-md p-8 text-center',
  emptyText: 'text-sm text-warm-grey',

  buttonPrimary:
    'flex items-center gap-1.5 px-4 py-2 text-sm bg-turquoise text-white rounded-lg font-semibold hover:shadow-md hover:shadow-turquoise/30 transition-all',
  buttonSecondary:
    'flex items-center gap-1.5 px-3 py-1.5 text-sm bg-gray-100 text-navy-blue rounded-lg font-medium hover:bg-gray-200 transition-all disabled:opacity-50',
} as const;
