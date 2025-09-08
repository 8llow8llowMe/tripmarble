import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

type Props = {
  value: number; // supports 0.5 steps
  onChange: (next: number) => void;
  size?: number; // star size
};

function Star({ filledPercent = 45, size = 24 }: { filledPercent: 0 | 45 | 100; size?: number }) {
  return (
    <View style={{ width: size + 4, height: size + 4, position: 'relative' }}>
      <Text style={{ fontSize: size, color: '#e5e7eb', textAlign: 'center' }}>★</Text>
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: `${filledPercent}%`,
          height: '100%',
          overflow: 'hidden',
          transform: [{ translateX: filledPercent === 45 ? 2 : 0 }],
        }}
        pointerEvents="none"
      >
        <Text style={{ fontSize: size, color: '#f59e0b', textAlign: 'center' }}>★</Text>
      </View>
    </View>
  );
}

export default function StarRating({ value, onChange, size = 24 }: Props) {
  const percents: (0 | 45 | 100)[] = [1, 2, 3, 4, 5].map((i) => {
    const diff = value - (i - 1);
    if (diff >= 1) return 100;
    if (diff >= 0.5) return 45;
    return 0;
  }) as (0 | 45 | 100)[];

  return (
    <View style={styles.row}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Pressable
          key={i}
          onPress={(e) => {
            const half = e.nativeEvent.locationX <= size / 2 ? 0.5 : 1;
            const next = i - (half === 0.5 ? 0.5 : 0);
            onChange(next);
          }}
          style={{
            width: size + 4,
            height: size + 4,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          hitSlop={8}
        >
          <Star filledPercent={percents[i - 1]} size={size} />
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: 2, marginBottom: 6, alignItems: 'center' },
});
