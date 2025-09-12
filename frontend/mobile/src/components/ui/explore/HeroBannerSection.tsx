import React from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';
import { palette } from '@/constants/colors';

export default function HeroBannerSection() {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e' }}
        style={styles.image}
      />
      <View style={styles.overlay} />
      <Text style={styles.title}>떠나고 싶은 곳을 찾아보세요 ✈️</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { position: 'relative' },
  image: { width: '100%', height: 220 },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  title: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    color: palette.white,
    fontSize: 20,
    fontWeight: '700',
  },
});
