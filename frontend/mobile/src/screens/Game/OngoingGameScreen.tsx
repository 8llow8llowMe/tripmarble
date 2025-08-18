import { palette } from '@/constants/colors';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import GameBoardNative from '@/components/ui/game-board/GameBoardNative';
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
  const [modalTile, setModalTile] = React.useState<TripGameTileView | null>(null);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={28} color="#555" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>진행중인</Text>
      </View>
      <Text>ID: {id}</Text>
      <View style={styles.gameBoard}>
        <GameBoardNative
          count={5}
          tiles={tiles}
          pieceSource={Logo} // 말 이미지
          onCellPress={(tile) => {
            // 모달 or 상세 표시
            setModalTile(tile);
          }}
        />
      </View>
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

            <Text style={styles.modalMeta}>단계: step{modalTile?.stepNo} ·</Text>
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
                  /* TODO: open certify flow */
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
});
