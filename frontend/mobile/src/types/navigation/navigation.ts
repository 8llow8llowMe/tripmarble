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
  GamePlayStackNavigator: NavigatorScreenParams<GamePlayStackParamList>;
  SpotStackNavigator: NavigatorScreenParams<SpotStackParamList>;
};

// === Bottom Tabs ===
export type BottomTabParamList = {
  HomeTab: NavigatorScreenParams<HomeStackParamList>;
  ExploreTab: undefined;
  GameTab: undefined;
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

// === 각 스택 ===
export type SettingsParamList = {
  SettingsHomeScreen: undefined;
};

export type GamePlayStackParamList = {
  GameHomeScreen: undefined;
  EndedGameScreen: { tripGameId: number };
  OngoingGameScreen: { tripGameId: number };
  GameListScreen: { status?: 'WAITING' | 'ONGOING' | 'ENDED' };
  GameMissionAuthScreen: undefined;
};

export type SpotStackParamList = {
  SpotListScreen: { representativeRegionId: number };
  SpotDetailScreen: undefined;
};
