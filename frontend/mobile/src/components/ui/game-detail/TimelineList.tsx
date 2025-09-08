import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type Entry = {
  id: string;
  order: number;
  spotName: string;
  mission: string;
  status: 'SUCCESS' | 'PENDING' | 'FAIL' | 'GAME_END';
  arrivedAt?: string;
};

type Props = {
  entries: Entry[];
  formatDT: (iso?: string) => string;
};

export default function TimelineList({ entries, formatDT }: Props) {
  if (entries.length === 0) {
    return <Text style={styles.empty}>아직 이동 기록이 없어요</Text>;
  }
  return (
    <View style={styles.wrap}>
      {entries.map((it, i) => {
        const tint =
          it.status === 'SUCCESS'
            ? '#10B981'
            : it.status === 'PENDING'
              ? '#F59E0B'
              : it.status === 'FAIL'
                ? '#EF4444'
                : '#6B7280';
        const showLine = i < entries.length - 1;
        return (
          <View key={it.id} style={styles.row}>
            <View style={styles.left}>
              <View style={[styles.dot, { backgroundColor: tint }]} />
              {showLine && <View style={[styles.line, { borderColor: '#E5E7EB' }]} />}
            </View>
            <View style={styles.content}>
              <Text style={styles.title} numberOfLines={1}>{`${it.order}. ${it.spotName}`}</Text>
              <Text style={styles.meta} numberOfLines={2}>
                {it.mission}
                {it.arrivedAt ? ` · ${formatDT(it.arrivedAt)}` : ''}
              </Text>
            </View>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { paddingVertical: 12 },
  empty: { fontSize: 14, color: '#6B7280', textAlign: 'center', paddingVertical: 16 },
  row: { flexDirection: 'row', alignItems: 'flex-start', gap: 12, paddingVertical: 10 },
  left: { width: 20, alignItems: 'center' },
  dot: { width: 10, height: 10, borderRadius: 5, marginTop: 4 },
  line: { flex: 1, width: 1, borderLeftWidth: 1, marginTop: 4 },
  content: { flex: 1 },
  title: { fontSize: 15, fontWeight: '700', color: '#111827', marginBottom: 2 },
  meta: { fontSize: 13, color: '#6B7280' },
});
