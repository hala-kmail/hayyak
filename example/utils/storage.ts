/**
 * Cross-platform secure storage utilities
 * 
 * Provides a unified interface for secure storage across web and native platforms.
 * Uses expo-secure-store for native and localStorage for web.
 */

import { Platform } from 'react-native';

interface SecureStorage {
  getItemAsync(key: string): Promise<string | null>;
  setItemAsync(key: string, value: string): Promise<void>;
  deleteItemAsync(key: string): Promise<void>;
}

// Web implementation using localStorage
const webStorage: SecureStorage = {
  async getItemAsync(key: string): Promise<string | null> {
    try {
      return localStorage.getItem(key);
    } catch (error) {
      console.error('Error getting item from localStorage:', error);
      return null;
    }
  },

  async setItemAsync(key: string, value: string): Promise<void> {
    try {
      localStorage.setItem(key, value);
    } catch (error) {
      console.error('Error setting item in localStorage:', error);
      throw error;
    }
  },

  async deleteItemAsync(key: string): Promise<void> {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Error deleting item from localStorage:', error);
      throw error;
    }
  },
};

// Native implementation using expo-secure-store
let nativeStorage: SecureStorage | null = null;

const getNativeStorage = (): SecureStorage => {
  if (!nativeStorage) {
    try {
      // Dynamically import expo-secure-store only on native platforms
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const SecureStore = require('expo-secure-store');
      nativeStorage = {
        async getItemAsync(key: string): Promise<string | null> {
          return await SecureStore.getItemAsync(key);
        },
        async setItemAsync(key: string, value: string): Promise<void> {
          await SecureStore.setItemAsync(key, value);
        },
        async deleteItemAsync(key: string): Promise<void> {
          await SecureStore.deleteItemAsync(key);
        },
      };
    } catch (error) {
      console.error('Failed to load expo-secure-store:', error);
      // Fallback to web storage if native storage fails to load
      nativeStorage = webStorage;
    }
  }
  return nativeStorage;
};

// Export the appropriate storage based on platform
const storage: SecureStorage = Platform.OS === 'web' ? webStorage : getNativeStorage();

export default storage;

// Named exports for convenience
export const getItem = storage.getItemAsync.bind(storage);
export const setItem = storage.setItemAsync.bind(storage);
export const deleteItem = storage.deleteItemAsync.bind(storage);

/**
 * Storage helper for JSON objects
 */
export const storageJSON = {
  /**
   * Get and parse JSON from storage
   * 
   * @example
   * ```tsx
   * const user = await storageJSON.get('user');
   * ```
   */
  async get<T>(key: string): Promise<T | null> {
    try {
      const value = await getItem(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error('Error parsing JSON from storage:', error);
      return null;
    }
  },

  /**
   * Stringify and save JSON to storage
   * 
   * @example
   * ```tsx
   * await storageJSON.set('user', { id: 1, name: 'John' });
   * ```
   */
  async set<T>(key: string, value: T): Promise<void> {
    try {
      await setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error stringifying JSON to storage:', error);
      throw error;
    }
  },

  /**
   * Remove item from storage
   */
  async remove(key: string): Promise<void> {
    await deleteItem(key);
  },
};

