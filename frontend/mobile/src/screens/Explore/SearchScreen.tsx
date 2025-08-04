import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Keyboard,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // 돋보기, 뒤로가기 아이콘
import { useNavigation } from '@react-navigation/native';

const DUMMY_RECENT = [
  { keyword: '경주', date: '10.31' },
  { keyword: '창덕궁', date: '10.29' },
  { keyword: '서평', date: '10.29' },
];

export default function SearchScreen() {
  const navigation = useNavigation();

  const [searchText, setSearchText] = useState('');
  const [recent, setRecent] = useState(DUMMY_RECENT);

  const handleClearRecent = () => setRecent([]);
  const handleRemoveRecent = (keyword: string) =>
    setRecent((prev) => prev.filter((item) => item.keyword !== keyword));

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* 검색바 */}
        <View style={styles.searchBar}>
          {/* (왼쪽: 유저 아이콘 자리, 원하는 아이콘으로 변경) */}
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={28} color="#555" />
          </TouchableOpacity>
          {/* 입력창 */}
          <TextInput
            style={styles.input}
            placeholder="검색어를 입력하세요..."
            value={searchText}
            onChangeText={setSearchText}
            returnKeyType="search"
            autoFocus
          />
          {/* (오른쪽: 검색 아이콘) */}
          <TouchableOpacity>
            <Ionicons name="search" size={24} color="#888" />
          </TouchableOpacity>
        </View>

        {/* 최근 검색어 섹션 */}
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
              <View style={styles.recentItem} key={item.keyword}>
                <Ionicons
                  name="time-outline"
                  size={18}
                  color="#b0b0b0"
                  style={{ marginRight: 8 }}
                />
                <Text style={styles.keyword}>{item.keyword}</Text>
                <Text style={styles.date}>{item.date}</Text>
                <TouchableOpacity onPress={() => handleRemoveRecent(item.keyword)}>
                  <Ionicons name="close" size={18} color="#aaa" />
                </TouchableOpacity>
              </View>
            ))
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#fff' },
  container: { flex: 1, backgroundColor: '#fff', paddingHorizontal: 20, paddingTop: 0 },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#3986FF',
    paddingVertical: 8,
  },
  input: { flex: 1, marginHorizontal: 10, fontSize: 16, paddingVertical: 0 },
  recentContainer: { marginTop: 24 },
  recentHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  recentTitle: { fontWeight: 'bold', fontSize: 14, color: '#333' },
  clearBtn: { fontSize: 13, color: '#888' },
  recentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: '#f0f0f0',
  },
  keyword: { fontSize: 15, flex: 1, color: '#222' },
  date: { color: '#b0b0b0', fontSize: 12, marginRight: 8 },
  emptyRecent: { color: '#bbb', padding: 16, textAlign: 'center' },
});
