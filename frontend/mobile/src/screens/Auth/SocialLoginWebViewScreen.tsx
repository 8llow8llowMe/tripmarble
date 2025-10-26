import React, { useEffect, useRef, useState } from 'react';
import { View, ActivityIndicator, StyleSheet, Alert } from 'react-native';
import WebView from 'react-native-webview';
import { useAppDispatch } from '@/store/store';
import { authorize } from '@/store/redux/auth/auth';
import { setUser } from '@/store/redux/user/user';
import { setAsyncStorageItem } from '@/utils/asyncStorage';
import { STORAGE_KEY } from '@/constants/keys';
import { palette } from '@/constants/colors';
import { END_POINTS } from '@/constants/apis';
import { authApiClient } from '@/apis/axiosClient';

type Provider = 'NAVER' | 'KAKAO' | 'GOOGLE';

export default function SocialLoginWebViewScreen({ route, navigation }: any) {
  const { provider } = route.params as { provider: Provider };
  const [loginUrl, setLoginUrl] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();

  const handledRef = useRef(false); // 중복 처리 방지
  const webviewRef = useRef<WebView>(null);

  // ✅ 콜백 URL 화이트리스트
  const CALLBACK_WHITELIST = [
    'http://localhost:5173/auth/callback/kakao',
    'http://localhost:5173/auth/callback/naver',
    'https://tripmarble-dev.store/auth/callback/kakao',
    'https://tripmarble-dev.store/auth/callback/naver',
    'https://tripmarble.com/auth/callback/kakao',
    'https://tripmarble.com/auth/callback/naver',
  ];

  const isCallbackUrl = (url: string) =>
    CALLBACK_WHITELIST.some((prefix) => url.startsWith(prefix));

  const getQueryParam = (url: string, key: string) => {
    try {
      const u = new URL(url);
      return u.searchParams.get(key) ?? '';
    } catch {
      const regex = new RegExp(`[?&]${key}=([^&]+)`);
      return url.match(regex)?.[1] ?? '';
    }
  };

  // ✅ 1) 진입 시 authorize URL 요청
  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const res = await authApiClient.get(END_POINTS.SOCIAL_AUTHORIZE(provider));

        if (!cancelled) {
          const ok = res?.data?.dataHeader?.success;
          const url = res?.data?.dataBody;
          if (ok && typeof url === 'string') {
            setLoginUrl(url);
          } else {
            throw new Error('로그인 URL을 불러오지 못했습니다.');
          }
        }
      } catch (e: any) {
        if (!cancelled) {
          Alert.alert('오류', e?.message ?? '소셜 로그인 요청 중 문제가 발생했습니다.');
          navigation.goBack();
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
      handledRef.current = false;
    };
  }, [provider, navigation]);

  // ✅ 2) 콜백으로 가는 네비게이션은 "차단"하고 그 자리에서 code/state 처리
  const onShouldStartLoadWithRequest = (req: any) => {
    const url: string = req?.url ?? '';

    if (isCallbackUrl(url)) {
      // 콜백 화면을 WebView에 로드하지 않음 → 깜빡임/ERR 방지
      if (!handledRef.current) {
        handledRef.current = true;
        handleAuthCode(url);
      }
      return false;
    }

    return true; // 그 외 페이지는 정상 로드
  };

  // ✅ 3) code(+state) 교환 → 토큰 저장/Redux 반영
  const handleAuthCode = async (callbackUrl: string) => {
    const code = getQueryParam(callbackUrl, 'code');
    const state = getQueryParam(callbackUrl, 'state'); // NAVER 방어용

    if (!code) {
      handledRef.current = false;
      Alert.alert('오류', '인증 코드가 없습니다.');
      return;
    }

    try {
      const params: any = { code };
      // 네이버가 state 검증을 사용하는 경우 서버가 필요로 하면 같이 전달
      if (provider === 'NAVER' && state) params.state = state;

      const tokenRes = await authApiClient.get(END_POINTS.SOCIAL_LOGIN(provider), {
        params,
      });

      const ok = tokenRes?.data?.dataHeader?.success;
      if (!ok) throw new Error('인증에 실패했습니다.');

      const { accessToken, memberId } = tokenRes.data.dataBody;

      await setAsyncStorageItem(STORAGE_KEY.ACCESS_TOKEN, accessToken);
      await setAsyncStorageItem(STORAGE_KEY.MEMBER_ID, String(memberId));
      dispatch(authorize({ accessToken, memberId }));
      dispatch(setUser({ memberId }));

      //   Alert.alert('로그인 완료', `${provider} 로그인 성공!`);
      navigation.goBack();
    } catch (err: any) {
      handledRef.current = false; // 재시도 허용

      const status = err?.response?.status;
      const resultCode = err?.response?.data?.dataHeader?.resultCode;
      const resultMessage = err?.response?.data?.dataHeader?.resultMessage;

      if (status === 409 && resultCode === 'AUTH_004') {
        Alert.alert(
          '이미 가입된 계정',
          typeof resultMessage === 'string'
            ? resultMessage
            : '다른 방식으로 이미 가입된 계정입니다.',
          [
            {
              text: '다른 이메일로 진행',
              onPress: () => {
                navigation.goBack();
              },
              style: 'default',
            },
            {
              text: '닫기',
              style: 'cancel',
              onPress: () => {
                navigation.goBack();
              },
            },
          ].filter(Boolean) as any,
        );
        return;
      }

      // 그 외 일반 오류
      Alert.alert(
        '로그인 실패',
        resultMessage || err?.message || '로그인 처리 중 오류가 발생했습니다.',
      );
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" style={styles.loading} color={palette.mainColor} />;
  }

  return (
    <View style={{ flex: 1 }}>
      {loginUrl ? (
        <WebView
          ref={webviewRef}
          source={{ uri: loginUrl }}
          startInLoadingState
          renderLoading={() => <ActivityIndicator size="large" style={styles.loading} />}
          onShouldStartLoadWithRequest={onShouldStartLoadWithRequest}
          // 콜백 이동 중 ERR 연결거부 등은 조용히 무시 (콜백은 이미 가로채 처리됨)
          onError={(e) => {
            const url = e?.nativeEvent?.url ?? '';
            if (url && isCallbackUrl(url)) return;
            console.warn('WebView error:', e.nativeEvent);
          }}
        />
      ) : (
        <View style={styles.center}>
          <AlertMessage text="로그인 URL이 없습니다." />
        </View>
      )}
    </View>
  );
}

function AlertMessage({ text }: { text: string }) {
  useEffect(() => {
    Alert.alert('오류', text);
  }, [text]);
  return null;
}

const styles = StyleSheet.create({
  loading: { marginTop: 20 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});
