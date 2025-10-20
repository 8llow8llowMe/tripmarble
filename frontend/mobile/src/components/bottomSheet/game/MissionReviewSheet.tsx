import React, { useState } from 'react';
import { StyleSheet, Alert } from 'react-native';
import { palette } from '@/constants/colors';

import * as ImagePicker from 'expo-image-picker';
import GameSheetHeader from '@/components/ui/game-mission/GameSheetHeader';
import MissionReviewForm from '@/components/ui/game-mission/MissionReviewForm';
import SubmitButton from '@/components/ui/game-mission/SubmitButton';
import { BottomSheetView } from '@gorhom/bottom-sheet';
import useMoveLogsSuccessMutation from '@/hooks/game/useMoveLogsSuccess';
import { useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '@/constants/keys';

interface MissionReviewSheetProps {
  tripGameId: string;
  tripGameMoveLogId: string;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function MissionReviewSheet({
  tripGameId,
  tripGameMoveLogId,
  onClose,
  onSuccess,
}: MissionReviewSheetProps) {
  const queryClient = useQueryClient();
  const { mutateAsync: markMissionSuccess } = useMoveLogsSuccessMutation();

  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [images, setImages] = useState<string[]>([]);

  const MAX_IMAGES = 5;

  const pickImages = async () => {
    const remaining = MAX_IMAGES - images.length;
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsMultipleSelection: true,
      selectionLimit: remaining,
      quality: 0.9,
    });
    if (!result.canceled && result.assets) {
      const uris = result.assets.map((a) => a.uri);
      setImages((prev) => [...prev, ...uris]);
    }
  };

  const canSubmit = rating > 0 && review.trim().length >= 20;

  // 리뷰 제출
  const handleSubmit = async () => {
    if (!canSubmit) return;
    if (!tripGameId) {
      Alert.alert(
        '제출 불가',
        '진행 가능한 이동 로그가 없어요. 주사위를 굴려 현재 칸에 도착한 뒤 다시 시도해주세요.',
      );
      return;
    }

    try {
      await markMissionSuccess({
        tripGameId,
        tripGameMoveLogId,
      });

      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.GAME.MOVE_LOGS, tripGameId],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.GAME.GAME_DETAIL_INFO, tripGameId],
      });

      Alert.alert('제출 완료', '리뷰가 정상적으로 제출되었습니다.');
      onSuccess?.();
      onClose();
    } catch (e) {
      Alert.alert('제출 실패', '미션 인증 제출 중 오류가 발생했어요. 잠시 후 다시 시도해주세요.');
    }
  };

  return (
    <BottomSheetView style={styles.container}>
      <GameSheetHeader title="리뷰 인증" />
      <MissionReviewForm
        rating={rating}
        review={review}
        images={images}
        maxImages={MAX_IMAGES}
        onChangeRating={setRating}
        onChangeReview={setReview}
        onAddImages={pickImages}
        onRemoveImage={(i) => setImages(images.filter((_, idx) => idx !== i))}
      />
      <SubmitButton disabled={!canSubmit} onPress={handleSubmit} />
    </BottomSheetView>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: palette.white, borderRadius: 16, flex: 1 },
});
