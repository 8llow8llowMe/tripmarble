import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { palette } from '@/constants/colors';
import DotThree from '@assets/icons/dots-three';

type Props = {
  title?: string;
  onBack?: () => void;
  onMenu?: () => void;
};

export default function GameDetailHeader({ title, onBack, onMenu }: Props) {
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={onBack}>
        <Ionicons name="arrow-back" size={28} color="#555" />
      </TouchableOpacity>
      <Text style={styles.headerTitle} numberOfLines={1}>
        {title ?? '@@ 여행'}
      </Text>

      <TouchableOpacity onPress={onMenu} accessibilityRole="button" accessibilityLabel="옵션 열기">
        <DotThree width={24} height={24} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 52,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '700',
    color: palette.black,
    paddingHorizontal: 8,
  },
});
