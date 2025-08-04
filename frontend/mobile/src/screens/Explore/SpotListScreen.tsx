import React from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  Text,
  Image,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import useTripSpotListInfiniteQuery from '@/hooks/trip/useSpotsList';
import gyeongjuImage from '@images/places/gyeongju.png';

export default function SpotListScreen() {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const { representativeRegionId, regionName } = route.params || {};

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
      <Image source={gyeongjuImage} style={styles.thumbnail} resizeMode="cover" />
      <View style={styles.info}>
        <Text style={styles.name}>{item.tripSpotName}</Text>
      </View>
    </TouchableOpacity>
  );

  if (isLoading) return <ActivityIndicator size="large" style={{ flex: 1 }} />;
  if (isError)
    return <Text style={{ color: 'red', padding: 20 }}>데이터를 불러올 수 없습니다.</Text>;

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    borderRadius: 12,
    backgroundColor: '#f9fafb',
    overflow: 'hidden',
    elevation: 2,
  },
  thumbnail: {
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
