package com.followfollowme.tripmarble.domainlayer.member.application.service;

import com.followfollowme.tripmarble.domainlayer.member.adapter.in.web.dto.MemberProfileUploadResponse;
import com.followfollowme.tripmarble.domainlayer.member.application.exception.MemberErrorCode;
import com.followfollowme.tripmarble.domainlayer.member.application.exception.MemberException;
import com.followfollowme.tripmarble.storage.bucket.MinioBucket;
import com.followfollowme.tripmarble.storage.properties.MinioProperties;
import io.minio.MinioClient;
import io.minio.PutObjectArgs;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class ProfileImageUploader {

    private final MinioClient minioClient;
    private final MinioProperties minioProperties;

    public MemberProfileUploadResponse upload(MultipartFile imageFile) {
        try {
            String originalName = imageFile.getOriginalFilename();
            String objectName = UUID.randomUUID() + "_" + originalName;

            // 버킷 이름과 object 경로
            String bucketName = MinioBucket.TEMP_PROFILE_IMAGE.fullName(
                minioProperties.bucketPrefix());
            String objectPath = MinioBucket.TEMP_PROFILE_IMAGE.objectPath(objectName);

            // 업로드
            minioClient.putObject(
                PutObjectArgs.builder()
                    .bucket(bucketName)
                    .object(objectPath) // temp/UUID_filename 형식으로 저장
                    .stream(imageFile.getInputStream(), imageFile.getSize(), -1)
                    .contentType(imageFile.getContentType())
                    .build()
            );

            // 접두사 포함 전체 URL
            String url = minioProperties.publicUrl() + "/" + bucketName + "/" + objectPath;

            return MemberProfileUploadResponse.builder()
                .tempImageUrl(url)
                .build();
        } catch (Exception e) {
            throw new MemberException(MemberErrorCode.UPLOAD_PROFILE_IMAGE_FAILED);
        }
    }
}
