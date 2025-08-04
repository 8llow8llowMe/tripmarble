import SpotDetailScreen from '@/screens/Explore/SpotDetailScreen';
import SpotListScreen from '@/screens/Explore/SpotListScreen';
import HomeScreen from '@/screens/Home/HomeScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const HomeStack = createNativeStackNavigator();

export default function HomeStackNavigator() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="HomeScreen" component={HomeScreen} />
      <HomeStack.Screen name="SpotListScreen" component={SpotListScreen} />
      <HomeStack.Screen
        name="SpotDetailScreen"
        component={SpotDetailScreen}
        options={{
          tabBarStyle: { display: 'none' },
        }}
      />
    </HomeStack.Navigator>
  );
}
