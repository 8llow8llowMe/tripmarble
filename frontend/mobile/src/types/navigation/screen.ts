import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  AuthtNavigatorParamList,
  AppNavigatorParamList,
  BottomTabParamList,
  RootStackParamList,
  SettingsParamList,
} from './navigation';

// ── NavigationProps
export type RootStackNavigationProp = NativeStackNavigationProp<RootStackParamList>;
export type AuthNavigationProp = NativeStackNavigationProp<AuthtNavigatorParamList>;
export type AppNavigatorNavigationProp = NativeStackNavigationProp<AppNavigatorParamList>;
export type AppBottomTabNavigationProp = BottomTabNavigationProp<BottomTabParamList>;
export type SettingStackNavigationProp = NativeStackNavigationProp<SettingsParamList>;

// ── ScreenProps
