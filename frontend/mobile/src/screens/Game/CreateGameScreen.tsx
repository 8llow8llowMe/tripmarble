import React, { useMemo, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  NativeSyntheticEvent,
  NativeScrollEvent,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { palette } from '@/constants/colors';
import { Ionicons } from '@expo/vector-icons';
import useDifficultyListQuery from '@/hooks/game/useDifficultyList';
import useCreateGameMutaion from '@/hooks/game/useCreateGame';

import useRepresentativeRegionsListQuery from '@/hooks/trip/useRepresentativeRegionsList';
import {
  DateSection,
  LevelSection,
  LocationSection,
  StepDots,
  SummarySection,
  ThemeSection,
} from '@/components/ui/game-create';
import useTripThemesListQuery from '@/hooks/game/useTripThemesList';
import { AppNavigatorNavigationProp } from '@/types/navigation/screen';

type SectionKey = 'location' | 'theme' | 'date' | 'level' | 'summary';
const ORDER: SectionKey[] = ['location', 'theme', 'date', 'level', 'summary'];

export default function CreateGameScreen() {
  const navigation = useNavigation<AppNavigatorNavigationProp>();

  const scrollRef = useRef<ScrollView>(null);

  const { representativeRegionsList } = useRepresentativeRegionsListQuery();
  const { tripThemesList } = useTripThemesListQuery();
  const { difficultyList } = useDifficultyListQuery();

  const { createGame, isPending: creating } = useCreateGameMutaion();

  // 각 섹션의 y 포지션 저장
  const yMapRef = useRef<Record<SectionKey, number>>({
    location: 0,
    theme: 0,
    date: 0,
    level: 0,
    summary: 0,
  });
  const [activeStep, setActiveStep] = useState(0);

  // 선택값
  const [regionId, setRegionId] = useState<string | null>(null); //representativeRegionId
  const [themeIds, setThemeIds] = useState<string[]>([]); //tripThemeIds
  const [startedAt, setStartedAt] = useState<string | null>(null); //startedAt
  const [endedAt, setEndedAt] = useState<string | null>(null); //endedAt
  const [level, setLevel] = useState<string | null>(null); // difficulty

  const [pendingScrollKey, setPendingScrollKey] = useState<SectionKey | null>(null);
  const [viewportH, setViewportH] = useState(0);

  // 완료 조건
  const complete = {
    location: regionId != null,
    theme: themeIds.length > 0,
    date: !!startedAt && !!endedAt,
    level: level != null,
    summary: false, // 마지막은 생성 버튼 누를 때
  };

  // 사용자가 내려갈 수 있는 최대 인덱스(가장 최근 완료 스텝까지)
  const maxAllowedIndex = useMemo(() => {
    let idx = 0;
    if (complete.location) idx = 1;
    if (complete.theme) idx = 2;
    if (complete.date) idx = 3;
    if (complete.level) idx = 4;
    return idx;
  }, [complete]);

  // 유효성
  const isFormValid = regionId != null && themeIds.length > 0 && startedAt && endedAt && level;

  const onLayoutFactory = (key: SectionKey) => (e: any) => {
    yMapRef.current[key] = e.nativeEvent.layout.y;

    // 이 섹션이 지금 스크롤 대기 중이면, 레이아웃 직후 스크롤
    if (pendingScrollKey === key) {
      requestAnimationFrame(() => {
        scrollToKey(key);
        setPendingScrollKey(null);
      });
    }
  };

  const nextOf = (key: SectionKey) => ORDER[Math.min(ORDER.indexOf(key) + 1, ORDER.length - 1)];

  const completeAndGoNext = (key: SectionKey) => {
    const nextKey = nextOf(key);
    const y = yMapRef.current[nextKey];

    // 이미 다음 섹션이 렌더돼서 y가 측정돼 있으면 즉시 이동
    if (typeof y === 'number' && y > 0) {
      scrollToKey(nextKey);
      return;
    }
    // 아직 렌더 전이면 대기 → onLayout에서 자동 처리
    setPendingScrollKey(nextKey);
  };

  const scrollToKey = (key: SectionKey) => {
    const y = yMapRef.current[key] ?? 0;
    scrollRef.current?.scrollTo({ y, animated: true });
  };

  // ORDER는 그대로
  const visibleOrder = useMemo(
    () => ORDER.slice(0, maxAllowedIndex + 1), // 초기엔 ['location']만 렌더
    [maxAllowedIndex],
  );

  const snapOffsets = useMemo(
    () => visibleOrder.map((k) => yMapRef.current[k] ?? 0),
    [visibleOrder, activeStep],
  );

  const onMomentumScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const y = e.nativeEvent.contentOffset.y;
    let targetIdx = 0;
    for (let i = 0; i < visibleOrder.length; i++) {
      const key = visibleOrder[i];
      const top = yMapRef.current[key];
      const next =
        i < visibleOrder.length - 1
          ? yMapRef.current[visibleOrder[i + 1]]
          : Number.MAX_SAFE_INTEGER;
      if (y >= top - 10 && y < next - 10) {
        targetIdx = i;
        break;
      }
    }
    setActiveStep(targetIdx);
  };

  // 핸들러
  const toggleTheme = (id: string) => {
    setThemeIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const setDateRange = (start: string, end: string) => {
    if (start > end) {
      // swap 처리
      setStartedAt(end);
      setEndedAt(start);
    } else {
      setStartedAt(start);
      setEndedAt(end);
    }
  };

  const selectedRegionName =
    representativeRegionsList?.find((r) => r.representativeRegionId === regionId)
      ?.representativeRegionName ?? '-';

  const selectedThemeNames = useMemo(
    () =>
      tripThemesList &&
      tripThemesList.filter((t) => themeIds.includes(t.tripThemeId)).map((t) => t.tripThemeName),
    [tripThemesList, themeIds],
  );

  // 진행중인 게임 스크린으로 이동
  // const goToDetailGameScreen = (tripGameId: string) => {
  //   navigation.replace('GamePlayStackNavigator', {
  //     screen: 'GameDetailScreen',
  //     params: { tripGameId },
  //   });
  // };

  // 게임 탭 메인 홈 스크린으로 이동
  const goToPlayHomeScreen = () => {
    navigation.navigate('BottomTabNavigator', {
      screen: 'GameTab',
    });
  };

  // 게임 생성 submit 함수
  const handleCreate = async () => {
    if (!isFormValid || creating) return;

    const body = {
      representativeRegionId: regionId,
      tripThemeIds: themeIds,
      startedAt,
      endedAt,
      difficulty: level,
      title: `${selectedRegionName} 여행`, // TODO: title은 임시로 넣고, 나중에 사용자가 수정하게 끔
    };

    try {
      const res = await createGame(body);
      const tripGameId = res.dataBody.tripGameId;

      if (tripGameId) {
        console.log(`🎉🎉🎉 게임 생성 완료! tripGameId: ${tripGameId}`);
        // goToDetailGameScreen(tripGameId);

        goToPlayHomeScreen();
        // TODO: 나의 게임 목록 쿼리 무효화
      } else {
        console.log('⚠️⚠️⚠️ [CreateGame] 성공이지만 tripGameId 없음. PlayHome으로 이동'); // fallback
        goToPlayHomeScreen();
      }
    } catch (e: any) {
      console.error('💥💥💥 [CreateGame] 실패:', e);
      Alert.alert('게임 생성 실패', e?.message ?? '게임 생성 중 오류가 발생했어요.');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* 헤더 */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#555" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>게임 만들기</Text>
        <TouchableOpacity onPress={handleCreate} disabled={!isFormValid}>
          <Text style={[styles.createBtnText, !isFormValid && styles.createBtnTextDisabled]}>
            확인
          </Text>
        </TouchableOpacity>
      </View>

      {/* 스텝 도트 */}
      <StepDots
        total={ORDER.length}
        activeIndex={activeStep}
        onPressDot={(i) => {
          const clamped = Math.min(i, maxAllowedIndex);
          scrollToKey(ORDER[clamped]);
        }}
      />

      {/* 본문 */}
      <View style={{ flex: 1 }} onLayout={(e) => setViewportH(e.nativeEvent.layout.height)}>
        <ScrollView
          ref={scrollRef} // 스크롤 제어(프로그램적으로 scrollTo) 위해 ref 연결
          showsVerticalScrollIndicator={false} // 우측 스크롤바 숨김
          onMomentumScrollEnd={onMomentumScrollEnd} // 스크롤 관성(플링) 종료 시점에 현재 섹션 인덱스 계산
          scrollEventThrottle={16} // onScroll 계열 이벤트 호출 주기(≈60FPS) — 부드러운 추적
          decelerationRate="fast" // 관성 감속 속도 — iOS에서 특히 스냅 느낌 강화
          snapToOffsets={snapOffsets} // 섹션 시작 y좌표 배열 → 해당 위치들로만 ‘착’ 붙도록 스냅
          snapToAlignment="start" // 스냅 기준(섹션의 top을 화면 top에 정렬)
          // contentContainerStyle={{
          //   paddingBottom: insets.bottom + 24, // 하단 고정 버튼/안전영역에 가리지 않도록 여유! (를 주지 말자)
          // }}
        >
          {/* 1. 여행지 */}
          <LocationSection
            onLayout={onLayoutFactory('location')}
            onNext={() => completeAndGoNext('location')}
            regions={representativeRegionsList ?? []}
            selectedId={regionId}
            onSelect={(id) => {
              setRegionId(id);
              // completeAndGoNext('location'); // 매 변경 시 이동
            }}
            minHeight={viewportH}
          />

          {/* 2. 테마 */}
          {complete.location && (
            <ThemeSection
              onLayout={onLayoutFactory('theme')}
              themes={tripThemesList ?? []}
              selectedIds={themeIds}
              onToggle={toggleTheme} // 토글 핸들러
              onNext={() => completeAndGoNext('theme')}
              minHeight={viewportH} // 가용 높이
            />
          )}

          {/* 3. 여행 기간 */}
          {complete.theme && (
            <DateSection
              onLayout={onLayoutFactory('date')}
              minHeight={viewportH}
              startedAt={startedAt}
              endedAt={endedAt}
              onSelectRange={setDateRange}
              onNext={() => completeAndGoNext('date')}
            />
          )}

          {/* 4. 난이도 */}
          {complete.date && (
            <LevelSection
              onLayout={onLayoutFactory('level')}
              onNext={() => completeAndGoNext('level')}
              levels={difficultyList ?? []}
              selectedCode={level}
              onSelect={setLevel}
              minHeight={viewportH}
            />
          )}

          {/* 5. 요약 */}
          {complete.level && (
            <SummarySection
              onLayout={onLayoutFactory('summary')}
              location={selectedRegionName}
              themes={selectedThemeNames ?? []}
              startedAt={startedAt}
              endedAt={endedAt}
              level={level}
              onSubmit={handleCreate}
              disabled={!isFormValid}
              loading={creating}
              onToTop={() => scrollToKey('location')}
              minHeight={viewportH}
            />
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: palette.white },

  header: {
    height: 52,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E5E7EB',
    backgroundColor: palette.white,
  },
  headerTitle: { flex: 1, textAlign: 'center', fontSize: 17, fontWeight: '700', color: '#0F172A' },

  createBtnText: {
    color: palette.mainColor,
    fontWeight: '700',
    fontSize: 16,
  },
  createBtnTextDisabled: {
    color: '#D1D5DB', // 비활성화 시 회색
  },
});
