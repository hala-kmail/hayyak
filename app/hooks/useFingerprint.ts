'use client';

import { useEffect, useState } from 'react';
import FingerprintJS from '@fingerprintjs/fingerprintjs';

/**
 * Simple fallback hash when crypto.subtle is unavailable (e.g. non-HTTPS, Safari)
 */
function simpleHash(str: string): string {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = ((h << 5) - h + str.charCodeAt(i)) | 0;
  }
  return Math.abs(h).toString(16) + str.length.toString(16);
}

/**
 * Generate a hash from string - uses crypto.subtle when available, fallback otherwise
 */
async function hashString(str: string): Promise<string> {
  try {
    if (typeof crypto !== 'undefined' && crypto.subtle) {
      const encoder = new TextEncoder();
      const data = encoder.encode(str);
      const hashBuffer = await crypto.subtle.digest('SHA-256', data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
    }
  } catch {
    // crypto.subtle unavailable or failed (Safari, non-HTTPS)
  }
  return simpleHash(str);
}

/**
 * Generate device fingerprint using only stable, cross-browser signals
 * Defensive against Safari, private mode, and missing APIs
 */
async function generateDeviceFingerprint(): Promise<string> {
  const safeScreen = typeof screen !== 'undefined' ? `${screen.width}x${screen.height}x${screen.colorDepth}` : '0x0x0';
  const safeNavigator = typeof navigator !== 'undefined' ? navigator : { platform: '', maxTouchPoints: 0, hardwareConcurrency: 0 };
  const safeIntl = typeof Intl !== 'undefined' ? Intl.DateTimeFormat().resolvedOptions().timeZone : 'UTC';

  try {
    const fp = await FingerprintJS.load();
    const result = await fp.get();

    const webGlBasics = result.components.webGlBasics;
    const webGlValue = webGlBasics && 'value' in webGlBasics ? webGlBasics.value : null;

    const hardwareConcurrency = result.components.hardwareConcurrency;
    const cpuCoresValue = hardwareConcurrency && 'value' in hardwareConcurrency ? hardwareConcurrency.value : null;

    const deviceMemory = result.components.deviceMemory;
    const deviceMemoryValue = deviceMemory && 'value' in deviceMemory ? deviceMemory.value : null;

    const audio = result.components.audio;
    const audioValue = audio && 'value' in audio ? audio.value : null;

    const stableComponents = {
      webglRenderer: (webGlValue && typeof webGlValue === 'object' && 'unmaskedRenderer' in webGlValue)
        ? (webGlValue as Record<string, string>).unmaskedRenderer ?? ''
        : '',
      webglVendor: (webGlValue && typeof webGlValue === 'object' && 'unmaskedVendor' in webGlValue)
        ? (webGlValue as Record<string, string>).unmaskedVendor ?? ''
        : '',
      cpuCores: cpuCoresValue ?? '',
      deviceMemory: deviceMemoryValue ?? '',
      screenRes: safeScreen,
      timezone: safeIntl,
      platform: safeNavigator.platform,
      touchPoints: safeNavigator.maxTouchPoints,
      audioHash: audioValue ?? '',
    };

    const raw = JSON.stringify(stableComponents);
    return await hashString(raw);
  } catch (err) {
    console.error('Error generating fingerprint:', err);
    const fallbackInfo = {
      screenRes: safeScreen,
      timezone: safeIntl,
      platform: safeNavigator.platform,
      touchPoints: safeNavigator.maxTouchPoints,
      cpuCores: safeNavigator.hardwareConcurrency || 0,
      deviceMemory: (navigator as { deviceMemory?: number }).deviceMemory || 0,
    };
    return await hashString(JSON.stringify(fallbackInfo));
  }
}

/**
 * Hook to get device fingerprint (same across browsers on same device)
 * Does NOT store deviceId anywhere - generates it fresh each time
 * @param enabled - Only run fingerprint when true (e.g. when vote modal opens). Defers heavy work from initial page load.
 */
export function useFingerprint(enabled = true) {
  const [visitorId, setVisitorId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(!enabled);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    async function getFingerprint() {
      try {
        // Generate device fingerprint fresh each time (no storage)
        const deviceId = await generateDeviceFingerprint();
        if (process.env.NODE_ENV === 'development') {
          console.log('[Fingerprint] visitorId:', deviceId);
        }
        setVisitorId(deviceId);
        setIsLoading(false);
      } catch (err) {
       
        setError('فشل في توليد بصمة الجهاز. يرجى المحاولة لاحقاً.');
        setIsLoading(false);
      }
    }

    getFingerprint();
  }, [enabled]);

  return { visitorId, isLoading, error };
}
