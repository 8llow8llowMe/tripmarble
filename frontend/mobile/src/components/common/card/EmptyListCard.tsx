// src/components/common/EmptyListCard.tsx
import React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';

type Props = {
  title: string;
  description?: string;
  /** 섹션별 여백/레이아웃 커스터마이즈용 */
  style?: ViewStyle;
  titleStyle?: TextStyle;
  descStyle?: TextStyle;
};

export default function EmptyListCard({ title, description, style, titleStyle, descStyle }: Props) {
  return (
    <View style={[styles.card, style]}>
      <Text style={[styles.title, titleStyle]}>{title}</Text>
      {description ? <Text style={[styles.desc, descStyle]}>{description}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    marginBottom: 16,
    paddingVertical: 28,
    paddingHorizontal: 20,
    borderRadius: 16,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',

    // 라이트 그림자/보더(endedEmptyCard와 동일 톤)
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#eef2f7',
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0f172a', // slate-900
  },
  desc: {
    marginTop: 6,
    fontSize: 13,
    color: '#64748b', // slate-500
    textAlign: 'center',
  },
});
