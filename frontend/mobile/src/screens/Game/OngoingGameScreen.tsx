import { palette } from '@/constants/colors';
import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Pressable,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import GameBoardNative, { GameBoardHandle } from '@/components/ui/game-board/GameBoardNative';
import { gameInfoDummy } from '@/utils/gameInfoDummy';
import useGetGameTilesQuery, { TripGameTileView } from '@/hooks/game/useGetGameTiles';
import Logo from 'assets/images/Logo.png';
// import useGameStartQuery from '@/hooks/game/useGameStart';

export default function OngoingGameScreen({ route }) {
  const { tripGameId } = route.params || {};
  const navigation = useNavigation<any>();

  // 1) 먼저 시작 API 호출 (idempotent 가정)
  // const { data: startData, isSuccess: startSuccess } = useGameStartQuery(id);
  // const gameStarted = !!(startSuccess && startData?.dataHeader?.success);

  // 2) 시작 완료 후에만 타일 조회 enabled
  // const { gameInfo } = useGetGameTilesQuery(id, gameStarted);
  const { gameInfo } = useGetGameTilesQuery(tripGameId);
  // 배열만 안전하게 추출 (hook 반환이 배열인지/객체인지 둘 다 대응)
  const tiles: TripGameTileView[] =
    (Array.isArray(gameInfo) ? gameInfo : gameInfo?.tripGameTileViews) ??
    gameInfoDummy.dataBody.tripGameTileViews;
  // console.log(tiles);
  // 모달 상태 (setModalTile 사용하려면 필요)
  const [modalTile, setModalTile] = useState<TripGameTileView | null>(null);
  const [currentIndexInParent, setCurrentIndexInParent] = useState<number>(0);
  const boardRef = useRef<GameBoardHandle>(null);
  const [canMove, setCanMove] = useState<boolean>(true);
  const currentTileIndex =
    currentIndexInParent === 0 ? -1 : (currentIndexInParent - 1) % tiles.length;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        {/* header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.goBack} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={28} color="#555" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>@@ 여행</Text>
        </View>

        {/* game info */}
        <View style={styles.content}>
          <Text>현재 말 위치 인덱스: {currentIndexInParent}</Text>
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
            onCellPress={(tile) => {
              // 모달 or 상세 표시
              setModalTile(tile);
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
            onPress={() => {
              // 이동 시작: 이동 버튼 숨김(중복 클릭 방지)
              setCanMove(false);
              const steps = Math.floor(Math.random() * 6) + 1;
              boardRef.current?.move(steps);
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
              // 현재 위치 타일 상세 보기 모달
              if (currentTileIndex >= 0) {
                setModalTile(tiles[currentTileIndex]);
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
            <Text style={styles.guideText}>한 바퀴 완주 시 게임 종료</Text>
          </View>
        </View>
      </ScrollView>
      {/* modal */}
      <Modal
        visible={!!modalTile}
        transparent
        animationType="fade"
        onRequestClose={() => setModalTile(null)}
      >
        <Pressable style={styles.modalBackdrop} onPress={() => setModalTile(null)}>
          <Pressable style={styles.modal} onPress={(e) => e.stopPropagation()}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle} numberOfLines={2}>
                {modalTile?.tripSpotName}
              </Text>
              <TouchableOpacity onPress={() => setModalTile(null)}>
                <Text style={styles.modalClose}>✕</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.modalMeta}>단계: step{modalTile?.stepNo}</Text>
            <Text style={styles.modalId}>tripSpotId: {modalTile?.tripSpotId}</Text>

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.actionSecondary}
                onPress={() => {
                  /* TODO: navigate to mission detail */
                }}
              >
                <Text style={styles.actionSecondaryText}>미션 보기</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.actionPrimary}
                onPress={() => {
                  // 미션 완료 → 다시 이동 버튼 보이도록
                  setCanMove(true);
                  setModalTile(null);
                }}
              >
                <Text style={styles.actionPrimaryText}>미션 인증</Text>
              </TouchableOpacity>
            </View>
          </Pressable>
        </Pressable>
      </Modal>
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
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E5E7EB',
    backgroundColor: palette.white,
    zIndex: 10,
    elevation: 2,
  },
  goBack: {
    zIndex: 10,
    elevation: 2,
  },
  headerTitle: {
    position: 'absolute',
    left: 0,
    right: 0,
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

  // modal
  modalBackdrop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: palette.backgrop,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modal: {
    backgroundColor: palette.white,
    borderRadius: 12,
    paddingVertical: 18,
    paddingHorizontal: 20,
    width: '92%',
    maxWidth: 520,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  modalTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '700',
    color: palette.gray800,
    paddingRight: 8,
  },
  modalClose: {
    fontSize: 20,
    color: palette.gray500,
  },
  modalMeta: {
    color: palette.gray550,
    marginBottom: 8,
  },
  modalId: {
    fontSize: 14,
    color: palette.black,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
    marginTop: 16,
  },
  actionPrimary: {
    backgroundColor: palette.mainColor,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  actionPrimaryText: {
    color: palette.white,
    fontWeight: '700',
  },
  actionSecondary: {
    backgroundColor: palette.gray50,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  actionSecondaryText: {
    color: palette.black,
    fontWeight: '700',
  },

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
});
