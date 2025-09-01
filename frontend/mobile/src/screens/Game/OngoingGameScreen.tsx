import { palette } from '@/constants/colors';
import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Animated,
  Pressable,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import GameBoardNative, { GameBoardHandle } from '@/components/ui/game-board/GameBoardNative';
import { gameInfoDummy } from '@/utils/gameInfoDummy';
import useGetGameTilesQuery, { TripGameTileView } from '@/hooks/game/useGetGameTiles';
import Logo from 'assets/images/Logo.png';
import DiceView from '@/components/ui/dice/DiceView';
import useGameDiceMutation from '@/hooks/game/useGameDice';
import DotThree from '@assets/icons/dots-three';
import useGameEndMutation from '@/hooks/game/useGameEnd';

export default function OngoingGameScreen({ route }) {
  const { tripGameId } = route.params || {};
  const navigation = useNavigation<any>();
  const { mutateAsync: rollDice, isPending: isRolling } = useGameDiceMutation();

  const { mutateAsync: endGame, isPending: isEnding } = useGameEndMutation();

  const { gameInfo } = useGetGameTilesQuery(tripGameId);
  // 배열만 안전하게 추출 (hook 반환이 배열인지/객체인지 둘 다 대응)
  const tiles: TripGameTileView[] =
    (Array.isArray(gameInfo) ? gameInfo : gameInfo?.tripGameTileViews) ??
    gameInfoDummy.dataBody.tripGameTileViews;

  const [currentIndexInParent, setCurrentIndexInParent] = useState<number>(0);
  const boardRef = useRef<GameBoardHandle>(null);
  const [canMove, setCanMove] = useState<boolean>(true);
  const currentTileIndex = currentIndexInParent === 0 ? -1 : currentIndexInParent % tiles.length;

  const [diceVisible, setDiceVisible] = useState(false);
  const [diceValue, setDiceValue] = useState<number | null>(null);

  const [menuVisible, setMenuVisible] = useState(false);
  const menuOpacity = useRef(new Animated.Value(0)).current;
  const menuScale = useRef(new Animated.Value(0.96)).current;

  const openMenu = () => {
    setMenuVisible(true);
    Animated.parallel([
      Animated.timing(menuOpacity, { toValue: 1, duration: 140, useNativeDriver: true }),
      Animated.spring(menuScale, { toValue: 1, useNativeDriver: true, friction: 7 }),
    ]).start();
  };
  const closeMenu = () => {
    Animated.parallel([
      Animated.timing(menuOpacity, { toValue: 0, duration: 120, useNativeDriver: true }),
      Animated.timing(menuScale, { toValue: 0.96, duration: 120, useNativeDriver: true }),
    ]).start(({ finished }) => finished && setMenuVisible(false));
  };

  const confirmEndGame = () => {
    closeMenu();
    Alert.alert('게임 종료하기', '정말로 이 게임을 종료할까요?\n종료하면 되돌릴 수 없어요.', [
      { text: '취소', style: 'cancel' },
      {
        text: '종료',
        style: 'destructive',
        onPress: async () => {
          try {
            // 메뉴 닫기
            closeMenu();
            // 게임 강제 종료 호출
            const res = await endGame(tripGameId);
            // 이전 목록으로 이동
            navigation.goBack();
          } catch (e) {
            console.warn('게임 종료 실패', e);
            Alert.alert('종료 실패', '게임 종료 중 오류가 발생했어요. 잠시 후 다시 시도해주세요.');
          }
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <DiceView
          visible={diceVisible}
          value={diceValue}
          onFinish={(v) => {
            setDiceVisible(false);
            // 애니메이션 종료 후 말 이동
            if (v) {
              boardRef.current?.move(v);
            }
          }}
        />

        {/* header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={28} color="#555" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>@@ 여행</Text>

          <TouchableOpacity
            onPress={openMenu}
            accessibilityRole="button"
            accessibilityLabel="옵션 열기"
          >
            <DotThree width={24} height={24} />
          </TouchableOpacity>
        </View>

        {/* game info */}
        <View style={styles.content}>
          <Text>현재 말 위치 인덱스: {currentIndexInParent + 1}</Text>
          <Text>
            {`${gameInfoDummy.dataBody.tripGameView.startedAt} ~ ${gameInfoDummy.dataBody.tripGameView.endedAt}`}
          </Text>
        </View>

        {/* game board */}
        <View style={styles.gameBoard}>
          <GameBoardNative
            ref={boardRef}
            count={5}
            tiles={tiles}
            pieceSource={Logo} // 말 이미지
            onCellPress={(tile, tabIndex) => {
              navigation.navigate({
                name: 'GameMissionAuthScreen',
                params: { tile, tapIndex: tabIndex, currentIndex: currentTileIndex, tripGameId },
                merge: true,
              });
            }}
            onIndexChange={(next) => {
              setCurrentIndexInParent(next);
              // 새 칸 도착 → 이동 버튼 숨기고 미션하기 버튼 노출
              setCanMove(false);
            }}
          />
        </View>

        {/* button */}
        {canMove ? (
          <TouchableOpacity
            style={styles.button}
            onPress={async () => {
              try {
                setCanMove(false);
                // 서버에 주사위 굴리기 요청
                const res = await rollDice(tripGameId);
                const serverSteps = res?.dataBody?.diceValue ?? Math.floor(Math.random() * 6) + 1;
                setDiceValue(serverSteps);
                setDiceVisible(true);
              } catch (e) {
                // 에러 시 다시 버튼 활성화
                setCanMove(true);
              }
            }}
            accessibilityRole="button"
            accessibilityLabel="이동"
          >
            <Text style={styles.buttonText}>주사위 던지기</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              if (currentTileIndex >= 0) {
                navigation.navigate({
                  name: 'GameMissionAuthScreen',
                  params: {
                    tile: tiles[currentIndexInParent],
                    tapIndex: currentTileIndex, // 사용자가 누른 것은 현재 칸
                    currentIndex: currentTileIndex, // 현재 말 위치
                    tripGameId,
                  },
                  merge: true,
                });
              }
            }}
            accessibilityRole="button"
            accessibilityLabel="미션 인증"
          >
            <Text style={styles.buttonText}>미션 인증</Text>
          </TouchableOpacity>
        )}

        {/* guide */}
        <View style={styles.guideWrap}>
          <Text style={styles.guideTitle}>게임 방법</Text>
          <View style={styles.guideRow}>
            <Text style={styles.guideStep}>step1</Text>
            <Text style={styles.guideText}>주사위를 던져 나온 수만큼 말 이동</Text>
          </View>
          <View style={styles.guideRow}>
            <Text style={styles.guideStep}>step2</Text>
            <Text style={styles.guideText}>해당 칸의 미션 확인 후 미션 수행</Text>
          </View>
          <View style={styles.guideRow}>
            <Text style={styles.guideStep}>step3</Text>
            <Text style={styles.guideText}>한 바퀴 완주 시 게임 종료!</Text>
          </View>
        </View>
        {menuVisible && (
          <View pointerEvents="box-none" style={StyleSheet.absoluteFill}>
            {/* 배경 클릭으로 닫기 */}
            <Pressable
              style={styles.backdrop}
              onPress={closeMenu}
              accessibilityRole="button"
              accessibilityLabel="메뉴 닫기"
            />
            {/* 메뉴 패널 */}
            <Animated.View
              style={[styles.menu, { opacity: menuOpacity, transform: [{ scale: menuScale }] }]}
              accessible
              accessibilityLabel="옵션 메뉴"
            >
              <TouchableOpacity
                style={styles.menuItem}
                onPress={confirmEndGame}
                disabled={isEnding}
                accessibilityRole="button"
                accessibilityLabel="게임 종료하기"
              >
                <Ionicons name="flag-outline" size={18} color={palette.red600} />
                <Text style={styles.menuText}>게임 종료하기</Text>
              </TouchableOpacity>
            </Animated.View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: palette.white },
  container: { paddingHorizontal: 16 },

  header: {
    height: 52,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E5E7EB',
    backgroundColor: palette.white,
    elevation: 2,
  },
  headerTitle: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '700',
    color: palette.gray800,
  },
  content: {
    flexDirection: 'row',
    textAlign: 'center',
    justifyContent: 'space-between',
    paddingVertical: 18,
  },
  gameBoard: { width: '100%', aspectRatio: '0.75', paddingBottom: 8 },
  button: {
    backgroundColor: palette.buttonColor,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: palette.white,
    fontSize: 18,
    fontWeight: '700',
  },
  // guide section
  guideWrap: {
    marginVertical: 8,
    paddingVertical: 12,
  },
  guideTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: palette.black,
    marginBottom: 6,
  },
  guideRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 4,
    gap: 8,
  },
  guideStep: {
    width: 60,
    fontSize: 16,
    fontWeight: '700',
    color: palette.mainColor,
  },
  guideText: {
    fontSize: 16,
    color: palette.black,
    flexShrink: 1,
  },
  // 드롭다운
  backdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  menu: {
    position: 'absolute',
    top: 52 + 8, // 헤더 높이(52) + 여백
    right: 0,
    minWidth: 176,
    paddingVertical: 8,
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#EFF2F6',
    // shadow (iOS)
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    // elevation (Android)
    elevation: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  menuText: {
    fontSize: 15,
    color: palette.gray800,
    fontWeight: '600',
  },
});
