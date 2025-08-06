import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import useTripSpotQuery from '@/hooks/trip/useSpot';
import iconImage from '@images/icon.png';
import { Ionicons } from '@expo/vector-icons';
import calendarIcon from '@images/icon.png'; // 달력 아이콘 대체로 사용
import { palette } from '@/constants/colors';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function SpotDetailScreen() {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const { tripSpotId } = route.params || {};

  const { tripSpot, isLoading, isError } = useTripSpotQuery({ tripSpotId });

  // if (isLoading) return <ActivityIndicator size="large" style={{ flex: 1 }} />;

  // if (isError || !tripSpot?.dataBody)
  //   return <Text style={{ color: 'red', padding: 20 }}>상세 정보를 불러올 수 없습니다.</Text>;

  // const { tripSpotName, address, description, thumbnailImageUrl } = tripSpot.dataBody;
  const tripSpotName = '제주';
  const address = '임시주소';
  const description = '임시소개글';
  const thumbnailImageUrl = 'http://tong.visitkorea.or.kr/cms/resource/55/2595455_image2_1.jpg';
  return (
    <SafeAreaView style={styles.safeArea}>
      {/* 헤더 - 뒤로가기 */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={28} color="#222" />
        </TouchableOpacity>
      </View>

      {/* 상단 배경 이미지 */}
      <Image
        source={thumbnailImageUrl ? { uri: thumbnailImageUrl } : iconImage}
        style={styles.backgroundImage}
        resizeMode="cover"
      />

      {/* 바텀시트 느낌의 내용 영역 */}
      <View style={styles.bottomSheet}>
        <Text style={styles.sectionLabel}>여행지</Text>
        <Text style={styles.name}>{tripSpotName}</Text>
        <View style={styles.row}>
          <Ionicons name="location-outline" size={17} color="#6096eb" style={{ marginRight: 4 }} />
          <Text style={styles.address}>{address}</Text>
        </View>
        <Text style={styles.descLabel}>상세정보</Text>
        <Text style={styles.desc}>{description}</Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>일정 만들기</Text>
          <Image source={calendarIcon} style={styles.buttonIcon} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: palette.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingTop: 10,
    paddingBottom: 7,
    backgroundColor: palette.white,
    zIndex: 10,
  },
  backBtn: {
    marginRight: 8,
    padding: 2,
  },
  backgroundImage: {
    width: SCREEN_WIDTH,
    height: 260,
    borderBottomLeftRadius: 36,
    borderBottomRightRadius: 36,
    backgroundColor: '#eee',
  },
  bottomSheet: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: -36,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 24,
    paddingTop: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 4,
  },
  sectionLabel: {
    color: '#bbb',
    fontSize: 13,
    marginBottom: 3,
    marginLeft: 1,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 7,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
  },
  address: {
    color: '#6096eb',
    fontWeight: '500',
    fontSize: 14,
  },
  descLabel: {
    marginBottom: 6,
    color: '#666',
    fontWeight: '700',
    fontSize: 16,
    marginTop: 8,
  },
  desc: {
    fontSize: 14,
    color: '#333',
    marginBottom: 28,
    lineHeight: 21,
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#2176ff',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 13,
    marginTop: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '700',
    marginRight: 9,
  },
  buttonIcon: {
    width: 20,
    height: 20,
    tintColor: '#fff',
  },
});
