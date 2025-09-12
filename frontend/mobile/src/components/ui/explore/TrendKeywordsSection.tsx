import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import TextBox from '@/components/atom/TextBox';
import { palette } from '@/constants/colors';
import { SectionHeader } from '@/components/layout/header/SectionHeader';

export default function TrendKeywordsSection() {
  const keywords = ['#서핑', '#야경맛집', '#감성카페', '#인생샷', '#등산코스'];

  return (
    <View style={styles.container}>
      <SectionHeader title={'지금 뜨는 키워드'} />

      <View style={styles.wrapper}>
        {keywords.map((k, idx) => (
          <View key={idx} style={styles.chip}>
            <Text style={styles.text}>{k}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginTop: 32 },
  wrapper: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 16 },
  chip: {
    backgroundColor: palette.gray100,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8,
  },
  text: { fontSize: 13, color: palette.gray600 },
});
