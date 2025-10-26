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
  NaverLoginWebViewScreen: undefined;
  KakaoLoginWebViewScreen: undefined;
  SocialLoginWebViewScreen: { provider: 'NAVER' | 'KAKAO' | 'GOOGLE' };
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
  HomeTab: undefined;
  ExploreTab: undefined;
  GameTab: undefined;
  ProfileTab: undefined;
};

// === 각 스택 ===
export type SettingsParamList = {
  SettingsHomeScreen: undefined;
  LicenseScreen: undefined;
  ProfileEditScreen: undefined;
};

export type GamePlayStackParamList = {
  GameHomeScreen: undefined;
  EndedGameScreen: { tripGameId: string };
  GameDetailScreen: { tripGameId: string };
  GameListScreen: { status?: 'WAITING' | 'ONGOING' | 'ENDED' };
  GameMissionAuthScreen: undefined;
};

export type SpotStackParamList = {
  SpotListScreen: { representativeRegionId: string };
  SpotDetailScreen: { tripSpotId: string };
};
