import TextBox from '@/components/atom/TextBox';
import { useMemo } from 'react';
import { Feather } from '@expo/vector-icons';
import { Image, Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
import { palette } from '@/constants/colors';

// 공통 그림자
const shadow = Platform.select({
  ios: {
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  android: { elevation: 3 },
});

const FriendsBannerSection = ({
  avatars,
  playingCount,
  onInvite,
}: {
  avatars: string[];
  playingCount: number;
  onInvite: () => void;
}) => {
  const overlap = -12;
  const avatarViews = useMemo(
    () =>
      avatars
        .slice(0, 3)
        .map((src, idx) => (
          <Image
            key={src}
            source={{ uri: src }}
            style={[
              styles.avatar,
              { marginLeft: idx === 0 ? 0 : overlap, zIndex: avatars.length - idx },
            ]}
          />
        )),
    [avatars],
  );

  return (
    <View style={[styles.friendsBanner, shadow]}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>{avatarViews}</View>
        <TextBox size={14} color={palette.gray600} style={{ marginLeft: 10 }}>
          친구 {playingCount}명이 플레이 중
        </TextBox>
      </View>
      <TouchableOpacity style={styles.inviteBtn} onPress={onInvite} activeOpacity={0.85}>
        <Feather name="user-plus" size={14} color="#fff" />
        <TextBox size={13} color="#fff" style={{ marginLeft: 6 }}>
          초대하기
        </TextBox>
      </TouchableOpacity>
    </View>
  );
};

export default FriendsBannerSection;

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: palette.white },
  scroll: { paddingBottom: 32 },

  // Header
  headerWrapper: {
    paddingHorizontal: 16,
    marginTop: 6,
    marginBottom: 14,
  },

  // Search
  searchBox: {
    marginHorizontal: 16,
    backgroundColor: palette.white,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
  },

  // Friends
  friendsBanner: {
    marginTop: 24,
    marginHorizontal: 16,
    padding: 14,
    borderRadius: 16,
    backgroundColor: '#2F80ED',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  avatar: { width: 28, height: 28, borderRadius: 14, borderWidth: 2, borderColor: '#fff' },
  inviteBtn: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.22)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    alignItems: 'center',
  },
});
