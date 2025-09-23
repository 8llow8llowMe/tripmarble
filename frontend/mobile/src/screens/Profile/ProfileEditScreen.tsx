import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet';
import * as ImagePicker from 'expo-image-picker';
import { requestCameraPermission, requestMediaPermission } from '@hooks/usePermissions';
import { useBottomSheetBase } from '@/hooks/useBottomSheetBase';
import { palette } from '@/constants/colors';
import SelectProfileImageSheet from '@/components/bottomSheet/SelectProfileImageSheet';

// 타입 정의
interface UserProfile {
  email: string;
  name: string;
  nickname: string;
  profileImage: string | null;
}

const ProfileEditScreen = () => {
  // 더미 사용자 데이터 (API 연동시 교체)
  const [profile, setProfile] = useState<UserProfile>({
    email: 'user@example.com',
    name: '홍길동',
    nickname: '길동이',
    profileImage: null,
  });

  const [nickname, setNickname] = useState(profile.nickname);
  const [profileImage, setProfileImage] = useState<string | null>(profile.profileImage);

  const {
    bottomSheetRef: selectProfileImageSheetRef,
    openSheet: openSelectProfileImageSheet,
    closeSheet: closeSelectProfileImageSheet,
  } = useBottomSheetBase();
  const renderBackdrop = (props: any) => (
    <BottomSheetBackdrop
      {...props}
      pressBehavior={'close'}
      disappearsOnIndex={-1}
      appearsOnIndex={0}
    />
  );

  // 📸 앨범 선택
  const handlePickImage = async () => {
    // closeSheet();
    const granted = await requestMediaPermission();
    if (!granted) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsMultipleSelection: false,
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setProfileImage(uri);
      // TODO: MinIO 업로드 API 호출
    }
  };

  // 📷 카메라 촬영
  const handleTakePhoto = async () => {
    // closeSheet();
    const granted = await requestCameraPermission();
    if (!granted) return;

    const result = await ImagePicker.launchCameraAsync({ quality: 1 });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setProfileImage(uri);
      // TODO: MinIO 업로드 API 호출
    }
  };

  // 저장 버튼
  const handleSave = () => {
    const updated = {
      ...profile,
      nickname,
      profileImage,
    };
    console.log('업데이트된 프로필:', updated);
    // TODO: 서버에 업데이트 API 호출
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* 프로필 이미지 */}
        <TouchableOpacity style={styles.imageWrapper} onPress={openSelectProfileImageSheet}>
          {profileImage ? (
            <Image source={{ uri: profileImage }} style={styles.profileImage} />
          ) : (
            <View style={styles.placeholder}>
              <Text style={styles.placeholderText}>+</Text>
            </View>
          )}
        </TouchableOpacity>

        {/* 이메일 */}
        {/* <View style={styles.field}>
          <Text style={styles.label}>이메일</Text>
          <Text style={styles.value}>{profile.email}</Text>
        </View> */}

        {/* 이름 */}
        {/* <View style={styles.field}>
          <Text style={styles.label}>이름</Text>
          <Text style={styles.value}>{profile.name}</Text>
        </View> */}

        {/* 닉네임 */}
        {/* <View style={styles.field}>
          <Text style={styles.label}>닉네임</Text>
          <TextInput
            style={styles.input}
            value={nickname}
            onChangeText={setNickname}
            placeholder="닉네임 입력"
          />
        </View> */}

        {/* 저장 버튼 */}
        {/* <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>저장하기</Text>
        </TouchableOpacity> */}
      </ScrollView>

      <BottomSheetModal
        ref={selectProfileImageSheetRef}
        handleStyle={{
          backgroundColor: palette.white,
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
        }}
        index={0}
        snapPoints={[605]}
        backdropComponent={renderBackdrop}
      >
        <SelectProfileImageSheet />
      </BottomSheetModal>
    </SafeAreaView>
  );
};

export default ProfileEditScreen;

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: palette.white },
  container: { padding: 16 },

  imageWrapper: {
    alignSelf: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  placeholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#E0E0E0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderText: {
    fontSize: 40,
    color: '#888',
  },
  field: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 6,
  },
  value: {
    fontSize: 16,
    color: '#000',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    color: '#000',
  },
  saveButton: {
    backgroundColor: '#4BA1FD',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 30,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
