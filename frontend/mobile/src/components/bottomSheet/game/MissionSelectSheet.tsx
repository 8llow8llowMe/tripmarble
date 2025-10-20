import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { palette } from '@/constants/colors';
import GameSheetHeader from '@/components/ui/game-mission/GameSheetHeader';
import { BottomSheetView } from '@gorhom/bottom-sheet';

interface MissionSelectSheetProps {
  onSelectReview: () => void;
  onSelectLocation: () => void;
}

export default function MissionSelectSheet({
  onSelectReview,
  onSelectLocation,
}: MissionSelectSheetProps) {
  return (
    <BottomSheetView style={styles.container}>
      <View style={styles.body}>
        <Text style={styles.label}>어떤 방식으로 미션을 인증하시겠어요?</Text>

        <TouchableOpacity style={styles.option} onPress={onSelectReview}>
          <Text style={styles.optionIcon}>📸</Text>
          <Text style={styles.optionText}>리뷰 작성 인증</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.option} onPress={onSelectLocation}>
          <Text style={styles.optionIcon}>📍</Text>
          <Text style={styles.optionText}>위치 인증</Text>
        </TouchableOpacity>
      </View>
    </BottomSheetView>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: palette.white, flex: 1 },
  body: { padding: 16 },
  label: { fontSize: 15, color: palette.gray600, marginBottom: 20 },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: palette.gray50,
    paddingVertical: 16,
    paddingHorizontal: 14,
    borderRadius: 8,
    marginBottom: 12,
  },
  optionIcon: { fontSize: 20, marginRight: 8 },
  optionText: { fontSize: 16, fontWeight: '600', color: palette.black },
});
