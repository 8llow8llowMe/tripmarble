import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { palette } from '@/constants/colors';
import TextBox from '@/components/atom/TextBox';

interface RecentSearchItemProps {
  searchTerm: string;
  time: string;
  handleRemove: (text: string) => void;
  onSearch: (text: string) => void;
}

const RecentSearchItem = ({ searchTerm, time, handleRemove, onSearch }: RecentSearchItemProps) => {
  return (
    <View style={styles.searchItem}>
      <Pressable onPress={() => onSearch(searchTerm)}>
        <View style={styles.searchTermContainer}>
          <View style={styles.iconContainer}>
            <Ionicons name="time-outline" size={18} color="#b0b0b0" style={{ marginRight: 8 }} />
          </View>
          <TextBox size={14}>{searchTerm}</TextBox>
        </View>
      </Pressable>
      <View style={styles.timeContainer}>
        <TextBox size={13} color={palette.gray400}>
          {time}
        </TextBox>
        <Pressable onPress={() => handleRemove(searchTerm)}>
          <Ionicons name="close" size={16} color="#aaa" />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  searchItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  searchTermContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconContainer: {
    width: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: palette.gray100,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
});

export default RecentSearchItem;
