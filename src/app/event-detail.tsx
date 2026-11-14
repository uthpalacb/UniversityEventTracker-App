// src/app/event-detail.tsx
import { useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text, View, Image } from 'react-native';

export default function EventDetailScreen() {
  const item = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Image source={{ uri: item.image as string }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.category}>Category: {item.category}</Text>
        <Text style={styles.date}>Date: {item.date}</Text>
        <Text style={styles.location}>Location: {item.location}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  image: { width: '100%', height: 220 },
  content: { padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', color: '#222', marginBottom: 8 },
  category: { fontSize: 14, color: '#2e7d32', fontWeight: '600', marginBottom: 4 },
  date: { fontSize: 14, color: '#666', marginBottom: 4 },
  location: { fontSize: 14, color: '#666', marginBottom: 12 },
  description: { fontSize: 16, color: '#444', lineHeight: 22 }
});