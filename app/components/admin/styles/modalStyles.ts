/**
 * Admin modal styles shared between modals
 * Following Single Responsibility Principle - only contains style definitions
 */

export const modalStyles = {
  overlay: 'fixed inset-0 z-50 flex items-center justify-center p-4',
  backdrop: 'absolute inset-0 bg-black/60 backdrop-blur-sm',
  modal: 'relative bg-white rounded-3xl shadow-2xl max-w-md w-full animate-fade-in-up',
  modalScrollable: 'relative bg-white rounded-3xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto animate-fade-in-up',
  header: 'sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between rounded-t-3xl z-10',
  title: 'text-xl font-black text-navy-blue',
  closeBtn:
    'w-10 h-10 rounded-xl bg-gray-50 hover:bg-gray-100 flex items-center justify-center text-warm-grey hover:text-navy-blue transition-colors',
  closeBtnDisabled:
    'w-10 h-10 rounded-xl bg-gray-50 hover:bg-gray-100 flex items-center justify-center text-warm-grey hover:text-navy-blue transition-colors disabled:opacity-50 disabled:cursor-not-allowed',
  content: 'px-6 py-6',
  form: 'space-y-6',
  formLabel: 'block text-sm font-bold text-navy-blue mb-2',
  formInput:
    'w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-turquoise focus:outline-none transition-colors text-navy-blue',
  formError: 'bg-red-50 border-2 border-red-200 rounded-xl p-4',
  formErrorText: 'text-sm font-bold text-red-800',
  submitBtn:
    'w-full py-3 bg-turquoise text-white rounded-xl font-black text-base hover:shadow-lg hover:shadow-turquoise/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2',

  // Delete modal specific
  warningIconWrapper: 'flex justify-center mb-4',
  warningIcon: 'w-16 h-16 rounded-full bg-red-100 flex items-center justify-center',
  warningIconSvg: 'w-8 h-8 text-red-600',
  messageWrapper: 'text-center mb-6',
  messageText: 'text-base text-navy-blue font-semibold mb-2',
  itemName: 'text-lg text-navy-blue font-black',
  messageHint: 'text-sm text-warm-grey mt-2',
  buttonsGroup: 'flex gap-3',
  cancelBtn:
    'flex-1 py-3 bg-gray-100 text-navy-blue rounded-xl font-black text-base hover:bg-gray-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed',
  confirmBtn:
    'flex-1 py-3 bg-red-600 text-white rounded-xl font-black text-base hover:bg-red-700 hover:shadow-lg hover:shadow-red-600/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2',
} as const;
