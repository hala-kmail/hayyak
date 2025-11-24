/**
 * Validation utilities for common data types
 */

/**
 * isEmail - Validate email address
 * 
 * @example
 * ```tsx
 * isEmail('user@example.com') // true
 * isEmail('invalid-email') // false
 * ```
 */
export function isEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * isPhone - Validate phone number (basic validation)
 * 
 * @example
 * ```tsx
 * isPhone('+1234567890') // true
 * isPhone('123-456-7890') // true
 * ```
 */
export function isPhone(phone: string): boolean {
  const phoneRegex = /^[\d\s\-\+\(\)]+$/;
  return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
}

/**
 * isURL - Validate URL
 * 
 * @example
 * ```tsx
 * isURL('https://example.com') // true
 * isURL('not-a-url') // false
 * ```
 */
export function isURL(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * isEmpty - Check if value is empty
 * 
 * @example
 * ```tsx
 * isEmpty('') // true
 * isEmpty(null) // true
 * isEmpty([]) // true
 * isEmpty({}) // true
 * ```
 */
export function isEmpty(value: any): boolean {
  if (value == null) return true;
  if (typeof value === 'string') return value.trim().length === 0;
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === 'object') return Object.keys(value).length === 0;
  return false;
}

/**
 * isNumeric - Check if string is numeric
 * 
 * @example
 * ```tsx
 * isNumeric('123') // true
 * isNumeric('12.34') // true
 * isNumeric('abc') // false
 * ```
 */
export function isNumeric(value: string): boolean {
  return !isNaN(parseFloat(value)) && isFinite(Number(value));
}

/**
 * isStrongPassword - Check if password meets strength requirements
 * 
 * @example
 * ```tsx
 * isStrongPassword('MyP@ssw0rd') // true
 * isStrongPassword('weak') // false
 * ```
 */
export function isStrongPassword(password: string, minLength: number = 8): boolean {
  if (password.length < minLength) return false;
  
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  
  return hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChar;
}

/**
 * matchesPattern - Check if string matches a pattern
 * 
 * @example
 * ```tsx
 * matchesPattern('ABC123', /^[A-Z]{3}\d{3}$/) // true
 * ```
 */
export function matchesPattern(value: string, pattern: RegExp): boolean {
  return pattern.test(value);
}

