import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Pressable,
  Alert,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet';
import { palette } from '@/constants/colors';
import { Ionicons } from '@expo/vector-icons';
import Logo from 'assets/images/Logo.png';

import GameBoardNative, { GameBoardHandle } from '@/components/ui/game-board/GameBoardNative';
import { GameMissionAuthSheetContent } from '@/components/ui/game/GameMissionAuthSheetContent';
import DiceView from '@/components/ui/lottie/DiceView';
import CongratulationView from '@/components/ui/lottie/CongratulationsView';

import useGetGameTilesQuery, { TripGameTileView } from '@/hooks/game/useGetGameTiles';
import useGameDiceMutation from '@/hooks/game/useGameDice';
import useGameEndMutation from '@/hooks/game/useGameEnd';
import useGameDetailQuery from '@/hooks/game/useGameDetail';
import useMoveLogsQuery from '@/hooks/game/useMoveLogs';
import { gameInfoDummy } from '@/utils/gameInfoDummy';

// Subcomponents
import GameDetailHeader from './GameDetailHeader';
import GameDetailInfo from './GameDetailInfo';
import GameDetailTabs from './GameDetailTabs';
import TimelineList from './TimelineList';

type Props = {
  tripGameId: string;
  onBack?: () => void;
  onExit?: () => void; // after force end
};

