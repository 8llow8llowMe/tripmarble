import React, { FormEvent, useEffect, useState } from "react";
import Modal from "@/shared/ui/common/Modal";
import styles from "./ProfileEditForm.module.scss";
import { toast } from "react-toastify";
import { useAppSelector } from "@/entities/users/model";
import { useRouter } from "next/navigation";
// apis
import useUploadTempProfileImage from "@/entities/users/hooks/useUploadTempProfileImage";
import useUpdateUserProfile from "@/entities/users/hooks/useUpdateUserProfile";
import Button from "@/shared/ui/common/Button/Button";

interface ProfileEditFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProfileEditForm = ({ isOpen, onClose }: ProfileEditFormProps) => {
  const router = useRouter();
  const user = useAppSelector((state) => state.user.user);
  const [nickname, setNickname] = useState<string>(user?.nickname ?? "");
  const [previewImageURL, setPreviewImageURL] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const { uploadImageAsync } = useUploadTempProfileImage();
  const { updateUserProfileAsync } = useUpdateUserProfile();

  useEffect(() => {
    if (isOpen) {
      setNickname(user?.nickname ?? "");
      setPreviewImageURL(null);
      setSelectedFile(null);
    }
  }, [isOpen, user?.nickname]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImageURL(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
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
        profileImageUrl: uploadedUrl || user?.profileImageUrl || "",
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
    <Modal isOpen={isOpen} onClose={onClose} title="프로필 수정" size="sm">
      <form className={styles.container} onSubmit={handleSave}>
        <div className={styles.fieldGroup}>
          <label className={styles.label} htmlFor="profile-nickname">
            닉네임
          </label>
          <input
            id="profile-nickname"
            className={styles.nickname}
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder="닉네임 입력"
            disabled={isUploading}
          />
          <p className={styles.helperText}>프로필에 표시될 이름입니다.</p>
        </div>

        <div className={styles.fieldGroup}>
          <p className={styles.label}>프로필 이미지</p>
          <div className={styles.imageUploader}>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              id="profileImageUpload"
              disabled={isUploading}
            />
            <label htmlFor="profileImageUpload">
              {previewImageURL || user?.profileImageUrl ? (
                <img
                  width={200}
                  height={200}
                  src={previewImageURL || user?.profileImageUrl!}
                  alt="프로필 미리보기"
                />
              ) : (
                <span>이미지 선택</span>
              )}
            </label>
          </div>
          <p className={styles.helperText}>정사각형 이미지가 가장 잘 맞습니다.</p>
        </div>
        <div className={styles.actions}>
          <Button
            type="button"
            variant="secondary"
            size="md"
            onClick={onClose}
            disabled={isUploading}
          >
            취소
          </Button>
          <Button
            className={styles.submitButton}
            type="submit"
            variant="primary"
            size="md"
            isLoading={isUploading}
          >
            저장하기
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default ProfileEditForm;
