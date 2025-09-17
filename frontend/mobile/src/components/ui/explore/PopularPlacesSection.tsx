import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import TextBox from '@/components/atom/TextBox';
import { palette } from '@/constants/colors';
import { Ionicons } from '@expo/vector-icons';
import { SectionHeader } from '@/components/layout/header/SectionHeader';

interface PopularPlacesSectionProps {
  title: string;
  data: {
    representativeRegionId: string;
    representativeRegionName: string;
    representativeRegionImageUrl: string | null;
  }[];
  onPressItem: (representativeRegionId: string) => void;
}

export default function PopularPlacesSection({
  title,
  data,
  onPressItem,
}: PopularPlacesSectionProps) {
  return (
    <View style={styles.container}>
      <SectionHeader title={title} />

      <View style={styles.wrapper}>
        {data.map((p, idx) => (
          <TouchableOpacity
            key={idx}
            style={styles.item}
            activeOpacity={0.8}
            onPress={() => onPressItem(p.representativeRegionId)}
          >
            {p.representativeRegionImageUrl ? (
              <View style={styles.circle}>
                <Image source={{ uri: p.representativeRegionImageUrl }} style={styles.image} />
              </View>
            ) : (
              <View style={styles.thumbPh}>
                <Ionicons name="image" size={20} color={palette.gray400} />
              </View>
            )}
            <TextBox size={14} color={palette.gray600}>
              {p.representativeRegionName}
            </TextBox>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const CIRCLE = 72;
const styles = StyleSheet.create({
  container: { marginTop: 32 },
  wrapper: { flexDirection: 'row', justifyContent: 'space-around', paddingHorizontal: 16 },
  item: { alignItems: 'center' },
  circle: {
    width: CIRCLE,
    height: CIRCLE,
    borderRadius: CIRCLE / 2,
    overflow: 'hidden',
    marginBottom: 6,
  },
  image: { width: '100%', height: '100%' },
  thumbPh: {
    width: CIRCLE,
    height: CIRCLE,
    borderRadius: CIRCLE / 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#eef1f6',
  },
});
