import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Chip from './Chip';
import { palette } from '@/constants/colors';

type Props = {
  onLayout?: (e: any) => void;
  startedAt: string | null;
  endedAt: string | null;
  onSelectRange: (start: string, end: string) => void;
  onNext?: () => void;
  minHeight: number;
};

const PRESETS: Array<[string, string]> = [
  ['2025-08-20', '2025-08-22'],
  ['2025-09-01', '2025-09-03'],
];

export default function DateSection({
  onLayout,
  startedAt,
  endedAt,
  onSelectRange,
  onNext,
  minHeight,
}: Props) {
  const isActive = (s: string, e: string) => startedAt === s && endedAt === e;

  return (
    <View onLayout={onLayout} style={[styles.section, { minHeight }]}>
      <Text style={styles.title}>여행 기간을 선택해주세요</Text>
      <Text style={styles.subtitle}>시작일과 종료일을 모두 선택해요</Text>

      <View style={styles.placeholderBox}>
        <Text style={styles.placeholderText}>📅 캘린더 자리 (추후 연결)</Text>
      </View>

      <View style={styles.row}>
        {PRESETS.map(([s, e]) => (
          <Chip
            key={s}
            label={`${s} ~ ${e}`}
            active={isActive(s, e)}
            onPress={() => {
              onSelectRange(s, e);
              onNext?.();
            }}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: { paddingHorizontal: 20, paddingTop: 14 },
  title: { fontSize: 20, fontWeight: '700', color: palette.Neutral800 },
  subtitle: { marginTop: 14, fontSize: 15, color: palette.gray600 },

  placeholderBox: {
    height: 260,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#FAFAFA',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 8,
  },
  placeholderText: { color: '#6B7280' },
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
});
