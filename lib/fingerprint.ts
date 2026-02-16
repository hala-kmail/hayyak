import { createHash } from 'crypto';

/**
 * Hash a fingerprint using SHA-256
 * This ensures we don't store the raw fingerprint in the database
 * @param fingerprint - Raw fingerprint string from FingerprintJS
 * @returns SHA-256 hash of the fingerprint
 */
export function hashFingerprint(fingerprint: string): string {
  return createHash('sha256').update(fingerprint).digest('hex');
}

/**
 * Validate fingerprint format
 * @param fingerprint - Fingerprint string to validate
 * @returns true if valid, false otherwise
 */
export function isValidFingerprint(fingerprint: string): boolean {
  if (!fingerprint || typeof fingerprint !== 'string') {
    return false;
  }
  // FingerprintJS visitorId is typically a long alphanumeric string
  // Basic validation: should be at least 20 characters
  return fingerprint.length >= 20 && /^[a-zA-Z0-9]+$/.test(fingerprint);
}
