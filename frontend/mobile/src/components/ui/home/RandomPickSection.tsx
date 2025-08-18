import TextBox from '@/components/atom/TextBox';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { ImageBackground, Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { palette } from '@/constants/colors';
import { SectionHeader } from './SectionHeader';

const DUMMY_RANDOM_PICK = {
  id: 777,
  name: '속초 대포항',
  image:
    'https://images.unsplash.com/photo-1493558103817-58b2924bce98?q=80&w=1600&auto=format&fit=crop',
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

const RandomPickSection = ({
  data,
  onPress,
  onRefresh,
}: {
  data: typeof DUMMY_RANDOM_PICK;
  onPress?: () => void;
  onRefresh: () => void;
}) => {
  return (
    <View style={styles.container}>
      <SectionHeader
        title="오늘의 랜덤 픽"
        rightNode={
          <TouchableOpacity onPress={onRefresh} style={styles.iconBtn} activeOpacity={0.8}>
            <MaterialCommunityIcons name="dice-5-outline" size={18} color={palette.gray600} />
            <TextBox size={13} color={palette.gray600} style={{ marginLeft: 6 }}>
              다시 뽑기
            </TextBox>
          </TouchableOpacity>
        }
      />
      <TouchableOpacity style={[styles.card, shadow]} activeOpacity={0.9} onPress={onPress}>
        <ImageBackground
          source={{ uri: data.image }}
          style={styles.bg}
          imageStyle={{ borderRadius: 16 }}
        >
          <LinearGradient
            colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.55)']}
            style={StyleSheet.absoluteFill}
          />
          <View style={styles.inner}>
            <MaterialCommunityIcons name="map-marker-radius" size={18} color="#fff" />
            <TextBox size={18} fontsName="Pretendard800" color="#fff" style={{ marginLeft: 8 }}>
              {data.name}
            </TextBox>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    </View>
  );
};

export default RandomPickSection;

const styles = StyleSheet.create({
  container: { marginTop: 32 },
  iconBtn: { flexDirection: 'row', alignItems: 'center' },

  card: { marginHorizontal: 16, borderRadius: 16, overflow: 'hidden' },
  bg: { height: 160, borderRadius: 16, overflow: 'hidden' },
  inner: { flex: 1, padding: 16, justifyContent: 'flex-end' },
});
