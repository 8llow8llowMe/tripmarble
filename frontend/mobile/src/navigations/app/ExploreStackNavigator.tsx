import ExploreScreen from '@/screens/Explore/ExploreScreen';
import SpotDetailScreen from '@/screens/Explore/SpotDetailScreen';
import SpotListScreen from '@/screens/Explore/SpotListScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const ExploreStack = createNativeStackNavigator();

export default function ExploreStackNavigator() {
  return (
    <ExploreStack.Navigator>
      <ExploreStack.Screen
        name="ExploreScreen"
        component={ExploreScreen}
        options={{ headerShown: false }}
      />
      <ExploreStack.Screen name="SpotListScreen" component={SpotListScreen} />
      <ExploreStack.Screen
        name="SpotDetailScreen"
        component={SpotDetailScreen}
        options={{
          tabBarStyle: { display: 'none' },
        }}
      />
    </ExploreStack.Navigator>
  );
}
