import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { palette } from '@/constants/colors';
import Entypo from '@expo/vector-icons/Entypo';
import GameDetailPopup from '@/components/common/popup/GameDetailPopup';
import useHeaderHeight from '@/hooks/useHeaderHeight';
import { useNavigation } from '@react-navigation/native';
import TextBox from '@/components/atom/TextBox';

type GameDetailHeaderProps = {
  tripGameId: string;
  title?: string;
  isGameEnd?: boolean;
};

export default function GameDetailHeader({
  tripGameId,
  title,
  isGameEnd = false,
}: GameDetailHeaderProps) {
  const { headerHeight, paddingTop } = useHeaderHeight();
  const navigation = useNavigation<any>();

  const [modalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <View
      style={[
        styles.headerContainer,
        {
          height: headerHeight + 10,
          paddingTop: paddingTop,
          borderBottomWidth: 1,
          borderBottomColor: palette.gray100,
        },
      ]}
    >
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="#555" />
      </TouchableOpacity>

      <TextBox size={16} fontsName="Pretendard700" style={styles.title}>
        {title ?? '여행'}
      </TextBox>

      {!isGameEnd && (
        <View style={{ position: 'relative' }}>
          <TouchableOpacity onPress={() => toggleModal()}>
            <Entypo name="dots-three-horizontal" size={20} color="#555" />
          </TouchableOpacity>
          <GameDetailPopup
            tripGameId={tripGameId}
            visible={modalVisible}
            toggleModal={toggleModal}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    paddingHorizontal: 16,
    backgroundColor: palette.white,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: palette.gray100,
  },

  title: {
    flex: 1,
    fontWeight: '700',
    marginLeft: 8,
  },
});
