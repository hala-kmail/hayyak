/**
 * Common TypeScript types used across the application
 */

/**
 * Generic API response wrapper
 */
export interface APIResponse<T = any> {
  data: T;
  message?: string;
  success: boolean;
}

/**
 * Paginated API response
 */
export interface PaginatedResponse<T = any> {
  data: T[];
  pagination: {
    page: number;
    perPage: number;
    total: number;
    totalPages: number;
  };
}

/**
 * API error response
 */
export interface APIErrorResponse {
  message: string;
  errors?: Array<{
    field?: string;
    message: string;
  }>;
  statusCode?: number;
}

/**
 * Loading state type
 */
export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

/**
 * Generic entity with ID
 */
export interface Entity {
  id: string | number;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

/**
 * Select option type
 */
export interface SelectOption<T = string> {
  label: string;
  value: T;
  disabled?: boolean;
}

/**
 * File upload type
 */
export interface FileUpload {
  uri: string;
  name: string;
  type: string;
  size?: number;
}

/**
 * Coordinates type
 */
export interface Coordinates {
  latitude: number;
  longitude: number;
}

/**
 * Date range type
 */
export interface DateRange {
  start: Date | string;
  end: Date | string;
}

