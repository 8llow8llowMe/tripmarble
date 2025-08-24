import EndedGameScreen from '@/screens/Game/EndedGameScreen';
import GameHomeScreen from '@/screens/Game/GameHomeScreen';
import GameListScreen from '@/screens/Game/GameListScreen';
import GameMissionAuthScreen from '@/screens/Game/GameMissionAuthScreen';
import OngoingGameScreen from '@/screens/Game/OngoingGameScreen';
import { GamePlayStackParamList } from '@/types/navigation/navigation';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const GamePlayStack = createNativeStackNavigator<GamePlayStackParamList>();

export default function GamePlayStackNavigator() {
  return (
    <GamePlayStack.Navigator>
      <GamePlayStack.Screen
        name="GameHomeScreen"
        component={GameHomeScreen}
        options={{ headerShown: false }}
      />
      <GamePlayStack.Screen
        name="EndedGameScreen"
        component={EndedGameScreen}
        options={{ headerShown: false }}
      />
      <GamePlayStack.Screen
        name="OngoingGameScreen"
        component={OngoingGameScreen}
        options={{ headerShown: false }}
      />
      <GamePlayStack.Screen
        name="GameListScreen"
        component={GameListScreen}
        options={{ headerShown: false }}
      />
      <GamePlayStack.Screen
        name="GameMissionAuthScreen"
        component={GameMissionAuthScreen}
        options={{ headerShown: false }}
      />
    </GamePlayStack.Navigator>
  );
}
