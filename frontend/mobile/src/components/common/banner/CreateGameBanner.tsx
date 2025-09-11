import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // 없으면 아이콘 제거하고 사용해도 됨

type Props = {
  onPress: () => void;
};

export default function CreateGameBanner({ onPress }: Props) {
  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>새 게임을 시작해요</Text>
        <Text style={styles.subtitle}>목적지와 테마를 고르면 여행이 시작돼요</Text>
        <Pressable style={styles.btn} onPress={onPress}>
          <Text style={styles.btnText}>새 게임 만들기</Text>
          {Ionicons ? <Ionicons name="arrow-forward" size={18} color="#111827" /> : null}
        </Pressable>
      </View>
      <View style={styles.badge}>
        <Text style={styles.badgeText}>NEW</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#EEF2FF',
    borderRadius: 16,
    marginHorizontal: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#f4f6ff',
    overflow: 'hidden',
  },
  title: { fontSize: 18, fontWeight: '800', color: '#111827' },
  subtitle: { fontSize: 13, color: '#6B7280', marginTop: 4, marginBottom: 12 },
  btn: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 999,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  btnText: { color: '#111827', fontWeight: '800' },
  badge: {
    position: 'absolute',
    right: 12,
    top: 12,
    backgroundColor: '#3B82F6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
  },
  badgeText: { color: '#fff', fontWeight: '800', fontSize: 10, letterSpacing: 0.5 },
});
