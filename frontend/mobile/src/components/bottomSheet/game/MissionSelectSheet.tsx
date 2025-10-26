import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { palette } from '@/constants/colors';
import GameSheetHeader from '@/components/ui/game-mission/GameSheetHeader';
import { BottomSheetView } from '@gorhom/bottom-sheet';
import TextBox from '@/components/atom/TextBox';
import ActionItem from '@/components/item/ActionItem';

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
      <TextBox size={16} fontsName="Pretendard700" style={{ alignSelf: 'center' }}>
        미션 인증 방식 선택
      </TextBox>
      <View style={styles.list}>
        <ActionItem label="리뷰 작성 인증" iconName="images-outline" onPress={onSelectReview} />
        <ActionItem label="현재 위치 인증" iconName="images-outline" onPress={onSelectLocation} />
      </View>
    </BottomSheetView>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: palette.white, padding: 16, gap: 16 },
  list: {
    backgroundColor: palette.white,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: palette.gray200,
    overflow: 'hidden',
  },
});
