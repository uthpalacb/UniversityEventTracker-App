// src/data/events.ts
export interface EventItem {
  id: string;
  title: string;
  category: string;
  date: string;
  location: string;
  description: string;
  image: string;
}

export const EVENTS_DATA: EventItem[] = [
  {
    id: '1',
    title: 'Annual Tech Hackathon 2026',
    category: 'Tech',
    date: 'Nov 25, 2026',
    location: 'Computer Lab 01',
    description: 'A 12-hour coding challenge for software engineering students.',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97',
  },
  {
    id: '2',
    title: 'AI & Machine Learning Workshop',
    category: 'Tech',
    date: 'Nov 28, 2026',
    location: 'Auditorium A',
    description: 'Learn the basics of Neural Networks and Python implementation.',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e',
  },
  {
    id: '3',
    title: 'Inter-Faculty Cricket Tournament',
    category: 'Sports',
    date: 'Dec 02, 2026',
    location: 'University Grounds',
    description: 'Cheer for your department in the final showdown!',
    image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e',
  },
  {
    id: '4',
    title: 'Cultural Musical Eve',
    category: 'Cultural',
    date: 'Dec 10, 2026',
    location: 'Main Hall',
    description: 'An evening filled with traditional music, dance, and food.',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30',
  },
];