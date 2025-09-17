"use client";

import { ChangeEvent, FormEvent, useCallback, useMemo, useState } from "react";
import Image from "next/image";
import { toast } from "react-toastify";

import useCreateTripSpotReview from "@/entities/trips/hooks/useCreateTripSpotReview";
import useUploadTripSpotReviewPhotos from "@/entities/trips/hooks/useUploadTripSpotReviewPhotos";
import Modal from "@/shared/ui/common/Modal";

import styles from "./TripSpotReviewModal.module.scss";

const RATING_OPTIONS = [5, 4.5, 4, 3.5, 3, 2.5, 2, 1.5, 1, 0.5] as const;

const formatRatingOption = (value: number) =>
  Number.isInteger(value) ? value.toString() : value.toFixed(1);

const revokePreviewUrl = (url: string) => {
  if (url.startsWith("blob:")) {
    URL.revokeObjectURL(url);
  }
};

interface UploadedPhoto {
  tempUrl: string;
  previewUrl: string;
}

interface TripSpotReviewModalProps {
  tripSpotId: string;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const TripSpotReviewModal = ({
  tripSpotId,
  isOpen,
  onClose,
  onSuccess,
}: TripSpotReviewModalProps) => {
  const [rating, setRating] = useState<number>(5);
  const [content, setContent] = useState("");
  const [uploadedPhotos, setUploadedPhotos] = useState<UploadedPhoto[]>([]);

  const { mutateAsync: uploadPhotos, isPending: isUploading } =
    useUploadTripSpotReviewPhotos(tripSpotId);
  const { mutateAsync: createReview, isPending: isSubmitting } =
    useCreateTripSpotReview(tripSpotId);

  const cleanupPreviews = useCallback(() => {
    uploadedPhotos.forEach((photo) => revokePreviewUrl(photo.previewUrl));
  }, [uploadedPhotos]);

  const resetForm = useCallback(() => {
    cleanupPreviews();
    setUploadedPhotos([]);
    setRating(5);
    setContent("");
  }, [cleanupPreviews]);

  const handleClose = useCallback(() => {
    resetForm();
    onClose();
  }, [onClose, resetForm]);

  const handleRatingChange = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      setRating(Number(event.target.value));
    },
    []
  );

  const handleContentChange = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement>) => {
      setContent(event.target.value);
    },
    []
  );

  const handleFileChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files;
      if (!files || files.length === 0) {
        return;
      }

      try {
        const response = await uploadPhotos({ files });
        const tempPhotos = response.data.dataBody ?? [];
        if (!tempPhotos.length) {
          toast.error("이미지 업로드에 실패했습니다. 다시 시도해주세요.");
          return;
        }

        const fileArray = Array.from(files);
        const newPhotos: UploadedPhoto[] = tempPhotos.map((item, index) => {
          const file = fileArray[index];
          const previewUrl = file
            ? URL.createObjectURL(file)
            : item.tempPhotoUrl;
          return {
            tempUrl: item.tempPhotoUrl,
            previewUrl,
          };
        });

        setUploadedPhotos((prev) => [...prev, ...newPhotos]);
        event.target.value = "";
      } catch (error) {
        console.error(error);
        toast.error("이미지 업로드 도중 문제가 발생했습니다.");
      }
    },
    [uploadPhotos]
  );

  const handleRemovePhoto = useCallback((tempUrl: string) => {
    setUploadedPhotos((prev) => {
      const next = prev.filter((photo) => photo.tempUrl !== tempUrl);
      const removed = prev.find((photo) => photo.tempUrl === tempUrl);
      if (removed) {
        revokePreviewUrl(removed.previewUrl);
      }
      return next;
    });
  }, []);

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (!rating) {
        toast.info("별점을 선택해주세요.");
        return;
      }

      const trimmedContent = content.trim();
      if (!trimmedContent) {
        toast.info("리뷰 내용을 입력해주세요.");
        return;
      }

      try {
        await createReview({
          rating,
          content: trimmedContent,
          photoUrls: uploadedPhotos.map((photo) => photo.tempUrl),
        });
        toast.success("리뷰가 등록되었습니다.");
        onSuccess();
        handleClose();
      } catch (error) {
        console.error(error);
        toast.error("리뷰 등록에 실패했습니다. 잠시 후 다시 시도해주세요.");
      }
    },
    [content, createReview, handleClose, onSuccess, rating, uploadedPhotos]
  );

  const isActionDisabled = useMemo(
    () => isUploading || isSubmitting,
    [isSubmitting, isUploading]
  );

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <form className={styles.modal} onSubmit={handleSubmit}>
        <h2 className={styles.title}>리뷰 작성하기</h2>

        <div className={styles.fieldGroup}>
          <label className={styles.label} htmlFor="rating">
            별점
          </label>
          <select
            id="rating"
            className={styles.select}
            value={rating}
            onChange={handleRatingChange}
            disabled={isActionDisabled}
          >
            {RATING_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {formatRatingOption(option)}점
              </option>
            ))}
          </select>
        </div>

        <div className={styles.fieldGroup}>
          <label className={styles.label} htmlFor="content">
            리뷰 내용
          </label>
          <textarea
            id="content"
            className={styles.textarea}
            placeholder="여행지에 대한 솔직한 의견을 남겨주세요."
            value={content}
            onChange={handleContentChange}
            rows={6}
            disabled={isActionDisabled}
          />
        </div>

        <div className={styles.fieldGroup}>
          <label className={styles.label} htmlFor="photos">
            사진 업로드 (선택)
          </label>
          <input
            id="photos"
            type="file"
            multiple
            accept="image/*"
            className={styles.fileInput}
            onChange={handleFileChange}
            disabled={isActionDisabled}
          />
          {uploadedPhotos.length ? (
            <ul className={styles.photoPreviewList}>
              {uploadedPhotos.map((photo) => (
                <li key={photo.tempUrl} className={styles.photoPreviewItem}>
                  <Image
                    src={photo.previewUrl}
                    alt="업로드된 리뷰 사진 미리보기"
                    width={96}
                    height={96}
                    className={styles.photoPreviewImage}
                    unoptimized
                  />
                  <button
                    type="button"
                    className={styles.photoRemoveButton}
                    onClick={() => handleRemovePhoto(photo.tempUrl)}
                    disabled={isActionDisabled}
                  >
                    삭제
                  </button>
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        <div className={styles.actionRow}>
          <button
            type="button"
            className={styles.cancelButton}
            onClick={handleClose}
            disabled={isActionDisabled}
          >
            취소
          </button>
          <button
            type="submit"
            className={styles.submitButton}
            disabled={isActionDisabled}
          >
            {isSubmitting ? "등록 중..." : "등록하기"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default TripSpotReviewModal;
