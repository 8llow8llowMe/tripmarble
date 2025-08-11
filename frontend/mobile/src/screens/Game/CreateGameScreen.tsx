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
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons'; // 돋보기, 뒤로가기 아이콘
import useContentTypesListQuery from '@/hooks/trip/useContentTypesList';
import useRepresentativeRegionsListQuery from '@/hooks/trip/useRepresentativeRegionsList';
import useDifficultyListQuery from '@/hooks/game/useDifficultyList';
import useCreateGameMutaion from '@/hooks/game/useCreateGame';

const { height: SCREEN_H } = Dimensions.get('window');
const SECTION_H = SCREEN_H * 0.9;
const CTA_H = 64; // 고정바 높이

type SectionKey = 'location' | 'theme' | 'date' | 'level' | 'summary';
const ORDER: SectionKey[] = ['location', 'theme', 'date', 'level', 'summary'];

export default function CreateGameScreen() {
  const navigation = useNavigation<any>();
  const scrollRef = useRef<ScrollView>(null);
  const insets = useSafeAreaInsets();

  const { representativeRegionsList } = useRepresentativeRegionsListQuery(); //대표여행지 목록(전주, 부산....)
  const { contentTypesList } = useContentTypesListQuery(); //여행테마 목록(관광, 맛집...)
  const { difficultyList } = useDifficultyListQuery(); //게임 난이도 목록(쉬움, 보통, 어려움)

  const { createGame } = useCreateGameMutaion(); //게임 생성
  console.log(representativeRegionsList);
  console.log(contentTypesList);
  console.log(difficultyList);

  // 각 섹션의 y 포지션 저장
  const yMapRef = useRef<Record<SectionKey, number>>({
    location: 0,
    theme: 0,
    date: 0,
    level: 0,
    summary: 0,
  });
  const [activeStep, setActiveStep] = useState(0);

  // 선택값 (예시)
  const [location, setLocation] = useState<string | null>(null);
  const [themes, setThemes] = useState<string[]>([]);
  const [dates, setDates] = useState<{ start?: string; end?: string }>({});
  const [level, setLevel] = useState<string | null>(null);

  // 완료 조건
  const complete = {
    location: !!location,
    theme: themes.length > 0,
    date: !!dates.start && !!dates.end,
    level: !!level,
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
  };

  const scrollToKey = (key: SectionKey) => {
    const y = yMapRef.current[key] ?? 0;
    scrollRef.current?.scrollTo({ y, animated: true });
  };

  // 스냅 오프셋(각 섹션 시작 y). 레이아웃 후 업데이트를 위해 매 렌더에서 계산
  const snapOffsets = useMemo(
    () => ORDER.map((k) => yMapRef.current[k] ?? 0),
    [activeStep, maxAllowedIndex],
  );

  // 스크롤 끝났을 때, 허용 범위를 넘어가면 현재 허용 섹션으로 되돌림
  const onMomentumScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const y = e.nativeEvent.contentOffset.y;
    // 현재 스냅 인덱스 추정
    let targetIdx = 0;
    for (let i = 0; i < ORDER.length; i++) {
      const top = yMapRef.current[ORDER[i]];
      const next = i < ORDER.length - 1 ? yMapRef.current[ORDER[i + 1]] : Number.MAX_SAFE_INTEGER;
      if (y >= top - 10 && y < next - 10) {
        targetIdx = i;
        break;
      }
    }
    // 아래(미완료 단계)로 넘어가려 하면 되돌리기
    if (targetIdx > maxAllowedIndex) {
      const backKey = ORDER[maxAllowedIndex];
      requestAnimationFrame(() => scrollToKey(backKey));
      return;
    }
    setActiveStep(targetIdx);
  };

  // 선택 즉시 다음 섹션으로 자동 스크롤하는 헬퍼
  const completeAndGoNext = (key: SectionKey) => {
    const curIdx = ORDER.indexOf(key);
    const nextKey = ORDER[Math.min(curIdx + 1, ORDER.length - 1)];
    requestAnimationFrame(() => scrollToKey(nextKey));
  };

  // 예시 핸들러들
  const handleSelectLocation = (name: string) => {
    setLocation(name);
    completeAndGoNext('location');
  };
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
  const handleSelectLevel = (lv: string) => {
    setLevel(lv);
    completeAndGoNext('level');
  };

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
          // 도트 탭도 동일 정책: 허용된 최대 이하만 점프
          const clamped = Math.min(i, maxAllowedIndex);
          scrollToKey(ORDER[clamped]);
        }}
      />

      {/* 본문 */}
      <ScrollView
        ref={scrollRef}
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        onMomentumScrollEnd={onMomentumScrollEnd}
        scrollEventThrottle={16}
        decelerationRate="fast"
        snapToOffsets={snapOffsets}
        snapToAlignment="start"
        contentContainerStyle={{ paddingBottom: CTA_H + insets.bottom + 24 }}
      >
        {/* 1. 여행지 */}
        <Section
          title="여행지 선택"
          onLayout={onLayoutFactory('location')}
          footer={
            <Next
              label="다음(테마)"
              onPress={() => complete.location && scrollToKey('theme')}
              disabled={!complete.location}
            />
          }
        >
          <TouchableOpacity
            style={styles.searchBar}
            onPress={() => navigation.navigate('SearchScreen')}
          >
            <Text style={styles.searchPlaceholder}>{location ?? '여행지 검색'}</Text>
          </TouchableOpacity>

          <View style={styles.row}>
            {['제주', '경주', '전주', '부산', '광주', '강릉'].map((n) => (
              <Chip
                key={n}
                active={location === n}
                label={n}
                onPress={() => handleSelectLocation(n)}
              />
            ))}
          </View>
        </Section>

        {/* 2. 테마 */}
        <Section title="여행 테마" onLayout={onLayoutFactory('theme')}>
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
          <Next
            label="다음(기간)"
            onPress={() => complete.theme && scrollToKey('date')}
            disabled={!complete.theme}
          />
        </Section>

        {/* 3. 여행 기간 */}
        <Section title="여행 기간" onLayout={onLayoutFactory('date')}>
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
          <Next
            label="다음(난이도)"
            onPress={() => complete.date && scrollToKey('level')}
            disabled={!complete.date}
          />
        </Section>

        {/* 4. 난이도 */}
        <Section title="난이도" onLayout={onLayoutFactory('level')}>
          <View style={styles.row}>
            {['쉬움', '보통', '어려움'].map((lv) => (
              <Chip
                key={lv}
                label={lv}
                active={level === lv}
                onPress={() => handleSelectLevel(lv)}
              />
            ))}
          </View>
          <Next
            label="다음(요약)"
            onPress={() => complete.level && scrollToKey('summary')}
            disabled={!complete.level}
          />
        </Section>

        {/* 5. 요약 */}
        <Section title="요약" onLayout={onLayoutFactory('summary')}>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryTitle}>선택 요약</Text>
            <Text style={styles.summaryItem}>여행지: {location ?? '-'}</Text>
            <Text style={styles.summaryItem}>테마: {themes.length ? themes.join(', ') : '-'}</Text>
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
      </ScrollView>
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
  footer, // ⬅️ 추가
}: {
  title: string;
  onLayout?: (e: any) => void;
  children: React.ReactNode;
  footer?: React.ReactNode;
}) {
  return (
    <View
      onLayout={onLayout}
      style={[
        styles.section,
        { minHeight: SECTION_H },
        title === '여행지 선택' && { backgroundColor: palette.yellow300 },
      ]}
    >
      <Text style={styles.sectionTitle}>{title}</Text>

      {/* 본문 */}
      <View style={styles.sectionBody}>{children}</View>

      {/* 섹션 하단 고정 영역 */}
      {footer ? <View style={styles.sectionFooter}>{footer}</View> : null}
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

const Next = ({
  label,
  onPress,
  disabled,
}: {
  label: string;
  onPress: () => void;
  disabled?: boolean;
}) => (
  <TouchableOpacity
    style={[styles.nextBtn, disabled && styles.nextBtnDisabled]}
    onPress={onPress}
    disabled={disabled}
  >
    <Text style={[styles.nextBtnText, disabled && styles.nextBtnTextDisabled]}>{label}</Text>
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

  scroll: { flex: 1 },

  section: {
    paddingHorizontal: 20,
    paddingTop: 14,
    paddingBottom: 28,
  },
  sectionTitle: { fontSize: 20, fontWeight: '700', color: '#0F172A', marginBottom: 14 },
  sectionBody: { flexGrow: 1 }, // 남는 공간을 차지해서 푸터를 아래로 밀기
  sectionFooter: { marginTop: 18 }, // 버튼 위 여백

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

  nextBtn: {
    marginTop: 0,
    height: 48,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  nextBtnDisabled: { opacity: 0.4 },
  nextBtnText: { fontSize: 16, color: '#111827' },
  nextBtnTextDisabled: { color: '#9CA3AF' },

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
