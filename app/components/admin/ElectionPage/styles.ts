/**
 * ElectionPage styles
 * Following Single Responsibility Principle - only contains style definitions
 */

export const electionStyles = {
  statusCard: 'bg-white rounded-xl shadow-sm p-4 mb-4',
  statusTitle: 'text-base font-bold text-navy-blue mb-3',
  statusGrid: 'grid grid-cols-1 md:grid-cols-2 gap-3',
  statusRow: 'flex items-center gap-2',
  statusLabel: 'text-sm font-medium text-warm-grey',
  statusBadgeOpen: 'px-2 py-0.5 rounded-md text-xs font-bold bg-green-100 text-green-800',
  statusBadgeClosed: 'px-2 py-0.5 rounded-md text-xs font-bold bg-red-100 text-red-800',
  statusBadgeMode: 'px-2 py-0.5 rounded-md text-xs font-bold bg-blue-100 text-blue-800',
  statusValue: 'text-sm text-navy-blue',

  formCard: 'bg-white rounded-xl shadow-sm p-4',
  formTitle: 'text-base font-bold text-navy-blue mb-4',
  formLoading: 'text-center py-6',
  formLoadingText: 'text-sm text-warm-grey',
  formSpace: 'space-y-4',
  formLabel: 'block text-xs font-bold text-navy-blue mb-2',
  formLabelSmall: 'block text-xs font-bold text-navy-blue mb-1.5',
  formRadioGroup: 'flex gap-3',
  formRadioLabel: 'flex items-center gap-1.5 cursor-pointer text-sm',
  formRadioInput: 'w-3.5 h-3.5 text-turquoise focus:ring-turquoise',
  formCheckboxLabel: 'flex items-center gap-2 cursor-pointer text-sm',
  formCheckboxInput: 'w-4 h-4 text-turquoise focus:ring-turquoise rounded',
  formInput:
    'w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:border-turquoise focus:outline-none',
  formHint: 'text-xs text-warm-grey mt-1.5',
  formActions: 'flex justify-end pt-3',
  formSubmit:
    'flex items-center gap-1.5 px-4 py-2 text-sm bg-turquoise text-white rounded-lg font-semibold hover:shadow-md hover:shadow-turquoise/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed',
} as const;
