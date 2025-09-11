import Detailheader from '@/components/layout/header/Detailheader';
import LicenseScreen from '@/screens/Profile/LicenseScreen';
import SettingsHomeScreen from '@/screens/Setting/SettingsHomeScreen';
import { SettingsParamList } from '@/types/navigation/navigation';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const SettingStack = createNativeStackNavigator<SettingsParamList>();

export default function SettingStackNavigator() {
  return (
    <SettingStack.Navigator initialRouteName="SettingsHomeScreen">
      <SettingStack.Screen
        name="SettingsHomeScreen"
        component={SettingsHomeScreen}
        options={{ header: () => <Detailheader title="환경 설정" /> }}
      />
      <SettingStack.Screen
        name="LicenseScreen"
        component={LicenseScreen}
        options={{ header: () => <Detailheader title="오픈소스 라이선스" /> }}
      />
    </SettingStack.Navigator>
  );
}
