import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Chip from '@/components/ui/game/create/Chip';

type Region = {
  representativeRegionId: number;
  representativeRegionName: string;
  imageUrl: string | null;
};

type LocationSectionProps = {
  onLayout?: (e: any) => void;
  onNext?: () => void; // 선택 시 자동 다음 이동
  regions: Region[]; // ⬅️ 상위에서 주입
  selectedId: number | null; // ⬅️ 상위 상태
  onSelect: (id: number) => void; // ⬅️ 상위로 올리기
  minHeight: number;
};

const LocationSection = ({
  onLayout,
  onNext,
  regions,
  selectedId,
  onSelect,
  minHeight,
}: LocationSectionProps) => {
  const navigation = useNavigation<any>();
  console.log(minHeight);

  return (
    <View onLayout={onLayout} style={[styles.section, minHeight ? { minHeight } : null]}>
      <Text style={styles.sectionTitle}>여행지 선택</Text>

      <TouchableOpacity
        style={styles.searchBar}
        onPress={() => navigation.navigate('SearchScreen')}
        activeOpacity={0.85}
      >
        <Text style={styles.searchPlaceholder}>여행지 검색</Text>
      </TouchableOpacity>

      <View style={styles.row}>
        {regions.map(({ representativeRegionId: id, representativeRegionName: name }) => (
          <Chip
            key={id}
            label={name}
            active={selectedId === id}
            onPress={() => {
              onSelect(id);
              onNext?.();
            }}
          />
        ))}
      </View>
    </View>
  );
};

export default LocationSection;

const styles = StyleSheet.create({
  section: {
    paddingHorizontal: 20,
    paddingTop: 14,
  },
  sectionTitle: { fontSize: 20, fontWeight: '700', color: '#0F172A', marginBottom: 14 },

  searchBar: {
    height: 48,
    borderRadius: 14,
    backgroundColor: '#F2F4F7',
    justifyContent: 'center',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  searchPlaceholder: { color: '#9CA3AF', fontSize: 16 },
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
});
