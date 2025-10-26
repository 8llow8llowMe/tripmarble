import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthtNavigatorParamList } from '@/types/navigation/navigation';
import LoginScreen from '@/screens/Auth/LoginScreen';
import SignUpScreen from '@/screens/Auth/SignUpScreen';
import SocialLoginWebViewScreen from '@/screens/Auth/SocialLoginWebViewScreen';

const AuthStack = createNativeStackNavigator<AuthtNavigatorParamList>();

export default function AuthNavigator() {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="LoginScreen" component={LoginScreen} />
      <AuthStack.Screen name="SignUpScreen" component={SignUpScreen} />
      <AuthStack.Screen name="SocialLoginWebViewScreen" component={SocialLoginWebViewScreen} />
    </AuthStack.Navigator>
  );
}
