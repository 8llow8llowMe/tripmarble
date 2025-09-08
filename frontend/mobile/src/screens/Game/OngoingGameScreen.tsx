import React from 'react';
import { useNavigation } from '@react-navigation/native';
import OngoingGameDetail from '@/components/ui/game-detail/OngoingGameDetail';

export default function OngoingGameScreen({ route }: any) {
  const { tripGameId } = route.params || {};
  const navigation = useNavigation<any>();

  return (
    <OngoingGameDetail
      tripGameId={tripGameId}
      onBack={() => navigation.goBack()}
      onExit={() => navigation.goBack()}
    />
  );
}
