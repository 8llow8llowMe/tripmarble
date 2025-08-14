import { createNativeStackNavigator } from '@react-navigation/native-stack';

import React from 'react';

import BottomTabNavigator from '@/navigations/app/BottomTabNavigator';
import SearchScreen from '@/screens/Explore/SearchScreen';
import CreateGameScreen from '@/screens/Game/CreateGameScreen';
import OngoingGameScreen from '@/screens/Game/OngoingGameScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="BottomTabNavigator" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="BottomTabNavigator" component={BottomTabNavigator} />
      <Stack.Screen name="SearchScreen" component={SearchScreen} />
      <Stack.Screen
        name="CreateGame"
        component={CreateGameScreen}
        options={{
          gestureEnabled: true,
        }}
      />
      <Stack.Screen
        name="OngoingGame"
        component={OngoingGameScreen}
        options={{
          gestureEnabled: true,
        }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
