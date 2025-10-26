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

const DUMMY_RECENT = [
  { name: '부산', representativeRegionId: '5', date: '10.31' },
  { name: '제주도', representativeRegionId: '10', date: '10.29' },
  { name: '강릉', representativeRegionId: '6', date: '10.29' },
  { name: '경주', representativeRegionId: '8', date: '10.29' },
];

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

  const [searchText, setSearchText] = useState('');
  const debounced = useDebounce(searchText.trim(), 200);

  const [recent, setRecent] = useState(DUMMY_RECENT);

  const { data, isLoading } = useSearchRepresentativeRegionQuery({ keyword: debounced });
  const results = data?.dataBody ?? [];

  const handleClearRecent = () => setRecent([]);
  const handleRemoveRecent = (name: string) =>
    setRecent((prev) => prev.filter((item) => item.name !== name));

  // 대표여행지 스크린으로 이동
  const goToSpotListScreen = (representativeRegionId: string) => {
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
            placeholder="지역/도시를 검색하세요."
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
                    onPress={() => goToSpotListScreen(item.representativeRegionId)}
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
          <View style={styles.recentContainer}>
            <View style={styles.recentHeader}>
              <Text style={styles.recentTitle}>최근 검색어</Text>
              <TouchableOpacity onPress={handleClearRecent}>
                <Text style={styles.clearBtn}>지우기</Text>
              </TouchableOpacity>
            </View>

            {recent.length === 0 ? (
              <Text style={styles.emptyRecent}>최근 검색어가 없습니다.</Text>
            ) : (
              recent.map((item) => (
                <TouchableOpacity
                  key={item.name}
                  style={styles.recentItem}
                  activeOpacity={0.7}
                  onPress={() => goToSpotListScreen(item.representativeRegionId)}
                >
                  <Ionicons
                    name="time-outline"
                    size={18}
                    color="#b0b0b0"
                    style={{ marginRight: 8 }}
                  />
                  <Text style={styles.keyword}>{item.name}</Text>
                  <Text style={styles.date}>{item.date}</Text>
                  <TouchableOpacity onPress={() => handleRemoveRecent(item.name)}>
                    <Ionicons name="close" size={18} color="#aaa" />
                  </TouchableOpacity>
                </TouchableOpacity>
              ))
            )}
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

  // 최근 검색
  recentContainer: { marginTop: 24 },
  recentHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  recentTitle: { fontWeight: 'bold', fontSize: 14, color: '#333' },
  clearBtn: { fontSize: 13, color: '#888' },
  recentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#f0f0f0',
  },
  keyword: { fontSize: 15, flex: 1, color: '#222' },
  date: { color: '#b0b0b0', fontSize: 12, marginRight: 8 },
  emptyRecent: { color: '#bbb', padding: 16, textAlign: 'center' },

  // 결과 리스트
  resultItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12 },
  resultName: { fontSize: 15, color: '#222' },
  separator: { height: StyleSheet.hairlineWidth, backgroundColor: '#f0f0f0' },
});
