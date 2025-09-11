package com.followfollowme.tripmarble.domainlayer.member.application.service.processor;

import com.followfollowme.tripmarble.domainlayer.member.adapter.in.web.dto.MemberProfileUploadResponse;
import com.followfollowme.tripmarble.domainlayer.member.application.exception.MemberErrorCode;
import com.followfollowme.tripmarble.domainlayer.member.application.exception.MemberException;
import com.followfollowme.tripmarble.storage.bucket.MinioBucket;
import com.followfollowme.tripmarble.storage.properties.MinioProperties;
import io.minio.CopyObjectArgs;
import io.minio.CopySource;
import io.minio.MinioClient;
import io.minio.PutObjectArgs;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ProfileImageProcessor {

    private final MinioClient minioClient;
    private final MinioProperties minioProperties;

    public MemberProfileUploadResponse upload(MultipartFile imageFile) {
        try {
            String originalName = imageFile.getOriginalFilename();
            String objectName = UUID.randomUUID() + "_" + originalName;

            // 1. 단일 버킷, temp 폴더에 업로드
            String bucketName = minioProperties.bucketPrefix();
            String objectPath = MinioBucket.PROFILE_TEMP_IMAGES.objectPath(objectName);

            // 2. InputStream을 try-with-resources로 안전하게 열고 업로드
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
            // 3. 최정 URL 생성 후 응답 DTO에 담아 반환
            String url = minioProperties.publicUrl() + "/" + bucketName + "/" + objectPath;

            return MemberProfileUploadResponse.builder()
                .tempImageUrl(url)
                .build();

        } catch (Exception e) {
            throw new MemberException(MemberErrorCode.UPLOAD_PROFILE_IMAGE_FAILED);
        }
    }

    public String promoteToReal(String tempImageUrl) {
        try {
            String objectName = extractObjectName(tempImageUrl);
            String bucketName = minioProperties.bucketPrefix();

            // 같은 버킷 내에서 temp -> real 폴더로 이동
            String srcObject = MinioBucket.PROFILE_TEMP_IMAGES.objectPath(objectName);
            String destObject = MinioBucket.PROFILE_REAL_IMAGES.objectPath(objectName);

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

            return minioProperties.publicUrl() + "/" + bucketName + "/" + destObject;

        } catch (Exception e) {
            throw new MemberException(MemberErrorCode.UPLOAD_PROFILE_IMAGE_FAILED, e);
        }
    }

    private String extractObjectName(String tempImageUrl) {
        return tempImageUrl.substring(tempImageUrl.lastIndexOf("/") + 1);
    }
}
