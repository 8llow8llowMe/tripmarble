package com.followfollowme.tripmarble.storage.init;

import com.followfollowme.tripmarble.storage.bucket.MinioBucket;
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
        for (MinioBucket bucket : MinioBucket.values()) {
            String bucketName = bucket.fullName(minioProperties.bucketPrefix());

            try {
                boolean exists = minioClient.bucketExists(
                    BucketExistsArgs.builder()
                        .bucket(bucketName)
                        .build()
                );

                if (!exists) {
                    log.info("버킷이 존재하지 않음. 생성 시도: {}", bucketName);
                    minioClient.makeBucket(
                        MakeBucketArgs.builder()
                            .bucket(bucketName)
                            .build()
                    );
                }

            } catch (Exception e) {
                log.error("MinIO 버킷 초기화 실패 (서비스는 계속 실행): {}", bucketName, e);
            }
        }
    }
}
