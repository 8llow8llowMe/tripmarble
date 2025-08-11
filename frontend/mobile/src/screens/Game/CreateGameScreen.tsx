import React, { useMemo, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { palette } from '@/constants/colors';
import { Ionicons } from '@expo/vector-icons';
import useContentTypesListQuery from '@/hooks/trip/useContentTypesList';
import useDifficultyListQuery from '@/hooks/game/useDifficultyList';
import useCreateGameMutaion from '@/hooks/game/useCreateGame';
import { LevelSection, LocationSection } from '@/components/ui/game/create';
import useRepresentativeRegionsListQuery from '@/hooks/trip/useRepresentativeRegionsList';

type SectionKey = 'location' | 'theme' | 'date' | 'level' | 'summary';
const ORDER: SectionKey[] = ['location', 'theme', 'date', 'level', 'summary'];

export default function CreateGameScreen() {
  const navigation = useNavigation<any>();
  const scrollRef = useRef<ScrollView>(null);

  const { representativeRegionsList } = useRepresentativeRegionsListQuery(); //대표여행지 목록(전주, 부산....)

  const { contentTypesList } = useContentTypesListQuery(); //여행테마 목록(관광, 맛집...)
  const { difficultyList } = useDifficultyListQuery(); //게임 난이도 목록(쉬움, 보통, 어려움)

  const { createGame } = useCreateGameMutaion(); //게임 생성

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
  const [regionId, setRegionId] = useState<number | null>(null); //representativeRegionId
  const [themes, setThemes] = useState<string[]>([]); // tripThemeIds
  const [dates, setDates] = useState<{ start?: string; end?: string }>({});
  const [level, setLevel] = useState<string | null>(null); // difficulty

  const [pendingScrollKey, setPendingScrollKey] = useState<SectionKey | null>(null);
  const [viewportH, setViewportH] = useState(0);

  // 완료 조건
  const complete = {
    location: regionId != null,
    theme: themes.length > 0,
    date: !!dates.start && !!dates.end,
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

  const isFormValid = maxAllowedIndex >= 4;

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

  // 예시 핸들러들
  const handleToggleTheme = (name: string) => {
    setThemes((prev) => {
      const exists = prev.includes(name);
      const next = exists ? prev.filter((t) => t !== name) : [...prev, name];
      // 최소 1개 선택되면 다음으로 이동
      if (!exists && next.length === 1) completeAndGoNext('theme');
      return next;
    });
  };

  const handleSetDates = (start: string, end: string) => {
    setDates({ start, end });
    completeAndGoNext('date');
  };

  const selectedRegionName =
    representativeRegionsList?.find((r) => r.representativeRegionId === regionId)
      ?.representativeRegionName ?? '-';

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* 헤더 */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={28} color="#555" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>게임 만들기</Text>
        <TouchableOpacity
          onPress={() => {
            /* submit */
          }}
          style={[styles.createBtn, !isFormValid && styles.createBtnDisabled]}
          disabled={!isFormValid}
        >
          <Text style={[styles.createBtnText, !isFormValid && styles.createBtnTextDisabled]}>
            생성
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
              completeAndGoNext('location'); // 매 변경 시 이동
            }}
            minHeight={viewportH}
          />

          {/* 2. 테마 */}
          {complete.location && (
            <Section title="여행 테마" onLayout={onLayoutFactory('theme')} minHeight={viewportH}>
              <View style={styles.row}>
                {['관광', '전시', '축제/공연', '액티비티', '쇼핑', '맛집'].map((t) => (
                  <Chip
                    key={t}
                    active={themes.includes(t)}
                    label={t}
                    onPress={() => handleToggleTheme(t)}
                  />
                ))}
              </View>
            </Section>
          )}

          {/* 3. 여행 기간 */}
          {complete.theme && (
            <Section title="여행 기간" onLayout={onLayoutFactory('date')} minHeight={viewportH}>
              <View style={styles.placeholderBox}>
                <Text style={styles.placeholderText}>📅 캘린더 자리</Text>
              </View>
              <View style={styles.row}>
                {[
                  ['2025-08-20', '2025-08-22'],
                  ['2025-09-01', '2025-09-03'],
                ].map(([s, e]) => (
                  <Chip
                    key={s}
                    label={`${s} ~ ${e}`}
                    active={dates.start === s && dates.end === e}
                    onPress={() => handleSetDates(s, e)}
                  />
                ))}
              </View>
            </Section>
          )}

          {/* 4. 난이도 */}
          {complete.date && (
            <LevelSection
              onLayout={onLayoutFactory('level')}
              onNext={() => completeAndGoNext('level')}
              levels={difficultyList ?? []}
              selectedCode={level}
              onSelect={(code) => {
                setLevel(code);
                completeAndGoNext('level');
              }}
              minHeight={viewportH}
            />
          )}

          {/* 5. 요약 */}
          {complete.level && (
            <Section title="요약" onLayout={onLayoutFactory('summary')} minHeight={viewportH}>
              <View style={styles.summaryCard}>
                <Text style={styles.summaryTitle}>선택 요약</Text>
                <Text style={styles.summaryItem}>여행지: {selectedRegionName}</Text>
                <Text style={styles.summaryItem}>
                  테마: {themes.length ? themes.join(', ') : '-'}
                </Text>
                <Text style={styles.summaryItem}>
                  기간: {dates.start && dates.end ? `${dates.start} ~ ${dates.end}` : '-'}
                </Text>
                <Text style={styles.summaryItem}>난이도: {level ?? '-'}</Text>
              </View>

              <TouchableOpacity
                style={[styles.primaryBtn, !isFormValid && { opacity: 0.4 }]}
                disabled={!isFormValid}
              >
                <Text style={styles.primaryBtnText}>게임 만들기</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.toTopBtn} onPress={() => scrollToKey('location')}>
                <Text style={styles.toTopText}>맨 위로</Text>
              </TouchableOpacity>
            </Section>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

/* ---------------- Components ---------------- */
function StepDots({
  total,
  activeIndex,
  onPressDot,
}: {
  total: number;
  activeIndex: number;
  onPressDot?: (i: number) => void;
}) {
  return (
    <View style={styles.dotsWrap}>
      <View style={styles.dotsLine} />
      <View style={styles.dotsRow}>
        {Array.from({ length: total }).map((_, i) => {
          const isActive = i === activeIndex;
          const isDone = i < activeIndex;
          return (
            <TouchableOpacity key={i} onPress={() => onPressDot?.(i)} activeOpacity={0.8}>
              <View style={[styles.dot, isActive && styles.dotActive, isDone && styles.dotDone]}>
                {isDone ? <Text style={styles.dotCheck}>✓</Text> : null}
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

function Section({
  title,
  onLayout,
  children,
  minHeight,
}: {
  title: string;
  onLayout?: (e: any) => void;
  children: React.ReactNode;
  minHeight: number;
}) {
  return (
    <View onLayout={onLayout} style={[styles.section, minHeight ? { minHeight } : null]}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );
}

const Chip = ({
  label,
  onPress,
  active,
}: {
  label: string;
  onPress?: () => void;
  active?: boolean;
}) => (
  <TouchableOpacity
    style={[styles.chip, active && styles.chipActive]}
    onPress={onPress}
    activeOpacity={0.95}
  >
    <Text style={[styles.chipText, active && styles.chipTextActive]}>{label}</Text>
  </TouchableOpacity>
);

/* ---------------- Styles ---------------- */
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
  createBtn: {
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4BA1FD',
  },
  createBtnDisabled: { backgroundColor: '#D1D5DB' },
  createBtnText: { color: '#FFF', fontWeight: '700' },
  createBtnTextDisabled: { color: '#F9FAFB' },

  dotsWrap: { paddingVertical: 10, backgroundColor: '#FFF' },
  dotsLine: {
    position: 'absolute',
    top: 22,
    left: 24,
    right: 24,
    height: 2,
    backgroundColor: '#E5E7EB',
  },
  dotsRow: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20 },
  dot: {
    width: 16,
    height: 16,
    borderRadius: 999,
    borderWidth: 2,
    borderColor: '#CBD5E1',
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dotActive: { borderColor: '#4BA1FD', backgroundColor: '#4BA1FD' },
  dotDone: { borderColor: '#22C55E', backgroundColor: '#22C55E' },
  dotCheck: { color: '#FFF', fontSize: 10, fontWeight: '800' },

  section: {
    paddingHorizontal: 20,
    paddingTop: 14,
  },
  sectionTitle: { fontSize: 20, fontWeight: '700', color: '#0F172A', marginBottom: 14 },

  searchBar: {
    height: 48,
    borderRadius: 14,
    backgroundColor: '#F2F4F7',
    justifyContent: 'center',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  searchPlaceholder: { color: '#9CA3AF', fontSize: 16 },

  row: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  chip: {
    paddingHorizontal: 16,
    height: 40,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  chipActive: { borderColor: '#4BA1FD', backgroundColor: '#E8F3FF' },
  chipText: { fontSize: 15, color: '#111827' },
  chipTextActive: { color: '#0F172A', fontWeight: '700' },

  placeholderBox: {
    height: 260,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#FAFAFA',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 8,
  },
  placeholderText: { color: '#6B7280' },

  summaryCard: {
    padding: 16,
    borderRadius: 16,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 16,
  },
  summaryTitle: { fontSize: 16, fontWeight: '700', marginBottom: 10, color: '#0F172A' },
  summaryItem: { fontSize: 14, color: '#334155', marginBottom: 4 },

  primaryBtn: {
    height: 52,
    borderRadius: 14,
    backgroundColor: '#4BA1FD',
    justifyContent: 'center',
    alignItems: 'center',
  },
  primaryBtnText: { color: '#fff', fontSize: 16, fontWeight: '700' },

  toTopBtn: { alignSelf: 'center', marginTop: 16, paddingVertical: 8, paddingHorizontal: 12 },
  toTopText: { color: '#64748B' },
});
