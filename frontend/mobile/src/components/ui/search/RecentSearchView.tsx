import TextBox from '@/components/atom/TextBox';
import SearchNoResult from '@/components/common/empty/SearchNoResult';
import RecentSearchItem from '@/components/item/RecentSearchItem';
import { palette } from '@/constants/colors';
import { removeRecentQuery, resetRecentQueries } from '@/store/redux/search/recentQuery';
import { useAppDispatch, useAppSelector } from '@/store/store';

import React from 'react';
import { View, StyleSheet, Pressable, FlatList } from 'react-native';

interface RecentSearchViewProps {
  onSearch: (text: string) => void;
}
const RecentSearchView = ({ onSearch }: RecentSearchViewProps) => {
  const dispatch = useAppDispatch();
  const recentQueryList = useAppSelector((state) => state.recentQueryReducer.queries);

  const handleAllRemove = () => {
    dispatch(resetRecentQueries());
  };

  const handleRemove = (text: string) => {
    dispatch(removeRecentQuery(text));
  };

  return (
    <View style={styles.recentSearchContainer}>
      <View style={styles.recentSearchHeader}>
        <TextBox size={13} color={palette.gray600}>
          최근 검색어
        </TextBox>
        <Pressable onPress={handleAllRemove}>
          <TextBox size={13} color={palette.gray400}>
            지우기
          </TextBox>
        </Pressable>
      </View>

      {/* 최근 검색 항목 */}
      <FlatList
        data={recentQueryList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <RecentSearchItem
            searchTerm={item.query}
            time={item.date}
            handleRemove={handleRemove}
            onSearch={onSearch}
          />
        )}
        ListEmptyComponent={<SearchNoResult text="최근 검색어가 없습니다." />}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flex: recentQueryList.length === 0 ? 1 : undefined,
          paddingBottom: 24,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  recentSearchContainer: {
    flex: 1,
    gap: 16,
  },
  recentSearchHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  separator: {
    height: 16,
  },
});

export default RecentSearchView;
