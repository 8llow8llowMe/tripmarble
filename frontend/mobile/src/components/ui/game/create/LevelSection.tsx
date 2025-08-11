import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Chip from './Chip';

type Level = {
  code: string;
  description: string;
};

type LevelSectionProps = {
  onLayout?: (e: any) => void;
  onNext?: () => void;
  levels: Level[]; // ⬅️ 상위에서 주입
  selectedCode: string | null; // ⬅️ 상위 상태
  onSelect: (code: string) => void; // ⬅️ 상위로 올리기
  minHeight: number;
};

const LevelSection = ({
  onLayout,
  levels,
  selectedCode,
  onSelect,
  onNext,
  minHeight,
}: LevelSectionProps) => {
  return (
    <View onLayout={onLayout} style={[styles.section, minHeight ? { minHeight } : null]}>
      <Text style={styles.sectionTitle}>난이도 선택</Text>

      <View style={styles.row}>
        {levels.map(({ code, description }) => (
          <Chip
            key={code}
            label={description}
            active={selectedCode === code}
            onPress={() => {
              onSelect(code);
              onNext?.();
            }}
          />
        ))}
      </View>
    </View>
  );
};

export default LevelSection;

const styles = StyleSheet.create({
  section: {
    paddingHorizontal: 20,
    paddingTop: 14,
  },
  sectionTitle: { fontSize: 20, fontWeight: '700', color: '#0F172A', marginBottom: 14 },

  row: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
});
