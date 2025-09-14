import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, LayoutChangeEvent, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { palette } from '@/constants/colors';
import NextFloatingButton from './NextFloatingButton';

type Region = {
  representativeRegionId: string;
  representativeRegionName: string;
  representativeRegionImageUrl: string | null;
};

type Props = {
  onLayout?: (e: any) => void;
  onNext?: () => void;
  regions: Region[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  minHeight: number;
};

const COLS = 5;
const GAP = 12; // 아이템 간격

export default function LocationSection({
  onLayout,
  onNext,
  regions,
  selectedId,
  onSelect,
  minHeight,
}: Props) {
  const navigation = useNavigation<any>();
  const [gridW, setGridW] = useState(0);

  const onGridLayout = (e: LayoutChangeEvent) => setGridW(e.nativeEvent.layout.width);
  const size = gridW > 0 ? Math.floor((gridW - GAP * (COLS - 1)) / COLS) : 0;
  const rows = Math.ceil(regions.length / COLS) || 1;

  return (
    <View onLayout={onLayout} style={[styles.section, minHeight ? { minHeight } : null]}>
      <Text style={styles.title}>방문 예정인 여행지가 있으신가요?</Text>
      <Text style={styles.subtitle}>인기 있는 여행지로 떠나보세요!</Text>

      <TouchableOpacity
        style={styles.searchBar}
        onPress={() => navigation.navigate('SearchScreen')}
        activeOpacity={0.9}
      >
        <Ionicons name="search" size={18} color="#9CA3AF" style={{ marginRight: 8 }} />
        <Text style={styles.searchPlaceholder}>여행지 검색</Text>
      </TouchableOpacity>

      <View style={styles.grid} onLayout={onGridLayout}>
        {regions.map(
          (
            {
              representativeRegionId: id,
              representativeRegionName: name,
              representativeRegionImageUrl: imageUrl,
            },
            i,
          ) => {
            const active = selectedId === id;
            const col = i % COLS;
            const row = Math.floor(i / COLS);

            return (
              <TouchableOpacity
                key={id}
                accessibilityRole="button"
                accessibilityLabel={name}
                activeOpacity={0.9}
                onPress={() => {
                  onSelect(id);
                  // onNext?.();
                }}
                style={{
                  width: size,
                  alignItems: 'center',
                  marginRight: col === COLS - 1 ? 0 : GAP,
                  marginBottom: row === rows - 1 ? 0 : GAP,
                }}
              >
                <View
                  style={[
                    styles.circle,
                    { width: size, height: size, borderRadius: size / 2 },
                    active && styles.circleActive,
                  ]}
                >
                  {imageUrl ? (
                    <Image source={{ uri: imageUrl }} style={styles.image} resizeMode="cover" />
                  ) : (
                    <View style={styles.placeholder}>
                      <Ionicons name="image" size={18} color="#CBD5E1" />
                    </View>
                  )}
                </View>
                <Text
                  numberOfLines={1}
                  style={[styles.cardLabel, active && styles.cardLabelActive, { maxWidth: size }]}
                >
                  {name}
                </Text>
              </TouchableOpacity>
            );
          },
        )}
      </View>

      <NextFloatingButton
        visible={!!selectedId}
        onPress={() => onNext?.()}
        label="여행지 선택 완료, 다음 섹션으로 이동"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  section: { paddingHorizontal: 20, paddingTop: 14 },
  title: { fontSize: 20, fontWeight: '700', color: palette.Neutral800 },
  subtitle: { marginTop: 14, fontSize: 15, color: palette.gray600 },

  searchBar: {
    marginTop: 16,
    height: 48,
    borderRadius: 14,
    backgroundColor: '#F2F4F7',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
  },
  searchPlaceholder: { color: '#9CA3AF', fontSize: 16 },

  grid: {
    marginTop: 18,
    flexDirection: 'row',
    flexWrap: 'wrap',
    // row-gap, column-gap 대체: 아래 card에 marginBottom, between 아이템에 marginRight
  },

  card: {
    alignItems: 'center',
    marginBottom: GAP,
    // 각 줄에서 3개가 동일 간격으로 보이게 하려면,
    // 아이템 폭을 itemSize로 고정했고, 사이 간격은 circle에만 주지 않고 아래처럼 처리
    // iOS/Android에서 column-gap 지원이 불완전하므로 trick:
    // → 각 행의 1,2번째 아이템에만 marginRight: GAP을 주고 싶지만
    //   간단히 하려면 gridW 계산을 통해 itemSize에서 간격을 제외해 일괄 정렬
  },

  circle: {
    borderRadius: 999,
    backgroundColor: '#EEE',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    overflow: 'hidden',
  },
  circleActive: {
    backgroundColor: '#E8F3FF',
    borderColor: '#4BA1FD',
    borderWidth: 2,
  },

  image: { width: '100%', height: '100%' },
  placeholder: { flex: 1, justifyContent: 'center', alignItems: 'center' },

  cardLabel: { marginTop: 8, fontSize: 13, color: '#111827' },
  cardLabelActive: { fontWeight: '700', color: '#0F172A' },
});
