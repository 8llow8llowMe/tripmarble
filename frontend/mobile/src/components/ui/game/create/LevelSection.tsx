import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Chip from './Chip';
import { palette } from '@/constants/colors';

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
      <Text style={styles.title}>게임 난이도를 선택해주세요</Text>
      <Text style={styles.subtitle}>일정에 맞춰 알맞은 난이도를 선택하세요!</Text>

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
  section: { paddingHorizontal: 20, paddingTop: 14 },
  title: { fontSize: 20, fontWeight: '700', color: palette.Neutral800 },
  subtitle: { marginTop: 14, fontSize: 15, color: palette.gray600 },

  row: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
});
