import { NavigationContainer } from '@react-navigation/native';
import BottomTabNavigator from './BottomTabNavigator';
import React, { useEffect, useState } from 'react';
import SplashScreen from '@/screens/Auth/SplashScreen';
import AuthNavigator from '@/navigations/AuthNavigator';
import { useAppSelector } from '@/store/store';

export default function RootNavigation() {
  const [isLoading, setIsLoading] = useState(true);
  const accessToken = useAppSelector((state) => state.authReducer.accessToken);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  if (isLoading) return <SplashScreen />; // 로딩 중에는 스플래시 보여주기

  return (
    <NavigationContainer>
      {accessToken ? <BottomTabNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}
