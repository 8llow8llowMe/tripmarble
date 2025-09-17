import TextBox from '@/components/atom/TextBox';
import React from 'react';
import { FlatList, Image, Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
import { palette } from '@/constants/colors';
import { SectionHeader } from '@/components/layout/header/SectionHeader';
import { DUMMY_JOURNALS } from '@/constants/dummyData';

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
  onPressMore,
}: {
  title: string;
  data: typeof DUMMY_JOURNALS;
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

const styles = StyleSheet.create({
  section: { marginTop: 22 },

  journalCard: {
    backgroundColor: palette.white,
    borderRadius: 12,
    overflow: 'hidden',
  },
  journalPhoto: { width: '100%', height: 90 },
});
