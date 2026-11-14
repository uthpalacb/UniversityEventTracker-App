// src/context/BookmarkContext.tsx
import { createContext, ReactNode, useContext, useState } from 'react';
import { EventItem } from '../data/events';

interface BookmarkContextType {
  bookmarks: EventItem[];
  toggleBookmark: (item: EventItem) => void;
  isBookmarked: (id: string) => boolean;
}

const BookmarkContext = createContext<BookmarkContextType | undefined>(undefined);

export function BookmarkProvider({ children }: { children: ReactNode }) {
  const [bookmarks, setBookmarks] = useState<EventItem[]>([]);

  const toggleBookmark = (item: EventItem) => {
    setBookmarks((prev) => {
      const exists = prev.some((e) => e.id === item.id);
      if (exists) {
        return prev.filter((e) => e.id !== item.id);
      } else {
        return [...prev, item];
      }
    });
  };

  const isBookmarked = (id: string) => {
    return bookmarks.some((e) => e.id === id);
  };

  return (
    <BookmarkContext.Provider value={{ bookmarks, toggleBookmark, isBookmarked }}>
      {children}
    </BookmarkContext.Provider>
  );
}

export function useBookmarks() {
  const context = useContext(BookmarkContext);
  if (!context) {
    throw new Error('useBookmarks must be used within a BookmarkProvider');
  }
  return context;
}