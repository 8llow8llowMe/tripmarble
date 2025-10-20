package com.followfollowme.tripmarble.domainlayer.member.application.service.processor;

import com.followfollowme.tripmarble.domainlayer.member.adapter.in.web.dto.MemberProfileUploadResponse;
import com.followfollowme.tripmarble.domainlayer.member.application.exception.MemberErrorCode;
import com.followfollowme.tripmarble.domainlayer.member.application.exception.MemberException;
import com.followfollowme.tripmarble.storage.bucket.MinioBucket;
import com.followfollowme.tripmarble.storage.properties.MinioProperties;
import com.followfollowme.tripmarble.storage.util.MinioPathUtils;
import io.minio.CopyObjectArgs;
import io.minio.CopySource;
import io.minio.MinioClient;
import io.minio.PutObjectArgs;
import io.minio.RemoveObjectArgs;
import java.io.InputStream;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Slf4j
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
            // 3. 최종 URL 생성 후 응답 DTO에 담아 반환
            String url = minioProperties.publicUrl() + "/" + bucketName + "/" + objectPath;

            return MemberProfileUploadResponse.builder()
                .tempImageUrl(url)
                .build();

        } catch (Exception e) {
            log.error("프로필 이미지 업로드 실패: originalName={}", imageFile.getOriginalFilename(), e);
            throw new MemberException(MemberErrorCode.UPLOAD_PROFILE_IMAGE_FAILED);
        }
    }

    public String promoteToReal(String tempImageUrl) {
        try {
            // 1. 버킷명 추출
            String bucketName = minioProperties.bucketPrefix();

            // 2. temp URL → objectPath 추출 (공통 유틸 활용)
            String objectPath = MinioPathUtils.extractObjectPath(tempImageUrl, bucketName);

            // 3. 파일명만 분리
            String objectName = objectPath.substring(objectPath.lastIndexOf("/") + 1);

            // 4. 같은 버킷 내에서 temp -> real 폴더로 이동
            String srcObject = MinioBucket.PROFILE_TEMP_IMAGES.objectPath(objectName);
            String destObject = MinioBucket.PROFILE_REAL_IMAGES.objectPath(objectName);

            // 5. MinIO copy 실행
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

            // 6. 임시(temp)에 저장된 오브젝트 삭제
            minioClient.removeObject(
                RemoveObjectArgs.builder()
                    .bucket(bucketName)
                    .object(srcObject)
                    .build()
            );

            // 6. 최종 public URL 반환
            return minioProperties.publicUrl() + "/" + bucketName + "/" + destObject;

        } catch (Exception e) {
            log.error("프로필 이미지 promote 실패: tempImageUrl={}", tempImageUrl, e);
            throw new MemberException(MemberErrorCode.UPLOAD_PROFILE_IMAGE_FAILED, e);
        }
    }
}
