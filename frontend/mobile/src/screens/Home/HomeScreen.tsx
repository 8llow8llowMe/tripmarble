import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

import TextBox from '@/components/atom/TextBox';
import { palette } from '@/constants/colors';
import { AppNavigatorNavigationProp } from '@/types/navigation/screen';
import {
  ContinueTripSection,
  FriendsBannerSection,
  HistorySection,
  RandomPickSection,
  RecommendedPlacesSection,
} from '@/components/ui/home';
import GameSummaryBanner from '@/components/common/banner/GameSummaryBanner';
import { useGameLists } from '@/hooks/game/useGameList';
import { useAppSelector } from '@/store/store';
import useTripSpotQuery from '@/hooks/trip/useSpot';
import { DUMMY_FRIENDS, DUMMY_PLACES, DUMMY_RANDOM_PICK } from '@/constants/dummyData';

export default function HomeScreen() {
  const navigation = useNavigation<AppNavigatorNavigationProp>();
  const { nickname } = useAppSelector((state) => state.userReducer);

  const { waiting, ongoing, ended } = useGameLists();
  // const { tripSpot, isLoading, isError, refetch } = useTripSpotQuery({ tripSpotId });

  // 가장 최신의 진행중인 게임 추출
  const ongoingContents = ongoing.data?.data.dataBody.contents ?? [];
  const latestTrip = ongoingContents.reduce((latest, item) => {
    return new Date(item.startedAt) > new Date(latest.startedAt) ? item : latest;
  }, ongoingContents[0]);

  // 진행중인 게임 스크린으로 이동
  const goToGameOngoingScreen = (tripGameId: string) => {
    navigation.navigate('GamePlayStackNavigator', {
      screen: 'GameDetailScreen',
      params: { tripGameId },
    });
  };

  // 게임 목록 스크린으로 이동
  // const goToGameListScreen = (status?: 'WAITING' | 'ONGOING' | 'ENDED') => {
  //   navigation.navigate('GamePlayStackNavigator', {
  //     screen: 'GameListScreen',
  //     params: status ? { status } : {},
  //   });
  // };

  // 대표여행지 상세 스크린으로 이동
  const goToSpotDetailScreen = (tripSpotId: string) => {
    navigation.navigate('SpotStackNavigator', {
      screen: 'SpotDetailScreen',
      params: { tripSpotId },
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scroll}>
        {/* 헤더 */}
        <HeaderSection nickname={nickname} />
        <View style={styles.headerBanner}>
          <GameSummaryBanner
            counts={{
              ongoing: ongoing.data?.data.dataBody.contents.length,
              waiting: waiting.data?.data.dataBody.contents.length,
              ended: ended.data?.data.dataBody.contents.length,
            }}
          />
        </View>

        {/* 검색 */}
        {/* <SearchSection onPress={() => navigation.navigate('SearchScreen')} /> */}

        {/* 내 기록 */}
        {/* <HistorySection
          title="나의 게임 기록"
          data={DUMMY_JOURNALS}
          onPressMore={() => goToGameListScreen()}
        /> */}

        {/* 여행 계속하기 */}
        {latestTrip && (
          <ContinueTripSection data={latestTrip} onPressItem={goToGameOngoingScreen} />
        )}

        {/* 추천 여행지 */}
        <RecommendedPlacesSection
          title="추천 여행지"
          data={DUMMY_PLACES}
          onPressItem={goToSpotDetailScreen}
        />

        {/* 친구 초대 배너 */}
        <FriendsBannerSection
          avatars={DUMMY_FRIENDS.avatars}
          playingCount={DUMMY_FRIENDS.playingCount}
          // onInvite={() => navigation.navigate('InviteFriends' as never)}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

function HeaderSection({ nickname }: { nickname?: string }) {
  return (
    <View style={styles.headerWrapper}>
      <TextBox size={14} color={palette.gray400}>
        반가워요
      </TextBox>
      <TextBox size={22} fontsName="Pretendard800" color={palette.gray800}>
        {nickname ? `${nickname} 님` : '여행자 님'}
      </TextBox>
    </View>
  );
}

// function SearchSection({ onPress }: { onPress: () => void }) {
//   return (
//     <TouchableOpacity style={[styles.searchBox, shadow]} activeOpacity={0.8} onPress={onPress}>
//       <Ionicons name="search" size={18} color={palette.gray400} />
//       <TextBox size={15} color={palette.gray400} style={{ marginLeft: 8 }}>
//         여행지를 검색해보세요
//       </TextBox>
//     </TouchableOpacity>
//   );
// }

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: palette.white },
  scroll: { paddingBottom: 32 },
  headerBanner: {
    marginTop: 6,
  },

  // Header
  headerWrapper: {
    paddingHorizontal: 16,
    marginTop: 6,
    marginBottom: 14,
  },

  // Search
  searchBox: {
    marginHorizontal: 16,
    backgroundColor: palette.white,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
