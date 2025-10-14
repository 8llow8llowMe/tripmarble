import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert, SafeAreaView } from 'react-native';
import { BottomSheetView } from '@gorhom/bottom-sheet';
import { palette } from '@/constants/colors';
import * as ImagePicker from 'expo-image-picker';

import useMoveLogsSuccessMutation from '@/hooks/game/useMoveLogsSuccess';
import { useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '@/constants/keys';
import GameSheetHeader from '@/components/ui/game-mission/GameSheetHeader';
import GameTabs from '@/components/ui/game-mission/GameTabs';
import MissionReviewForm from '@/components/ui/game-mission/MissionReviewForm';
import MissionLocationForm from '@/components/ui/game-mission/MissionLocationForm';
import SubmitButton from '@/components/ui/game-mission/SubmitButton';
import { TouchableOpacity } from 'react-native';
import useMoveLogsSkipMutation from '@/hooks/game/useMoveLogsSkip';
import { CurrentLocation, getCurrentLocation } from '@/utils/location';

export interface GameMissionAuthSheetProps {
  tile: any;
  tapIndex: number;
  currentIndex: number;
  tripGameId?: string;
  pendingMoveLogId?: string;
  onRequestClose: () => void;
  canMove?: boolean;
  allowMissionOverride?: boolean;
  onMissionSucceeded?: () => void;
}
export function GameMissionAuthSheetContent({
  tile,
  tapIndex,
  currentIndex,
  tripGameId,
  pendingMoveLogId,
  onRequestClose,
  allowMissionOverride,
  onMissionSucceeded,
}: GameMissionAuthSheetProps) {
  const isCurrent = tapIndex === currentIndex;
  // 부모에서 강제 제어값이 넘어오면 우선 사용, 없으면 기본 규칙 사용
  const allowMission =
    typeof allowMissionOverride === 'boolean'
      ? allowMissionOverride
      : isCurrent && !!pendingMoveLogId;

  // 탭 & 폼 상태들 (기존 Screen 내부 상태를 이쪽으로 이동)
  const [activeTab, setActiveTab] = useState<'info' | 'mission'>(allowMission ? 'mission' : 'info');
  const [mode, setMode] = useState<'review' | 'location'>('review');
  const [rating, setRating] = useState<number>(0);
  const [review, setReview] = useState<string>('');
  const [images, setImages] = useState<string[]>([]);
  const [locationVerified, setLocationVerified] = useState<boolean>(false);

  const [currentLoc, setCurrentLoc] = useState<CurrentLocation | null>(null); // 현재 위치
  const [locLoading, setLocLoading] = useState(false); // 현재 위치 불러오는 로딩 상태

  // 위치 미리 불러오기
  useEffect(() => {
    if (activeTab === 'mission' && mode === 'location') {
      refreshLocation();
    }
  }, [activeTab, mode]);

  const canSubmit =
    allowMission &&
    ((mode === 'review' && rating > 0 && review.trim().length >= 20) ||
      (mode === 'location' && locationVerified));

  // hooks for mutation and query management
  const queryClient = useQueryClient();
  const { mutateAsync: markMissionSuccess, isPending: isSubmitting } = useMoveLogsSuccessMutation();
  const { mutateAsync: markMissionSkip, isPending: isSkipping } = useMoveLogsSkipMutation();

  const MAX_IMAGES = 5;
  const pickImages = async () => {
    const remaining = MAX_IMAGES - images.length;
    if (remaining <= 0) return;

    const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (perm.status !== 'granted') return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      selectionLimit: remaining,
      quality: 0.9,
    });

    if (!result.canceled && Array.isArray(result.assets)) {
      const uris = result.assets.map((a) => a.uri).filter(Boolean) as string[];
      setImages((prev) => {
        const merged = [...prev, ...uris];
        return merged.slice(0, MAX_IMAGES);
      });
    }
  };

  const removeImage = (idx: number) => setImages((prev) => prev.filter((_, i) => i !== idx));

  async function refreshLocation() {
    setLocLoading(true);
    try {
      const loc = await getCurrentLocation();
      if (loc) setCurrentLoc(loc);
    } finally {
      setLocLoading(false);
    }
  }

  // 📍 위치 인증
  async function handleVerifyLocation() {
    // 기존에 받아둔 값이 있으면 재사용, 없으면 한번 더 취득
    const loc = currentLoc ?? (await getCurrentLocation());
    if (!loc) return;

    console.log('🍏 loc', loc);

    // 서버 인증 호출 자리
    // await verifyLocationAPI({ tripGameId, tripGameMoveLogId: pendingMoveLogId!, ...loc });

    setLocationVerified(true);
  }
  return (
    <BottomSheetView style={styles.sheetContainer}>
      <SafeAreaView style={styles.safeArea}>
        <GameSheetHeader title={tile?.tripSpotName || '미션 상세'} onClose={onRequestClose} />

        <GameTabs active={activeTab} onChange={setActiveTab} allowMission={allowMission} />

        <View style={{ paddingHorizontal: 20, paddingBottom: 24 }}>
          {/* 정보 탭 */}
          {(activeTab === 'info' || !allowMission) && (
            <View>
              <Text style={styles.meta}>spot detail screen 내용 띄우면 좋겠어요</Text>
              <Text style={styles.meta}>단계: step{tile?.stepNo ?? '-'}</Text>
              <Text style={styles.meta}>tripSpotId: {tile?.tripSpotId ?? '-'}</Text>
              <Text style={styles.meta}>선택 인덱스(tapIndex): {tapIndex ?? '-'}</Text>
              <Text style={styles.meta}>현재 인덱스(currentIndex): {currentIndex ?? '-'}</Text>
              {!!tripGameId && <Text style={styles.meta}>tripGameId: {tripGameId}</Text>}
              <View style={styles.space} />
            </View>
          )}

          {/* 미션 인증 탭 */}
          {activeTab === 'mission' && allowMission && (
            <View>
              {/* 모드 토글 */}
              <View style={styles.missionTabs}>
                <Text
                  onPress={() => setMode('review')}
                  style={[styles.missionTabText, mode === 'review' && styles.missionTabTextActive]}
                >
                  리뷰 작성
                </Text>
                <Text
                  onPress={() => setMode('location')}
                  style={[
                    styles.missionTabText,
                    mode === 'location' && styles.missionTabTextActive,
                  ]}
                >
                  위치 인증
                </Text>
              </View>

              {mode === 'review' && (
                <MissionReviewForm
                  rating={rating}
                  review={review}
                  images={images}
                  maxImages={MAX_IMAGES}
                  onChangeRating={setRating}
                  onChangeReview={setReview}
                  onAddImages={pickImages}
                  onRemoveImage={(idx) => removeImage(idx)}
                />
              )}

              {mode === 'location' && (
                <MissionLocationForm
                  verified={locationVerified}
                  onVerify={handleVerifyLocation}
                  current={currentLoc} // ✅ 내려줌
                  loading={locLoading} // ✅ 스피너 표시용
                  onRefresh={refreshLocation} // ✅ "내 위치로" 재시도
                />
              )}

              <View style={styles.actionRow}>
                <SubmitButton
                  style={{ flex: 1, marginRight: 8 }}
                  disabled={!canSubmit || isSubmitting}
                  loading={isSubmitting}
                  onPress={async () => {
                    if (!canSubmit) return;
                    // If missing required ids, show alert and abort
                    if (!tripGameId || !pendingMoveLogId) {
                      Alert.alert(
                        '제출 불가',
                        '진행 가능한 이동 로그가 없어요. 주사위를 굴려 현재 칸에 도착한 뒤 다시 시도해주세요.',
                      );
                      return;
                    }
                    try {
                      await markMissionSuccess({
                        tripGameId,
                        tripGameMoveLogId: pendingMoveLogId,
                      });

                      // 먼저 무효화하고
                      await Promise.all([
                        queryClient.invalidateQueries({
                          queryKey: [QUERY_KEY.GAME.MOVE_LOGS, tripGameId],
                        }),
                        queryClient.invalidateQueries({
                          queryKey: [QUERY_KEY.GAME.GAME_DETAIL_INFO, tripGameId],
                        }),
                      ]);
                      // 이어서 즉시 재요청하여 최신 데이터로 갱신 (버튼 상태 전환 보장)
                      await queryClient.refetchQueries({
                        queryKey: [QUERY_KEY.GAME.MOVE_LOGS, tripGameId],
                        type: 'active',
                      });
                      await queryClient.refetchQueries({
                        queryKey: [QUERY_KEY.GAME.GAME_DETAIL_INFO, tripGameId],
                        type: 'active',
                      });

                      setActiveTab('info');
                      onMissionSucceeded?.();
                      onRequestClose();
                    } catch (e) {
                      Alert.alert(
                        '제출 실패',
                        '미션 인증 제출 중 오류가 발생했어요. 잠시 후 다시 시도해주세요.',
                      );
                    }
                  }}
                />

                <TouchableOpacity
                  style={[styles.actionSecondary, (isSkipping || isSubmitting) && { opacity: 0.5 }]}
                  disabled={isSkipping || isSubmitting || !tripGameId || !pendingMoveLogId}
                  onPress={async () => {
                    if (!tripGameId || !pendingMoveLogId) {
                      Alert.alert(
                        '건너뛰기 불가',
                        '진행 가능한 이동 로그가 없어요. 주사위를 굴려 현재 칸에 도착한 뒤 다시 시도해주세요.',
                      );
                      return;
                    }
                    try {
                      await markMissionSkip({
                        tripGameId,
                        tripGameMoveLogId: pendingMoveLogId,
                      });

                      await Promise.all([
                        queryClient.invalidateQueries({
                          queryKey: [QUERY_KEY.GAME.MOVE_LOGS, tripGameId],
                        }),
                        queryClient.invalidateQueries({
                          queryKey: [QUERY_KEY.GAME.GAME_DETAIL_INFO, tripGameId],
                        }),
                      ]);
                      await queryClient.refetchQueries({
                        queryKey: [QUERY_KEY.GAME.MOVE_LOGS, tripGameId],
                        type: 'active',
                      });
                      await queryClient.refetchQueries({
                        queryKey: [QUERY_KEY.GAME.GAME_DETAIL_INFO, tripGameId],
                        type: 'active',
                      });

                      setActiveTab('info');
                      onMissionSucceeded?.();
                      onRequestClose();
                    } catch (e) {
                      Alert.alert(
                        '건너뛰기 실패',
                        '미션 건너뛰기 처리 중 오류가 발생했어요. 잠시 후 다시 시도해주세요.',
                      );
                    }
                  }}
                >
                  <Text style={styles.actionSecondaryText}>
                    {isSkipping ? '건너뛰는 중…' : '건너뛰기'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      </SafeAreaView>
    </BottomSheetView>
  );
}

const styles = StyleSheet.create({
  sheetContainer: { backgroundColor: palette.white },
  safeArea: { backgroundColor: palette.white },

  meta: { color: palette.gray600, marginBottom: 6 },
  space: { height: 8 },
  missionTabs: { flexDirection: 'row', gap: 8, marginBottom: 12 },
  missionTabText: {
    color: palette.black,
    backgroundColor: palette.gray100,
    fontWeight: '600',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  missionTabTextActive: {
    color: palette.white,
    backgroundColor: palette.mainColor,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionSecondary: {
    flex: 1,
    backgroundColor: palette.white,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 8,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: palette.completeText,
  },
  actionSecondaryText: {
    color: palette.completeText,
    fontWeight: '700',
  },
});
