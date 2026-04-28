import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity, StatusBar } from 'react-native';
import { Ionicons, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

type HistoryItem = {
  id: string;
  date: string;
  hour: string;
  co_concentration: number;
  co_level: string;
};

const HistoryScreen = () => {
  const router = useRouter();
  const [historyData, setHistoryData] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setHistoryData([
        { id: '1', date: '2025-04-10', hour: '14:30', co_concentration: 35, co_level: 'Moderado' },
        { id: '2', date: '2025-04-10', hour: '13:00', co_concentration: 12, co_level: 'Baixo' },
        { id: '3', date: '2025-04-09', hour: '19:00', co_concentration: 80, co_level: 'Alto' },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const renderItem = ({ item }: { item: HistoryItem }) => (
    <View style={styles.card}>
      <View style={styles.cardRow}>
        <Ionicons name="calendar" size={20} color="#1C7C7D" />
        <Text style={styles.cardText}>{item.date}</Text>
      </View>
      <View style={styles.cardRow}>
        <Ionicons name="time" size={20} color="#1C7C7D" />
        <Text style={styles.cardText}>{item.hour}</Text>
      </View>
      <View style={styles.cardRow}>
        <FontAwesome5 name="wind" size={20} color="#1C7C7D" />
        <Text style={styles.cardText}>CO: {item.co_concentration} ppm</Text>
      </View>
      <View style={styles.cardRow}>
        <MaterialCommunityIcons name="chart-line" size={20} color="#1C7C7D" />
        <Text style={styles.cardText}>Nível: {item.co_level}</Text>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#1C7C7D" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.containerTitle}>
      <TouchableOpacity onPress={() => router.push('/monitoring')} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="#1C7C7D" />
      </TouchableOpacity>
        <Text style={styles.title}>Histórico</Text>
      </View>

      <FlatList
        data={historyData}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F6F8',
    padding: 16,
  },
  backButton: {
    backgroundColor: '#F2F6F8',
    padding: 8,
    borderRadius: 8,
    alignSelf: 'flex-start'
  },
  containerTitle: {
    marginVertical: 20,
    alignItems: 'center',
    flexDirection: 'row',
  },
  title: {
    fontSize: 24,
    color: '#1C7C7D',
    marginLeft: 100,
  },
  card: {
    backgroundColor: '#F2F2F2',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardText: {
    marginLeft: 8,
    fontSize: 16,
  },
});

export default HistoryScreen;
