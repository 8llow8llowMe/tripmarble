import React from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';
import TextBox from '@/components/atom/TextBox';

export default function MagazineSection() {
  const articles = [
    { title: '가을 단풍 명소 5선', img: 'https://picsum.photos/seed/fall/400' },
    { title: '서울 야경 스팟', img: 'https://picsum.photos/seed/night/400' },
  ];

  return (
    <View style={{ paddingHorizontal: 16, marginTop: 16 }}>
      <TextBox size={18} fontsName="Pretendard600" style={{ marginBottom: 12 }}>
        여행 매거진
      </TextBox>
      {articles.map((a, idx) => (
        <View key={idx} style={styles.card}>
          <Image source={{ uri: a.img }} style={styles.image} />
          <Text style={styles.text}>{a.title}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 20,
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
  },
  image: { width: '100%', height: 160 },
  text: {
    position: 'absolute',
    bottom: 14,
    left: 14,
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
  },
});
