/**
 * Style constants for NotFound component
 * Following Single Responsibility Principle - only contains style definitions
 */

export const notFoundStyles = {
  container: 'min-h-screen flex flex-col items-center justify-center p-4',
  errorCode: 'text-2xl font-bold text-gray-800',
  title: 'text-gray-600 mt-2',
  backLink: 'mt-4 text-navy-blue hover:underline',
} as const;
