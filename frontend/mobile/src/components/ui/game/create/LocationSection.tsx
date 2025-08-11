import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Section, Chip } from './index';

type LocationValue = { id: number; name: string } | null;

type Props = {
  value: LocationValue;
  onSelect: (loc: { id: number; name: string }) => void;
  onSearchPress: () => void;
  onNext?: () => void; // 선택 시 자동 다음 이동
};

const CANDIDATES = ['제주', '경주', '전주', '부산', '광주', '강릉'];

export default function LocationSection({ value, onSelect, onSearchPress, onNext }: Props) {
  return (
    <Section title="여행지 선택">
      <TouchableOpacity style={styles.searchBar} onPress={onSearchPress} activeOpacity={0.85}>
        <Text style={styles.searchPlaceholder}>{value?.name ?? '여행지 검색'}</Text>
      </TouchableOpacity>

      <View style={styles.row}>
        {CANDIDATES.map((name, idx) => (
          <Chip
            key={name}
            label={name}
            active={value?.name === name}
            onPress={() => {
              onSelect({ id: idx + 1, name });
              onNext?.();
            }}
          />
        ))}
      </View>
    </Section>
  );
}

const styles = StyleSheet.create({
  searchBar: {
    height: 48,
    borderRadius: 14,
    backgroundColor: '#F2F4F7',
    justifyContent: 'center',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  searchPlaceholder: { color: '#9CA3AF', fontSize: 16 },
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
});
