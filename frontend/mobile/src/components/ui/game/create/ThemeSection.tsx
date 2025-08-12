// ThemeCardGrid.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, LayoutChangeEvent } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { palette } from '@/constants/colors';

type IconName = React.ComponentProps<typeof Ionicons>['name'];

export const themeIconMap: Record<string, IconName> = {
  관광지: 'map-outline', // 지도/장소
  문화시설: 'color-palette-outline', // 문화/예술
  축제공연행사: 'musical-notes-outline', // 공연/축제
  여행코스: 'trail-sign-outline', // 여행 경로
  레포츠: 'bicycle-outline', // 레포츠/액티비티
  숙박: 'bed-outline', // 숙박
  쇼핑: 'bag-outline', // 쇼핑
  음식점: 'restaurant-outline', // 맛집
};

type Theme = { contentTypeId: number; contentTypeName: string };
type Props = {
  onLayout?: (e: any) => void;
  themes: Theme[]; // 8개 예상
  selectedIds: number[];
  onToggle: (id: number) => void;
  onFirstSelectNext?: () => void; // 첫 선택 시 다음 섹션 이동
  minHeight: number;
};

const COLS = 4;
const GAP = 12;

export default function ThemeCardGrid({
  onLayout,
  themes,
  selectedIds,
  onToggle,
  onFirstSelectNext,
  minHeight,
}: Props) {
  const [gridW, setGridW] = useState(0);

  const onWrapLayout = (e: LayoutChangeEvent) => setGridW(e.nativeEvent.layout.width);
  const size = gridW ? Math.floor((gridW - GAP * (COLS - 1)) / COLS) : 0; // 정사각 카드 한 변
  const rows = Math.ceil(themes.length / COLS);

  return (
    <View onLayout={onLayout} style={[styles.section, { minHeight }]}>
      <Text style={styles.title}>어떤 스타일의 여행을 원하세요?</Text>
      <Text style={styles.subtitle}>최소 1개 선택 • 복수 선택 가능</Text>

      <View style={styles.grid} onLayout={onWrapLayout}>
        {themes.map((t, i) => {
          const active = selectedIds.includes(t.contentTypeId);
          const col = i % COLS;
          const row = Math.floor(i / COLS);

          return (
            <Pressable
              key={t.contentTypeId}
              onPress={() => {
                const first = selectedIds.length === 0 && !active;
                onToggle(t.contentTypeId);
                if (first) onFirstSelectNext?.();
              }}
              style={({ pressed }) => [
                styles.card,
                { width: size, height: size },
                {
                  marginRight: col === COLS - 1 ? 0 : GAP,
                  marginBottom: row === rows - 1 ? 0 : GAP,
                },
                active && styles.cardActive,
                pressed && styles.cardPressed,
              ]}
            >
              <View style={styles.iconWrap}>
                <Ionicons
                  name={themeIconMap[t.contentTypeName] ?? 'sparkles-outline'}
                  size={24}
                  color={active ? '#2563EB' : '#64748B'}
                />
              </View>
              <Text numberOfLines={1} style={[styles.cardLabel, active && styles.cardLabelActive]}>
                {t.contentTypeName}
              </Text>
              {active && (
                <View style={styles.check}>
                  <Ionicons name="checkmark" size={14} color="#fff" />
                </View>
              )}
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: { paddingHorizontal: 20, paddingTop: 14 },
  title: { fontSize: 20, fontWeight: '700', color: palette.Neutral800 },
  subtitle: { marginTop: 14, fontSize: 15, color: palette.gray600 },

  grid: { marginTop: 16, flexDirection: 'row', flexWrap: 'wrap' },
  card: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  cardActive: { borderColor: '#93C5FD', backgroundColor: '#F0F7FF' },
  cardPressed: { transform: [{ scale: 0.98 }] },

  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  cardLabel: { fontSize: 12, color: '#111827' },
  cardLabelActive: { fontWeight: '700', color: '#0F172A' },

  check: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#2563EB',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
