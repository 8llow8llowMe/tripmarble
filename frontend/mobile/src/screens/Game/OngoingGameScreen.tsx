import { palette } from '@/constants/colors';
import React, { useEffect, useRef, useState } from 'react';
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
import { useNavigation } from '@react-navigation/native';
import { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet';

//icons
import { Ionicons } from '@expo/vector-icons';
import Logo from 'assets/images/Logo.png';
import DotThree from '@assets/icons/dots-three';
// components
import GameBoardNative, { GameBoardHandle } from '@/components/ui/game-board/GameBoardNative';
import { GameMissionAuthSheetContent } from '@/components/ui/game/GameMissionAuthSheetContent';
import DiceView from '@/components/ui/lottie/DiceView';
import CongratulationView from '@/components/ui/lottie/CongratulationsView';
// datas
import { gameInfoDummy } from '@/utils/gameInfoDummy';
// apis
import useGetGameTilesQuery, { TripGameTileView } from '@/hooks/game/useGetGameTiles';
import useGameDiceMutation from '@/hooks/game/useGameDice';
import useGameEndMutation from '@/hooks/game/useGameEnd';
import useGameDetailQuery from '@/hooks/game/useGameDetail';
import useMoveLogsQuery from '@/hooks/game/useMoveLogs';

export default function OngoingGameScreen({ route }) {
  const { tripGameId } = route.params || {};
  const navigation = useNavigation<any>();
  const { gameDetail, isLoading: gameDetailIsLoading } = useGameDetailQuery(tripGameId);
  // 안전 추출: gameDetail가 훅에서 어떤 형태로 오든 대응
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

  // 이동 로그 목록과 최근/대기중 로그 계산
  const moveLogList = ((moveLogs as any)?.dataBody ?? []) as any[];
  const lastMoveLog = moveLogList.length > 0 ? moveLogList[moveLogList.length - 1] : undefined;

  // 방문 순서/상태 맵 구성 (arrivedAt 오름차순 기준)
  const orderedLogs = [...moveLogList]
    .filter(
      (l) => l?.tripGameTileId && ['SUCCESS', 'PENDING', 'FAIL'].includes(l?.missionResultCode),
    )
    .sort((a, b) => new Date(a.arrivedAt).getTime() - new Date(b.arrivedAt).getTime());
  const visits: Record<string, { order: number; status: 'SUCCESS' | 'PENDING' | 'FAIL' }> = {};
  orderedLogs.forEach((log, idx) => {
    visits[log.tripGameTileId] = {
      order: idx + 1,
      status: log.missionResultCode as 'SUCCESS' | 'PENDING' | 'FAIL',
    };
  });

  // 가장 최근의 'PENDING' 상태 로그를 찾아 사용 (목록이 오래된 순이라 가정하고 역순 탐색)
  const pendingLog = [...moveLogList]
    .reverse()
    .find((log: any) => log?.missionResultCode === 'PENDING');

  // 대기중 미션 여부 및 ID
  const isPendingMission = Boolean(pendingLog);
  const pendingMoveLogId: string | undefined = pendingLog?.tripGameMoveLogId;
  const pendingTileId: string | undefined = pendingLog?.tripGameTileId;

  // Helper: refetch move logs and get the latest pending id
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
      return pendingMoveLogId; // fall back to current
    }
  };

  // 게임 종료 여부는 "마지막 로그" 기준
  const isGameEnd = lastMoveLog?.missionResultCode === 'GAME_END';

  const { mutateAsync: rollDice } = useGameDiceMutation();
  const { mutateAsync: endGame, isPending: isEnding } = useGameEndMutation();

  const { gameInfo } = useGetGameTilesQuery(tripGameId);
  // 배열만 안전하게 추출 (hook 반환이 배열인지/객체인지 둘 다 대응)
  const tiles: TripGameTileView[] =
    (Array.isArray(gameInfo) ? gameInfo : gameInfo?.tripGameTileViews) ??
    gameInfoDummy.dataBody.tripGameTileViews;

  // 보드 칸 수: 난이도 기반 (EASY=4, NORMAL=5, HARD=6)
  const boardCount =
    difficultyCodeFromDetail === 'EASY'
      ? 4
      : difficultyCodeFromDetail === 'NORMAL'
        ? 5
        : difficultyCodeFromDetail === 'HARD'
          ? 6
          : tiles.length === 11
            ? 4
            : tiles.length === 16
              ? 5
              : 6;

  // 부모에서 관리하는 현재 타일 인덱스 (-1이면 GO)
  const initialParentIndex = Math.max(-1, (currentStepNoFromDetail ?? 0) - 1);
  const [currentIndexInParent, setCurrentIndexInParent] = useState<number>(initialParentIndex);
  const boardRef = useRef<GameBoardHandle>(null);
  const [canMove, setCanMove] = useState<boolean>(true);

  useEffect(() => {
    // PENDING 로그가 있으면 이동 불가, 없으면 이동 가능
    setCanMove(!isPendingMission);
  }, [isPendingMission]);

  useEffect(() => {
    if (!isPendingMission && !isGameEnd) {
      setCanMove(true);
    }
  }, [isPendingMission, isGameEnd]);

  // currentIndexInParent: -1이면 GO, 0~tiles.length-1이면 해당 타일
  const currentTileIndex = currentIndexInParent;

  const [diceVisible, setDiceVisible] = useState(false);
  const [diceValue, setDiceValue] = useState<number | null>(null);
  const [confettiVisible, setConfettiVisible] = useState(false);

  const [menuVisible, setMenuVisible] = useState(false);

  // 현재 선택(혹은 도착)한 타일 (GO(-1)일 때는 null)
  const currentTile = currentTileIndex >= 0 ? (tiles[currentTileIndex] as any) : null;
  // 서버 로그의 tripGameTileId 와 현재 타일의 tripSpotId 가 같은지 여부
  const isSameTileForAuth = Boolean(
    lastMoveLog?.tripGameTileId &&
      currentTile?.tripSpotId &&
      lastMoveLog.tripGameTileId === currentTile.tripSpotId,
  );
  // detail이 갱신되거나 다른 게임으로 진입했을 때 초기 인덱스 동기화
  React.useEffect(() => {
    const next = Math.max(-1, (currentStepNoFromDetail ?? 0) - 1);
    setCurrentIndexInParent(next);
  }, [currentStepNoFromDetail]);

  // 아래 조건이면 `미션 인증` 버튼을 강제로 노출
  const forceShowMissionButton = Boolean(isPendingMission || isSameTileForAuth);

  // 탭 (정보 / 방법)
  const [activeTab, setActiveTab] = useState<'timeline' | 'guide'>('timeline');
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
            await endGame(tripGameId);
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

  const missionSheetRef = useRef<BottomSheetModal>(null);
  const [missionParams, setMissionParams] = useState<{
    tile: any;
    tapIndex: number;
    currentIndex: number;
    canMove: boolean;
    allowMission: boolean;
  } | null>(null);

  const renderMissionBackdrop = (props: any) => (
    <BottomSheetBackdrop
      {...props}
      pressBehavior="close"
      disappearsOnIndex={-1}
      appearsOnIndex={0}
    />
  );

  // 로그 + 타일 정보 조인 → 타임라인 표시용 엔트리
  const timelineEntries = React.useMemo(
    () =>
      orderedLogs.map((log, idx) => {
        const tileInfo = tiles.find((t: any) => t?.tripGameTileId === log?.tripGameTileId);
        return {
          id: log?.tripGameMoveLogId ?? `${idx}`,
          order: idx + 1,
          spotName: tileInfo?.tripSpotName ?? '-',
          mission: tileInfo?.missionTypeDescription ?? '-', // PHOTO/REVIEW/CHECKIN_GPS 설명
          status: (log?.missionResultCode ?? 'PENDING') as
            | 'SUCCESS'
            | 'PENDING'
            | 'FAIL'
            | 'GAME_END',
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
            // 애니메이션 종료 후 말 이동
            if (v) {
              boardRef.current?.move(v);
            }
          }}
        />
        {confettiVisible && (
          <CongratulationView
            visible={diceVisible}
            onFinish={() => {
              setConfettiVisible(false);
            }}
          />
        )}

        {/* header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={28} color="#555" />
          </TouchableOpacity>
          <Text style={styles.headerTitle} numberOfLines={1}>
            {titleFromDetail ?? '@@ 여행'}
          </Text>

          <TouchableOpacity
            onPress={openMenu}
            accessibilityRole="button"
            accessibilityLabel="옵션 열기"
          >
            <DotThree width={24} height={24} />
          </TouchableOpacity>
        </View>

        {/* info */}
        <View>
          <View style={styles.infoRow}>
            <Text style={styles.turnText}>
              {currentTurnOrderFromDetail ? `${currentTurnOrderFromDetail}번째 턴` : '-'}
            </Text>
            <Text style={styles.dateTextStyled}>
              {startedAtFromDetail && endedAtFromDetail
                ? `${startedAtFromDetail} ~ ${endedAtFromDetail}`
                : '-'}
            </Text>
          </View>

          {(themesFromDetail.length > 0 || !!difficultyDescFromDetail) && (
            <View style={styles.metaRow}>
              <Text style={styles.themesText} numberOfLines={1}>
                {themesFromDetail.join(' · ')}
              </Text>
              {!!difficultyDescFromDetail && (
                <View style={styles.difficultyPill}>
                  <Text style={styles.difficultyText}>{difficultyDescFromDetail}</Text>
                </View>
              )}
            </View>
          )}
        </View>

        {/* game board */}
        <View style={styles.gameBoard}>
          <GameBoardNative
            key={`${tripGameId}-${boardCount}`}
            ref={boardRef}
            count={boardCount}
            initialIndex={isGameEnd ? 0 : Math.max(0, currentStepNoFromDetail ?? 0)}
            tiles={tiles}
            visits={visits}
            pieceSource={Logo} // 말 이미지
            onCellPress={(tile, tapIndex) => {
              const isCurrent = tapIndex === currentTileIndex;
              const sameTile =
                pendingTileId && tile?.tripGameTileId && pendingTileId === tile.tripGameTileId;
              const allowMissionForTap = Boolean(!canMove && isCurrent && sameTile);

              const open = async () => {
                let latestId = pendingMoveLogId;
                if (allowMissionForTap && !latestId) {
                  latestId = await ensureLatestPendingId();
                }
                setMissionParams({
                  tile,
                  tapIndex,
                  currentIndex: currentTileIndex,
                  canMove: canMove,
                  allowMission: allowMissionForTap,
                  pendingMoveLogId: latestId,
                } as any);
                requestAnimationFrame(() => missionSheetRef.current?.present());
              };
              open();
            }}
            onIndexChange={(next) => {
              setCurrentIndexInParent(next);
              // 새 칸 도착 → 이동 버튼 숨기고 미션하기 버튼 노출
              setCanMove(false);
              refetchMoveLogs();
            }}
          />
        </View>

        {/* button / ended message */}
        {isGameEnd ? (
          <View
            style={[styles.button, { backgroundColor: '#FFE8D5' }]}
            accessibilityRole="text"
            accessibilityLabel="게임이 종료되었습니다"
          >
            <Text style={[styles.buttonText, { color: '#EA580C' }]}>게임이 종료되었습니다</Text>
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
                if (endedByServer) {
                  setConfettiVisible(true);
                }
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
                if (!latestId) {
                  latestId = await ensureLatestPendingId();
                }
                setMissionParams({
                  tile: currentTile ?? tiles[0],
                  tapIndex: currentTileIndex,
                  currentIndex: currentTileIndex,
                  canMove: canMove,
                  allowMission: true,
                  pendingMoveLogId: latestId,
                } as any);
                requestAnimationFrame(() => missionSheetRef.current?.present());
              }
            }}
            accessibilityRole="button"
            accessibilityLabel="미션 인증"
          >
            <Text style={styles.buttonText}>미션 인증</Text>
          </TouchableOpacity>
        )}

        {/* Tabs: 타임 라인 / 게임 방법 */}
        <View style={styles.tabBar}>
          <TouchableOpacity
            style={[styles.tabItem, activeTab === 'timeline' && styles.tabItemActive]}
            onPress={() => setActiveTab('timeline')}
          >
            <Text style={[styles.tabText, activeTab === 'timeline' && styles.tabTextActive]}>
              타임 라인
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tabItem, activeTab === 'guide' && styles.tabItemActive]}
            onPress={() => setActiveTab('guide')}
          >
            <Text style={[styles.tabText, activeTab === 'guide' && styles.tabTextActive]}>
              게임 방법
            </Text>
          </TouchableOpacity>
        </View>

        {activeTab === 'timeline' ? (
          <View style={styles.timelineWrap}>
            {timelineEntries.length === 0 ? (
              <Text style={styles.timelineEmpty}>아직 이동 기록이 없어요</Text>
            ) : (
              timelineEntries.map((it, i) => {
                const tint =
                  it.status === 'SUCCESS'
                    ? '#10B981'
                    : it.status === 'PENDING'
                      ? '#F59E0B'
                      : it.status === 'FAIL'
                        ? '#EF4444'
                        : '#6B7280';
                const showLine = i < timelineEntries.length - 1;

                return (
                  <View key={it.id} style={styles.timelineRow}>
                    {/* 좌측 점/세로 라인 */}
                    <View style={styles.timelineLeft}>
                      <View style={[styles.timelineDot, { backgroundColor: tint }]} />
                      {showLine && (
                        <View style={[styles.timelineLine, { borderColor: '#E5E7EB' }]} />
                      )}
                    </View>
                    {/* 오른쪽 내용 */}
                    <View style={styles.timelineContent}>
                      <Text style={styles.timelineTitle} numberOfLines={1}>
                        {`${it.order}. ${it.spotName}`}
                      </Text>
                      <Text style={styles.timelineMeta} numberOfLines={2}>
                        {it.mission}
                        {it.arrivedAt ? ` · ${formatDT(it.arrivedAt)}` : ''}
                      </Text>
                    </View>
                  </View>
                );
              })
            )}
          </View>
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
            pendingMoveLogId={(missionParams as any)?.pendingMoveLogId ?? pendingMoveLogId}
            allowMissionOverride={missionParams.allowMission}
            onMissionSucceeded={() => {
              // 낙관적으로 이동 가능 상태로 전환하고 시트 닫기
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
  overlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 20,
  },
  tabBar: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 12,
    marginBottom: 4,
  },
  tabItem: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#E5E7EB',
    backgroundColor: '#F9FAFB',
    alignItems: 'center',
  },
  tabItemActive: {
    backgroundColor: '#EEF2FF',
    borderColor: '#C7D2FE',
  },
  tabText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '600',
  },
  tabTextActive: {
    color: '#374151',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  turnText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
  },
  dateTextStyled: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '600',
  },

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
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
    marginTop: -6,
    marginBottom: 8,
    paddingBottom: 4,
  },
  themesText: {
    flex: 1,
    color: '#6B7280',
    fontSize: 13,
  },
  difficultyPill: {
    backgroundColor: '#F2F5FA',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  difficultyText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#374151',
  },
  gameBoard: { width: '100%', aspectRatio: '0.75', paddingBottom: 12, marginBottom: 12 },
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
  timelineWrap: {
    paddingVertical: 12,
  },
  timelineEmpty: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    paddingVertical: 16,
  },
  timelineRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    paddingVertical: 10,
  },
  timelineLeft: {
    width: 20,
    alignItems: 'center',
  },
  timelineDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginTop: 4,
  },
  timelineLine: {
    flex: 1,
    width: 1,
    borderLeftWidth: 1,
    marginTop: 4,
  },
  timelineContent: {
    flex: 1,
  },
  timelineTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 2,
  },
  timelineMeta: {
    fontSize: 13,
    color: '#6B7280',
  },
});
