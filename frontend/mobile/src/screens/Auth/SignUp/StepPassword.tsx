import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useFormContext } from 'react-hook-form';
import TextBox from '@/components/atom/TextBox';
import { palette } from '@/constants/colors';

export default function StepPassword({
  onPrev,
  onNext,
}: {
  onPrev: () => void;
  onNext: () => void;
}) {
  const {
    setValue,
    watch,
    getValues,
    formState: { errors },
  } = useFormContext();
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const password = watch('password');
  const passwordConfirm = watch('passwordConfirm');

  const handleSubmit = async () => {
    setError('');
    if (!password || !passwordConfirm) {
      setError('비밀번호를 입력해 주세요.');
      return;
    }
    if (password !== passwordConfirm) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }
    setIsSubmitting(true);
    try {
      // react-hook-form 전체값 가져오기
      //   const { email, name, nickname } = getValues();
      //   await signUpMutation.mutateAsync({
      //     email,
      //     name,
      //     nickname,
      //     password,
      //   });
      onNext();
    } catch (e: any) {
      setError(e.message || '회원가입에 실패했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View style={styles.container}>
      <TextBox size={20} fontsName="Pretendard700" style={styles.title}>
        로그인에 사용할{'\n'}
        비밀번호를 입력해 주세요.
      </TextBox>

      <TextInput
        style={styles.input}
        placeholder="비밀번호 입력"
        secureTextEntry
        value={password}
        onChangeText={(v) => setValue('password', v)}
      />
      <TextInput
        style={styles.input}
        placeholder="비밀번호 확인"
        secureTextEntry
        value={passwordConfirm}
        onChangeText={(v) => setValue('passwordConfirm', v)}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}

      <TouchableOpacity
        style={[
          styles.button,
          password && passwordConfirm && password === passwordConfirm
            ? styles.active
            : styles.inactive,
        ]}
        onPress={handleSubmit}
        disabled={isSubmitting || !password || !passwordConfirm}
      >
        {isSubmitting ? (
          <ActivityIndicator color={palette.white} />
        ) : (
          <TextBox size={16} fontsName="Pretendard700" color={palette.white}>
            회원가입
          </TextBox>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { justifyContent: 'center', alignItems: 'flex-start', paddingHorizontal: 24 },
  title: { marginBottom: 32 },
  input: {
    width: '100%',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#f7f8fa',
    fontSize: 16,
    padding: 16,
    marginBottom: 16,
  },
  error: { color: '#e74c3c', marginBottom: 12 },
  button: {
    width: '100%',
    borderRadius: 4,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 32,
  },
  active: { backgroundColor: palette.mainColor },
  inactive: { backgroundColor: palette.gray100 },
});
