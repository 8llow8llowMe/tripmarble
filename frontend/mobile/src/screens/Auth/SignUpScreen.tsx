import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useForm, FormProvider } from 'react-hook-form';
import { SafeAreaView } from 'react-native-safe-area-context';

import { palette } from '@/constants/colors';
import {
  SignUpComplete,
  SignUpHeader,
  StepEmail,
  StepName,
  StepNickname,
  StepPassword,
  StepTerms,
} from '@/components/ui/auth-signup';

export type SignUpFormType = {
  email: string;
  name: string;
  nickname: string;
  password: string;
  passwordConfirm: string;
  termsAllAgreed: boolean;
};

export default function SignUpScreen({ navigation }: any) {
  const [step, setStep] = useState(0);
  const methods = useForm<SignUpFormType>({
    mode: 'onChange',
    defaultValues: {
      email: '',
      name: '',
      nickname: '',
      password: '',
      passwordConfirm: '',
      termsAllAgreed: false,
    },
  });

  const goNext = () => setStep((s) => s + 1);
  const goPrev = () => {
    if (step === 0) {
      navigation.replace('LoginScreen');
    } else {
      setStep((s) => Math.max(0, s - 1));
    }
  };
  const goToLogin = () => navigation.replace('LoginScreen');

  return (
    <SafeAreaView style={styles.safeArea}>
      <SignUpHeader step={step + 1} total={6} onPrev={goPrev} />
      <FormProvider {...methods}>
        <View style={{ flex: 1, backgroundColor: palette.white }}>
          {step === 0 && <StepTerms onNext={goNext} />}
          {step === 1 && <StepEmail onNext={goNext} />}
          {step === 2 && <StepName onNext={goNext} />}
          {step === 3 && <StepNickname onNext={goNext} />}
          {step === 4 && <StepPassword onNext={goNext} />}
          {step === 5 && <SignUpComplete onGoLogin={goToLogin} />}
        </View>
      </FormProvider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: palette.white },
});
