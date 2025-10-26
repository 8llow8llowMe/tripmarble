import React, { useMemo, useCallback, useState, memo } from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  Text,
  Image,
  ActivityIndicator,
  StyleSheet,
  ImageBackground,
  ScrollView,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { palette } from '@/constants/colors';
import useRepresentativeRegionQuery from '@/hooks/trip/useRepresentativeRegion';
import useTripSpotListInfiniteQuery from '@/hooks/trip/useSpotsList';
import useContentTypesListQuery from '@/hooks/trip/useContentTypesList';

import gyeongjuImage from '@images/places/gyeongju.png';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import SafeAreaScreen from '@/components/layout/SafeAreaScreen';

export default function SpotListScreen() {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const { representativeRegionId } = route.params || {};

  const { representativeRegion } = useRepresentativeRegionQuery({ representativeRegionId });
  const { contentTypesList } = useContentTypesListQuery();

  const [chipContentTypeId, setChipContentTypeId] = useState<string | null>(null);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    isRefetching,
    refetch,
  } = useTripSpotListInfiniteQuery({
    representativeRegionId,
    contentTypeId: chipContentTypeId ?? undefined,
    size: 10,
  });

  const spots = useMemo(() => data?.pages.flatMap((p: any) => p.dataBody.contents) ?? [], [data]);
  const onEnd = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) fetchNextPage();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isLoading) {
    return (
      <SafeAreaView style={[styles.container, styles.center]}>
        <ActivityIndicator />
      </SafeAreaView>
    );
  }

  if (isError) {
    return (
      <SafeAreaView style={[styles.container, styles.center]}>
        <Text style={{ color: '#e34d4d' }}>데이터를 불러올 수 없습니다.</Text>
        <TouchableOpacity style={styles.retry} onPress={() => refetch()}>
          <Text style={styles.retryText}>다시 시도</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaScreen>
      <View style={styles.container}>
        <Hero
          imageUrl={representativeRegion?.dataBody.representativeRegionImageUrl}
          title={representativeRegion?.dataBody.representativeRegionName ?? ''}
          desc={representativeRegion?.dataBody.description ?? ''}
          onBack={() => navigation.goBack()}
          onShare={() => {}}
        />

        <View style={{ flex: 1 }}>
          {contentTypesList && (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.chipsRow}
            >
              <Chip
                label="전체"
                active={!chipContentTypeId}
                onPress={() => setChipContentTypeId(null)}
              />
              {contentTypesList?.map((c) => (
                <Chip
                  key={c.contentTypeId}
                  label={c.contentTypeName}
                  active={chipContentTypeId === c.contentTypeId}
                  onPress={() => setChipContentTypeId(c.contentTypeId)}
                />
              ))}
            </ScrollView>
          )}

          <FlatList
            data={spots}
            keyExtractor={(it) => String(it.tripSpotId)}
            renderItem={({ item, index }) => (
              <SpotRow
                rank={index + 1}
                name={item.tripSpotName}
                thumb={item.originalImageUrl}
                onPress={() =>
                  navigation.navigate('SpotDetailScreen', { tripSpotId: item.tripSpotId })
                }
              />
            )}
            onEndReached={onEnd}
            onEndReachedThreshold={0.4}
            refreshing={isRefetching}
            onRefresh={() => refetch()}
            contentContainerStyle={{ paddingBottom: 28 }}
            ListEmptyComponent={<Text style={styles.empty}>목록이 없습니다.</Text>}
            ListFooterComponent={
              isFetchingNextPage ? (
                <View style={{ paddingVertical: 12 }}>
                  <ActivityIndicator />
                </View>
              ) : null
            }
          />
        </View>
      </View>
    </SafeAreaScreen>
  );
}

const Hero = memo(function Hero({
  imageUrl,
  title,
  desc,
  onBack,
  onShare,
}: {
  imageUrl?: string | null;
  title: string;
  desc?: string | null;
  onBack: () => void;
  onShare: () => void;
}) {
  const heroSrc = imageUrl ? { uri: imageUrl } : gyeongjuImage;

  return (
    <ImageBackground source={heroSrc} resizeMode="cover" style={styles.heroBg}>
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.35)']}
        locations={[0.4, 1.0]}
        style={styles.gradient}
      />
      <View style={styles.overlay} />
      <View style={styles.heroTopBar}>
        <TouchableOpacity onPress={onBack}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
      <View style={styles.heroTextBox}>
        <Text style={styles.heroTitle} numberOfLines={1}>
          {title}
        </Text>
        {!!desc && <Text style={styles.heroDesc}>{desc.replace(/\n/g, ' ')}</Text>}
      </View>
    </ImageBackground>
  );
});

function Chip({ label, active, onPress }: { label: string; active: boolean; onPress: () => void }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.chip, active && styles.chipActive]}
      activeOpacity={0.95}
    >
      <Text style={[styles.chipText, active && styles.chipTextActive]}>{label}</Text>
    </TouchableOpacity>
  );
}

function SpotRow({
  rank,
  name,
  thumb,
  onPress,
}: {
  rank: number;
  name: string;
  thumb: string | null;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.85} onPress={onPress}>
      {thumb ? (
        <Image source={{ uri: thumb }} style={styles.thumb} />
      ) : (
        <View style={[styles.thumb, styles.thumbPh]}>
          <Ionicons name="image" size={20} color={palette.gray400} />
        </View>
      )}
      <View style={styles.info}>
        <Text style={styles.rank}>{rank}</Text>
        <Text numberOfLines={1} style={styles.title}>
          {name}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: palette.white },
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

  heroBg: { width: '100%', aspectRatio: 375 / 320, minHeight: 320, justifyContent: 'flex-end' },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'transparent',
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
  },
  heroTopBar: {
    position: 'absolute',
    top: 14,
    left: 16,
    right: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  heroTextBox: { paddingHorizontal: 16, marginBottom: 24, flexDirection: 'column', gap: 8 },
  heroTitle: { color: '#fff', fontSize: 24, fontWeight: '800' },
  heroDesc: { color: '#fff', opacity: 0.95, marginTop: 6, lineHeight: 18 },

  tabBar: {
    flexDirection: 'row',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#e9edf3',
    paddingHorizontal: 12,
  },
  tabBtn: { paddingVertical: 12, paddingHorizontal: 14 },
  tabBtnActive: { borderBottomWidth: 1.5, borderBottomColor: palette.gray800 },
  tabText: { color: palette.gray600, fontSize: 16 },
  tabTextActive: { color: palette.gray800, fontWeight: '700' },

  chipsRow: { paddingHorizontal: 12, paddingVertical: 10 },
  chip: {
    paddingHorizontal: 16,
    height: 40,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
    marginRight: 10,
    marginBottom: 10,
  },
  chipActive: { borderColor: '#4BA1FD', backgroundColor: '#E8F3FF' },
  chipText: { fontSize: 15, color: '#111827' },
  chipTextActive: { color: '#0F172A', fontWeight: '700' },

  card: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 12,
    backgroundColor: '#f9fafb',
    overflow: 'hidden',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#eceff3',
  },
  thumb: { width: 88, height: 88 },
  thumbPh: {
    width: 88,
    height: 88,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#eef1f6',
  },
  info: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 8,
  },
  rank: { width: 22, textAlign: 'right', color: palette.mainColor, fontWeight: '800' },
  title: { flex: 1, fontSize: 16, color: palette.gray800 },
});
