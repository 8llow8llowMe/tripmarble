import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import TextBox from '@/components/atom/TextBox';
import { palette } from '@/constants/colors';

export default function PopularPlacesSection() {
  const popularPlaces = [
    { name: '부산', img: 'https://picsum.photos/seed/busan/200' },
    { name: '제주도', img: 'https://picsum.photos/seed/jeju/200' },
    { name: '강릉', img: 'https://picsum.photos/seed/gangneung/200' },
    { name: '경주', img: 'https://picsum.photos/seed/gyeongju/200' },
  ];

  return (
    <View>
      <TextBox size={18} fontsName="Pretendard600" style={{ marginLeft: 16, marginBottom: 12 }}>
        지금 인기있는 여행지
      </TextBox>
      <View style={styles.wrapper}>
        {popularPlaces.map((p, idx) => (
          <TouchableOpacity key={idx} style={styles.item} activeOpacity={0.8}>
            <View style={styles.circle}>
              <Image source={{ uri: p.img }} style={styles.image} />
            </View>
            <TextBox size={14} color={palette.gray600}>
              {p.name}
            </TextBox>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const CIRCLE = 72;
const styles = StyleSheet.create({
  wrapper: { flexDirection: 'row', justifyContent: 'space-around', paddingHorizontal: 16 },
  item: { alignItems: 'center' },
  circle: {
    width: CIRCLE,
    height: CIRCLE,
    borderRadius: CIRCLE / 2,
    overflow: 'hidden',
    marginBottom: 6,
    backgroundColor: palette.gray100,
  },
  image: { width: '100%', height: '100%' },
});
