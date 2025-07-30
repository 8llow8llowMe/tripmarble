import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Controller, useForm } from 'react-hook-form';

import logo from '../../../assets/icon.png';
import { palette } from '@/constants/colors';
import useLoginMutaion from '@/hooks/auth/useLogin';
import { useAppDispatch } from '@/store/store';
import { authorize } from '@/store/redux/auth/auth';
import { setAsyncStorageItem } from '@/utils/asyncStorage';
import { STORAGE_KEY } from '@/constants/keys';
import { setUser } from '@/store/redux/user/user';

type LoginFormType = {
  email: string;
  password: string;
};

export default function LoginScreen({ navigation }: any) {
  const {
    control,
    watch,
    formState: { errors, isValid, isSubmitting },
  } = useForm<LoginFormType>({
    mode: 'onChange',
    defaultValues: { email: '', password: '' },
  });

  const email = watch('email');
  const password = watch('password');

  const dispatch = useAppDispatch();
  const { login } = useLoginMutaion();

  const handleSubmit = () => {
    login(
      { email, password },
      {
        onSuccess: (data) => {
          console.log(data);
          // TODO: 로그인 에러 처리
          if (data.dataHeader.success) {
            setAsyncStorageItem(STORAGE_KEY.ACCESS_TOKEN, data.dataBody.accessToken);

            dispatch(
              authorize({
                accessToken: data.dataBody.accessToken,
                memberId: data.dataBody.memberId,
              }),
            );
            dispatch(setUser({ memberId: data.dataBody.memberId }));
          }
        },
      },
    );
  };

  const goToSignUpScreen = () => {
    navigation.navigate('SignUp');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.inner}>
        <Image source={logo} style={styles.logo} />
        <Text style={styles.title}>로그인</Text>

        <Controller
          control={control}
          name="email"
          rules={{
            required: '이메일을 입력해주세요.',
            pattern: {
              value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
              message: '이메일 형식이 올바르지 않습니다.',
            },
          }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <>
              <TextInput
                style={[styles.input, error && { borderColor: '#e74c3c', color: '#e74c3c' }]}
                placeholder="이메일"
                placeholderTextColor="#B0B0B0"
                autoCapitalize="none"
                keyboardType="email-address"
                value={value}
                onChangeText={onChange}
                returnKeyType="next"
              />
              {error && <Text style={styles.error}>{error.message}</Text>}
            </>
          )}
        />

        <Controller
          control={control}
          name="password"
          rules={{ required: '비밀번호를 입력해주세요.' }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <>
              <TextInput
                style={[styles.input, error && { borderColor: palette.error }]}
                placeholder="비밀번호"
                placeholderTextColor="#B0B0B0"
                secureTextEntry
                value={value}
                onChangeText={onChange}
                returnKeyType="done"
              />
              {error && <Text style={styles.error}>{error.message}</Text>}
            </>
          )}
        />

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>로그인</Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={styles.footerText}>계정이 없으신가요?</Text>
          <TouchableOpacity onPress={goToSignUpScreen}>
            <Text style={styles.footerButton}>회원가입</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: palette.white },
  inner: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 32,
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 28,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 28,
    color: palette.mainColor,
    fontWeight: 'bold',
    marginBottom: 28,
  },
  input: {
    width: '100%',
    backgroundColor: '#F7F8FA',
    color: '#222',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 16,
    fontSize: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#e4e9f0',
  },
  button: {
    width: '100%',
    backgroundColor: palette.mainColor,
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  footer: {
    flexDirection: 'row',
    marginTop: 32,
    alignItems: 'center',
  },
  footerText: {
    color: '#A0A0A0',
    marginRight: 8,
  },
  footerButton: {
    color: palette.mainColor,
    fontWeight: 'bold',
  },
  error: {
    fontSize: 14,
    color: palette.error,
    marginBottom: 4,
    marginLeft: 2,
    alignSelf: 'flex-start',
  },
});
