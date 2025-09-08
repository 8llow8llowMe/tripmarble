import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

type Tab = 'timeline' | 'guide';

type Props = {
  value: Tab;
  onChange: (next: Tab) => void;
};

export default function GameDetailTabs({ value, onChange }: Props) {
  return (
    <View style={styles.tabBar}>
      <TouchableOpacity
        style={[styles.tabItem, value === 'timeline' && styles.tabItemActive]}
        onPress={() => onChange('timeline')}
      >
        <Text style={[styles.tabText, value === 'timeline' && styles.tabTextActive]}>
          타임 라인
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.tabItem, value === 'guide' && styles.tabItemActive]}
        onPress={() => onChange('guide')}
      >
        <Text style={[styles.tabText, value === 'guide' && styles.tabTextActive]}>게임 방법</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: { flexDirection: 'row', gap: 8, marginTop: 12, marginBottom: 4 },
  tabItem: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#E5E7EB',
    backgroundColor: '#F9FAFB',
    alignItems: 'center',
  },
  tabItemActive: { backgroundColor: '#EEF2FF', borderColor: '#C7D2FE' },
  tabText: { fontSize: 14, color: '#6B7280', fontWeight: '600' },
  tabTextActive: { color: '#374151' },
});
