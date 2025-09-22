import { palette } from '@/constants/colors';
import { useAppSelector } from '@/store/store';

import { StatusBar, View, Text, StyleSheet, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const NetworkStatusBar = () => {
  const isConnected = useAppSelector((state) => state.networkReducer.isConnected);
  const { top } = useSafeAreaInsets();
  if (isConnected) return null;

  const statusBarHeight = Platform.OS === 'android' ? StatusBar.currentHeight : 0;
  const paddingTop =
    Platform.OS === 'ios' ? top : Number(Platform.Version) > 34 ? statusBarHeight : 0;

  return (
    <View style={[styles.banner, { paddingTop: paddingTop }]}>
      <StatusBar backgroundColor={palette.networkError} barStyle="light-content" />
      <Text style={styles.text}>네트워크 연결을 확인해 주세요</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  banner: {
    // position: 'absolute',
    // top: 0,
    // left: 0,
    // right: 0,
    backgroundColor: palette.networkError,
    paddingTop: 8,
    paddingBottom: 8,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
  },
  text: {
    color: 'white',
    fontSize: 10,
    fontWeight: '400',
  },
});

export default NetworkStatusBar;
