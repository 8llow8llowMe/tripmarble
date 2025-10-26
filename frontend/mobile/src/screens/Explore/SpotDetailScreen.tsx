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
import mapDummy from '@images/places/map.png';
import { AppNavigatorNavigationProp } from '@/types/navigation/screen';
import { SafeAreaView } from 'react-native-safe-area-context';
import useTripSpotQuery from '@/hooks/trip/useSpot';
import { SpotStackParamList } from '@/types/navigation/navigation';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<SpotStackParamList, 'SpotDetailScreen'>;

export default function SpotDetailScreen({ route }: Props) {
  const { tripSpotId } = route.params;
  const navigation = useNavigation<AppNavigatorNavigationProp>();

  const { tripSpot, isLoading, isError, refetch } = useTripSpotQuery({ tripSpotId });

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

  // 더미 데이터
  const data = tripSpot?.dataBody || {
    tripSpotName: '제주 성산일출봉',
    contentTypeName: '관광지',
    description:
      '제주는 아름다운 바다와 자연경관이 어우러진 대한민국 대표 여행지입니다. 🏝️ 돌하르방과 한라산, 맛있는 흑돼지와 감귤까지 다양한 매력을 경험해보세요!',
    homepageUrl: 'https://www.visitjeju.net/u/949',
    phoneNumber: '064-783-0959',
    address: '제주특별자치도 서귀포시 성산읍 성산리 78',
    addressDetail: '임시주소',
    originalImageUrl: 'http://tong.visitkorea.or.kr/cms/resource/82/2944282_image2_1.bmp',
  };

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
          {/* {data.originalImageUrl ? (
            <Image
              source={{ uri: data.originalImageUrl }}
              style={styles.mainImage}
              resizeMode="cover"
            />
          ) : ( */}
          <View style={[styles.mainImage, styles.thumbPh]}>
            <Ionicons name="image" size={20} color={palette.gray400} />
          </View>
          {/* )} */}
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={26} color="#222" />
          </TouchableOpacity>
          <View style={styles.topRightBtns}>
            <TouchableOpacity style={styles.circleBtn}>
              <Ionicons name="share-outline" size={22} color="#222" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.circleBtn}>
              <Ionicons name="heart-outline" size={22} color="#222" />
            </TouchableOpacity>
          </View>
        </View>

        {/* 제목/태그 */}
        <View style={styles.section}>
          <Text style={styles.title}>{data.tripSpotName}</Text>
          <Text style={styles.subtitle}>
            {data.contentTypeName} · {data.address}
          </Text>
          <View style={styles.tagsRow}>
            <Text style={styles.tag}>🌊 바다 전망</Text>
            <Text style={styles.tag}>🍊 감귤 농장 근처</Text>
            <Text style={styles.tag}>☕ 카페 거리</Text>
          </View>
        </View>

        {/* 지도 */}
        {/* <View style={styles.section}> */}
        {/* <Text style={styles.sectionTitle}>위치</Text> */}
        {/* <Image source={mapDummy} style={styles.mapPreview} /> */}
        {/* </View> */}

        {/* 상세 소개 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>상세정보</Text>
          <Text style={styles.desc}>{data.description}</Text>
          <Image source={mapDummy} style={styles.mapPreview} />
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

        {/* 주요 정보 카드 */}
        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <Ionicons name="location" size={18} color={palette.mainColor} />
            <Text style={styles.infoText}>{data.address}</Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="call" size={18} color={palette.mainColor} />
            <Text style={styles.infoText}>{data.phoneNumber}</Text>
          </View>
          <TouchableOpacity style={styles.infoRow}>
            <Ionicons name="globe" size={18} color={palette.mainColor} />
            <Text style={[styles.infoText, { color: palette.mainColor }]}>홈페이지 바로가기</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* 하단 CTA */}
      <View style={styles.footer}>
        <View>
          {/* <Text style={styles.footerInfo}>현재 참여자: 3명</Text> */}
          <Text style={styles.footerSub}>평균 소요시간 45분</Text>
        </View>
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
  empty: { padding: 24, textAlign: 'center', color: palette.gray600 },
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
    marginHorizontal: 20,
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
  directionBtn: {
    flexDirection: 'row',
    backgroundColor: palette.mainColor,
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 14,
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginTop: 12,
  },
  directionText: { color: '#fff', marginLeft: 6, fontSize: 13, fontWeight: '600' },
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
