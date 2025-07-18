import { NavigationContainer } from '@react-navigation/native';
import BottomTabNavigator from './BottomTabNavigator';
import React, { useEffect, useState } from 'react';
import SplashScreen from '@/screens/Auth/SplashScreen';
import AuthNavigator from '@/navigations/AuthNavigator';

export default function RootNavigation() {
  const [isLoading, setIsLoading] = useState(true); // 스플래시/로딩
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 여부

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
      // TODO: 로그인 여부 확인
    }, 1500);
  }, []);

  if (isLoading) return <SplashScreen />; // 로딩 중에는 스플래시 보여주기

  return (
    <NavigationContainer>
      {!isLoggedIn ? <BottomTabNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}
