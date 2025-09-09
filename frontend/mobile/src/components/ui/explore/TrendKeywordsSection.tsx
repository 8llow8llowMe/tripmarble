import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import TextBox from '@/components/atom/TextBox';
import { palette } from '@/constants/colors';

export default function TrendKeywordsSection() {
  const keywords = ['#서핑', '#야경맛집', '#감성카페', '#인생샷', '#등산코스'];

  return (
    <View>
      <TextBox size={18} fontsName="Pretendard600" style={{ marginLeft: 16, marginBottom: 12 }}>
        지금 뜨는 키워드
      </TextBox>
      <View style={styles.container}>
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
  container: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 16 },
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
