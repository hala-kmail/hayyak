/**
 * ElectionPage styles
 * Following Single Responsibility Principle - only contains style definitions
 */

export const electionStyles = {
  statusCard: 'bg-white rounded-2xl shadow-md p-6 mb-6',
  statusTitle: 'text-xl font-bold text-navy-blue mb-4',
  statusGrid: 'grid grid-cols-1 md:grid-cols-2 gap-4',
  statusRow: 'flex items-center gap-3',
  statusLabel: 'font-semibold text-warm-grey',
  statusBadgeOpen: 'px-3 py-1 rounded-lg font-bold bg-green-100 text-green-800',
  statusBadgeClosed: 'px-3 py-1 rounded-lg font-bold bg-red-100 text-red-800',
  statusBadgeMode: 'px-3 py-1 rounded-lg font-bold bg-blue-100 text-blue-800',
  statusValue: 'text-navy-blue',

  formCard: 'bg-white rounded-2xl shadow-md p-6',
  formTitle: 'text-xl font-bold text-navy-blue mb-6',
  formLoading: 'text-center py-8',
  formLoadingText: 'text-warm-grey',
  formSpace: 'space-y-6',
  formLabel: 'block text-sm font-bold text-navy-blue mb-3',
  formLabelSmall: 'block text-sm font-bold text-navy-blue mb-2',
  formRadioGroup: 'flex gap-4',
  formRadioLabel: 'flex items-center gap-2 cursor-pointer',
  formRadioInput: 'w-4 h-4 text-turquoise focus:ring-turquoise',
  formCheckboxLabel: 'flex items-center gap-3 cursor-pointer',
  formCheckboxInput: 'w-5 h-5 text-turquoise focus:ring-turquoise rounded',
  formInput:
    'w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-turquoise focus:outline-none',
  formHint: 'text-sm text-warm-grey mt-2',
  formActions: 'flex justify-end pt-4',
  formSubmit:
    'flex items-center gap-2 px-6 py-3 bg-turquoise text-white rounded-xl font-bold hover:shadow-lg hover:shadow-turquoise/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed',
} as const;
