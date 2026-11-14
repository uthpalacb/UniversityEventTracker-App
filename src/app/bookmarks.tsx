// src/app/bookmarks.tsx
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { useBookmarks } from '../context/BookmarkContext';

export default function BookmarksScreen() {
  const { bookmarks } = useBookmarks();
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Your Bookmarked Events</Text>
      
      {bookmarks.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="bookmark-outline" size={50} color="#ccc" />
          <Text style={styles.emptyText}>No bookmarks added yet!</Text>
        </View>
      ) : (
        <FlatList
          data={bookmarks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Pressable 
              style={styles.card}
              onPress={() => router.push({ pathname: '/event-detail', params: item as any })}
            >
              <Image source={{ uri: item.image }} style={styles.image} />
              <View style={styles.cardContent}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.date}>{item.date} | {item.location}</Text>
              </View>
            </Pressable>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f5f5f5' },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#333', marginBottom: 16 },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { fontSize: 16, color: '#666', marginTop: 10 },
  card: { backgroundColor: '#fff', borderRadius: 10, marginBottom: 16, overflow: 'hidden', elevation: 2 },
  image: { width: '100%', height: 140 },
  cardContent: { padding: 12 },
  title: { fontSize: 16, fontWeight: 'bold', color: '#222' },
  date: { fontSize: 12, color: '#666', marginVertical: 4 },
});