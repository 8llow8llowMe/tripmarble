import { palette } from '@/constants/colors';
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

type Props = {
  total: number;
  activeIndex: number;
  onPressDot?: (i: number) => void;
};

export default function StepDots({ total, activeIndex, onPressDot }: Props) {
  return (
    <View style={styles.dotsWrap}>
      <View style={styles.dotsLine} />
      <View style={styles.dotsRow}>
        {Array.from({ length: total }).map((_, i) => {
          const isActive = i === activeIndex;
          const isDone = i < activeIndex;
          return (
            <TouchableOpacity key={i} onPress={() => onPressDot?.(i)} activeOpacity={0.8}>
              <View style={[styles.dot, isActive && styles.dotActive, isDone && styles.dotDone]}>
                {isDone ? <Text style={styles.dotCheck}>✓</Text> : null}
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  dotsWrap: { paddingVertical: 10, backgroundColor: palette.white },
  dotsLine: {
    position: 'absolute',
    top: 22,
    left: 24,
    right: 24,
    height: 2,
    backgroundColor: '#E5E7EB',
  },
  dotsRow: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20 },
  dot: {
    width: 16,
    height: 16,
    borderRadius: 999,
    borderWidth: 2,
    borderColor: '#CBD5E1',
    backgroundColor: palette.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dotActive: { borderColor: palette.mainColor, backgroundColor: palette.mainColor },
  dotDone: { borderColor: palette.currentCheck, backgroundColor: palette.currentCheck },
  dotCheck: { color: palette.white, fontSize: 10, fontWeight: '800' },
});
