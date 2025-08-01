import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from '../screens/Home/HomeScreen';
import ExploreScreen from '../screens/Explore/ExploreScreen';
import MomentsScreen from '../screens/Moments/MomentsScreen';
import ProfileScreen from '../screens/Profile/ProfileScreen';
import useUserInfoQuery from '@/hooks/user/useUserInfo';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { useEffect } from 'react';
import { setUser } from '@/store/redux/user/user';
import PlayStackNavigator from '@/navigations/PlayStackNavigator';

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
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Explore" component={ExploreScreen} />
      <Tab.Screen name="Play" component={PlayStackNavigator} />
      <Tab.Screen name="Moments" component={MomentsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
