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
import gyeongjuImage from '@images/places/gyeongju.png';

import { useNavigation } from '@react-navigation/native';
import TextBox from '@/components/atom/TextBox';
import { palette } from '@/constants/colors';
import { AppNavigatorNavigationProp } from '@/types/navigation/screen';
import useRepresentativeRegionsListQuery from '@/hooks/trip/useRepresentativeRegionsList';
import {
  HeroBannerSection,
  QuickFilterSection,
  PopularPlacesSection,
  TrendKeywordsSection,
  MagazineSection,
} from '@/components/ui/explore';

const bgHeight = Dimensions.get('window').height * 0.5;
const searchBoxHeight = 56; // padding+borderRadius 감안, 대략 값(조정 가능)

export default function ExploreScreen() {
  const navigation = useNavigation<AppNavigatorNavigationProp>();
  const { representativeRegionsList } = useRepresentativeRegionsListQuery();

  console.log('🥸🥸🥸', representativeRegionsList);

  // 대표여행지 스크린으로 이동
  const goToSpotListScreen = (representativeRegionId: string) => {
    navigation.navigate('SpotStackNavigator', {
      screen: 'SpotListScreen',
      params: { representativeRegionId: representativeRegionId },
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: palette.white }}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* <View style={{ position: 'relative' }}>
          <Image source={jejuImage} style={styles.backgroundImage} />
          <View style={styles.overlay} />
        </View> */}
        {/* <View style={[styles.searchBoxWrapper, { top: bgHeight - searchBoxHeight / 2 }]}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.navigate('SearchScreen')}
            style={styles.searchBox}
          >
            <TextBox size={15} color={palette.gray300}>
              여행지를 검색해보세요.
            </TextBox>
          </TouchableOpacity>
        </View> */}
        <HeroBannerSection />
        {/* <SearchBox /> 검색  */}
        {/* <QuickFilterSection /> */}
        <PopularPlacesSection />
        <TrendKeywordsSection />
        <MagazineSection />
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
