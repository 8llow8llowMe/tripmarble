import React from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import TextBox from '@/components/atom/TextBox';
import { palette } from '@/constants/colors';
import { useAppSelector } from '@/store/store';
import { AppNavigatorNavigationProp } from '@/types/navigation/screen';
import {
  ContinueTripSection,
  FriendsBannerSection,
  HistorySection,
  RandomPickSection,
  RecommendedPlacesSection,
} from '@/components/ui/home';

const DUMMY_CONTINUE_TRIP = {
  id: 101,
  title: '여수 2박 3일',
  day: 2,
  progress: 68,
  cover:
    'https://images.unsplash.com/photo-1526481280698-8fcc13fd345d?q=80&w=1600&auto=format&fit=crop',
};

const DUMMY_PLACES = [
  {
    id: 1,
    name: '부산 해운대',
    image:
      'https://images.unsplash.com/photo-1517959105821-eaf2591984dd?q=80&w=1600&auto=format&fit=crop',
    tags: ['바다', '야경'],
    score: 4.7,
  },
  {
    id: 2,
    name: '강릉 안목해변',
    image:
      'https://images.unsplash.com/photo-1504604792257-22ebeb14f00a?q=80&w=1600&auto=format&fit=crop',
    tags: ['카페', '여유'],
    score: 4.5,
  },
  {
    id: 3,
    name: '제주 성산일출봉',
    image:
      'https://images.unsplash.com/photo-1607863680051-7e2d0d0e1a8f?q=80&w=1600&auto=format&fit=crop',
    tags: ['등산', '자연'],
    score: 4.8,
  },
];

const DUMMY_JOURNALS = [
  {
    id: 901,
    photo:
      'https://images.unsplash.com/photo-1520975922215-230d7a36cd83?q=80&w=1600&auto=format&fit=crop',
    title: '부산 첫째 날 기록',
    date: '2025-08-03',
  },
  {
    id: 902,
    photo:
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop',
    title: '카페 투어',
    date: '2025-08-04',
  },
  {
    id: 903,
    photo:
      'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=80&w=1600&auto=format&fit=crop',
    title: '야경 스팟',
    date: '2025-08-05',
  },
];

const DUMMY_RANDOM_PICK = {
  id: 777,
  name: '속초 대포항',
  image:
    'https://images.unsplash.com/photo-1493558103817-58b2924bce98?q=80&w=1600&auto=format&fit=crop',
};

const DUMMY_FRIENDS = {
  avatars: [
    'https://i.pravatar.cc/100?img=1',
    'https://i.pravatar.cc/100?img=2',
    'https://i.pravatar.cc/100?img=3',
  ],
  playingCount: 3,
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

export default function HomeScreen() {
  const navigation = useNavigation<AppNavigatorNavigationProp>();
  const { nickname } = useAppSelector((state) => state.userReducer);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scroll}>
        {/* 헤더 */}
        <HeaderSection nickname={nickname} />

        {/* 검색 */}
        <SearchSection onPress={() => navigation.navigate('SearchScreen')} />

        {/* 여행 계속하기 */}
        <ContinueTripSection
          data={DUMMY_CONTINUE_TRIP}
          // onContinue={() =>
          // navigation.navigate('TripDetail' as never, { id: DUMMY_CONTINUE_TRIP.id } as never)
          // }
        />

        {/* 추천 여행지 */}
        <RecommendedPlacesSection
          title="추천 여행지"
          data={DUMMY_PLACES}
          // onPressItem={(id) => navigation.navigate('SpotDetailScreen' as never, { id } as never)}
          onPressMore={() => navigation.navigate('SpotListScreen' as never)}
        />

        {/* 내 기록 */}
        <HistorySection
          title="내 기록"
          data={DUMMY_JOURNALS}
          // onPressItem={(id) => navigation.nasvigate('JournalDetail' as never, { id } as never)}
          onPressMore={() => navigation.navigate('JournalList' as never)}
        />

        {/* 랜덤 여행지 추천 */}
        <RandomPickSection
          data={DUMMY_RANDOM_PICK}
          // onPress={() =>
          // navigation.navigate('SpotDetailScreen' as never, { id: DUMMY_RANDOM_PICK.id } as never)
          // }
          onRefresh={() => {
            /* TODO: seed 기반 다시 뽑기 */
          }}
        />

        {/* 친구와 함께하기 배너 */}
        <FriendsBannerSection
          avatars={DUMMY_FRIENDS.avatars}
          playingCount={DUMMY_FRIENDS.playingCount}
          onInvite={() => navigation.navigate('InviteFriends' as never)}
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

function SearchSection({ onPress }: { onPress: () => void }) {
  return (
    <TouchableOpacity style={[styles.searchBox, shadow]} activeOpacity={0.8} onPress={onPress}>
      <Ionicons name="search" size={18} color={palette.gray400} />
      <TextBox size={15} color={palette.gray400} style={{ marginLeft: 8 }}>
        여행지를 검색해보세요
      </TextBox>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: palette.white },
  scroll: { paddingBottom: 32 },

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
