import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Section from './Section';

type Props = {
  location?: string | null;
  themes: string[];
  dates: { start?: string; end?: string };
  level?: string | null;
  onSubmit: () => void;
  disabled?: boolean;
  onToTop?: () => void;
};

export default function SummarySection({
  location,
  themes,
  dates,
  level,
  onSubmit,
  disabled,
  onToTop,
}: Props) {
  return (
    <Section title="요약">
      <View style={styles.card}>
        <Text style={styles.title}>선택 요약</Text>
        <Text style={styles.item}>여행지: {location ?? '-'}</Text>
        <Text style={styles.item}>테마: {themes.length ? themes.join(', ') : '-'}</Text>
        <Text style={styles.item}>
          기간: {dates.start && dates.end ? `${dates.start} ~ ${dates.end}` : '-'}
        </Text>
        <Text style={styles.item}>난이도: {level ?? '-'}</Text>
      </View>

      <TouchableOpacity
        style={[styles.primaryBtn, disabled && { opacity: 0.4 }]}
        disabled={disabled}
        onPress={onSubmit}
      >
        <Text style={styles.primaryBtnText}>게임 만들기</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.toTopBtn} onPress={onToTop}>
        <Text style={styles.toTopText}>맨 위로</Text>
      </TouchableOpacity>
    </Section>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 16,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 16,
  },
  title: { fontSize: 16, fontWeight: '700', marginBottom: 10, color: '#0F172A' },
  item: { fontSize: 14, color: '#334155', marginBottom: 4 },

  primaryBtn: {
    height: 52,
    borderRadius: 14,
    backgroundColor: '#4BA1FD',
    justifyContent: 'center',
    alignItems: 'center',
  },
  primaryBtnText: { color: '#fff', fontSize: 16, fontWeight: '700' },

  toTopBtn: { alignSelf: 'center', marginTop: 16, paddingVertical: 8, paddingHorizontal: 12 },
  toTopText: { color: '#64748B' },
});
