import { palette } from '@/constants/colors';
import { useNavigation } from '@react-navigation/native';

import React from 'react';
import {
  View,
  Modal,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
  Platform,
  Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import TextBox from '../../atom/TextBox';
import { AppNavigatorNavigationProp } from '@/types/navigation/screen';
import useGameEndMutation from '@/hooks/game/useGameEnd';

interface EditPopupProps {
  tripGameId: string;
  visible: boolean;
  toggleModal: () => void;
}

const GameDetailPopup = ({ tripGameId, visible, toggleModal }: EditPopupProps) => {
  const navigation = useNavigation<AppNavigatorNavigationProp>();
  const { top } = useSafeAreaInsets();

  const paddingTop = Platform.OS === 'ios' ? top : Number(Platform.Version) > 34 ? 0 : top;

  if (!visible) return null;

  const { mutateAsync: endGame, isPending: isEnding } = useGameEndMutation();

  const handleEndGame = () => {
    toggleModal();
    Alert.alert('게임 종료하기', '정말로 이 게임을 종료할까요?\n종료하면 되돌릴 수 없어요.', [
      { text: '취소', style: 'cancel' },
      {
        text: '종료',
        style: 'destructive',
        onPress: async () => {
          try {
            toggleModal();
            await endGame(tripGameId);
            navigation.goBack();
          } catch (e) {
            Alert.alert('종료 실패', '게임 종료 중 오류가 발생했어요. 잠시 후 다시 시도해주세요.');
          }
        },
      },
    ]);
  };

  return (
    <Modal transparent={true} visible={visible} onRequestClose={toggleModal}>
      <TouchableWithoutFeedback onPress={toggleModal}>
        <View style={[styles.modalOverlay]}>
          <TouchableWithoutFeedback>
            <View
              style={[
                styles.modalContainer,
                {
                  top: paddingTop + 12 + 11 + 24,
                },
              ]}
            >
              <TouchableOpacity style={styles.option} onPress={handleEndGame} disabled={isEnding}>
                <Ionicons name="flag-outline" size={18} color={palette.red600} />
                <TextBox size={16} color={palette.Neutral800}>
                  종료하기
                </TextBox>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  modalContainer: {
    position: 'absolute',
    right: 16,
    width: 150,
    backgroundColor: 'white',
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#eee',

    shadowColor: 'rgba(38, 43, 67, 0.16)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 14,
    elevation: 5, // Android에서 그림자 효과
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 9,
    gap: 8,
  },
});

export default GameDetailPopup;
