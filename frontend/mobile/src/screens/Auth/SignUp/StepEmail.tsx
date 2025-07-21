import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useFormContext } from 'react-hook-form';
import { palette } from '@/constants/colors';
import TextBox from '@/components/atom/TextBox';

export default function StepEmail({ onNext }: { onNext: () => void }) {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();
  const email = watch('email');

  // 단순 이메일 정규식 (실전엔 yup 등으로 보완)
  const isValidEmail = (email: string) => /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);

  const canNext = !!email && isValidEmail(email);

  return (
    <View style={styles.container}>
      <TextBox size={20} fontsName="Pretendard700" style={styles.title}>
        로그인에 사용할{'\n'}
        아이디를 입력해주세요.
      </TextBox>

      <TextInput
        style={styles.input}
        placeholder="아이디(이메일)을 입력해주세요."
        value={email}
        onChangeText={(v) => setValue('email', v)}
        autoCapitalize="none"
        keyboardType="email-address"
        placeholderTextColor="#B0B0B0"
        returnKeyType="done"
        onSubmitEditing={() => canNext && onNext()}
      />
      {email && !isValidEmail(email) && (
        <Text style={styles.error}>이메일 형식이 올바르지 않습니다.</Text>
      )}

      <TouchableOpacity
        style={[styles.button, canNext ? styles.active : styles.inactive]}
        onPress={onNext}
        disabled={!canNext}
      >
        <TextBox
          size={16}
          fontsName="Pretendard700"
          color={canNext ? palette.white : palette.gray200}
        >
          다음
        </TextBox>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { justifyContent: 'center', alignItems: 'flex-start', paddingHorizontal: 24 },
  title: { marginBottom: 32 },
  input: {
    width: '100%',
    backgroundColor: '#F7F8FA',
    color: '#222',
    borderRadius: 10,
    paddingVertical: 18,
    paddingHorizontal: 18,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e4e9f0',
  },
  error: {
    color: '#e74c3c',
    fontSize: 14,
    marginTop: 2,
    marginLeft: 4,
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
