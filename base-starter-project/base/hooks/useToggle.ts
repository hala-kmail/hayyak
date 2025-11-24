/**
 * useToggle - Hook for boolean state toggling
 * 
 * Simplifies managing boolean state with toggle functionality.
 * 
 * @example
 * ```tsx
 * const [isOpen, toggleOpen, setIsOpen] = useToggle(false);
 * 
 * // Toggle
 * <Button onPress={toggleOpen}>Toggle</Button>
 * 
 * // Set explicitly
 * <Button onPress={() => setIsOpen(true)}>Open</Button>
 * ```
 */

import { useCallback, useState } from 'react';

export function useToggle(
  initialValue: boolean = false
): [boolean, () => void, (value: boolean) => void] {
  const [value, setValue] = useState(initialValue);

  const toggle = useCallback(() => {
    setValue((v) => !v);
  }, []);

  return [value, toggle, setValue];
}

