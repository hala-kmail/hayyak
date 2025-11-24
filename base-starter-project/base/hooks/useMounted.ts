/**
 * useMounted - Hook to check if component is mounted
 * 
 * Useful for preventing state updates on unmounted components.
 * 
 * @example
 * ```tsx
 * const isMounted = useMounted();
 * 
 * useEffect(() => {
 *   fetchData().then(data => {
 *     if (isMounted()) {
 *       setData(data);
 *     }
 *   });
 * }, []);
 * ```
 */

import { useCallback, useEffect, useRef } from 'react';

export function useMounted(): () => boolean {
  const mountedRef = useRef(false);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  return useCallback(() => mountedRef.current, []);
}

