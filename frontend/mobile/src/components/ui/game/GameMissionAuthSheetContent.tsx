import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  Pressable,
  Alert,
  SafeAreaView,
} from 'react-native';
import { BottomSheetView } from '@gorhom/bottom-sheet';
import { palette } from '@/constants/colors';
import * as ImagePicker from 'expo-image-picker';

import useMoveLogsSuccessMutation from '@/hooks/game/useMoveLogsSuccess';
import { useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '@/constants/keys';

function Star({ filledPercent = 45 }: { filledPercent: 0 | 45 | 100 }) {
  return (
    <View
      style={{
        width: 28,
        height: 28,
        position: 'relative',
      }}
    >
      <Text style={{ fontSize: 24, color: '#e5e7eb', textAlign: 'center' }}>★</Text>
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: `${filledPercent}%`,
          height: '100%',
          overflow: 'hidden',
          transform: [{ translateX: filledPercent === 45 ? 2 : 0 }],
        }}
        pointerEvents="none"
      >
        <Text style={{ fontSize: 24, color: '#f59e0b', textAlign: 'center' }}>★</Text>
      </View>
    </View>
  );
}

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

  const canSubmit =
    allowMission &&
    ((mode === 'review' && rating > 0 && review.trim().length >= 20) ||
      (mode === 'location' && locationVerified));

  // hooks for mutation and query management
  const queryClient = useQueryClient();
  const { mutateAsync: markMissionSuccess, isPending: isSubmitting } = useMoveLogsSuccessMutation();

  const handleStarPress = (index: number, half: 0.5 | 1) => {
    const next = index - (half === 0.5 ? 0.5 : 0);
    setRating(next);
  };

  const starPercents: (0 | 45 | 100)[] = [1, 2, 3, 4, 5].map((i) => {
    const diff = rating - (i - 1);
    if (diff >= 1) return 100;
    if (diff >= 0.5) return 45;
    return 0;
  }) as (0 | 45 | 100)[];

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

  return (
    <BottomSheetView style={styles.sheetContainer}>
      <SafeAreaView style={styles.safeArea}>
        {/* 헤더 */}
        <View style={styles.header}>
          <Text style={styles.title} numberOfLines={2}>
            {tile?.tripSpotName || '미션 상세'}
          </Text>
          <TouchableOpacity onPress={onRequestClose} accessibilityLabel="닫기">
            <Text style={styles.close}>✕</Text>
          </TouchableOpacity>
        </View>

        {/* 상단 탭바 */}
        <View style={styles.topTabs}>
          <TouchableOpacity
            style={[styles.topTab, activeTab === 'info' && styles.topTabActive]}
            onPress={() => setActiveTab('info')}
          >
            <Text style={[styles.topTabText, activeTab === 'info' && styles.topTabTextActive]}>
              정보
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.topTab,
              activeTab === 'mission' && styles.topTabActive,
              !allowMission && styles.topTabDisabled,
            ]}
            onPress={() => allowMission && setActiveTab('mission')}
            disabled={!allowMission}
          >
            <Text
              style={[
                styles.topTabText,
                activeTab === 'mission' && styles.topTabTextActive,
                !allowMission && styles.topTabTextDisabled,
              ]}
            >
              미션 인증
            </Text>
          </TouchableOpacity>
        </View>

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
                <TouchableOpacity
                  style={[styles.missionTab, mode === 'review' && styles.missionTabActive]}
                  onPress={() => setMode('review')}
                >
                  <Text
                    style={[
                      styles.missionTabText,
                      mode === 'review' && styles.missionTabTextActive,
                    ]}
                  >
                    리뷰 작성
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.missionTab, mode === 'location' && styles.missionTabActive]}
                  onPress={() => setMode('location')}
                >
                  <Text
                    style={[
                      styles.missionTabText,
                      mode === 'location' && styles.missionTabTextActive,
                    ]}
                  >
                    위치 인증
                  </Text>
                </TouchableOpacity>
              </View>

              {/* 리뷰 모드 */}
              {mode === 'review' && (
                <View style={styles.missionCard}>
                  <Text style={styles.label}>별점 *</Text>
                  <View style={[styles.starsRow, { alignItems: 'center' }]}>
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Pressable
                        key={i}
                        onPress={(e) => {
                          const half = e.nativeEvent.locationX <= 14 ? 0.5 : 1;
                          handleStarPress(i, half);
                        }}
                        style={{
                          width: 28,
                          height: 28,
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                        hitSlop={8}
                      >
                        <Star filledPercent={starPercents[i - 1]} />
                      </Pressable>
                    ))}
                  </View>
                  {/* {rating === 0 && <Text style={styles.helper}>별점을 선택해주세요.</Text>} */}

                  <Text style={[styles.label, { marginTop: 12 }]}>리뷰(최소 20자) *</Text>
                  <View style={styles.textareaWrap}>
                    <TextInput
                      value={review}
                      onChangeText={setReview}
                      placeholder="여기에 방문 후기를 작성하세요…"
                      placeholderTextColor={palette.gray400}
                      multiline
                      style={styles.textarea}
                    />
                  </View>
                  {/* {review.trim().length < 20 && ( */}
                  <Text style={styles.helper}>현재 {review.trim().length}자 / 최소 20자</Text>
                  {/* )} */}

                  <Text style={[styles.label, { marginTop: 12 }]}>사진 첨부 (최대 5장)</Text>
                  <View style={styles.imageRow}>
                    {images.map((uri, idx) => (
                      <View key={uri} style={styles.thumbWrap}>
                        <Image source={{ uri }} style={styles.thumb} />
                        <TouchableOpacity
                          style={styles.thumbRemove}
                          onPress={() => removeImage(idx)}
                        >
                          <Text style={styles.thumbRemoveText}>✕</Text>
                        </TouchableOpacity>
                      </View>
                    ))}
                    {images.length < MAX_IMAGES && (
                      <TouchableOpacity
                        style={styles.addThumb}
                        onPress={pickImages}
                        accessibilityRole="button"
                        accessibilityLabel="이미지 추가"
                      >
                        <Text style={styles.addThumbPlus}>＋</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              )}

              {/* 위치 인증 모드 */}
              {mode === 'location' && (
                <View style={styles.missionCard}>
                  <Text style={styles.label}>현재 위치 인증</Text>
                  <Text style={styles.helper}>GPS 권한 요청 및 반경 체크는 추후 연결</Text>
                  <TouchableOpacity
                    style={styles.secondaryBtn}
                    onPress={() => setLocationVerified(true)}
                  >
                    <Text style={styles.secondaryBtnText}>
                      {locationVerified ? '위치 인증됨 ✓' : '위치 인증하기'}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}

              {/* 제출 */}
              <TouchableOpacity
                style={[styles.actionPrimary, !canSubmit && { opacity: 0.5 }]}
                onPress={async () => {
                  if (!canSubmit) return;
                  const payload =
                    mode === 'review'
                      ? {
                          type: 'review' as const,
                          rating,
                          review: review.trim(),
                          images,
                          tileId: tile?.tripGameTileId ?? tile?.tripSpotId,
                          tripGameId,
                        }
                      : {
                          type: 'location' as const,
                          verified: locationVerified,
                          tileId: tile?.tripGameTileId ?? tile?.tripSpotId,
                          tripGameId,
                        };
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
                disabled={!canSubmit || isSubmitting}
              >
                {isSubmitting ? (
                  <Text style={styles.actionPrimaryText}>제출 중…</Text>
                ) : (
                  <Text style={styles.actionPrimaryText}>제출</Text>
                )}
              </TouchableOpacity>
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

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: palette.black,
    flex: 1,
    paddingRight: 8,
  },
  close: { fontSize: 22, color: palette.gray500 },
  meta: { color: palette.gray600, marginBottom: 6 },
  actionPrimary: {
    backgroundColor: palette.completeText,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 8,
    marginBottom: 20,
  },
  actionPrimaryText: { color: palette.white, fontWeight: '700' },
  space: { height: 8 },
  missionTabs: { flexDirection: 'row', gap: 8, marginBottom: 12 },
  missionTab: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: palette.gray100,
  },
  missionTabActive: { backgroundColor: palette.mainColor },
  missionTabText: { color: palette.black, fontWeight: '600' },
  missionTabTextActive: { color: palette.white },
  missionCard: {
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
  secondaryBtn: {
    alignSelf: 'flex-start',
    backgroundColor: palette.gray100,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  secondaryBtnText: { color: palette.black, fontWeight: '700' },
  topTabs: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
    paddingHorizontal: 20,
  },
  topTab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: palette.gray100,
  },
  topTabActive: { backgroundColor: palette.mainColor },
  topTabDisabled: { opacity: 0.5 },
  topTabText: { fontWeight: '700', color: palette.black },
  topTabTextActive: { color: palette.white },
  topTabTextDisabled: { color: palette.gray500 },
  starsRow: { flexDirection: 'row', gap: 2, marginBottom: 6 },
  imageRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
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
