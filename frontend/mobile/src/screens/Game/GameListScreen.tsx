import React, { useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { GamePlayStackParamList } from '@/types/navigation/navigation';
import { palette } from '@/constants/colors';
import { useInfiniteGameList } from '@/hooks/game/useInfiniteGameList';
import type { GameSummary } from '@/hooks/game/useGameList';
import Detailheader from '@/components/layout/header/Detailheader';
import EmptyListCard from '@/components/common/card/EmptyListCard';

type Props = NativeStackScreenProps<GamePlayStackParamList, 'GameListScreen'>;

export default function GameListScreen({ route }: Props) {
  const status = route.params?.status;
  const { items, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, refetch } =
    useInfiniteGameList({ status, size: 20 });

  const headerTitle = (() => {
    switch (status) {
      case 'ONGOING':
        return '진행중인 게임';
      case 'ENDED':
        return '종료된 게임';
      case 'WAITING':
        return '시작 전 게임';
      default:
        return '게임';
    }
  })();

  const onEndReached = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const renderItem = ({ item }: { item: GameSummary }) => {
    const thumb = item.representativeRegionImageUrl
      ? { uri: item.representativeRegionImageUrl }
      : undefined;
    const subtitle = `${item.gameStatusDescription} · ${(item.tripThemeNames ?? []).join(' · ')}`;
    return (
      <TouchableOpacity activeOpacity={0.8} style={styles.row}>
        {thumb ? (
          <Image source={thumb} style={styles.thumb} />
        ) : (
          <View style={styles.thumbPlaceholder} />
        )}
        <View style={styles.rowRight}>
          <Text style={styles.rowTitle} numberOfLines={1}>
            {item.title || item.representativeRegionName}
          </Text>
          <Text style={styles.rowSub} numberOfLines={1}>
            {subtitle}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Detailheader title={`${headerTitle} 목록`} />
      {items && items.length > 0 ? (
        <FlatList
          data={items ?? []}
          keyExtractor={(it) => it.tripGameId}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          onEndReached={onEndReached}
          onEndReachedThreshold={0.4}
          ListFooterComponent={
            isFetchingNextPage ? (
              <View style={styles.footerLoading}>
                <ActivityIndicator />
              </View>
            ) : null
          }
          refreshControl={<RefreshControl refreshing={false} onRefresh={refetch} />}
        />
      ) : (
        <View style={{ marginTop: 24 }}>
          <EmptyListCard
            title={`${headerTitle}이 없어요`}
            description="새 게임을 만들어 모험을 시작해보세요!"
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: palette.white },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 12,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  listContent: { paddingHorizontal: 16, paddingBottom: 24, paddingTop: 12 },
  separator: { height: 12 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 12,
    // light shadow
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 2,
  },
  thumb: { width: 56, height: 56, borderRadius: 8, marginRight: 12, backgroundColor: '#eef2f7' },
  thumbPlaceholder: {
    width: 56,
    height: 56,
    borderRadius: 8,
    marginRight: 12,
    backgroundColor: '#eef2f7',
  },
  rowRight: { flex: 1 },
  rowTitle: { fontSize: 16, fontWeight: '700', color: '#0f172a' },
  rowSub: { marginTop: 4, fontSize: 12, color: '#64748b' },
  footerLoading: { paddingVertical: 16 },
});
