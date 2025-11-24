import { Tabs } from 'expo-router';
import React from 'react';

import { useCSSVar } from '@/base/hooks';

export default function TabLayout() {
  const primaryColor = useCSSVar('--color-primary-600');
  const textMutedColor = useCSSVar('--color-text-muted');

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: primaryColor,
        tabBarInactiveTintColor: textMutedColor,
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="components"
        options={{
          title: 'Components',
          tabBarIcon: ({ color }) => <TabBarIcon name="apps" color={color} />,
        }}
      />
      <Tabs.Screen
        name="theme"
        options={{
          title: 'Theme',
          tabBarIcon: ({ color }) => <TabBarIcon name="palette" color={color} />,
        }}
      />
    </Tabs>
  );
}

function TabBarIcon({ name, color }: { name: string; color: string }) {
  return <MaterialIcons name={name as any} size={24} color={color} />;
}

// Temporary icon component (you can replace with @expo/vector-icons)
import { MaterialIcons } from '@expo/vector-icons';

