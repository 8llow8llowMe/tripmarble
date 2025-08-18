import Detailheader from '@/components/layout/header/Detailheader';
import SettingsHomeScreen from '@/screens/Setting/SettingsHomeScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const SettingStack = createNativeStackNavigator();

export default function SettingStackNavigator() {
  return (
    <SettingStack.Navigator initialRouteName="SettingsHomeScreen">
      <SettingStack.Screen
        name="SettingsHomeScreen"
        component={SettingsHomeScreen}
        options={{ header: () => <Detailheader title="환경 설정" /> }}
      />
    </SettingStack.Navigator>
  );
}
