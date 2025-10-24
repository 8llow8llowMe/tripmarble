import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useFormContext } from 'react-hook-form';
import { palette } from '@/constants/colors';
import TextBox from '@/components/atom/TextBox';
import useVerifyCodeMutaion from '@/hooks/auth/useVerifyCode';
import useSendCodeMutaion from '@/hooks/auth/useSendCode';

export default function StepEmail({ onNext }: { onNext: () => void }) {
  const { setValue, watch } = useFormContext();
  const email = watch('email');

  const [code, setCode] = useState('');
  const [isSent, setIsSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [timer, setTimer] = useState(300);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // 이메일 정규식
  const isValidEmail = (email: string) => /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);

  const { sendCode, isPending: sending } = useSendCodeMutaion();
  const { verifyCode, isPending: verifying } = useVerifyCodeMutaion();

  // 타이머 관리
  useEffect(() => {
    if (isSent && timer > 0) {
      timerRef.current = setTimeout(() => setTimer((t) => t - 1), 1000);
    }
    if (timer === 0) {
      setIsSent(false);
      setErrorMsg('인증 시간이 만료되었습니다. 다시 시도해주세요.');
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isSent, timer]);

  // 이메일 변경시 리셋
  useEffect(() => {
    setIsSent(false);
    setIsVerified(false);
    setCode('');
    setErrorMsg('');
    setTimer(300);
  }, [email]);

  // 인증코드 전송
  const handleSendCode = async () => {
    setErrorMsg('');
    try {
      const data = await sendCode({ email });
      if (data.dataHeader.success) {
        console.log('이메일 인증코드 전송 성공');
        setIsSent(true);
        setTimer(300);
      }
    } catch (e: any) {
      setErrorMsg(
        e?.response?.data?.dataHeader?.resultMessage ||
          e?.message ||
          '인증코드 전송 도중 오류가 발생했습니다.',
      );
    }
  };

  // 인증코드 확인
  const handleVerifyCode = async () => {
    setErrorMsg('');
    try {
      await verifyCode(
        { email, code },
        {
          onSuccess: (data) => {
            if (data.dataHeader.success) {
              console.log('이메일 인증 성공');
            }
          },
        },
      );
      setIsVerified(true);
    } catch (e: any) {
      setErrorMsg(e?.message || '인증에 실패했습니다. 코드를 확인해주세요.');
    }
  };

  // "다음" 버튼 활성화 조건
  const canNext = !!email && isValidEmail(email) && isVerified;

  return (
    <View style={styles.container}>
      <TextBox size={20} fontsName="Pretendard700" style={styles.title}>
        로그인에 사용할{'\n'}
        아이디를 입력해주세요.
      </TextBox>

      {/* 이메일 입력 + 인증코드 발송 */}
      <View style={styles.inputRow}>
        <TextInput
          style={styles.inputWithBtn}
          placeholder="이메일을 입력해주세요."
          value={email}
          onChangeText={(v) => setValue('email', v)}
          autoCapitalize="none"
          keyboardType="email-address"
          placeholderTextColor="#B0B0B0"
          editable={!isSent}
          returnKeyType="done"
        />
        <TouchableOpacity
          style={[
            styles.inlineBtn,
            isValidEmail(email) && !isSent ? styles.activeInlineBtn : styles.inactiveInlineBtn,
          ]}
          disabled={!isValidEmail(email) || isSent || sending}
          onPress={handleSendCode}
        >
          <TextBox
            size={14}
            fontsName="Pretendard700"
            color={isValidEmail(email) && !isSent ? palette.white : palette.gray200}
          >
            {sending ? '전송중...' : isSent ? '재전송' : '인증코드 받기'}
          </TextBox>
        </TouchableOpacity>
      </View>
      {email && !isValidEmail(email) && (
        <Text style={styles.error}>이메일 형식이 올바르지 않습니다.</Text>
      )}

      {/* 인증코드 입력 + 인증 확인 */}
      {isSent && (
        <View style={[styles.inputRow, { marginTop: 18 }]}>
          <TextInput
            style={styles.inputWithBtn}
            placeholder="인증코드 입력"
            value={code}
            onChangeText={setCode}
            keyboardType="number-pad"
            maxLength={8}
            editable={!isVerified}
            returnKeyType="done"
          />
          <TouchableOpacity
            style={[
              styles.inlineBtn,
              code.length === 8 && !isVerified ? styles.activeInlineBtn : styles.inactiveInlineBtn,
            ]}
            onPress={handleVerifyCode}
            disabled={code.length !== 8 || isVerified || verifying}
          >
            <TextBox
              size={14}
              fontsName="Pretendard700"
              color={code.length === 8 && !isVerified ? palette.white : palette.gray200}
            >
              {verifying ? '확인중...' : isVerified ? '완료' : '인증 확인'}
            </TextBox>
          </TouchableOpacity>
          <Text style={styles.timer}>
            {Math.floor(timer / 60)}:{String(timer % 60).padStart(2, '0')}
          </Text>
        </View>
      )}
      {isVerified && <Text style={styles.success}>이메일 인증이 완료되었습니다.</Text>}
      {errorMsg ? <Text style={styles.error}>{errorMsg}</Text> : null}

      {/* 다음 버튼 */}
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
  container: { justifyContent: 'center', alignItems: 'flex-start', paddingHorizontal: 16 },
  title: { marginBottom: 32 },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#F7F8FA',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e4e9f0',
    marginBottom: 4,
    paddingHorizontal: 0, // 버튼까지 배경 통일
    // paddingVertical: 2, // 필요시
  },
  inputWithBtn: {
    flex: 1,
    backgroundColor: 'transparent',
    color: '#222',
    paddingVertical: 16,
    paddingHorizontal: 18,
    fontSize: 16,
  },
  inlineBtn: {
    borderRadius: 16,
    marginRight: 8,
    paddingHorizontal: 14,
    paddingVertical: 8,
    minWidth: 85,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeInlineBtn: {
    backgroundColor: palette.mainColor,
  },
  inactiveInlineBtn: {
    backgroundColor: palette.gray100,
  },
  timer: {
    marginLeft: 4,
    fontSize: 14,
    color: palette.gray300,
    fontWeight: 'bold',
    width: 48,
    textAlign: 'center',
  },
  error: {
    color: palette.error,
    fontSize: 14,
    marginTop: 8,
    marginLeft: 4,
  },
  success: {
    color: palette.mainColor,
    fontSize: 14,
    marginTop: 12,
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
