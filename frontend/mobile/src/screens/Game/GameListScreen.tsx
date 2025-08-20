import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { GamePlayStackParamList } from '@/types/navigation/navigation';

type Props = NativeStackScreenProps<GamePlayStackParamList, 'GameListScreen'>;

export default function GameListScreen({ route }: Props) {
  const status = route.params?.status;

  //TODO: status 에 따라 필터링 (status: undefined 인 경우는 전체조회(default))

  return (
    <View style={styles.container}>
      <Text style={styles.title}>게임 리스트 (상태별로 칩 필터를 걸어 확인가능하도록 합니다.)</Text>
      <Text>status: {status}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  title: { fontSize: 20, fontWeight: '600', marginBottom: 12 },
  gap: { height: 16 },
  space: { height: 8 },
});
