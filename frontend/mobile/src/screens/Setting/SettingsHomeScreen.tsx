import TextBox from '@/components/atom/TextBox';
import Divider from '@/components/common/Divider';
import { palette } from '@/constants/colors';
import { Ionicons } from '@expo/vector-icons';

import React from 'react';
import { SafeAreaView, TouchableOpacity } from 'react-native';
import { View, StyleSheet, ScrollView } from 'react-native';

const SettingsHomeScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.section}>
          <TouchableOpacity>
            <View style={styles.row}>
              <TextBox size={16} fontsName="Pretendard700" style={styles.label}>
                프로필 수정
              </TextBox>
              <Ionicons name="chevron-forward" size={18} color={palette.gray300} />
            </View>
          </TouchableOpacity>
          <Divider />
        </View>

        <View style={styles.section}>
          <TextBox size={16} fontsName="Pretendard700" style={styles.label}>
            약관 및 정책
          </TextBox>

          <View style={{ gap: 28 }}>
            <TouchableOpacity>
              <View style={styles.row}>
                <TextBox size={15}>이용약관</TextBox>
                <Ionicons name="chevron-forward" size={18} color={palette.gray300} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={styles.row}>
                <TextBox size={15}>개인정보처리방침</TextBox>
                <Ionicons name="chevron-forward" size={18} color={palette.gray300} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={styles.row}>
                <TextBox size={15}>위치기반서비스 이용약관</TextBox>
                <Ionicons name="chevron-forward" size={18} color={palette.gray300} />
              </View>
            </TouchableOpacity>
            <Divider />
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.row}>
            <View style={{ gap: 4, flexDirection: 'row', alignItems: 'center' }}>
              <TextBox size={16} fontsName="Pretendard700" style={styles.label}>
                앱 정보
              </TextBox>
            </View>
            <TextBox size={13} color={palette.gray600}>
              현재 버전
            </TextBox>
          </View>

          <TouchableOpacity>
            <View style={styles.row}>
              <TextBox size={15}>오픈소스 라이선스</TextBox>
              <Ionicons name="chevron-forward" size={18} color={palette.gray300} />
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: palette.white },
  container: { padding: 16 },

  section: {
    paddingVertical: 16,
    gap: 28,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontWeight: '600',
  },
});

export default SettingsHomeScreen;
