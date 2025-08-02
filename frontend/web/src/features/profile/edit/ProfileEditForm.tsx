import React, { useState } from "react";
import Modal from "@/shared/ui/common/Modal";
import styles from "./ProfileEditForm.module.scss";
import { useUploadTempProfileImage } from "@/entities/users/hooks/useUsers";
import { toast } from "react-toastify";
import Image from "next/image";

interface ProfileEditFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProfileEditForm = ({ isOpen, onClose }: ProfileEditFormProps) => {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const { mutate: uploadImageMutate } = useUploadTempProfileImage();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    if (!selectedFile) {
      onClose();
      return;
    }
    setIsUploading(true);
    try {
      uploadImageMutate(selectedFile, {
        onSuccess: async (res: any) => {
          setPreviewImage(res.data.url);
          onClose();
        },
        onError: (err: any) => {
          toast.error("이미지 업로드 중 오류가 발생했습니다.", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
          });
        },
      });
    } catch (error) {
      alert("이미지 업로드 중 오류가 발생했습니다.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={styles.container}>
        <h2>프로필 수정</h2>
        <div className={styles.imageUploader}>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            id="profileImageUpload"
          />
          <label htmlFor="profileImageUpload">
            {previewImage ? (
              <Image
                width={200}
                height={200}
                src={previewImage}
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
