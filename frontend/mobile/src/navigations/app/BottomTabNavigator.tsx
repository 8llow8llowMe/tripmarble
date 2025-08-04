import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import useUserInfoQuery from '@/hooks/user/useUserInfo';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { useEffect } from 'react';
import { setUser } from '@/store/redux/user/user';
import ProfileScreen from '@/screens/Profile/ProfileScreen';
import MomentsScreen from '@/screens/Moments/MomentsScreen';
import HomeStackNavigator from '@/navigations/app/HomeStackNavigator';
import PlayStackNavigator from '@/navigations/app/PlayStackNavigator';
import ExploreStackNavigator from '@/navigations/app/ExploreStackNavigator';

const Tab = createBottomTabNavigator();

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
            case 'Home':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'Explore':
              iconName = focused ? 'search' : 'search-outline';
              break;
            case 'Play':
              iconName = focused ? 'game-controller' : 'game-controller-outline';
              break;
            case 'Moments':
              iconName = focused ? 'book' : 'book-outline';
              break;
            case 'Profile':
              iconName = focused ? 'person' : 'person-outline';
              break;
          }

          return <Ionicons name={iconName as any} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#36bffa',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeStackNavigator} />
      <Tab.Screen name="Explore" component={ExploreStackNavigator} />
      <Tab.Screen name="Play" component={PlayStackNavigator} />
      <Tab.Screen name="Moments" component={MomentsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
