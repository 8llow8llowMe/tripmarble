import { palette } from '@/constants/colors';
import { FontKeys, fonts } from '@/constants/fonts';

import React from 'react';
import { Text, StyleSheet, TextProps, useColorScheme } from 'react-native';

interface TextBoxProps extends TextProps {
  fontsName?: FontKeys;
  size: number;
  _lineHeight?: number;
  color?: string;
  testID?: string;
  _textDecorationLine?: string;
}

const TextBox: React.FC<TextBoxProps> = ({
  fontsName,
  size,
  _lineHeight,
  color,
  children,
  style,
  testID,
  _textDecorationLine,
  ...props
}) => {
  const scheme = useColorScheme(); // Detect system color scheme
  const isDarkMode = scheme === 'dark';

  const dynamicStyles = {
    fontFamily: fonts[fontsName || 'Pretendard400'],
    fontSize: size,
    lineHeight: _lineHeight ? _lineHeight * size : size * 1.3,
    color: color || (isDarkMode ? palette.Neutral800 : palette.Neutral800),
  };

  const underlineStyle = _textDecorationLine
    ? {
        borderBottomWidth: 1,
        borderBottomColor: color || palette.Neutral800,
      }
    : {};

  return (
    <Text style={[styles.text, dynamicStyles, underlineStyle, style]} {...props} testID={testID}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 14, // 기본 폰트 크기 설정
    fontFamily: 'Pretendard-Regular', // 기본 폰트 패밀리 설정
    color: palette.Neutral800, // 기본 색상 설정
  },
});

export default TextBox;
