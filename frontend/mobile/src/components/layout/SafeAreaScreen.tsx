import { palette } from '@/constants/colors';

import React, { ReactNode } from 'react';
import { StatusBar, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import CustomSafeAreaView from './CustomSafeAreaView';
import { useAppSelector } from '@/store/store';

interface SafeAreaScreenProps {
  children: ReactNode;
}

const SafeAreaScreen = ({ children }: SafeAreaScreenProps) => {
  const isConnected = useAppSelector((state) => state.networkReducer.isConnected);

  return (
    <SafeAreaProvider>
      <CustomSafeAreaView>
        <StatusBar
          barStyle={'dark-content'}
          backgroundColor={
            !isConnected
              ? palette.networkError
              : Platform.OS === 'android'
                ? palette.white
                : 'transparent'
          } // 배경색은 adroid만 적용
          translucent={Platform.OS === 'ios'} // 투명도 설정
        />
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          keyboardVerticalOffset={120}
          style={{ flex: 1 }}
        >
          {children}
        </KeyboardAvoidingView>
      </CustomSafeAreaView>
    </SafeAreaProvider>
  );
};

export default SafeAreaScreen;
