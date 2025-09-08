import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { palette } from '@/constants/colors';

type Props = {
  title: string;
  onClose: () => void;
};

export default function GameSheetHeader({ title, onClose }: Props) {
  return (
    <View style={styles.header}>
      <Text style={styles.title} numberOfLines={2}>
        {title}
      </Text>
      <TouchableOpacity onPress={onClose} accessibilityLabel="닫기">
        <Text style={styles.close}>✕</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: palette.black,
    flex: 1,
    paddingRight: 8,
  },
  close: { fontSize: 22, color: palette.gray500 },
});
