import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useFormContext } from 'react-hook-form';
import TextBox from '@/components/atom/TextBox';
import { palette } from '@/constants/colors';

export default function StepNickname({ onNext }: { onNext: () => void }) {
  const { setValue, watch } = useFormContext();
  const nickname = watch('nickname');

  return (
    <View style={styles.container}>
      <TextBox size={20} fontsName="Pretendard700" style={styles.title}>
        로그인에 사용할{'\n'}
        닉네임을 입력해 주세요.
      </TextBox>

      <TextInput
        style={styles.input}
        placeholder="닉네임"
        value={nickname}
        onChangeText={(v) => setValue('nickname', v)}
      />

      <TouchableOpacity
        style={[styles.button, nickname ? styles.active : styles.inactive]}
        onPress={onNext}
        disabled={!nickname}
      >
        <TextBox
          size={16}
          fontsName="Pretendard700"
          color={nickname ? palette.white : palette.gray200}
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
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#f7f8fa',
    fontSize: 16,
    padding: 16,
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
