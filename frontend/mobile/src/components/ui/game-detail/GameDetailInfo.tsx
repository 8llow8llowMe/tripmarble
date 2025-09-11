import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
// import { palette } from '@/constants/colors';

type Props = {
  turnOrder?: number;
  startedAt?: string;
  endedAt?: string;
  themes?: string[];
  difficulty?: string;
};

export default function GameDetailInfo({
  turnOrder,
  startedAt,
  endedAt,
  themes = [],
  difficulty,
}: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.infoRow}>
        <Text style={styles.turnText}>{turnOrder ? `${turnOrder}번째 턴` : '-'}</Text>
        <Text style={styles.dateText}>
          {startedAt && endedAt ? `${startedAt} ~ ${endedAt}` : '-'}
        </Text>
      </View>
      {(themes.length > 0 || !!difficulty) && (
        <View style={styles.metaRow}>
          <Text style={styles.themesText} numberOfLines={1}>
            {themes.join(' · ')}
          </Text>
          {!!difficulty && (
            <View style={styles.difficultyPill}>
              <Text style={styles.difficultyText}>{difficulty}</Text>
            </View>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  turnText: { fontSize: 16, fontWeight: '700', color: '#111827' },
  dateText: { fontSize: 14, color: '#6B7280', fontWeight: '600' },
  metaRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 8 },
  themesText: { flex: 1, fontSize: 12, color: '#475569' },
  difficultyPill: {
    backgroundColor: '#EEF2FF',
    borderColor: '#CBD5E1',
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  difficultyText: { fontSize: 12, fontWeight: '700', color: '#374151' },
});
