import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { palette } from '@/constants/colors';

type Tab = 'info' | 'mission';

type Props = {
  active: Tab;
  onChange: (next: Tab) => void;
  allowMission?: boolean;
};

export default function GameTabs({ active, onChange, allowMission = true }: Props) {
  return (
    <View style={styles.topTabs}>
      <TouchableOpacity
        style={[styles.topTab, active === 'info' && styles.topTabActive]}
        onPress={() => onChange('info')}
      >
        <Text style={[styles.topTabText, active === 'info' && styles.topTabTextActive]}>정보</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.topTab,
          active === 'mission' && styles.topTabActive,
          !allowMission && styles.topTabDisabled,
        ]}
        onPress={() => allowMission && onChange('mission')}
        disabled={!allowMission}
      >
        <Text
          style={[
            styles.topTabText,
            active === 'mission' && styles.topTabTextActive,
            !allowMission && styles.topTabTextDisabled,
          ]}
        >
          미션 인증
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  topTabs: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
    paddingHorizontal: 20,
  },
  topTab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: palette.gray100,
  },
  topTabActive: { backgroundColor: palette.mainColor },
  topTabDisabled: { opacity: 0.5 },
  topTabText: { fontWeight: '700', color: palette.black },
  topTabTextActive: { color: palette.white },
  topTabTextDisabled: { color: palette.gray500 },
});
