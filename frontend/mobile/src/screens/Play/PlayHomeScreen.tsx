import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import ongoingImage from '@images/places/gyeongju.png';
import { useNavigation } from '@react-navigation/native';
import { palette } from '@/constants/colors';
import { AppNavigatorNavigationProp } from '@/types/navigation/screen';
import useMyGameListQuery from '@/hooks/game/useMyGameList';
// 종료된 게임 목록 데이터 (추후 API로 대체 가능)
const finishedGames = [
  { id: 2, title: '부산여행', month: 'May', day: '05' },
  { id: 3, title: '경주여행', month: 'Apr', day: '12' },
];

export default function PlayHomeScreen() {
  const navigation = useNavigation<AppNavigatorNavigationProp>();
  const { myGameList } = useMyGameListQuery();
  // 게임 만들기 버튼 클릭 시
  const handleCreateGamePress = () => {
    navigation.navigate('CreateGameScreen');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>진행중인 게임</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.ongoingRow}
        >
          {(myGameList?.data.dataBody.contents ?? []).map((game) => (
            <TouchableOpacity
              key={game.tripGameId}
              onPress={() =>
                navigation.navigate('OngoingGameScreen', {
                  title: game.title || game.representativeRegionName,
                  id: game.tripGameId,
                })
              }
              activeOpacity={0.8}
              style={styles.ongoingCardHorizontal}
            >
              <Image
                source={
                  game.representativeRegionImageUrl
                    ? { uri: game.representativeRegionImageUrl }
                    : ongoingImage
                }
                style={styles.ongoingImage}
                resizeMode="cover"
              />
              <View style={styles.ongoingFooter}>
                <Text style={styles.ongoingText} numberOfLines={1}>
                  {game.title || game.representativeRegionName}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <TouchableOpacity
          style={styles.createGameButton}
          onPress={handleCreateGamePress}
          activeOpacity={0.8}
        >
          <Text style={styles.createGameButtonText}>게임 만들기</Text>
        </TouchableOpacity>

        <Text style={styles.title}>종료된 게임</Text>
        {/* 종료된 게임 목록 */}
        {finishedGames.map((game) => (
          <TouchableOpacity key={game.id} activeOpacity={0.8}>
            <View style={styles.endedCard}>
              <View style={styles.endedDateBox}>
                <Text style={styles.endedDateMonth}>{game.month}</Text>
                <Text style={styles.endedDateDay}>{game.day}</Text>
              </View>
              <View style={styles.endedInfo}>
                <Text style={styles.endedTitle}>{game.title}</Text>
                <Text style={styles.endedDesc}>종료된 게임</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#fff' },
  container: { padding: 16 },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginVertical: 12,
  },
  ongoingCard: {
    backgroundColor: '#F5F6F8',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 32,
    borderWidth: 2,
    borderColor: '#BCC2C8',
  },
  ongoingImage: {
    width: '100%',
    height: 240,
  },
  ongoingFooter: {
    backgroundColor: '#DBDBDB',
    padding: 12,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  ongoingText: {
    fontSize: 18,
    color: '#222',
  },
  createGameButton: {
    backgroundColor: palette.mainColor,
    borderRadius: 8,
    paddingVertical: 12,
    marginVertical: 20,
    alignItems: 'center',
  },
  createGameButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  endedCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F1F2',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#BCC2C8',
    marginBottom: 16,
    padding: 12,
  },
  endedDateBox: {
    width: 90,
    backgroundColor: '#E0E0E0',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
    paddingVertical: 8,
  },
  endedDateMonth: {
    fontSize: 28,
    fontWeight: '700',
    color: '#888',
    marginBottom: 2,
  },
  endedDateDay: {
    fontSize: 38,
    fontWeight: '700',
    color: '#555',
    marginTop: -5,
  },
  endedInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  endedTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#222',
  },
  endedDesc: {
    fontSize: 16,
    color: '#222',
    marginTop: 4,
  },
  ongoingRow: {
    paddingRight: 8,
    gap: 12,
  },
  ongoingCardHorizontal: {
    width: 260,
    backgroundColor: '#F5F6F8',
    borderRadius: 12,
    overflow: 'hidden',
    marginRight: 12,
    borderWidth: 2,
    borderColor: '#BCC2C8',
  },
});
