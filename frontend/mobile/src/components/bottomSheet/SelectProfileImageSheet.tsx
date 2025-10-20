import React from 'react';
import { StyleSheet, View } from 'react-native';
import { BottomSheetView } from '@gorhom/bottom-sheet';
import TextBox from '@/components/atom/TextBox';
import { palette } from '@/constants/colors';
import ActionItem from '@/components/item/ActionItem';

interface SelectProfileImageSheetProps {
  onPickImage?: () => void;
  onTakePhoto?: () => void;
  onDeleteImage?: () => void;
}

const SelectProfileImageSheet = ({
  onPickImage,
  onTakePhoto,
  onDeleteImage,
}: SelectProfileImageSheetProps) => {
  return (
    <BottomSheetView style={styles.container}>
      <TextBox size={16} fontsName="Pretendard700" style={{ alignSelf: 'center' }}>
        프로필 사진 선택
      </TextBox>

      <View style={styles.list}>
        <ActionItem label="앨범" iconName="images-outline" onPress={onPickImage} />
        <ActionItem label="카메라" iconName="camera-outline" onPress={onTakePhoto} />
      </View>
      <View style={styles.list}>
        <ActionItem
          label="현재 사진 삭제"
          textColor="#F63D68"
          iconName="trash-outline"
          iconColor="#F63D68"
          onPress={onDeleteImage}
        />
      </View>
    </BottomSheetView>
  );
};

export default SelectProfileImageSheet;

const styles = StyleSheet.create({
  container: {
    backgroundColor: palette.white,
    padding: 16,
    gap: 16,
  },
  list: {
    backgroundColor: palette.white,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: palette.gray200,
    overflow: 'hidden',
  },
});
