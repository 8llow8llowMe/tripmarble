import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

type Props = {
  label: string;
  onPress: () => void;
  disabled?: boolean;
};

export default function Next({ label, onPress, disabled }: Props) {
  return (
    <TouchableOpacity
      style={[styles.nextBtn, disabled && styles.nextBtnDisabled]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={[styles.nextBtnText, disabled && styles.nextBtnTextDisabled]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  nextBtn: {
    marginTop: 18,
    height: 48,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  nextBtnDisabled: { opacity: 0.4 },
  nextBtnText: { fontSize: 16, color: '#111827' },
  nextBtnTextDisabled: { color: '#9CA3AF' },
});
