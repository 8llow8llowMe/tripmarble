import { palette } from '@/constants/colors';
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

type Props = {
  onLayout?: (e: any) => void;
  location: string;
  themes: string[] | null;
  startedAt: string | null;
  endedAt: string | null;
  level?: string | null;
  onSubmit?: () => void;
  disabled?: boolean;
  onToTop?: () => void;
  minHeight: number;
};

const SummarySection = ({
  onLayout,
  location,
  themes,
  startedAt,
  endedAt,
  level,
  onSubmit,
  disabled,
  onToTop,
  minHeight,
}: Props) => {
  return (
    <View onLayout={onLayout} style={[styles.section, minHeight ? { minHeight } : null]}>
      <Text style={styles.title}>선택을 확인하고 게임을 생성해요</Text>
      <Text style={styles.subtitle}>필요하면 위로 올려 수정할 수 있어요</Text>

      <View style={styles.card}>
        <Text style={styles.summaryTitle}>선택 요약</Text>
        <Text style={styles.summaryItem}>여행지: {location}</Text>
        <Text style={styles.summaryItem}>테마: {themes}</Text>
        <Text style={styles.summaryItem}>
          기간: {startedAt && endedAt ? `${startedAt} ~ ${endedAt}` : '-'}
        </Text>
        <Text style={styles.summaryItem}>난이도: {level ?? '-'}</Text>
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
    </View>
  );
};

export default SummarySection;

const styles = StyleSheet.create({
  section: { paddingHorizontal: 20, paddingTop: 14 },
  title: { fontSize: 20, fontWeight: '700', color: palette.Neutral800 },
  subtitle: { marginTop: 14, fontSize: 15, color: palette.gray600 },

  card: {
    padding: 16,
    borderRadius: 16,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginVertical: 16,
  },
  summaryTitle: { fontSize: 16, fontWeight: '700', marginBottom: 10, color: '#0F172A' },
  summaryItem: { fontSize: 14, color: '#334155', marginBottom: 4 },

  primaryBtn: {
    height: 52,
    borderRadius: 14,
    backgroundColor: palette.mainColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  primaryBtnText: { color: palette.white, fontSize: 16, fontWeight: '700' },

  toTopBtn: { alignSelf: 'center', marginTop: 16, paddingVertical: 8, paddingHorizontal: 12 },
  toTopText: { color: '#64748B' },
});
