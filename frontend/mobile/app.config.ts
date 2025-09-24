import type { ExpoConfig } from '@expo/config-types';
import * as path from 'path';
import { config as loadEnv } from 'dotenv';

// 실행 프로파일: 로컬은 APP_ENV, EAS는 EAS_BUILD_PROFILE
const profile = process.env.APP_ENV ?? process.env.EAS_BUILD_PROFILE ?? 'development';

// 서브모듈 env 경로 매핑
const envMap: Record<string, string> = {
  development: 'env/.env-frontend-mobile-dev',
  production: 'env/.env-frontend-mobile-prod',
};

// 서브모듈의 env 파일만 로드 (루트 .env는 무시)
loadEnv({ path: path.resolve(__dirname, envMap[profile] || envMap.development) });

// (선택) 필수 키 검증 – 빠지면 빌드 전단계에서 바로 오류
const requiredPublicKeys = ['EXPO_PUBLIC_AUTH_SERVICE', 'EXPO_PUBLIC_API_GATEWAY'] as const;
for (const k of requiredPublicKeys) {
  if (!process.env[k]) {
    // eslint-disable-next-line no-console
    console.warn(`[app.config] Missing ${k} for profile: ${profile}`);
  }
}

const defineConfig = (): ExpoConfig => ({
  name: 'TripMarble',
  slug: 'tripmarble',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/icon.png',
  userInterfaceStyle: 'light',
  newArchEnabled: true,
  splash: {
    image: './assets/icon.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff',
  },
  ios: { supportsTablet: true },
  android: {
    package: 'com.followfollowme.tripmarble',
    adaptiveIcon: {
      foregroundImage: './assets/icon.png',
      backgroundColor: '#4BA1FD',
    },
    edgeToEdgeEnabled: true,
    jsEngine: 'hermes',
  },
  web: { favicon: './assets/favicon.png' },
  experiments: { reactCanary: true },
  extra: {
    APP_ENV: profile,
    EXPO_PUBLIC_AUTH_SERVICE: process.env.EXPO_PUBLIC_AUTH_SERVICE,
    EXPO_PUBLIC_API_GATEWAY: process.env.EXPO_PUBLIC_API_GATEWAY,
  },
});

export default defineConfig;
