import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  ScrollView,
  Animated,
  Easing,
  PanResponder,
  Dimensions,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { GamePlayStackParamList } from '@/types/navigation/navigation';
import { palette } from '@/constants/colors';

type Props = NativeStackScreenProps<GamePlayStackParamList, 'GameMissionAuthScreen'>;

export default function GameMissionAuthScreen({ route, navigation }: Props) {
  const { tile, tapIndex, currentIndex, tripGameId } = route.params || ({} as any);
  const isCurrent = tapIndex === currentIndex;

  const [activeTab, setActiveTab] = React.useState<'info' | 'mission'>('info');

  // isCurrent가 false이면 미션 탭을 강제로 정보 탭으로 전환
  React.useEffect(() => {
    if (!isCurrent && activeTab === 'mission') setActiveTab('info');
  }, [isCurrent, activeTab]);

  // Mission certification local state
  const [mode, setMode] = React.useState<'review' | 'photo' | 'location'>('review');
  const [review, setReview] = React.useState<string>('');
  const [photoSelected, setPhotoSelected] = React.useState<boolean>(false);
  const [locationVerified, setLocationVerified] = React.useState<boolean>(false);

  const canSubmit =
    isCurrent &&
    ((mode === 'review' && review.trim().length >= 20) ||
      (mode === 'photo' && photoSelected) ||
      (mode === 'location' && locationVerified));

  const screenH = Dimensions.get('window').height;
  const SHEET_EXPANDED = Math.round(screenH * 0.6); // 60%
  const SHEET_MINIMIZED = Math.round(screenH * 0.2); // 20%
  const DRAG_RANGE = SHEET_EXPANDED - SHEET_MINIMIZED;

  const translateY = React.useRef(new Animated.Value(0)).current;
  const backdropOpacity = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    // fade-in the dimmed backdrop when screen mounts
    Animated.timing(backdropOpacity, {
      toValue: 1,
      duration: 200,
      easing: Easing.out(Easing.quad),
      useNativeDriver: true,
    }).start();
  }, [backdropOpacity]);

  const snapTo = (to: number) => {
    Animated.spring(translateY, {
      toValue: to,
      useNativeDriver: true,
      friction: 8,
      tension: 80,
    }).start();
  };

  // drag gesture
  const dragStart = React.useRef(0);
  const panResponder = React.useMemo(
    () =>
      PanResponder.create({
        onMoveShouldSetPanResponder: (_, g) => Math.abs(g.dy) > 4,
        onPanResponderGrant: () => {
          translateY.stopAnimation((v) => {
            dragStart.current = v as number;
          });
        },
        onPanResponderMove: (_, g) => {
          const next = Math.min(Math.max(dragStart.current + g.dy, 0), DRAG_RANGE);
          translateY.setValue(next);
        },
        onPanResponderRelease: (_, g) => {
          const current = dragStart.current + g.dy;
          const clamped = Math.min(Math.max(current, 0), DRAG_RANGE);
          const threshold = DRAG_RANGE * 0.35; // snap threshold
          if (clamped > threshold) {
            // minimize to 20%
            snapTo(DRAG_RANGE);
          } else {
            // expand to 60%
            snapTo(0);
          }
        },
      }),
    [translateY],
  );

  const handleClose = () => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: DRAG_RANGE,
        duration: 200,
        easing: Easing.in(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.timing(backdropOpacity, {
        toValue: 0,
        duration: 200,
        easing: Easing.in(Easing.quad),
        useNativeDriver: true,
      }),
    ]).start(() => navigation.goBack());
  };

  return (
    <Animated.View style={[styles.backdrop, { opacity: backdropOpacity }]}>
      {/* 배경 터치 시 닫힘 */}
      <Pressable style={styles.overlay} onPress={handleClose} />

      {/* 아래에서 올라오는 시트 */}
      <Animated.View
        style={[styles.sheet, { height: SHEET_EXPANDED, transform: [{ translateY }] }]}
        {...panResponder.panHandlers}
      >
        <View style={styles.handleBar} />
        <View style={styles.header}>
          <Text style={styles.title} numberOfLines={2}>
            {tile?.tripSpotName || '미션 상세'}
          </Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.close}>✕</Text>
          </TouchableOpacity>
        </View>

        {/* 상단 탭바: 정보 / 미션 인증 */}
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
              !isCurrent && styles.topTabDisabled,
            ]}
            onPress={() => isCurrent && setActiveTab('mission')}
            disabled={!isCurrent}
          >
            <Text
              style={[
                styles.topTabText,
                activeTab === 'mission' && styles.topTabTextActive,
                !isCurrent && styles.topTabTextDisabled,
              ]}
            >
              미션 인증
            </Text>
          </TouchableOpacity>
        </View>

        <View>
          {/* 정보 섹션 */}
          {(activeTab === 'info' || !isCurrent) && (
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

          {/* 미션 인증 섹션 (현재 칸일 때만) */}
          {activeTab === 'mission' && isCurrent && (
            <View>
              {/* 모드 선택 탭 */}
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
                  style={[styles.missionTab, mode === 'photo' && styles.missionTabActive]}
                  onPress={() => setMode('photo')}
                >
                  <Text
                    style={[styles.missionTabText, mode === 'photo' && styles.missionTabTextActive]}
                  >
                    이미지 등록
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

              {/* 모드별 컨텐츠 */}
              {mode === 'review' && (
                <View style={[styles.missionCard]}>
                  <Text style={styles.label}>리뷰(최소 20자)</Text>
                  <View style={styles.textareaWrap}>
                    <ScrollView>
                      <Text style={styles.textarea} onPress={() => {}}>
                        {review.length === 0 ? '여기에 방문 후기를 작성하세요…' : review}
                      </Text>
                    </ScrollView>
                  </View>
                  <TouchableOpacity
                    style={styles.mockInputBtn}
                    onPress={() => setReview(review + ' 아주 좋았습니다. ')}
                  >
                    <Text style={styles.mockInputBtnText}>예시 문장 추가</Text>
                  </TouchableOpacity>
                </View>
              )}

              {mode === 'photo' && (
                <View style={[styles.missionCard]}>
                  <Text style={styles.label}>현장 사진 등록</Text>
                  <Text style={styles.helper}>갤러리/카메라 연동은 추후 연결</Text>
                  <TouchableOpacity
                    style={styles.secondaryBtn}
                    onPress={() => setPhotoSelected(true)}
                  >
                    <Text style={styles.secondaryBtnText}>
                      {photoSelected ? '이미지 선택됨 ✓' : '이미지 선택'}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}

              {mode === 'location' && (
                <View style={[styles.missionCard]}>
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

              {/* 제출 버튼 */}
              <TouchableOpacity
                style={[styles.actionPrimary, !canSubmit && { opacity: 0.5 }]}
                onPress={() => {
                  if (!canSubmit) return;
                  // TODO: 서버 제출 로직
                  handleClose();
                }}
                disabled={!canSubmit}
              >
                <Text style={styles.actionPrimaryText}>제출</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
  sheet: {
    backgroundColor: palette.white,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingTop: 16,
    paddingHorizontal: 20,
    paddingBottom: 20,
    height: '60%',
    maxHeight: '70%',
  },
  handleBar: {
    alignSelf: 'center',
    width: 44,
    height: 4,
    borderRadius: 2,
    backgroundColor: palette.gray100,
    marginBottom: 8,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
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

  actions: { flexDirection: 'row', justifyContent: 'flex-end', gap: 12, marginTop: 16 },
  actionPrimary: {
    backgroundColor: palette.completeText,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  actionPrimaryText: { color: palette.white, fontWeight: '700' },

  space: { height: 8 },

  missionNotice: { color: palette.gray500, marginBottom: 8 },
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
  dimmed: { opacity: 0.6 },
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

  mockInputBtn: {
    alignSelf: 'flex-start',
    backgroundColor: palette.gray100,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  mockInputBtnText: { color: palette.black, fontWeight: '700' },

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
    paddingHorizontal: 2,
  },
  topTab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: palette.gray100,
  },
  topTabActive: {
    backgroundColor: palette.mainColor,
  },
  topTabDisabled: {
    opacity: 0.5,
  },
  topTabText: {
    fontWeight: '700',
    color: palette.black,
  },
  topTabTextActive: {
    color: palette.white,
  },
  topTabTextDisabled: {
    color: palette.gray500,
  },
});
