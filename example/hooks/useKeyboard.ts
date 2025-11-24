/**
 * useKeyboard - Hook to track keyboard visibility
 * 
 * Provides information about keyboard state and dimensions.
 * 
 * @example
 * ```tsx
 * const { isVisible, keyboardHeight } = useKeyboard();
 * 
 * return (
 *   <View style={{ paddingBottom: isVisible ? keyboardHeight : 0 }}>
 *     <TextInput />
 *   </View>
 * );
 * ```
 */

import { useEffect, useState } from 'react';
import { Keyboard, KeyboardEvent } from 'react-native';

interface KeyboardState {
  isVisible: boolean;
  keyboardHeight: number;
}

export function useKeyboard(): KeyboardState {
  const [keyboardState, setKeyboardState] = useState<KeyboardState>({
    isVisible: false,
    keyboardHeight: 0,
  });

  useEffect(() => {
    const onKeyboardShow = (e: KeyboardEvent) => {
      setKeyboardState({
        isVisible: true,
        keyboardHeight: e.endCoordinates.height,
      });
    };

    const onKeyboardHide = () => {
      setKeyboardState({
        isVisible: false,
        keyboardHeight: 0,
      });
    };

    const showSubscription = Keyboard.addListener('keyboardDidShow', onKeyboardShow);
    const hideSubscription = Keyboard.addListener('keyboardDidHide', onKeyboardHide);

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  return keyboardState;
}

