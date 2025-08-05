import React, { useState } from "react";
import Modal from "@/shared/ui/common/Modal";
import styles from "./ProfileEditForm.module.scss";
import {
  useUploadTempProfileImage,
  useUpdateUserProfile,
} from "@/entities/users/hooks/useUsers";
import { toast } from "react-toastify";
import Image from "next/image";
import { useAppSelector } from "@/entities/users/model";
import { useRouter } from "next/navigation";

interface ProfileEditFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProfileEditForm = ({ isOpen, onClose }: ProfileEditFormProps) => {
  const router = useRouter();
  const user = useAppSelector((state) => state.user.user);
  const [nickname, setNickname] = useState<string>("");
  const [previewImageURL, setPreviewImageURL] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const { mutateAsync: uploadImageAsync } = useUploadTempProfileImage();
  const { mutateAsync: updateUserProfileAsync } = useUpdateUserProfile();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImageURL(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    if (!selectedFile && !nickname) {
      onClose();
      return;
    }

    setIsUploading(true);
    try {
      let uploadedUrl = previewImageURL;

      if (selectedFile) {
        const res: any = await uploadImageAsync(selectedFile);
        uploadedUrl = res.data.dataBody.tempImageUrl;
        setPreviewImageURL(uploadedUrl);
      }

      const finalNickname = nickname || user?.nickname || "";

      await updateUserProfileAsync({
        profileImageUrl: uploadedUrl || user?.profileImage || "",
        nickname: finalNickname,
      });

      toast.success("프로필 정보가 변경되었습니다.");
      onClose();
      router.refresh();
    } catch (error) {
      console.error("프로필 수정 중 오류:", error);
      toast.error("프로필 수정 중 오류가 발생했습니다.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={styles.container}>
        <h2>프로필 수정</h2>
        <p>닉네임 수정</p>
        <input
          className={styles.nickname}
          type="text"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          placeholder="닉네임 입력"
        />

        <p>프로필 이미지 수정</p>
        <div className={styles.imageUploader}>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            id="profileImageUpload"
          />
          <label htmlFor="profileImageUpload">
            {previewImageURL || user?.profileImage ? (
              <Image
                width={200}
                height={200}
                src={previewImageURL || user?.profileImage!}
                alt="Preview"
              />
            ) : (
              <span>이미지 선택</span>
            )}
          </label>
        </div>
        <button
          className={styles.submitButton}
          onClick={handleSave}
          disabled={isUploading}
        >
          {isUploading ? "업로드 중..." : "저장하기"}
        </button>
      </div>
    </Modal>
  );
};

export default ProfileEditForm;
