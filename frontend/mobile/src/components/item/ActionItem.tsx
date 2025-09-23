import TextBox from '@/components/atom/TextBox';
import { palette } from '@/constants/colors';

import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';

interface ActionItemProps {
  label: string; // 항목 텍스트
  iconName?: string; // 아이콘 이름
  textColor?: string; // 아이콘 색상
  onPress?: () => void; // 클릭 이벤트
  ActionTestID?: string;
}

const ActionItem = ({ label, iconName, textColor, onPress, ActionTestID }: ActionItemProps) => (
  <TouchableOpacity onPress={onPress} testID={ActionTestID}>
    <View style={styles.item}>
      <TextBox size={14} fontsName="Pretendard600" color={textColor || palette.black}>
        {label}
      </TextBox>

      {/* {iconName && <MIcon name={iconName} width={20} height={20} />} */}
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: palette.gray50,
    borderRadius: 8,
  },
});

export default ActionItem;
