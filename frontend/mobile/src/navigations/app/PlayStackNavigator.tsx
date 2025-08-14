import TabHeader from '@/components/layout/header/TabHeader';
import FinishedGameScreen from '@/screens/Game/FinishedGameScreen';
import OngoingGameScreen from '@/screens/Game/OngoingGameScreen';
import PlayScreen from '@/screens/Play/PlayScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const PlayStack = createNativeStackNavigator();

export default function PlayStackNavigator() {
  return (
    <PlayStack.Navigator>
      <PlayStack.Screen
        name="PlayMain"
        component={PlayScreen}
        options={{
          header: () => <TabHeader type="PlayTab" />,
        }}
      />
      <PlayStack.Screen
        name="OngoingGame"
        component={OngoingGameScreen}
        options={{
          headerShown: false,
        }}
      />
      <PlayStack.Screen
        name="FinishedGame"
        component={FinishedGameScreen}
        options={{
          headerShown: false,
        }}
      />
    </PlayStack.Navigator>
  );
}
