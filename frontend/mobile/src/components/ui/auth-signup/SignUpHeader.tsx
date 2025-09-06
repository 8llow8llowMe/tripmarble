import React from 'react';
import { View, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { palette } from '@/constants/colors';

export default function SignUpHeader({
  step,
  total,
  onPrev,
}: {
  step: number; // 현재 진행 step
  total: number; // 전체 step 수
  onPrev: () => void;
}) {
  // 비율 계산
  const progress = step / total;

  return (
    <View style={styles.wrap}>
      <TouchableOpacity onPress={onPrev} style={styles.backButton}>
        <Ionicons name="chevron-back" size={28} color={palette.gray600} />
      </TouchableOpacity>
      <View style={styles.lineWrap}>
        <View style={[styles.lineBlack, { flex: progress }]} />
        <View style={[styles.lineLight, { flex: 1 - progress }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: palette.white,
    paddingHorizontal: 16,
    paddingBottom: 2,
  },
  backButton: {
    marginBottom: 16,
    width: 40,
    height: 32,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  lineWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 4, // 라인 두께 (이미지처럼 굵게)
    marginBottom: 18, // 타이틀과 여백
  },
  lineBlack: {
    backgroundColor: palette.gray800,
    borderRadius: 2,
    height: 4,
  },
  lineLight: {
    backgroundColor: palette.gray100,
    borderRadius: 2,
    height: 4,
  },
});
