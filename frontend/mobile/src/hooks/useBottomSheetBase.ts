import GameInfoSheet from '@/components/bottomSheet/game/GameInfoSheet';
import MissionSelectSheet from '@/components/bottomSheet/game/MissionSelectSheet';
import PrivacyPolicySheet from '@/components/bottomSheet/PrivacyPolicySheet';
import SelectProfileImageSheet from '@/components/bottomSheet/SelectProfileImageSheet';
import ServiceTermsSheet from '@/components/bottomSheet/ServiceTermsSheet';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useFocusEffect } from '@react-navigation/native';

import { useCallback, useRef, useState } from 'react';
import { BackHandler } from 'react-native';

export const BOTTOM_SHEET_COMPONENTS = {
  ServiceTermsSheet: ServiceTermsSheet, // 이용약관
  PrivacyPolicySheet: PrivacyPolicySheet, // 개인정보 처리방침
  SelectProfileImageSheet: SelectProfileImageSheet, // 프로필 이미지 선택
  GameInfoSheet: GameInfoSheet, // 게임 보드 여행지 상세 정보
  MissionSelectSheet: MissionSelectSheet, // 미션인증 방식 선택
} as const;

type BottomSheetName = keyof typeof BOTTOM_SHEET_COMPONENTS;

export const useBottomSheetBase = () => {
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const [isOpen, setIsOpen] = useState(false);

  const openSheet = () => {
    bottomSheetRef.current?.present();
    setIsOpen(true);
  };

  const closeSheet = () => {
    bottomSheetRef.current?.dismiss();
    setIsOpen(false);
  };

  useFocusEffect(
    useCallback(() => {
      const backAction = () => {
        if (isOpen) {
          closeSheet();
          return true;
        }
        return false;
      };

      const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

      return () => backHandler.remove();
    }, [isOpen]),
  );

  return {
    bottomSheetRef,
    openSheet,
    closeSheet,
  };
};
