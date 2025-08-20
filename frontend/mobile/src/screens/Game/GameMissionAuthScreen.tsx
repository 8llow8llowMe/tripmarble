import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { GamePlayStackParamList } from '@/types/navigation/navigation';

type Props = NativeStackScreenProps<GamePlayStackParamList, 'GameMissionAuthScreen'>;

export default function GameMissionAuthScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>게임 각 타일에 대하여 미션 인증 스크린입니다.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  title: { fontSize: 20, fontWeight: '600', marginBottom: 12 },
  gap: { height: 16 },
  space: { height: 8 },
});
