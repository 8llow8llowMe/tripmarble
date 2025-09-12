import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { palette } from '@/constants/colors';
import { useAppSelector } from '@/store/store';

export default function GameSummaryBanner({ counts }: any) {
  const { nickname } = useAppSelector((state) => state.userReducer);

  const today = new Date();
  const dateText = `${today.getMonth() + 1}월 ${today.getDate()}일`;

  //['#4BA1FD', '#A7D8FF']
  //['#4BA1FD', '#7BA9FF']
  //['#4BCFFD', '#4BA1FD']
  //['#4BA1FD', '#EAF4FF']

  return (
    <LinearGradient colors={['#4BA1FD', '#7BA9FF']} style={styles.container}>
      <View style={{ flex: 1 }}>
        <Text style={styles.date}>{dateText}</Text>
        <Text style={styles.title}>{nickname}님,</Text>
        <Text style={styles.title}>오늘도 여행을 이어가볼까요? ✈️</Text>
        <Text style={styles.small}>나의 여행 현황</Text>
        <View style={styles.row}>
          <Pill label={`진행 ${counts.ongoing}`} />
          <Pill label={`대기 ${counts.waiting}`} />
          <Pill label={`종료 ${counts.ended}`} />
        </View>
      </View>
    </LinearGradient>
  );
}

function Pill({ label }: { label: string }) {
  return (
    <View style={styles.pill}>
      <Text style={styles.pillText}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 16,
    marginTop: 8,
  },

  date: { color: '#E5E7EB', fontSize: 13, marginBottom: 6, fontWeight: '600' },
  title: { color: palette.white, fontSize: 18, fontWeight: '600', lineHeight: 26 },
  small: { color: '#E5E7EB', fontSize: 12, marginTop: 6, fontWeight: '600' },

  row: { flexDirection: 'row', gap: 8, marginTop: 10 },
  pill: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.16)',
  },
  pillText: { color: '#E5E7EB', fontSize: 12, fontWeight: '700' },
});
