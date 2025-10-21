import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { palette } from '@/constants/colors';
import GameSheetHeader from '@/components/ui/game-mission/GameSheetHeader';
import { BottomSheetView } from '@gorhom/bottom-sheet';

interface Props {
  tile: any;
  onStartMission: () => void;
  isCurrentTile: boolean;
}

export default function GameInfoSheet({ tile, onStartMission, isCurrentTile }: Props) {
  return (
    <BottomSheetView style={styles.container}>
      <GameSheetHeader title={tile?.tripSpotName || '여행지 정보'} />
      <View style={styles.body}>
        <Text style={styles.meta}>단계: Step {tile?.stepNo ?? '-'}</Text>
        <Text style={styles.meta}>tripSpotId: {tile?.tripSpotId ?? '-'}</Text>

        {isCurrentTile && (
          <TouchableOpacity style={styles.button} onPress={onStartMission}>
            <Text style={styles.buttonText}>미션 인증하기</Text>
          </TouchableOpacity>
        )}
      </View>
    </BottomSheetView>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: palette.white, flex: 1 },
  body: { padding: 20 },
  desc: { fontSize: 16, marginBottom: 10, color: palette.black },
  meta: { color: palette.gray600, marginBottom: 4 },
  button: {
    marginTop: 20,
    backgroundColor: palette.mainColor,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontWeight: '700', fontSize: 16 },
});
