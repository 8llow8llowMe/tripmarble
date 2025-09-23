import TextBox from '@/components/atom/TextBox';
import ActionItem from '@/components/item/ActionItem';
import { palette } from '@/constants/colors';

import React from 'react';
import { View, StyleSheet } from 'react-native';

const SelectProfileImageSheet = () => {
  return (
    <View style={styles.container}>
      <TextBox size={16} fontsName="Pretendard700" style={{ alignSelf: 'center' }}>
        프로필 사진 선택
      </TextBox>
      <View style={styles.list}>
        <ActionItem label="앨범" iconName="GalleryIcon" />
        <ActionItem label="카메라" iconName="CameraIcon" />
      </View>
      <View style={styles.list}>
        <ActionItem label="현재 사진 삭제" iconName="TrashIcon" textColor="#F63D68" />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: palette.white,
    padding: 16,
    gap: 16,
    flex: 1,
  },
  list: {
    backgroundColor: palette.white,
    borderRadius: 8,
  },

  lastItem: {
    backgroundColor: palette.white,
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
});

export default SelectProfileImageSheet;
