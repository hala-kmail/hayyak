/**
 * Shared admin styles
 * Following Single Responsibility Principle - only contains style definitions
 */

export const sharedStyles = {
  pageHeader: 'flex items-center justify-between mb-6',
  pageTitle: 'text-3xl font-black text-navy-blue',

  alertError: 'bg-red-50 border-2 border-red-200 rounded-xl p-4 mb-6',
  alertSuccess: 'bg-green-50 border-2 border-green-200 rounded-xl p-4 mb-6',
  alertInfo: 'bg-blue-50 border-2 border-blue-200 rounded-xl p-4 mb-6',
  alertTextError: 'text-sm font-bold text-red-800',
  alertTextSuccess: 'text-sm font-bold text-green-800',
  alertTextInfo: 'text-sm font-bold text-blue-800',

  searchContainer: 'mb-6',
  searchWrapper: 'relative',
  searchIcon: 'absolute right-4 top-1/2 -translate-y-1/2 text-warm-grey',
  searchInput:
    'w-full pr-12 pl-4 py-3 border-2 border-gray-200 rounded-xl focus:border-turquoise focus:outline-none transition-colors text-navy-blue bg-white',

  loadingContainer: 'bg-white rounded-2xl shadow-md p-12 text-center',
  loadingSpinner:
    'inline-block w-8 h-8 border-2 border-turquoise border-t-transparent rounded-full animate-spin mb-4',
  loadingText: 'text-warm-grey',

  emptyContainer: 'bg-white rounded-2xl shadow-md p-12 text-center',
  emptyText: 'text-warm-grey',

  buttonPrimary:
    'flex items-center gap-2 px-6 py-3 bg-turquoise text-white rounded-xl font-bold hover:shadow-lg hover:shadow-turquoise/30 transition-all',
  buttonSecondary:
    'flex items-center gap-2 px-4 py-2 bg-gray-100 text-navy-blue rounded-xl font-semibold hover:bg-gray-200 transition-all disabled:opacity-50',
} as const;
