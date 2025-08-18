import SpotDetailScreen from '@/screens/Explore/SpotDetailScreen';
import SpotListScreen from '@/screens/Explore/SpotListScreen';
import HomeScreen from '@/screens/Home/HomeScreen';
import { HomeStackParamList } from '@/types/navigation/navigation';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const HomeStack = createNativeStackNavigator<HomeStackParamList>();

export default function HomeStackNavigator() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="HomeScreen" component={HomeScreen} />
      <HomeStack.Screen
        name="SpotListScreen"
        component={SpotListScreen}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="SpotDetailScreen"
        component={SpotDetailScreen}
        options={{
          headerShown: false,
        }}
      />
    </HomeStack.Navigator>
  );
}
