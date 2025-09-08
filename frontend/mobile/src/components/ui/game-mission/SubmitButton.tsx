import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import { palette } from '@/constants/colors';

type Props = {
  disabled?: boolean;
  loading?: boolean;
  onPress: () => void | Promise<void>;
  style?: StyleProp<ViewStyle>;
};

export default function SubmitButton({ disabled, loading, onPress, style }: Props) {
  return (
    <TouchableOpacity
      style={[styles.actionPrimary, style, disabled && { opacity: 0.5 }]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={styles.actionPrimaryText}>{loading ? '제출 중…' : '제출'}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  actionPrimary: {
    backgroundColor: palette.completeText,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 8,
    marginBottom: 20,
  },
  actionPrimaryText: { color: palette.white, fontWeight: '700' },
});
