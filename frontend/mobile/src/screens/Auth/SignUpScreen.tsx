import React, { useState } from 'react';
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

import logo from '../../../assets/icon.png';

export default function SignUpScreen({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [realName, setRealName] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.inner}>
        <Image source={logo} style={styles.logo} />
        <Text style={styles.title}>회원가입</Text>

        <TextInput
          style={styles.input}
          placeholder="이메일"
          placeholderTextColor="#B0B0B0"
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="이름"
          placeholderTextColor="#B0B0B0"
          value={realName}
          onChangeText={setRealName}
        />
        <TextInput
          style={styles.input}
          placeholder="닉네임"
          placeholderTextColor="#B0B0B0"
          value={nickname}
          onChangeText={setNickname}
        />
        <TextInput
          style={styles.input}
          placeholder="비밀번호"
          placeholderTextColor="#B0B0B0"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>회원가입</Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={styles.footerText}>이미 계정이 있으신가요?</Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.footerButton}>로그인</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const POINT_COLOR = '#4BA1FD';

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
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
    color: POINT_COLOR,
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
    backgroundColor: POINT_COLOR,
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
    color: POINT_COLOR,
    fontWeight: 'bold',
  },
});
