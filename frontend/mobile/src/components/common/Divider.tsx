import { palette } from '@/constants/colors';

import React from 'react';
import { View, StyleSheet } from 'react-native';

interface DividerProps {
  color?: string;
}

const Divider = ({ color }: DividerProps) => {
  return (
    <View
      style={[
        styles.divider,
        {
          borderBottomColor: color ?? palette.gray150,
        },
      ]}
    ></View>
  );
};

const styles = StyleSheet.create({
  divider: {
    borderBottomWidth: 1,
  },
});

export default Divider;
