import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type Props = {
  title: string;
  children: React.ReactNode;
  onLayout?: (e: any) => void;
  minHeight?: number;
};

export default function Section({ title, children, onLayout, minHeight }: Props) {
  return (
    <View onLayout={onLayout} style={[styles.section, minHeight ? { minHeight } : null]}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  section: { paddingHorizontal: 20, paddingTop: 14, paddingBottom: 28 },
  sectionTitle: { fontSize: 20, fontWeight: '700', color: '#0F172A', marginBottom: 14 },
});
