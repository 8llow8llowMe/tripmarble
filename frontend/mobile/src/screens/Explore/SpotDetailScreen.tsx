import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { palette } from '@/constants/colors';
import { AppNavigatorNavigationProp } from '@/types/navigation/screen';
import { SafeAreaView } from 'react-native-safe-area-context';
import useTripSpotQuery from '@/hooks/trip/useSpot';
import { SpotStackParamList } from '@/types/navigation/navigation';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import KakaoMap from '@/components/ui/map/KakaoMap';
import useReviewSummaryQuery from '@/hooks/review/useReviewSummary';
import useReviewListInfiniteQuery from '@/hooks/review/useReviewList';

type Props = NativeStackScreenProps<SpotStackParamList, 'SpotDetailScreen'>;

export default function SpotDetailScreen({ route }: Props) {
  const { tripSpotId } = route.params;
  const navigation = useNavigation<AppNavigatorNavigationProp>();

  const { tripSpot, isLoading, isError, refetch } = useTripSpotQuery({ tripSpotId });
  const { reviewSummary } = useReviewSummaryQuery({ tripSpotId });
  const {
    data: reviewPages,
    isLoading: isReviewsLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useReviewListInfiniteQuery({
    tripSpotId,
    size: 12,
    orderType: 'DESC',
  });

  if (isLoading) {
    return (
      <SafeAreaView style={[styles.safeArea, styles.center]}>
        <ActivityIndicator />
      </SafeAreaView>
    );
  }

  if (isError || !tripSpot?.dataBody) {
    return (
      <SafeAreaView style={[styles.safeArea, styles.center]}>
        <Text style={{ color: palette.error }}>데이터를 불러올 수 없습니다.</Text>
        <TouchableOpacity style={styles.retry} onPress={() => refetch()}>
          <Text style={styles.retryText}>다시 시도</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  const spot = tripSpot.dataBody;

  const photoItems = reviewPages?.pages.flatMap((p) => p?.dataBody?.contents ?? []) ?? [];

  console.log(photoItems);

  const avgRating = reviewSummary?.dataBody?.averageRating;
  const totalCount = reviewSummary?.dataBody?.totalCount ?? 0;

  console.log('🤢🤢🤢🤢🤢 tripSpot', tripSpot);
  console.log('📚📚📚📚📚 reviewSummary', reviewSummary, reviewSummary?.dataBody.totalCount);

  // 게임 생성 스크린으로 이동
  const goToGameCreateScreen = () => {
    navigation.navigate('CreateGameScreen');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* 대표 이미지 */}
        <View style={styles.imageWrapper}>
          {tripSpot?.dataBody.originalImageUrl ? (
            <Image
              source={{ uri: tripSpot?.dataBody.originalImageUrl }}
              style={styles.mainImage}
              resizeMode="cover"
            />
          ) : (
            <View style={[styles.mainImage, styles.thumbPh]}>
              <Ionicons name="image" size={20} color={palette.gray400} />
            </View>
          )}
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={23} color="#222" />
          </TouchableOpacity>
        </View>

        {/* 제목/태그 */}
        <View style={styles.section}>
          <Text style={styles.title}>{tripSpot?.dataBody.tripSpotName}</Text>
          <Text style={styles.subtitle}>
            {tripSpot?.dataBody.contentTypeName} · {tripSpot?.dataBody.address}
          </Text>
        </View>

        {/* 상세 소개 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>상세정보</Text>
          {!!spot.description && <Text style={styles.desc}>{spot.description}</Text>}

          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <Ionicons name="location" size={18} color={palette.mainColor} />
              <Text style={styles.infoText}>{spot.address}</Text>
            </View>
            {!!spot.phoneNumber && (
              <View style={styles.infoRow}>
                <Ionicons name="call" size={18} color={palette.mainColor} />
                <Text style={styles.infoText}>{spot.phoneNumber}</Text>
              </View>
            )}
            {!!spot.homepageUrl && (
              <TouchableOpacity style={styles.infoRow}>
                <Ionicons name="globe" size={18} color={palette.mainColor} />
                <Text style={[styles.infoText, { color: palette.mainColor }]}>
                  홈페이지 바로가기
                </Text>
              </TouchableOpacity>
            )}
          </View>

          {/* 지도 */}
          <KakaoMap latitude={spot.latitude ?? 0} longitude={spot.longitude ?? 0} />
        </View>

        {/* 리뷰 섹션 */}
        <View style={[styles.section, { paddingBottom: 4 }]}>
          <Text style={styles.sectionTitle}>
            리뷰 {avgRating ? `⭐ ${Number(avgRating).toFixed(1)}` : ''} (전체 {totalCount}개)
          </Text>

          {/* 포토 리뷰 그리드 / 빈 상태 / 로딩 */}
          {isReviewsLoading ? (
            <ActivityIndicator style={{ marginTop: 10 }} />
          ) : totalCount === 0 || photoItems.length === 0 ? (
            <Text style={{ color: '#888', paddingVertical: 8 }}>아직 리뷰가 없습니다.</Text>
          ) : (
            <FlatList
              data={photoItems}
              keyExtractor={(item) => item.contentId}
              numColumns={3}
              columnWrapperStyle={{ gap: 6 }}
              contentContainerStyle={{ gap: 6 }}
              scrollEnabled={false} // 부모 ScrollView 안이라 false
              renderItem={({ item }) => (
                <View style={styles.photoCell}>
                  {item.originalImageUrl ? (
                    <Image source={{ uri: item.originalImageUrl }} style={styles.photo} />
                  ) : (
                    <View
                      style={[
                        styles.photo,
                        { backgroundColor: '#eee', alignItems: 'center', justifyContent: 'center' },
                      ]}
                    >
                      <Ionicons name="image" size={16} color="#bbb" />
                    </View>
                  )}
                </View>
              )}
              ListFooterComponent={
                hasNextPage ? (
                  <TouchableOpacity
                    style={styles.loadMoreBtn}
                    onPress={() => fetchNextPage()}
                    disabled={isFetchingNextPage}
                  >
                    {isFetchingNextPage ? (
                      <ActivityIndicator />
                    ) : (
                      <Text style={styles.loadMoreText}>더 보기</Text>
                    )}
                  </TouchableOpacity>
                ) : null
              }
            />
          )}

          {/* 리뷰 전체 보기 - (필요 시 스크린 연결) */}
          {totalCount > 0 && !isReviewsLoading && (
            <TouchableOpacity style={{ marginTop: 8 }}>
              <Text style={styles.link}>리뷰 전체 보기</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>

      {/* 하단 CTA */}
      <View style={styles.footer}>
        <View />
        <TouchableOpacity style={styles.ctaBtn} onPress={goToGameCreateScreen}>
          <Text style={styles.ctaText}>이 지역에서 게임 시작하기</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: palette.white },
  center: { alignItems: 'center', justifyContent: 'center' },
  retry: {
    marginTop: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#eef1f6',
  },
  retryText: { color: palette.gray800, fontWeight: '600' },

  imageWrapper: { position: 'relative' },
  mainImage: { width: '100%', height: 300 },
  thumbPh: {
    width: '100%',
    height: 300,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#eef1f6',
  },
  backBtn: {
    position: 'absolute',
    top: 11,
    left: 13,
    backgroundColor: palette.white,
    borderRadius: 20,
    padding: 6,
  },
  topRightBtns: { position: 'absolute', top: 20, right: 16, flexDirection: 'row' },
  circleBtn: {
    backgroundColor: palette.white,
    borderRadius: 20,
    padding: 6,
    marginLeft: 8,
  },

  section: { paddingHorizontal: 20, paddingVertical: 14 },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 4, color: '#222' },
  subtitle: { fontSize: 14, color: '#777', marginBottom: 10 },
  tagsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginBottom: 4 },
  tag: {
    backgroundColor: '#f1f3f6',
    color: '#444',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    fontSize: 12,
    marginRight: 6,
  },

  infoCard: {
    backgroundColor: '#f9f9f9',
    borderRadius: 14,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  infoRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  infoText: { marginLeft: 10, fontSize: 15, color: '#333' },

  sectionTitle: { fontSize: 17, fontWeight: '700', marginBottom: 8, color: '#222' },
  desc: { fontSize: 14, color: '#444', lineHeight: 20 },
  link: {
    fontSize: 14,
    color: palette.mainColor,
    fontWeight: '600',
    marginTop: 6,
  },

  reviewCard: {
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    padding: 14,
    marginBottom: 14,
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    justifyContent: 'space-between',
  },
  avatar: { width: 32, height: 32, borderRadius: 16, marginRight: 10 },
  reviewer: { fontWeight: '600', fontSize: 14, color: '#222' },
  reviewDate: { fontSize: 12, color: '#777' },
  reviewText: { fontSize: 13, color: '#444' },
  stars: { fontSize: 13, color: '#FFD700', marginLeft: 'auto', marginRight: 4 },
  mapPreview: {
    width: '100%',
    height: 180,
    borderRadius: 12,
    backgroundColor: '#eee',
    marginTop: 8,
  },

  // 포토 그리드
  photoCell: { width: '32%', aspectRatio: 1, borderRadius: 8, overflow: 'hidden' },
  photo: { width: '100%', height: '100%' },

  // 로드 모어
  loadMoreBtn: {
    marginTop: 8,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: '#eef1f6',
    alignItems: 'center',
  },
  loadMoreText: { color: '#333', fontWeight: '600' },

  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderTopWidth: 1,
    borderColor: '#eee',
    backgroundColor: palette.white,
  },
  footerInfo: { fontSize: 15, fontWeight: '600', color: '#222' },
  footerSub: { fontSize: 12, color: '#777' },
  ctaBtn: {
    backgroundColor: palette.mainColor,
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 12,
  },
  ctaText: { color: palette.white, fontSize: 15, fontWeight: '700' },
});
