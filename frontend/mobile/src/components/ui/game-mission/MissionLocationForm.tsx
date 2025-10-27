import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { palette } from '@/constants/colors';
import KakaoMap from '@/components/ui/map/KakaoMap';
import TextBox from '@/components/atom/TextBox';

type Props = {
  verified: boolean;
  onVerify: () => void;
  current?: { lat: number; lng: number } | null;
  loading?: boolean;
  onRefresh?: () => void;
};

export default function MissionLocationForm({
  verified,
  onVerify,
  current,
  loading,
  onRefresh,
}: Props) {
  return (
    <View style={styles.card}>
      <TextBox size={16} fontsName="Pretendard700" style={{ alignSelf: 'center' }}>
        현재 위치 인증
      </TextBox>

      {/* 1) 미니맵 프리뷰 */}
      {current ? (
        <KakaoMap latitude={current.lat} longitude={current.lng} />
      ) : (
        <View
          style={{
            height: 220,
            borderRadius: 12,
            backgroundColor: '#F2F4F6',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 8,
          }}
        >
          <Text style={{ color: '#8A8F98' }}>
            {loading ? '현재 위치 불러오는 중…' : '위치를 불러오지 못했습니다'}
          </Text>
        </View>
      )}

      <Text style={styles.helper}>지도에서 현재 위치를 확인한 뒤 인증하세요.</Text>

      <View style={{ flexDirection: 'row', gap: 8 }}>
        <TouchableOpacity style={styles.secondaryBtn} onPress={onRefresh} disabled={loading}>
          <Text style={styles.secondaryBtnText}>{loading ? '새로고침 중…' : '내 위치로'}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.secondaryBtn, { backgroundColor: palette.mainColor }]}
          onPress={onVerify}
          disabled={!current}
        >
          <Text style={[styles.secondaryBtnText, { color: '#fff' }]}>
            {verified ? '위치 인증됨 ✓' : '이 위치로 인증'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: palette.gray200,
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    backgroundColor: palette.white,
  },
  label: { fontSize: 14, fontWeight: '700', marginBottom: 8, color: palette.gray800 },
  helper: { fontSize: 12, color: palette.gray500, marginBottom: 8 },
  secondaryBtn: {
    alignSelf: 'flex-start',
    backgroundColor: palette.gray100,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  secondaryBtnText: { color: palette.black, fontWeight: '700' },
});
