import TextBox from '@/components/atom/TextBox';

import { palette } from '@/constants/colors';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export type TabHeaderType = 'PlayTab' | 'MomentsTab' | 'ProfileTab';

interface TabHeaderProps {
  type: TabHeaderType;
  showBorderBottom?: boolean;
}

const TabHeader = ({ type, showBorderBottom = false }: TabHeaderProps) => {
  const { top } = useSafeAreaInsets();

  const showTitle = () => {
    switch (type) {
      case 'PlayTab':
        return '게임';
      case 'MomentsTab':
        return '히스토리';
      case 'ProfileTab':
        return '내 프로필';
    }
  };
  const title = showTitle();

  return (
    <View
      style={[
        {
          height: 54 + top,
          paddingTop: top,
          backgroundColor: palette.white,
          borderBottomWidth: showBorderBottom ? 1 : 0,
          borderBottomColor: palette.gray100,
        },
      ]}
    >
      <View style={styles.container}>
        <TextBox
          size={22}
          fontsName="Pretendard600"
          color={palette.gray800}
          style={{ fontWeight: 600 }}
        >
          {title}
        </TextBox>
      </View>
    </View>
  );
};

export default TabHeader;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: palette.white,
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
