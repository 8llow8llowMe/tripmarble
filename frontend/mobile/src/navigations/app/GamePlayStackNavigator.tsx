import GameOverviewScreen from '@/screens/Game/GameOverviewScreen';
import OngoingGameScreen from '@/screens/Game/OngoingGameScreen';
import { GamePlayStackParamList } from '@/types/navigation/navigation';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const GamePlayStack = createNativeStackNavigator<GamePlayStackParamList>();

export default function GamePlayStackNavigator() {
  return (
    <GamePlayStack.Navigator>
      <GamePlayStack.Screen
        name="GameOverviewScreen"
        component={GameOverviewScreen}
        options={{ headerShown: false }}
      />
      <GamePlayStack.Screen
        name="OngoingGameScreen"
        component={OngoingGameScreen}
        options={{ headerShown: false }}
      />
    </GamePlayStack.Navigator>
  );
}
