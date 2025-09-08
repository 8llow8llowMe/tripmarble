import React, { useCallback } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  Image,
} from 'react-native';
import ongoingImage from '@images/places/gyeongju.png';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { palette } from '@/constants/colors';
import { AppNavigatorNavigationProp } from '@/types/navigation/screen';
import { LinearGradient } from 'expo-linear-gradient';
// hooks
import { fetchGameStart } from '@/hooks/game/useGameStart';
import { useGameLists } from '@/hooks/game/useGameList';
// components
import CreateGameBanner from '@/components/common/banner/CreateGameBanner';
import { SectionHeader } from '@/components/layout/header/SectionHeader';
import EmptyListCard from '@/components/common/card/EmptyListCard';

export default function GameHomeScreen() {
  const navigation = useNavigation<AppNavigatorNavigationProp>();

  const { waiting, ongoing, ended } = useGameLists();

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
      screen: 'OngoingGameScreen',
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

  const formatYmd = (dateStr?: string) => {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    const y = String(d.getFullYear()).slice(2);
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}.${m}.${day}`;
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* <ScrollView style={styles.scroll}> */}
      <ScrollView>
        {/* <GameSummaryBanner
          counts={{
            ongoing: ongoing.data?.data.dataBody.contents.length,
            waiting: waiting.data?.data.dataBody.contents.length,
            ended: ended.data?.data.dataBody.contents.length,
          }}
        /> */}

        {/* 진행중인 게임 목록 */}
        <View style={{ marginBottom: 22 }}>
          <SectionHeader title="진행중인 게임" />

          {(ongoing.data?.data.dataBody.contents?.length ?? 0) === 0 ? (
            <EmptyListCard
              title="진행중인 게임이 없어요"
              description="새 게임을 만들어 모험을 시작해보세요!"
            />
          ) : (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.ongoingRow}
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
                    {/* 하단 배지 박스 */}
                    <View style={styles.cardBadge}>
                      {/* 상단: 제목 + 지역(별 자리) */}
                      <View style={styles.badgeTopRow}>
                        <Text style={styles.cardTitle} numberOfLines={1}>
                          {game.title || game.representativeRegionName}
                        </Text>
                        <View style={styles.regionPill}>
                          <Text style={styles.regionText} numberOfLines={1}>
                            {game.representativeRegionName}
                          </Text>
                        </View>
                      </View>

                      {/* 하단: 테마 · 날짜 */}
                      <View style={styles.badgeBottomRow}>
                        <Text style={styles.themesText} numberOfLines={1}>
                          {(game.tripThemeNames ?? []).join(' · ')}
                        </Text>
                        <Text style={styles.dateText}>
                          {formatYmd(game.startedAt)} ~ {formatYmd(game.endedAt)}
                        </Text>
                      </View>
                    </View>
                  </ImageBackground>
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}
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

          {(waiting.data?.data.dataBody.contents?.length ?? 0) === 0 ? (
            <EmptyListCard
              title="시작 전 게임이 없어요"
              description="게임을 만들면 이곳에서 확인할 수 있어요."
            />
          ) : (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.ongoingRow}
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
          )}
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
                <EmptyListCard
                  title="종료된 게임이 없어요"
                  description="완료된 게임이 나타나면 이곳에 표시돼요"
                />
              );
            }

            const list = ended.data?.data.dataBody.contents.slice(0, 4) ?? [];
            return list.map((game) => {
              const period = `${formatYmd(game.startedAt)} ~ ${formatYmd(game.endedAt || game.startedAt)}`;
              const thumb = game.representativeRegionImageUrl
                ? { uri: game.representativeRegionImageUrl }
                : ongoingImage;

              return (
                <TouchableOpacity
                  key={game.tripGameId}
                  activeOpacity={0.8}
                  onPress={() => goToGameEndedScreen(game.tripGameId)}
                  style={{ marginHorizontal: 16 }}
                >
                  <View style={styles.endedCardNew}>
                    <Image source={thumb} style={styles.endedThumb} />

                    <View style={styles.endedRight}>
                      <Text style={styles.endedTitleNew} numberOfLines={1}>
                        {game.title || game.representativeRegionName}
                      </Text>

                      <Text style={styles.endedDateText} numberOfLines={1}>
                        {period}
                      </Text>

                      <View style={styles.chipsRow}>
                        {(game.tripThemeNames ?? []).map((t) => (
                          <View key={t} style={styles.chip}>
                            <Text style={styles.chipText}>{t}</Text>
                          </View>
                        ))}
                      </View>
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
  safeArea: { flex: 1, backgroundColor: palette.white, height: 'auto' },
  // scroll: { paddingVertical: 32 },

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
    height: '100%',
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

  ongoingRow: { marginLeft: 16 },
  ongoingCardHorizontal: {
    width: 240,
    height: 360,
    borderRadius: 12,
    overflow: 'hidden',
    marginRight: 16,
  },
  waitingCardHorizontal: {
    width: 120,
    borderRadius: 12,
    overflow: 'hidden',
    marginRight: 16,
  },
  cardBadge: {
    position: 'absolute',
    left: 12,
    right: 12,
    bottom: 12,
    backgroundColor: '#fff',
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 12,
    // 그림자
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 10,
    elevation: 6,
  },

  badgeTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  cardTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '700',
    color: '#0f172a', // slate-900
    marginRight: 8,
  },

  regionPill: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 999,
    backgroundColor: '#EEF2FF', // indigo-50 느낌
  },

  regionText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#334155', // slate-700
  },

  badgeBottomRow: {
    marginTop: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },

  themesText: {
    flex: 1,
    fontSize: 12,
    color: '#475569', // slate-600
  },

  dateText: {
    fontSize: 12,
    color: '#64748b', // slate-500
  },

  // 새로운 종료 카드 스타일
  endedCardNew: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 16,
    backgroundColor: '#fff',
    marginBottom: 16,

    // 라이트 그림자
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#eef2f7',
  },
  endedThumb: {
    width: 84,
    height: 84,
    borderRadius: 12,
    marginRight: 12,
  },
  endedRight: {
    flex: 1,
  },
  endedTitleNew: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0f172a', // slate-900
  },
  endedDateText: {
    marginTop: 4,
    fontSize: 12,
    color: '#64748b', // slate-500
  },
  chipsRow: {
    marginTop: 8,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  chip: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: '#eef2f7', // 연한 회색
  },
  chipText: {
    fontSize: 12,
    color: '#475569', // slate-600
  },
});
