/**
 * delay - Promise-based delay utility
 * 
 * Creates a promise that resolves after a specified number of milliseconds.
 * Useful for adding delays in async functions.
 * 
 * @example
 * ```tsx
 * await delay(1000); // Wait 1 second
 * console.log('Delayed execution');
 * ```
 */

export const delay = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

