/**
 * Admin modal styles shared between modals
 * Following Single Responsibility Principle - only contains style definitions
 */

export const modalStyles = {
  overlay: 'fixed inset-0 z-50 flex items-center justify-center p-3',
  backdrop: 'absolute inset-0 bg-black/60 backdrop-blur-sm',
  modal: 'relative bg-white rounded-xl shadow-xl max-w-sm w-full animate-fade-in-up',
  modalScrollable: 'relative bg-white rounded-xl shadow-xl max-w-sm w-full max-h-[90vh] overflow-y-auto animate-fade-in-up',
  header: 'sticky top-0 bg-white border-b border-gray-100 px-4 py-3 flex items-center justify-between rounded-t-xl z-10',
  title: 'text-base font-bold text-navy-blue',
  closeBtn:
    'w-8 h-8 rounded-lg bg-gray-bg hover:bg-gray-100 flex items-center justify-center text-warm-grey hover:text-navy-blue transition-colors',
  closeBtnDisabled:
    'w-8 h-8 rounded-lg bg-gray-bg hover:bg-gray-100 flex items-center justify-center text-warm-grey hover:text-navy-blue transition-colors disabled:opacity-50 disabled:cursor-not-allowed',
  content: 'px-4 py-4',
  form: 'space-y-4',
  formLabel: 'block text-xs font-bold text-navy-blue mb-1.5',
  formInput:
    'w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:border-gold focus:outline-none transition-colors text-navy-blue',
  formError: 'bg-red-50 border border-red-200 rounded-lg p-3',
  formErrorText: 'text-xs font-bold text-red-800',
  submitBtn:
    'w-full py-2.5 text-sm bg-gold text-white rounded-lg font-semibold hover:shadow-md hover:shadow-gold/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1.5',

  // Delete modal specific
  warningIconWrapper: 'flex justify-center mb-3',
  warningIcon: 'w-12 h-12 rounded-full bg-red-100 flex items-center justify-center',
  warningIconSvg: 'w-6 h-6 text-red-600',
  messageWrapper: 'text-center mb-4',
  messageText: 'text-sm text-navy-blue font-semibold mb-1.5',
  itemName: 'text-base text-navy-blue font-bold',
  messageHint: 'text-xs text-warm-grey mt-1.5',
  buttonsGroup: 'flex gap-2',
  cancelBtn:
    'flex-1 py-2.5 text-sm bg-gray-100 text-navy-blue rounded-lg font-semibold hover:bg-gray-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed',
  confirmBtn:
    'flex-1 py-2.5 text-sm bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 hover:shadow-md hover:shadow-red-600/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1.5',
} as const;
