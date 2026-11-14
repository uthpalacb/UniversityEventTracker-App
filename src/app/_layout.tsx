// src/app/_layout.tsx
import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { useEffect } from 'react';
import { AppState } from 'react-native';
import { BookmarkProvider } from '../context/BookmarkContext';

export default function RootLayout() {
  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      if (nextAppState === 'active') {
        console.log('App has come to the foreground!');
      }
    });
    return () => subscription.remove();
  }, []);

  return (
    <BookmarkProvider>
      <Tabs screenOptions={{ tabBarActiveTintColor: '#2e7d32' }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Events',
            tabBarIcon: ({ color, size }: any) => (
              <Ionicons name="home" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="bookmarks"
          options={{
            title: 'Bookmarks',
            tabBarIcon: ({ color, size }: any) => (
              <Ionicons name="bookmark" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="event-detail"
          options={{
            href: null,
            title: 'Event Details',
          }}
        />
      </Tabs>
    </BookmarkProvider>
  );
}