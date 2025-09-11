import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { palette } from '@/constants/colors';

type Props = {
  images: string[];
  maxImages?: number;
  onAddPress: () => void;
  onRemove: (index: number) => void;
};

export default function ImageAttachments({ images, maxImages = 5, onAddPress, onRemove }: Props) {
  return (
    <View style={styles.row}>
      {images.map((uri, idx) => (
        <View key={`${uri}-${idx}`} style={styles.thumbWrap}>
          <Image source={{ uri }} style={styles.thumb} />
          <TouchableOpacity style={styles.thumbRemove} onPress={() => onRemove(idx)}>
            <Text style={styles.thumbRemoveText}>✕</Text>
          </TouchableOpacity>
        </View>
      ))}
      {images.length < maxImages && (
        <TouchableOpacity
          style={styles.addThumb}
          onPress={onAddPress}
          accessibilityLabel="이미지 추가"
        >
          <Text style={styles.addThumbPlus}>＋</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  thumbWrap: {
    width: 64,
    height: 64,
    borderRadius: 8,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#eee',
  },
  thumb: { width: '100%', height: '100%' },
  thumbRemove: {
    position: 'absolute',
    top: 2,
    right: 2,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 10,
    paddingHorizontal: 4,
    paddingVertical: 0,
  },
  thumbRemoveText: { color: '#fff', fontSize: 12 },
  addThumb: {
    width: 64,
    height: 64,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: palette.gray300,
    backgroundColor: palette.gray50,
  },
  addThumbPlus: { fontSize: 24, color: palette.gray500 },
});
