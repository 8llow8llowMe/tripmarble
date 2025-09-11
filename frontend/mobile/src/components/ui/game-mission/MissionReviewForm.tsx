import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { palette } from '@/constants/colors';
import StarRating from './StarRating';
import ImageAttachments from './ImageAttachments';

type Props = {
  rating: number;
  review: string;
  images: string[];
  maxImages?: number;
  onChangeRating: (val: number) => void;
  onChangeReview: (val: string) => void;
  onAddImages: () => void;
  onRemoveImage: (index: number) => void;
};

export default function MissionReviewForm({
  rating,
  review,
  images,
  maxImages = 5,
  onChangeRating,
  onChangeReview,
  onAddImages,
  onRemoveImage,
}: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.label}>별점 *</Text>
      <StarRating value={rating} onChange={onChangeRating} />

      <Text style={[styles.label, { marginTop: 12 }]}>리뷰(최소 20자) *</Text>
      <View style={styles.textareaWrap}>
        <TextInput
          value={review}
          onChangeText={onChangeReview}
          placeholder="여기에 방문 후기를 작성하세요…"
          placeholderTextColor={palette.gray400}
          multiline
          style={styles.textarea}
        />
      </View>
      <Text style={styles.helper}>현재 {review.trim().length}자 / 최소 20자</Text>

      <Text style={[styles.label, { marginTop: 12 }]}>사진 첨부 (최대 {maxImages}장)</Text>
      <ImageAttachments
        images={images}
        maxImages={maxImages}
        onAddPress={onAddImages}
        onRemove={onRemoveImage}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: palette.gray200,
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    backgroundColor: palette.white,
  },
  label: { fontSize: 14, fontWeight: '700', marginBottom: 8, color: palette.gray800 },
  helper: { fontSize: 12, color: palette.gray500, marginBottom: 8 },
  textareaWrap: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: palette.gray300,
    borderRadius: 8,
    height: 120,
    marginBottom: 8,
    padding: 10,
    backgroundColor: palette.gray50,
  },
  textarea: { color: palette.black },
});
