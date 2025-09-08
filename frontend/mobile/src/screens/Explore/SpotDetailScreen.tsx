import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  Linking,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { palette } from '@/constants/colors';
import useTripSpotQuery from '@/hooks/trip/useSpot';
import iconImage from '@images/icon.png';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SpotStackParamList } from '@/types/navigation/navigation';
import { AppNavigatorNavigationProp } from '@/types/navigation/screen';

type Props = NativeStackScreenProps<SpotStackParamList, 'SpotDetailScreen'>;

const { width: SCREEN_WIDTH } = Dimensions.get('window');

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
        <Text style={{ color: '#e34d4d' }}>데이터를 불러올 수 없습니다.</Text>
        <TouchableOpacity style={styles.retry} onPress={() => refetch()}>
          <Text style={styles.retryText}>다시 시도</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  const data = tripSpot?.dataBody || {
    tripSpotName: '제주',
    contentTypeName: '관광지',
    description: '임시소개글',
    homepageUrl: 'http://korean.visitkorea.or.kr',
    phoneNumber: '010-1234-5678',
    address: '제주특별자치도 제주시',
    addressDetail: '임시주소',
    imageUrl: null,
    thumbnailImageUrl: 'http://tong.visitkorea.or.kr/cms/resource/55/2595455_image2_1.jpg',
  };

  const openLink = (url: string | null) => {
    if (url) Linking.openURL(url);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={28} color="#222" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Background Image */}
        <Image
          source={data.thumbnailImageUrl ? { uri: data.thumbnailImageUrl } : iconImage}
          style={styles.backgroundImage}
          resizeMode="cover"
        />

        {/* Content */}
        <View style={styles.bottomSheet}>
          {/* Title */}
          <Text style={styles.tripSpotName}>{data.tripSpotName}</Text>
          {data.contentTypeName && (
            <Text style={styles.contentTypeName}>{data.contentTypeName}</Text>
          )}

          {/* Info Section */}
          <View style={styles.infoCard}>
            {data.address && (
              <View style={styles.row}>
                <Ionicons
                  name="location-outline"
                  size={18}
                  color={palette.mainColor}
                  style={styles.icon}
                />
                <Text style={styles.infoText}>
                  {data.address} {data.addressDetail || ''}
                </Text>
              </View>
            )}
            {data.phoneNumber && (
              <View style={styles.row}>
                <Ionicons
                  name="call-outline"
                  size={18}
                  color={palette.mainColor}
                  style={styles.icon}
                />
                <Text style={styles.infoText}>{data.phoneNumber}</Text>
              </View>
            )}
            {data.homepageUrl && (
              <TouchableOpacity style={styles.row} onPress={() => openLink(data.homepageUrl)}>
                <Ionicons
                  name="globe-outline"
                  size={18}
                  color={palette.mainColor}
                  style={styles.icon}
                />
                <Text style={[styles.infoText, { color: palette.mainColor }]}>
                  홈페이지 바로가기
                </Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Description */}
          {data.description && (
            <>
              <Text style={styles.sectionLabel}>상세정보</Text>
              <Text style={styles.desc}>{data.description}</Text>
            </>
          )}

          {/* CTA Button */}
          {/* <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>일정 만들기</Text>
            <Ionicons name="calendar-outline" size={20} color={palette.white} />
          </TouchableOpacity> */}

          {/* Placeholder: 리뷰/지도 */}
          {/* <View style={{ marginTop: 40, padding: 16 }}>
            <Text style={styles.placeholder}>📍 지도 & 리뷰는 추후 제공 예정</Text>
          </View> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: palette.white,
  },
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
    backgroundColor: palette.white,
    marginTop: -36,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 24,
    paddingTop: 30,
  },
  tripSpotName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 8,
  },
  contentTypeName: {
    fontSize: 15,
    color: '#888',
    marginBottom: 16,
  },
  infoCard: {
    backgroundColor: '#f9f9f9',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  icon: {
    marginRight: 6,
  },
  infoText: {
    fontSize: 14,
    color: '#333',
  },
  sectionLabel: {
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
    backgroundColor: palette.mainColor,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 13,
    marginTop: 8,
  },
  buttonText: {
    color: palette.white,
    fontSize: 17,
    fontWeight: '700',
    marginRight: 9,
  },
  placeholder: {
    textAlign: 'center',
    color: '#aaa',
    fontSize: 13,
  },
});
