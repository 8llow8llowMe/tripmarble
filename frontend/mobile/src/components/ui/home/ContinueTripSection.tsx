import TextBox from '@/components/atom/TextBox';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { ImageBackground, Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { palette } from '@/constants/colors';
import { GameSummary } from '@/hooks/game/useGameList';

// 공통 그림자
const shadow = Platform.select({
  ios: {
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  android: { elevation: 3 },
});

function getTripDay(startedAt: string): number {
  const start = new Date(startedAt);
  const today = new Date();

  // 시/분/초 무시하고 일자 기준 차이 계산
  const diffDays = Math.floor((today.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));

  return diffDays + 1; // Day 1부터 시작
}

function getProgress(startedAt: string, endedAt: string): number {
  const start = new Date(startedAt);
  const end = new Date(endedAt);
  const today = new Date();

  if (today <= start) return 0;
  if (today >= end) return 100;

  const total = end.getTime() - start.getTime();
  const current = today.getTime() - start.getTime();

  return Math.round((current / total) * 100);
}

const ContinueTripSection = ({
  data,
  onPressItem,
}: {
  data: GameSummary;
  onPressItem: (tripGameId: string) => void;
}) => {
  if (!data) return null;

  const day = getTripDay(data.startedAt);
  const progress = getProgress(data.startedAt, data.endedAt);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.card, shadow]}
        activeOpacity={0.9}
        onPress={() => onPressItem(data.tripGameId)}
      >
        <ImageBackground
          source={{ uri: data.representativeRegionImageUrl || undefined }}
          style={styles.bg}
          imageStyle={{ borderRadius: 16 }}
        >
          <LinearGradient
            colors={['rgba(0,0,0,0.05)', 'rgba(0,0,0,0.5)']}
            style={StyleSheet.absoluteFill}
          />

          <View style={styles.inner}>
            <TextBox size={13} color={palette.white} style={{ opacity: 0.85 }}>
              여행 계속하기
            </TextBox>
            <TextBox
              size={20}
              fontsName="Pretendard800"
              color={palette.white}
              style={{ marginTop: 2 }}
            >
              {data.title} · Day {day}
            </TextBox>

            <ProgressBar value={progress} />

            <View style={styles.cta}>
              <Ionicons name="play-circle" size={18} color={palette.white} />
              <TextBox size={15} color={palette.white} style={{ marginLeft: 6 }}>
                계속하기
              </TextBox>
            </View>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    </View>
  );
};

export default ContinueTripSection;

function ProgressBar({ value }: { value: number }) {
  return (
    <View style={styles.progressWrap}>
      <View style={[styles.progressFill, { width: `${Math.min(100, Math.max(0, value))}%` }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginTop: 32 },

  card: { marginHorizontal: 16, borderRadius: 16, overflow: 'hidden' },
  bg: { height: 160, borderRadius: 16, overflow: 'hidden' },
  inner: { flex: 1, padding: 16, justifyContent: 'flex-end' },

  progressWrap: {
    height: 6,
    backgroundColor: 'rgba(255,255,255,0.25)',
    borderRadius: 99,
    overflow: 'hidden',
    marginTop: 10,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#7CC0FF',
    borderRadius: 99,
  },

  cta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
});
