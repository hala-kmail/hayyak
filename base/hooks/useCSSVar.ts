'use client';

import { useCallback, useEffect, useState } from 'react';

/**
 * Returns the computed value of a CSS variable from the document root.
 * Converts space-separated RGB (e.g. "13 148 136") to "rgb(13, 148, 136)".
 */
function getCSSVarValue(name: string): string {
  if (typeof document === 'undefined') {
    return 'rgb(255, 255, 255)';
  }
  const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  if (!value) {
    return 'rgb(255, 255, 255)';
  }
  if (value.startsWith('rgb')) {
    return value;
  }
  const parts = value.split(/[\s,]+/).filter(Boolean);
  if (parts.length >= 3) {
    return `rgb(${parts.slice(0, 3).join(', ')})`;
  }
  return value;
}

/**
 * useCSSVar - Hook to access theme CSS variable values (web).
 * Values are read from :root and formatted as rgb(...) when needed.
 */
export function useCSSVar(variableName: string): string {
  const name = variableName.startsWith('--') ? variableName : `--${variableName}`;

  // Match server render to avoid hydration mismatch - client value set in useEffect
  const [value, setValue] = useState('rgb(255, 255, 255)');

  const update = useCallback(() => {
    setValue(getCSSVarValue(name));
  }, [name]);

  useEffect(() => {
    update();
    const observer = new MutationObserver(update);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['style', 'data-theme', 'class'],
    });
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    media.addEventListener('change', update);
    return () => {
      observer.disconnect();
      media.removeEventListener('change', update);
    };
  }, [update]);

  return value;
}
