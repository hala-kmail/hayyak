import '../global.css';

import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { View } from 'react-native';

import { QueryClientProvider } from '@/providers/QueryClientProvider';
import { ThemeProvider } from '@/providers/ThemeProvider';

export default function RootLayout() {
  return (
    <ThemeProvider>
      {({ themeVars }) => (
        <QueryClientProvider>
          <View style={[{ flex: 1 }, themeVars]}>
            <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="+not-found" />
            </Stack>
          </View>
        </QueryClientProvider>
      )}
    </ThemeProvider>
  );
}

