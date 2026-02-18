'use client';

import { useEffect, useState } from 'react';
import FingerprintJS from '@fingerprintjs/fingerprintjs';

/**
 * Generate a simple hash from string
 */
async function hashString(str: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(str);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Generate device fingerprint using only stable, cross-browser signals
 */
async function generateDeviceFingerprint(): Promise<string> {
  try {
    const fp = await FingerprintJS.load();
    const result = await fp.get();
    
    // Extract the most stable, cross-browser signals
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
        ? (webGlValue as any).unmaskedRenderer ?? '' 
        : '',
      webglVendor: (webGlValue && typeof webGlValue === 'object' && 'unmaskedVendor' in webGlValue) 
        ? (webGlValue as any).unmaskedVendor ?? '' 
        : '',
      cpuCores: cpuCoresValue ?? '',
      deviceMemory: deviceMemoryValue ?? '',
      screenRes: `${screen.width}x${screen.height}x${screen.colorDepth}`,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      platform: navigator.platform,
      touchPoints: navigator.maxTouchPoints,
      audioHash: audioValue ?? '',
    };
    
    // Hash it yourself for vote dedup
    const raw = JSON.stringify(stableComponents);
    return await hashString(raw);
  } catch (err) {
    console.error('Error generating fingerprint:', err);
    // Fallback: use basic device info
    const fallbackInfo = {
      screenRes: `${screen.width}x${screen.height}x${screen.colorDepth}`,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      platform: navigator.platform,
      touchPoints: navigator.maxTouchPoints,
      cpuCores: navigator.hardwareConcurrency || 0,
      deviceMemory: (navigator as any).deviceMemory || 0,
    };
    return await hashString(JSON.stringify(fallbackInfo));
  }
}

/**
 * Hook to get device fingerprint (same across browsers on same device)
 * Does NOT store deviceId anywhere - generates it fresh each time
 */
export function useFingerprint() {
  const [visitorId, setVisitorId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function getFingerprint() {
      try {
        // Generate device fingerprint fresh each time (no storage)
        const deviceId = await generateDeviceFingerprint();
        
      

        setVisitorId(deviceId);
        setIsLoading(false);
      } catch (err) {
       
        setError('فشل في توليد بصمة الجهاز. يرجى المحاولة لاحقاً.');
        setIsLoading(false);
      }
    }

    getFingerprint();
  }, []);

  return { visitorId, isLoading, error };
}
