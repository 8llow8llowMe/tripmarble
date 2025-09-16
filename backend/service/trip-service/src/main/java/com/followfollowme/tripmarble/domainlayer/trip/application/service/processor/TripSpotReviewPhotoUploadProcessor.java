package com.followfollowme.tripmarble.domainlayer.trip.application.service.processor;

import com.followfollowme.tripmarble.domainlayer.trip.application.exception.TripErrorCode;
import com.followfollowme.tripmarble.domainlayer.trip.application.exception.TripException;
import com.followfollowme.tripmarble.domainlayer.trip.application.info.TripSpotReviewPhotoUploadInfo;
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
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class TripSpotReviewPhotoUploadProcessor {

    private final MinioClient minioClient;
    private final MinioProperties minioProperties;
    private final TripSpotRepositoryPort tripSpotRepositoryPort;

    public List<TripSpotReviewPhotoUploadInfo> uploadTempReviewPhotos(long tripSpotId, List<MultipartFile> imageFiles) {
        // 여행지 존재 여부 검증
        tripSpotRepositoryPort.findById(tripSpotId)
            .orElseThrow(() -> new TripException(TripErrorCode.TRIP_SPOT_NOT_FOUND));

        return imageFiles.stream()
            .map(this::uploadSingleTempReviewPhoto)
            .toList();
    }

    public List<String> promoteToReal(List<String> tempPhotoUrls) {
        return tempPhotoUrls.stream()
            .map(this::promoteSingleToReal)
            .toList();
    }

    private TripSpotReviewPhotoUploadInfo uploadSingleTempReviewPhoto(MultipartFile imageFile) {
        try {
            String originalName = imageFile.getOriginalFilename();
            String objectName = UUID.randomUUID() + "_" + originalName;

            String bucketName = minioProperties.bucketPrefix();
            String objectPath = MinioBucket.REVIEW_TEMP_IMAGES.objectPath(objectName);

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

            String url = minioProperties.publicUrl() + "/" + bucketName + "/" + objectPath;

            return TripSpotReviewPhotoUploadInfo.builder()
                .tempPhotoUrl(url)
                .build();

        } catch (Exception e) {
            throw new TripException(TripErrorCode.UPLOAD_REVIEW_PHOTO_FAILED);
        }
    }

    private String promoteSingleToReal(String tempPhotoUrl) {
        try {
            String objectName = extractObjectName(tempPhotoUrl);
            String bucketName = minioProperties.bucketPrefix();

            String srcObject = MinioBucket.REVIEW_TEMP_IMAGES.objectPath(objectName);
            String destObject = MinioBucket.REVIEW_REAL_IMAGES.objectPath(objectName);

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

            minioClient.removeObject(
                RemoveObjectArgs.builder()
                    .bucket(bucketName)
                    .object(srcObject)
                    .build()
            );

            return minioProperties.publicUrl() + "/" + bucketName + "/" + destObject;
        } catch (Exception e) {
            throw new TripException(TripErrorCode.UPLOAD_REVIEW_PHOTO_FAILED);
        }
    }

    private String extractObjectName(String photoUrl) {
        return photoUrl.substring(photoUrl.lastIndexOf("/") + 1);
    }
}
