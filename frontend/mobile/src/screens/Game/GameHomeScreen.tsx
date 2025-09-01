import React, { useCallback } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import ongoingImage from '@images/places/gyeongju.png';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { palette } from '@/constants/colors';
import { AppNavigatorNavigationProp } from '@/types/navigation/screen';
import { useMyGameLists } from '@/hooks/game/useMyGameList';
import { LinearGradient } from 'expo-linear-gradient';
import { fetchGameStart } from '@/hooks/game/useGameStart';
import CreateGameBanner from '@/components/common/banner/CreateGameBanner';
import { SectionHeader } from '@/components/layout/header/SectionHeader';
import GameSummaryBanner from '@/components/common/banner/GameSummaryBanner';

export default function GameHomeScreen() {
  const navigation = useNavigation<AppNavigatorNavigationProp>();

  const { waiting, ongoing, ended } = useMyGameLists();

  // 게임 생성 스크린으로 이동
  const goToGameCreateScreen = () => {
    navigation.navigate('CreateGameScreen');
  };

  // 진행중인 게임 스크린으로 이동
  const goToGameOngoingScreen = async (tripGameId: string, isWaiting: boolean = false) => {
    if (isWaiting) {
      await fetchGameStart(tripGameId);
    }
    navigation.navigate('GamePlayStackNavigator', {
      screen: 'OngoingGameScreen',
      params: { tripGameId },
    });
  };

  // 종료된 게임 스크린으로 이동
  const goToGameEndedScreen = (tripGameId: string) => {
    navigation.navigate('GamePlayStackNavigator', {
      screen: 'EndedGameScreen',
      params: { tripGameId },
    });
  };

  useFocusEffect(
    useCallback(() => {
      waiting.refetch();
      ongoing.refetch();
      ended.refetch();
      return undefined;
    }, [waiting.refetch, ongoing.refetch, ended.refetch]),
  );

  // 게임 목록 스크린으로 이동
  const goToGameListScreen = (status?: 'WAITING' | 'ONGOING' | 'ENDED') => {
    navigation.navigate('GamePlayStackNavigator', {
      screen: 'GameListScreen',
      params: status ? { status } : {},
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.scroll}>
        <GameSummaryBanner counts={{ ongoing: 1, waiting: 0, ended: 2 }} />

        {/* 진행중인 게임 목록 */}
        <View style={{ marginVertical: 22 }}>
          <SectionHeader title="진행중인 게임" />
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.ongoingRow}
            style={{ marginLeft: 16 }}
          >
            {(ongoing.data?.data.dataBody.contents ?? []).map((game) => (
              <TouchableOpacity
                key={game.tripGameId}
                onPress={() => goToGameOngoingScreen(game.tripGameId)}
                activeOpacity={0.8}
                style={styles.ongoingCardHorizontal}
              >
                <ImageBackground
                  source={
                    game.representativeRegionImageUrl
                      ? { uri: game.representativeRegionImageUrl }
                      : ongoingImage
                  }
                  style={styles.ongoingImage}
                  resizeMode="cover"
                  imageStyle={{ borderRadius: 16 }}
                >
                  <LinearGradient
                    colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.4)']}
                    style={StyleSheet.absoluteFill}
                  />
                  <View style={styles.ongoingFooter}>
                    <Text style={styles.ongoingText} numberOfLines={1}>
                      {game.title || game.representativeRegionName}
                    </Text>
                  </View>
                </ImageBackground>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* 게임 생성 배너 */}
        <CreateGameBanner onPress={goToGameCreateScreen} />

        {/* 시작전 게임 목록 */}
        <View style={{ marginTop: 22 }}>
          <SectionHeader
            title="시작전 게임"
            moreTitle="전체보기"
            onPressMore={() => goToGameListScreen('WAITING')}
          />
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.ongoingRow}
            style={{ marginLeft: 16 }}
          >
            {(waiting.data?.data.dataBody.contents ?? []).map((game) => (
              <TouchableOpacity
                key={game.tripGameId}
                onPress={() => goToGameOngoingScreen(game.tripGameId, true)}
                activeOpacity={0.8}
                style={styles.waitingCardHorizontal}
              >
                <ImageBackground
                  source={
                    game.representativeRegionImageUrl
                      ? { uri: game.representativeRegionImageUrl }
                      : ongoingImage
                  }
                  style={styles.waitingImage}
                  resizeMode="cover"
                  imageStyle={{ borderRadius: 16 }}
                >
                  <LinearGradient
                    colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.4)']}
                    style={StyleSheet.absoluteFill}
                  />
                  <View style={styles.ongoingFooter}>
                    <Text style={styles.ongoingText} numberOfLines={1}>
                      {game.title || game.representativeRegionName}
                    </Text>
                  </View>
                </ImageBackground>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* 종료된 게임 목록 */}
        <View style={{ marginTop: 22 }}>
          <SectionHeader
            title="종료된 게임"
            moreTitle="전체보기"
            onPressMore={() => goToGameListScreen('ENDED')}
          />

          {(() => {
            if (ended.data?.data.dataBody === undefined) {
              return (
                <View style={[styles.endedCard, { justifyContent: 'center' }]}>
                  <View style={[styles.endedInfo, { alignItems: 'center' }]}>
                    <Text style={styles.endedTitle}>종료된 게임이 없습니다</Text>
                    <Text style={styles.endedDesc}>완료된 게임이 나타나면 이곳에 표시돼요</Text>
                  </View>
                </View>
              );
            }
            const list = waiting.data?.data.dataBody.contents ?? [];
            return list.map((game) => {
              const date = new Date(game.endedAt || game.startedAt);
              const month = date.toLocaleString('en-US', { month: 'short' });
              const day = String(date.getDate()).padStart(2, '0');
              return (
                <TouchableOpacity
                  key={game.tripGameId}
                  activeOpacity={0.8}
                  onPress={() => goToGameEndedScreen(game.tripGameId)}
                  style={{ marginHorizontal: 16 }}
                >
                  <View style={styles.endedCard}>
                    <View style={styles.endedDateBox}>
                      <Text style={styles.endedDateMonth}>{month}</Text>
                      <Text style={styles.endedDateDay}>{day}</Text>
                    </View>
                    <View style={styles.endedInfo}>
                      <Text style={styles.endedTitle} numberOfLines={1}>
                        {game.title || game.representativeRegionName}
                      </Text>
                      <Text style={styles.endedDesc}>종료된 게임</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            });
          })()}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: palette.white },
  scroll: { paddingBottom: 32 },

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

  waitingImage: {
    width: 120,
    height: 120,
  },
  ongoingImage: {
    width: '100%',
    height: 240,
  },
  ongoingFooter: {
    padding: 16,
    flex: 1,
    justifyContent: 'flex-end',
  },
  ongoingText: {
    fontSize: 18,
    color: palette.white,
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
    // backgroundColor: '#F5F6F8',
    borderRadius: 12,
    overflow: 'hidden',
    marginRight: 12,
    // borderWidth: 2,
    // borderColor: '#BCC2C8',
  },
  waitingCardHorizontal: {
    width: 120,
    borderRadius: 12,
    overflow: 'hidden',
    marginRight: 6,
  },
});
