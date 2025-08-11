import React from 'react';
import { View, StyleSheet } from 'react-native';
import Section from './Section';
import Chip from './Chip';

type Props = {
  value?: string | null;
  onSelect: (lv: string) => void;
  onNext?: () => void;
};

const LEVELS = ['쉬움', '보통', '어려움'];

export default function LevelSection({ value, onSelect, onNext }: Props) {
  return (
    <Section title="난이도">
      <View style={styles.row}>
        {LEVELS.map((lv) => (
          <Chip
            key={lv}
            label={lv}
            active={value === lv}
            onPress={() => {
              onSelect(lv);
              onNext?.();
            }}
          />
        ))}
      </View>
    </Section>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
});
