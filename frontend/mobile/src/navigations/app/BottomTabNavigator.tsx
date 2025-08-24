import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import useUserInfoQuery from '@/hooks/user/useUserInfo';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { useEffect } from 'react';
import { setUser } from '@/store/redux/user/user';
import ProfileHomeScreen from '@/screens/Profile/ProfileHomeScreen';
import HomeStackNavigator from '@/navigations/app/HomeStackNavigator';
import ExploreStackNavigator from '@/navigations/app/ExploreStackNavigator';
import TabHeader from '@/components/layout/header/TabHeader';
import { palette } from '@/constants/colors';
import { BottomTabParamList } from '@/types/navigation/navigation';
import GamePlayStackNavigator from '@/navigations/app/GamePlayStackNavigator';

const Tab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const dispatch = useAppDispatch();
  const memberId = useAppSelector((state) => state.authReducer.memberId);

  // user 정보 조회
  const { data, isSuccess } = useUserInfoQuery({
    memberId,
    enableApiCall: !!memberId,
  });

  // user 정보 저장
  useEffect(() => {
    if (isSuccess && data) {
      dispatch(setUser(data.dataBody));
    }
  }, [isSuccess, data, dispatch]);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = '';

          switch (route.name) {
            case 'HomeTab':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'ExploreTab':
              iconName = focused ? 'search' : 'search-outline';
              break;
            case 'GameTab':
              iconName = focused ? 'game-controller' : 'game-controller-outline';
              break;
            case 'ProfileTab':
              iconName = focused ? 'person' : 'person-outline';
              break;
          }

          return <Ionicons name={iconName as any} size={size} color={color} />;
        },
        tabBarHideOnKeyboard: true,
        lazy: true,
        tabBarActiveTintColor: palette.mainColor,
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeStackNavigator}
        options={{
          tabBarLabel: '홈',
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="ExploreTab"
        component={ExploreStackNavigator}
        options={{
          tabBarLabel: '떠나보기',
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="GameTab"
        component={GamePlayStackNavigator}
        options={{
          tabBarLabel: '게임',
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileHomeScreen}
        options={{
          tabBarLabel: '프로필',
          header: () => <TabHeader type="ProfileTab" />,
        }}
      />
    </Tab.Navigator>
  );
}
