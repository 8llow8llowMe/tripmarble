import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { GamePlayStackParamList } from '@/types/navigation/navigation';

type Props = NativeStackScreenProps<GamePlayStackParamList, 'GameOverviewScreen'>;

export default function GameOverviewScreen({ route }: Props) {
  const { tripGameId } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>게임 개요 스크린 (종료된 게임 스크린으로 씁니다.)</Text>
      <Text>gameId: {tripGameId}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  title: { fontSize: 20, fontWeight: '600', marginBottom: 12 },
  gap: { height: 16 },
  space: { height: 8 },
});
