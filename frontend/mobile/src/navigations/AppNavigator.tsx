import { createNativeStackNavigator } from '@react-navigation/native-stack';

import React from 'react';

import BottomTabNavigator from '@/navigations/app/BottomTabNavigator';
import SearchScreen from '@/screens/Explore/SearchScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="BottomTabNavigator" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="BottomTabNavigator" component={BottomTabNavigator} />
      <Stack.Screen name="SearchScreen" component={SearchScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
