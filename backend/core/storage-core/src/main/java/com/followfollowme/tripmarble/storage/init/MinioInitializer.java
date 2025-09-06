package com.followfollowme.tripmarble.storage.init;

import com.followfollowme.tripmarble.storage.properties.MinioProperties;
import io.minio.BucketExistsArgs;
import io.minio.MakeBucketArgs;
import io.minio.MinioClient;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class MinioInitializer {

    private final MinioClient minioClient;
    private final MinioProperties minioProperties;

    @EventListener(ApplicationReadyEvent.class)
    public void initBuckets() {
        // 단일 메인 버킷만 생성
        String bucketName = minioProperties.bucketPrefix();

        try {
            boolean exists = minioClient.bucketExists(
                BucketExistsArgs.builder()
                    .bucket(bucketName)
                    .build()
            );

            if (!exists) {
                log.info("메인 버킷 생성 시도: {}", bucketName);
                minioClient.makeBucket(
                    MakeBucketArgs.builder()
                        .bucket(bucketName)
                        .build()
                );
                log.info("메인 버킷 생성 완료: {}", bucketName);
            } else {
                log.info("메인 버킷이 이미 존재: {}", bucketName);
            }

        } catch (Exception e) {
            log.error("MinIO 메인 버킷 초기화 실패 (서비스는 계속 실행): {}", bucketName, e);
        }
    }
}