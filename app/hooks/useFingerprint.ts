'use client';

import { useEffect, useState } from 'react';
import FingerprintJS from '@fingerprintjs/fingerprintjs';

/**
 * Hook to get device fingerprint using FingerprintJS
 * Stores visitorId in sessionStorage to avoid regenerating it on every call
 */
export function useFingerprint() {
  const [visitorId, setVisitorId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const STORAGE_KEY = 'fp_visitor_id';

    async function getFingerprint() {
      try {
        // Check sessionStorage first
        const storedId = sessionStorage.getItem(STORAGE_KEY);
        if (storedId) {
          setVisitorId(storedId);
          setIsLoading(false);
          return;
        }

        // Initialize FingerprintJS
        const fp = await FingerprintJS.load();
        
        // Get visitor identifier
        const result = await fp.get();
        const id = result.visitorId;

        // Store in sessionStorage
        sessionStorage.setItem(STORAGE_KEY, id);
        setVisitorId(id);
        setIsLoading(false);
      } catch (err) {
        console.error('Error generating fingerprint:', err);
        setError('فشل في توليد بصمة الجهاز. يرجى المحاولة لاحقاً.');
        setIsLoading(false);
      }
    }

    getFingerprint();
  }, []);

  return { visitorId, isLoading, error };
}
