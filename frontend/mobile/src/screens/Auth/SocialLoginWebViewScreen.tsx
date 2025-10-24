import React, { useEffect, useRef, useState } from 'react';
import { View, ActivityIndicator, StyleSheet, Alert } from 'react-native';
import WebView from 'react-native-webview';
import axios from 'axios';
import { useAppDispatch } from '@/store/store';
import { authorize } from '@/store/redux/auth/auth';
import { setUser } from '@/store/redux/user/user';
import { setAsyncStorageItem } from '@/utils/asyncStorage';
import { STORAGE_KEY } from '@/constants/keys';
import { palette } from '@/constants/colors';

type Provider = 'NAVER' | 'KAKAO' | 'GOOGLE';

export default function SocialLoginWebViewScreen({ route, navigation }: any) {
  const { provider } = route.params as { provider: Provider };
  const [loginUrl, setLoginUrl] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();

  const handledRef = useRef(false); // 중복 처리 방지
  const webviewRef = useRef<WebView>(null);

  // 1) 진입 시 authorize URL 요청
  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const res = await axios.get(
          `http://www.tripmarble-dev.store:7071/api/v1/auth/${provider}/authorize`,
          { headers: { accept: '*/*' } },
        );
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

  // 2) redirect에서 code 감지 → 백엔드로 교환
  const handleNavChange = async (event: any) => {
    const url: string = event?.url ?? '';
    if (handledRef.current) return;
    if (!url.includes('?code=')) return;

    handledRef.current = true; // 한 번만 처리
    const code = url.split('code=')[1].split('&')[0];

    try {
      const tokenRes = await axios.get(
        `http://www.tripmarble-dev.store:7071/api/v1/auth/${provider}`,
        { params: { code } },
      );

      const ok = tokenRes?.data?.dataHeader?.success;
      if (!ok) throw new Error('인증에 실패했습니다.');

      const { accessToken, memberId } = tokenRes.data.dataBody;

      // 저장 + 리덕스 반영
      await setAsyncStorageItem(STORAGE_KEY.ACCESS_TOKEN, accessToken);
      await setAsyncStorageItem(STORAGE_KEY.MEMBER_ID, String(memberId));
      dispatch(authorize({ accessToken, memberId }));
      dispatch(setUser({ memberId }));

      Alert.alert('로그인 완료', `${provider} 로그인 성공!`);
      navigation.goBack();
    } catch (err: any) {
      handledRef.current = false; // 실패 시 재시도 가능하게
      Alert.alert('로그인 실패', err?.message ?? '로그인 처리 중 오류가 발생했습니다.');
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
          onNavigationStateChange={handleNavChange}
          startInLoadingState
          renderLoading={() => <ActivityIndicator size="large" style={styles.loading} />}
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
