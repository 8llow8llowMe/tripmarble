import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

type Props = {
  label: string;
  onPress?: () => void;
  active?: boolean;
};

export default function Chip({ label, onPress, active }: Props) {
  return (
    <TouchableOpacity
      style={[styles.chip, active && styles.chipActive]}
      onPress={onPress}
      activeOpacity={0.95}
    >
      <Text style={[styles.chipText, active && styles.chipTextActive]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  chip: {
    paddingHorizontal: 16,
    height: 40,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
    marginRight: 10,
    marginBottom: 10,
  },
  chipActive: { borderColor: '#4BA1FD', backgroundColor: '#E8F3FF' },
  chipText: { fontSize: 15, color: '#111827' },
  chipTextActive: { color: '#0F172A', fontWeight: '700' },
});
