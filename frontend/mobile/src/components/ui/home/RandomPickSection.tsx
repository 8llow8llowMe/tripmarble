import TextBox from '@/components/atom/TextBox';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { ImageBackground, Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SectionHeader } from '@/components/layout/header/SectionHeader';

const DUMMY_RANDOM_PICK = {
  contentId: '2710820',
  originalImageUrl: 'http://tong.visitkorea.or.kr/cms/resource/22/2745222_image2_1.jpg',
  tripSpotId: '21973',
  tripSpotName: '설악해수욕장',
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
}: {
  data: typeof DUMMY_RANDOM_PICK;
  onPress?: () => void;
  onRefresh?: () => void;
}) => {
  return (
    <View style={styles.container}>
      <SectionHeader
        title="오늘의 랜덤 PICK!"
        // rightNode={`
        //   <TouchableOpacity onPress={onRefresh} style={styles.iconBtn} activeOpacity={0.8}>
        //     <MaterialCommunityIcons name="dice-5-outline" size={18} color={palette.gray600} />
        //     <TextBox size={13} color={palette.gray600} style={{ marginLeft: 6 }}>
        //       다시 뽑기
        //     </TextBox>
        //   </TouchableOpacity>
        // }
      />
      <TouchableOpacity style={[styles.card, shadow]} activeOpacity={0.9} onPress={onPress}>
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
