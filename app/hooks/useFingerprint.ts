'use client';

import { useEffect, useState } from 'react';
import FingerprintJS from '@fingerprintjs/fingerprintjs';

const STORAGE_KEY = 'fp_device_id';
const VOTED_KEY = 'has_voted';

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
 * Get device-specific information (same across browsers on same device)
 */
function getDeviceInfo(): string {
  const info = {
    // Screen properties (device-specific)
    screenWidth: window.screen.width,
    screenHeight: window.screen.height,
    screenColorDepth: window.screen.colorDepth,
    screenPixelDepth: window.screen.pixelDepth,
    
    // Hardware properties
    hardwareConcurrency: navigator.hardwareConcurrency || 0,
    deviceMemory: (navigator as any).deviceMemory || 0,
    maxTouchPoints: navigator.maxTouchPoints || 0,
    
    // Platform (OS)
    platform: navigator.platform,
    userAgentData: (navigator as any).userAgentData?.platform || '',
    
    // Timezone (device setting)
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    timezoneOffset: new Date().getTimezoneOffset(),
    
    // Language (device setting)
    language: navigator.language,
    languages: navigator.languages?.join(',') || '',
    
    // Canvas fingerprint (device-specific, not browser-specific)
    canvas: getCanvasFingerprint(),
    
    // WebGL fingerprint (GPU-specific)
    webgl: getWebGLFingerprint(),
  };
  
  return JSON.stringify(info);
}

/**
 * Get Canvas fingerprint (device-specific)
 */
function getCanvasFingerprint(): string {
  try {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      return 'no-canvas';
    }
    
    canvas.width = 200;
    canvas.height = 50;
    
    ctx.textBaseline = 'top';
    ctx.font = '14px Arial';
    ctx.textBaseline = 'alphabetic';
    ctx.fillStyle = '#f60';
    ctx.fillRect(125, 1, 62, 20);
    ctx.fillStyle = '#069';
    ctx.fillText('Device fingerprint 🎯', 2, 15);
    ctx.fillStyle = 'rgba(102, 204, 0, 0.7)';
    ctx.fillText('Device fingerprint 🎯', 4, 17);
    
    return canvas.toDataURL();
  } catch {
    return 'canvas-error';
  }
}

/**
 * Get WebGL fingerprint (GPU-specific)
 */
function getWebGLFingerprint(): string {
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) {
      return 'no-webgl';
    }
    
    // Type assertion for WebGL context
    const webglContext = gl as WebGLRenderingContext;
    
    const debugInfo = webglContext.getExtension('WEBGL_debug_renderer_info');
    if (!debugInfo) {
      return 'no-debug-info';
    }
    
    return JSON.stringify({
      vendor: webglContext.getParameter(webglContext.VENDOR),
      renderer: webglContext.getParameter(webglContext.RENDERER),
      version: webglContext.getParameter(webglContext.VERSION),
      shadingLanguageVersion: webglContext.getParameter(webglContext.SHADING_LANGUAGE_VERSION),
      unmaskedVendor: webglContext.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL),
      unmaskedRenderer: webglContext.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL),
    });
  } catch {
    return 'webgl-error';
  }
}

/**
 * Generate device fingerprint (same across browsers on same device)
 */
async function generateDeviceFingerprint(): Promise<string> {
  // Get device-specific info
  const deviceInfo = getDeviceInfo();
  
  // Also get FingerprintJS result for additional components
  try {
    const fp = await FingerprintJS.load();
    const result = await fp.get();
    
    // Combine device info with FingerprintJS components that are device-specific
    const combinedInfo = {
      deviceInfo,
      // Use only device-specific components from FingerprintJS
      screenResolution: `${window.screen.width}x${window.screen.height}`,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      language: navigator.language,
      platform: navigator.platform,
      hardwareConcurrency: navigator.hardwareConcurrency,
      // Canvas and WebGL are already in deviceInfo, but we can add more from FingerprintJS
      components: result.components,
    };
    
    const combinedString = JSON.stringify(combinedInfo);
    return await hashString(combinedString);
  } catch (err) {
    // Fallback: use device info only
    return await hashString(deviceInfo);
  }
}

/**
 * Hook to get device fingerprint (same across browsers on same device)
 * Stores deviceId in localStorage and checks if user has already voted
 */
export function useFingerprint() {
  const [visitorId, setVisitorId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasVoted, setHasVoted] = useState<boolean>(false);

  useEffect(() => {
    async function getFingerprint() {
      try {
        // Check if user has already voted
        const votedStatus = localStorage.getItem(VOTED_KEY);
        if (votedStatus === 'true') {
          setHasVoted(true);
        }

        // Check localStorage first (more persistent)
        const storedId = localStorage.getItem(STORAGE_KEY);
        if (storedId) {
          console.log('🔐 Using Stored Device Fingerprint:', storedId);
          setVisitorId(storedId);
          setIsLoading(false);
          return;
        }

        // Check sessionStorage as fallback
        const sessionId = sessionStorage.getItem(STORAGE_KEY);
        if (sessionId) {
          // Migrate to localStorage for persistence
          console.log('🔐 Using Session Device Fingerprint:', sessionId);
          localStorage.setItem(STORAGE_KEY, sessionId);
          setVisitorId(sessionId);
          setIsLoading(false);
          return;
        }

        // Generate device fingerprint (same across browsers)
        const deviceId = await generateDeviceFingerprint();
        
        // طباعة البصمة في Console
        console.log('🔐 Device Fingerprint Generated:', deviceId);
        console.log('📱 Device Info:', getDeviceInfo());

        // Store in both localStorage (primary) and sessionStorage (backup)
        localStorage.setItem(STORAGE_KEY, deviceId);
        sessionStorage.setItem(STORAGE_KEY, deviceId);
        setVisitorId(deviceId);
        setIsLoading(false);
      } catch (err) {
        console.error('Error generating fingerprint:', err);
        setError('فشل في توليد بصمة الجهاز. يرجى المحاولة لاحقاً.');
        setIsLoading(false);
      }
    }

    getFingerprint();
  }, []);

  /**
   * Mark user as voted (call this after successful vote)
   */
  const markAsVoted = () => {
    localStorage.setItem(VOTED_KEY, 'true');
    sessionStorage.setItem(VOTED_KEY, 'true');
    setHasVoted(true);
  };

  return { visitorId, isLoading, error, hasVoted, markAsVoted };
}
