import SpotDetailScreen from '@/screens/Explore/SpotDetailScreen';
import SpotListScreen from '@/screens/Explore/SpotListScreen';
import { SpotStackParamList } from '@/types/navigation/navigation';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const SpotStack = createNativeStackNavigator<SpotStackParamList>();

export default function SpotStackNavigator() {
  return (
    <SpotStack.Navigator>
      <SpotStack.Screen
        name="SpotListScreen"
        component={SpotListScreen}
        options={{ headerShown: false }}
      />
      <SpotStack.Screen
        name="SpotDetailScreen"
        component={SpotDetailScreen}
        options={{
          headerShown: false,
        }}
      />
    </SpotStack.Navigator>
  );
}
