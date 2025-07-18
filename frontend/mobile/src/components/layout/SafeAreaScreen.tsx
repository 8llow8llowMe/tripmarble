import CustomSafeAreaView from '@/components/layout/CustomSafeAreaView';
import { palette } from '@/constants/colors';
import React, { ReactNode } from 'react';
import { StatusBar, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

interface SafeAreaScreenProps {
  children: ReactNode;
}

const SafeAreaScreen = ({ children }: SafeAreaScreenProps) => {
  return (
    <SafeAreaProvider>
      <CustomSafeAreaView>
        <StatusBar
          barStyle={'dark-content'}
          backgroundColor={Platform.OS === 'android' ? palette.white : 'transparent'} // 배경색은 adroid만 적용
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
