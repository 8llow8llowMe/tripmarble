import { Alert, Linking } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';

/**
 * 공통 권한 요청 처리
 */
const ensureGranted = async (requestFn: () => Promise<{ status: string }>): Promise<boolean> => {
  const { status } = await requestFn();

  if (status === 'granted') return true;

  if (status === 'denied' || status === 'undetermined') {
    Alert.alert('권한 필요', '이 기능을 사용하려면 권한이 필요합니다. 설정에서 허용해주세요.', [
      { text: '취소', style: 'cancel' },
      { text: '설정 열기', onPress: () => Linking.openSettings() },
    ]);
  }

  return false;
};

// 📸 카메라 권한
export const requestCameraPermission = async () => {
  return await ensureGranted(() => ImagePicker.requestCameraPermissionsAsync());
};

// 🖼️ 앨범/미디어 권한
export const requestMediaPermission = async () => {
  return await ensureGranted(() => ImagePicker.requestMediaLibraryPermissionsAsync());
};

// 📍 위치 권한
export const requestLocationPermission = async () => {
  return await ensureGranted(() => Location.requestForegroundPermissionsAsync());
};