export default function GameDetail({ tripGameId, onBack, onExit }: Props) {
  const { gameDetail, isLoading: gameDetailIsLoading } = useGameDetailQuery(tripGameId);
  const detail = (gameDetail as any)?.data?.dataBody ?? (gameDetail as any)?.dataBody ?? undefined;
  const titleFromDetail: string | undefined = detail?.title ?? detail?.representativeRegionName;
  const startedAtFromDetail: string | undefined = detail?.startedAt;
  const endedAtFromDetail: string | undefined = detail?.endedAt;
  const currentTurnOrderFromDetail: number | undefined = detail?.currentTurnOrder;
  const currentStepNoFromDetail: number | undefined = detail?.currentStepNo;
  const difficultyCodeFromDetail: 'EASY' | 'NORMAL' | 'HARD' | undefined = detail?.difficultyCode;
  const themesFromDetail: string[] = detail?.tripThemeNames ?? [];
  const difficultyDescFromDetail: string | undefined = detail?.difficultyDescription;

  const {
    moveLogs,
    isLoading: moveLogsIsLoading,
    refetch: refetchMoveLogs,
  } = useMoveLogsQuery(tripGameId);
  const moveLogList = ((moveLogs as any)?.dataBody ?? []) as any[];
  const lastMoveLog = moveLogList.length > 0 ? moveLogList[moveLogList.length - 1] : undefined;

  const orderedLogs = [...moveLogList]
    .filter(
      (l) =>
        l?.tripGameTileId &&
        ['SUCCESS', 'PENDING', 'SKIPPED', 'FAIL'].includes(l?.missionResultCode),
    )
    .sort((a, b) => new Date(a.arrivedAt).getTime() - new Date(b.arrivedAt).getTime());
  const visits: Record<
    string,
    { order: number; status: 'SUCCESS' | 'PENDING' | 'SKIPPED' | 'FAIL' }
  > = {};
  console.log(moveLogList);
  orderedLogs.forEach((log, idx) => {
    visits[log.tripGameTileId] = { order: idx + 1, status: log.missionResultCode as any };
  });

  const pendingLog = [...moveLogList]
    .reverse()
    .find((log: any) => log?.missionResultCode === 'PENDING');
  const isPendingMission = Boolean(pendingLog);
  const pendingMoveLogId: string | undefined = pendingLog?.tripGameMoveLogId;
  const pendingTileId: string | undefined = pendingLog?.tripGameTileId;

  const ensureLatestPendingId = async (): Promise<string | undefined> => {
    try {
      const res = await refetchMoveLogs();
      const freshList = ((res.data as any)?.dataBody ??
        (res.data as any)?.data?.dataBody ??
        []) as any[];
      const freshPending = [...freshList]
        .reverse()
        .find((log) => log?.missionResultCode === 'PENDING');
      return freshPending?.tripGameMoveLogId;
    } catch (_) {
      return pendingMoveLogId;
    }
  };

  const isGameEnd = lastMoveLog?.missionResultCode === 'GAME_END';

  const { mutateAsync: rollDice } = useGameDiceMutation();
  const { mutateAsync: endGame, isPending: isEnding } = useGameEndMutation();

  const { gameInfo } = useGetGameTilesQuery(tripGameId);
  const tiles: TripGameTileView[] =
    (Array.isArray(gameInfo) ? gameInfo : gameInfo?.tripGameTileViews) ??
    gameInfoDummy.dataBody.tripGameTileViews;

  const boardCount =
    difficultyCodeFromDetail === 'EASY'
      ? 4
      : difficultyCodeFromDetail === 'NORMAL'
        ? 5
        : difficultyCodeFromDetail === 'HARD'
          ? 6
          : 5;

  const boardRef = useRef<GameBoardHandle>(null);
  const [currentIndexInParent, setCurrentIndexInParent] = useState(0);
  const [canMove, setCanMove] = useState(false);

  useEffect(() => {
    setCanMove(!isPendingMission);
  }, [isPendingMission]);

  useEffect(() => {
    if (!isPendingMission && !isGameEnd) setCanMove(true);
  }, [isPendingMission, isGameEnd]);

  const currentTileIndex = currentIndexInParent;
  const currentTile = currentTileIndex >= 0 ? (tiles[currentTileIndex] as any) : null;
  const isSameTileForAuth = Boolean(
    lastMoveLog?.tripGameTileId &&
      currentTile?.tripSpotId &&
      lastMoveLog.tripGameTileId === currentTile.tripSpotId,
  );
  useEffect(() => {
    const next = Math.max(-1, (currentStepNoFromDetail ?? 0) - 1);
    setCurrentIndexInParent(next);
  }, [currentStepNoFromDetail]);

  const forceShowMissionButton = Boolean(isPendingMission || isSameTileForAuth);

  const [activeTab, setActiveTab] = useState<'timeline' | 'guide'>('timeline');
  const menuOpacity = useRef(new Animated.Value(0)).current;
  const menuScale = useRef(new Animated.Value(0.96)).current;
  const [menuVisible, setMenuVisible] = useState(false);

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
            closeMenu();
            await endGame(tripGameId);
            onExit?.();
          } catch (e) {
            Alert.alert('종료 실패', '게임 종료 중 오류가 발생했어요. 잠시 후 다시 시도해주세요.');
          }
        },
      },
    ]);
  };

  const missionSheetRef = useRef<BottomSheetModal>(null);
  const [missionParams, setMissionParams] = useState<any | null>(null);
  const renderMissionBackdrop = (props: any) => (
    <BottomSheetBackdrop
      {...props}
      pressBehavior="close"
      disappearsOnIndex={-1}
      appearsOnIndex={0}
    />
  );

  const timelineEntries = useMemo(
    () =>
      orderedLogs.map((log, idx) => {
        const tileInfo = tiles.find((t: any) => t?.tripGameTileId === log?.tripGameTileId);
        return {
          id: log?.tripGameMoveLogId ?? `${idx}`,
          order: idx + 1,
          spotName: tileInfo?.tripSpotName ?? '-',
          mission: tileInfo?.missionTypeDescription ?? '-',
          status: (log?.missionResultCode ?? 'PENDING') as any,
          arrivedAt: log?.arrivedAt as string | undefined,
        };
      }),
    [orderedLogs, tiles],
  );

  const formatDT = (iso?: string) => {
    if (!iso) return '';
    const d = new Date(iso);
    const yy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    const HH = String(d.getHours()).padStart(2, '0');
    const MM = String(d.getMinutes()).padStart(2, '0');
    return `${yy}.${mm}.${dd} ${HH}:${MM}`;
  };

  const bothReady = !gameDetailIsLoading && !moveLogsIsLoading && !!detail && !!moveLogs?.dataBody;

  const [diceVisible, setDiceVisible] = useState(false);
  const [diceValue, setDiceValue] = useState<number | null>(null);
  const [confettiVisible, setConfettiVisible] = useState(false);

  if (!bothReady) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <View style={{ paddingVertical: 28, alignItems: 'center' }}>
            <Text style={{ fontSize: 16, color: '#6B7280' }}>불러오는 중…</Text>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <DiceView
          visible={diceVisible}
          value={diceValue}
          onFinish={(v) => {
            setDiceVisible(false);
            if (v) boardRef.current?.move(v);
          }}
        />
        {confettiVisible && (
          <CongratulationView visible={diceVisible} onFinish={() => setConfettiVisible(false)} />
        )}

        <GameDetailHeader
          title={titleFromDetail}
          isGameEnd={isGameEnd}
          onBack={onBack}
          onMenu={openMenu}
        />

        <GameDetailInfo
          turnOrder={currentTurnOrderFromDetail}
          startedAt={startedAtFromDetail}
          endedAt={endedAtFromDetail}
          themes={themesFromDetail}
          difficulty={difficultyDescFromDetail}
        />

        <View style={styles.gameBoard}>
          <GameBoardNative
            key={`${tripGameId}-${boardCount}`}
            ref={boardRef}
            count={boardCount}
            initialIndex={isGameEnd ? 0 : Math.max(0, currentStepNoFromDetail ?? 0)}
            tiles={tiles}
            visits={visits}
            pieceSource={Logo}
            onCellPress={(tile, tapIndex) => {
              const isCurrent = tapIndex === currentTileIndex;
              const sameTile =
                pendingTileId && tile?.tripGameTileId && pendingTileId === tile.tripGameTileId;
              const allowMissionForTap = Boolean(!canMove && isCurrent && sameTile);
              const open = async () => {
                let latestId = pendingMoveLogId;
                if (allowMissionForTap && !latestId) latestId = await ensureLatestPendingId();
                setMissionParams({
                  tile,
                  tapIndex,
                  currentIndex: currentTileIndex,
                  canMove,
                  allowMission: allowMissionForTap,
                  pendingMoveLogId: latestId,
                });
                requestAnimationFrame(() => missionSheetRef.current?.present());
              };
              open();
            }}
            onIndexChange={(next) => {
              setCurrentIndexInParent(next);
              setCanMove(false);
              refetchMoveLogs();
            }}
          />
        </View>

        {isGameEnd ? (
          <View style={{ paddingVertical: 12 }}>
            <Text style={{ textAlign: 'center', color: '#4B5563' }}>게임이 종료되었습니다</Text>
          </View>
        ) : canMove && !forceShowMissionButton ? (
          <TouchableOpacity
            style={styles.button}
            onPress={async () => {
              try {
                setCanMove(false);
                const res = await rollDice(tripGameId);
                const serverSteps = res?.dataBody?.diceValue ?? Math.floor(Math.random() * 6) + 1;
                const endedByServer = Boolean(res?.dataBody?.isGameEnded);
                setDiceValue(serverSteps);
                setDiceVisible(true);
                if (endedByServer) setConfettiVisible(true);
              } catch (e) {
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
            onPress={async () => {
              if (currentTileIndex >= 0) {
                let latestId = pendingMoveLogId;
                if (!latestId) latestId = await ensureLatestPendingId();
                setMissionParams({
                  tile: currentTile ?? tiles[0],
                  tapIndex: currentTileIndex,
                  currentIndex: currentTileIndex,
                  canMove,
                  allowMission: true,
                  pendingMoveLogId: latestId,
                });
                requestAnimationFrame(() => missionSheetRef.current?.present());
              }
            }}
            accessibilityRole="button"
            accessibilityLabel="미션 인증"
          >
            <Text style={styles.buttonText}>미션 인증</Text>
          </TouchableOpacity>
        )}

        <GameDetailTabs value={activeTab} onChange={setActiveTab} />

        {activeTab === 'timeline' ? (
          <TimelineList entries={timelineEntries as any} formatDT={formatDT} />
        ) : (
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
        )}

        {menuVisible && (
          <View pointerEvents="box-none" style={StyleSheet.absoluteFill}>
            <Pressable
              style={styles.backdrop}
              onPress={closeMenu}
              accessibilityRole="button"
              accessibilityLabel="메뉴 닫기"
            />
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
      <BottomSheetModal
        ref={missionSheetRef}
        handleStyle={{
          backgroundColor: palette.white,
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
          marginBottom: 16,
        }}
        index={1}
        snapPoints={['20%', '85%']}
        enablePanDownToClose={false}
        backdropComponent={renderMissionBackdrop}
        onDismiss={() => setMissionParams(null)}
      >
        {missionParams && (
          <GameMissionAuthSheetContent
            tile={missionParams.tile}
            tapIndex={missionParams.tapIndex}
            currentIndex={missionParams.currentIndex}
            tripGameId={tripGameId}
            pendingMoveLogId={(missionParams as any)?.pendingMoveLogId}
            allowMissionOverride={missionParams.allowMission}
            onMissionSucceeded={() => {
              setCanMove(true);
              missionSheetRef.current?.dismiss();
              setMissionParams(null);
            }}
            onRequestClose={() => missionSheetRef.current?.dismiss()}
            canMove={missionParams.canMove}
          />
        )}
      </BottomSheetModal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: palette.white },
  container: { paddingHorizontal: 16 },
  gameBoard: { width: '100%', aspectRatio: '0.75', paddingBottom: 12, marginBottom: 12 },
  button: {
    backgroundColor: palette.buttonColor,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  buttonText: { color: palette.white, fontSize: 18, fontWeight: '700' },
  guideWrap: { marginVertical: 8, paddingVertical: 12 },
  guideTitle: { fontSize: 16, fontWeight: '700', color: palette.black, marginBottom: 6 },
  guideRow: { flexDirection: 'row', alignItems: 'baseline', marginBottom: 4, gap: 8 },
  guideStep: { width: 60, fontSize: 16, fontWeight: '700', color: palette.mainColor },
  guideText: { fontSize: 16, color: palette.black, flexShrink: 1 },
  backdrop: { ...StyleSheet.absoluteFillObject },
  menu: {
    position: 'absolute',
    top: 52 + 8,
    right: 0,
    minWidth: 176,
    paddingVertical: 8,
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#EFF2F6',
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  menuText: { fontSize: 15, color: palette.gray800, fontWeight: '600' },
});
