import React, { useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  Linking,
  Alert,
} from 'react-native';
import { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { SafeAreaView } from 'react-native-safe-area-context';
import { palette } from '@/constants/colors';
import KakaoMap from '@/components/ui/map/KakaoMap';
import useTripSpotQuery from '@/hooks/trip/useSpot';
import useReviewSummaryQuery from '@/hooks/review/useReviewSummary';
import { Ionicons } from '@expo/vector-icons';

type Props = {
  tripSpotId: string;
  onStartMission: () => void;
  isCurrentTile: boolean;
};

export default function GameInfoSheet({ tripSpotId, onStartMission, isCurrentTile }: Props) {
  const { tripSpot, isLoading, isError, refetch } = useTripSpotQuery({
    tripSpotId,
  });
  const { reviewSummary } = useReviewSummaryQuery({ tripSpotId });

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
  const rating = reviewSummary?.dataBody?.averageRating;
  const reviewCnt = reviewSummary?.dataBody?.totalCount;

  return (
    <BottomSheetScrollView
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* 헤더(이름 + 카테고리 칩) */}
      <View style={{ gap: 6 }}>
        <Text style={styles.title}>{spot.tripSpotName}</Text>
        <View style={styles.chips}>
          {!!spot.contentTypeName && <Text style={styles.chip}>#{spot.contentTypeName}</Text>}
          {!!rating && (
            <Text style={styles.chip}>
              ⭐ {Number(rating).toFixed(1)} · 리뷰 {reviewCnt ?? 0}
            </Text>
          )}
        </View>
      </View>

      {/* 대표 이미지 */}
      {!!spot.originalImageUrl && (
        <View style={styles.hero}>
          <Image
            source={{ uri: spot.originalImageUrl }}
            style={styles.heroImg}
            resizeMode="cover"
          />
        </View>
      )}

      {/* 주소/상세주소 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>위치</Text>
        <Text style={styles.addressText}>
          {(spot.address ?? '') + (spot.addressDetail ? ` ${spot.addressDetail}` : '')}
        </Text>
      </View>

      {/* 지도 카드 - 쿼터 초과 시 내부에서 빈 뷰만 보일 수 있음 */}
      <KakaoMap latitude={spot.latitude} longitude={spot.longitude} />

      {/* 연락처/홈페이지 */}
      {(spot.phoneNumber || spot.homepageUrl) && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>연락/홈페이지</Text>
          {!!spot.phoneNumber && <Text style={styles.infoText}>📞 {spot.phoneNumber}</Text>}
          {!!spot.homepageUrl && <Text style={styles.infoText}>🔗 {spot.homepageUrl}</Text>}

          <View style={styles.rowActions}>
            {!!spot.phoneNumber && (
              <TouchableOpacity style={styles.actionBtn}>
                <Text style={styles.actionText}>전화</Text>
              </TouchableOpacity>
            )}
            {!!spot.homepageUrl && (
              <TouchableOpacity style={styles.actionBtn}>
                <Text style={styles.actionText}>웹사이트</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      )}

      {/* 설명 */}
      {!!spot.description && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>설명</Text>
          <Text style={styles.desc}>{spot.description}</Text>
        </View>
      )}

      {/* CTA */}
      {isCurrentTile && (
        <TouchableOpacity style={styles.cta} onPress={onStartMission}>
          <Text style={styles.ctaText}>미션 인증하기</Text>
        </TouchableOpacity>
      )}

      <View style={{ height: 8 }} />
    </BottomSheetScrollView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: palette.white },
  center: { alignItems: 'center', justifyContent: 'center' },

  content: {
    backgroundColor: palette.white,
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
    gap: 30,
  },

  title: { fontSize: 20, fontWeight: '800', color: palette.Neutral800 ?? '#111827' },
  chips: { flexDirection: 'row', gap: 8, flexWrap: 'wrap' },
  chip: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: '#EEF2FF',
    color: '#3730A3',
    fontSize: 12,
    overflow: 'hidden',
  },

  hero: { width: '100%' },
  heroImg: { width: '100%', height: 180, borderRadius: 12, overflow: 'hidden' },
  thumbPh: {
    width: '100%',
    height: 180,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#eef1f6',
  },

  mapCard: {
    height: 220,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#F3F4F6',
  },

  section: { gap: 6 },
  sectionTitle: { fontSize: 14, fontWeight: '700', color: palette.gray800 },
  addressText: { color: palette.gray800, lineHeight: 20 },
  infoText: { color: palette.gray800 },

  rowActions: { flexDirection: 'row', gap: 8, marginTop: 6 },
  actionBtn: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#EEF1F6',
  },
  actionText: { color: palette.gray800, fontWeight: '600' },

  desc: { color: palette.gray600, lineHeight: 20 },

  cta: {
    marginTop: 4,
    backgroundColor: palette.mainColor,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  ctaText: { color: '#fff', fontWeight: '700', fontSize: 16 },

  retry: {
    marginTop: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#eef1f6',
  },
  retryText: { color: palette.gray800, fontWeight: '600' },
});
