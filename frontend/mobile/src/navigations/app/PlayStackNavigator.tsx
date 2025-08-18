import TabHeader from '@/components/layout/header/TabHeader';
import FinishedGameScreen from '@/screens/Game/FinishedGameScreen';
import PlayHomeScreen from '@/screens/Play/PlayHomeScreen';
import { PlayStackParamList } from '@/types/navigation/navigation';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const PlayStack = createNativeStackNavigator<PlayStackParamList>();

export default function PlayStackNavigator() {
  return (
    <PlayStack.Navigator>
      <PlayStack.Screen
        name="PlayHomeScreen"
        component={PlayHomeScreen}
        options={{
          header: () => <TabHeader type="PlayTab" />,
        }}
      />
      <PlayStack.Screen
        name="FinishedGameScreen"
        component={FinishedGameScreen}
        options={{
          headerShown: false,
        }}
      />
    </PlayStack.Navigator>
  );
}
