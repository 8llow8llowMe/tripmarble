import { Alert } from 'react-native';
import * as Location from 'expo-location';
import { requestLocationPermission } from '@/hooks/usePermissions';

export type CurrentLocation = {
  lat: number;
  lng: number;
  accuracy?: number | null;
  timestamp: number;
};

/**
 * 권한 확인 → 위치 서비스 ON 확인 → 현재 위치 조회
 */
export async function getCurrentLocation(): Promise<CurrentLocation | null> {
  // 1) 권한
  const granted = await requestLocationPermission();
  if (!granted) return null;

  // 2) 서비스 ON?
  const servicesOn = await Location.hasServicesEnabledAsync();
  if (!servicesOn) {
    Alert.alert('위치 서비스 꺼짐', '기기의 위치 서비스를 켜고 다시 시도해주세요.');
    return null;
  }

  // 3) 현재 위치 가져오기
  try {
    const pos = await Location.getCurrentPositionAsync({});
    const { latitude, longitude, accuracy } = pos.coords;

    return {
      lat: latitude,
      lng: longitude,
      accuracy: accuracy ?? null,
      timestamp: pos.timestamp,
    };
  } catch {
    Alert.alert('위치 확인 실패', '잠시 후 다시 시도해주세요.');
    return null;
  }
}
