import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { palette } from '@/constants/colors';

type Props = {
  verified: boolean;
  onVerify: () => void;
};

export default function MissionLocationForm({ verified, onVerify }: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.label}>현재 위치 인증</Text>
      <Text style={styles.helper}>GPS 권한 요청 및 반경 체크는 추후 연결</Text>
      <TouchableOpacity style={styles.secondaryBtn} onPress={onVerify}>
        <Text style={styles.secondaryBtnText}>{verified ? '위치 인증됨 ✓' : '위치 인증하기'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: palette.gray200,
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    backgroundColor: palette.white,
  },
  label: { fontSize: 14, fontWeight: '700', marginBottom: 8, color: palette.gray800 },
  helper: { fontSize: 12, color: palette.gray500, marginBottom: 8 },
  secondaryBtn: {
    alignSelf: 'flex-start',
    backgroundColor: palette.gray100,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  secondaryBtnText: { color: palette.black, fontWeight: '700' },
});
