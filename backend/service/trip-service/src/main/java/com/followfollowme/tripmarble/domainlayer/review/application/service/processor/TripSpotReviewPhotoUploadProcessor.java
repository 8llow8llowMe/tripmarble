package com.followfollowme.tripmarble.domainlayer.review.application.service.processor;

import com.followfollowme.tripmarble.domainlayer.review.application.exception.ReviewErrorCode;
import com.followfollowme.tripmarble.domainlayer.review.application.exception.ReviewException;
import com.followfollowme.tripmarble.domainlayer.review.application.info.TripSpotReviewPhotoUploadInfo;
import com.followfollowme.tripmarble.domainlayer.trip.application.exception.TripErrorCode;
import com.followfollowme.tripmarble.domainlayer.trip.application.exception.TripException;
import com.followfollowme.tripmarble.domainlayer.trip.application.port.out.TripSpotRepositoryPort;
import com.followfollowme.tripmarble.storage.bucket.MinioBucket;
import com.followfollowme.tripmarble.storage.properties.MinioProperties;
import io.minio.CopyObjectArgs;
import io.minio.CopySource;
import io.minio.MinioClient;
import io.minio.PutObjectArgs;
import io.minio.RemoveObjectArgs;
import java.io.InputStream;
import java.util.List;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Slf4j
@Service
@RequiredArgsConstructor
public class TripSpotReviewPhotoUploadProcessor {

    private final MinioClient minioClient;
    private final MinioProperties minioProperties;
    private final TripSpotRepositoryPort tripSpotRepositoryPort;

    public List<TripSpotReviewPhotoUploadInfo> uploadTempReviewPhotos(long tripSpotId, List<MultipartFile> imageFiles) {
        // 1. 여행지 존재 여부 검증
        tripSpotRepositoryPort.findById(tripSpotId)
            .orElseThrow(() -> new TripException(TripErrorCode.TRIP_SPOT_NOT_FOUND));

        // 2. 여러 파일을 각각 업로드
        return imageFiles.stream()
            .map(this::uploadSingleTempReviewPhoto)
            .toList();
    }

    public List<String> promoteToReal(List<String> tempPhotoUrls) {
        // 1. 각 URL을 promote 처리
        return tempPhotoUrls.stream()
            .map(this::promoteSingleToReal)
            .toList();
    }

    private TripSpotReviewPhotoUploadInfo uploadSingleTempReviewPhoto(MultipartFile imageFile) {
        try {
            // 1. 파일명 UUID 기반 유니크 처리
            String originalName = imageFile.getOriginalFilename();
            String objectName = UUID.randomUUID() + "_" + originalName;

            // 2. 버킷 + temp 경로 지정
            String bucketName = minioProperties.bucketPrefix();
            String objectPath = MinioBucket.REVIEW_TEMP_IMAGES.objectPath(objectName);

            // 3. InputStream 기반 업로드
            try (InputStream in = imageFile.getInputStream()) {
                minioClient.putObject(
                    PutObjectArgs.builder()
                        .bucket(bucketName)
                        .object(objectPath)
                        .stream(in, imageFile.getSize(), -1)
                        .contentType(imageFile.getContentType())
                        .build()
                );
            }

            // 4. public URL 생성
            String url = minioProperties.publicUrl() + "/" + bucketName + "/" + objectPath;

            return TripSpotReviewPhotoUploadInfo.builder()
                .tempPhotoUrl(url)
                .build();

        } catch (Exception e) {
            log.error("리뷰 사진 임시 업로드 실패: originalName={}", imageFile.getOriginalFilename(), e);
            throw new ReviewException(ReviewErrorCode.UPLOAD_REVIEW_PHOTO_FAILED);
        }
    }

    private String promoteSingleToReal(String tempPhotoUrl) {
        try {
            // 1. 파일명 추출
            String objectName = extractObjectName(tempPhotoUrl);
            String bucketName = minioProperties.bucketPrefix();

            // 2. temp -> real 경로 지정
            String srcObject = MinioBucket.REVIEW_TEMP_IMAGES.objectPath(objectName);
            String destObject = MinioBucket.REVIEW_REAL_IMAGES.objectPath(objectName);

            // 3. MinIO copy 실행
            CopySource source = CopySource.builder()
                .bucket(bucketName)
                .object(srcObject)
                .build();

            minioClient.copyObject(
                CopyObjectArgs.builder()
                    .bucket(bucketName)
                    .object(destObject)
                    .source(source)
                    .build()
            );

            // 4. 원본(temp) 오브젝트 삭제
            minioClient.removeObject(
                RemoveObjectArgs.builder()
                    .bucket(bucketName)
                    .object(srcObject)
                    .build()
            );

            // 5. 최종 public URL 반환
            return minioProperties.publicUrl() + "/" + bucketName + "/" + destObject;
        } catch (Exception e) {
            throw new ReviewException(ReviewErrorCode.UPLOAD_REVIEW_PHOTO_FAILED);
        }
    }

    private String extractObjectName(String photoUrl) {
        String prefix = "/" + minioProperties.bucketPrefix() + "/";
        String fullPath = photoUrl.substring(photoUrl.indexOf(prefix) + prefix.length());
        return fullPath.substring(fullPath.lastIndexOf("/") + 1);
    }
}
