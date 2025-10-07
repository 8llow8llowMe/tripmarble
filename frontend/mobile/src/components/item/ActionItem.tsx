import TextBox from '@/components/atom/TextBox';
import { palette } from '@/constants/colors';
import { Ionicons } from '@expo/vector-icons';

import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';

type IoniconName = React.ComponentProps<typeof Ionicons>['name'];

interface ActionItemProps {
  label: string; // 항목 텍스트
  textColor?: string; // 텍스트 색상
  iconName?: IoniconName; // 아이콘 이름
  iconColor?: string; // 아이콘 색상
  onPress?: () => void; // 클릭 이벤트
  ActionTestID?: string;
}

const ActionItem = ({
  label,
  textColor,
  iconName,
  iconColor,
  onPress,
  ActionTestID,
}: ActionItemProps) => (
  <TouchableOpacity onPress={onPress} testID={ActionTestID}>
    <View style={styles.item}>
      <TextBox size={14} fontsName="Pretendard600" color={textColor || palette.black}>
        {label}
      </TextBox>

      {iconName && <Ionicons name={iconName} size={20} color={iconColor || palette.black} />}
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
