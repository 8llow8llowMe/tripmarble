import TextBox from '@/components/atom/TextBox';
import { palette } from '@/constants/colors';
import { useAppSelector } from '@/store/store';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

export default function HomeScreen() {
  const navigation = useNavigation();

  const { nickname } = useAppSelector((state) => state.userReducer);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <TextBox size={20} fontsName="Pretendard800" color={palette.gray800} style={styles.welcome}>
          안녕하세요. {nickname} 님
        </TextBox>
        <View style={styles.searchBoxWrapper}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.navigate('SearchScreen')}
            style={styles.searchBox}
          >
            <TextBox size={15} color={palette.gray300}>
              여행지를 검색해보세요.
            </TextBox>
          </TouchableOpacity>
        </View>
        <TextBox size={18} fontsName="Pretendard600" style={styles.sectionTitle}>
          추천 여행지
        </TextBox>
        <View style={styles.cardRow}>
          <View style={styles.card} />
          <View style={styles.card} />
        </View>
        <TextBox size={18} fontsName="Pretendard600" style={styles.sectionTitle}>
          내 기록
        </TextBox>
        <View style={styles.cardRow}>
          <View style={styles.card} />
          <View style={styles.card} />
        </View>
        <TextBox size={18} fontsName="Pretendard600" style={styles.sectionTitle}>
          랜덤 여행지 추천
        </TextBox>
        <View style={styles.largeCard}>{/* 여기에 랜덤 이미지 */}</View>
        <TextBox size={18} fontsName="Pretendard600" style={styles.sectionTitle}>
          오늘의 여행지
        </TextBox>
        <View style={styles.largeCard} />

        <TextBox size={18} fontsName="Pretendard600" style={styles.sectionTitle}>
          날씨 기반 여행지 추천
        </TextBox>
        <View style={styles.cardRow}>
          <View style={styles.card} />
          <View style={styles.card} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: palette.white },
  container: { padding: 16 },
  welcome: { marginBottom: 20 },
  searchBoxWrapper: {
    width: '100%',
    alignItems: 'center',
  },
  searchBox: {
    backgroundColor: palette.white,
    padding: 12,
    elevation: 3,
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 20,
    shadowColor: palette.black,
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    width: '100%',
  },
  sectionTitle: {
    marginTop: 24,
    marginBottom: 14,
  },
  cardRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  card: {
    flex: 1,
    height: 100,
    backgroundColor: '#eee',
    borderRadius: 10,
  },
  largeCard: {
    height: 150,
    backgroundColor: '#eee',
    borderRadius: 10,
    marginBottom: 12,
  },
});
