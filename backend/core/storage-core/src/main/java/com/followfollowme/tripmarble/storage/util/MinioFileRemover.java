package com.followfollowme.tripmarble.storage.util;

import com.followfollowme.tripmarble.storage.exception.MinioErrorCode;
import com.followfollowme.tripmarble.storage.exception.MinioException;
import com.followfollowme.tripmarble.storage.properties.MinioProperties;
import io.minio.MinioClient;
import io.minio.RemoveObjectArgs;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
public class MinioFileRemover {

    private final MinioClient minioClient;
    private final MinioProperties minioProperties;

    public void remove(String fileUrl) {
        try {
            // 1. bucketPrefix 포함된 object path 추출 (공통 유틸 활용)
            String bucketName = minioProperties.bucketPrefix();
            String objectPath = MinioPathUtils.extractObjectPath(fileUrl, bucketName);

            // 2. MinIO에서 삭제
            minioClient.removeObject(
                RemoveObjectArgs.builder()
                    .bucket(bucketName)
                    .object(objectPath)
                    .build()
            );

        } catch (MinioException e) {
            // 커스텀 예외 그대로 던짐
            throw e;
        } catch (Exception e) {
            log.error("[MinioFileRemover] MinIO 파일 삭제 실패: {}", fileUrl, e);
            throw new MinioException(MinioErrorCode.FILE_DELETE_FAILED);
        }
    }
}
