import TextBox from '@/components/atom/TextBox';
import PrivacyPolicySheet from '@/components/bottomSheet/PrivacyPolicySheet';
import ServiceTermsSheet from '@/components/bottomSheet/ServiceTermsSheet';
import Divider from '@/components/common/Divider';
import { palette } from '@/constants/colors';
import { useBottomSheetBase } from '@/hooks/useBottomSheetBase';
import useWithdrawMutaion from '@/hooks/user/useWithdraw';
import { AppNavigatorNavigationProp } from '@/types/navigation/screen';
import { Ionicons } from '@expo/vector-icons';
import { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet';
import { useNavigation } from '@react-navigation/native';

import React from 'react';
import { Alert, SafeAreaView, TouchableOpacity } from 'react-native';
import { View, StyleSheet, ScrollView } from 'react-native';

const SettingsHomeScreen = () => {
  const navigation = useNavigation<AppNavigatorNavigationProp>();

  // 회원 탈퇴
  const { withdraw, isPending: withdrawPending } = useWithdrawMutaion();
  const confirmWithdraw = () => {
    Alert.alert('회원탈퇴', '정말로 탈퇴 하시겠습니까?\n삭제 후에는 복구할 수 없습니다.', [
      { text: '취소', style: 'cancel' },
      { text: '탈퇴하기', style: 'destructive', onPress: () => withdraw() },
    ]);
  };

  const {
    bottomSheetRef: serviceTermsBottomSheetRef,
    openSheet: openServiceTermsSheet,
    closeSheet: closeServiceTermsSheet,
  } = useBottomSheetBase();

  const {
    bottomSheetRef: privacyPolicyBottomSheetRef,
    openSheet: openPrivacyPolicySheet,
    closeSheet: closePrivacyPolicySheet,
  } = useBottomSheetBase();

  const renderBackdrop = (props: any) => (
    <BottomSheetBackdrop
      {...props}
      pressBehavior={'close'}
      disappearsOnIndex={-1} // 기본적으로 항상 표시되도록 설정
      appearsOnIndex={0} // 시작 지점에서도 배경이 나타나도록 설정
    />
  );

  // 오픈소스 라이선스 스크린으로 이동
  const goToLicenseScreen = () => {
    navigation.navigate('SettingsNavigator', {
      screen: 'LicenseScreen',
    });
  };

  // 프로필 수정 스크린으로 이동
  const goToProfileEditScreen = () => {
    navigation.navigate('SettingsNavigator', {
      screen: 'ProfileEditScreen',
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* <View style={styles.section}>
          <TouchableOpacity onPress={goToProfileEditScreen}>
            <View style={styles.row}>
              <TextBox size={16} fontsName="Pretendard700" style={styles.label}>
                프로필 수정
              </TextBox>
              <Ionicons name="chevron-forward" size={18} color={palette.gray300} />
            </View>
          </TouchableOpacity>
          <Divider />
        </View> */}

        <View style={styles.section}>
          <TextBox size={16} fontsName="Pretendard700" style={styles.label}>
            약관 및 정책
          </TextBox>

          <View style={{ gap: 28 }}>
            <TouchableOpacity onPress={openServiceTermsSheet}>
              <View style={styles.row}>
                <TextBox size={15}>이용약관</TextBox>
                <Ionicons name="chevron-forward" size={18} color={palette.gray300} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={openPrivacyPolicySheet}>
              <View style={styles.row}>
                <TextBox size={15}>개인정보처리방침</TextBox>
                <Ionicons name="chevron-forward" size={18} color={palette.gray300} />
              </View>
            </TouchableOpacity>
            {/* <TouchableOpacity>
              <View style={styles.row}>
                <TextBox size={15}>위치기반서비스 이용약관</TextBox>
                <Ionicons name="chevron-forward" size={18} color={palette.gray300} />
              </View>
            </TouchableOpacity> */}
            <Divider />
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.row}>
            <View style={{ gap: 4, flexDirection: 'row', alignItems: 'center' }}>
              <TextBox size={16} fontsName="Pretendard700" style={styles.label}>
                앱 정보
              </TextBox>
            </View>
            <TextBox size={13} color={palette.gray600}>
              현재 버전
            </TextBox>
          </View>

          <TouchableOpacity onPress={goToLicenseScreen}>
            <View style={styles.row}>
              <TextBox size={15}>오픈소스 라이선스</TextBox>
              <Ionicons name="chevron-forward" size={18} color={palette.gray300} />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.section}>
          <TouchableOpacity onPress={confirmWithdraw} disabled={withdrawPending}>
            <View style={styles.row}>
              <TextBox
                size={14}
                style={[styles.withdrawText, withdrawPending && styles.withdrawTextDisabled]}
              >
                {withdrawPending ? '회원탈퇴 중…' : '회원탈퇴'}
              </TextBox>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* 약관 및 정책 바텀시트 */}
      <BottomSheetModal
        ref={serviceTermsBottomSheetRef}
        handleStyle={{
          backgroundColor: palette.white,
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
        }}
        index={0}
        snapPoints={[605]}
        backdropComponent={renderBackdrop}
      >
        <ServiceTermsSheet />
      </BottomSheetModal>

      <BottomSheetModal
        ref={privacyPolicyBottomSheetRef}
        handleStyle={{
          backgroundColor: palette.white,
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
        }}
        index={0}
        snapPoints={[605]}
        backdropComponent={renderBackdrop}
      >
        <PrivacyPolicySheet />
      </BottomSheetModal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: palette.white },
  container: { padding: 16 },

  section: {
    paddingVertical: 16,
    gap: 28,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontWeight: '600',
  },
  withdrawText: {
    textDecorationLine: 'underline',
    color: palette.gray500,
  },
  withdrawTextDisabled: {
    color: palette.gray300,
  },
});

export default SettingsHomeScreen;
