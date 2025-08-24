import TextBox from '@/components/atom/TextBox';

import { palette } from '@/constants/colors';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AppNavigatorNavigationProp } from '@/types/navigation/screen';
import useHeaderHeight from '@/hooks/useHeaderHeight';

export type TabHeaderType = 'HomeTab' | 'ProfileTab';

interface TabHeaderProps {
  type: TabHeaderType;
  showBorderBottom?: boolean;
}

const TabHeader = ({ type, showBorderBottom = false }: TabHeaderProps) => {
  const navigation = useNavigation<AppNavigatorNavigationProp>();
  const { headerHeight, paddingTop } = useHeaderHeight();

  const showTitle = () => {
    switch (type) {
      case 'HomeTab':
        return '홈';
      case 'ProfileTab':
        return '프로필';
    }
  };

  const title = showTitle();

  const goToSettingScreen = () => {
    navigation.navigate('SettingsNavigator', {
      screen: 'SettingsHomeScreen',
    });
  };

  return (
    <View
      style={[
        {
          height: headerHeight,
          paddingTop: paddingTop,
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
        {type === 'ProfileTab' && (
          <TouchableOpacity
            style={{ position: 'absolute', right: 16, top: 8, padding: 8 }}
            onPress={goToSettingScreen}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Ionicons name="settings-outline" size={22} />
          </TouchableOpacity>
        )}
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
