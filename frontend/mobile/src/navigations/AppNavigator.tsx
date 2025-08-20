import { createNativeStackNavigator } from '@react-navigation/native-stack';

import React from 'react';

import BottomTabNavigator from '@/navigations/app/BottomTabNavigator';
import SearchScreen from '@/screens/Explore/SearchScreen';
import CreateGameScreen from '@/screens/Game/CreateGameScreen';
import OngoingGameScreen from '@/screens/Game/OngoingGameScreen';
import SettingStackNavigator from '@/navigations/app/SettingStackNavigator';
import { AppNavigatorParamList } from '@/types/navigation/navigation';
import GamePlayStackNavigator from '@/navigations/app/GamePlayStackNavigator';

const Stack = createNativeStackNavigator<AppNavigatorParamList>();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="BottomTabNavigator" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="BottomTabNavigator" component={BottomTabNavigator} />
      <Stack.Screen name="SettingsNavigator" component={SettingStackNavigator} />

      <Stack.Screen name="SearchScreen" component={SearchScreen} />

      <Stack.Screen
        name="CreateGameScreen"
        component={CreateGameScreen}
        options={{
          gestureEnabled: true,
        }}
      />

      <Stack.Screen name="GamePlayStackNavigator" component={GamePlayStackNavigator} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
