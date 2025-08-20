import { palette } from '@/constants/colors';
import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import GameBoardNative, { GameBoardHandle } from '@/components/ui/game-board/GameBoardNative';
import { gameInfoDummy } from '@/utils/gameInfoDummy';
import useGetGameTilesQuery, { TripGameTileView } from '@/hooks/game/useGetGameTiles';
import Logo from 'assets/images/Logo.png';
// import useGameStartQuery from '@/hooks/game/useGameStart';

export default function OngoingGameScreen({ route }) {
  const { id } = route.params || {};
  const navigation = useNavigation<any>();

  // 1) 먼저 시작 API 호출 (idempotent 가정)
  // const { data: startData, isSuccess: startSuccess } = useGameStartQuery(id);
  // const gameStarted = !!(startSuccess && startData?.dataHeader?.success);

  // 2) 시작 완료 후에만 타일 조회 enabled
  // const { gameInfo } = useGetGameTilesQuery(id, gameStarted);
  const { gameInfo } = useGetGameTilesQuery(id);

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
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={28} color="#555" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>진행중인</Text>
      </View>
      <Text>ID: {id}</Text>
      <Text style={{ textAlign: 'center', marginTop: 8 }}>
        현재 말 위치 인덱스: {currentIndexInParent}
      </Text>
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
          <Text style={styles.buttonText}>이동</Text>
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

  header: {
    height: 52,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E5E7EB',
    backgroundColor: palette.white,
  },
  headerTitle: { flex: 1, textAlign: 'center', fontSize: 17, fontWeight: '700', color: '#0F172A' },

  gameBoard: { width: '100%', aspectRatio: 1 },

  createBtnText: {
    color: palette.mainColor,
    fontWeight: '700',
    fontSize: 16,
  },
  createBtnTextDisabled: {
    color: '#D1D5DB', // 비활성화 시 회색
  },

  modalBackdrop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.35)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modal: {
    backgroundColor: '#fff',
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
    color: '#0F172A',
    paddingRight: 8,
  },
  modalClose: {
    fontSize: 20,
    color: '#6B7280',
  },
  modalMeta: {
    color: '#5d6b7b',
    marginBottom: 8,
  },
  modalId: {
    fontSize: 14,
    color: '#111827',
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
    marginTop: 16,
  },
  actionPrimary: {
    backgroundColor: '#0070f3',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  actionPrimaryText: {
    color: '#fff',
    fontWeight: '700',
  },
  actionSecondary: {
    backgroundColor: '#EEF2FF',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  actionSecondaryText: {
    color: '#334155',
    fontWeight: '700',
  },
  button: {
    backgroundColor: palette.mainColor,
    borderRadius: 8,
    paddingVertical: 12,
    marginVertical: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
});
