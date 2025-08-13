import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function SignUpComplete({ onGoLogin }: { onGoLogin: () => void }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>회원가입이 완료되었습니다!</Text>
      <Text style={styles.subtitle}>로그인 후 서비스를 이용해 주세요.</Text>
      <TouchableOpacity style={styles.button} onPress={onGoLogin}>
        <Text style={styles.buttonText}>로그인</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', color: '#4BA1FD', marginBottom: 16 },
  subtitle: { fontSize: 16, color: '#222', marginBottom: 40 },
  button: {
    backgroundColor: '#4BA1FD',
    paddingHorizontal: 40,
    paddingVertical: 18,
    borderRadius: 8,
  },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 18 },
});
