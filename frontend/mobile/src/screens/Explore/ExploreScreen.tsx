import React from 'react';
import {
  View,
  ScrollView,
  Text,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Platform,
  Dimensions,
} from 'react-native';
import jejuImage from '@images/place/jeju.png';
import { useNavigation } from '@react-navigation/native';

const bgHeight = Dimensions.get('window').height * 0.5;
const searchBoxHeight = 56; // padding+borderRadius 감안, 대략 값(조정 가능)

export default function ExploreScreen() {
  const navigation = useNavigation();

  const popularPlaces = ['부산', '제주도', '강릉', '경주'];

  return (
    <View style={{ flex: 1 }}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={{ position: 'relative' }}>
          <Image source={jejuImage} style={styles.backgroundImage} />
          <View style={styles.overlay} />
        </View>

        {/* 실제로는 TextInput 대신 TouchableOpacity로 가짜 인풋 */}
        <View style={[styles.searchBoxWrapper, { top: bgHeight - searchBoxHeight / 2 }]}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.navigate('SearchScreen')}
            style={styles.searchBox}
          >
            <Text style={{ color: '#888', fontSize: 17 }}>🔍 여행지 검색</Text>
          </TouchableOpacity>
        </View>

        <Text style={[styles.sectionTitle, { marginTop: searchBoxHeight / 2 + 24 }]}>
          지금 인기있는 여행지
        </Text>
        <View style={styles.tagRow}>
          {popularPlaces.map((place, index) => (
            <TouchableOpacity key={index} style={styles.tag}>
              <Text>{place}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.sectionTitle}>현재 진행중인 트립마블</Text>
        <View style={styles.card} />
        <View style={styles.card} />

        <Text style={styles.sectionTitle}>어떤 것을 넣으면 좋을까</Text>
        <View style={styles.card} />
        <View style={styles.card} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: 20,
  },
  backgroundImage: {
    width: '100%',
    height: bgHeight,
    resizeMode: 'cover',
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    // backgroundColor: "rgba(0,0,0,0.3)",
  },
  searchBoxWrapper: {
    width: '100%',
    paddingHorizontal: 16,
    position: 'absolute',
    zIndex: 2,
    alignItems: 'center',
  },
  searchBox: {
    backgroundColor: 'white',
    padding: 12,
    elevation: 3,
    borderRadius: 30,
    paddingVertical: 18,
    paddingHorizontal: 22,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    width: '96%',
    fontSize: 17,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 24,
    marginBottom: 8,
    paddingHorizontal: 16,
  },
  tagRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 10,
  },
  tag: {
    backgroundColor: '#eee',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
  },
  card: {
    height: 120,
    backgroundColor: '#eee',
    borderRadius: 10,
    marginHorizontal: 16,
    marginBottom: 12,
  },
});
