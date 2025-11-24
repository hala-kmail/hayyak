/**
 * Base Utilities
 * 
 * Central export point for all utility functions.
 */

// Async utilities
export { delay } from './delay';

// Formatting utilities
export {
  formatCurrency,
  formatNumber,
  formatPercentage,
  formatFileSize,
} from './format';

// String utilities
export {
  capitalize,
  capitalizeWords,
  truncate,
  slugify,
  sanitizeFilename,
  getInitials,
} from './string';

// Date utilities
export {
  formatDate,
  formatDateTime,
  formatTime,
  formatRelativeTime,
  isToday,
  isYesterday,
  isSameDay,
  addDays,
  subtractDays,
  getDateRange,
} from './date';

// Validation utilities
export {
  isEmail,
  isPhone,
  isURL,
  isEmpty,
  isNumeric,
  isStrongPassword,
  matchesPattern,
} from './validation';

// Storage utilities
export {
  default as storage,
  getItem,
  setItem,
  deleteItem,
  storageJSON,
} from './storage';

