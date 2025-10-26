import React, { useState } from 'react';
import { StyleSheet, Alert } from 'react-native';
import { palette } from '@/constants/colors';

import * as ImagePicker from 'expo-image-picker';
import MissionReviewForm from '@/components/ui/game-mission/MissionReviewForm';
import SubmitButton from '@/components/ui/game-mission/SubmitButton';
import { BottomSheetView } from '@gorhom/bottom-sheet';
import { useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '@/constants/keys';
import TextBox from '@/components/atom/TextBox';
import useReviewMissionMutaion from '@/hooks/game/useReviewMission';
import useUploadReviewFileMutaion from '@/hooks/file/useUploadReviewFile';
import { requestMediaPermission } from '@/hooks/usePermissions';

interface MissionReviewSheetProps {
  tripGameId: string;
  tripGameMoveLogId: string;
  tripSpotId: string;
  onClose: () => void;
  onSuccess?: () => void;
}

const MAX_IMAGES = 5; // 이미지 최대 개수

export default function MissionReviewSheet({
  tripGameId,
  tripGameMoveLogId,
  tripSpotId,
  onClose,
  onSuccess,
}: MissionReviewSheetProps) {
  const queryClient = useQueryClient();
  const { uploadReviewFile, isPending: isUploading } = useUploadReviewFileMutaion();
  const { submitReview, isPending: isSubmittingReview } = useReviewMissionMutaion();

  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [images, setImages] = useState<string[]>([]);

  const [submitting, setSubmitting] = useState(false);

  const canSubmit = rating > 0 && review.trim().length >= 20 && !submitting;

  const handlePickImage = async () => {
    const granted = await requestMediaPermission();
    if (!granted) return;

    const remaining = MAX_IMAGES - images.length;

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsMultipleSelection: true,
      selectionLimit: remaining,
      quality: 0.9,
      mediaTypes: ['images'],
    });

    if (!result.canceled && result.assets) {
      const uris = result.assets.map((a) => a.uri);
      setImages((prev) => [...prev, ...uris]);
    }
  };

  // 리뷰 제출
  const handleSubmit = async () => {
    if (!canSubmit) return;

    if (!tripGameId || !tripGameMoveLogId) {
      Alert.alert(
        '제출 불가',
        '진행 가능한 이동 로그가 없어요. 주사위를 굴려 현재 칸에 도착한 뒤 다시 시도해주세요.',
      );
      return;
    }

    try {
      setSubmitting(true);

      // 1) 이미지 업로드 (있는 경우만)
      let photoUrls: string[] = [];
      if (images.length > 0) {
        const uploadRes = await uploadReviewFile({
          tripSpotId,
          imageUris: images,
        });

        photoUrls = (uploadRes?.dataBody ?? []).map((d) => d.tempPhotoUrl);
      }

      // 2) 리뷰 등록
      await submitReview({
        tripGameId,
        tripGameMoveLogId,
        tripSpotId,
        rating,
        content: review.trim(),
        photoUrls,
      });

      // 3) 캐시 무효화
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.GAME.MOVE_LOGS, tripGameId],
      });
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.GAME.GAME_DETAIL_INFO, tripGameId],
      });

      Alert.alert('제출 완료', '주사위를 던져 다음 미션을 수행하세요.');
      onSuccess?.();
      onClose();
    } catch (e) {
      console.log('❌ 리뷰 제출 실패', e);
      Alert.alert('제출 실패', '미션 인증 제출 중 오류가 발생했어요. 잠시 후 다시 시도해주세요.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <BottomSheetView style={styles.container}>
      <TextBox size={16} fontsName="Pretendard700" style={{ alignSelf: 'center' }}>
        리뷰 작성 인증
      </TextBox>
      <MissionReviewForm
        rating={rating}
        review={review}
        images={images}
        maxImages={MAX_IMAGES}
        onChangeRating={setRating}
        onChangeReview={setReview}
        onAddImages={handlePickImage}
        onRemoveImage={(i) => setImages(images.filter((_, idx) => idx !== i))}
      />

      <SubmitButton
        disabled={!canSubmit}
        loading={submitting || isUploading || isSubmittingReview}
        onPress={handleSubmit}
      />
    </BottomSheetView>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: palette.white, padding: 16, gap: 16 },
});
