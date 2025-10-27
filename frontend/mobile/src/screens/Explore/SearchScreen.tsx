import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Keyboard,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { AppNavigatorNavigationProp } from '@/types/navigation/screen';
import { palette } from '@/constants/colors';
import SafeAreaScreen from '@/components/layout/SafeAreaScreen';
import useSearchRepresentativeRegionQuery from '@/hooks/trip/useSearchRepresentativeRegion';
import RecentSearchView from '@/components/ui/search/RecentSearchView';
import { useAppDispatch } from '@/store/store';
import { addRecentQuery } from '@/store/redux/search/recentQuery';

function useDebounce(value: string, delay = 200) {
  const [v, setV] = React.useState(value);
  React.useEffect(() => {
    const t = setTimeout(() => setV(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return v;
}

export default function SearchScreen() {
  const navigation = useNavigation<AppNavigatorNavigationProp>();
  const dispatch = useAppDispatch();

  const [searchText, setSearchText] = useState('');
  const debounced = useDebounce(searchText.trim(), 200);

  const { data, isLoading } = useSearchRepresentativeRegionQuery({ keyword: debounced });
  const results = data?.dataBody ?? [];

  const handleRecentSearch = (text: string) => {
    setSearchText(text); // 입력창만 바꿔주면 됨
  };

  const handleSearch = (representativeRegionId: string, representativeRegionName: string) => {
    dispatch(addRecentQuery(representativeRegionName));

    // 대표여행지 스크린으로 이동
    navigation.navigate('SpotStackNavigator', {
      screen: 'SpotListScreen',
      params: { representativeRegionId },
    });
  };

  return (
    <SafeAreaScreen>
      <View style={styles.container}>
        {/* 검색바 */}
        <View style={styles.searchBar}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#555" />
          </TouchableOpacity>

          <TextInput
            style={styles.input}
            placeholder="여행지를 검색해보세요."
            value={searchText}
            onChangeText={setSearchText}
            returnKeyType="search"
            autoFocus
          />

          <TouchableOpacity onPress={() => Keyboard.dismiss()}>
            <Ionicons name="search" size={24} color="#888" />
          </TouchableOpacity>
        </View>

        {/* 검색 결과 */}
        {debounced.length > 0 ? (
          <View style={{ flex: 1, marginTop: 16 }}>
            {isLoading ? (
              <Text style={{ color: '#888', padding: 12 }}>검색 중…</Text>
            ) : results.length === 0 ? (
              <Text style={{ color: '#888', padding: 12 }}>검색 결과가 없습니다.</Text>
            ) : (
              <FlatList
                data={results}
                keyExtractor={(item) => item.representativeRegionId}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.resultItem}
                    onPress={() =>
                      handleSearch(item.representativeRegionId, item.representativeRegionName)
                    }
                  >
                    <Ionicons
                      name="location-outline"
                      size={18}
                      color="#3986FF"
                      style={{ marginRight: 8 }}
                    />
                    <Text style={styles.resultName}>{item.representativeRegionName}</Text>
                  </TouchableOpacity>
                )}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
              />
            )}
          </View>
        ) : (
          // 최근 검색어
          <View style={{ flex: 1, marginTop: 24 }}>
            <RecentSearchView onSearch={handleRecentSearch} />
          </View>
        )}
      </View>
    </SafeAreaScreen>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: palette.white, paddingHorizontal: 16 },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#3986FF',
    paddingVertical: 8,
    paddingTop: 4,
  },
  input: { flex: 1, marginHorizontal: 10, fontSize: 16, paddingVertical: 0 },

  // 결과 리스트
  resultItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12 },
  resultName: { fontSize: 15, color: '#222' },
  separator: { height: StyleSheet.hairlineWidth, backgroundColor: '#f0f0f0' },
});
