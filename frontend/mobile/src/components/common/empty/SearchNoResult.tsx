import TextBox from '@/components/atom/TextBox';
import { palette } from '@/constants/colors';

import React from 'react';
import { View, StyleSheet } from 'react-native';

interface IProps {
  text: string;
}

const SearchNoResult = ({ text }: IProps) => {
  return (
    <View style={styles.container}>
      <TextBox size={14} fontsName="Pretendard600" color={palette.gray400}>
        {text}
      </TextBox>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default SearchNoResult;
