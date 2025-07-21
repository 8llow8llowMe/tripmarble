import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { useFormContext } from 'react-hook-form';
import TextBox from '@/components/atom/TextBox';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { palette } from '@/constants/colors';

export default function StepTerms({ onNext }: { onNext: () => void }) {
  const { watch, setValue } = useFormContext();

  // 각각의 동의 항목
  const term1 = watch('termsAgreed1');
  const term2 = watch('termsAgreed2');
  // 모두 동의: 두 항목이 모두 true면 true
  const allAgreed = term1 && term2;

  // 전체 동의 토글: 둘 다 true면 둘 다 false로, 하나라도 false면 둘 다 true로!
  const toggleAll = () => {
    const target = !allAgreed;
    setValue('termsAgreed1', target);
    setValue('termsAgreed2', target);
  };

  return (
    <View style={styles.container}>
      <TextBox size={20} fontsName="Pretendard700" style={styles.title}>
        TripMarble 서비스 이용약관에{'\n'}
        동의해 주세요.
      </TextBox>

      {/* 모두 동의 */}
      <TouchableOpacity style={styles.row} onPress={toggleAll}>
        <Ionicons
          name={allAgreed ? 'checkbox' : 'square-outline'}
          size={24}
          color={allAgreed ? palette.mainColor : palette.gray300}
          style={{ marginRight: 8 }}
        />
        <TextBox size={16} fontsName="Pretendard500">
          모두 동의
        </TextBox>
      </TouchableOpacity>

      <View style={styles.line} />

      {/* [필수] 이용약관 */}
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
        <TextBox size={15} style={{ flex: 1 }}>
          [필수] 이용약관 동의{'  '}
          <TextBox
            size={15}
            fontsName={'Pretendard500'}
            color={palette.mainColor}
            style={styles.link}
            onPress={() => {}}
          >
            보기
          </TextBox>
        </TextBox>
      </TouchableOpacity>

      {/* [필수] 개인정보 수집 및 이용동의 */}
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
        <TextBox size={15} style={{ flex: 1 }}>
          [필수] 개인정보 수집 및 이용동의{'  '}
          <TextBox
            size={15}
            fontsName={'Pretendard500'}
            color={palette.mainColor}
            style={styles.link}
            onPress={() => {}}
          >
            보기
          </TextBox>
        </TextBox>
      </TouchableOpacity>

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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    paddingHorizontal: 24,
    flex: 1,
  },
  title: { marginBottom: 32 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 32,
  },
  line: {
    height: 1,
    width: '100%',
    backgroundColor: '#eee',
    marginVertical: 18,
  },
  link: {
    textDecorationLine: 'underline',
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
