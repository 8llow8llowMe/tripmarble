import { palette } from '@/constants/colors';
import useLogoutMutation from '@/hooks/auth/useLogout';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';

export default function ProfileScreen() {
  const { logout, isPending } = useLogoutMutation();

  const handleLogout = () => {
    logout();
  };

  return (
    <View style={styles.container}>
      <Text>Profile Screen</Text>
      <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout} disabled={isPending}>
        {isPending ? (
          <ActivityIndicator color={palette.mainColor} />
        ) : (
          <Text style={styles.logoutText}>로그아웃</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  logoutBtn: {
    marginTop: 36,
    backgroundColor: palette.mainColor,
    paddingHorizontal: 36,
    paddingVertical: 14,
    borderRadius: 30,
  },
  logoutText: { color: palette.white, fontSize: 17, fontWeight: 'bold' },
});
