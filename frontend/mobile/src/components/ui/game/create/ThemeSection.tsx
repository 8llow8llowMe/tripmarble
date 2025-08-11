import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Chip from './Chip';

type Theme = { contentTypeId: number; contentTypeName: string };

type ThemeSectionProps = {
  onLayout?: (e: any) => void;
  themes: Theme[];
  selectedIds: number[];
  onToggle: (id: number) => void;
  onFirstSelectNext?: () => void; // 첫 선택 시 다음으로
  minHeight: number;
};

const ThemeSection = ({
  onLayout,
  themes,
  selectedIds,
  onToggle,
  onFirstSelectNext,
  minHeight,
}: ThemeSectionProps) => {
  return (
    <View onLayout={onLayout} style={[styles.section, minHeight ? { minHeight } : null]}>
      <Text style={styles.sectionTitle}>여행 테마 선택</Text>

      <View style={styles.row}>
        {themes.map((t) => {
          const active = selectedIds.includes(t.contentTypeId);
          return (
            <Chip
              key={t.contentTypeId}
              label={t.contentTypeName}
              active={active}
              onPress={() => {
                const wasEmpty = selectedIds.length === 0 && !active;
                onToggle(t.contentTypeId);
                if (wasEmpty) onFirstSelectNext?.();
              }}
            />
          );
        })}
      </View>
    </View>
  );
};

export default ThemeSection;

const styles = StyleSheet.create({
  section: {
    paddingHorizontal: 20,
    paddingTop: 14,
    paddingBottom: 28,
  },
  sectionTitle: { fontSize: 20, fontWeight: '700', color: '#0F172A', marginBottom: 14 },

  row: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
});
