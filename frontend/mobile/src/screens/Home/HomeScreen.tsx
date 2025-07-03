import React from 'react';
import { SafeAreaView, ScrollView, View, Text, TextInput, StyleSheet, Image } from 'react-native';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <Text style={styles.welcome}>안녕하세요. 트립마블 님</Text>

        <TextInput placeholder="🔍 여행지 검색" style={styles.searchBox} />

        <Text style={styles.sectionTitle}>추천 여행지</Text>
        <View style={styles.cardRow}>
          <View style={styles.card} />
          <View style={styles.card} />
        </View>

        <Text style={styles.sectionTitle}>내 기록</Text>
        <View style={styles.cardRow}>
          <View style={styles.card} />
          <View style={styles.card} />
        </View>

        <Text style={styles.sectionTitle}>랜덤 여행지 추천 🎯</Text>
        <View style={styles.largeCard}>{/* 여기에 랜덤 이미지 */}</View>

        <Text style={styles.sectionTitle}>오늘의 여행지</Text>
        <View style={styles.largeCard} />

        <Text style={styles.sectionTitle}>날씨 기반 여행지 추천</Text>
        <View style={styles.cardRow}>
          <View style={styles.card} />
          <View style={styles.card} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#fff' },
  container: { padding: 16 },
  welcome: { fontSize: 18, marginBottom: 12 },
  searchBox: {
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    padding: 12,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginVertical: 8,
  },
  cardRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  card: {
    flex: 1,
    height: 100,
    backgroundColor: '#eee',
    borderRadius: 10,
  },
  largeCard: {
    height: 150,
    backgroundColor: '#eee',
    borderRadius: 10,
    marginBottom: 12,
  },
});
