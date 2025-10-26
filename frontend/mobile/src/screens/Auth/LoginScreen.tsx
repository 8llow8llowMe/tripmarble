import React, { useEffect, useState } from 'react';
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
import { Feather } from '@expo/vector-icons';
import { LOGIN } from '@/constants/message/auth';
import { REGEX } from '@/constants/regex';

type LoginFormType = {
  email: string;
  password: string;
};

function SocialButton({
  onPress,
  label,
  icon,
  testID,
}: {
  onPress: () => void;
  label: string;
  icon: React.ReactNode;
  testID?: string;
}) {
  return (
    <TouchableOpacity
      style={styles.socialBtn}
      onPress={onPress}
      testID={testID}
      activeOpacity={0.8}
    >
      <View style={styles.socialInner}>
        <View style={styles.socialIconBox}>{icon}</View>
        <Text style={styles.socialText}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default function LoginScreen({ navigation }: any) {
  const {
    control,
    watch,
    formState: { isValid },
  } = useForm<LoginFormType>({
    mode: 'onChange',
    defaultValues: { email: '', password: '' },
  });

  const email = watch('email');
  const password = watch('password');

  const dispatch = useAppDispatch();
  const { login, isPending } = useLoginMutaion();

  // 로그인 에러 메시지 상태
  const [loginError, setLoginError] = useState('');
  const [secure, setSecure] = useState(true);

  // 이메일 변경시 리셋
  useEffect(() => {
    setLoginError('');
  }, [email, password]);

  // 로그인 요청
  const handleSubmit = async () => {
    setLoginError('');

    try {
      const data = await login({ email, password });
      if (data.dataHeader.success) {
        // AsyncStorage auth 정보 저장
        setAsyncStorageItem(STORAGE_KEY.ACCESS_TOKEN, data.dataBody.accessToken);
        setAsyncStorageItem(STORAGE_KEY.MEMBER_ID, String(data.dataBody.memberId));

        // store auth 정보 저장
        dispatch(
          authorize({
            accessToken: data.dataBody.accessToken,
            memberId: data.dataBody.memberId,
          }),
        );
        dispatch(setUser({ memberId: data.dataBody.memberId }));
      } else {
        let errorMsg = '로그인에 실패했습니다.';
        const { resultMessage } = data.dataHeader;
        if (typeof resultMessage === 'string') {
          errorMsg = resultMessage;
        } else if (typeof resultMessage === 'object' && resultMessage !== null) {
          errorMsg =
            resultMessage.emailError ||
            resultMessage.passwordError ||
            Object.values(resultMessage).join('\n') || // 기타 모든 메시지
            errorMsg;
        }
      }
    } catch (e: any) {
      setLoginError(
        e?.response?.data?.dataHeader?.resultMessage ||
          e?.message ||
          '로그인 도중 오류가 발생했습니다.',
      );
    }
  };

  const goToSignUpScreen = () => {
    navigation.navigate('SignUpScreen');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.content}>
        {/* 로고 */}
        <Image source={logo} style={styles.logo} />
        <Text style={styles.title}>TripMarble</Text>

        {/* 슬로건 */}
        <Text style={styles.slogan}>FIND YOUR NEXT DESTINATION!</Text>

        {/* 이메일 입력 */}
        <Controller
          control={control}
          name="email"
          rules={{
            required: LOGIN.EMAIL.REQUIRED,
            pattern: {
              value: REGEX.EMAIL,
              message: LOGIN.EMAIL.PATTERN,
            },
          }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <View style={styles.inputWrapper}>
              <Text style={styles.label}>이메일 주소</Text>
              <TextInput
                style={[styles.input, error && styles.inputError]}
                placeholder={LOGIN.EMAIL.PLACEHOLDER}
                placeholderTextColor={palette.gray400}
                autoCapitalize="none"
                keyboardType="email-address"
                value={value}
                onChangeText={onChange}
                returnKeyType="next"
              />
              {error && <Text style={styles.errorText}>{error.message}</Text>}
            </View>
          )}
        />

        {/* 비밀번호 입력 */}
        <Controller
          control={control}
          name="password"
          rules={{
            required: '비밀번호를 입력해주세요.',
            pattern: {
              value: REGEX.PASSWORD,
              message: LOGIN.PASSWORD.PATTERN,
            },
          }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <View style={styles.inputWrapper}>
              <Text style={styles.label}>비밀번호</Text>
              <View style={[styles.inputWithIconRow, error && styles.inputError]}>
                <TextInput
                  style={[styles.inputNoBorder, { flex: 1 }]}
                  placeholder=""
                  placeholderTextColor={palette.gray400}
                  autoCapitalize="none"
                  value={value}
                  onChangeText={onChange}
                  secureTextEntry={secure}
                  returnKeyType="done"
                  maxLength={20}
                />
                <TouchableOpacity onPress={() => setSecure((v) => !v)}>
                  <Feather
                    name={secure ? 'eye-off' : 'eye'}
                    size={20}
                    color="#B0B0B0"
                    style={{ marginRight: 8 }}
                  />
                </TouchableOpacity>
              </View>
              {error && <Text style={styles.errorText}>{error.message}</Text>}
            </View>
          )}
        />

        {/* 로그인 실패 에러 메시지 */}
        {loginError ? (
          <Text style={[styles.errorText, { marginBottom: 8 }]}>{loginError}</Text>
        ) : null}

        {/* 로그인 버튼 */}
        <TouchableOpacity
          style={[
            styles.loginBtn,
            !isValid || isPending ? { backgroundColor: palette.gray100 } : {},
          ]}
          onPress={handleSubmit}
          disabled={!isValid || isPending}
        >
          <Text style={styles.loginBtnText}>{isPending ? '로그인 중...' : '로그인'}</Text>
        </TouchableOpacity>

        {/* 가입/찾기 */}
        <View style={styles.helpRow}>
          <TouchableOpacity onPress={goToSignUpScreen}>
            <Text style={styles.helpText}>회원가입</Text>
          </TouchableOpacity>
          {/* <View style={styles.helpDivider} />
          <TouchableOpacity>
            <Text style={styles.helpText}>이메일 찾기</Text>
          </TouchableOpacity>
          <View style={styles.helpDivider} />
          <TouchableOpacity>
            <Text style={styles.helpText}>비밀번호 찾기</Text>
          </TouchableOpacity> */}
        </View>

        {/* 소셜 로그인 */}
        <View style={{ width: '100%' }}>
          <SocialButton
            testID="naver-login"
            label="네이버로 로그인"
            onPress={() => navigation.navigate('SocialLoginWebViewScreen', { provider: 'NAVER' })}
            icon={
              <View style={[styles.brandSquare, { backgroundColor: '#03C75A' }]}>
                <Text style={styles.brandLetter}>N</Text>
              </View>
            }
          />

          <SocialButton
            testID="kakao-login"
            label="카카오로 로그인"
            onPress={() => navigation.navigate('SocialLoginWebViewScreen', { provider: 'KAKAO' })}
            icon={
              <Image
                source={{
                  uri: 'https://developers.kakao.com/assets/img/about/logos/kakaolink/kakaolink_btn_small.png',
                }}
                style={styles.brandImage}
              />
            }
          />
        </View>
      </View>

      {/* 하단 약관 */}
      {/* <View style={styles.footer}>
        <Text style={styles.footerLink}>이용약관</Text>
        <Text style={styles.footerDot}>·</Text>
        <Text style={styles.footerLink}>개인정보처리방침</Text>
      </View> */}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: palette.white, paddingTop: 60 },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  logo: {
    width: 120,
    height: 60,
    resizeMode: 'contain',
    marginTop: 60,
    marginBottom: 15,
  },
  title: {
    fontSize: 16,
    color: palette.gray800,
    fontWeight: '700',
    marginBottom: 10,
  },
  slogan: {
    fontSize: 13,
    letterSpacing: 0.3,
    color: palette.gray600,
    fontWeight: '700',
    marginBottom: 50,
  },
  inputWrapper: {
    width: '100%',
    marginBottom: 16,
  },
  label: {
    color: palette.gray600,
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 3,
  },
  input: {
    width: '100%',
    fontSize: 16,
    backgroundColor: palette.white,
    paddingVertical: 10,
    borderBottomWidth: 1.5,
    borderColor: '#f2f2f2',
    color: '#222',
    paddingLeft: 0,
    marginBottom: 6,
  },
  inputWithIconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1.5,
    borderColor: '#f2f2f2',
    marginBottom: 6,
  },
  inputNoBorder: {
    backgroundColor: palette.white,
    fontSize: 16,
    color: '#222',
    paddingVertical: 10,
    borderWidth: 0,
    paddingLeft: 0,
    marginBottom: 0,
  },
  inputError: {
    borderColor: palette.error,
  },
  errorText: {
    color: palette.error,
    fontSize: 13,
    marginTop: 2,
    marginLeft: 2,
  },
  loginBtn: {
    width: '100%',
    borderRadius: 10,
    paddingVertical: 16,
    backgroundColor: palette.mainColor,
    marginTop: 16,
    marginBottom: 14,
    alignItems: 'center',
  },
  loginBtnText: {
    color: palette.white,
    fontSize: 16,
    fontWeight: '600',
  },
  helpRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  helpText: {
    color: '#666',
    fontSize: 14,
    fontWeight: '400',
    paddingHorizontal: 8,
  },
  helpDivider: {
    width: 1,
    height: 12,
    backgroundColor: '#ddd',
    marginHorizontal: 2,
  },

  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 22,
  },
  footerLink: {
    color: '#222',
    fontSize: 13,
    fontWeight: '400',
    marginHorizontal: 2,
  },
  footerDot: {
    color: '#888',
    fontSize: 13,
    fontWeight: '400',
    marginHorizontal: 2,
  },

  socialBtn: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EDEDED',
    borderRadius: 10,
    paddingVertical: 16,
    paddingHorizontal: 14,
    marginBottom: 12,
  },
  socialInner: {
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'center', // 텍스트 정확히 가운데
  },
  socialIconBox: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  brandSquare: {
    width: 24,
    height: 24,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandLetter: {
    color: palette.white,
    fontWeight: '900',
    fontSize: 14,
    lineHeight: 24,
    textAlign: 'center',
  },
  brandImage: {
    width: 24,
    height: 24,
    borderRadius: 6,
    resizeMode: 'contain',
  },
  socialText: {
    color: palette.gray600,
    fontSize: 16,
    fontWeight: '600',
  },
});
