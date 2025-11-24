/**
 * HTTP Client
 * 
 * A robust HTTP client for making API requests with automatic
 * authentication, error handling, and platform-specific headers.
 * 
 * @example
 * ```tsx
 * import { httpClient } from '@/base/api';
 * 
 * // GET request
 * const data = await httpClient.get('/users');
 * 
 * // POST request
 * const result = await httpClient.post('/users', { name: 'John' });
 * 
 * // Set authentication
 * httpClient.setAuthToken('token123');
 * ```
 */

import { Platform } from 'react-native';

type RequestMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

interface RequestConfig {
  method?: RequestMethod;
  headers?: Record<string, string>;
  body?: any;
  params?: Record<string, string>;
}

/**
 * Custom error class for API errors
 */
export class APIError extends Error {
  public status?: number;
  public statusText?: string;
  public url?: string;
  public method?: string;
  public responseData?: any;

  constructor(
    message: string,
    status?: number,
    statusText?: string,
    url?: string,
    method?: string,
    responseData?: any,
  ) {
    super(message);
    this.name = 'APIError';
    this.status = status;
    this.statusText = statusText;
    this.url = url;
    this.method = method;
    this.responseData = responseData;
  }
}

/**
 * HTTP Client class
 */
export class HTTPClient {
  private baseURL: string;
  private defaultHeaders: Record<string, string>;

  constructor(baseURL: string = '') {
    this.baseURL = baseURL;
    this.defaultHeaders = {
      'Content-Type': 'application/json',
    };
  }

  /**
   * Get the base URL
   */
  getBaseURL(): string {
    return this.baseURL;
  }

  /**
   * Set authentication token
   */
  setAuthToken(token: string): void {
    this.defaultHeaders['Authorization'] = `Bearer ${token}`;
  }

  /**
   * Remove authentication token
   */
  removeAuthToken(): void {
    delete this.defaultHeaders['Authorization'];
  }

  /**
   * Set custom header
   */
  setHeader(key: string, value: string): void {
    this.defaultHeaders[key] = value;
  }

  /**
   * Remove custom header
   */
  removeHeader(key: string): void {
    delete this.defaultHeaders[key];
  }

  /**
   * Build full URL with query parameters
   */
  private buildURL(endpoint: string, params?: Record<string, string>): string {
    const url = new URL(endpoint.startsWith('/api') ? endpoint : `/api${endpoint}`, this.baseURL);

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (typeof value !== 'undefined') {
          url.searchParams.append(key, value);
        }
      });
    }

    return url.toString();
  }

  /**
   * Make HTTP request
   */
  private async request<T = any>(endpoint: string, config: RequestConfig = {}): Promise<T> {
    const { method = 'GET', headers = {}, body, params } = config;

    const url = this.buildURL(endpoint, params);
    const requestHeaders: Record<string, string> = {
      ...this.defaultHeaders,
      ...headers,
      'ngrok-skip-browser-warning': '1',
      'x-is-mobile': Platform.OS !== 'web' ? 'true' : 'false',
    };

    let requestBody: any = body;

    if (body instanceof FormData) {
      // For FormData, we must not set Content-Type, the browser will do it
      // and add the boundary.
      delete requestHeaders['Content-Type'];
    } else if (body) {
      requestBody = JSON.stringify(body);
    }

    let response: Response;

    try {
      response = await fetch(url, {
        method,
        headers: requestHeaders,
        body: requestBody,
      });
    } catch (error: any) {
      // Network/connection errors
      console.error('❌ Network Error:', {
        message: error.message,
        url,
        method,
        error: error,
      });

      throw new APIError(
        `Network Error: ${error.message}. Please check your internet connection and try again.`,
        undefined,
        undefined,
        url,
        method,
      );
    }

    let responseData: any;
    let responseText: string;

    try {
      responseText = await response.text();

      // Try to parse as JSON, fallback to text
      try {
        responseData = responseText ? JSON.parse(responseText) : {};
      } catch (parseError) {
        responseData = { message: responseText };
      }
    } catch (error: any) {
      console.error('❌ Response Parse Error:', {
        error: error.message,
        url,
        method,
        status: response.status,
      });

      throw new APIError(
        'Failed to parse server response',
        response.status,
        response.statusText,
        url,
        method,
      );
    }

    if (!response.ok) {
      // Extract error message from response
      const errorMessage =
        responseData?.message ||
        responseData?.error?.message ||
        responseData?.errors?.[0]?.message ||
        `HTTP ${response.status}: ${response.statusText}`;
      throw new APIError(
        errorMessage,
        response.status,
        response.statusText,
        url,
        method,
        responseData,
      );
    }

    return responseData;
  }

  /**
   * GET request
   */
  async get<T = any>(endpoint: string, params?: Record<string, string>): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET', params });
  }

  /**
   * POST request
   */
  async post<T = any>(endpoint: string, body?: any, params?: Record<string, string>): Promise<T> {
    return this.request<T>(endpoint, { method: 'POST', body, params });
  }

  /**
   * POST FormData request
   */
  async postFormData<T = any>(endpoint: string, body: FormData): Promise<T> {
    return this.request<T>(endpoint, { method: 'POST', body });
  }

  /**
   * PUT request
   */
  async put<T = any>(endpoint: string, body?: any): Promise<T> {
    return this.request<T>(endpoint, { method: 'PUT', body });
  }

  /**
   * PATCH request
   */
  async patch<T = any>(endpoint: string, body?: any): Promise<T> {
    return this.request<T>(endpoint, { method: 'PATCH', body });
  }

  /**
   * DELETE request
   */
  async delete<T = any>(endpoint: string, config?: Omit<RequestConfig, 'method'>): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE', ...config });
  }
}

/**
 * Create and export a singleton HTTP client instance
 * 
 * Usage: Import and configure with your API base URL
 */
export function createHTTPClient(baseURL: string): HTTPClient {
  return new HTTPClient(baseURL);
}

