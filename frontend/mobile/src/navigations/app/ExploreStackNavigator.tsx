import ExploreScreen from '@/screens/Explore/ExploreScreen';
import SpotDetailScreen from '@/screens/Explore/SpotDetailScreen';
import SpotListScreen from '@/screens/Explore/SpotListScreen';
import { ExploreStackParamList } from '@/types/navigation/navigation';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const ExploreStack = createNativeStackNavigator<ExploreStackParamList>();

export default function ExploreStackNavigator() {
  return (
    <ExploreStack.Navigator>
      <ExploreStack.Screen
        name="ExploreScreen"
        component={ExploreScreen}
        options={{ headerShown: false }}
      />
      <ExploreStack.Screen
        name="SpotListScreen"
        component={SpotListScreen}
        options={{ headerShown: false }}
      />
      <ExploreStack.Screen
        name="SpotDetailScreen"
        component={SpotDetailScreen}
        options={{
          headerShown: false,
        }}
      />
    </ExploreStack.Navigator>
  );
}
