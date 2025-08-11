import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Section, Chip } from './index';

type Theme = { id: number; name: string };

type Props = {
  themes: Theme[];
  selectedIds: number[];
  onToggle: (id: number) => void;
  onFirstSelectNext?: () => void; // 첫 선택 시 다음으로
};

export default function ThemeSection({ themes, selectedIds, onToggle, onFirstSelectNext }: Props) {
  return (
    <Section title="여행 테마">
      <View style={styles.row}>
        {themes.map((t) => {
          const active = selectedIds.includes(t.id);
          return (
            <Chip
              key={t.id}
              label={t.name}
              active={active}
              onPress={() => {
                const wasEmpty = selectedIds.length === 0 && !active;
                onToggle(t.id);
                if (wasEmpty) onFirstSelectNext?.();
              }}
            />
          );
        })}
      </View>
    </Section>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
});
