import React from 'react';
import { View, Text } from 'react-native';

export default function OngoingGameScreen({ route }) {
  // 파라미터로 title, id 등 받을 수 있음
  const { title, id } = route.params || {};

  return (
    <View>
      <Text>진행중인 {title} 상세 페이지</Text>
      <Text>ID: {id}</Text>
    </View>
  );
}
