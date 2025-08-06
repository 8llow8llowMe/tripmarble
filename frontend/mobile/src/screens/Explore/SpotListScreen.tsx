import React from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  Text,
  Image,
  ActivityIndicator,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import useTripSpotListInfiniteQuery from '@/hooks/trip/useSpotsList';
import iconImage from '@images/icon.png';
import { palette } from '@/constants/colors';
import useRepresentativeRegionQuery from '@/hooks/trip/useRepresentativeRegion';
import { Ionicons } from '@expo/vector-icons'; // 아이콘 라이브러리

export default function SpotListScreen() {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const { representativeRegionId, regionName } = route.params || {};

  const { representativeRegion } = useRepresentativeRegionQuery({ representativeRegionId });
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError } =
    useTripSpotListInfiniteQuery({ representativeRegionId });

  // 모든 여행지 합치기
  const spots = data?.pages.flatMap((page) => page.dataBody.contents) || [];

  const renderItem = ({ item }: any) => (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.7}
      onPress={() => navigation.navigate('SpotDetailScreen', { tripSpotId: item.tripSpotId })}
    >
      <Image
        source={item.originalImageUrl ? { uri: item.originalImageUrl } : iconImage}
        style={styles.originalImageUrl}
        resizeMode="cover"
      />
      <View style={styles.info}>
        <Text style={styles.name}>{item.tripSpotName}</Text>
      </View>
    </TouchableOpacity>
  );

  if (isLoading) return <ActivityIndicator size="large" style={{ flex: 1 }} />;
  if (isError)
    return <Text style={{ color: 'red', padding: 20 }}>데이터를 불러올 수 없습니다.</Text>;

  return (
    <SafeAreaView style={styles.container}>
      {/* --- 헤더: 뒤로가기 + 검색바 --- */}
      <View style={styles.header}>
        {/* 뒤로가기 */}
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={28} color="#222" />
        </TouchableOpacity>
        {/* 검색바 */}
        <TouchableOpacity
          style={styles.searchBar}
          activeOpacity={0.9}
          onPress={() => navigation.navigate('SearchScreen')}
        >
          <Ionicons name="search" size={20} color="#888" style={{ marginRight: 8 }} />
          <Text style={styles.searchText}>여행지, 카테고리 검색</Text>
        </TouchableOpacity>
      </View>

      {/* 대표 여행지 정보 */}
      <View style={styles.regionWrapper}>
        <Image
          source={
            representativeRegion?.dataBody.imageUrl
              ? { uri: representativeRegion.dataBody.imageUrl }
              : iconImage
          }
          style={styles.image}
          resizeMode="cover"
        />
        <Text style={styles.title}>{representativeRegion?.dataBody.representativeRegionName}</Text>
        <Text style={styles.desc}>{representativeRegion?.dataBody.description}</Text>
      </View>

      {/* 여행지 리스트 */}
      <FlatList
        data={spots}
        keyExtractor={(item) => item.tripSpotId.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 16 }}
        onEndReached={() => {
          if (hasNextPage && !isFetchingNextPage) fetchNextPage();
        }}
        onEndReachedThreshold={0.5}
        ListFooterComponent={isFetchingNextPage ? <ActivityIndicator /> : null}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
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
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f4f6fa',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 14,
    marginLeft: 2,
  },
  searchText: {
    fontSize: 15,
    color: '#888',
    fontWeight: '500',
  },
  regionWrapper: { alignItems: 'center', marginVertical: 14 },
  image: { width: '100%', height: 120, marginBottom: 10 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 5 },
  desc: { fontSize: 14, color: '#555', textAlign: 'center' },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    borderRadius: 12,
    backgroundColor: '#f9fafb',
    overflow: 'hidden',
    elevation: 2,
  },
  originalImageUrl: {
    width: 80,
    height: 80,
    borderRadius: 12,
    backgroundColor: '#eee',
  },
  info: {
    flex: 1,
    marginLeft: 16,
    paddingVertical: 12,
    justifyContent: 'center',
  },
  name: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
  },
});
