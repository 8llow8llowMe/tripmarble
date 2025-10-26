import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';
import { palette } from '@/constants/colors';
import { useAppSelector } from '@/store/store';
import AvatarImage from '@images/default-avatar.png';
import { Ionicons } from '@expo/vector-icons';
import TextBox from '@/components/atom/TextBox';
import Divider from '@/components/common/Divider';
import useLogoutMutation from '@/hooks/auth/useLogout';
import { useNavigation } from '@react-navigation/native';
import { AppNavigatorNavigationProp } from '@/types/navigation/screen';
import useUserActivityInfoQuery from '@/hooks/user/useUserActivityInfo';
import LoadingSpinner from '@/components/common/loading/LoadingSpinner';

export default function ProfileHomeScreen() {
  const navigation = useNavigation<AppNavigatorNavigationProp>();

  const { memberId, nickname, email, profileImage } = useAppSelector((state) => state.userReducer);

  const { data: activityInfo, isLoading } = useUserActivityInfoQuery({
    memberId,
    enableApiCall: !!memberId,
  });

  // 로그아웃
  const { logout, isPending } = useLogoutMutation();
  const confirmLogout = () => {
    Alert.alert(
      '로그아웃',
      '로그아웃 하시겠습니까?',
      [
        { text: '취소', style: 'cancel' }, // 그냥 닫힘
        {
          text: '확인',
          onPress: () => logout(),
        },
      ],
      { cancelable: true }, // 안드로이드 백버튼으로 닫기
    );
  };

  // 게임 목록 스크린으로 이동
  const goToGameListScreen = (status?: 'WAITING' | 'ONGOING' | 'ENDED') => {
    navigation.navigate('GamePlayStackNavigator', {
      screen: 'GameListScreen',
      params: status ? { status } : {},
    });
  };

  // 프로필 수정 스크린으로 이동
  const goToProfileEditScreen = () => {
    navigation.navigate('SettingsNavigator', {
      screen: 'ProfileEditScreen',
    });
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <View style={styles.headerCard}>
          <View style={styles.headerTop}>
            <Image
              source={profileImage ? { uri: profileImage } : AvatarImage}
              style={styles.avatar}
            />
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={styles.name}>{nickname}</Text>
              <Text style={styles.email}>{email}</Text>
            </View>
            <TouchableOpacity style={styles.editBtn} onPress={goToProfileEditScreen}>
              <Text style={styles.editBtnText}>프로필 수정</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.statsRow}>
            <Stat label="여행" value={activityInfo?.dataBody.tripGameCount ?? 0} />
            <Stat label="리뷰" value={activityInfo?.dataBody.tripSpotReviewCount ?? 0} />
            <Stat label="사진" value={activityInfo?.dataBody.tripSpotReviewPhotoCount ?? 0} />
          </View>
        </View>

        {/* 내 활동 섹션 */}
        <View style={styles.section}>
          <TextBox size={16} fontsName="Pretendard700" style={styles.label}>
            내 활동
          </TextBox>

          <View style={{ gap: 28 }}>
            {/* <TouchableOpacity>
              <View style={styles.row}>
                <Ionicons name="chatbubble-ellipses-outline" size={18} color={palette.gray800} />
                <TextBox size={15}>내 리뷰</TextBox>
              </View>
            </TouchableOpacity> */}
            {/* <TouchableOpacity>
              <View style={styles.row}>
                <Ionicons name="bookmark-outline" size={18} color={palette.gray800} />
                <TextBox size={15}>저장한 장소</TextBox>
              </View>
            </TouchableOpacity> */}
            <TouchableOpacity onPress={() => goToGameListScreen()}>
              <View style={styles.row}>
                <Ionicons name="game-controller-outline" size={18} color={palette.gray800} />
                <TextBox size={15}>게임 기록</TextBox>
              </View>
            </TouchableOpacity>

            <Divider />
          </View>
        </View>

        <View style={styles.section}>
          <TouchableOpacity onPress={confirmLogout} disabled={isPending}>
            <View style={styles.row}>
              <Ionicons name="log-out-outline" size={18} color={palette.gray800} />
              <TextBox size={15}>{isPending ? '로그아웃 중…' : '로그아웃'}</TextBox>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <View style={styles.statBox}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: palette.white },
  container: { padding: 16 },

  headerCard: {
    padding: 16,
    marginBottom: 24,
    backgroundColor: palette.white,
    borderRadius: 16,
    shadowColor: palette.black,
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  headerTop: { flexDirection: 'row', alignItems: 'center' },
  avatar: { width: 64, height: 64, borderRadius: 36, backgroundColor: palette.white },
  name: { fontSize: 16, fontWeight: '700' },
  email: { marginTop: 4, color: '#888' },
  editBtn: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: palette.mainColor,
  },
  editBtnText: { color: palette.white, fontWeight: '600' },

  statsRow: { flexDirection: 'row', marginTop: 16, justifyContent: 'space-between' },
  statBox: { flex: 1, alignItems: 'center' },
  statValue: { fontSize: 16, fontWeight: '700' },
  statLabel: { color: '#888', marginTop: 2 },

  section: {
    paddingVertical: 16,
    gap: 28,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  label: {
    fontWeight: '600',
  },
});
