import React, { useMemo } from 'react';
import { View, StyleSheet, Text, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { palette } from '@/constants/colors';
import NextFloatingButton from './NextFloatingButton';

type Level = { code: string; description: string };

type LevelSectionProps = {
  onLayout?: (e: any) => void;
  levels: Level[];
  selectedCode: string | null;
  onSelect: (code: string) => void;
  onNext?: () => void;
  minHeight: number;
};

const META: Record<
  string,
  {
    board: string;
    dice: string;
    turns: string;
    hours: string;
    period: string;
    note?: string;
  }
> = {
  EASY: {
    board: '4×4',
    dice: '1개',
    turns: '6턴',
    hours: '3시간',
    period: '반나절',
    note: '가볍게 즐기기 좋아요',
  },
  NORMAL: {
    board: '5×5',
    dice: '1개',
    turns: '8턴',
    hours: '6시간',
    period: '당일치기 ~ 1박2일',
    note: '대부분의 일정에 추천',
  },
  HARD: {
    board: '6×6',
    dice: '2개',
    turns: '10턴',
    hours: '8+시간',
    period: '1박2일 ~ 2박3일',
    note: '여행을 깊이 있게 즐길 수 있어요',
  },
};

export default function LevelSection({
  onLayout,
  onNext,
  levels,
  selectedCode,
  onSelect,
  minHeight,
}: LevelSectionProps) {
  // 미리보기(탭 전환) 상태는 로컬로 관리
  const [activeCode, setActiveCode] = React.useState<string>(selectedCode ?? 'NORMAL');

  React.useEffect(() => {
    // 외부에서 확정 변경되면 active도 맞춰줌
    if (selectedCode) setActiveCode(selectedCode);
  }, [selectedCode]);

  const isSelected = (code: string) => selectedCode === code;
  const isActive = (code: string) => activeCode === code;

  const meta = useMemo(() => META[activeCode] ?? META.NORMAL, [activeCode]);

  const isRecommended = (lvl: Level) => lvl.code === 'NORMAL' || /보통/.test(lvl.description);

  return (
    <View onLayout={onLayout} style={[styles.section, { minHeight }]}>
      <Text style={styles.title}>여행 난이도 선택</Text>
      <Text style={styles.subtitle}>일정에 알맞는 난이도를 선택하세요!</Text>

      {/* 세그먼트 탭 */}
      <View style={styles.segmentWrap}>
        {levels.map((lvl) => {
          const active = isActive(lvl.code);
          const picked = isSelected(lvl.code);
          return (
            <Pressable
              key={lvl.code}
              onPress={() => {
                onSelect(lvl.code);
                // onNext?.();
              }}
              style={({ pressed }) => [
                styles.segmentItem,
                active && styles.segmentItemActive,
                pressed && { opacity: 0.9 },
              ]}
            >
              <Text style={[styles.segmentLabel, active && styles.segmentLabelActive]}>
                {lvl.description}
              </Text>

              {picked && (
                <View style={styles.selectedBadge}>
                  <Text style={styles.selectedBadgeText}>선택됨</Text>
                </View>
              )}

              {isRecommended(lvl) && (
                <View style={styles.recoBadge}>
                  <Text style={styles.recoText}>추천!</Text>
                  <Ionicons name="sparkles" size={10} color="#6D28D9" />
                </View>
              )}
            </Pressable>
          );
        })}
      </View>

      {/* 상세 카드 */}
      <View style={styles.detailCard}>
        <Row k="게임판 크기" v={meta.board} />
        <Row k="주사위 개수" v={meta.dice} />
        <Row k="평균 소요 턴 수" v={meta.turns} />
        <Row k="평균 소요 시간" v={meta.hours} />
        <Row k="권장 여행 기간" v={meta.period} />
        {meta.note ? <Text style={styles.note}>※ {meta.note}</Text> : null}
      </View>

      <NextFloatingButton
        visible={!!selectedCode}
        onPress={() => onNext?.()}
        label="난이도 선택 완료, 다음 섹션으로 이동"
      />
    </View>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <View style={styles.row}>
      <Text style={styles.rowKey}>{k}</Text>
      <Text style={styles.rowSep}>:</Text>
      <Text style={styles.rowVal}>{v}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  section: { paddingHorizontal: 20, paddingTop: 14, position: 'relative' },
  title: { fontSize: 20, fontWeight: '700', color: palette.Neutral800 },
  subtitle: { marginTop: 14, fontSize: 15, color: palette.gray600 },

  segmentWrap: {
    flexDirection: 'row',
    marginTop: 16,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#F3F4F6',
  },
  segmentItem: {
    flex: 1,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  segmentItemActive: {
    backgroundColor: '#EEF2FF',
    borderBottomWidth: 2,
    borderBottomColor: '#6366F1',
  },
  segmentLabel: { fontSize: 14, color: '#6B7280', fontWeight: '600' },
  segmentLabelActive: { color: '#111827' },

  selectedBadge: {
    position: 'absolute',
    top: 24,
    left: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 999,
    backgroundColor: '#ECFDF5',
  },
  selectedBadgeText: { fontSize: 10, color: '#059669', fontWeight: '700' },

  recoBadge: {
    position: 'absolute',
    top: 4,
    right: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    backgroundColor: '#F5F3FF',
    borderRadius: 999,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#DDD6FE',
  },
  recoText: { fontSize: 10, color: '#6D28D9', fontWeight: '700' },

  detailCard: {
    marginTop: 16,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: palette.white,
    shadowColor: palette.black,
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'baseline',
    paddingVertical: 6,
  },
  rowKey: { width: 110, fontSize: 14, color: '#4B5563' },
  rowSep: { marginHorizontal: 8, color: '#9CA3AF' },
  rowVal: { flex: 1, fontSize: 15, color: '#111827', fontWeight: '600' },
  note: { marginTop: 10, fontSize: 12, color: '#6B7280' },
});
