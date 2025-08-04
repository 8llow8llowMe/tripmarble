import React from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { useRoute } from '@react-navigation/native';
import useTripSpotQuery from '@/hooks/trip/useSpot';

export default function SpotDetailScreen() {
  const route = useRoute<any>();
  const { tripSpotId } = route.params || {};

  //   const { tripSpot, isLoading, isError } = useTripSpotQuery({ tripSpotId });

  //   if (isLoading) return <ActivityIndicator size="large" style={{ flex: 1 }} />;
  //   if (isError || !tripSpot?.dataBody)
  //     return <Text style={{ color: 'red', padding: 20 }}>상세 정보를 불러올 수 없습니다.</Text>;

  //   const { tripSpotName, thumbnailImageUrl, ...other } = tripSpot.dataBody;

  return (
    <View style={styles.container}>
      {/* <Image
        source={
          thumbnailImageUrl ? { uri: thumbnailImageUrl } : require('@/assets/defaultSpotImage.png')
        }
        style={styles.thumbnail}
        resizeMode="cover"
      /> */}
      <Text style={styles.name}>디테일스크린</Text>
      {/* 추가 정보 표시 */}
      {/* <Text>{other.description}</Text> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 24,
    alignItems: 'center',
  },
  thumbnail: {
    width: 200,
    height: 200,
    borderRadius: 16,
    backgroundColor: '#eee',
    marginBottom: 24,
  },
  name: {
    fontSize: 22,
    fontWeight: '700',
    color: '#222',
    marginBottom: 16,
  },
});
