import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PlayScreen from '../screens/Play/PlayScreen';
import CreateGameScreen from '../screens/Game/CreateGameScreen';
import OngoingGameScreen from '../screens/Game/OngoingGameScreen';
import FinishedGameScreen from '../screens/Game/FinishedGameScreen';

const PlayStack = createNativeStackNavigator();

export default function PlayStackNavigator() {
  return (
    <PlayStack.Navigator screenOptions={{ headerShown: false }}>
      <PlayStack.Screen name="PlayMain" component={PlayScreen} />
      <PlayStack.Screen name="CreateGame" component={CreateGameScreen} />
      <PlayStack.Screen name="OngoingGame" component={OngoingGameScreen} />
      <PlayStack.Screen name="FinishedGame" component={FinishedGameScreen} />
    </PlayStack.Navigator>
  );
}
