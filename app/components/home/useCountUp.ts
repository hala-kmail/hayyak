'use client';

import { useEffect, useState } from 'react';

/**
 * عداد يتحرك من 0 إلى القيمة المستهدفة مع تأخير ومدة (ease-out).
 */
export function useCountUp(
  target: number,
  options: { duration?: number; delay?: number; enabled?: boolean } = {}
) {
  const { duration = 1000, delay = 0, enabled = true } = options;
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!enabled || target <= 0) {
      setValue(target);
      return;
    }

    let startTime: number | null = null;
    let timeoutId: ReturnType<typeof setTimeout>;

    const easeOutQuart = (t: number) => 1 - (1 - t) ** 4;

    const run = (timestamp: number) => {
      if (startTime === null) {
        startTime = timestamp;
      }
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutQuart(progress);
      setValue(Math.round(eased * target));
      if (progress < 1) {
        requestAnimationFrame(run);
      }
    };

    timeoutId = setTimeout(() => {
      requestAnimationFrame(run);
    }, delay);

    return () => clearTimeout(timeoutId);
  }, [target, duration, delay, enabled]);

  return value;
}
