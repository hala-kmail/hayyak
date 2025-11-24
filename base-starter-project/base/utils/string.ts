/**
 * String manipulation utilities
 */

/**
 * capitalize - Capitalize the first letter of a string
 * 
 * @example
 * ```tsx
 * capitalize('hello world') // "Hello world"
 * ```
 */
export function capitalize(str: string): string {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

/**
 * capitalizeWords - Capitalize the first letter of each word
 * 
 * @example
 * ```tsx
 * capitalizeWords('hello world') // "Hello World"
 * ```
 */
export function capitalizeWords(str: string): string {
  if (!str) return '';
  return str
    .split(' ')
    .map((word) => capitalize(word))
    .join(' ');
}

/**
 * truncate - Truncate a string to a maximum length
 * 
 * @example
 * ```tsx
 * truncate('Hello World', 8) // "Hello..."
 * truncate('Hello', 10) // "Hello"
 * ```
 */
export function truncate(str: string, maxLength: number, suffix: string = '...'): string {
  if (!str || str.length <= maxLength) return str;
  return str.slice(0, maxLength - suffix.length) + suffix;
}

/**
 * slugify - Convert a string to URL-friendly slug
 * 
 * @example
 * ```tsx
 * slugify('Hello World!') // "hello-world"
 * ```
 */
export function slugify(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * sanitizeFilename - Remove invalid characters from filename
 * 
 * @example
 * ```tsx
 * sanitizeFilename('my/file:name*.txt') // "my-file-name.txt"
 * ```
 */
export function sanitizeFilename(filename: string): string {
  return filename
    .replace(/[<>:"/\\|?*\x00-\x1F]/g, '-')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

/**
 * getInitials - Get initials from a name
 * 
 * @example
 * ```tsx
 * getInitials('John Doe') // "JD"
 * getInitials('John') // "JO"
 * ```
 */
export function getInitials(name: string): string {
  if (!name) return '';
  
  const words = name.trim().split(/\s+/);
  if (words.length === 1) {
    return words[0].slice(0, 2).toUpperCase();
  }
  
  return words
    .slice(0, 2)
    .map((word) => word[0])
    .join('')
    .toUpperCase();
}

