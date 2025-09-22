import { setIsConnected } from '@/store/redux/network/network';
import NetInfo from '@react-native-community/netinfo';
import { useAppDispatch } from '@/store/store';
// import { openModal, closeModal } from '@stores/redux/modal/modalSlice';

import { useEffect } from 'react';
import { Platform } from 'react-native';

const UseNetworkCheck = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      let isNetworkAvailable = false;

      if (Platform.OS === 'ios') {
        // iOS는 isConnected만 신뢰
        isNetworkAvailable = !!state.isConnected;
        dispatch(setIsConnected(isNetworkAvailable));
      } else {
        // Android는 isConnected, isInternetReachable, type 모두 체크
        if (
          state.isConnected === false ||
          state.isInternetReachable === false ||
          state.type === 'none' ||
          state.type === 'unknown'
        ) {
          console.log(Platform.OS, '네트워크 연결 끊김');
          isNetworkAvailable = false;
          dispatch(setIsConnected(isNetworkAvailable));
        } else {
          isNetworkAvailable = true;
          dispatch(setIsConnected(isNetworkAvailable));
        }
      }

      if (!isNetworkAvailable) {
        console.log(Platform.OS, '네트워크 연결 끊김');
        setTimeout(() => {
          //   dispatch(
          //     openModal({
          //       modalName: 'NetworkErrorModal',
          //       isOpen: true,
          //       title: '',
          //     }),
          //   );
        }, 500);
      } else {
        // dispatch(closeModal());
      }
    });

    // 초기 네트워크 상태 확인
    const checkInitialConnection = async () => {
      const state = await NetInfo.fetch();
      let isNetworkAvailable = false;

      if (Platform.OS === 'ios') {
        isNetworkAvailable = !!state.isConnected;
        dispatch(setIsConnected(isNetworkAvailable));
      } else {
        if (
          state.isConnected === false ||
          state.isInternetReachable === false ||
          state.type === 'none' ||
          state.type === 'unknown'
        ) {
          isNetworkAvailable = false;
          dispatch(setIsConnected(isNetworkAvailable));
        } else {
          isNetworkAvailable = true;
          dispatch(setIsConnected(isNetworkAvailable));
        }
      }

      if (!isNetworkAvailable) {
        setTimeout(() => {
          //   dispatch(
          //     openModal({
          //       modalName: 'NetworkErrorModal',
          //       isOpen: true,
          //       title: '',
          //     }),
          //   );
        }, 500);
      }
    };

    checkInitialConnection();

    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  return null;
};

export default UseNetworkCheck;
