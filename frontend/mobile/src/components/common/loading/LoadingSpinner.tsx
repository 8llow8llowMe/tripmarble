import TextBox from '@/components/atom/TextBox';
import SafeAreaScreen from '@/components/layout/SafeAreaScreen';
import { colors } from '@/constants/colors';
import React from 'react';
import { View, ActivityIndicator } from 'react-native';

const LoadingSpinner = () => {
  return (
    <SafeAreaScreen>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#A8B1BD" />
        <TextBox size={13} color={colors.subText}>
          로딩 중입니다..
        </TextBox>
      </View>
    </SafeAreaScreen>
  );
};

export default LoadingSpinner;
