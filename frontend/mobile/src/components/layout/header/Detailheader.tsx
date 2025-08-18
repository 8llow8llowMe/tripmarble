import TextBox from '@/components/atom/TextBox';
import { palette } from '@/constants/colors';
import useHeaderHeight from '@/hooks/useHeaderHeight';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';

interface DetailheaderProps {
  title: string | undefined;
  showBottomBorder?: boolean;
  showBackButton?: boolean;
}

const Detailheader = ({
  title,
  showBottomBorder = true,
  showBackButton = true,
}: DetailheaderProps) => {
  const { headerHeight, paddingTop } = useHeaderHeight();
  const navigation = useNavigation<any>();

  return (
    <View
      style={[
        styles.headerContainer,
        {
          height: headerHeight + 10,
          paddingTop: paddingTop,
          borderBottomWidth: showBottomBorder ? 1 : 0,
          borderBottomColor: showBottomBorder ? palette.gray100 : '',
        },
      ]}
    >
      {!showBackButton ? (
        <View style={{ width: 24 }} />
      ) : (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#555" />
        </TouchableOpacity>
      )}

      <TextBox size={16} fontsName="Pretendard700" style={styles.title}>
        {title}
      </TextBox>

      <View style={{ width: 24 }} />
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    paddingHorizontal: 16,
    backgroundColor: palette.white,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: palette.gray100,
  },

  title: {
    flex: 1,
    textAlign: 'center', // 제목 중앙 정렬
    fontWeight: '700',
  },
});
export default Detailheader;
