import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { palette } from '@/constants/colors';

import { getCurrentLocation, CurrentLocation } from '@/utils/location';
import KakaoMap from '@/components/ui/map/KakaoMap';
import { BottomSheetView } from '@gorhom/bottom-sheet';
import TextBox from '@/components/atom/TextBox';
import useMoveLogsSkipMutation from '@/hooks/game/useMoveLogsSkip';
import { useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '@/constants/keys';

interface Props {
  tripGameId: string;
  tripGameMoveLogId: string;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function MissionLocationSheet({
  tripGameId,
  tripGameMoveLogId,
  onClose,
  onSuccess,
}: Props) {
  const queryClient = useQueryClient();

  const [loc, setLoc] = useState<CurrentLocation | null>(null);
  const [loading, setLoading] = useState(false);
  const { mutateAsync: markMissionSkip, isPending: isSkipping } = useMoveLogsSkipMutation();

  async function refreshLocation() {
    setLoading(true);
    const l = await getCurrentLocation();
    setLoc(l);
    setLoading(false);
  }

  useEffect(() => {
    refreshLocation();
  }, []);

  const handleSkipMission = async () => {
    if (!tripGameId || !tripGameMoveLogId) {
      Alert.alert(
        '건너뛰기 불가',
        '진행 가능한 이동 로그가 없어요. 주사위를 굴려 현재 칸에 도착한 뒤 다시 시도해주세요.',
      );
      return;
    }

    Alert.alert(
      '미션 건너뛰기',
      '현재 위치 기반 인증은 위치 권한/서비스 약관 이슈로 일시 중단되었습니다.\n해당 미션을 건너뛰고 다음으로 진행할까요?',
      [
        { text: '취소', style: 'cancel' },
        {
          text: '건너뛰기',
          style: 'destructive',
          onPress: async () => {
            try {
              await markMissionSkip({ tripGameId, tripGameMoveLogId });

              // 캐시 무효화 & 리패치
              await Promise.all([
                queryClient.invalidateQueries({ queryKey: [QUERY_KEY.GAME.MOVE_LOGS, tripGameId] }),
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

              onSuccess?.();
              onClose();
            } catch (e) {
              Alert.alert(
                '건너뛰기 실패',
                '미션 건너뛰기 처리 중 오류가 발생했어요. 잠시 후 다시 시도해주세요.',
              );
            }
          },
        },
      ],
    );
  };

  return (
    <BottomSheetView style={styles.container}>
      <TextBox size={16} fontsName="Pretendard700" style={{ alignSelf: 'center' }}>
        현재 위치 인증
      </TextBox>

      {/* 안내 배너 */}
      <View style={styles.notice}>
        <Text style={styles.noticeTitle}>지금은 위치 인증을 사용할 수 없어요</Text>
        <Text style={styles.noticeText}>
          위치 권한 정책 및 서비스 약관 이슈로 위치 기반 인증 기능이 일시적으로 중단되었습니다. 대신
          아래 버튼을 눌러 미션을 건너뛸 수 있습니다.
        </Text>
      </View>

      <View style={styles.body}>
        {/* {loading && <ActivityIndicator size="large" color={palette.mainColor} />} */}

        {/* 미니맵 프리뷰(참고용) */}
        {/* {!loading && loc ? (
          <KakaoMap latitude={loc.lat} longitude={loc.lng} height={260} zoomLevel={4} />
        ) : (
          <View style={styles.mapPlaceholder}>
            <Text style={{ color: '#8A8F98' }}>
              {loading ? '현재 위치 불러오는 중…' : '위치를 불러오지 못했습니다'}
            </Text>
          </View>
        )} */}

        {/* <TouchableOpacity
          style={[styles.refreshBtn, (loading || isSkipping) && { opacity: 0.7 }]}
          onPress={refreshLocation}
          disabled={loading || isSkipping}
        >
          <Text style={styles.refreshText}>📍 내 위치로</Text>
        </TouchableOpacity> */}

        {/* ✅ 임시: 위치 인증 대신 미션 건너뛰기 */}
        <TouchableOpacity
          style={[styles.skipBtn, isSkipping && { opacity: 0.7 }]}
          onPress={handleSkipMission}
          disabled={isSkipping}
        >
          <Text style={styles.skipText}>{isSkipping ? '처리 중…' : '미션 건너뛰기'}</Text>
        </TouchableOpacity>
      </View>
    </BottomSheetView>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: palette.white, borderRadius: 16 },
  body: { paddingHorizontal: 20, paddingBottom: 32, alignItems: 'center' },

  notice: {
    marginTop: 12,
    marginHorizontal: 16,
    backgroundColor: '#FFF7ED',
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: '#FED7AA',
  },
  noticeTitle: { fontWeight: '700', color: '#9A3412', marginBottom: 4 },
  noticeText: { color: '#7C2D12', lineHeight: 18, fontSize: 13 },

  mapPlaceholder: {
    height: 220,
    borderRadius: 12,
    backgroundColor: '#F2F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    width: '100%',
  },

  refreshBtn: {
    marginTop: 12,
    paddingVertical: 10,
    paddingHorizontal: 14,
    backgroundColor: palette.gray100,
    borderRadius: 8,
  },
  refreshText: { color: palette.black, fontWeight: '600' },

  skipBtn: {
    marginTop: 16,
    backgroundColor: '#EF4444',
    paddingVertical: 14,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  skipText: { color: '#fff', fontWeight: '700' },
});
