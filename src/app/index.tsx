// src/app/index.tsx
import { Ionicons } from '@expo/vector-icons';
import * as Notifications from 'expo-notifications';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { FlatList, Image, Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { useBookmarks } from '../context/BookmarkContext';
import { EVENTS_DATA, EventItem } from '../data/events';

export default function HomeScreen() {
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const router = useRouter();
  const { toggleBookmark, isBookmarked } = useBookmarks();

  const filteredEvents = filterCategory === 'All' 
    ? EVENTS_DATA 
    : EVENTS_DATA.filter((e: EventItem) => e.category === filterCategory);

  const handleBookmark = async (item: EventItem) => {
    toggleBookmark(item);
    
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "University Event Tracker 📌",
        body: `You bookmarked: ${item.title}`,
      },
      trigger: null,
    });
    alert(`${item.title} bookmark updated & Notification sent!`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.headerTitle}>University Events</Text>
        <Pressable style={styles.filterBtn} onPress={() => setModalVisible(true)}>
          <Ionicons name="filter" size={18} color="#fff" />
          <Text style={styles.filterText}>Filter: {filterCategory}</Text>
        </Pressable>
      </View>

      <FlatList
        data={filteredEvents}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const bookmarked = isBookmarked(item.id);
          return (
            <Pressable 
              style={styles.card}
              onPress={() => router.push({ pathname: '/event-detail', params: item as any })}
            >
              <Image source={{ uri: item.image }} style={styles.image} />
              <View style={styles.cardContent}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.date}>{item.date} | {item.location}</Text>
                <Pressable style={styles.bookmarkBtn} onPress={() => handleBookmark(item)}>
                  <Ionicons 
                    name={bookmarked ? "bookmark" : "bookmark-outline"} 
                    size={16} 
                    color="#2e7d32" 
                  />
                  <Text style={styles.bookmarkText}>
                    {bookmarked ? 'Bookmarked' : 'Bookmark'}
                  </Text>
                </Pressable>
              </View>
            </Pressable>
          );
        }}
      />

      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Filter Categories</Text>
            {['All', 'Tech', 'Sports', 'Cultural'].map((cat) => (
              <Pressable 
                key={cat} 
                style={styles.modalOption} 
                onPress={() => { setFilterCategory(cat); setModalVisible(false); }}
              >
                <Text style={styles.modalOptionText}>{cat}</Text>
              </Pressable>
            ))}
            <Pressable style={styles.closeBtn} onPress={() => setModalVisible(false)}>
              <Text style={styles.closeBtnText}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f5f5f5' },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#333' },
  filterBtn: { flexDirection: 'row', backgroundColor: '#2e7d32', padding: 8, borderRadius: 8, alignItems: 'center' },
  filterText: { color: '#fff', marginLeft: 4, fontWeight: '600' },
  card: { backgroundColor: '#fff', borderRadius: 10, marginBottom: 16, overflow: 'hidden', elevation: 2 },
  image: { width: '100%', height: 140 },
  cardContent: { padding: 12 },
  title: { fontSize: 16, fontWeight: 'bold', color: '#222' },
  date: { fontSize: 12, color: '#666', marginVertical: 4 },
  bookmarkBtn: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
  bookmarkText: { color: '#2e7d32', marginLeft: 4, fontWeight: '600' },
  modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
  modalContent: { width: '80%', backgroundColor: '#fff', padding: 20, borderRadius: 10, alignItems: 'center' },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 15 },
  modalOption: { padding: 12, width: '100%', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#eee' },
  modalOptionText: { fontSize: 16, color: '#333' },
  closeBtn: { marginTop: 15, backgroundColor: '#d32f2f', padding: 10, borderRadius: 5, width: '100%', alignItems: 'center' },
  closeBtnText: { color: '#fff', fontWeight: 'bold' }
});