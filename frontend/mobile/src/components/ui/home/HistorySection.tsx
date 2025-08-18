import TextBox from '@/components/atom/TextBox';
import React from 'react';
import { FlatList, Image, Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
import { palette } from '@/constants/colors';
import { SectionHeader } from './SectionHeader';

const DUMMY_JOURNALS = [
  {
    id: 901,
    photo:
      'https://images.unsplash.com/photo-1520975922215-230d7a36cd83?q=80&w=1600&auto=format&fit=crop',
    title: '부산 첫째 날 기록',
    date: '2025-08-03',
  },
  {
    id: 902,
    photo:
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop',
    title: '카페 투어',
    date: '2025-08-04',
  },
  {
    id: 903,
    photo:
      'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=80&w=1600&auto=format&fit=crop',
    title: '야경 스팟',
    date: '2025-08-05',
  },
];

// 공통 그림자
const shadow = Platform.select({
  ios: {
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  android: { elevation: 3 },
});

const HistorySection = ({
  title,
  data,
  onPressItem,
  onPressMore,
}: {
  title: string;
  data: typeof DUMMY_JOURNALS;
  onPressItem?: (id: number) => void;
  onPressMore?: () => void;
}) => {
  const itemWidth = 140;
  return (
    <View style={styles.section}>
      <SectionHeader title={title} onPressMore={onPressMore} />
      <FlatList
        horizontal
        data={data}
        keyExtractor={(i) => String(i.id)}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16 }}
        ItemSeparatorComponent={() => <View style={{ width: 12 }} />}
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.9}
            // onPress={() => onPressItem(item.id)}s
            style={[styles.journalCard, shadow, { width: itemWidth }]}
          >
            <Image source={{ uri: item.photo }} style={styles.journalPhoto} />
            <View style={{ padding: 10 }}>
              <TextBox
                size={14}
                fontsName="Pretendard600"
                color={palette.gray800}
                numberOfLines={1}
              >
                {item.title}
              </TextBox>
              <TextBox size={12} color={palette.gray400} style={{ marginTop: 2 }}>
                {item.date}
              </TextBox>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default HistorySection;

// ─────────────────────────────────────────────────────────────
// 스타일
// ─────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  // Sections
  section: { marginTop: 22 },

  // Journal
  journalCard: {
    backgroundColor: palette.white,
    borderRadius: 12,
    overflow: 'hidden',
  },
  journalPhoto: { width: '100%', height: 90 },
});
