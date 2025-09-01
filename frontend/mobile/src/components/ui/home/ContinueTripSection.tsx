import TextBox from '@/components/atom/TextBox';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { ImageBackground, Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { palette } from '@/constants/colors';

const DUMMY_CONTINUE_TRIP = {
  id: '101',
  title: '여수 2박 3일',
  day: 2,
  progress: 68,
  cover:
    'https://images.unsplash.com/photo-1526481280698-8fcc13fd345d?q=80&w=1600&auto=format&fit=crop',
};

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

const ContinueTripSection = ({
  data,
  onContinue,
}: {
  data: typeof DUMMY_CONTINUE_TRIP | null;
  onContinue?: () => void;
}) => {
  if (!data) return null;
  return (
    <View style={styles.container}>
      <TouchableOpacity style={[styles.card, shadow]} activeOpacity={0.9} onPress={onContinue}>
        <ImageBackground
          source={{ uri: data.cover }}
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
              {data.title} · Day {data.day}
            </TextBox>

            <ProgressBar value={data.progress} />

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
