import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import dayjs from 'dayjs';
import { Calendar } from 'react-native-calendars';

import { palette } from '@/constants/colors';
import NextFloatingButton from './NextFloatingButton';

// onDayPress의 첫 번째 파라미터 타입 추출
type DayPressArg = Parameters<NonNullable<React.ComponentProps<typeof Calendar>['onDayPress']>>[0];

// markedDates prop 타입 추출
type MarkedDatesProp = NonNullable<React.ComponentProps<typeof Calendar>['markedDates']>;

type Props = {
  onLayout?: (e: any) => void;
  startedAt: string | null; // 'YYYY-MM-DD'
  endedAt: string | null; // 'YYYY-MM-DD'
  onSelectRange: (start: string, end: string) => void;
  onNext?: () => void;
  minHeight: number;
};

export default function DateSection({
  onLayout,
  startedAt,
  endedAt,
  onSelectRange,
  onNext,
  minHeight,
}: Props) {
  // 내부 미리보기 상태 (확정은 onSelectRange로 부모에 전달)
  const [draftStart, setDraftStart] = useState<string | null>(startedAt);
  const [draftEnd, setDraftEnd] = useState<string | null>(endedAt);

  const handleDayPress = (day: DayPressArg) => {
    const d = day.dateString; // 'YYYY-MM-DD'

    // 1) 시작일이 비어있거나, 기존 범위가 이미 완성된 상태면 새로 시작
    if (!draftStart || (draftStart && draftEnd)) {
      setDraftStart(d);
      setDraftEnd(null);
      return;
    }

    // 2) 시작일만 있고 종료일은 없는 상태
    if (dayjs(d).isBefore(dayjs(draftStart))) {
      // 시작일보다 과거를 누르면 시작일을 갱신
      setDraftStart(d);
      return;
    }

    if (d === draftStart) {
      // 같은 날짜를 다시 누르면 단일 선택 유지
      setDraftEnd(null);
      return;
    }

    // 3) 정상 범위 확정
    setDraftEnd(d);
    onSelectRange(draftStart, d); // 부모 상태 갱신
    // onNext?.();
  };

  // 기간 마킹
  const marked: MarkedDatesProp = useMemo(() => {
    const marks: any = {};
    const s = draftStart;
    const e = draftEnd;

    if (s && !e) {
      // 시작일만 선택된 상태
      marks[s] = {
        startingDay: true,
        endingDay: true,
        color: '#4BA1FD',
        textColor: palette.white,
      };
      return marks;
    }

    if (s && e) {
      const from = dayjs(s);
      const to = dayjs(e);
      const days = to.diff(from, 'day');

      for (let i = 0; i <= days; i++) {
        const cur = from.add(i, 'day').format('YYYY-MM-DD');
        marks[cur] = {
          startingDay: i === 0,
          endingDay: i === days,
          color: i === 0 || i === days ? '#4BA1FD' : '#CFE8FF',
          textColor: i === 0 || i === days ? palette.white : '#0F172A',
        };
      }
    }
    return marks;
  }, [draftStart, draftEnd]);

  return (
    <View onLayout={onLayout} style={[styles.section, { minHeight }]}>
      <Text style={styles.title}>여행 날짜를 선택해주세요</Text>
      <Text style={styles.subtitle}>시작일을 탭하고, 종료일을 이어서 선택해요</Text>

      <Calendar
        enableSwipeMonths // 월 이동 스와이프
        // 마킹
        markingType="period"
        markedDates={marked}
        onDayPress={handleDayPress}
        initialDate={startedAt ?? dayjs().format('YYYY-MM-DD')} // 초기 노출 월
        theme={{
          todayTextColor: '#2563EB',
          selectedDayBackgroundColor: '#4BA1FD',
          selectedDayTextColor: palette.white,
          dayTextColor: palette.Neutral800,
          textDisabledColor: '#9CA3AF',
          monthTextColor: palette.Neutral800,
          textMonthFontWeight: '700',
          arrowColor: palette.Neutral800,
        }}
        style={styles.calendar}
      />

      {/* 선택 요약 */}
      <Text style={styles.helper}>
        {draftStart && draftEnd
          ? `선택됨: ${draftStart} ~ ${draftEnd}`
          : draftStart
            ? `${draftStart}에서 종료일을 선택하세요`
            : '시작일을 선택하세요'}
      </Text>

      <NextFloatingButton
        visible={!!startedAt && !!endedAt}
        onPress={() => onNext?.()}
        label="여행 날짜 선택 완료, 다음 섹션으로 이동"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  section: { paddingHorizontal: 20, paddingTop: 14 },
  title: { fontSize: 20, fontWeight: '700', color: palette.Neutral800 },
  subtitle: { marginTop: 10, fontSize: 13, color: palette.gray600 },

  calendar: { marginTop: 16, borderRadius: 12, overflow: 'hidden' },
  helper: { marginTop: 10, fontSize: 13, color: palette.gray600 },
});
