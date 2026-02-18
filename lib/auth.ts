/**
 * Utility functions for admin authentication
 */

const ACCESS_TOKEN_KEY = 'admin_accessToken';
const USER_ROLE_KEY = 'admin_userRole';
const ADMIN_SESSION_COOKIE = 'admin_session';
const ADMIN_TOKEN_COOKIE = 'admin_token';

/**
 * Get the stored access token
 */
export function getAccessToken(): string | null {
  if (typeof window === 'undefined') {
    return null;
  }
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

/**
 * Set the access token
 */
export function setAccessToken(token: string): void {
  if (typeof window === 'undefined') {
    return;
  }
  localStorage.setItem(ACCESS_TOKEN_KEY, token);
  // Cookie للـ Middleware - يتحقق من وجود الجلسة دون كشف التوكن
  document.cookie = `${ADMIN_SESSION_COOKIE}=1; path=/; max-age=86400; SameSite=Lax`;
  // Cookie للـ Server Actions - قراءة التوكن على السيرفر
  document.cookie = `${ADMIN_TOKEN_COOKIE}=${encodeURIComponent(token)}; path=/; max-age=86400; SameSite=Lax`;
}

/**
 * Get the stored user role
 */
export function getUserRole(): string | null {
  if (typeof window === 'undefined') {
    return null;
  }
  return localStorage.getItem(USER_ROLE_KEY);
}

/**
 * Set the user role
 */
export function setUserRole(role: string): void {
  if (typeof window === 'undefined') {
    return;
  }
  localStorage.setItem(USER_ROLE_KEY, role);
}

/**
 * Remove the access token (logout)
 */
export function removeAccessToken(): void {
  if (typeof window === 'undefined') {
    return;
  }
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(USER_ROLE_KEY);
  document.cookie = `${ADMIN_SESSION_COOKIE}=; path=/; max-age=0`;
  document.cookie = `${ADMIN_TOKEN_COOKIE}=; path=/; max-age=0`;
}

/**
 * Check if user is authenticated
 */
export function isAuthenticated(): boolean {
  return getAccessToken() !== null;
}

/**
 * Check if user is super admin
 */
export function isSuperAdmin(): boolean {
  const role = getUserRole();
  return role === 'super_admin';
}
