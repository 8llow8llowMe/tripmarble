import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
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

type Props = NativeStackScreenProps<SpotStackParamList, 'SpotDetailScreen'>;

export default function SpotDetailScreen({ route }: Props) {
  const { tripSpotId } = route.params;
  const navigation = useNavigation<AppNavigatorNavigationProp>();

  const { tripSpot, isLoading, isError, refetch } = useTripSpotQuery({ tripSpotId });
  const { reviewSummary } = useReviewSummaryQuery({ tripSpotId });

  if (isLoading) {
    return (
      <SafeAreaView style={[styles.safeArea, styles.center]}>
        <ActivityIndicator />
      </SafeAreaView>
    );
  }

  if (isError) {
    return (
      <SafeAreaView style={[styles.safeArea, styles.center]}>
        <Text style={{ color: palette.error }}>데이터를 불러올 수 없습니다.</Text>
        <TouchableOpacity style={styles.retry} onPress={() => refetch()}>
          <Text style={styles.retryText}>다시 시도</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  // "dataBody": {"address": "제주특별자치도 서귀포시 솔동산로 26-6", "addressDetail": "", "contentTypeName": "음식점", "description": null, "homepageUrl": null, "latitude": 33.2427454939, "longitude": 126.5632393864, "originalImageUrl": "http://tong.visitkorea.or.kr/cms/resource/05/2904405_image2_1.jpg", "phoneNumber": null, "tripSpotId": "50492", "tripSpotName": "woody glade"}
  console.log('🤢🤢🤢🤢🤢 tripSpot', tripSpot);
  console.log('📚📚📚📚📚 reviewSummary', reviewSummary, reviewSummary?.dataBody.totalCount);

  // 더미 데이터
  const reviews = [
    {
      id: 1,
      name: '김철수',
      date: '2025년 2월',
      rating: 5,
      avatar: 'https://i.pravatar.cc/50?img=3',
      text: '바다가 눈앞에 펼쳐져 너무 아름다웠어요. 가족과 함께 최고의 추억을 만들었습니다 🙌',
    },
    {
      id: 2,
      name: '이영희',
      date: '2025년 1월',
      rating: 4,
      avatar: 'https://i.pravatar.cc/50?img=5',
      text: '근처 카페들이 너무 예쁘고 분위기 있었어요. 바람은 조금 불었지만 뷰가 다 했습니다 🌊',
    },
  ];

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
            <Ionicons name="chevron-back" size={26} color="#222" />
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
          <Text style={styles.desc}>{tripSpot?.dataBody.description}</Text>
          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <Ionicons name="location" size={18} color={palette.mainColor} />
              <Text style={styles.infoText}>{tripSpot?.dataBody.address}</Text>
            </View>
            {tripSpot?.dataBody.phoneNumber && (
              <View style={styles.infoRow}>
                <Ionicons name="call" size={18} color={palette.mainColor} />
                <Text style={styles.infoText}>{tripSpot?.dataBody.phoneNumber}</Text>
              </View>
            )}
            <TouchableOpacity style={styles.infoRow}>
              <Ionicons name="globe" size={18} color={palette.mainColor} />
              <Text style={[styles.infoText, { color: palette.mainColor }]}>홈페이지 바로가기</Text>
            </TouchableOpacity>
          </View>

          <KakaoMap
            latitude={tripSpot?.dataBody.latitude ?? 0}
            longitude={tripSpot?.dataBody.longitude ?? 0}
          />
        </View>

        {/* 리뷰 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>리뷰 ⭐ 4.7 (전체 210개)</Text>
          {reviews.map((r) => (
            <View key={r.id} style={styles.reviewCard}>
              <View style={styles.reviewHeader}>
                <Image source={{ uri: r.avatar }} style={styles.avatar} />
                <View>
                  <Text style={styles.reviewer}>{r.name}</Text>
                  <Text style={styles.reviewDate}>{r.date}</Text>
                </View>
                <Text style={styles.stars}>{'⭐'.repeat(r.rating)}</Text>
              </View>
              <Text style={styles.reviewText}>{r.text}</Text>
            </View>
          ))}
          <Text style={styles.link}>리뷰 전체 보기</Text>
        </View>
      </ScrollView>

      {/* 하단 CTA */}
      <View style={styles.footer}>
        <View />
        <TouchableOpacity style={styles.ctaBtn}>
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
  mainImage: { width: '100%', height: 260 },
  thumbPh: {
    width: '100%',
    height: 260,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#eef1f6',
  },
  backBtn: {
    position: 'absolute',
    top: 20,
    left: 16,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 6,
  },
  topRightBtns: { position: 'absolute', top: 20, right: 16, flexDirection: 'row' },
  circleBtn: {
    backgroundColor: '#fff',
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

  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderTopWidth: 1,
    borderColor: '#eee',
    backgroundColor: '#fff',
  },
  footerInfo: { fontSize: 15, fontWeight: '600', color: '#222' },
  footerSub: { fontSize: 12, color: '#777' },
  ctaBtn: {
    backgroundColor: palette.mainColor,
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 12,
  },
  ctaText: { color: '#fff', fontSize: 15, fontWeight: '700' },
});
