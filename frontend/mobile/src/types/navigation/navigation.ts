import { NavigatorScreenParams } from '@react-navigation/native';

// RootStackNavigator 스크린
export type RootStackParamList = {
  PermissionScreen: undefined;
  AppNavigator: NavigatorScreenParams<AppNavigatorParamList>;
  AuthNavigator: NavigatorScreenParams<AuthtNavigatorParamList>;
};

// AccountNavigator
export type AuthtNavigatorParamList = {
  LoginScreen: undefined;
  SignUpScreen: undefined;
};

// === AppNavigator ===
export type AppNavigatorParamList = {
  BottomTabNavigator: NavigatorScreenParams<BottomTabParamList>;
  SettingsNavigator: NavigatorScreenParams<SettingsParamList>;
  SearchScreen: undefined;
  CreateGameScreen: undefined;
  OngoingGameScreen: { id: number; title: string };
};

// === Bottom Tabs ===
export type BottomTabParamList = {
  HomeTab: NavigatorScreenParams<HomeStackParamList>;
  ExploreTab: NavigatorScreenParams<ExploreStackParamList>;
  PlayTab: NavigatorScreenParams<PlayStackParamList>;
  HistoryTab: undefined;
  ProfileTab: undefined;
};

export type HomeStackParamList = {
  HomeScreen: undefined;
  SpotListScreen: { representativeRegionId: number; regionName: string };
  SpotDetailScreen: undefined;
};

export type ExploreStackParamList = {
  ExploreScreen: undefined;
  SpotListScreen: { representativeRegionId: number; regionName: string };
  SpotDetailScreen: undefined;
};

export type PlayStackParamList = {
  PlayHomeScreen: undefined;
  FinishedGameScreen: { id: number; title: string };
};

// === 각 스택 ===
// SettingStackNavigator
export type SettingsParamList = {
  SettingsHomeScreen: undefined;
};
