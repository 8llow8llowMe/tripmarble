import { useSafeAreaInsets } from 'react-native-safe-area-context';

const useHeaderHeight = () => {
  const { top } = useSafeAreaInsets();
  // const isConnected = useAppSelector((state) => state.network.isConnected);
  const isConnected = true;
  //TODO: 네트워크 체킹 로직 필요

  let headerHeight = 54 + top;
  let paddingTop = top;

  if (!isConnected) {
    headerHeight = 54;
    paddingTop = 0; // 네트워크 연결 안되면 패딩 0
  }

  return { headerHeight, paddingTop };
};
export default useHeaderHeight;
