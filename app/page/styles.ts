/**
 * Style constants for HomePage component
 * Following Single Responsibility Principle - only contains style definitions
 */

export const pageStyles = {
  container: 'min-h-screen bg-gradient-to-b from-gray-100 via-gray-50 to-gray-100',
  districtsSection: 'relative bg-gray-bg w-full',
  districtsSectionMargin: 'mb-[-3px]',
  loadingContainer: 'text-center py-12',
  loadingSpinner: 'inline-block w-8 h-8 border-2 border-turquoise border-t-transparent rounded-full animate-spin mb-4',
  loadingText: 'text-warm-grey',
  errorContainer: 'text-center py-12',
  errorMessage: 'text-red-600 mb-4',
  retryButton: 'px-6 py-2 bg-turquoise text-white rounded-xl font-bold hover:shadow-lg transition-all',
} as const;
