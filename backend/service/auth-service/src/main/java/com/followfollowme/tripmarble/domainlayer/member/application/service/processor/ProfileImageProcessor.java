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
import java.io.InputStream;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class ProfileImageProcessor {

    private final MinioClient minioClient;
    private final MinioProperties minioProperties;

    public MemberProfileUploadResponse upload(MultipartFile imageFile) {
        try {
            String originalName = imageFile.getOriginalFilename();
            String objectName = UUID.randomUUID() + "_" + originalName;

            // 1. 버킷 이름과 object 경로 생성
            String bucketName = MinioBucket.TEMP_PROFILE_IMAGE.fullName(
                minioProperties.bucketPrefix());
            String objectPath = MinioBucket.TEMP_PROFILE_IMAGE.objectPath(objectName);

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
            // 1. 파일명만 파싱
            String objectName = extractObjectName(tempImageUrl);

            String realBucket = MinioBucket.REAL_PROFILE_IMAGE.fullName(minioProperties.bucketPrefix());
            String tempBucket = MinioBucket.TEMP_PROFILE_IMAGE.fullName(minioProperties.bucketPrefix());
            String srcObject = MinioBucket.TEMP_PROFILE_IMAGE.objectPath(objectName);
            String destObject = MinioBucket.REAL_PROFILE_IMAGE.objectPath(objectName);

            // 2. CopySource 및 CopyObjectArgs 생성하고 복사 실행
            CopySource source = CopySource.builder()
                .bucket(tempBucket)
                .object(srcObject)
                .build();

            minioClient.copyObject(
                CopyObjectArgs.builder()
                    .bucket(realBucket)
                    .object(destObject)
                    .source(source)
                    .build()
            );

            // 3. real URL 생성 후 반환
            return minioProperties.publicUrl() + "/" + realBucket + "/" + destObject;

        } catch (Exception e) {
            throw new MemberException(MemberErrorCode.UPLOAD_PROFILE_IMAGE_FAILED, e);
        }
    }

    private String extractObjectName(String tempImageUrl) {
        return tempImageUrl.substring(tempImageUrl.lastIndexOf("/") + 1);
    }
}
