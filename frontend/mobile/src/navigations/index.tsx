import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import SplashScreen from '@/screens/Auth/SplashScreen';
import AuthNavigator from '@/navigations/AuthNavigator';
import { useAppSelector } from '@/store/store';
import { QUERY_KEY } from '@/constants/keys';
import { useQueryClient } from '@tanstack/react-query';
import AppNavigator from '@/navigations/AppNavigator';

export default function RootNavigation() {
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(true);
  const accessToken = useAppSelector((state) => state.authReducer.accessToken);
  const memberId = useAppSelector((state) => state.userReducer.memberId);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  // 액세스 토큰이 갱신될 때마다 유저 정보 재조회
  useEffect(() => {
    if (accessToken) {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.USER.INFO, memberId],
      });
    }
  }, [accessToken]);

  if (isLoading) return <SplashScreen />; // 로딩 중에는 스플래시 보여주기

  return (
    <NavigationContainer>{accessToken ? <AppNavigator /> : <AuthNavigator />}</NavigationContainer>
  );
}
