import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  StatusBar,
  Platform,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { palette } from '@/constants/colors';
import { AppNavigatorNavigationProp } from '@/types/navigation/screen';
import useRepresentativeRegionsListQuery from '@/hooks/trip/useRepresentativeRegionsList';
import { PopularPlacesSection, TrendKeywordsSection } from '@/components/ui/explore';
import { getRandomItems } from '@/utils/random';
import { RandomPickSection } from '@/components/ui/home';
import { DUMMY_RANDOM_PICK } from '@/constants/dummyData';

import jejuImage from '@assets/images/places/jeju2.png';
import TextBox from '@/components/atom/TextBox';
const bgHeight = Dimensions.get('window').height * 0.45;
const searchBoxHeight = 56; // padding+borderRadius 감안, 대략 값(조정 가능)

export default function ExploreScreen() {
  const navigation = useNavigation<AppNavigatorNavigationProp>();
  const { representativeRegionsList } = useRepresentativeRegionsListQuery();
  const randomRepresentativeRegionsList = getRandomItems(representativeRegionsList ?? [], 4);

  // 대표여행지 스크린으로 이동
  const goToSpotListScreen = (representativeRegionId: string) => {
    navigation.navigate('SpotStackNavigator', {
      screen: 'SpotListScreen',
      params: { representativeRegionId: representativeRegionId },
    });
  };

  // 대표여행지 상세 스크린으로 이동
  const goToSpotDetailScreen = (tripSpotId: string) => {
    navigation.navigate('SpotStackNavigator', {
      screen: 'SpotDetailScreen',
      params: { tripSpotId },
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

        {/* <QuickFilterSection /> */}
        {/* <MagazineSection /> */}

        <RandomPickSection data={DUMMY_RANDOM_PICK} onPressItem={goToSpotDetailScreen} />
        <PopularPlacesSection
          title="지금 인기있는 여행지"
          data={randomRepresentativeRegionsList}
          onPressItem={goToSpotListScreen}
        />
        <TrendKeywordsSection />
      </ScrollView>
    </View>
  );
}

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
});
