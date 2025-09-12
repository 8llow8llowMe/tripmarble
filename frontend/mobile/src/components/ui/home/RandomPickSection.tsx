import TextBox from '@/components/atom/TextBox';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { ImageBackground, Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SectionHeader } from '@/components/layout/header/SectionHeader';
import { DUMMY_RANDOM_PICK } from '@/constants/dummyData';

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
  onPressItem,
}: {
  data: typeof DUMMY_RANDOM_PICK;
  onPressItem: (tripSpotId: string) => void;
}) => {
  return (
    <View style={styles.container}>
      <SectionHeader title="오늘의 여행 PICK!" />

      <TouchableOpacity
        style={[styles.card, shadow]}
        activeOpacity={0.9}
        onPress={() => onPressItem(data.tripSpotId)}
      >
        <ImageBackground
          source={{ uri: data.originalImageUrl }}
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
              {data.tripSpotName}
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
