import Detailheader from '@/components/layout/header/Detailheader';
import ProfileEditScreen from '@/screens/Profile/ProfileEditScreen';
import LicenseScreen from '@/screens/Setting/LicenseScreen';
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
      <SettingStack.Screen
        name="ProfileEditScreen"
        component={ProfileEditScreen}
        options={{ header: () => <Detailheader title="프로필 수정" /> }}
      />
    </SettingStack.Navigator>
  );
}
