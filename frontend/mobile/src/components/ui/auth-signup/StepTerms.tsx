import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { useFormContext } from 'react-hook-form';
import TextBox from '@/components/atom/TextBox';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { palette } from '@/constants/colors';
import { useBottomSheetBase } from '@/hooks/useBottomSheetBase';
import { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet';
import ServiceTermsSheet from '@/components/bottomSheet/ServiceTermsSheet';
import PrivacyPolicySheet from '@/components/bottomSheet/PrivacyPolicySheet';

export default function StepTerms({ onNext }: { onNext: () => void }) {
  const { watch, setValue } = useFormContext();

  const term1 = watch('termsAgreed1');
  const term2 = watch('termsAgreed2');
  const allAgreed = term1 && term2;

  // 전체 동의 토글
  const toggleAll = () => {
    const target = !allAgreed;
    setValue('termsAgreed1', target);
    setValue('termsAgreed2', target);
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

  return (
    <View style={styles.container}>
      <TextBox size={20} fontsName="Pretendard700" style={styles.title}>
        TripMarble 서비스 이용약관에{'\n'}
        동의해 주세요.
      </TextBox>

      {/* 모두 동의 */}
      <TouchableOpacity style={styles.item} onPress={toggleAll}>
        <Ionicons
          name={allAgreed ? 'checkbox' : 'square-outline'}
          size={24}
          color={allAgreed ? palette.mainColor : palette.gray300}
          style={{ marginRight: 8 }}
        />
        <TextBox size={16} fontsName="Pretendard500" color={palette.gray600}>
          모두 동의
        </TextBox>
      </TouchableOpacity>

      <View style={styles.line} />

      {/* [필수] 이용약관 */}
      <View style={styles.item}>
        <TouchableOpacity
          style={styles.row}
          onPress={() => setValue('termsAgreed1', !term1)}
          activeOpacity={0.8}
        >
          <MaterialCommunityIcons
            name="check-bold"
            size={20}
            color={term1 ? palette.mainColor : palette.gray300}
            style={{ marginRight: 8 }}
          />
          <TextBox size={15} color={palette.gray600}>
            [필수] 이용약관 동의
          </TextBox>
        </TouchableOpacity>
        <TouchableOpacity onPress={openServiceTermsSheet}>
          <TextBox
            size={15}
            fontsName={'Pretendard500'}
            color={palette.gray600}
            style={styles.link}
          >
            보기
          </TextBox>
        </TouchableOpacity>
      </View>

      {/* [필수] 개인정보 수집 및 이용동의 */}
      <View style={styles.item}>
        <TouchableOpacity
          style={styles.row}
          onPress={() => setValue('termsAgreed2', !term2)}
          activeOpacity={0.8}
        >
          <MaterialCommunityIcons
            name="check-bold"
            size={20}
            color={term2 ? palette.mainColor : palette.gray300}
            style={{ marginRight: 8 }}
          />
          <TextBox size={15} color={palette.gray600}>
            [필수] 개인정보 수집 및 이용동의
          </TextBox>
        </TouchableOpacity>
        <TouchableOpacity onPress={openPrivacyPolicySheet}>
          <TextBox
            size={15}
            fontsName={'Pretendard500'}
            color={palette.gray600}
            style={styles.link}
          >
            보기
          </TextBox>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={[styles.button, allAgreed ? styles.active : styles.inactive]}
        onPress={onNext}
        disabled={!allAgreed}
      >
        <TextBox
          size={16}
          fontsName="Pretendard700"
          color={allAgreed ? palette.white : palette.gray200}
        >
          다음
        </TextBox>
      </TouchableOpacity>

      {/* 약관 바텀시트 */}
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    paddingHorizontal: 16,
    flex: 1,
  },
  title: { marginBottom: 32 },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 32,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 6,
  },
  line: {
    height: 1,
    width: '100%',
    backgroundColor: '#eee',
    marginVertical: 18,
  },
  link: {
    textDecorationLine: 'underline',
    fontWeight: 600,
  },
  button: {
    width: '100%',
    borderRadius: 4,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 48,
  },
  active: { backgroundColor: palette.mainColor },
  inactive: { backgroundColor: palette.gray100 },
});
