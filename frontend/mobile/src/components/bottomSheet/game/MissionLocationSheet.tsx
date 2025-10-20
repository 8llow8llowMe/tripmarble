import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { palette } from '@/constants/colors';

import { getCurrentLocation, CurrentLocation } from '@/utils/location';
import GameSheetHeader from '@/components/ui/game-mission/GameSheetHeader';
import KakaoMap from '@/components/ui/map/KakaoMap';
import { BottomSheetView } from '@gorhom/bottom-sheet';

interface Props {
  onClose: () => void;
  onSuccess?: () => void;
}

export default function MissionLocationSheet({ onClose, onSuccess }: Props) {
  const [loc, setLoc] = useState<CurrentLocation | null>(null);
  const [loading, setLoading] = useState(false);

  const [locationVerified, setLocationVerified] = useState<boolean>(false); // 위치 인증 여부

  async function refreshLocation() {
    setLoading(true);
    const l = await getCurrentLocation();
    setLoc(l);
    setLoading(false);
  }

  useEffect(() => {
    refreshLocation();
  }, []);

  // 📍 위치 인증
  async function handleVerifyLocation() {
    // 기존에 받아둔 값이 있으면 재사용, 없으면 한번 더 취득
    if (!loc) await getCurrentLocation();

    console.log('🍏 loc', loc);

    // TODO: 서버 인증 호출
    // await verifyLocationAPI({ tripGameId, tripGameMoveLogId: pendingMoveLogId!, ...loc });

    setLocationVerified(true);
  }

  return (
    <BottomSheetView style={styles.container}>
      <GameSheetHeader title="위치 인증" />

      <View style={styles.body}>
        {loading && <ActivityIndicator size="large" color={palette.mainColor} />}
        {!loading && loc && (
          <KakaoMap latitude={loc.lat} longitude={loc.lng} height={260} zoomLevel={4} />
        )}

        <TouchableOpacity style={styles.refreshBtn} onPress={refreshLocation}>
          <Text style={styles.refreshText}>📍 내 위치로</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.submitBtn}
          onPress={() => {
            onSuccess?.();
            onClose();
          }}
        >
          <Text style={styles.submitText}>위치 인증하기</Text>
        </TouchableOpacity>
      </View>
    </BottomSheetView>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: palette.white, borderRadius: 16 },
  body: { paddingHorizontal: 20, paddingBottom: 32, alignItems: 'center' },
  refreshBtn: {
    marginTop: 12,
    paddingVertical: 10,
    paddingHorizontal: 14,
    backgroundColor: palette.gray100,
    borderRadius: 8,
  },
  refreshText: { color: palette.black, fontWeight: '600' },
  submitBtn: {
    marginTop: 20,
    backgroundColor: palette.mainColor,
    paddingVertical: 14,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  submitText: { color: '#fff', fontWeight: '700' },
});
