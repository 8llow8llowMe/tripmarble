import React from 'react';
import { useNavigation } from '@react-navigation/native';
import GameDetail from '@/components/ui/game-detail/GameDetail';

export default function GameDetailScreen({ route }: any) {
  const { tripGameId } = route.params || {};
  const navigation = useNavigation<any>();

  return (
    <GameDetail
      tripGameId={tripGameId}
      onBack={() => navigation.goBack()}
      onExit={() => navigation.goBack()}
    />
  );
}
