import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { GamePlayStackParamList } from '@/types/navigation/navigation';

type Props = NativeStackScreenProps<GamePlayStackParamList, 'GameOverviewScreen'>;

export default function GameOverviewScreen({ route, navigation }: Props) {
  const { tripGameId } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Board (Stub)</Text>
      <Text>gameId: {tripGameId}</Text>

      <View style={styles.gap} />
      <Button title="📍 위치로 인증 (modal)" />
      <View style={styles.space} />
      <Button title="📷 사진으로 인증 (modal)" />

      <View style={styles.gap} />
      <Button title="⬅︎ 뒤로가기" onPress={() => navigation.goBack()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  title: { fontSize: 20, fontWeight: '600', marginBottom: 12 },
  gap: { height: 16 },
  space: { height: 8 },
});
