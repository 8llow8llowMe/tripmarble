import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Section, Chip } from './index';

type Props = {
  value: { start?: string; end?: string };
  onSelectRange: (start: string, end: string) => void;
  onNext?: () => void;
};

const PRESETS: Array<[string, string]> = [
  ['2025-08-20', '2025-08-22'],
  ['2025-09-01', '2025-09-03'],
];

export default function DateSection({ value, onSelectRange, onNext }: Props) {
  const isActive = (s: string, e: string) => value.start === s && value.end === e;

  return (
    <Section title="여행 기간">
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
    </Section>
  );
}

const styles = StyleSheet.create({
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
