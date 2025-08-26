import React from 'react';
import {
  View,
  ScrollView,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Platform,
  Dimensions,
} from 'react-native';
import jejuImage from '@images/places/jeju2.png';
import gyeongjuImage from '@images/places/gyeongju.png';

import { CompositeScreenProps, useNavigation } from '@react-navigation/native';
import TextBox from '@/components/atom/TextBox';
import { palette } from '@/constants/colors';
import { AppNavigatorNavigationProp } from '@/types/navigation/screen';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AppNavigatorParamList, ExploreStackParamList } from '@/types/navigation/navigation';

const bgHeight = Dimensions.get('window').height * 0.5;
const searchBoxHeight = 56; // padding+borderRadius 감안, 대략 값(조정 가능)

export default function ExploreScreen() {
  const navigation = useNavigation<AppNavigatorNavigationProp>();

  const popularPlaces = [
    { name: '부산', image: gyeongjuImage, representativeRegionId: 5 },
    { name: '제주도', image: gyeongjuImage, representativeRegionId: 10 },
    { name: '강릉', image: gyeongjuImage, representativeRegionId: 6 },
    { name: '경주', image: gyeongjuImage, representativeRegionId: 8 },
  ];

  // 대표여행지 스크린으로 이동
  const goToSpotListScreen = (representativeRegionId: number) => {
    navigation.navigate('SpotStackNavigator', {
      screen: 'SpotListScreen',
      params: { representativeRegionId: representativeRegionId },
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: palette.white }}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={{ position: 'relative' }}>
          <Image source={jejuImage} style={styles.backgroundImage} />
          <View style={styles.overlay} />
        </View>

        <View style={[styles.searchBoxWrapper, { top: bgHeight - searchBoxHeight / 2 }]}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.navigate('SearchScreen')}
            style={styles.searchBox}
          >
            <TextBox size={15} color={palette.gray300}>
              여행지를 검색해보세요.
            </TextBox>
          </TouchableOpacity>
        </View>

        <TextBox size={18} fontsName="Pretendard600" style={styles.sectionTitle}>
          지금 인기있는 여행지
        </TextBox>
        <View style={styles.placeWrapper}>
          {popularPlaces.map((place, idx) => (
            <TouchableOpacity
              key={idx}
              style={styles.placeItem}
              activeOpacity={0.7}
              onPress={() => {
                goToSpotListScreen(place.representativeRegionId);
              }}
            >
              <View style={styles.placeCircle}>
                <Image source={place.image} style={styles.placeImage} resizeMode="cover" />
              </View>
              <TextBox size={15} color={palette.gray600} style={styles.placeName}>
                {place.name}
              </TextBox>
            </TouchableOpacity>
          ))}
        </View>

        <TextBox size={18} fontsName="Pretendard600" style={styles.sectionTitle}>
          현재 진행중인 트립마블
        </TextBox>
        <View style={styles.card} />
        <View style={styles.card} />

        <TextBox size={18} fontsName="Pretendard600" style={styles.sectionTitle}>
          어떤 것을 넣으면 좋을까
        </TextBox>
        <View style={styles.card} />
        <View style={styles.card} />
      </ScrollView>
    </View>
  );
}

const CIRCLE_SIZE = 70;
const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: 20,
  },
  backgroundImage: {
    width: '100%',
    height: bgHeight,
    resizeMode: 'cover',
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    // backgroundColor: "rgba(0,0,0,0.3)",
  },
  searchBoxWrapper: {
    width: '100%',
    paddingHorizontal: 16,
    position: 'absolute',
    zIndex: 2,
    alignItems: 'center',
  },
  searchBox: {
    backgroundColor: palette.white,
    padding: 12,
    elevation: 3,
    borderRadius: 30,
    paddingVertical: 16,
    paddingHorizontal: 20,
    shadowColor: palette.black,
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    width: '98%',
  },
  sectionTitle: {
    marginTop: searchBoxHeight / 2 + 24,
    marginBottom: 14,
    paddingHorizontal: 16,
  },
  placeWrapper: {
    flexDirection: 'row',
    paddingHorizontal: 26,
    justifyContent: 'space-between',
  },
  placeItem: {
    alignItems: 'center',
  },
  placeCircle: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    borderWidth: 1,
    borderColor: palette.gray200,
    backgroundColor: palette.gray50,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    marginBottom: 6,
  },
  placeImage: {
    width: '100%',
    height: '100%',
  },
  placeName: {
    marginTop: 2,
  },
  card: {
    height: 120,
    backgroundColor: palette.gray50,
    borderRadius: 10,
    marginHorizontal: 16,
    marginBottom: 12,
  },
});
