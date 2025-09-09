import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function QuickFilterSection() {
  const filters = [
    { icon: '🏖', label: '바다' },
    { icon: '⛰', label: '산' },
    { icon: '☕', label: '카페' },
    { icon: '🏛', label: '역사' },
    { icon: '🍜', label: '맛집' },
  ];

  return (
    <View style={styles.container}>
      {filters.map((f, idx) => (
        <TouchableOpacity key={idx} style={styles.item} activeOpacity={0.8}>
          <Text style={styles.icon}>{f.icon}</Text>
          <Text style={styles.label}>{f.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', justifyContent: 'space-around', marginVertical: 20 },
  item: { alignItems: 'center' },
  icon: { fontSize: 28 },
  label: { marginTop: 6, fontSize: 13, color: '#333' },
});
